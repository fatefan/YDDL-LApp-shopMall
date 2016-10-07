var data = {},shopCarData=[];
Page({
    data:{
        item:data,
        shopCarData:[]
    },
    onLoad:function (e) {
        var value = wx.getStorageSync('productList');        
        this.setData({
            item:value[e.parentIndex].data[e.index]
        })
    },
    onShow: function (e) {
        shopCarData = wx.getStorageSync('shopCarData');
        this.setData({
            shopCarData : shopCarData
        })
    },
    addCar: function(e) {
        shopCarData.push(this.data.item);
        wx.setStorageSync('shopCarData',shopCarData);
        wx.redirectTo({url:'../../pages/myCar/myCar'})
    }
})