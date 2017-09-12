# Webpack-Get-Code-On-Done

[![Greenkeeper badge](https://badges.greenkeeper.io/Metnew/webpack-get-code-on-done.svg)](https://greenkeeper.io/) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![Build Status](https://travis-ci.org/Metnew/webpack-get-code-on-done.svg?branch=master)](https://travis-ci.org/Metnew/webpack-get-code-on-done)

## TL;DR

Allows you to get compiled code after compiler's `done` event. Heavily inspired by [webpack-hot-server-middleware](https://github.com/60frames/webpack-hot-server-middleware).

## Why?

> Check **[Tiny-Universal-Skeleton](https://github.com/Metnew/tiny-universal-skeleton)** for example with step-by-step guide.

It's very useful when you're working with _universal apps_. Imagine that you have server, development server and client:

- **Server** - your server _middlewares_, _api endpoints_ and _SSR_.
- **Development server** - express server with `webpack-hot-middleware` and `webpack-dev-middleware`.
- **Client** - your frontend. (e.g. React app).

**Main problem**: sync **server middlewares** with **client** and don't lose **power of webpack-dev-server.**

> There are other solutions like [universal-webpack](https://github.com/catamphetamine/universal-webpack).<br>
> I'm not sure what's going on inside `universal-webpack` and is it be able to solve the problem. But it **looks complicated**.

> In case of a bug inside a complicated software with low community support you'll be the one person who cares about this bug.

Indeed, my solution is **very-very simple**. But it's not the best, of course.

Shortly, it can be described like:

1. Server entry **should export function that decorates server with all middlewares**, api endpoints, ssr. _Except dev middlewares._
2. Compile **both server and client with Webpack**.
3. Find **compiled decorator** for server and **decorate your dev server**. _DevServer = express server with development middlewares._
4. ????????????
5. Every time your code changes, webpack recompiles your code and decorates your server with newly compiled code.

## How?

Check **[Tiny-Universal-Skeleton](https://github.com/Metnew/tiny-universal-skeleton)** for example with step-by-step guide.

### API

#### `webpackHotFullStack(serverCompiler, done):`

Module exports function that accepts 2 arguments:

1. `serverCompiler` - webpack Compiler that compiles your server.
2. `done` - function that will be executed after `compile.on('done')` event. E.g. Every time your code will be changed.

### License

Apache-2.0

### Author

Vladimir Metnew [vladimirmetnew@gmail.com](mailto:vladimirmetnew@gmail.com)
