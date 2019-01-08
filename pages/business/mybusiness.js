// pages/business/mybusiness.js
let com = require('../../com/com.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        images: com.images,
        Mybranch: [],
        GroomBranch: [],
        CityBranch: []
    },

    // 获取分会信息
    UI_GetChapter: function(ChapterType) {
        let that = this;
        let param = {
            MemLoginId: wx.getStorageSync('info').MemLoginId,
            ChapterType: ChapterType, //获取分会类型，0我的分会，1同城分会推荐，2各大城市分会
            AreaCode: wx.getStorageSync('info').AreaCode || '019001005'
        }
        wx.request({
            url: com.getUrl('UI_GetChapter'),
            header: com.header,
            data: param,
            method: 'POST',
            success: function(res) {
                if (res.data) {
                    switch (ChapterType) {
                        case 0:
                            that.setData({
                                Mybranch: res.data
                            })
                            break;
                        case 1:
                            that.setData({
                                GroomBranch: res.data
                            })
                            break;
                        case 2:
                            that.setData({
                                CityBranch: res.data
                            })
                            break
                    }
                }
            },
            fail: (res) => {
                com.showtoast('网络错误');
            }
        })
    },

    Detail: function(e) {
        wx.navigateTo({
            url: '/pages/business/mybusiness_list?Guid=' + e.currentTarget.dataset.guid
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.UI_GetChapter(0)
        this.UI_GetChapter(1)
        this.UI_GetChapter(2)
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