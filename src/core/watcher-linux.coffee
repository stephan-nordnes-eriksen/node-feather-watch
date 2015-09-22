Inotify = require("inotify").Inotify if process.platform == "linux"

class WatcherLinux
	@fsevents = []
	constructor: (directories, callback, verbose = false, silence_exceptions = false) ->
		console.log("Here WatcherDarwin")
		@setupWatcher(directories, callback, verbose, silence_exceptions)
	start: () ->
		for watcher in @fsevents
			watcher.start()

	stop: () ->
		for watcher in @fsevents
			watcher.stop()

	setupWatcher: (directories, callback, verbose, silence_exceptions) ->
		callback_wrapper = (path, info) ->
			callback({status: info["event"], file: path, event: info})
		@fsevents = []
		if typeof directories == "string"
			@listerners.push(this.setupSingleListener(directories, callback_wrapper))
		else
			for dir in directories
				@listerners.push(this.setupSingleListener(dir, callback_wrapper))

	setupSingleListener: (fileSystemPath, callback) ->
		fse = fsevents(fileSystemPath)
		# fse.on
		# fse.on("change", callback)
		fse.on("created", callback)
		fse.on("deleted", callback)
		fse.on("modified", callback)
		fse.on("moved-out", callback)
		fse.on("moved-in", callback)
		return fse

module.exports = WatcherLinux