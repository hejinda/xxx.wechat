var _loading;
//判断是微信内置浏览器还是外部浏览器
var isWeixin = navigator.userAgent.toLowerCase().indexOf('micromessenger') != -1;

$.extend({
    loading: function () {
        _loading = weui.loading('loading');
    },
    loadingclose: function () {
        if (_loading)
            _loading.hide();
    },
    operateFail: function (html) {
        $.loadingclose();

        if (html.status == 401) {
            weui.topTips("认证失败，请重新登录", 2000);
            top.location = window._loginPath;
            return;
        }
        weui.topTips(html.responseText, 2000);
    },
    operateSuccess: function () {
        $.loadingclose();
        weui.toast('操作成功', {
            duration: 3000,
            className: "bears"
        });
    },
    selectToPickerItem: function (selectName) {
        var ret = new Array();
        $("#" + selectName + " option").each(function () {
            var value = $(this).val();   //获取option值
            var label = $(this).text();
            if (label != '') {
                var o = new Object();
                o.value = value;
                o.label = label;
                ret.push(o);
            }
        });
        return ret;
    },
    footerTag: function (t, link) {
        switch (t) {
            case 1:
                $("#backFooter").hide();
                $("#menuFooter").show();
                break;
            case 2:
                $("#menuFooter").hide();
                $("#backFooter").show();
                if (link != null && link != "" && link != undefined) {
                    $("#backFooter").find("a").attr("href", link);
                }
                break;
            default:
                $("#menuFooter").hide();
                $("#backFooter").hide();
                break;
        }
    }
});

$.fn.extend({
    pickerClose: function () {
        $(this).slideUp("normal");
        $(".bg-model").hide();
    }
});
/**
 * linq where 写法
 * @param Lambda表达式 str
 */
Array.prototype.where = function (str) { var rs = []; for (var i in this) { var o = this[i]; if (typeof (this[i]) != 'function') if (eval(str)) rs.push(o); } return rs };
/**
 * 批量替换
 * @param 要替换得值 s1
 * @param 替换得新值 s2
 */
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}
/***
日期扩展
***/
$.date = (function () {
    return {
        formatter: function (date, pattern) {
            var result;
            if (typeof date == "string" && arguments.length == 1) {
                result = date;
            } else {
                var d = typeof date == "string" ? new Date(date) : date;
                var format = pattern || "yyy-MM-dd HH:mm:ss";
                var zeroize = function (value, length) {
                    if (!length) length = 2;
                    value = String(value);
                    for (var i = 0, zeros = ""; i < length - value.length; i++) {
                        zeros += "0";
                    }
                    return zeros + value;
                };

                result = format.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function ($0) {
                    switch ($0) {
                        case "d":
                            return d.getDate();
                        case "dd":
                            return zeroize(d.getDate());
                        case "ddd":
                            return ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"][d.getDay()];
                        case "dddd":
                            return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d.getDay()];
                        case "M":
                            return d.getMonth() + 1;
                        case "MM":
                            return zeroize(d.getMonth() + 1);
                        case "MMM":
                            return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][d.getMonth()];
                        case "MMMM":
                            return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][d.getMonth()];
                        case "yy":
                            return String(d.getFullYear()).substr(2);
                        case "yyyy":
                            return d.getFullYear();
                        case "h":
                            return d.getHours() % 12 || 12;
                        case "hh":
                            return zeroize(d.getHours() % 12 || 12);
                        case "H":
                            return d.getHours();
                        case "HH":
                            return zeroize(d.getHours());
                        case "m":
                            return d.getMinutes();
                        case "mm":
                            return zeroize(d.getMinutes());
                        case "s":
                            return d.getSeconds();
                        case "ss":
                            return zeroize(d.getSeconds());
                        case "l":
                            return zeroize(d.getMilliseconds(), 3);
                        case "L":
                            var m = d.getMilliseconds();
                            if (m > 99) m = Math.round(m / 10);
                            return zeroize(m);
                        case "tt":
                            return d.getHours() < 12 ? "am" : "pm";
                        case "TT":
                            return d.getHours() < 12 ? "AM" : "PM";
                        case "Z":
                            return d.toUTCString().match(/[A-Z]+$/);
                        default:
                            return $0.substr(1, $0.length - 2);
                    }
                });
            }
            if (result == "1900-01-01 00:00:00" || result == "0001-01-01 00:00:00" || result == "0001-01-01" || result == "1900-01-01") return "";
            else return result;
        }
    };
})();

/***
    文件预览处理
    ***/
$.filehandle = (function () {
    return {
        isPreview: function (filePath) {
            var result = false;
            if (previewFileFormat && previewFileFormat != "" && filePath && filePath != "") {
                var formats = previewFileFormat.split(',');
                var fileformat = filePath.substr(filePath.lastIndexOf(".") + 1);
                var index = $.inArray(fileformat.toLowerCase(), formats);
                if (index >= 0) {
                    result = true;
                }
            }
            return result;
        },
        previewFile: function (filePath) {
            var result = filePath;
            if (filePath && filePath != "" && blobBaseUri && previewBaseUri && result.indexOf(blobBaseUri) >= 0) {
                result = result.replace(blobBaseUri, previewBaseUri);
            }
            return result;
        }
    };
})();

$(function () {
    //解决Safari浏览器后退不刷新问题
    var browserRule = /^.*((iPhone)|(iPad)|(Safari))+.*$/;
    if (browserRule.test(navigator.userAgent)) {
        window.onpageshow = function (event) {
            if (event.persisted) {
                window.location.reload()
            }
        };
    }
    ///*回到顶部*/
    //var backButton = $(".back_to_top");
    //function backToTop() {
    //    $("html,body").animate({
    //        scrollTop: 0
    //    }, 500);
    //}
    //backButton.on("click", backToTop);
    //$(window).on("scroll", function () {
    //    /*当滚动条的垂直位置大于浏览器所能看到的页面的那部分的高度时，回到顶部按钮就显示 */
    //    if ($(window).scrollTop() > $(window).height())
    //        backButton.fadeIn();
    //    else
    //        backButton.fadeOut();
    //});
    //$(window).trigger("scroll");
    ////touchstart 调整自动判断触发back to top
    //$(document).on("touchstart", "body", function (e) {
    //    if ($(e.target).attr("class") == "back_to_top") {
    //        backToTop();
    //    }
    //});
    //input 多功能处理
    $("[pickertype]").each(function (i) {
        var $this = $(this);
        //得到标签类别
        var type = $this.attr("pickertype");
        //得到相关标签ID（如果是嵌套包含则需要在包含元素里定义targetid，否则直接指定标签ID即可）
        var targetId = $this.attr("targetid") == undefined ? $this[0].id : $this.attr("targetid");
        //如果标签类别是default则为null，否则取出相关标签对象
        var $target = type == "default" ? null : $("#" + targetId);

        switch (type) {
            case "date":
                $this.on('click', function () {
                    var dt = new Date();
                    var defaultVal = $target.val();
                    if (defaultVal != "") {
                        dt = new Date(defaultVal);
                    } else {
                        var orderBrithday = $target.attr("default-value");
                        if (orderBrithday && orderBrithday != "")
                            dt = new Date(orderBrithday);
                    }
                    var defaultStart = $target.attr("start-value");
                    if (!defaultStart)
                        defaultStart = 1900;

                    var y = dt.getFullYear();
                    var m = ("0" + (dt.getMonth() + 1)).slice(-2);
                    var d = ("0" + dt.getDate()).slice(-2);
                    weui.datePicker({
                        id: targetId,
                        start: defaultStart,
                        end: dt.getFullYear() + 15,
                        defaultValue: [y, m, d],
                        onChange: function () { },
                        onConfirm: function (result) {
                            $target.val(result[0] + "-" + ("0" + result[1]).slice(-2) + "-" + ("0" + result[2]).slice(-2));
                        }
                    });
                });
                break;
            case "select":
                $this.on('click', function () {
                    var item = $.selectToPickerItem(targetId);
                    var defaultValue = $target.val();
                    weui.picker(item, {
                        id: targetId,
                        defaultValue: [defaultValue],
                        onConfirm: function (result) {
                            $target.val(result[0]);
                            $target.change();
                        }
                    });
                });
                break;
            case "p-c-a":
                $this.on('click', function () {
                    var defaultValue, p, c, a;
                    defaultValue = $target.val().split("-");
                    p = defaultValue[0]; c = defaultValue[1]; a = defaultValue[2];
                    weui.picker(cityData, {
                        id: targetId,
                        depth: 3,
                        defaultValue: [p, c, a],
                        onConfirm: function (result) {
                            $target.val(result[0] + "-" + result[1] + "-" + result[2]);
                        }
                    });
                });
                break;
            default:
                $this.on('click', function () {
                    var pickerId = $this.attr("pickerid");
                    var $picker = $("#" + pickerId);
                    $("<div class='bg-model' targetid='" + pickerId + "'></div>").insertBefore("#" + pickerId);
                    $(".bg-model").on('click', function () {
                        var pickerId = $(this).attr("targetid");
                        $("#" + pickerId).slideUp("normal");
                        $(".bg-model").remove();
                    });
                    var pickeropen = $this.attr("pickeropen");
                    if (pickeropen) {
                        eval("(" + pickeropen + ")");
                    }
                    $(".bg-model").fadeTo(300, 1);
                    $picker.slideDown("normal");
                });
                break;
        }
    });
});
/* ===============================================================================
************ Infinite ************
=============================================================================== */
/* global $:true */
+function ($) {
    "use strict";
    var getOffset = function (container) {
        var tagName = container[0].tagName.toUpperCase()
        var scrheight = container.scrollHeight == undefined ? container[0].scrollHeight : container.scrollHeight;
        var scrollTop;
        if (tagName === 'BODY' || tagName === 'HTML') {
            scrollTop = container.scrollTop() || $(window).scrollTop()
        } else {
            scrollTop = container.scrollTop()
        }
        var offset = scrheight - ($(window).height() + scrollTop)
        return offset
    }

    var Infinite = function (el, distance) {
        this.container = $(el);
        this.container.data("infinite", this);
        this.distance = distance || 80;
        this.attachEvents();
    }

    Infinite.prototype.scroll = function () {
        var container = this.container;
        this._check();
    }

    Infinite.prototype.attachEvents = function (off) {
        var el = this.container;
        var scrollContainer = (el[0].tagName.toUpperCase() === "BODY" ? $(document) : el);
        scrollContainer[off ? "off" : "on"]("scroll", $.proxy(this.scroll, this));
    };
    Infinite.prototype.detachEvents = function (off) {
        this.attachEvents(true);
    }
    Infinite.prototype._check = function () {
        var offset = getOffset(this.container);
        if (Math.abs(offset) <= this.distance) {
            this.container.trigger("infinite");
        }
    }

    var infinite = function (el) {
        attachEvents(el);
    }

    $.fn.infinite = function (distance) {
        return this.each(function () {
            new Infinite(this, distance);
        });
    }
    $.fn.destroyInfinite = function () {
        return this.each(function () {
            var infinite = $(this).data("infinite");
            if (infinite && infinite.detachEvents) infinite.detachEvents();
        });
    }

}($);
/* ===============================================================================
************ tab标签卡切换 ************
=============================================================================== */
/* global $:true */
+function ($) {
    "use strict";
    var ITEM_ON = "weui-bar__item_on";
    var showTab = function (a) {
        var $a = $(a);
        if ($a.hasClass(ITEM_ON)) return;
        var href = $a.attr("href");
        if (!/^#/.test(href)) return;
        $a.parent().find("." + ITEM_ON).removeClass(ITEM_ON);
        $a.addClass(ITEM_ON);
        var bd = $a.parents(".weui-tab").find(".weui-tab__panel");
        bd.find(".weui-tab__content_on").removeClass("weui-tab__content_on");
        $(href).addClass("weui-tab__content_on");
    }
    $.showTab = showTab;
    $(document).on("click", ".weui-navbar__item, .weui-tabbar__item", function (e) {
        var $a = $(e.currentTarget);
        var href = $a.attr("href");
        if ($a.hasClass(ITEM_ON)) return;
        if (!/^#/.test(href)) return;
        e.preventDefault();
        showTab($a);
    });
}($);