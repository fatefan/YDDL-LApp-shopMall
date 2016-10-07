const AV = require('../../utils/av-weapp-2.0.0-beta.0.js')
AV.init({
appId: "po7YWHB3bjxCwOkLEyBbO0Y6-gzGzoHsz",
appKey: "NkA8kxpPmtK3NHwgy6vVBls0",
});
var allData = [],shopCarData=[];
var index = {
    data:{
        list:allData,
        shopCarData:shopCarData,
        carBar:false,
        carCount:0
    },
    onReady:function () {
        var query = new AV.Query('FSCategory');
        query.equalTo('f_app_id', 1);
        query.find().then(this.queryCategoryCallback, function (error) {
        });
    },
    onShow:function () {
        shopCarData = wx.getStorageSync('shopCarData');
        if(shopCarData.length != 0) {
            this.setData({
                shopCarData:shopCarData,
                carBar: true
            })
        }
    },
    checkDetail: function (e) {
        var parentIndex = e.currentTarget.dataset.parentIndex;
        var index = e.currentTarget.dataset.index
        wx.navigateTo({url:'../../pages/detail/detail?parentIndex='+parentIndex+'&index='+index,success:function() {
            console.info("跳转!")
        }});
    },
    addCar: function (e) {
        var parentIndex = e.currentTarget.dataset.parentIndex;
        var index = e.currentTarget.dataset.index;
        var value = allData[parentIndex].data[index];
        // if(shopCarData.length != 0) {

        // } else {
            shopCarData.push(value);
        // }
        console.info(shopCarData);
        this.setData({shopCarData:shopCarData,carBar:true,carCount:shopCarData.length});
        wx.setStorage({key:'shopCarData',data:shopCarData});
        
    },
    settle: function (e) {
        wx.navigateTo({url:'../../pages/myCar/myCar'})
    },
    queryCategoryCallback:function (results) {
        if(results.length != 0) {        
            var params = [];
            for(let i = 0, l = results.length;i<l;i++) {
                let p = {
                    f_category_name : results[i].attributes.f_category_name,
                    f_category_id : results[i].attributes.f_category_id,
                    data : []
                };
                allData.push(p);
                params[i] = (new AV.Query('FSProduct')).equalTo('f_category_id',p.f_category_id);                   
            };
            var query =  AV.Query.or.apply(null,params);
            query.find().then(this.queryProduceCallback)
        }
    },
    queryProduceCallback:function (results) {
        if(results.length != 0) {
            var category_id = results[0].attributes.f_category_id;
            for(let i = 0,l = results.length; i < l; i++) {
                let category_id = results[i].attributes.f_category_id;
                let a = 0, b = allData.length;
                while (allData[a].f_category_id != category_id) {
                    ++a;
                };
                allData[a].data.push(results[i].attributes);
            }
        };
        this.setData({list:allData})
        wx.setStorage({key:'productList',data:allData});
    }
};
Page(index);