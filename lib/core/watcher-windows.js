var WatcherWindows, fileSystemWatcher;

if (process.platform === "win32") {
  fileSystemWatcher = require("windows-watcher");
}

WatcherWindows = (function() {
  WatcherWindows.listenPaths = [];

  WatcherWindows.callback = null;

  function WatcherWindows(directories, callback, verbose, silence_exceptions) {
    if (verbose == null) {
      verbose = false;
    }
    if (silence_exceptions == null) {
      silence_exceptions = false;
    }
    if (FeatherWatch.WINDOWS_EDGE === null) {
      FeatherWatch.WINDOWS_EDGE = require("edge");
    }
    console.log("Here WatcherWindows");
    this.windowsWatcher = new fileSystemWatcher(FeatherWatch.WINDOWS_EDGE);
    this.setup_watcher(directories, callback, verbose, silence_exceptions);
  }

  WatcherWindows.prototype.start = function() {
    var i, len, listenPath, ref, results;
    ref = this.listenPaths;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      listenPath = ref[i];
      results.push(this.windowsWatcher.watch(listenPath, this.callback));
    }
    return results;
  };

  WatcherWindows.prototype.stop = function() {
    var i, len, listenPath, ref, results;
    ref = this.listenPaths;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      listenPath = ref[i];
      results.push(this.windowsWatcher.unwatch(listenPath));
    }
    return results;
  };

  WatcherWindows.prototype.setup_watcher = function(directories, callback, verbose, silence_exceptions) {
    var callback_wrapper, dir, i, len, results;
    callback_wrapper = function(info) {
      if (info[0] === "Rename") {
        callback({
          status: "moved-out",
          file: info[1],
          event: info
        });
        return callback({
          status: "moved-in",
          file: info[2],
          event: info
        });
      } else {
        return callback({
          status: info[0].toLowerCase(),
          file: info[1],
          event: info
        });
      }
    };
    this.callback = callback_wrapper;
    this.listenPaths = [];
    results = [];
    for (i = 0, len = directories.length; i < len; i++) {
      dir = directories[i];
      results.push(this.listenPaths.push(dir));
    }
    return results;
  };

  return WatcherWindows;

})();

module.exports = WatcherWindows;
