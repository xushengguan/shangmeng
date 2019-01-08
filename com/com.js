let images = 'https://xnsmb.xnsoft.net.cn'

let API_Url = "https://xnsmb.xnsoft.net.cn/api/"


let footer = {
    name: '给予者商盟1.0',
    operate: '平台运营:给予者商盟',
    technology: '技术支持: 希鸟科技'
}

// 邮箱验证
const test_email = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
//手机号码验证
const test_mobile = /^1[0-9]{10}$/;

// 请求Url
let getUrl = function(url) {
    return API_Url + url
}

// 请求头部
let header = {
    'Content-Type': 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded',
    "Authorization": 'bearer ' + wx.getStorageSync("token")
}

//请求数据获取结果
function request_success() {
    wx.showToast({
        title: '数据获取成功',
        icon: "none"
    })
}

function request_fail() {
    wx.showToast({
        title: '数据获取失败,网络不良！',
        icon: "none"
    })
}

// 日期去T
let replaceT = function(data) {
    return data.replace("T", " ")
}

//拨打电话
function phoneCall(phone_number) {
    wx.makePhoneCall({
        phoneNumber: phone_number,
    })
}

// 弹窗提醒
function showtoast(text) {
    wx.showToast({
        title: text,
        icon: 'none',
        mask: true,
        duration: 2000,
        success() {},
        fail() {}
    })
}

// 手机号码验证
function test_moblie1(mobile) {
    const that = this
    const myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (mobile.length == 0) {
        that.showtoast('手机号码不能为空！')
        return false;
    } else {
        if (mobile.length != 11) {
            that.showtoast('手机号码格式错误！')
            return false;
        } else {
            if (!myreg.test(mobile)) {
                that.showtoast('手机号码格式错误！')
                return false;
            } else {
                return true;
            }
        }
    }
}
// 输入框验证
function sec_input(e, text, data) {
    var that = this
    if (e.detail.value.length == 0) {
        that.showtoast(text)
    } else {
        that.setData({
            data: e.detail.value
        })
    }
}

//邮箱验证
function test_email1(email) {
    const that = this
    const reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    if (e.detail.length == 0) {
        that.showtoast('邮箱号不能为空')
    } else {
        if (!reg.test(e.detail.value)) {
            that.showtoast('邮箱格式错误！')
        } else {
            that.setData({
                email: e.detail.value
            })
        }
    }
}

module.exports = {
    footer: footer,
    API_Url: API_Url,
    getUrl: getUrl,
    replaceT: replaceT,
    header: header,
    request_success: request_success,
    request_fail: request_fail,
    phoneCall: phoneCall,
    showtoast: showtoast,
    test_mobile: test_mobile,
    // sec_input: sec_input,
    test_email: test_email,
    images: images
}