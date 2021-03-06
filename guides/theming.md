# Theming your Angular Material app

## What is a theme?

Angular Material's theming system enables you to customize components to
better reflect your product's brand. A theme consists of configurations for the individual
`color` and `typography` systems in Angular Material. The library's approach to theming reflects
the guidance from the [Material Design spec][1].

In Angular Material, you create a color configuration by composing multiple palettes. In
particular, a color configuration consists of:

* A **primary** palette: colors most widely used across all screens and components.
* An **accent** palette: colors used for the floating action button and interactive elements.
* A **warn** palette: colors used to convey error state.
* A **foreground** palette: colors for text and icons.
* A **background** palette: colors used for element backgrounds.

Additionally, in Angular Material, a configuration may optionally include `typography` settings.
More information on how typography works can be [found in a dedicated guide][3].

Angular Material theme styles are generated _statically_ at build-time so that your
app doesn't have to spend cycles generating theme styles when bootstrapping.

## Using a pre-built theme

Angular Material comes prepackaged with several pre-built theme css files. These theme files also
include all the styles for the core (styles common to all components), so you only have to include a
single css file for Angular Material in your app.

You can include a theme file directly into your application from
`@angular/material/prebuilt-themes`

Available pre-built themes:
* `deeppurple-amber.css`
* `indigo-pink.css`
* `pink-bluegrey.css`
* `purple-green.css`

If you're using Angular CLI, this is as simple as including one line
in your `styles.css`  file:
```css
@import '@angular/material/prebuilt-themes/deeppurple-amber.css';
```

Alternatively, you can just reference the file directly. This would look something like:
```html
<link href="node_modules/@angular/material/prebuilt-themes/indigo-pink.css" rel="stylesheet">
```
The actual path will depend on your server setup.

You can also concatenate the file with the rest of your application's css.

Finally, if your app's content **is not** placed inside a `mat-sidenav-container` element, you
need to add the `mat-app-background` class to your wrapper element (for example the `body`). This
ensures that the proper theme background is applied to your page.

## Defining a custom theme

When you want more customization than a pre-built theme offers, you can create your own theme file.

A custom theme file does two things:
1. Imports the `mat-core()` Sass mixin. This includes all common styles that are used by multiple
components. **This should only be included once in your application.** If this mixin is included
multiple times, your application will end up with multiple copies of these common styles.
2. Defines a **theme** data structure as the composition of configurations for the individual
theming systems (`color` and `typography`). This object can be created with either the
`mat-light-theme` function or the `mat-dark-theme` function. The output of this function is then
passed to the `angular-material-theme` mixin, which will output all the corresponding styles
for the theme.


A typical theme file will look something like this:
```scss
@import '~@angular/material/theming';
// Plus imports for other components in your app.

// Include the common styles for Angular Material. We include this here so that you only
// have to load a single css file for Angular Material in your app.
// Be sure that you only ever include this mixin once!
@include mat-core();

// Define the palettes for your theme using the Material Design palettes available in palette.scss
// (imported above). For each palette, you can optionally specify a default, lighter, and darker
// hue. Available color palettes: https://material.io/design/color/
$candy-app-primary: mat-palette($mat-indigo);
$candy-app-accent:  mat-palette($mat-pink, A200, A100, A400);

// The warn palette is optional (defaults to red).
$candy-app-warn:    mat-palette($mat-red);

// Create the theme object. A theme consists of configurations for individual
// theming systems such as `color` or `typography`.
$candy-app-theme: mat-light-theme((
  color: (
    primary: $candy-app-primary,
    accent: $candy-app-accent,
    warn: $candy-app-warn,
  ),
  typography: mat-typography-config(),
  density: 0, // Defaults to 0 if omitted, but shown for completeness.
));

// Include theme styles for core and each component used in your app.
// Alternatively, you can import and @include the theme mixins for each component
// that you are using.
@include angular-material-theme($candy-app-theme);
```

You only need this single Sass file; you do not need to use Sass to style the rest of your app.

If you are using the Angular CLI, support for compiling Sass to css is built-in; you only have to
add a new entry to the `"styles"` list in `angular.json` pointing to the theme
file (e.g., `unicorn-app-theme.scss`).

If you're not using the Angular CLI, you can use any existing Sass tooling to build the file (such
as gulp-sass or grunt-sass). The simplest approach is to use the `sass` CLI; you simply run:
```
sass src/unicorn-app-theme.scss dist/unicorn-app-theme.css
```
Then include the output file in your index.html.

Your custom theme file **should not** be imported into other SCSS files. This will duplicate styles
in your CSS output. If you want to consume your theme definition object
(e.g., `$candy-app-theme`) in other SCSS files, then the definition of the theme object should be
broken into its own file, separate from the inclusion of the `mat-core` and
`angular-material-theme` mixins.

The theme file can be concatenated and minified with the rest of the application's css.

Note that if you include the generated theme file in the `styleUrls` of an Angular component, those
styles will be subject to that component's [view encapsulation](https://angular.io/docs/ts/latest/guide/component-styles.html#!#view-encapsulation).

### Multiple themes

You can create multiple themes for your application by including the `angular-material-theme` mixin
multiple times, where each inclusion is gated by an additional CSS class.

Remember to only ever include the `@mat-core` mixin once; it should not be included for each
theme.

#### Example of defining multiple themes:

```scss
@import '~@angular/material/theming';
// Plus imports for other components in your app.

// Include the common styles for Angular Material. We include this here so that you only
// have to load a single css file for Angular Material in your app.
// **Be sure that you only ever include this mixin once!**
@include mat-core();

// Define the default theme (same as the example above).
$candy-app-primary: mat-palette($mat-indigo);
$candy-app-accent:  mat-palette($mat-pink, A200, A100, A400);
$candy-app-theme:   mat-light-theme((
  color: (
    primary: $candy-app-primary,
    accent: $candy-app-accent,
  ),
  typography: mat-typography-config()
));

// Include the default theme styles (color and default density)
@include angular-material-theme($candy-app-theme);


// Define an alternate dark theme.
$dark-primary: mat-palette($mat-blue-grey);
$dark-accent:  mat-palette($mat-amber, A200, A100, A400);
$dark-warn:    mat-palette($mat-deep-orange);
$dark-theme:   mat-dark-theme((
  color: (
    primary: $dark-primary,
    accent: $dark-accent,
    warn: $dark-warn,
  )
));

// Include the dark color styles inside of a block with a CSS class. You can make this
// CSS class whatever you want. In this example, any component inside of an element with
// `.unicorn-dark-theme` will be affected by this alternate dark theme instead of the default theme.
.unicorn-dark-theme {
  @include angular-material-color($dark-theme);
}
```

In the above example, any component inside a parent with the `unicorn-dark-theme` class will use
the dark theme, while other components will fall back to the default `$candy-app-theme`.

You can include as many color schemes as you like in this manner. You can also `@include` the
`angular-material-color` in separate files and then lazily load them based on an end-user
interaction (how to lazily load the CSS assets will vary based on your application).

It's important to remember, however, that the `mat-core` mixin should only ever be included _once_.
Similarly, the `angular-material-theme` mixin should not be used multiple times as it generates
styles for all configured theming system parts. For example, typography styles would be generated
multiple times, even though the configuration did not change. Instead, use fine-grained mixins such
as `angular-material-color` that only result in styles being generated for the [color system][2].

Read more about duplicated theme styles in the [dedicated guide](./duplicate-theming-styles.md).

#### Multiple themes and overlay-based components

Since certain components (e.g. menu, select, dialog, etc.) are inside a global overlay container,
an additional step is required for those components to be affected by the theme's css class selector
(`.unicorn-dark-theme` in the example above).

To do this, you can add the appropriate class to the global overlay container. For the example above,
this would look like:
```ts
import {OverlayContainer} from '@angular/cdk/overlay';

@NgModule({
  // ...
})
export class UnicornCandyAppModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
  }
}
```

### Theming only certain components

The `angular-material-theme` mixin will output styles for [all components in the library](https://github.com/angular/components/blob/master/src/material/core/theming/_all-theme.scss).
If you are only using a subset of the components (or if you want to change the theme for specific
components), you can include component-specific theme mixins. You also will need to include
the `mat-core-theme` mixin as well, which contains theme-specific styles for common behaviors
(such as ripples).

 ```scss
@import '~@angular/material/theming';
// Plus imports for other components in your app.

// Include the common styles for Angular Material. We include this here so that you only
// have to load a single css file for Angular Material in your app.
// **Be sure that you only ever include this mixin once!**
@include mat-core();

// Define the theme.
$candy-app-primary: mat-palette($mat-indigo);
$candy-app-accent:  mat-palette($mat-pink, A200, A100, A400);
$candy-app-theme:   mat-light-theme((
  color: (
    primary: $candy-app-primary,
    accent: $candy-app-accent,
  ),
  typography: mat-typography-config()
));

// Include the theme styles for only specified components.
@include mat-core-theme($candy-app-theme);
@include mat-button-theme($candy-app-theme);
@include mat-checkbox-theme($candy-app-theme);
```

### Changing styles at run-time

#### Toggling classes

You can use the theming mixins to customize any part of your application with standard
CSS selectors. For example, let's say you want to toggle alternate colors on a button.
You would first define a CSS class with the alternate colors.

Note that `mat-button-color` should be used instead of `mat-button-theme` as we only
want to have alternate colors for the button. Using the theme mixin could result in
duplicative theme styles if the `mat-button-theme` has been included before. Read more about
this in the [dedicated guide](./duplicate-theming-styles.md).

```scss
.alternate-button {
  // Extract the color configuration from the theme and generate
  // the color theme styles for `mat-button`.
  @include mat-button-color($alternate-theme);
}
```

Then you can use normal Angular class bindings to toggle the alternate styles.
```html
<div [class.alternate-button]="isAlternateMode">
  <button mat-button>Save changes</button>
</div>
```

You can use this approach to style any component inside the region marked with the custom
CSS class.

#### Swapping CSS files

If you want to completely swap a theme without including all the styles at once, you
can swap the loaded theme file. The details will depend on your application, but the general
idea looks like this:

```html
<link id="themeAsset" rel="stylesheet" href="/path/to/my/theme-name.css">
```
```ts
function changeTheme(themeName) {
  document.getElementById('themeAsset').href = `/path/to/my/${themeName}.css`;
}
```

## Theming your own components

For more details about theming your own components,
see [theming-your-components.md](./theming-your-components.md).

[1]: https://material.io/archive/guidelines/style/color.html#color-color-palette
[2]: https://material.io/design/color
[3]: ./typography.md
