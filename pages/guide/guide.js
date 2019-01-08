// pages/guide/guide.js
let com = require('../../com/com.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        logo: com.images + "/images/log_reg/logo.png",
        images: com.images,
        swiper_pic: [
            '/images/log_reg/guideA.png',
            '/images/log_reg/guideB.png'
        ],
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        app.gettoken();
        // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope


    },
    //用户点击该按钮时，会返回获取到的用户信息，回调的detail数据与wx.getUserInfo返回的一致
    bindGetUserInfo(e) {
        var that = this;
        // 用户端，获取微信授权
        const Code = wx.getStorageSync('code')
        wx.request({
            url: com.getUrl('GetMiniAppUserUnionID'),
            data: {
                Code: Code,
                EncryptedData: e.detail.encryptedData,
                IV: e.detail.iv,
                AppId: app.globalData.AppId
            },
            header: com.header,
            method: 'POST',
            success: function(res) {
                if (res.data.Message) {
                    wx.reLaunch({
                        url: 'pages/guide/guide'
                    });
                } else {
                    wx.setStorageSync("WxUnionId", res.data);
                    app.gettoken();
                }

            }

        })

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})