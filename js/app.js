$(document).ready(function() {


	$(".scroll").click(function (e){
		e.preventDefault();
		var scroll_to = $(this).attr('id');
	$('html, body').animate({
		scrollTop: $('#'+scroll_to+'_target').offset().top - 20
		}, 1000); 	
	});

	$(".fancybox-effects-a").fancybox({
		helpers: {
			title : {
				type : 'outside'
			},
			overlay : {
				speedOut : 0
			}
		}
	});

    var contact = '';
    contact += '<li><a href="tel:+07906117249"><img src="icons/phone.png" alt="phone" />07906-117-249</a></li>';
    contact += '<li><a href="mailto:rocksteady_tnt@yahoo.com"><img src="icons/email.png" alt="email" />rocksteady_tnt@yahoo.com</a></li>';
     
    $('.phone_email').append(contact);

    var contactFormMarkup = '<form method="POST" action="http://formspree.io/rocksteady_tnt@yahoo.com">';
    contactFormMarkup += '<input type="hidden" name="_subject" value="Your enquiry to Kelly Ann Marshall" />';
    contactFormMarkup += '<label for="name">Name<input type="text" name="name" required></label>';
    contactFormMarkup += '<label for="_replyto">Email<input type="email" name="_replyto" required></label>';
    contactFormMarkup += '<label for="message">Message<textarea name="message" required></textarea></label>';
    contactFormMarkup += '<input type="hidden" name="_next" value="https://kellyannmarshall.github.io" />';
    contactFormMarkup += '<input type="text" name="_gotcha" style="display:none" />';
    contactFormMarkup += '<button type="submit">Send</button>';

    contactFormMarkup += '</form>';

    $('.phone_email').after(contactFormMarkup);


	(function() {

	  "use strict";

	  var toggles = document.querySelectorAll(".switch");

	  for (var i = toggles.length - 1; i >= 0; i--) {
	    var toggle = toggles[i];
	    toggleHandler(toggle);
	  };

	  function toggleHandler(toggle) {
	    toggle.addEventListener( "click", function(e) {
	      e.preventDefault();
	      var page_container = $('.page_container'),
	      off_canvas_navigation = $('.off_canvas_navigation');
	      (this.classList.contains("active") === true) ? this.classList.remove("active") : this.classList.add("active");
	      (page_container.hasClass("offset") === true) ? page_container.removeClass('offset') : page_container.addClass('offset');
	      (off_canvas_navigation.hasClass("active") === true) ? off_canvas_navigation.removeClass('active') : off_canvas_navigation.addClass('active');

	    });
	  }

	})();

	(function() {

    var width, height, largeHeader, canvas, ctx, circles, target, animateHeader = true;

    // Main
    initHeader();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: 0, y: height};

        largeHeader = document.getElementById('animation');
        largeHeader.style.height = height+'px';

        canvas = document.getElementById('canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create particles
        circles = [];
        for(var x = 0; x < width*0.5; x++) {
            var c = new Circle();
            circles.push(c);
        }
        animate();
    }

    // Event handling
    function addListeners() {
        window.addEventListener('resize', resize);
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight / 2;
        canvas.width = width;
        canvas.height = height;
    }

    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in circles) {
                circles[i].draw();
            }
        }
        requestAnimationFrame(animate);
    }

    // Canvas manipulation
    function Circle() {
        var _this = this;

        // constructor
        (function() {
            _this.pos = {};
            init();
        })();

        function init() {
            _this.pos.x = Math.random()*width;
            _this.pos.y = height+Math.random()*100;
            _this.alpha = 0.1+Math.random()*0.3;
            _this.scale = 0.1+Math.random()*0.3;
            _this.velocity = Math.random();
        }

        this.draw = function() {
            if(_this.alpha <= 0) {
                init();
            }
            _this.pos.y -= _this.velocity;
            _this.alpha -= 0.00005;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(255,255,255,'+ _this.alpha+')';
            ctx.fill();
        };
    }

})();
	
});