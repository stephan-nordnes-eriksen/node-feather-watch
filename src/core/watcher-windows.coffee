fileSystemWatcher = require("windows-watcher") if process.platform == "win32"

class WatcherWindows
	@listenPaths = []
	@callback = null
	constructor: (directories, callback, verbose = false, silence_exceptions = false) ->
		if FeatherWatch.WINDOWS_EDGE == null
			FeatherWatch.WINDOWS_EDGE = require "edge"

		console.log("Here WatcherWindows")
		
		
		@windowsWatcher = new fileSystemWatcher(FeatherWatch.WINDOWS_EDGE)
		@setup_watcher(directories, callback, verbose, silence_exceptions)
	
	start: () ->
		for listenPath in @listenPaths
			@windowsWatcher.watch(listenPath, @callback)

	stop: () ->
		for listenPath in @listenPaths
			@windowsWatcher.unwatch(listenPath)
		#@windowsWatcher.unwatchAll() #next version has this

	setup_watcher: (directories, callback, verbose, silence_exceptions) ->
		callback_wrapper = (info) ->
			if info[0] == "Rename"
				callback({status: "moved-out", file: info[1], event: info})
				callback({status: "moved-in", file: info[2], event: info})
			else
				callback({status: info[0].toLowerCase(), file: info[1], event: info})


		@callback = callback_wrapper

		@listenPaths = []
		for dir in directories
			@listenPaths.push(dir)
			# @windowsWatcher.watch(dir, @callback) #this will start the listener
			
module.exports = WatcherWindows