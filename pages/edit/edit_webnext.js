// pages/edit/edit_webnext.js
let com = require('../../com/com.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        images: com.images,
        img: com.images + '/images/mine/add_big.png',
        titleid: 0,
        title: "",
        text: ""
    },

    add_pic() {
        const that = this
        console.log(that.data.titleid)
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function(res) {
                // that.setData({
                //   img:res.tempFilePaths[0]
                // })
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
                        console.log(JSON.parse(res.data))
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
        })
    },

    jump_editweb() {
        let that = this;
        console.log(that.data.titleid)
        let pages = getCurrentPages(); //当前页面
        let prevPage = pages[pages.length - 2]; //上一页面
        let list = {
            img: that.data.img,
            titleid: parseInt(that.data.titleid),
            text: that.data.text,
            title: that.data.title
        }
        console.log(list)
        prevPage.setData({ //直接给上移页面赋值
            list: list
        });
        wx.navigateBack({
            delta: 1,
        })
    },

    gettitle(e) {
        const that = this
        that.setData({
            title: e.detail.value
        })
    },
    gettext(e) {
        const that = this
        that.setData({
            text: e.detail.value
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const that = this
        console.log(options)
        wx.setNavigationBarTitle({
            title: options.nav
        })
        that.setData({
            titleid: options.titleid
        })
        console.log(that.data.titleid)
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