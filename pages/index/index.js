const AV = require('../../utils/av-weapp-2.0.0-beta.0.js')
AV.init({
appId: "po7YWHB3bjxCwOkLEyBbO0Y6-gzGzoHsz",
appKey: "NkA8kxpPmtK3NHwgy6vVBls0",
});
var allData = [];
var index = {
    data:{
        imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000
    },
    onReady:function () {
        var query = new AV.Query('FSCategory');
        query.equalTo('f_app_id', 1);
        query.find().then(queryCategoryCallback, function (error) {
        });
    },
    checkDetail: function (e) {
        wx.navigateTo({url:'../../pages/detail/detail',success:function() {
            console.info("跳转!")
        }});
    },
    addCar: function (e) {
        wx.navigateTo({url:'../../pages/myCar/myCar'})
    }
};

/**
 * 分类查询 回调方法
 */
function queryCategoryCallback (results) {
    if(results.length != 0) {
        var queryProduce = new AV.Query('FSProduct');
        for(let i = 0, l = results.length;i<l;i++) {
            let p = {
                f_category_name : results[i].attributes.f_category_name,
                f_category_id : results[i].attributes.f_category_id,
                data : []
            };
            allData.push(p);
            console.info(p.f_category_id);                    
            queryProduce.equalTo('f_category_id',p.f_category_id);
            queryProduce.find().then(queryProduceCallback);
        }
    }
};
/**
 * 产品查询 回调方法
 */
function queryProduceCallback (results) {
    console.info('产品查询 回调方法');
    if(results.length != 0) {
        var category_id = results[0].attributes.f_category_id;
        var i = 0,l = allData.length;
        while (allData[i].f_category_id != category_id) {
            ++i;
        };
        for(let a = 0,b = results.length; a<b;b++) {
            allData[i].data.push(results[a].attributes);
        }
    };
    console.info(allData);
}
Page(index);