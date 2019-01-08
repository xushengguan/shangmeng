// pages/register/register_job.js
let com = require('../../com/com.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        jobs: [],
    },

    jump_registerinfo(e) {
        const that = this
        let data = e.currentTarget.dataset.index; //点击获取传参
        let pages = getCurrentPages(); //获取页面栈
        let prevPage = pages[pages.length - 2];
        prevPage.setData({ //赋值给上一个页面
            job: data.Name
        })
        wx.navigateBack({ //关闭当前页面,返回上一个页面
            delta: 1,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        wx.request({
            url: com.getUrl('GetXn_Position'),
            header: com.header,
            method: 'GET',
            success: function(res) {
                if (res.data) {
                    that.setData({
                        jobs: res.data
                    })
                }
            },
            fail: function(res) {
                com.showtoast('网络错误')
            },
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