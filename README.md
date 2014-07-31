units3-mobile-app
=====================

## Installation

```bash
$ npm install -g cordova gulp grunt
$ git clone https://github.com/joined/units3-mobile-app
$ cd units3-mobile-app
$ npm install && gulp install
```

## Development server

This project uses SCSS. To serve the project you can use `gulp serve` which starts a development server
with livereload and compiles SCSS files when they change.

```bash
$ gulp serve
[11:00:17] Using gulpfile /units3-mobile-app/gulpfile.js
[11:00:17] Starting 'serve'...
[11:00:17] Webserver started at http://localhost:8000
[11:00:17] Finished 'serve' after 19 ms
[11:00:24] Starting 'sass'...
[11:00:24] Finished 'sass' after 444 ms
```

## Android emulate

```bash
$ cordova platform add android
$ cordova emulate android
```

## iOS emulate

```bash
$ cordova platform add ios
$ cordova emulate ios
```

## Compile with online PhoneGap Build

Go to [https://build.phonegap.com](PhoneGap Build website) and create an account.

The first time use `grunt compress` to create a compressed archive (`app.zip`) and upload it to PhoneGap build website
creating a new app.

Then you can take the App ID and put it into `phonegap-build.yaml` together with your email (see the sample for the format).

Now you can trigger a new build with `grunt pgbuild`. This does the following tasks:

+ creates a compressed archive
+ uploads it to PhoneGap Build service
+ waits for the compiled app
+ downloads it into `dist/` folder.