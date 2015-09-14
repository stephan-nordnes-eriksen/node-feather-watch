var WatcherDarwin, fsevents;

if (process.platform === "darwin") {
  fsevents = require("fsevents");
}

WatcherDarwin = (function() {
  WatcherDarwin.listerners = [];

  function WatcherDarwin(directories, callback, verbose, silence_exceptions) {
    if (verbose == null) {
      verbose = false;
    }
    if (silence_exceptions == null) {
      silence_exceptions = false;
    }
    console.log("Here WatcherDarwin");
    this.setupWatcher(directories, callback, verbose, silence_exceptions);
  }

  WatcherDarwin.prototype.start = function() {
    var i, len, ref, results, watcher;
    ref = this.listerners;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      watcher = ref[i];
      results.push(watcher.start());
    }
    return results;
  };

  WatcherDarwin.prototype.stop = function() {
    var i, len, ref, results, watcher;
    ref = this.listerners;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      watcher = ref[i];
      results.push(watcher.stop());
    }
    return results;
  };

  WatcherDarwin.prototype.setupWatcher = function(directories, callback, verbose, silence_exceptions) {
    var callback_wrapper, dir, i, len, results;
    callback_wrapper = function(path, info) {
      return callback({
        status: info["event"],
        file: path,
        event: info
      });
    };
    this.listerners = [];
    if (typeof directories === "string") {
      return this.listerners.push(setupSingleListener(directories, callback_wrapper));
    } else {
      results = [];
      for (i = 0, len = directories.length; i < len; i++) {
        dir = directories[i];
        results.push(this.listerners.push(setupSingleListener(dir, callback_wrapper)));
      }
      return results;
    }
  };

  WatcherDarwin.prototype.setupSingleListener = function(fileSystemPath, callback) {
    var fse;
    fse = fsevents(fileSystemPath);
    fse.on("created", callback_wrapper);
    fse.on("deleted", callback_wrapper);
    fse.on("modified", callback_wrapper);
    fse.on("moved-out", callback_wrapper);
    fse.on("moved-in", callback_wrapper);
    return fse;
  };

  return WatcherDarwin;

})();

module.exports = WatcherDarwin;
