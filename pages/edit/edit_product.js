// pages/edit/edit_product.js
let com = require('../../com/com.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        del_url: '/images/tarbar/icon_del.png',
        images: com.images,
        CurrentPage: 1,
        PageSize: 4,
        product: [
            // {
            //   img:'/images/product/pro_pic.png',
            //   name:'臻享听觉盛宴1',
            //   price:'256.00',
            //   main:true
            // },
            // {
            //   img: '/images/product/pro_pic.png',
            //   name: '臻享听觉盛宴1',
            //   price: '256.00',
            //   main:false
            // },
            // {
            //   img: '/images/product/pro_pic.png',
            //   name: '臻享听觉盛宴1',
            //   price: '256.00',
            //   main:false
            // },
        ]
    },
    //请求获取列表
    request_GetProduct() {
        const that = this
            // 显示加载图标
        wx.request({
            url: com.getUrl('UI_GetProduct'),
            data: {
                MemLoginId: wx.getStorageSync('info').MemLoginId,
                CurrentPage: that.data.CurrentPage,
                PageSize: that.data.PageSize
            },
            header: com.header,
            method: 'POST',
            success: function(res) {
                // 隐藏加载框
                if (res.data) {
                    for (let i = 0; i < res.data.length; i++) {
                        that.data.product.push(res.data[i])
                    }
                    that.setData({
                        product: that.data.product
                    })
                    that.data.CurrentPage = that.data.CurrentPage + 1;
                }

            }
        })
    },
    // 请求设为主推
    request_ManageProductIsRecommend(id) {
        const that = this
        wx.request({
            url: com.getUrl('UpdateUI_ManageProductIsRecommend'),
            data: {
                Guid: that.data.product[id].Guid,
                MemLoginId: wx.getStorageSync('info').MemLoginId,
                IsRecommend: that.data.product[id].IsRecommend == 0 ? 1 : 0
            },
            header: com.header,
            method: 'POST',
            success: function(res) {
                if (res.statusCode == 200 || res.statusCode == 204) {
                    that.data.product[id].IsRecommend = that.data.product[id].IsRecommend == 0 ? 1 : 0
                    that.setData({
                        product: that.data.product
                    })
                    that.data.product[id].IsRecommend == 1 ? com.showtoast('设置主推成功') : com.showtoast('取消成功')
                        // that.request_GetProduct()
                }
            },
            fail: (res) => {
                com.showtoast('操作失败');
            }
        })
    },
    //请求删除
    request_ManageProductDelete(id) {
        const that = this;
        wx.request({
            url: com.getUrl('UI_ManageProductDelete'),
            data: {
                Guid: that.data.product[id].Guid,
                MemLoginId: wx.getStorageSync('info').MemLoginId,
            },
            header: com.header,
            method: 'POST',
            success: function(res) {
                console.log(res)
                if (res.statusCode == 200) {
                    that.data.product.splice(id, 1)
                    that.setData({
                        product: that.data.product
                    })
                    com.showtoast('删除成功')
                } else {
                    com.showtoast('删除失败')
                }
            },
            fail: function(res) {},
            complete: function(res) {},
        })
    },
    // 设为主推
    setmain(e) {
        const that = this
        that.request_ManageProductIsRecommend(e.currentTarget.dataset.id)
    },
    //删除
    del(e) {
        const that = this
        that.request_ManageProductDelete(e.currentTarget.dataset.id)
    },

    // 编辑
    edit_prodetail(e) {
        const that = this
        wx.navigateTo({
            url: '/pages/edit/edit_prodetail?add=' + 0 + "&id=" + that.data.product[e.currentTarget.dataset.id].Guid,
        })
    },
    //添加
    addedit_prodetail() {
        wx.navigateTo({
            url: '/pages/edit/edit_prodetail?add=' + 1,
        })
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
        const that = this
        that.request_GetProduct();
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
        this.request_GetProduct();
        console.log('上拉触底')
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})