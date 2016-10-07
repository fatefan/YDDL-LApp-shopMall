Page({
    data:{
        list:[],
        totalPrice:0
        
    },
    onLoad:function (e) {
        var value = wx.getStorageSync('shopCarData');
        var price = 0;
        // value.forEach((v)=>{
        //     console.log(v.f_price)
        //     price = (parseFloat(price + v.f_price)).toFixed(2)
        // });
        for(var i = 0, l = value.length; i < l;i++) {
            price = price + value[i].f_price; 
            value[i].status = true;         
        };
        this.setData({totalPrice:price,list:value})
    },
    clean:function () {
        wx.setStorageSync('shopCarData',[]);
        wx.redirectTo({url:"../../pages/index/index"});
    },
    switchStatus:function (e) {
        var index = e.currentTarget.dataset.index;
        console.info(index,this.data.list)
        this.data.list[index].status = !this.data.list[index].status;
        var price = 0;
        for(var i = 0, l =  this.data.list.length; i < l;i++) {
            if(this.data.list[i].status) {
                price = price +  this.data.list[i].f_price; 
            }
        };
        this.setData({
            list:this.data.list,
            totalPrice: price
        })
    }
})