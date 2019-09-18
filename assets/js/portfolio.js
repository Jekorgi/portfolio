
$("#realContent").on("click", ".jk-project", function () {
    $(".jk-content").animate({
        scrollTop: 0
    }, 300);
    var pId = $(this).attr("data-project-id");
    loadProject(pId);
})
function loadProject(pId) {
    $(".jk-load-anim").animate({
        marginTop: "-5%",
        opacity: "0"
    }, 300, function () {
        $(".jk-view-project").css("display", "block");
        $("#project-title").text(projects[pId].title);
        $("#project-descr").text(projects[pId].descr);
        $(".project-imgs").text("");
        $(".project-techs").text("");
        if (projects[pId].previous == "Brak") {
            $("#content-nav-left").addClass("jk-disabled").attr("data-project-id", projects[pId].previous);
        } else {
            $("#content-nav-left").removeClass("jk-disabled").attr("data-project-id", projects[pId].previous);
        }
        if (projects[pId].next == "Brak") {
            $("#content-nav-right").addClass("jk-disabled").attr("data-project-id", projects[pId].next);
        } else {
            $("#content-nav-right").removeClass("jk-disabled").attr("data-project-id", projects[pId].next);
        }
        $.each(projects[pId].imgs, function (i, v) {
            $(".project-imgs").append("<img alt='Podgląd projektu " + v + "' src='assets/projects/" + v + "' class='img-fluid' />")
        })
        $.each(projects[pId].techs, function (i, v) {
            $(".project-techs").append("<div class='jk-tech-ico'><img alt='Ikona " + v[1] + "' src='assets/icons/" + v[0] + "' /><p>" + v[1] + "</p></div>")
        })
        $(".jk-load-anim").animate({
            marginTop: "0",
            opacity: "1"
        }, 300)
        $(".jk-view-project").animate({
            left: "0%"
        }, 300);
    })
}
$("#realContent").on("click", ".jk-view-nav-item", function () {
    var id = $(this).attr("id");
    if (id == "content-nav-close") {
        $(".jk-view-project").animate({
            left: "100%"
        }, 300, function () { $(".jk-view-project").css("display", "none"); });
    } else if (id == "content-nav-left") {
        if ($(this).attr("data-project-id") == "Brak") {
            return false
        } else {
            loadProject($(this).attr("data-project-id"));
        }
    } else {
        if ($(this).attr("data-project-id") == "Brak") {
            return false
        } else {
            loadProject($(this).attr("data-project-id"));
        }
    }
})

$("#realContent").on("mouseover", ".jk-tech-ico p", function (e) {
    e.stopPropagation();
})