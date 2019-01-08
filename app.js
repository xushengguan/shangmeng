//app.js
var com = require('./com/com.js');

App({
  onLaunch: function() {
    var that = this;
    // 判断是否登录
    if (!wx.getStorageSync('code') || !wx.getStorageSync('WxUnionId') || wx.getStorageSync('WxUnionId').Message) {
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (res.code) { //发送code到服务器
            wx.setStorageSync('code', res.code);
          }
        }
      })
      // 检查登录态是否过期。
      wx.checkSession({
        success: function(res) {
          //session 未过期，并且在本生命周期一直有效
        },
        fail: function() {
          // 登录
          wx.login({
            success: res => {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              if (res.code) { //发送code到服务器
                wx.setStorageSync('code', res.code);
              }
            }
          })
        }
      })
    } else {
      //获取token，判断是否注册
      that.gettoken();

    }

  },
  //获取token,判断是否注册
  gettoken: function() {
    var that = this;
    if (wx.getStorageSync('WxUnionId')) {
      wx.request({
        url: 'https://xnsmb.xnsoft.net.cn/Token?AppId=users',
        data: {
          grant_type: 'password',
          username: wx.getStorageSync('WxUnionId'),
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        method: 'POST',
        success(res) {
          if (res.data.error) {
            wx.reLaunch({
              url: '/pages/register/register'
            })
          } else {
            wx.setStorageSync("token", res.data.access_token);
            com.header.Authorization = 'bearer' + ' ' + wx.getStorageSync("token");
            that.WxUnionId();
            if (wx.getStorageSync('info')) {
              wx.reLaunch({
                url: '/pages/business/business'
              })
            }
          }

        },
        fail(res) {
          com.showtoast('网络错误');
        }
      });
    } else {
      that.onLaunch();
    }

  },
  WxUnionId: function() {
    let header = {
      'Content-Type': 'application/json',
      "Authorization": 'bearer ' + wx.getStorageSync("token")
    }
    // 获取登录
    wx.request({
      url: com.getUrl('GetXn_MemberLogin') + '?WxUnionId=' + wx.getStorageSync('WxUnionId'),
      method: 'POST',
      header: header,
      success: res => {
        if (res.data.Message) {
          this.onLaunch();
        } else {
          wx.setStorageSync('info', res.data); //存储用户信息
          if (wx.getStorageSync('info')) {
            wx.reLaunch({
              url: '/pages/business/business'
            })
          }
        }
      }
    })
  },
  goNext: function(id) {
    wx.navigateToMiniProgram({
      appId: 'wx3b3add3b680c49f0',
      extraData: {
        Guid: id
      }
    });
  },
  globalData: { //全局变量
    userInfo: null,
    AppId: 'wx8f4162c364bf40fd'
  }
})