// pages/edit/edit_website.js
let com = require('../../com/com.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        del_url: '/images/tarbar/icon_del.png',
        images: com.images,
        publicity_pic: [],
        num: 0, //宣传照片数量
        web_info: '',
        phonenumber: "",
        www: '',
        address: '',
        company_intro: '',
        product_intro: '',
        web_info: "",
        HonorImages: [],
        CaseImages: [],
        CaseImages_num: 0,
        HonorImages_num: 0,
        title: [{
                text: '资质荣誉',
                txt: '（建议上传450*280像素的图片）',
                pic: com.images + '/images/mine/add_big.png'
            },
            {
                text: '成功案例',
                txt: '（建议上传450* 280像素的图片）',
                pic: com.images + '/images/mine/add_big.png'
            }
        ]
    },

    //增加宣传照片  
    add_pic() {
        const that = this
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function(res) {
                if (that.data.num < 5) {
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
                    com.showtoast('照片数量不得超过4张')
                }
            },
            fail: function(res) {},
        })
    },

    getcompany_intro(e) {
        const that = this;
        that.setData({
            company_intro: e.detail.value
        })
    },
    getproduct_intro(e) {
        const that = this;
        that.setData({
            product_intro: e.detail.value
        })
    },
    getphonenumber(e) {
        const that = this;
        that.setData({
            phonenumber: e.detail.value
        })
    },
    getwww(e) {
        const that = this;
        that.setData({
            www: e.detail.value
        })
    },
    getaddress(e) {
        const that = this;
        that.setData({
            address: e.detail.value
        })
    },
    //跳转到详情
    jump_next(e) {
        let nav = (e.currentTarget.dataset.id == 0 ? '添加资质荣誉' : '添加成功案例')
        wx.navigateTo({
            url: '/pages/edit/edit_webnext?nav=' + nav + "&titleid=" + e.currentTarget.dataset.id
        })
    },
    // 添加成功案例图片
    add_CaseImages(e) {
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
                                    that.data.CaseImages.push(url);
                                    that.setData({
                                        CaseImages: that.data.CaseImages,
                                        CaseImages_num: that.data.CaseImages.length
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
    // 添加荣誉资质图片
    add_HonorImages(e) {
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
                                    that.data.HonorImages.push(url);
                                    that.setData({
                                        HonorImages: that.data.HonorImages,
                                        HonorImages_num: that.data.HonorImages.length
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
    //请求官网信息
    request_ManageWebsite() {
        const that = this
        wx.request({
            url: com.getUrl('UI_ManageWebsite'),
            data: {
                MemLoginId: wx.getStorageSync('info').MemLoginId
            },
            header: com.header,
            method: 'POST',
            success: function(res) {
                if (res.statusCode == 200) {
                    let pic0 = "title[0].pic"
                    let pic1 = "title[1].pic"
                    that.setData({
                        web_info: res.data,
                        publicity_pic: res.data.CoverImage.split("|"),
                        company_intro: res.data.Presentation,
                        product_intro: res.data.ProductPresentation,
                        // [pic0]: res.data.HonorImages,
                        // [pic1]: res.data.CaseImages
                        HonorImages: res.data.HonorImages ? res.data.HonorImages.split("|") : [],
                        CaseImages: res.data.CaseImages ? res.data.CaseImages.split("|") : []
                    })
                    if (that.data.publicity_pic.length > 0) {
                        that.setData({
                            num: that.data.publicity_pic.length
                        })
                    }
                    if (that.data.HonorImages.length > 0) {
                        that.setData({
                            HonorImages_num: that.data.HonorImages.length
                        })
                    }
                    if (that.data.CaseImages.length > 0) {
                        that.setData({
                            CaseImages_num: that.data.CaseImages.length
                        })
                    }
                }
            }
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
    del_HonorImages(e) {
        const that = this
        that.data.HonorImages.splice(e.currentTarget.dataset.id, 1)
        that.setData({
            HonorImages: that.data.HonorImages,
            HonorImages_num: that.data.HonorImages.length
        })
    },
    del_CaseImages(e) {
        const that = this
        that.data.CaseImages.splice(e.currentTarget.dataset.id, 1)
        that.setData({
            CaseImages: that.data.CaseImages,
            CaseImages_num: that.data.CaseImages.length
        })
    },
    save() {
        const that = this;
        if (that.data.publicity_pic.length == 0) {
            com.showtoast('请添加封面图')
        } else {
            if (!that.data.company_intro) {
                com.showtoast("请输入公司介绍")
            } else {
                if (!that.data.product_intro) {
                    com.showtoast("请输入产品介绍")
                } else {
                    if (that.data.HonorImages.length < 0) {
                        com.showtoast("请编辑资质荣誉")
                    } else {
                        if (that.data.CaseImages.length < 0) {
                            com.showtoast("请编辑成功案例")
                        } else {
                            if (!com.test_mobile.test(that.data.phonenumber)) {
                                com.showtoast("号码错误")
                            } else {
                                if (!that.data.www) {
                                    com.showtoast("网址不能为空")
                                } else {
                                    if (!that.data.address) {
                                        com.showtoast("地址不能为空")
                                    } else {
                                        const that = this
                                        wx.request({
                                            url: com.getUrl('UI_ManageWebsiteUpdate'),
                                            data: {
                                                Guid: that.data.web_info.Guid ? that.data.web_info.Guid : wx.getStorageSync("info").Guid,
                                                MemLoginId: wx.getStorageSync("info").MemLoginId,
                                                CoverImage: that.data.publicity_pic.join("|"),
                                                Presentation: that.data.company_intro,
                                                ProductPresentation: that.data.product_intro,
                                                // HonorImages: that.data.title[0].pic,
                                                // CaseImages: that.data.title[1].pic,
                                                HonorImages: that.data.HonorImages.join("|"),
                                                CaseImages: that.data.CaseImages.join("|"),
                                                CreateUser: that.data.web_info.CreateUser,
                                                CreateTime: that.data.web_info.CreateTime,
                                                ModifyUser: that.data.web_info.ModifyUser,
                                                ModifyTime: that.data.web_info.ModifyTime,
                                                IsAudit: that.data.web_info.IsAudit,
                                            },
                                            header: com.header,
                                            method: 'POST',
                                            success: function(res) {
                                                if (res.statusCode == 200) {
                                                    // 提交网址，电话，地址
                                                    let info = wx.getStorageSync("info")
                                                    if (that.data.www || that.data.address || that.data.phonenumber) {
                                                        info.WWW = that.data.www
                                                        info.CompanyAddress = that.data.address
                                                        info.Mobile = that.data.phonenumber
                                                        wx.request({
                                                            url: com.getUrl('UI_MemberPut?id=' + wx.getStorageSync("info").Guid),
                                                            data: info,
                                                            header: com.header,
                                                            method: 'POST',
                                                            success: function(res) {
                                                                if (res.data) {
                                                                    wx.setStorageSync('info', res.data);
                                                                }
                                                            }
                                                        })
                                                    }
                                                    com.showtoast('保存成功');
                                                    wx.navigateBack({
                                                        delta: 1
                                                    })
                                                } else {
                                                    com.showtoast('保存失败')
                                                }
                                            },
                                            fail: function(res) {},
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
        that.request_ManageWebsite();
        that.setData({
            phonenumber: wx.getStorageSync("info").Mobile,
            www: wx.getStorageSync("info").WWW,
            address: wx.getStorageSync("info").Address
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
        const pages = getCurrentPages();
        const currPage = pages[pages.length - 1];
        if (currPage.data.list) {
            let title = [...that.data.title]
            if (currPage.data.list.titleid == 0) {
                title[0]["pic"] = currPage.data.list.img
            } else {
                title[1]["pic"] = currPage.data.list.img
            }
            that.setData({
                title: title

            })
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