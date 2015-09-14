Inotify = require("inotify").Inotify if process.platform == "linux"

class WatcherLinux
	@fsevents = []
	constructor: (directories, callback, verbose = false, silence_exceptions = false) ->
		console.log("Here WatcherDarwin")
		setup_watcher(directories, callback, verbose, silence_exceptions)
	start: () ->
		for watcher in @fsevents
			watcher.start()

	stop: () ->
		for watcher in @fsevents
			watcher.stop()

	setup_watcher: (directories, callback, verbose, silence_exceptions) ->
		callback_wrapper = (path, info) ->
			callback({status: info["event"], file: path, event: info})
		@fsevents = []
		for dir in directories
			fse = fsevents(dir)
			fse.on
			fse.on("change", callback_wrapper)
			fse.on("created", callback_wrapper)
			fse.on("deleted", callback_wrapper)
			fse.on("modified", callback_wrapper)
			fse.on("moved-out", callback_wrapper)
			fse.on("moved-in", callback_wrapper)
			@fsevents.push(fse)

module.exports = WatcherLinux