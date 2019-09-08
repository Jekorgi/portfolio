// $(document).ready(function () {
//     var window_w = $(window).width();
//     var localCache = {
//         data: {},
//         remove: function (url) {
//             delete localCache.data[url];
//         },
//         exist: function (url) {
//             return localCache.data.hasOwnProperty(url) && localCache.data[url] !== null;
//         },
//         get: function (url) {
//             console.log('Załadowano z pamięci podręcznej ' + url);
//             return localCache.data[url];
//         },
//         set: function (url, cachedData, callback) {
//             localCache.remove(url);
//             localCache.data[url] = cachedData;
//             if ($.isFunction(callback)) callback(cachedData);
//         }
//     };
//     $(window).resize(function () {
//         window_w = $(this).width();
//         if (window_w >= "992") {
//             toggleNav(false, true);
//         } else {
//             toggleNav(false, false);
//         }
//     })
//     $(".jk-nav ul li").click(function () {
//         var url_raw = $(this).attr("data-menu-item");
//         $("#realContent").animate({
//             opacity: 0
//         }, 500, function () {

//             if ($(this).hasClass("jk-nav-btn")) {
//                 console.log("Wykryto przycisk zamknięcia, nie zmieniam styli.");
//             } else {
//                 if (window_w <= "992") {
//                     if ($(this).css("z-index") == 50) {
//                         $(this)
//                             .css("position", "relative")
//                             .css("width", "49%")
//                             .css("height", "30vh")
//                             .css("z-index", "0");

//                     } else {
//                         $(this).css("position", "absolute").css("z-index", "50").animate({
//                             width: "100vw",
//                             height: "100vh",
//                         }, 300, function () {
//                             // $("#content").load("components/main.html");
//                             var url = "components/" + url_raw + ".html";
//                             $.ajax({
//                                 url: url,
//                                 cache: true,
//                                 beforeSend: function () {
//                                     if (localCache.exist(url)) {
//                                         ajaxSuccess(localCache.get(url));
//                                         return false;
//                                     }
//                                     return true;
//                                 },
//                                 complete: function (jqXHR, textStatus) {
//                                     localCache.set(url, jqXHR, ajaxSuccess);
//                                 }
//                             })
//                         })
//                     }
//                 } else {
//                     console.log("Screen bigger than 992");
//                     var url = "components/" + url_raw + ".html";
//                     $.ajax({
//                         url: url,
//                         cache: true,
//                         beforeSend: function () {
//                             if (localCache.exist(url)) {
//                                 ajaxSuccess(localCache.get(url));
//                                 return false;
//                             }
//                             return true;
//                         },
//                         complete: function (jqXHR, textStatus) {
//                             localCache.set(url, jqXHR, ajaxSuccess);
//                         }
//                     })
//                 }
//             }
//         })

//     })
//     $(".jk-nav-btn").click(function () {
//         toggleNav(true)

//     })
//     $(".jk-nav-btn-wrap").click(function () {
//         console.log("Otwieranie menu");
//         toggleNav(false);
//     })

//     function toggleNav(state, resized) {
//         var top;
//         var op;
//         var dis;
//         if (state == true) { top = "-=50"; op = "0"; dis = "none" } else { top = "0"; op = "1"; $(".jk-nav").css("display", "block"); };
//         $(".jk-nav").animate({
//             top: top,
//             opacity: op
//         }, 300, function () {
//             if (resized) {
//                 $(".jk-nav ul li").not(".jk-nav-btn")
//                     .css("position", "relative")
//                     .css("width", "100%")
//                     .css("height", "10vh")
//                     .css("z-index", "0");
//             } else {
//                 $(this).css("display", dis);
//                 $(".jk-nav ul li").not(".jk-nav-btn")
//                     .css("position", "relative")
//                     .css("width", "49%")
//                     .css("height", "30vh")
//                     .css("z-index", "0");
//             }
//         })
//     }
//     function ajaxSuccess(data) {
//         if (window_w <= "992") {
//             toggleNav(true);
//         }
//         if ($("#realContent").html(data.responseText)) {
//             var content_just = $("#realContent").children().hasClass("resetJustify");
//             if (content_just) {
//                 $("#realContent").parent().css("justify-content", "unset");
//             } else {
//                 $("#realContent").parent().css("justify-content", "center");
//             }
//             $("#realContent").animate(
//                 {
//                     opacity: "1",
//                 }, 500);
//         }
//     }
// })