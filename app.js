const AV = require('./utils/av-weapp-2.0.0-beta.0.js')
AV.init({
appId: "po7YWHB3bjxCwOkLEyBbO0Y6-gzGzoHsz",
appKey: "NkA8kxpPmtK3NHwgy6vVBls0",
});
 
App({
  onLaunch: function() { 
    // Do something initial when launch.
  },
  onShow: function() {
      // Do something when show.
  },
  onHide: function() {
      // Do something when hide.
  },
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
})