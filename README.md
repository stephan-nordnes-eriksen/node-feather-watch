![FeatherWatch](/FeatherWatch.png?raw=true)

# Feather Watch

#### Warning: Pre-release. Not suited for production.

[![Dependency status](https://img.shields.io/david/stephan-nordnes-eriksen/node-feather-watch.svg?style=flat)](https://david-dm.org/stephan-nordnes-eriksen/node-feather-watch)
[![devDependency Status](https://img.shields.io/david/dev/stephan-nordnes-eriksen/node-feather-watch.svg?style=flat)](https://david-dm.org/stephan-nordnes-eriksen/node-feather-watch#info=devDependencies)
[![Build Status](https://img.shields.io/travis/stephan-nordnes-eriksen/node-feather-watch.svg?style=flat&branch=master)](https://travis-ci.org/stephan-nordnes-eriksen/node-feather-watch)

[![NPM](https://nodei.co/npm/feather-watch.svg?style=flat)](https://npmjs.org/package/feather-watch)

A high performance cross-platform file system watcher utilizing native file system events on every platform. 

## Installation

    npm install feather-watch

## Usage Example

### Watching Directories and files

```javascript
FW = require("feather-watch");
//on linux, freebsd, osx, and windows (windows needs drive, eg. "C:/")
watcher = new FW("/", function(event){
	console.log("File " + event.path + " was " + event.status);
	console.log("Native event", event.event);
});
watcher.start();
//...
//=> File /Users/You/Downloads/presentation.pdf was changed.
//=>"Native Event", {this: "depends", on: "the platform"}
//...
watcher.stop();

```

Feather Watch accepts an array of directories and/or files.

```javascript
FW = require("feather-watch");
watcher = new FW(["/dir1", "/dir2", "/file.txt"], function(event){
	//use event
});
watcher.start();
```

##Performance

All events comes from real native file system events. There is no polling, so you can safely monitor the entire file system with Feather Watch. But remember, if you listen to root, you will get a lot of events, so you need to consider the amount of work your code executes on every incoming event. You should probably filter out what you don't need with a switch-case, or something.

## License

The MIT License (MIT)

Copyright 2015 Stephan Nordnes Eriksen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


### Thanks to
 - Cray-Cray Design for logo.
