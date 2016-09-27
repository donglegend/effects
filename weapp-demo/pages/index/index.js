//index.js
//获取应用实例
var url = "http://www.yeezan.com/api/gift/get_gift_list";
var app = getApp()
Page({
  data: {
    fromid: 1,
    list: [],
    showLoading: true
  },
  //事件处理函数
  goinfo: function() {
    wx.navigateTo({
      url: '../info/info'
    })
  },
  getGift: function (){
    var that = this;
    if(+this.data.fromid == 0){
      return ;
    }
    if(this.data.showLoading && +this.data.fromid !== 1){
      return ;
    }
    this.setData({
      showLoading: true
    })
    fetch(url+"?fromid="+this.data.fromid).then(function (response){
      if(response.status!==200){
          console.log("request " + url + "error! status: " + response.status);
          return;
      }
      response.json().then(function (data){
          if(+data.error != 0){
            console.log("request " + url + "error! msg: " + data.msg);
            return ;
          }
          console.log(data)
          that.setData({
            list: that.data.list.concat(data.data.list),
            fromid: data.data.fromid,
            showLoading: false
          })
      })
    })
  },
  onLoad: function () {
    var that = this;
    that.getGift();
  	//调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      console.log("index getUserinfo")
      that.setData({
        userInfo:userInfo
      })
     
      that.update()
    })
  }
})
