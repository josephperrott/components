export declare const MAT_STEPPER_INTL_PROVIDER: {
    provide: typeof MatStepperIntl;
    deps: Optional[][];
    useFactory: typeof MAT_STEPPER_INTL_PROVIDER_FACTORY;
};

export declare function MAT_STEPPER_INTL_PROVIDER_FACTORY(parentIntl: MatStepperIntl): MatStepperIntl;

export declare class MatHorizontalStepper extends MatStepper {
    labelPosition: 'bottom' | 'end';
    static ngAcceptInputType_completed: BooleanInput;
    static ngAcceptInputType_editable: BooleanInput;
    static ngAcceptInputType_hasError: BooleanInput;
    static ngAcceptInputType_optional: BooleanInput;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<MatHorizontalStepper, "mat-horizontal-stepper", ["matHorizontalStepper"], { "selectedIndex": "selectedIndex"; "labelPosition": "labelPosition"; }, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<MatHorizontalStepper, never>;
}

export declare class MatStep extends CdkStep implements ErrorStateMatcher, AfterContentInit, OnDestroy {
    _lazyContent: MatStepContent;
    _portal: TemplatePortal;
    color: ThemePalette;
    stepLabel: MatStepLabel;
    constructor(stepper: MatStepper, _errorStateMatcher: ErrorStateMatcher, _viewContainerRef: ViewContainerRef, stepperOptions?: StepperOptions);
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<MatStep, "mat-step", ["matStep"], { "color": "color"; }, {}, ["stepLabel", "_lazyContent"], ["*"]>;
    static ɵfac: i0.ɵɵFactoryDef<MatStep, [null, { skipSelf: true; }, null, { optional: true; }]>;
}

export declare class MatStepContent {
    _template: TemplateRef<any>;
    constructor(_template: TemplateRef<any>);
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<MatStepContent, "ng-template[matStepContent]", never, {}, {}, never>;
    static ɵfac: i0.ɵɵFactoryDef<MatStepContent, never>;
}

export declare class MatStepHeader extends _MatStepHeaderMixinBase implements AfterViewInit, OnDestroy, CanColor {
    _intl: MatStepperIntl;
    active: boolean;
    disableRipple: boolean;
    errorMessage: string;
    iconOverrides: {
        [key: string]: TemplateRef<MatStepperIconContext>;
    };
    index: number;
    label: MatStepLabel | string;
    optional: boolean;
    selected: boolean;
    state: StepState;
    constructor(_intl: MatStepperIntl, _focusMonitor: FocusMonitor, _elementRef: ElementRef<HTMLElement>, changeDetectorRef: ChangeDetectorRef);
    _getDefaultTextForState(state: StepState): string;
    _getHostElement(): HTMLElement;
    _getIconContext(): MatStepperIconContext;
    _stringLabel(): string | null;
    _templateLabel(): MatStepLabel | null;
    focus(origin?: FocusOrigin, options?: FocusOptions): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<MatStepHeader, "mat-step-header", never, { "color": "color"; "state": "state"; "label": "label"; "errorMessage": "errorMessage"; "iconOverrides": "iconOverrides"; "index": "index"; "selected": "selected"; "active": "active"; "optional": "optional"; "disableRipple": "disableRipple"; }, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<MatStepHeader, never>;
}

export declare class MatStepLabel extends CdkStepLabel {
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<MatStepLabel, "[matStepLabel]", never, {}, {}, never>;
    static ɵfac: i0.ɵɵFactoryDef<MatStepLabel, never>;
}

export declare class MatStepper extends CdkStepper implements AfterContentInit {
    _animationDone: Subject<AnimationEvent>;
    _iconOverrides: {
        [key: string]: TemplateRef<MatStepperIconContext>;
    };
    _icons: QueryList<MatStepperIcon>;
    _stepHeader: QueryList<MatStepHeader>;
    _steps: QueryList<MatStep>;
    readonly animationDone: EventEmitter<void>;
    color: ThemePalette;
    disableRipple: boolean;
    readonly steps: QueryList<MatStep>;
    protected _updateOrientation(): void;
    ngAfterContentInit(): void;
    static ngAcceptInputType_completed: BooleanInput;
    static ngAcceptInputType_editable: BooleanInput;
    static ngAcceptInputType_hasError: BooleanInput;
    static ngAcceptInputType_optional: BooleanInput;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<MatStepper, "[matStepper]", never, { "disableRipple": "disableRipple"; "color": "color"; }, { "animationDone": "animationDone"; }, ["_steps", "_icons"]>;
    static ɵfac: i0.ɵɵFactoryDef<MatStepper, never>;
}

export declare const matStepperAnimations: {
    readonly horizontalStepTransition: AnimationTriggerMetadata;
    readonly verticalStepTransition: AnimationTriggerMetadata;
};

export declare class MatStepperIcon {
    name: StepState;
    templateRef: TemplateRef<MatStepperIconContext>;
    constructor(templateRef: TemplateRef<MatStepperIconContext>);
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<MatStepperIcon, "ng-template[matStepperIcon]", never, { "name": "matStepperIcon"; }, {}, never>;
    static ɵfac: i0.ɵɵFactoryDef<MatStepperIcon, never>;
}

export interface MatStepperIconContext {
    active: boolean;
    index: number;
    optional: boolean;
}

export declare class MatStepperIntl {
    readonly changes: Subject<void>;
    optionalLabel: string;
    static ɵfac: i0.ɵɵFactoryDef<MatStepperIntl, never>;
    static ɵprov: i0.ɵɵInjectableDef<MatStepperIntl>;
}

export declare class MatStepperModule {
    static ɵfac: i0.ɵɵFactoryDef<MatStepperModule, never>;
    static ɵinj: i0.ɵɵInjectorDef<MatStepperModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<MatStepperModule, [typeof i1.MatHorizontalStepper, typeof i1.MatVerticalStepper, typeof i1.MatStep, typeof i2.MatStepLabel, typeof i1.MatStepper, typeof i3.MatStepperNext, typeof i3.MatStepperPrevious, typeof i4.MatStepHeader, typeof i5.MatStepperIcon, typeof i6.MatStepContent], [typeof i7.MatCommonModule, typeof i8.CommonModule, typeof i9.PortalModule, typeof i10.MatButtonModule, typeof i11.CdkStepperModule, typeof i12.MatIconModule, typeof i7.MatRippleModule], [typeof i7.MatCommonModule, typeof i1.MatHorizontalStepper, typeof i1.MatVerticalStepper, typeof i1.MatStep, typeof i2.MatStepLabel, typeof i1.MatStepper, typeof i3.MatStepperNext, typeof i3.MatStepperPrevious, typeof i4.MatStepHeader, typeof i5.MatStepperIcon, typeof i6.MatStepContent]>;
}

export declare class MatStepperNext extends CdkStepperNext {
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<MatStepperNext, "button[matStepperNext]", never, { "type": "type"; }, {}, never>;
    static ɵfac: i0.ɵɵFactoryDef<MatStepperNext, never>;
}

export declare class MatStepperPrevious extends CdkStepperPrevious {
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<MatStepperPrevious, "button[matStepperPrevious]", never, { "type": "type"; }, {}, never>;
    static ɵfac: i0.ɵɵFactoryDef<MatStepperPrevious, never>;
}

export declare class MatVerticalStepper extends MatStepper {
    constructor(dir: Directionality, changeDetectorRef: ChangeDetectorRef, elementRef: ElementRef<HTMLElement>, _document: any);
    static ngAcceptInputType_completed: BooleanInput;
    static ngAcceptInputType_editable: BooleanInput;
    static ngAcceptInputType_hasError: BooleanInput;
    static ngAcceptInputType_optional: BooleanInput;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<MatVerticalStepper, "mat-vertical-stepper", ["matVerticalStepper"], { "selectedIndex": "selectedIndex"; }, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<MatVerticalStepper, [{ optional: true; }, null, null, null]>;
}
