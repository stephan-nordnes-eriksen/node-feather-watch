var Inotify, WatcherLinux;

if (process.platform === "linux") {
  Inotify = require("inotify").Inotify;
}

WatcherLinux = (function() {
  WatcherLinux.fsevents = [];

  function WatcherLinux(directories, callback, verbose, silence_exceptions) {
    if (verbose == null) {
      verbose = false;
    }
    if (silence_exceptions == null) {
      silence_exceptions = false;
    }
    this.setupWatcher(directories, callback, verbose, silence_exceptions);
  }

  WatcherLinux.prototype.start = function() {
    var i, len, ref, results, watcher;
    ref = this.fsevents;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      watcher = ref[i];
      results.push(watcher.start());
    }
    return results;
  };

  WatcherLinux.prototype.stop = function() {
    var i, len, ref, results, watcher;
    ref = this.fsevents;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      watcher = ref[i];
      results.push(watcher.stop());
    }
    return results;
  };

  WatcherLinux.prototype.setupWatcher = function(directories, callback, verbose, silence_exceptions) {
    var callback_wrapper, dir, i, len, results;
    callback_wrapper = function(path, info) {
      return callback({
        status: info["event"],
        file: path,
        event: info
      });
    };
    this.fsevents = [];
    if (typeof directories === "string") {
      return this.listerners.push(this.setupSingleListener(directories, callback_wrapper));
    } else {
      results = [];
      for (i = 0, len = directories.length; i < len; i++) {
        dir = directories[i];
        results.push(this.listerners.push(this.setupSingleListener(dir, callback_wrapper)));
      }
      return results;
    }
  };

  WatcherLinux.prototype.setupSingleListener = function(fileSystemPath, callback) {
    var fse;
    fse = fsevents(fileSystemPath);
    fse.on("created", callback);
    fse.on("deleted", callback);
    fse.on("modified", callback);
    fse.on("moved-out", callback);
    fse.on("moved-in", callback);
    return fse;
  };

  return WatcherLinux;

})();

module.exports = WatcherLinux;
