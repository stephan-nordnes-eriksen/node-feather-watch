
describe 'FeatherWatch', ->
	describe '#constructor()', ->
		before ->
			# save original process.platform
			@originalPlatform = Object.getOwnPropertyDescriptor(process, 'platform')
			return
		after ->
			# restore original process.platfork
			Object.defineProperty process, 'platform', @originalPlatform
			return

		it 'should return a WatcherDarwin when on osx', ->
			# redefine process.platform
			Object.defineProperty process, 'platform', value: 'darwin'
			expect(process.platform).to.equal("darwin")

			watcher = new FeatherWatch("./", ( (data) -> console.log("yes", data)) )
			expect(watcher).to.be.a(WatcherDarwin)
			
		it 'should return a WatcherLinux when on linux', ->
			# redefine process.platform
			Object.defineProperty process, 'platform', value: 'linux'
			expect(process.platform).to.equal("linux")

			watcher = new FeatherWatch("./", ( (data) -> console.log("yes", data)) )
			expect(watcher).to.be.a(WatcherLinux)

		it 'should return a WatcherLinux when on freebsd', ->
			# redefine process.platform
			Object.defineProperty process, 'platform', value: 'freebsd'
			expect(process.platform).to.equal("freebsd")

			watcher = new FeatherWatch("./", ( (data) -> console.log("yes", data)) )
			expect(watcher).to.be.a(WatcherLinux)

		it 'should return a WatcherWindows when on win32', ->
			# redefine process.platform
			Object.defineProperty process, 'platform', value: 'win32'
			expect(process.platform).to.equal("win32")

			watcher = new FeatherWatch("./", ( (data) -> console.log("yes", data)) )
			expect(watcher).to.be.a(WatcherWindows)