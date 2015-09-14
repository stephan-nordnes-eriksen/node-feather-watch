fsevents = require("fsevents") if process.platform == "darwin"

class WatcherDarwin
	@listerners = []
	constructor: (directories, callback, verbose = false, silence_exceptions = false) ->
		console.log("Here WatcherDarwin")
		@setupWatcher(directories, callback, verbose, silence_exceptions)
	start: () ->
		for watcher in @listerners
			watcher.start()

	stop: () ->
		for watcher in @listerners
			watcher.stop()

	setupWatcher: (directories, callback, verbose, silence_exceptions) ->
		callback_wrapper = (path, info) ->
			callback({status: info["event"], file: path, event: info})
		@listerners = []
		if typeof directories == "string"
			@listerners.push(setupSingleListener(directories, callback_wrapper))
		else
			for dir in directories
				@listerners.push(setupSingleListener(dir, callback_wrapper))

	setupSingleListener: (fileSystemPath, callback) ->
		fse = fsevents(fileSystemPath)
		# fse.on
		# fse.on("change", callback_wrapper)
		fse.on("created", callback_wrapper)
		fse.on("deleted", callback_wrapper)
		fse.on("modified", callback_wrapper)
		fse.on("moved-out", callback_wrapper)
		fse.on("moved-in", callback_wrapper)
		return fse


# fsevent - RAW Event as emitted by OS-X
# change - Common Event for all changes
# created - A File-System-Item has been created
# deleted - A File-System-Item has been deleted
# modified - A File-System-Item has been modified
# moved-out - A File-System-Item has been moved away from this location
# moved-in - A File-System-Item has been moved into this location

# var fsevents = require('fsevents');
# var watcher = fsevents(__dirname);
# watcher.on('fsevent', function(path, flags, id) { }); // RAW Event as emitted by OS-X
# watcher.on('change', function(path, info) {}); // Common Event for all changes
# watcher.start() // To start observation
# watcher.stop()  // To end observation


module.exports = WatcherDarwin