// pages/mine/mine.js
let com = require('../../com/com.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        photo: com.images + '/images/log_reg/head.png',
        images: com.images,
        footer: com.footer,
        // 个人信息
        info: {
            pic: '',
            nickname: '',
            company: '',
            business_area: '',
            level: '',
            popularity_num: '', //人气
            collect_num: '', //收藏
            like_num: '' //点赞
        },
        // 编辑
        edit: ['编辑名片', '编辑官网', '编辑产品'],
        // 功能
        fun: [
            [{
                    icon: '/images/mine/icon_share.png',
                    text: '分享名片'
                },
                {
                    icon: '/images/mine/icon_upgrade.png',
                    text: '会员升级'
                },
                // {
                //     icon: '/images/mine/icon_invite.png',
                //     text: '邀请好友加入'
                // }
            ],
            [{
                    icon: '/images/mine/icon_set.png',
                    text: '设置'
                },
                {
                    icon: '/images/mine/greenhand.png',
                    text: '新手上路'
                },
                {
                    icon: '/images/mine/about_us.png',
                    text: '关于我们'
                }
            ]
        ]
    },
    // 编辑跳转
    jump_edit(e) {
        switch (e.currentTarget.dataset.id) {
            case 0:
                wx.navigateTo({
                    url: '/pages/edit/edit_card',
                    success: function(res) {},
                    fail: function(res) {},
                })
                break;
            case 1:
                wx.navigateTo({
                    url: '/pages/edit/edit_website',
                    success: function(res) {},
                    fail: function(res) {},
                })
                break;
            case 2:
                wx.navigateTo({
                    url: '/pages/edit/edit_product',
                    success: function(res) {},
                    fail: function(res) {},
                })
                break;
        }
    },
    // 请求我的分会
    request_GetChapter() {
        const that = this
        wx.request({
            url: com.getUrl("UI_GetChapter"),
            data: {
                MemLoginId: wx.getStorageSync("info").MemLoginId,
                ChapterType: 0,
                AreaCode: wx.getStorageSync("info").AreaCode
            },
            header: com.header,
            method: 'POST',
            success: function(res) {
                if (!res.data.Message) {
                    let business_area = 'info.business_area';
                    that.setData({
                        [business_area]: res.data[0].Name,
                    })
                }

            }
        })
    },
    // 跳到名片小程序
    goRoutine: function(e) {
        console.log('e', e.currentTarget.dataset.id);
        if (e.currentTarget.dataset.id == 0) {
            var app = getApp();
            app.goNext(wx.getStorageSync('info').Guid);
        } else {
            this.Development();
        }

    },
    Development: function() {
        com.showtoast('努力开发中...')
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
    onShow: function(options) {

        const that = this
        let pic = "info.pic"
        let nickname = "info.nickname"
        let company = "info.company"
        let business_area = "info.business_area"
        let level = "info.level"
        let popularity_num = "info.popularity_num"
        let collect_num = "info.collect_num"
        let like_num = "info.like_num"
        that.setData({
            [pic]: wx.getStorageSync("info").MinPhoto,
            [nickname]: wx.getStorageSync("info").NickName,
            [company]: wx.getStorageSync("info").Company,
            [level]: wx.getStorageSync("info").RankName,
            [popularity_num]: wx.getStorageSync("info").BrowseCount,
            [collect_num]: wx.getStorageSync("info").CollectCount,
            [like_num]: wx.getStorageSync("info").LikeCount
        })
        that.request_GetChapter();
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
    onShareAppMessage: function(res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            // console.log(res.target)
        }
        return {
            title: '给予者联盟',
            path: '/pages/guide/guide'
        }
    }
})