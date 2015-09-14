SpecificWatcher = require './core/watcher-linux.js' if process.platform == "linux"
SpecificWatcher = require './core/watcher-linux.js' if process.platform == "freebsd"
SpecificWatcher = require './core/watcher-darwin.js' if process.platform == "darwin"
SpecificWatcher = require './core/watcher-windows.js' if process.platform == "win32"

# if process.platform == 'sunos'
#if process.platform == 'win32' #no good solution found for windows. Look into native FileSystemWatcher for windows.


# WatcherDarwin = require './core/watcher_darwin.js'
# WatcherLinux = require './core/watcher_linux.js'


# A high performance, feather light, file system watcher.
#
class FeatherWatch
	@WINDOWS_EDGE = null
	# Initialize the file system watcher. 
	#
	# @param directories [Array] An array of directories to watch.
	# @param callback [Function] A callback that will receive events. Recieved objects on form: {status: [:modified, :removed].sample, file: "path/to/file"}. ":modified" means everything except deleted.
	# @param verbose [Boolean] Enable verbose mode. Warning: Can produce very much output. Default: false
	# @return [FeatherWatch]
	#
	# @example Make a new FeatherWatch object
	#   FeatherWatch::Watcher.new([File.join(Dir.home, 'Desktop')], lambda{|e| puts "got event with status: #{e[:status]} on file #{e[:file]}"})
	#
	constructor: (directories, callback, verbose = false, silence_exceptions = false) ->
		console.log("Constructor")
		return new SpecificWatcher(directories, callback, verbose, silence_exceptions)

	@setWindowsEdge: (edge) ->
		if process.platform == "win32"
			SpecificWatcher.setEdge(edge)

module.exports = FeatherWatch