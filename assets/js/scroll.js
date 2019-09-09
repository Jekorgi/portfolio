$(".jk-content").scroll(function () {
    adjustScroll();
})
function adjustScroll() {
    var scr = Math.floor($(".jk-content").scrollTop());
    var wh = $(window).height();
    var dh = ($("#realContent").outerHeight()) + 40;
    var val = dh - wh;
    if (val > 60) {
        $(".jk-progress").css("top", "0");
        $(".jk-scroll-indicator").css("transform", "scale(1)");
    } else {
        $(".jk-progress").css("top", "-10px");
        $(".jk-scroll-indicator").css("transform", "scale(0)");
    }
    if (scr > 60) {
        $(".jk-scroll-indicator .jk-arrow").css("opacity", "1");
    } else {
        $(".jk-scroll-indicator .jk-arrow").css("opacity", "0");
    }
    var scrolled = (scr / val) * 100;
    $(".fill").css("width", scrolled + "vw");
}
$(".jk-scroll-indicator").click(function () {
    $(".jk-content").scrollTop(0);
})