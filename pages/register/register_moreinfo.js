// pages/register/register_moreinfo.js
var com = require('../../com/com.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
      del_url: '/images/tarbar/icon_del.png',
        images: com.images,
        add_images: com.images + "/images/log_reg/add.png",
        work: '', //业务简介
        share_resource: '', //分享资源
        demand_resources: '', //需求资源
        // 宣传照片
        publicity_pic: [],
        num: 0, //宣传照片数量
    },

    //业务简介
    getwork(e) {
        const that = this
        that.setData({
            work: e.detail.value
        })
    },

    // 分享资源
    getshare_resource(e) {
        const that = this
        that.setData({
            share_resource: e.detail.value
        })
    },

    //需求资源
    getdemand_resources(e) {
        const that = this
        that.setData({
            demand_resources: e.detail.value
        })
    },

    //增加宣传照片  
    add_pic() {
        const that = this
        wx.chooseImage({
            count: 10 - that.data.num.length,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function(res) {
                console.log('图片', res.tempFilePaths.length);
                if (that.data.num < 11) {
                    wx.showLoading({
                        title: '图片上传中',
                        mask: true
                    })
                    for (const url of res.tempFilePaths) {
                        console.log('item', url);
                        wx.uploadFile({ //照片上传
                            url: com.getUrl('ImgUpload') + '?MemLoginid=' + wx.getStorageSync('info').MemLoginId,
                            filePath: url,
                            name: 'file',
                            header: com.header,
                            // formdata: {
                            //     MemLoginid: wx.getStorageSync('info').MemLoginid
                            // },
                            success: function(res) {
                                let url = JSON.parse(res.data).Url;
                                if (url) {
                                    that.data.publicity_pic.push(url);
                                    console.log('imageUrl:' + that.data.publicity_pic)
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

    // 保存
    save() {
        const that = this
            // console.log(com)
            // if (that.data.work.length == 0) {
            //     com.showtoast('业务简介不能为空')
            // } else {
            //     if (that.data.share_resource.length == 0) {
            //         com.showtoast('分享资源不能为空')
            //     } else {
            //         if (that.data.demand_resources.length == 0) {
            //             com.showtoast('需求资源不能为空')
            //         } else {
            //             if (that.data.num == 0) {
            //                 com.showtoast('请添加宣传图片')
            //             } else {
            //                 wx.reLaunch({
            //                     url: '/pages/card/card',
            //                 })
            //             }
            //         }
            //     }
            // }
        wx.showLoading({
            title: '提交中',
            mask: true
        })
        wx.request({
            url: com.getUrl('UI_RegisterUpdateDetail'),
            header: com.header,
            data: {
                Guid: wx.getStorageSync('info').Guid,
                Brief: that.data.work,
                SharedResource: that.data.share_resource,
                DemandResources: that.data.demand_resources,
                MultiPhoto: that.data.publicity_pic.join('|')
            },
            method: 'POST',
            success: (res) => {
                wx.reLaunch({
                    url: '/pages/business/business',
                })
            },
            fail: () => {
                com.showtoast('网络错误')
            },
            complete: () => {
                wx.hideLoading()

            }
        });
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
        const that = this
        that.setData({
            num: that.data.publicity_pic.length
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