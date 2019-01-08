// pages/message/message.js
let com = require('../../com/com.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        images: com.images,
        list: []
    },

    // 获取消息列表
    UI_MessageInfo: function(id) {
        let that = this;
        wx.request({
            url: com.getUrl('UI_MessageInfo'),
            data: {
                MemLoginId: wx.getStorageSync('info').Guid, //浏览用户Guid
                MessageInfoType: 1, //消息类型，（0最新消息列表，1消息详情列表）
                LoginId: id //消息发送Id（获取最新消息列表时可以为空）
            },
            header: com.header,
            method: 'POST',
            success: (res) => {
                if (res.data) {
                    that.setData({
                        list: res.data
                    })
                    this.UI_MessageInfoRead();

                }
            },
            fail: () => {
                com.showtoast('网络错误');
            }
        });
    },

    // 读取消息
    UI_MessageInfoRead: function() {
        let that = this;
        let Guid = [];
        for (const item of that.data.list) {
            Guid.push(item.Guid);
        }
        wx.request({ //读取消息
            url: com.getUrl('UI_MessageInfoRead'),
            header: com.header,
            method: 'POST',
            data: Guid,
            success: (res) => {

            },
            fail: () => {
                com.showtoast('网络错误');
            }
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.UI_MessageInfo(options.id);
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

    },





})