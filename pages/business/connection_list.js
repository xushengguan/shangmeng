// pages/business/connection_list.js
let com = require('../../com/com.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        images: com.images,
        search_text: '',
        AreaCode: '',
        TradeId: '',
        RankGuid: '',
        MemLoginId: wx.getStorageSync('info').MemLoginId,
        list1: [

        ],
        CurrentPage: 1,
        PageSize: 1000
    },

    // 搜索
    search(e) {
        const that = this
        that.setData({
            search_text: e.detail.value
        })
    },
    // 搜索
    UI_MemberContacts: function() {
        let that = this;
        if (!that.data.search_text) {
            return false;
        }
        let param = {
            MemLoginId: wx.getStorageSync('info').MemLoginId,
            LikeKeyWord: that.data.search_text, //搜索关键字
            AreaCode: that.data.AreaCode, //地区
            TradeId: that.data.TradeId, //行业	
            RankGuid: that.data.RankGuid, //会员等级
            CurrentPage: that.data.CurrentPage, //当前页
            PageSize: that.data.PageSize //当前数量
        }
        wx.request({
            url: com.getUrl('UI_MemberContacts'),
            header: com.header,
            data: param,
            method: 'POST',
            success: function(res) {
                if (res.data) {
                    that.setData({
                        list1: res.data
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
                if (that.data.list1[index].IsCollect == 0) {
                    that.data.list1[index].IsCollect = 1;
                } else {
                    that.data.list1[index].IsCollect = 0;
                }
                that.setData({
                    list1: that.data.list1
                })

            },
            fail: (res) => {
                com.showtoast('网络错误');
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log('options', options);
        if (options) {
            this.setData({
                search_text: options.LikeKeyWord,
                AreaCode: options.AreaCode,
                TradeId: options.TradeId,
                RankGuid: options.RankGuid
            })
            this.UI_MemberContacts();

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