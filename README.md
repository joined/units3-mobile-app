units3-mobile-app
=====================

## Installation

```bash
$ sudo npm install -g cordova ionic gulp
$ git clone https://github.com/joined/units3-mobile-app
$ cd units3-mobile-app
$ npm install && gulp install
$ ionic serve
 Running dev server at http://localhost:8100
 ...
```

## Android build
```bash
$ cordova plugin add https://github.com/driftyco/ionic-plugins-keyboard.git
$ cordova plugin add org.apache.cordova.console
$ cordova plugin add org.apache.cordova.device
$ cordova plugin add org.apache.cordova.network-information
$ ionic platform add android
$ ionic build android
```

<!-- ## Using Sass (optional)

This project makes it easy to use Sass (the SCSS syntax) in your projects. This enables you to override styles from Ionic, and benefit from
Sass's great features.

Just update the `./scss/ionic.app.scss` file, and run `gulp` or `gulp watch` to rebuild the CSS files for Ionic.

Note: if you choose to use the Sass method, make sure to remove the included `ionic.css` file in `index.html`, and then uncomment
the include to your `ionic.app.css` file which now contains all your Sass code and Ionic itself:

```html
IF using Sass (run gulp sass first), then remove the CSS include above
<link href="css/ionic.app.css" rel="stylesheet">
```
 -->