// pages/business/mybusiness_list.js
let com = require('../../com/com.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        images: com.images,
        len: 0,
        search_text: '',
        list: {

        },
        MemLoginId: wx.getStorageSync('info').MemLoginId,
        circle: [

        ],
        Guid: '',
        CurrentPage: 1,
        PageSize: 1000,
        list1: [

        ]
    },

    // 搜索
    search(e) {
        const that = this
        that.setData({
            search_text: e.detail.value
        })
    },

    // 获取圈子顶部信息
    UI_CircleTop: function() {
        let that = this;
        let param = {
            MemLoginId: wx.getStorageSync('info').MemLoginId,
            CirleGuid: that.data.Guid, //分会Or商圈Guid
        }
        wx.request({
            url: com.getUrl('UI_CircleTop'),
            header: com.header,
            data: param,
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

    // 获取该分会的商脉圈
    UI_BusinessCircle: function() {
        let that = this;
        let param = {
            MemLoginId: wx.getStorageSync('info').MemLoginId,
            ChapterGuid: that.data.Guid,
        }
        wx.request({
            url: com.getUrl('UI_BusinessCircle'),
            header: com.header,
            data: param,
            method: 'POST',
            success: function(res) {
                if (res.data) {
                    that.setData({
                        circle: res.data
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
                guid: that.data.Guid, //ContactsType=1或2时，传入分会或商脉Guid
                ContactsType: 1, //类型，0默认，1分会，2商脉
                MemLoginId: wx.getStorageSync('info').MemLoginId,
                LikeKeyWord: that.data.search_text, //搜索关键字
                CurrentPage: that.data.CurrentPage, //当前页
                PageSize: that.data.PageSize //当前数量
            },
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

    // 申请加入圈子
    UI_AddCircleMember(e) {
        let Guid = e.currentTarget.dataset.param;
        let index = e.currentTarget.dataset.index;
        let type = e.currentTarget.dataset.type;
        let that = this;
        wx.request({
            url: com.getUrl('UI_AddCircleMember'),
            header: com.header,
            data: {
                CircleGuid: Guid, //圈子Guid
                MemLoginId: wx.getStorageSync('info').MemLoginId, //用户Id
                CategoryId: type //分类（4，分会，5商圈）
            },
            method: 'POST',
            success: function(res) {
                if (res.data == true) {
                    if (type == '4') {
                        if (that.data.list.IsJoin == 0) {
                            that.data.list.IsJoin = 1;
                        } else {
                            that.data.list.IsJoin = 0;
                        }
                        that.setData({
                            list: that.data.list
                        })
                    } else {
                        if (that.data.circle[index].IsJoin == 0) {
                            that.data.circle[index].IsJoin = 1;
                        } else {
                            that.data.circle[index].IsJoin = 0;
                        }
                        that.setData({
                            circle: that.data.circle
                        })
                    }
                } else {
                    com.showtoast('加入失败')
                }
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

    // 跳到分会详情
    goPage: function(e) {
        if (e.currentTarget.dataset.type == '4') {
            wx.navigateTo({
                url: '/pages/business/introduce?CircleGuid=' + e.currentTarget.dataset.id + '&CategoryId=' + e.currentTarget.dataset.type,
            });
        } else if (e.currentTarget.dataset.type == '5') {
            wx.navigateTo({
                url: '/pages/business/contact_list?CircleGuid=' + e.currentTarget.dataset.id + '&CategoryId=' + e.currentTarget.dataset.type,
            });
        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            Guid: options.Guid
        })
        this.UI_CircleTop();
        this.UI_BusinessCircle();
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