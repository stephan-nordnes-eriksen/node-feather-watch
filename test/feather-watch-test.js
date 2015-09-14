describe('FeatherWatch', function() {
  return describe('#constructor()', function() {
    before(function() {
      this.originalPlatform = Object.getOwnPropertyDescriptor(process, 'platform');
    });
    after(function() {
      Object.defineProperty(process, 'platform', this.originalPlatform);
    });
    it('should return a WatcherDarwin when on osx', function() {
      var watcher;
      Object.defineProperty(process, 'platform', {
        value: 'darwin'
      });
      expect(process.platform).to.equal("darwin");
      watcher = new FeatherWatch("./", (function(data) {
        return console.log("yes", data);
      }));
      return expect(watcher).to.be.a(WatcherDarwin);
    });
    it('should return a WatcherLinux when on linux', function() {
      var watcher;
      Object.defineProperty(process, 'platform', {
        value: 'linux'
      });
      expect(process.platform).to.equal("linux");
      watcher = new FeatherWatch("./", (function(data) {
        return console.log("yes", data);
      }));
      return expect(watcher).to.be.a(WatcherLinux);
    });
    it('should return a WatcherLinux when on freebsd', function() {
      var watcher;
      Object.defineProperty(process, 'platform', {
        value: 'freebsd'
      });
      expect(process.platform).to.equal("freebsd");
      watcher = new FeatherWatch("./", (function(data) {
        return console.log("yes", data);
      }));
      return expect(watcher).to.be.a(WatcherLinux);
    });
    return it('should return a WatcherWindows when on win32', function() {
      var watcher;
      Object.defineProperty(process, 'platform', {
        value: 'win32'
      });
      expect(process.platform).to.equal("win32");
      watcher = new FeatherWatch("./", (function(data) {
        return console.log("yes", data);
      }));
      return expect(watcher).to.be.a(WatcherWindows);
    });
  });
});
