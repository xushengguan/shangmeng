// pages/business/introduce.js
let com = require('../../com/com.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        images: com.images,
        list: {
            // pic: '/images/card/card_img.png',
            // name: '给予者分会列表',
            // belongto: '给予者深圳鹏英分会',
            // num: 75,
            // level: '5星分会',
            // area: '广东省|深圳市|龙华区',
            // build_time: '2018-1-1'
        },
        team: [],
        CircleGuid: '',
        CategoryId: ''
    },
    // 获取圈子顶部信息
    UI_CircleTop: function() {
        let that = this;
        let param = {
            MemLoginId: wx.getStorageSync('info').MemLoginId,
            CirleGuid: that.data.CircleGuid, //分会Or商圈Guid
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

    // 获取圈子领导团队
    UI_LeadingTeams: function() {
        let that = this;
        let param = {
            CirleGuid: that.data.CircleGuid, //分会Or商圈Guid
            CategoryId: that.data.CategoryId //分类，（分会4，商脉5）
        }
        wx.request({
            url: com.getUrl('UI_LeadingTeams'),
            header: com.header,
            data: param,
            method: 'POST',
            success: function(res) {
                if (res.data) {
                    if (res.data) {
                        that.setData({
                            team: res.data
                        })
                    }
                }
            },
            fail: (res) => {
                com.showtoast('网络错误');
            }
        })
    },
    // 申请加入圈子
    UI_AddCircleMember() {
        let that = this;
        wx.request({
            url: com.getUrl('UI_AddCircleMember'),
            header: com.header,
            data: {
                CircleGuid: that.data.CircleGuid, //圈子Guid
                MemLoginId: wx.getStorageSync('info').MemLoginId, //用户Id
                CategoryId: that.data.CategoryId //分类（4，分会，5商圈）
            },
            method: 'POST',
            success: function(res) {
                if (res.data.Message) {
                    com.showtoast(res.data.Message);

                } else {
                    com.showtoast('加入成功');
                    that.UI_CircleTop();
                }
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
        this.setData({
            CircleGuid: options.CircleGuid,
            CategoryId: options.CategoryId
        })
        this.UI_CircleTop();
        this.UI_LeadingTeams();
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