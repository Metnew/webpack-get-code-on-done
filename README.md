# Webpack-Get-Code-On-Done

[![Greenkeeper badge](https://badges.greenkeeper.io/Metnew/webpack-get-code-on-done.svg)](https://greenkeeper.io/) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![Build Status](https://travis-ci.org/Metnew/webpack-get-code-on-done.svg?branch=master)](https://travis-ci.org/Metnew/webpack-get-code-on-done)

## TL;DR

Allows you to get compiled code after compiler's `done` event. Heavily inspired by [webpack-hot-server-middleware](https://github.com/60frames/webpack-hot-server-middleware).

## Why?

It's very useful when you're working with _universal apps_. Check **[Tiny-Universal-Skeleton](https://github.com/Metnew/tiny-universal-skeleton)** for an example with step-by-step guide.

### Where?
Webpack-Get-Code-On-Done is used inside [suicrux](https://github.com/Metnew/suicrux).

### API

#### `webpackGetCodeOnDone(serverCompiler, done):`

Default export - function that accepts 2 arguments:

1. `serverCompiler` - webpack Compiler that compiles your server.
2. `done` - function that will be executed after `compile.on('done')` event. E.g. Every time your code will be changed.

### License

Apache 2.0 License

### Author

Vladimir Metnew [vladimirmetnew@gmail.com](mailto:vladimirmetnew@gmail.com)
