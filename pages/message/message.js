// pages/message/message.js
let com = require('../../com/com.js');
var setTime;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        images: com.images,
        len: 0,
        search_text: '',
        icon: '',
        list: [],
        delBtnWidth: 180,
        startX: ""
    },

    // 搜索
    search(e) {
        const that = this
        that.setData({
            search_text: e.detail.value
        })
    },

    // 获取消息列表
    UI_MessageInfo: function() {
        let that = this;
        wx.request({
            url: com.getUrl('UI_MessageInfo'),
            data: {
                MemLoginId: wx.getStorageSync('info').Guid,
                MessageInfoType: 0,
                KeyWords: that.data.search_text
            },
            header: com.header,
            method: 'POST',
            success: (res) => {
                if (res.data) {
                    that.setData({
                        list: res.data
                    })
                }
            },
            fail: () => {
                com.showtoast('网络错误');
            }
        });
    },

    // 获取消息，是否有新消息
    UI_MessageInfoIsRead: function() {
        let that = this;
        wx.request({
            url: com.getUrl('UI_MessageInfoIsRead'),
            data: {
                MemLoginId: wx.getStorageSync('info').Guid,
                MessageInfoType: 0,
                KeyWords: that.data.search_text
            },
            header: com.header,
            method: 'POST',
            success: (res) => {
                if (res.data) {
                    that.setData({
                        icon: res.data
                    })
                }
            },
            fail: () => {
                com.showtoast('网络错误');
            }
        });
    },

    // 跳到消息详情页
    Detail: function(e) {
        wx.navigateTo({
            url: '/pages/message/msgDetail?id=' + e.currentTarget.dataset.id.LoginId,
        });
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
        let that = this;
        if (!that.data.icon) {
            setTime = setInterval(function(res) {
                that.UI_MessageInfo();
                // that.initEleWidth();
                that.UI_MessageInfoIsRead();
            }, 10000);
        }
        that.UI_MessageInfo();
        that.UI_MessageInfoIsRead();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
        console.log('页面隐藏');
        clearTimeout(setTime);
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        console.log('页面卸载');
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

    },

    touchS: function(e) {
        if (e.touches.length == 1) {
            this.setData({
                //设置触摸起始点水平方向位置
                startX: e.touches[0].clientX
            });
        }
    },
    touchM: function(e) {
        if (e.touches.length == 1) {
            //手指移动时水平方向位置
            var moveX = e.touches[0].clientX;
            //手指起始点位置与移动期间的差值
            var disX = this.data.startX - moveX;
            var delBtnWidth = this.data.delBtnWidth;
            var txtStyle = "";
            if (disX == 0 || disX < 0) { //如果移动距离小于等于0，说明向右滑动，文本层位置不变
                txtStyle = "left:0px";
            } else if (disX > 0) { //移动距离大于0，文本层left值等于手指移动距离
                txtStyle = "left:-" + disX + "px";
                if (disX >= delBtnWidth) {
                    //控制手指移动距离最大值为删除按钮的宽度
                    txtStyle = "left:-" + delBtnWidth + "px";
                }
            }
            //获取手指触摸的是哪一项
            var index = e.currentTarget.dataset.index;
            var list = this.data.list;
            list[index].txtStyle = txtStyle;
            //更新列表的状态
            this.setData({
                list: list
            });
        }
    },
    touchE: function(e) {
        if (e.changedTouches.length == 1) {
            //手指移动结束后水平位置
            var endX = e.changedTouches[0].clientX;
            //触摸开始与结束，手指移动的距离
            var disX = this.data.startX - endX;
            var delBtnWidth = this.data.delBtnWidth;
            //如果距离小于删除按钮的1/2，不显示删除按钮
            var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
            //获取手指触摸的是哪一项
            var index = e.currentTarget.dataset.index;
            var list = this.data.list;
            list[index].txtStyle = txtStyle;
            //更新列表的状态
            this.setData({
                list: list
            });
        }
    },
    //获取元素自适应后的实际宽度
    getEleWidth: function(w) {
        var real = 0;
        try {
            var res = wx.getSystemInfoSync().windowWidth;
            var scale = (750 / 2) / (w / 2); //以宽度750px设计稿做宽度的自适应
            real = Math.floor(res / scale);
            return real;
        } catch (e) {
            return false;
            // Do something when catch error
        }
    },
    initEleWidth: function() {
        var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
        this.setData({
            delBtnWidth: delBtnWidth
        });
    },
    //点击删除按钮事件
    delItem: function(e) {
        //获取列表中要删除项的下标
        var index = e.currentTarget.dataset.index;
        let that = this;
        let LoginId = [];
        for (const item of that.data.list) {
            LoginId.push(item.LoginId);
        }
        wx.request({
            url: com.getUrl('UI_MessageInfoDelete') + '?MemLoginId=' + wx.getStorageSync('info').MemLoginId,
            header: com.header,
            data: LoginId,
            method: 'POST',
            success: (res) => {
                var list = this.data.list;
                //移除列表中下标为index的项
                list.splice(index, 1);
                //更新列表的状态
                this.setData({
                    list: list
                });
                that.setData({
                    icon: ''
                })
                com.showtoast('删除成功');
            },
            fail: () => {
                com.showtoast('网络错误');
            }
        });

    },

})