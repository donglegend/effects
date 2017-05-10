var app = getApp();
var url = "http://www.yeezan.com/api/gift/get_gift_info";
Page({
    data: {
        info: {},
        showLoading: true
    },

    getInfo: function (id){
        var that = this;
        fetch(url+"?gift_id="+id).then(function (response){
            if(response.status!==200){
                console.log("request " + url + "error! status: " + response.status);
                return;
            }
            response.json().then(function (data){
                if(+data.error != 0){
                    console.log("request " + url + "error! msg: " + data.msg);
                    return ;
                }
                console.log(data.data.info)
                that.setData({
                    info: data.data.info,
                    showLoading: false
                })
            })

        })
    },

    onLoad: function (options){
        var that = this;

        this.getInfo(options.id);
        
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo){
        //更新数据
            that.setData({
                userInfo:userInfo
            })
            
            that.update()
        })
    }
});