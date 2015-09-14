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
    if (WatcherWindows.WINDOWS_EDGE != null) {
      this.windowsWatcher = new fileSystemWatcher(WatcherWindows.WINDOWS_EDGE);
    } else {
      this.windowsWatcher = new fileSystemWatcher();
    }
    this.setupWatcher(directories, callback, verbose, silence_exceptions);
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

  WatcherWindows.prototype.setupWatcher = function(directories, callback, verbose, silence_exceptions) {
    var callback_wrapper, dir, i, len, results;
    callback_wrapper = function(info) {
      switch (info[0]) {
        case "Rename":
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
        case "Changed":
          return callback({
            status: "modified",
            file: info[1],
            event: info
          });
        case "Created":
          return callback({
            status: "created",
            file: info[1],
            event: info
          });
        case "Deleted":
          return callback({
            status: "deleted",
            file: info[1],
            event: info
          });
      }
    };
    this.listenPaths = [];
    this.callback = callback_wrapper;
    if (typeof directories === "string") {
      return this.listenPaths.push(directories);
    } else {
      results = [];
      for (i = 0, len = directories.length; i < len; i++) {
        dir = directories[i];
        results.push(this.listenPaths.push(dir));
      }
      return results;
    }
  };

  WatcherWindows.setEdge = function(edge) {
    return WatcherWindows.WINDOWS_EDGE = edge;
  };

  return WatcherWindows;

})();

module.exports = WatcherWindows;
