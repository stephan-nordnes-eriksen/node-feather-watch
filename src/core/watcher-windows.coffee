fileSystemWatcher = require("windows-watcher") if process.platform == "win32"

class WatcherWindows
	@listenPaths = []
	@callback = null
	constructor: (directories, callback, verbose = false, silence_exceptions = false) ->
		if WatcherWindows.WINDOWS_EDGE?
			@windowsWatcher = new fileSystemWatcher(WatcherWindows.WINDOWS_EDGE)
		else
			@windowsWatcher = new fileSystemWatcher()
					
		@setupWatcher(directories, callback, verbose, silence_exceptions)
	
	start: () ->
		for listenPath in @listenPaths
			@windowsWatcher.watch(listenPath, @callback)

	stop: () ->
		for listenPath in @listenPaths
			@windowsWatcher.unwatch(listenPath)
		#@windowsWatcher.unwatchAll() #next version has this

	setupWatcher: (directories, callback, verbose, silence_exceptions) ->
		callback_wrapper = (info) ->
			if info[0] == "Rename"
				callback({status: "moved-out", file: info[1], event: info})
				callback({status: "moved-in", file: info[2], event: info})
			else
				callback({status: info[0].toLowerCase(), file: info[1], event: info})


		@listenPaths = []
		@callback = callback_wrapper
		if typeof directories == "string"
			@listenPaths.push(directories)
		else
			for dir in directories
				@listenPaths.push(dir)
			# @windowsWatcher.watch(dir, @callback) #this will start the listener
	@setEdge: (edge) ->
		WatcherWindows.WINDOWS_EDGE = edge
			
module.exports = WatcherWindows