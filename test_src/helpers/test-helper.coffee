global.chai = require('chai')
global.sinon = require("sinon")
sinonChai = require("sinon-chai")
path = require("path")
chai.config.includeStack = true

global.expect = global.chai.expect
global.AssertionError = global.chai.AssertionError
global.Assertion = global.chai.Assertion
global.assert = global.chai.assert
global.chai.use(sinonChai)

global.TESTING = true


global.FeatherWatch = require(path.resolve(__dirname, "..","..","lib", "feather-watch.js"))

global.WatcherDarwin  = require(path.resolve(__dirname, "..","..","lib", "core", "watcher-darwin.js"))
global.WatcherLinux   = require(path.resolve(__dirname, "..","..","lib", "core", "watcher-linux.js"))
global.WatcherWindows = require(path.resolve(__dirname, "..","..","lib", "core", "watcher-windows.js"))