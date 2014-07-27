units3-mobile-app
=====================

## Installation

```bash
$ sudo npm install -g cordova ionic gulp
$ git clone https://github.com/joined/units3-mobile-app
$ cd units3-mobile-app
$ npm install && gulp install
```

## SCSS

This project uses SCSS. You can use gulp to compile one-time or watch the folders.

```bash
$ gulp watch                                                                                                                     
 [17:59:47] Using gulpfile ~/units3-mobile-app/gulpfile.js
 [17:59:47] Starting 'watch'...
 [17:59:47] Finished 'watch' after 7.95 ms
 [18:00:36] Starting 'sass'...
 [18:00:37] Finished 'sass' after 490 ms
```

## Local developement server

```bash
$ ionic serve
 Running dev server at http://localhost:8100
 ...
```

## Android emulate

```bash
$ ionic platform add android
$ ionic emulate android
```

## iOS emulate

```bash
$ ionic platform add ios
$ ionic emulate ios
```