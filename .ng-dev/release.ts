import {ReleaseConfig} from '@angular/dev-infra-private/release/config';
import {CHANGELOG_FILE_NAME, promptAndGenerateChangelog} from '../tools/release/changelog';
import {releasePackages} from '../tools/release/release-output/release-packages';
import {performNpmReleaseBuild} from '../scripts/build-packages-dist';

import {join} from 'path';

/** Configuration for the `ng-dev release` command. */
export const release: ReleaseConfig = {
  npmPackages: releasePackages.map(pkg => `@angular/${pkg}`),
  buildPackages: async () => {
    return performNpmReleaseBuild();
  },
  // TODO: This can be removed once there is an org-wide tool for changelog generation.
  generateReleaseNotesForHead: async () => {
    await promptAndGenerateChangelog(join(__dirname, '../', CHANGELOG_FILE_NAME));
  },
};
