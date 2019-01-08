// pages/business/collected.js
let com = require('../../com/com.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        images: com.images,
        search_text: '',
        LikeKeyWord: '',
        list: []
    },

    // 搜索
    search(e) {
        const that = this
        that.setData({
            LikeKeyWord: e.detail.value
        })
    },

    // 获取我收藏的名片
    UI_MyCollectMember: function() {
        let that = this;
        let param = {
            MemLoginId: wx.getStorageSync('info').MemLoginId,
            LikeKeyWord: that.data.LikeKeyWord
        }
        wx.request({
            url: com.getUrl('UI_MyCollectMember'),
            header: com.header,
            data: param,
            method: 'POST',
            success: function(res) {
                if (res.data) {
                    that.setData({
                        list: res.data
                    })
                }
            },
            fail: (res) => {
                com.showtoast('网络错误');
            }
        })
    },

    // 拨打电话
    PhoneCall: function(e) {
        wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.tel
        });
    },
    // 跳到小程序
    goRoutine: function(e) {
        var app = getApp();
        app.goNext(e.currentTarget.dataset.id)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.UI_MyCollectMember();
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