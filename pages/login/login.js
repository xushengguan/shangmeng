// pages/login/login.js
let com = require('../../com/com.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        images: com.images,
        account: '',
        password: ''
    },
    // 获取输入的手机号或者商脉号
    getphone(e) {
        const that = this
        that.setData({
            account: e.detail.value
        })
    },
    // 获取输入的密码
    getpassword(e) {
        const that = this
        that.setData({
            password: e.detail.value
        })
    },
    // 忘记密码
    jump_forgetpassword() {
        // wx.reLaunch({
        //   url: '/pages/forget_password/forget_password',
        //   success: function(res) {},
        //   fail: function(res) {},
        // })
        com.showtoast('无忘记密码页面')
    },
    // 注册
    jump_register() {
        wx.reLaunch({
            url: '/pages/register/register',
            success: function(res) {},
            fail: function(res) {},
        })
    },
    login() {
        const that = this
        if (that.data.account.length == 0) {
            com.showtoast('手机号或商脉号不能为空')
        } else {
            if (that.data.password.length == 0) {
                com.showtoast('密码不能为空')
            } else {
                if (that.data.password.length < 6) {
                    com.showtoast('密码不能少于6位')
                } else {
                    wx.reLaunch({
                        url: '/pages/business/business',
                        success: function(res) {
                            com.showtoast('登录成功')
                        },
                        fail: function(res) {},
                    })



                    // wx.request({
                    //   url: com.getUrl,
                    //   data:{
                    //  UI_GetProduct   account:that.data.account,
                    //     password:that.data.password
                    //   },
                    //   header: com.header,
                    //   success: function(res) {
                    //     wx.reLaunch({
                    //       url: '/pages/register/register',
                    //       success: function(res) {},
                    //       fail: function(res) {},
                    //     })
                    //   },
                    //   fail: function(res) {},
                    //   complete: function(res) {},
                    // })
                }
            }
        }
    },
    /**that.data.account
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(com)
        wx.getUserInfo({
            lang: 'zh_cn',
            success(res) {
                console.log(res)
            },
            fail: function(res) {},
            complete: function(res) {
                console.log(res)
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