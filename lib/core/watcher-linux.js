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
    console.log("Here WatcherDarwin");
    setup_watcher(directories, callback, verbose, silence_exceptions);
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

  WatcherLinux.prototype.setup_watcher = function(directories, callback, verbose, silence_exceptions) {
    var callback_wrapper, dir, fse, i, len, results;
    callback_wrapper = function(path, info) {
      return callback({
        status: info["event"],
        file: path,
        event: info
      });
    };
    this.fsevents = [];
    results = [];
    for (i = 0, len = directories.length; i < len; i++) {
      dir = directories[i];
      fse = fsevents(dir);
      fse.on;
      fse.on("change", callback_wrapper);
      fse.on("created", callback_wrapper);
      fse.on("deleted", callback_wrapper);
      fse.on("modified", callback_wrapper);
      fse.on("moved-out", callback_wrapper);
      fse.on("moved-in", callback_wrapper);
      results.push(this.fsevents.push(fse));
    }
    return results;
  };

  return WatcherLinux;

})();

module.exports = WatcherLinux;
