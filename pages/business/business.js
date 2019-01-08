// pages/business/business.js
var com = require('../../com/com.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        images: com.images,
        footer: com.footer,
        len: 0,
        search_text: '',
        CollectCount: '',
        ContactsOrderBy: 1,
        MemLoginId: wx.getStorageSync('info').MemLoginId,
        nav: [{
                name: '推荐',
                index: 1
            },
            {
                name: '同城',
                index: 2
            },
            {
                name: '同行',
                index: 3
            },
            {
                name: '同分会',
                index: 4
            },
        ],
        currentTab: 0,
        CurrentPage: 1,
        PageSize: 1000,
        list: [

        ]
    },

    // 搜索
    search() {
        wx.navigateTo({
            url: '/pages/business/search'
        })
    },

    // 导航切换
    navbarTap(e) {
        const that = this;
        that.setData({
            currentTab: e.currentTarget.dataset.id,
            ContactsOrderBy: e.currentTarget.dataset.index
        })
        that.UI_MemberContacts();
    },

    jump_collected(e) {
        wx.navigateTo({
            url: '/pages/business/collected',
            success: function(res) {},
            fail: function(res) {},
        })
    },

    jump_mybusiness(e) {
        wx.navigateTo({
            url: '/pages/business/mybusiness'
        })
    },
    // 获取我收藏的名片数量
    UI_MyCollectCount() {
        let that = this;
        wx.request({
            url: com.getUrl('UI_MyCollectCount'),
            header: com.header,
            data: {
                MemLoginId: wx.getStorageSync('info').MemLoginId
            },
            method: 'POST',
            success: function(res) {
                if (res.data) {
                    that.setData({
                        CollectCount: res.data.CollectCount
                    })
                }
            },
            fail: (res) => {
                com.showtoast('网络错误');
            }
        })
    },
    // 获取人脉信息
    UI_MemberContacts() {
        let that = this;
        wx.request({
            url: com.getUrl('UI_MemberContacts'),
            header: com.header,
            data: {
                ContactsOrderBy: that.data.ContactsOrderBy, //排序方式，0默认，1推荐，2同城，3同行，4同分会
                MemLoginId: wx.getStorageSync('info').MemLoginId,
                CurrentPage: that.data.CurrentPage, //当前页
                PageSize: that.data.PageSize //当前数量
            },
            method: 'POST',
            success: function(res) {
                if (res.data) {
                    that.setData({
                        list: res.data
                    })
                }
            },
            fail: (res) => {
                com.showtoast('网络错误');
            }
        })
    },
    // 用户关系操作
    UI_MemberRelation(e) {
        let info = e.currentTarget.dataset.param;
        let index = e.currentTarget.dataset.index;
        let that = this;
        wx.request({
            url: com.getUrl('UI_MemberRelation'),
            header: com.header,
            data: {
                CreateUser: wx.getStorageSync('info').MemLoginId, //创建人MemLoginId
                MemLoginId: info.MemLoginId, //被操作用户MemLoginId
                OperateType: info.IsCollect, //操作类型，0添加，1取消
                RelationType: 1 //关系类型，0浏览，1收藏，2点赞
            },
            method: 'POST',
            success: function(res) {
                if (that.data.list[index].IsCollect == 0) {
                    that.data.list[index].IsCollect = 1;
                } else {
                    that.data.list[index].IsCollect = 0;
                }
                that.setData({
                    list: that.data.list
                })
                that.UI_MyCollectCount();
            },
            fail: (res) => {
                com.showtoast('网络错误');
            }
        })
    },
    // 跳到名片小程序
    goRoutine: function(e) {
        var app = getApp();
        app.goNext(e.currentTarget.dataset.id)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.UI_MyCollectCount();
        this.UI_MemberContacts();
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