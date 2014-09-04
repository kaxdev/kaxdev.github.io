$(function () {
    "use strict";


    /* ==========================================================================
   onscroll animation
   ========================================================================== */
		
		if ($(window).width() > 992) {
			$(window).fadeThis({
					'reverse': false
			});
		};
		
    /* ==========================================================================
   features slider
   ========================================================================== */

    $('.features-slider').slick({
        dots: true,
        arrows: false,
				infinite: false
    });


    /* ==========================================================================
   tool tip
   ========================================================================== */

    $('.nav a').tooltip();

    /* ==========================================================================
   Team-slider
   ========================================================================== */


    $('.team-slider').slick({
        dots: true,
        arrows: false,
        infinite: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true,
                arrows: false
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                arrows: false
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                arrows: false
            }
        }]
    });

    /* ==========================================================================
   sub form
   ========================================================================== */

    var $form = $('#mc-form');

    $('#mc-subscribe').on('click', function (event) {
        if (event) event.preventDefault();
        register($form);
    });


    function register($form) {
        $.ajax({
            type: $form.attr('method'),
            url: $form.attr('action'),
            data: $form.serialize(),
            cache: false,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            error: function (err) {
                $('#mc-notification').hide().html('<span class="alert">Could not connect to server. Please try again later.</span>').fadeIn("slow");
            },
            success: function (data) {

                if (data.result != "success") {
                    var message = data.msg.substring(4);
                    $('#mc-notification').hide().html('<span class="alert">' + message + '</span>').fadeIn("slow");
                } else {
                    var message = data.msg.substring(4);
                    $('#mc-notification').hide().html('<span class="success">' + 'Awesome! We sent you a confirmation email.' + '</span>').fadeIn("slow");
                }
            }
        });
    }


    /* ==========================================================================
   ScrollTop Button
   ========================================================================== */


    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.scroll-top a').fadeIn(200);
        } else {
            $('.scroll-top a').fadeOut(200);
        }
    });


    $('.scroll-top a').click(function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });

    /* ==========================================================================
   Smooth Scroll
   ========================================================================== */

    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

    /* ==========================================================================
   Contact Form
   ========================================================================== */


    var form = $('#ajax-contact');


    var formMessages = $('#form-messages');


    $(form).submit(function (event) {

        event.preventDefault();


        var formData = $(form).serialize();




        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        }).done(function (response) {

            $(formMessages).removeClass('error');
            $(formMessages).addClass('success');


            $(formMessages).hide().text(response).slideDown();


            $('#name').val('');
            $('#email').val('');
            $('#message').val('');
        }).fail(function (data) {

            $(formMessages).removeClass('success');
            $(formMessages).addClass('error');


            if (data.responseText !== '') {
                $(formMessages).text(data.responseText);
            } else {
                $(formMessages).hide().text('Oops! An error occured and your message could not be sent.').slideDown();
            }
        });




    });


});