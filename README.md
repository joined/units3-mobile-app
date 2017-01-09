DISCONTINUED - units3-mobile-app
=====================

## Installation

```bash
$ npm install -g cordova grunt-cli bower
$ git clone https://github.com/joined/units3-mobile-app
$ cd units3-mobile-app
$ npm install && bower install
```

## Development server

This project uses SCSS. To serve the project you can use `grunt serve` which starts a development server
with livereload and compiles SCSS files when they change.

```bash
$ grunt serve
Running "serve" task

Running "connect:server" (connect) task
Started connect web server on http://127.0.0.1:9000

Running "watch" task
Waiting...
>> File "www/scss/ionic.app.scss" changed.

Running "sass:dist" (sass) task
File www/css/ionic.app.css created.

Running "cssmin:minify" (cssmin) task
File www/css/ionic.app.min.css created: 208.21 kB → 160.27 kB

Running "watch" task
Completed in 3.848s at Sat Aug 02 2014 15:49:41 GMT+0200 (CEST) - Waiting...
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

The first time use `grunt mkzip` to create a compressed archive (`app.zip`) and upload it to PhoneGap build website
creating a new app.

Then you can take the App ID and put it into `phonegap-build.yaml` together with your email (see the sample for the format).

Now you can trigger a new build with `grunt onlinebuild`. This does the following tasks:

+ creates a compressed archive
+ uploads it to PhoneGap Build service
+ waits for the compiled app
+ downloads it into `dist/` folder.