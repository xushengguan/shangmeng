// pages/find/find.js
var com = require('../../com/com.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        images: com.images,
        list: [{
                pic: '/images/find/card.png',
                text: '我的名片',
            },
            {
                pic: '/images/find/website.png',
                text: '我的官网',
            },
            {
                pic: '/images/find/product.png',
                text: '我的产品',
            }
        ]
    },

    jump(e) {
        switch (e.currentTarget.dataset.id) {
            // 我的名片
            case 0:
                wx.navigateToMiniProgram({
                        appId: 'wx3b3add3b680c49f0',
                        path: '/pages/card/card',
                        success: function(res) {
                            console.log(res.errMsg)
                        },
                        fail: function(res) {},
                        complete: function(res) {},
                    })
                    break;
                    // 我的官网
            case 1:
                wx.navigateToMiniProgram({
                        appId: 'wx3b3add3b680c49f0',
                        path: '/pages/website/website',
                        success: function(res) {
                            console.log(res.errMsg)
                        },
                        fail: function(res) {},
                        complete: function(res) {},
                    })
            break;
                    // 我的产品
            case 2:
                wx.navigateToMiniProgram({
                    appId: 'wx3b3add3b680c49f0',
                    path: '/pages/card/card',
                    success: function(res) {
                        console.log(res.errMsg)
                    },
                    fail: function(res) {},
                    complete: function(res) {},
                })
            break;
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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