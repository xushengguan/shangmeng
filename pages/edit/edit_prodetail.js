// pages/edit/edit_prodetail.js
let com = require('../../com/com.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        del_url: '/images/tarbar/icon_del.png',
        images: com.images,
        img: com.images + '/images/mine/add_big.png',
        // 宣传照片
        publicity_pic: [
            // '/images/card/card_pic.png', '/images/card/card_pic.png', '/images/card/card_pic.png'
        ],
        num: 0, //宣传照片数量
        title: '',
        price: '',
        Biref: '',
        intro: '',
        add: 0,
        id: "",
        pro_info: ""
    },

    gettitle(e) {
        const that = this
        console.log('title', e.detail.value)

        that.setData({
            title: e.detail.value
        })

    },
    getprice(e) {
        const that = this
        that.setData({
            price: e.detail.value
        })
    },
    getBiref(e) {
        const that = this
        that.setData({
            Biref: e.detail.value
        })
    },
    getintro(e) {
        const that = this
        that.setData({
            intro: e.detail.value
        })
    },
    // 产品封面图
    add_pho() {
        const that = this
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function(res) {
                wx.uploadFile({
                    url: com.getUrl('ImgUpload') + '?MemLoginid=' + wx.getStorageSync('info').MemLoginId,
                    filePath: res.tempFilePaths[0],
                    name: 'file',
                    method: "POST",
                    header: com.header,
                    // formData: {
                    //     MemLoginId: wx.getStorageSync('info').MemLoginId
                    // },
                    success: function(res) {
                        that.setData({
                            img: JSON.parse(res.data).Url
                        })
                    },
                    fail: function(res) {
                        com.showtoast('上传失败')
                    },
                })
            },
            fail: function(res) {},
            complete: function(res) {},
        })
    },
    //增加产品详情图
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
    del_img(e) {
        const that = this
        that.data.publicity_pic.splice(e.currentTarget.dataset.id, 1)
        that.setData({
            publicity_pic: that.data.publicity_pic,
            num: that.data.publicity_pic.length
        })
    },
    // 保存
    save() {
        const that = this
        console.log(that.data.add)
        if (that.data.title == null || that.data.title.length == 0) {
            com.showtoast('请填写标题')
        } else {
            if (that.data.price == null || that.data.price.length == 0) {
                com.showtoast('请填写产品售价')
            } else {
                if (that.data.img == null || that.data.img == com + '/images/mine/add_big.png') {
                    com.showtoast('请添加产品封面图')
                } else {
                    if (that.data.publicity_pic == null || that.data.publicity_pic.length == 0) {
                        com.showtoast("请添加至少一张产品详情图")
                    } else {
                        // 增加
                        if (that.data.add == 1) {
                            that.request_ManageProductAdd();
                        } else {
                            that.request_ManageProductUpdate()
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
        const that = this;
        that.setData({
            num: that.data.publicity_pic.length
        })
        that.setData({
            add: options.add
        })
        if (options.add == 1) {
            wx.setNavigationBarTitle({
                title: '增加产品',
                success: function(res) {},
                fail: function(res) {},
                complete: function(res) {},
            })
        } else {
            that.setData({
                id: options.id,
            })
            wx.setNavigationBarTitle({
                title: '编辑产品',
                success: function(res) {
                    that.request_GetProductDetail();
                },
                fail: function(res) {},
                complete: function(res) {},
            })
        }
    },
    // 请求增加
    request_ManageProductAdd() {
        const that = this;
        wx.request({
            url: com.getUrl('UI_ManageProductAdd'),
            data: {
                Guid: '00000000-0000-0000-0000-000000000000',
                MemLoginId: wx.getStorageSync('info').MemLoginId,
                Name: that.data.title,
                ShopPrice: that.data.price,
                Biref: that.data.Biref,
                Presentation: that.data.intro,
                CoverImage: that.data.img,
                DetailsImage: that.data.publicity_pic.join('|'),
                CreateUser: that.data.pro_info.CreateUser,
                CreateTime: that.data.pro_info.CreateTime,
                ModifyUser: that.data.pro_info.ModifyUser,
                ModifyTime: that.data.pro_info.ModifyTime,
                IsRecommend: that.data.pro_info.IsRecommend,
                IsAudit: that.data.pro_info.IsAudit,
            },
            header: com.header,
            method: 'POST',
            success: function(res) {
                if (res.statusCode == 200 || res.statusCode == 204) {
                    com.showtoast('添加成功')
                    wx.navigateBack({
                        delta: 1,
                    })
                } else {
                    com.showtoast('添加失败')
                    wx.navigateBack({
                        delta: 1,
                    })
                }
            },
            fail: function(res) {},
            complete: function(res) {},
        })
    },
    // 请求更新
    request_ManageProductUpdate() {
        const that = this
        wx.request({
            url: com.getUrl('UI_ManageProductUpdate?id=' + that.data.id),
            data: {
                Guid: that.data.id,
                MemLoginId: wx.getStorageSync('info').MemLoginId,
                Name: that.data.title,
                ShopPrice: that.data.price,
                Biref: that.data.Biref,
                Presentation: that.data.intro,
                CoverImage: that.data.img,
                DetailsImage: that.data.publicity_pic.join('|'),
                CreateUser: that.data.pro_info.CreateUser,
                CreateTime: that.data.pro_info.CreateTime,
                ModifyUser: that.data.pro_info.ModifyUser,
                ModifyTime: that.data.pro_info.ModifyTime,
                IsRecommend: that.data.pro_info.IsRecommend,
                IsAudit: that.data.pro_info.IsAudit,
            },
            header: com.header,
            method: 'POST',
            success: function(res) {
                if (res.statusCode == 200 || res.statusCode == 204) {
                    com.showtoast('编辑成功')
                    wx.navigateBack({
                        delta: 1,
                    })
                } else {
                    com.showtoast('编辑失败')
                }
            },
            fail: function(res) {},
            complete: function(res) {},
        })
    },
    //请求详细信息 
    request_GetProductDetail() {
        const that = this
        wx.request({
            url: com.getUrl("UI_GetProductDetail?id=" + that.data.id),
            data: {
                id: that.data.id
            },
            header: com.header,
            method: 'POST',
            success: function(res) {
                console.log(res)
                that.setData({
                    pro_info: res.data,
                    title: res.data.Name,
                    price: res.data.ShopPrice,
                    Biref: res.data.Biref,
                    intro: res.data.Presentation,
                    img: res.data.CoverImage,
                    publicity_pic: res.data.DetailsImage ? res.data.DetailsImage.split("|") : [],
                    num: res.data.DetailsImage.split("|").length
                })
                console.log('publicity_pic', that.data.publicity_pic)
            },
            fail: function(res) {},
            complete: function(res) {},
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
    onShow: function(options) {},

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