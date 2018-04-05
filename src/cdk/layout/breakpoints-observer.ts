/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {Injectable, NgZone, OnDestroy} from '@angular/core';
import {MediaMatcher} from './media-matcher';
import {combineLatest, fromEventPattern, Observable, Subject} from 'rxjs';
import {map, startWith, takeUntil} from 'rxjs/operators';
import {coerceArray} from '@angular/cdk/coercion';


/** The current state of a layout breakpoint. */
export interface BreakpointState {
  /** Whether the breakpoint is currently matching. */
  matches: boolean;

  /** The queries being observed. */
  queries: {
    /** A key boolean pair for each query with its current matched state. */
    [key: string]: boolean;
  };
}

/** The current state of a layout breakpoint. */
interface InternalBreakpointState {
  matches: boolean;
  query: string;
}

interface Query {
  observable: Observable<InternalBreakpointState>;
  mql: MediaQueryList;
}

/** Utility for checking the matching state of @media queries. */
@Injectable({providedIn: 'root'})
export class BreakpointObserver implements OnDestroy {
  /**  A map of all media queries currently being listened for. */
  private _queries: Map<string, Query> = new Map();
  /** A subject for all other observables to takeUntil based on. */
  private _destroySubject: Subject<{}> = new Subject();

  constructor(private mediaMatcher: MediaMatcher, private zone: NgZone) {}

  /** Completes the active subject, signalling to all other observables to complete. */
  ngOnDestroy() {
    this._destroySubject.next();
    this._destroySubject.complete();
  }

  /**
   * Whether one or more media queries match the current viewport size.
   * @param value One or more media queries to check.
   * @returns Whether any of the media queries match.
   */
  isMatched(value: string | string[]): boolean {
    const queries = splitQueries(coerceArray(value));
    return queries.some(mediaQuery => this._registerQuery(mediaQuery).mql.matches);
  }

  /**
   * Gets an observable of results for the given queries that will emit new results for any changes
   * in matching of the given queries.
   * @returns A stream of matches for the given queries.
   */
  observe(value: string | string[]): Observable<BreakpointState> {
    let queries = splitQueries(coerceArray(value));
    let observables = queries.map(query => this._registerQuery(query).observable);

    return combineLatest<InternalBreakpointState, BreakpointState>(observables, function() {
      const output: BreakpointState = {
        matches: false,
        queries: {}
      };
      Array.from(arguments).forEach((breakpointState: InternalBreakpointState) => {
        output.matches = output.matches || breakpointState.matches;
        output.queries[breakpointState.query] = breakpointState.matches;
      });
      return output;
    });
  }

  /** Registers a specific query to be listened for. */
  private _registerQuery(query: string): Query {
    query = query.trim();
    // Only set up a new MediaQueryList if it is not already being listened for.
    if (this._queries.has(query)) {
      return this._queries.get(query)!;
    }

    const mql: MediaQueryList = this.mediaMatcher.matchMedia(query);
    // Create callback for match changes and add it is as a listener.
    const queryObservable: Observable<InternalBreakpointState> = fromEventPattern(
      // Listener callback methods are wrapped to be placed back in ngZone. Callbacks must be placed
      // back into the zone because matchMedia is only included in Zone.js by loading the
      // webapis-media-query.js file alongside the zone.js file.  Additionally, some browsers do not
      // have MediaQueryList inherit from EventTarget, which causes inconsistencies in how Zone.js
      // patches it.
      (listener: MediaQueryListListener) => {
        mql.addListener((e: MediaQueryList) => this.zone.run(() => listener(e)));
      },
      (listener: MediaQueryListListener) => {
        mql.removeListener((e: MediaQueryList) => this.zone.run(() => listener(e)));
      })
      .pipe(
        takeUntil(this._destroySubject),
        startWith(mql),
        map((nextMql: MediaQueryList) => (<InternalBreakpointState>{
          matches: nextMql.matches,
          query: query
        }))
      );

    // Add the MediaQueryList to the set of queries.
    const output: Query = {observable: queryObservable, mql: mql};
    this._queries.set(query, output);
    return output;
  }
}

/**
 * Splits all queries into individual query strings to be observed.
 */
function splitQueries(queries: string[]): string[] {
  return queries.map((query: string) => query.split(','))
                .reduce((a1: string[], a2: string[]) => a1.concat(a2));
}
