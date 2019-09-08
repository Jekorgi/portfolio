// =================================================//
//                                                  //
//  Navigation Control v.1.0.0                      //
//  All rights reserved by Michał Janocha           //
//                                                  //
// =================================================//
var localCache = {
    data: {},
    remove: function (url) {
        delete localCache.data[url];
    },
    exist: function (url) {
        return localCache.data.hasOwnProperty(url) && localCache.data[url] !== null;
    },
    get: function (url) {
        console.log('Loaded from cache: ' + url);
        return localCache.data[url];
    },
    set: function (url, cachedData, callback) {
        localCache.remove(url);
        localCache.data[url] = cachedData;
        if ($.isFunction(callback)) callback(cachedData);
    }
};


function Nav() {
    // Variables =================================
    this.options = [];
    this.selector;
    this.click;
    this.mobileCap = "992";
    this.sw = $(window).width();
    this.mobileView;
    this.state = true;
    this.dataContainerSelector;

    this.opacity;
    this.top;
    this.dis;

    // Add Functions =============================
    this.addItem = function (item, text, icon, isCloseBtn) {
        if (!icon) {
            icon = "home";
        }
        this.options.push({ item, text, icon });
        if (isCloseBtn) {
            $(this.selector).append("<li class='jk-nav-btn'>" + text + "</li>");
        } else {
            $(this.selector).append("<li data-menu-item='" + item + "'><i class='fas fa-" + icon + " jk-icon'></i><span>" + text + "</span></li>");
        }
        console.log(item + " added to nav with selector: " + this.selector);
    }

    // Get Functions =============================
    this.getItems = function () {
        return this.options;
    }
    this.getItem = function (url) {
        return this.options.filter(function (item) { return item.item === url; });
    }
    this.getMobileCap = function () {
        return this.mobileCap;
    }
    this.getMobileView = function () {
        return this.mobileView;
    }
    this.getSelector = function () {
        return this.selector;
    }
    this.getScreenWidth = function () {
        return this.sw;
    }
    // Set Functions =============================
    this.setMobileView = function (state) {
        this.mobileView = state;
    }
    this.setScreenWidth = function (sw) {
        this.sw = sw;
    }

    // Util Functions ============================
    this.filterName = function (item, url) {
        return item.item === url;
    }
    this.checkScreenWidth = () => {
        if (this.sw <= this.mobileCap && this.mobileView === false) {
            this.mobileView = true;
            console.log("Reloaded for Mobile view");
        } else if (this.sw > this.mobileCap && this.mobileView === true) {
            this.mobileView = false;
            if (this.state === false) {
                this.toggleMenu();
            }
            console.log("Reloaded for Desktop view");
        }
    }
    this.initMobileView = () => {
        if (this.sw <= this.mobileCap) {
            this.mobileView = true;
        } else if (this.sw > this.mobileCap) {
            this.mobileView = false;
        }
    }
    this.initMobileView();
    this.toggleMenu = () => {
        this.state = !this.state;
        var state = this.state;
        if (this.state === true) {
            this.opacity = "1";
            this.top = "0";
            $(".jk-nav").removeClass("jk-display");
        } else {
            this.opacity = "0";
            this.top = "-=50";
            this.dis = "none";
        }
        $(".jk-nav").animate(
            {
                top: this.top,
                opacity: this.opacity

            }, 400, function () {
                if (state === false) {
                    $(".jk-nav").toggleClass("jk-display");
                }
            }
        );
    }
    this.updateData = (data) => {
        $(this.dataContainerSelector).html(data.responseText);
        var content_just = $(this.dataContainerSelector).children().hasClass("resetJustify");
        if (content_just) {
            $(this.dataContainerSelector).parent().css("justify-content", "unset");
        } else {
            $(this.dataContainerSelector).parent().css("justify-content", "center");
        }
    }
}
function registerEvents_g() {
    $(document).on("click", navbar.getSelector() + " li", function () {
        if ($(this).hasClass("jk-nav-btn")) {
            navbar.toggleMenu();
        } else {
            var url_raw = $(this).attr("data-menu-item");
            $(".jk-anim-gray .jk-right").animate({
                right: "50.2%"
            }, 400).animate({
                height: "100vh"
            }, 500)
            $(".jk-anim-gray .jk-left").animate({
                left: "50.2%"
            }, 400).animate({
                height: "100vh"
            }, 500)
            $(".jk-anim-gray .jk-center").animate({
                height: "100vh"
            }, 1000)
            $(".jk-anim-gray .jk-center .jk-center-active").css("height", "10vh");
            $(".jk-blank").css("display", "flex").animate({
                display: "block"
            }, 300, function () {
                var url = "components/" + url_raw + ".html";
                $(".jk-anim-gray .jk-center .jk-center-active").css("height", "30vh");
                $.ajax({
                    url: url,
                    cache: true,
                    beforeSend: function () {
                        if (localCache.exist(url)) {
                            $(".jk-anim-gray .jk-center .jk-center-active").css("height", "100vh");
                            $(".jk-blank").delay(1000).animate({
                                display: "none"
                            }, 2500, function () {
                                $(this).css("display", "none");
                            })
                            $(".jk-anim-gray .jk-center").delay(1000).animate({
                                height: 0
                            }, 100, function () {
                                navbar.updateData(localCache.get(url));
                            })
                            $(".jk-anim-gray .jk-right").delay(1000).animate({
                                height: "0.2vh"
                            }, 300).animate({
                                right: "100%"
                            }, 300)
                            $(".jk-anim-gray .jk-left").delay(1000).animate({
                                height: "0.2vh"
                            }, 300).animate({
                                left: "100%"
                            }, 300)
                            return false;
                        }
                        return true;
                    },
                    complete: function (jqXHR, textStatus) {
                        $(".jk-anim-gray .jk-center .jk-center-active").css("height", "100vh");
                        $(".jk-blank").delay(1000).animate({
                            display: "none"
                        }, {
                                queue: false,
                                duration: 2500,
                                complete: function () {
                                    $(this).css("display", "none");
                                }
                            })
                        $(".jk-anim-gray .jk-center").delay(1000).animate({
                            height: 0
                        }, 100, function () {
                            localCache.set(url, jqXHR, navbar.updateData);
                        })
                        $(".jk-anim-gray .jk-right").delay(1000).animate({
                            height: "0.2vh"
                        }, 300).animate({
                            right: "100%"
                        }, 300)
                        $(".jk-anim-gray .jk-left").delay(1000).animate({
                            height: "0.2vh"
                        }, 300).animate({
                            left: "100%"
                        }, 300)
                    }
                })
            });
        }
    })
    $(".jk-nav-btn-wrap").click(function () {
        navbar.toggleMenu();
    })

    $(window).resize(function () {
        navbar.setScreenWidth($(this).width());
        navbar.checkScreenWidth();
    })
}

var navbar = new Nav();
navbar.selector = ".jk-nav ul";
navbar.dataContainerSelector = "#realContent";
navbar.addItem("main", "Główna", "home");
navbar.addItem("about", "O mnie", "user-circle");
navbar.addItem("portfolio", "Portfolio", "briefcase");
navbar.addItem("skills", "Umiejętności", "chart-pie");
navbar.addItem("experience", "Doświadczenie", "star");
navbar.addItem("contact", "Kontakt", "id-card-alt");
navbar.addItem("close", "Zamknij", "none", true);
console.log(navbar.getItem("main"));
registerEvents_g();