$(document).ready(function () {
    $('.nav > li > a').click(function (event) {
        event.preventDefault();//stop browser to take action for clicked anchor

        //get displaying tab content jQuery selector
        var active_tab_selector = $('.nav > li.active > a').attr('href');

        //find actived navigation and remove 'active' css
        var actived_nav = $('.nav > li.active');
        actived_nav.removeClass('active');

        //add 'active' css into clicked navigation
        $(this).parents('li').addClass('active');

        //hide displaying tab content
        $(active_tab_selector).removeClass('active');
        $(active_tab_selector).addClass('hide');

        //show target tab content
        var target_tab_selector = $(this).attr('href');
        $(target_tab_selector).removeClass('hide');
        $(target_tab_selector).addClass('active');
    });
});

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

//Konami code
var jump = "32" //spacebar
var secret = "38384040373937396665"; //Konami code
var input = "";
var timer;
var mode = false;
var showMario = false;
$(document).keyup(function (e) {
    //alert(e.which);
    input += e.which;
    clearTimeout(timer);
    timer = setTimeout(function () {
        input = "";
    }, 750);
    check_input();
});
function check_input() {
    if (input == jump) {
        $('.mario').animate({ bottom: "200px" }, 150, function () {
        }).animate({ bottom: "64px" }, 150);
    }
    if (input == secret) {
        showMario = true;
        $(".cloud").addClass("expand").fadeOut(1000);
        setTimeout(function () {
            $(".ground").css("visibility", "visible");
            $("body").css({
                "background": "#c6efff url('img/konami/background.png') fixed center bottom repeat-x", //Possible upgrade : fadein on the background, .fadeIn(1000) doesn't work...
            });
        }, 400);
    }
}
;
$(document).ready(function () {
    setInterval(function () {
        $('#konami-info').html('Keystroke: ' + input);
    }, 100);
});
$(function () {
    var mario = $('.mario');
    var walking = 110;
    mario.css("left", walking + "%");
    var horizontal = mario.css('background-position-x');
    var flag = 0;
    var scroll = 23;
    console.log(walking);
    $(document).on("scroll", function () {
        if (showMario == true) {
            var scroll = $(document).scrollTop();
            walking = walking - 1;
            mario.css("left", walking + "%");
            if (walking == -10) {
                walking = 110;
            }
            if ((scroll % 3) == 0) {
                if (horizontal == "0px") {
                    mario.css("background-position-x", "-65px");
                    horizontal = mario.css('background-position-x');
                } else if ((horizontal == "-65px") && (flag == 0)) {
                    mario.css("background-position-x", "-130px");
                    horizontal = mario.css('background-position-x');
                    flag = 1;
                } else if ((horizontal == "-65px") && (flag == 1)) {
                    mario.css("background-position-x", "0px");
                    horizontal = mario.css('background-position-x');
                    flag = 0;
                } else if (horizontal == "-130px") {
                    mario.css("background-position-x", "-65px");
                    horizontal = mario.css('background-position-x');
                }
            }
        }
        //mario.css("background-position-x", horizontal+"px");
    });
});
//preventing spacebar to scroll down (and break the jump)
window.addEventListener('keydown', function (e) {
    if (e.keyCode == 32 && e.target == document.body) {
        e.preventDefault();
    }
});