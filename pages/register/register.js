// pages/register/register.js
var com = require('../../com/com.js');
var interval;
Page({
    /**
     * 页面的初始数据
     */
    data: {
      del_url: '/images/tarbar/icon_del.png',
        images: com.images,
        name: '', //名字
        phonenumber: '', //电话号码
        sec_code: '', //验证码
        request_code: '', //请求获取的验证码
        password: '', //密码
        sec_password: '', //验证密码
        time: '获取验证码',
        disabled: false,
        currentTime: 60
    },
    // 获取输入的名字
    getname(e) {
        const that = this
        that.setData({
            name: e.detail.value
        })
    },
    // 获取输入的手机号码
    getphone(e) {
        const that = this
        that.setData({
            phonenumber: e.detail.value
        })
    },
    // 获取输入的验证码
    getsec_code(e) {
        const that = this
        that.setData({
            sec_code: e.detail.value
        })
    },
    // 获取输入的密码
    getpassword(e) {
        const that = this
        that.setData({
            password: e.detail.value
        })
    },
    // 获取输入的验证密码
    getsec_password(e) {
        const that = this
        that.setData({
            sec_password: e.detail.value
        })
    },
    // 获取验证码
    request_code(e) {
        const that = this
        if (!com.test_mobile.test(that.data.phonenumber)) {
            com.showtoast('请输入正确的手机号码');
        } else {
            that.getcode();
            wx.request({
                url: com.getUrl('UI_IdentifyingCode'),
                data: {
                    Phone: that.data.phonenumber
                },
                header: com.header,
                method: 'POST',
                success: function(res) {
                    console.log(res)
                    if (res.statusCode == 200) {
                        com.showtoast('验证码发送成功');
                    } else {
                        com.showtoast('验证码获取失败')
                    }
                },

            })
        }

    },
    getcode() {
        const that = this
        let currentTime = that.data.currentTime;
        that.setData({
            time: currentTime + '秒'
        })
        interval = setInterval(function() {
            that.setData({
                time: (currentTime - 1) + '秒'
            })
            currentTime--;
            if (currentTime <= 0) {
                clearInterval(interval)
                that.setData({
                    time: '重新获取',
                    currentTime: 60,
                    disabled: false
                })
            }
        }, 1000)
    },
    //注册
    register() {
        var that = this
        if (that.data.name.length == 0) {
            com.showtoast('姓名不能为空')
        } else {
            if (that.data.phonenumber.length == 0) {
                com.showtoast('手机号码不能为空')
            } else {

                if (!com.test_mobile.test(that.data.phonenumber)) {
                    com.showtoast('手机号码格式错误')
                } else {
                    if (that.data.sec_code.length == 0) {
                        com.showtoast('验证码不能为空')
                    } else {
                        if (that.data.password.length == 0) {
                            com.showtoast('密码不能为空')
                        } else {
                            if (that.data.sec_password.length == 0) {
                                com.showtoast('请再次输入密码')
                            } else {
                                if (that.data.sec_password != that.data.password) {
                                    com.showtoast('两次密码不一样')
                                } else {
                                    let WxUnionId = wx.getStorageSync('WxUnionId')
                                    wx.request({
                                        url: com.getUrl('UI_RegisterMember'),
                                        data: {
                                            RealName: that.data.name,
                                            Phone: that.data.phonenumber,
                                            IdentifyingCode: that.data.sec_code,
                                            Pwd: that.data.password,
                                            WxUnionId: WxUnionId
                                        },
                                        method: 'POST',
                                        success: function(res) {
                                            console.log('success', res)
                                            if (res.statusCode == 200) {
                                                wx.setStorageSync('info', res.data); //存储用户信息
                                                com.showtoast('注册成功');
                                                wx.reLaunch({
                                                    url: '/pages/register/register_info',
                                                })
                                            } else {
                                                com.showtoast(res.data.Message)
                                            }
                                        },
                                        fail: function(res) {
                                            com.showtoast('网络不良')
                                        },
                                    })
                                }
                            }
                        }
                    }
                }
            }
        }
    },
  del_img(e) {
    const that = this
    that.data.publicity_pic.splice(e.currentTarget.dataset.id, 1)
    that.setData({
      publicity_pic: that.data.publicity_pic,
      num: that.data.publicity_pic.length
    })
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(com);

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