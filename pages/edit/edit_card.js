// pages/edit/edit_card.js
const com = require("../../com/com.js");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        del_url: '/images/tarbar/icon_del.png',
        edited: true,
        publicity_pic: [],
        num: 0, //宣传照片数量
        images: com.images + '/images/log_reg/head.png',
        // city: ['广东省', '广州市', '天河区'],
        back: com.images + '/images/log_reg/boult.png',
        add_images: com.images + "/images/log_reg/add.png",
        info: {
            realname: '',
            cellphone: '',
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
        },
        work: '',
        shared_resource: '',
        demand_resources: '',
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

            },
        })
    },

    // 真实姓名 
    getrealname(e) {
        const that = this
        let realname = 'info.realname'
        that.setData({
            [realname]: e.detail.value
        })
    },
    // 手机号 
    getcellphone(e) {
        const that = this
        let cellphone = 'info.cellphone'
        that.setData({
            [cellphone]: e.detail.value
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
    },
    //地址
    getaddress(e) {
        const that = this
        let address = "info.address"
        that.setData({
            [address]: e.detail.value
        })
    },

    // 微信号
    getwechat_number(e) {
        const that = this
        let wechat_number = "info.wechat_number"
        that.setData({
            [wechat_number]: e.detail.value
        })
    },

    // 邮箱
    getemail(e) {
        const that = this
        let email = "info.email"
        that.setData({
            [email]: e.detail.value
        })
    },

    // 城市改变
    bindcityChange(e) {
        wx.navigateTo({
            url: '/pages/register/register_city',
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

    //业务简介
    getwork(e) {
        const that = this
        let work = "info.work"
        that.setData({
            [work]: e.detail.value
        })
    },

    // 分享资源
    getshare_resource(e) {
        const that = this
        let share_resource = "share_resource"
        that.setData({
            [share_resource]: e.detail.value
        })
    },

    //需求资源
    getdemand_resources(e) {
        const that = this
        let demand_resources = "demand_resources"
        that.setData({
            [demand_resources]: e.detail.value
        })
    },

    //增加宣传照片  
    add_pic() {
        const that = this
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function(res) {

                if (that.data.num < 11) {
                    wx.showLoading({
                        title: '图片上传中',
                        mask: true
                    })
                    for (const url of res.tempFilePaths) {

                        wx.uploadFile({ //照片上传
                            url: com.getUrl('ImgUpload') + '?MemLoginid=' + wx.getStorageSync('info').MemLoginId,
                            filePath: url,
                            name: 'file',
                            header: com.header,
                            success: function(res) {
                                let url = JSON.parse(res.data).Url;
                                if (url) {
                                    that.data.publicity_pic.push(url);

                                    that.setData({
                                        publicity_pic: that.data.publicity_pic,
                                        num: that.data.publicity_pic.length
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
                    }
                } else {
                    com.showtoast('照片数量不得超过10张')
                }
            },
            fail: function(res) {},
        })
    },
    // 删除照片
    del_img(e) {
        const that = this
        that.data.publicity_pic.splice(e.currentTarget.dataset.id, 1)
        that.setData({
            publicity_pic: that.data.publicity_pic,
            num: that.data.publicity_pic.length
        })
    },

    //保存
    save() {
        const that = this
        if (that.data.info.realname == null || that.data.info.realname.length == 0) {
            com.showtoast('姓名不能为空')
        } else {
            if (that.data.info.cellphone == null || that.data.info.cellphone.length == 0) {
                com.showtoast('手机号码不能为空')
            } else {
                if (!com.test_mobile.test(that.data.info.cellphone)) {
                    com.showtoast('手机格式错误')
                } else {
                    if (that.data.info.company == null || that.data.info.company.length == 0) {
                        com.showtoast('公司不能为空')
                    } else {
                        if (that.data.info.job == null || that.data.info.job.length == 0) {
                            com.showtoast('职位不能为空')
                        } else {
                            if (that.data.info.industry == null || that.data.info.industry.length == 0) {
                                com.showtoast('行业不能为空')
                            } else {
                                if (that.data.info.city == null || that.data.info.city.length == 0) {
                                    com.showtoast('城市不能为空')
                                } else {
                                    if (that.data.num == 0) {
                                        com.showtoast('请添加宣传图片')
                                    } else {
                                        let info = wx.getStorageSync("info")
                                        info.Mobile = that.data.info.cellphone
                                        info.NickName = that.data.info.nickname
                                        info.RealName = that.data.info.realname
                                        info.MaxPhoto = that.data.images;
                                        info.MinPhoto = that.data.images;
                                        info.MultiPhoto = that.data.publicity_pic.join("|")
                                        info.Email = that.data.info.email
                                        info.WxId = that.data.info.wechat_number
                                        info.Company = that.data.info.company
                                        info.CompanyArea = that.data.info.city
                                        info.CompanyAreaCode = that.data.info.AreaCode
                                        info.CompanyAddress = that.data.info.address
                                        info.Area = that.data.info.city
                                        info.AreaCode = that.data.info.AreaCode
                                        info.Address = that.data.info.address
                                        info.Trade = that.data.info.industry
                                        info.TradeId = that.data.info.TradeId
                                        info.Position = that.data.info.job
                                        info.Brief = that.data.work
                                        info.SharedResource = that.data.shared_resource
                                        info.DemandResources = that.data.demand_resources
                                        wx.request({
                                            url: com.getUrl('UI_MemberPut?id=' + wx.getStorageSync("info").Guid),
                                            data: info,
                                            header: com.header,
                                            method: 'POST',
                                            success: function(res) {
                                                if (res.statusCode == 200 || res.statusCode == 204) {
                                                    wx.setStorageSync("info", res.data)
                                                    wx.reLaunch({
                                                        url: '/pages/mine/mine',
                                                    })
                                                } else {
                                                    com.showtoast('保存失败')
                                                }
                                            },
                                            fail: function(res) {
                                                com.showtoast('网络不良')
                                            },
                                            complete: function(res) {},
                                        })
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },



    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const that = this
        let nickname = "info.nickname"
        let realname = "info.realname"
        let cellphone = "info.cellphone"
        let company = "info.company"
        let job = "info.job"
        let industry = "info.industry"
        let TradeId = "info.TradeId"
        let city = "info.city"
        let AreaCode = "info.AreaCode"
        let address = "info.address"
        let wechat_number = "info.wechat_number"
        let email = "info.email"
        let images = "images"
        that.setData({
            [nickname]: wx.getStorageSync("info").NickName,
            [company]: wx.getStorageSync("info").Company,
            [job]: wx.getStorageSync("info").Position,
            [industry]: wx.getStorageSync("info").Trade,
            [TradeId]: wx.getStorageSync("info").TradeId,
            [city]: wx.getStorageSync("info").CompanyArea,
            [AreaCode]: wx.getStorageSync("info").CompanyAreaCode,
            [address]: wx.getStorageSync("info").Address,
            [wechat_number]: wx.getStorageSync("info").WxId,
            [email]: wx.getStorageSync("info").Email,
            [cellphone]: wx.getStorageSync("info").Mobile,
            [realname]: wx.getStorageSync("info").RealName,
            work: wx.getStorageSync("info").Brief,
            publicity_pic: wx.getStorageSync("info").MultiPhoto.split("|"),
            shared_resource: wx.getStorageSync("info").SharedResource,
            demand_resources: wx.getStorageSync("info").DemandResources,
            images: wx.getStorageSync('info').MinPhoto
        })
        if (that.data.publicity_pic.length > 0) {
            that.setData({
                num: that.data.publicity_pic.length,

            })
        }
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