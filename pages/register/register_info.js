// pages/register/register_info.js
const com = require("../../com/com.js");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        images: com.images + '/images/log_reg/head.png',
        // city: ['广东省', '广州市', '天河区'],
        back: com.images + '/images/log_reg/boult.png',
        info: {
            head: '/images/log_reg/head.png',
            nickname: '',
            company: '',
            job: '',
            industry: '',
            TradeId: '',
            city: '',
            AreaCode: '',
            address: '',
            wechat_number: '',
            email: ''
        }
    },


    // 改变头像
    changepic(e) {
        const that = this
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function(res) {
                wx.showLoading({
                    title: '提交中',
                    mask: true
                })
                wx.uploadFile({ //照片上传
                    url: com.getUrl('ImgUpload') + '?MemLoginid=' + wx.getStorageSync('info').MemLoginId,
                    filePath: res.tempFilePaths[0],
                    name: 'file',
                    header: com.header,
                    // formdata: {
                    //     MemLoginid: wx.getStorageSync('info').MemLoginid
                    // },
                    success: function(res) {
                        let Url = JSON.parse(res.data).Url;
                        if (Url) {
                            that.setData({
                                images: Url
                            })
                        }

                    },
                    fail: function(res) {
                        com.showtoast('图片上传失败');
                    },
                    complete: () => {
                        wx.hideLoading()

                    }
                })
            },
            fail: function(res) {
                console.log('选择错误', res)
            },
        })
    },

    // 昵称 
    getnickname(e) {
        const that = this
        let nickname = 'info.nickname'
        that.setData({
            [nickname]: e.detail.value
        })
    },

    // 公司
    getcompany(e) {
        const that = this
        let company = "info.company"
        that.setData({
                [company]: e.detail.value
            })
            // that.sec_input(e, '公司不能为空', [company])
    },
    //地址
    getaddress(e) {
        const that = this
        let address = "info.address"
        that.setData({
                [address]: e.detail.value
            })
            // that.sec_input(e, '地址不能为空', [address])
    },

    // 微信号
    getwechat_number(e) {
        const that = this
        let wechat_number = "info.wechat_number"

        that.setData({
            [wechat_number]: e.detail.value
        })

        // that.sec_input(e, '微信号不能为空', [wechat_number])
    },

    // 邮箱
    getemail(e) {
        const that = this
        let email = "info.email"
        that.setData({
                [email]: e.detail.value
            })
            // console.log([emil])
            // that.test_email([emil])
    },

    // 城市改变
    bindcityChange(e) {
        // const that = this
        // let value = e.detail.value
        // let city = value.join('')
        // console.log(city)
        // let citty = "info.city"
        // that.setData({
        //     city: value,
        //     [citty]: city
        // })
        wx.navigateTo({
            url: '/pages/register/register_city',
            success: function(res) {},
            fail: function(res) {},
        })

    },

    // 选择职业
    jump_registerjob() {
        wx.navigateTo({
            url: '/pages/register/register_job',
            success: function(res) {},
            fail: function(res) {},
        })
    },
    // 选择行业
    jump_registerindustry() {
        wx.navigateTo({
            url: '/pages/register/register_industry',
            success: function(res) {},
            fail: function(res) {},
        })
    },

    jump() {
        wx.showLoading({
            title: '提交中',
            mask: true
        })

        const that = this
            // if (that.data.images == com.images + '/images/log_reg/head.png') {
            //     com.showtoast('请添加头像')
            // } else {
            //     if (that.data.info.nickname.length == 0) {
            //         com.showtoast('昵称不能为空')
            //     } else {
            //                     if (that.data.info.address.length == 0) {
            //                         com.showtoast('地址不能为空')
            //                     } else {
            //                         if (that.data.info.wechat_number.length == 0) {
            //                             com.showtoast('微信号不能为空')
            //                         } else {
            //                             if (that.data.info.email.length == 0) {
            //                                 com.showtoast('邮箱不能为空')
            //                             } else {
            //                                 if (!com.test_email.test(that.data.info.email)) {
            //                                     com.showtoast('邮箱格式错误！')
            //                                 } else {
            //                                     wx.navigateTo({
            //                                         url: '/pages/register/register_moreinfo',
            //                                         success: function(res) {

        //                                         },
        //                                         fail: function(res) {}
        //                                     })
        //                                 }

        //                             }
        //                         }
        //                     }
        //                 }

        //             }

        //         }
        //     }
        // }

        if (that.data.info.company.length == 0) {
            com.showtoast('公司不能为空')
        } else {
            if (that.data.info.job.length == 0) {
                com.showtoast('职位不能为空')
            } else {
                if (that.data.info.industry.length == 0) {
                    com.showtoast('行业不能为空')
                } else {
                    if (that.data.info.city.length == 0) {
                        com.showtoast('请选择城市')
                    } else {
                        wx.request({
                            url: com.getUrl('UI_RegisterUpdateCard'),
                            header: com.header,
                            data: {
                                Guid: wx.getStorageSync('info').Guid,
                                NickName: that.data.info.nickname,
                                MinPhoto: that.data.images != 'https://xnsmb.xnsoft.net.cn/images/log_reg/head.png' ? that.data.images : '',
                                Company: that.data.info.company,
                                Position: that.data.info.job,
                                Trade: that.data.info.industry,
                                TradeId: that.data.info.TradeId,
                                Area: that.data.info.city,
                                AreaCode: that.data.info.AreaCode,
                                Address: that.data.info.address,
                                WxId: that.data.info.wechat_number,
                                Email: that.data.info.email
                            },
                            method: 'POST',
                            success: (res) => {
                                wx.navigateTo({
                                    url: '/pages/register/register_moreinfo',
                                })
                            },
                            fail: () => {
                                com.showtoast('网络错误')
                            },
                            complete: () => {
                                wx.hideLoading()

                            }
                        });
                    }

                }
            }
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(com)
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
        const pages = getCurrentPages();
        const currPage = pages[pages.length - 1];
        if (currPage.data) {
            const that = this
            let job = 'info.job',
                industry = 'info.industry',
                city = 'info.city',
                TradeId = 'info.TradeId',
                AreaCode = 'info.AreaCode'

            if (currPage.data.job) {
                that.setData({
                    [job]: currPage.data.job,
                })
            }
            if (currPage.data.industry) {
                that.setData({
                    [industry]: currPage.data.industry
                })
            }
            if (currPage.data.city) {
                that.setData({
                    [city]: currPage.data.city
                })
            }
            if (currPage.data.TradeId) {
                that.setData({
                    [TradeId]: currPage.data.TradeId
                })
            }
            if (currPage.data.AreaCode) {
                that.setData({
                    [AreaCode]: currPage.data.AreaCode
                })
            }
        }
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