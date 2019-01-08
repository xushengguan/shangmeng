// pages/register/register_industry.js
const com = require("../../com/com.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: 0,
        idx: 0,
        leftlist: [],
        rightlist: []
    },

    // 选择父行业
    nav_left(e) {
        const that = this
        let item = e.currentTarget.dataset.item;
        let id = e.currentTarget.dataset.id;
        that.setData({
            id: id
        })
        that.GetXn_Trade(item.Code);
    },
    // 选择子行业
    nav_right(e) {
        const that = this
        let data = e.currentTarget.dataset.idx; //点击获取传参
        let pages = getCurrentPages(); //获取页面栈
        let prevPage = pages[pages.length - 2];
        prevPage.setData({ //赋值给上一个页面
            industry: data.Name,
            TradeId: data.Code
        })
        wx.navigateBack({ //关闭当前页面,返回上一个页面
            delta: 1,
        })
    },
    // 获取一，二级行业
    GetXn_Trade(FatherId) {
        let that = this;
        wx.request({
            url: com.getUrl('GetXn_Trade'),
            data: {
                FatherId: FatherId || '00'
            },
            success: (res) => {
                if (res.data) {
                    if (FatherId) {
                        that.setData({
                            rightlist: res.data
                        })
                    } else {
                        that.setData({
                            leftlist: res.data
                        })
                        if (FatherId != '00') {
                            that.GetXn_Trade(res.data[0].Code);
                        }
                    }
                }
            },
            fail: () => {
                com.showtoast('网络错误')
            },
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        that.GetXn_Trade();
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