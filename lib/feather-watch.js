var FeatherWatch, SpecificWatcher;

if (process.platform === "linux") {
  SpecificWatcher = require('./core/watcher-linux.js');
}

if (process.platform === "freebsd") {
  SpecificWatcher = require('./core/watcher-linux.js');
}

if (process.platform === "darwin") {
  SpecificWatcher = require('./core/watcher-darwin.js');
}

if (process.platform === "win32") {
  SpecificWatcher = require('./core/watcher-windows.js');
}

FeatherWatch = (function() {
  FeatherWatch.WINDOWS_EDGE = null;

  function FeatherWatch(directories, callback, verbose, silence_exceptions) {
    if (verbose == null) {
      verbose = false;
    }
    if (silence_exceptions == null) {
      silence_exceptions = false;
    }
    console.log("Constructor");
    return new SpecificWatcher(directories, callback, verbose, silence_exceptions);
  }

  FeatherWatch.setWindowsEdge = function(edge) {
    if (process.platform === "win32") {
      return SpecificWatcher.setEdge(edge);
    }
  };

  return FeatherWatch;

})();

module.exports = FeatherWatch;
