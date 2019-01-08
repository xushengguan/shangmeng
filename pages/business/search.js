// pages/business/search.js
let com = require('../../com/com.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        images: com.images,
        islocal: false, //只看同城
        ispeer: false, //只看同行
        ismember: false, //只看商脉会员
        Onearr: [],
        Twoarr: [],
        Threearr: [],
        OnearrIndex: 0,
        TwoarrIndex: 0,
        ThreearrIndex: 0,
        TradeOnearr: [],
        TradeTwoarr: [],
        TradeOneIndex: 0,
        TradeTwoIndex: 0,
        Grade: [],
        GradeIndex: 0,
        AreaCode: '',
        TradeId: '',
        RankGuid: '',
        search_text: '', //搜索关键字
        CurrentPage: 1, //当前页
        PageSize: 1000 //当前数量
    },

    bindMultiPickerChangeOne(e) {
        let index = e.detail.value;
        this.setData({
            OnearrIndex: index
        })
        this.GetXn_DispatchRegion(1, this.data.Onearr[index].ID);
    },
    bindMultiPickerChangeTwo(e) {
        let index = e.detail.value;
        this.setData({
            TwoarrIndex: index
        })
        this.GetXn_DispatchRegion(2, this.data.Twoarr[index].ID);

    },
    bindMultiPickerChangeThree(e) {
        let index = e.detail.value;
        this.setData({
            ThreearrIndex: index,
            AreaCode: this.data.Threearr[index].Code
        })

    },
    bindChangeTradeOne(e) {
        let index = e.detail.value;
        this.setData({
            TradeOneIndex: index
        })
        this.GetXn_Trade(1, this.data.TradeOnearr[index].Code);
    },
    bindChangeTradeTwo(e) {
        let index = e.detail.value;
        this.setData({
            TradeTwoIndex: index,
            TradeId: this.data.TradeTwoarr[index].Code
        })
    },
    bindChangeGrade(e) {
        let index = e.detail.value;
        this.setData({
            GradeIndex: index,
            RankGuid: this.data.Grade[index].Guid
        })
    },

    // 获取省市编码
    GetXn_DispatchRegion(index, FatherId) {
        let that = this;
        wx.request({
            url: com.getUrl('GetXn_DispatchRegion'),
            header: com.header,
            data: {
                FatherId: FatherId || '0'
            },
            success: (res) => {
                if (res.data) {

                    if (index == 0) {

                        that.GetXn_DispatchRegion(1, res.data[0].ID);

                        that.setData({
                            Onearr: res.data
                        })
                    } else if (index == 1) {
                        that.GetXn_DispatchRegion(2, res.data[0].ID);
                        that.setData({
                            Twoarr: res.data
                        })
                    } else if (index == 2) {

                        that.setData({
                            Threearr: res.data,
                            AreaCode: res.data[that.data.ThreearrIndex].Code,
                            ThreearrIndex: 0
                        })
                    }


                }
            },
            fail: () => {
                com.showtoast('网络错误')
            },
        });
    },

    // 获取一二级行业
    GetXn_Trade(index, FatherId) {
        let that = this;
        wx.request({
            url: com.getUrl('GetXn_Trade'),
            data: {
                FatherId: FatherId || '00'
            },
            header: com.header,
            success: (res) => {
                if (res.data) {

                    if (index == 0) {
                        that.GetXn_Trade(1, res.data[0].Code);
                        that.setData({
                            TradeOnearr: res.data
                        })

                    } else if (index == 1) {
                        that.setData({
                            TradeTwoarr: res.data,
                            TradeId: res.data[that.data.TradeTwoIndex].Code,
                            TradeTwoIndex: 0
                        })
                    }


                }
            },
            fail: () => {
                com.showtoast('网络错误')
            },
        });
    },

    // 获取分类的等级列表
    UI_RankByCategoryId() {
        let that = this;
        wx.request({
            url: com.getUrl('UI_RankByCategoryId'),
            method: 'POST',
            header: com.header,
            success: (res) => {
                if (res.data) {
                    that.setData({
                        Grade: res.data,
                        RankGuid: res.data[that.data.GradeIndex].Guid
                    })
                }
            },
            fail: () => {
                com.showtoast('网络错误')
            },
        });
    },

    // 只看同城
    CityWide: function() {
        this.setData({
            islocal: !this.data.islocal
        })
    },

    // 只看同行
    Colleague: function() {
        this.setData({
            ispeer: !this.data.ispeer
        })
    },

    // 会员只看
    Member: function() {
        this.setData({
            ismember: !this.data.ismember
        })
    },

    // 键盘输入
    bindevalue: function(e) {
        console.log(e.detail);
        this.setData({
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
            AreaCode: that.data.islocal ? wx.getStorageSync('info').AreaCode : that.data.AreaCode, //地区
            TradeId: that.data.ispeer ? wx.getStorageSync('info').TradeId : that.data.TradeId, //行业	
            RankGuid: that.data.ismember ? that.data.Grade[0].Guid : that.data.RankGuid, //会员等级
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
                    wx.navigateTo({
                        url: '/pages/business/connection_list?LikeKeyWord=' + param.LikeKeyWord + '&AreaCode=' + param.AreaCode + '&TradeId=' + param.TradeId + '&RankGuid=' + param.RankGuid
                    });
                } else {
                    com.showtoast('没有搜索结果')
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
        this.GetXn_DispatchRegion(0);
        this.GetXn_Trade(0);
        this.UI_RankByCategoryId();
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