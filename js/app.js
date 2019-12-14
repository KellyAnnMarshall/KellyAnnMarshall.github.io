var scrollTriggers = document.querySelectorAll('.scroll');

[].forEach.call(scrollTriggers, (trigger) => {
    trigger.addEventListener('click', (e) => {
        var target = document.getElementById(e.currentTarget.dataset.hook + '_target')
        target.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
    })
})

document.querySelector('[data-hook="contact"]').addEventListener('click', (e) => {
    document.querySelector('.animation').scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
    document.querySelector('input[name="name"]').focus();
})


var contactFormMarkup = `
<form method="POST" action="https://formspree.io/rocksteady_tnt@yahoo.com">
<input type="hidden" name="_subject" value="Your enquiry to Kelly Ann Marshall" />
<label for="name">Name* <span class="required-flag">This field is required</span><input autocomplete="name" type="text" name="name" required></label>
<label for="_replyto">Email* <span class="required-flag">This field is required</span><input autocomplete="email" type="email" name="_replyto" required></label>
<label for="phone">Phone <input autocomplete="tel-national" type="tel" name="phone"></label>
<label for="message">Message* <span class="required-flag">This field is required</span><textarea name="message" required></textarea></label>
<input type="hidden" name="_next" value="https://kellyannmarshall.github.io" />
<input type="text" name="_gotcha" style="display:none" autocomplete="nope" />
<button type="submit">Send</button>
</form>`;

document.querySelector('.form_container').innerHTML = contactFormMarkup;

document.getElementById("switch").addEventListener('click', (e) => {
    var page_container = document.querySelector('.page_wrapper');
    var off_canvas_navigation = document.querySelector('.off_canvas_navigation');
    (e.currentTarget.classList.contains('active') === true) ? e.currentTarget.classList.remove('active') : e.currentTarget.classList.add('active');
    (page_container.classList.contains("offset") === true) ? page_container.classList.remove('offset') : page_container.classList.add('offset');
    (off_canvas_navigation.classList.contains("active") === true) ? off_canvas_navigation.classList.remove('active') : off_canvas_navigation.classList.add('active');
})


    (function () {

        var width, height, largeHeader, canvas, ctx, circles, target, animateHeader = true;

        // Main
        initHeader();
        addListeners();

        function initHeader() {
            width = window.innerWidth;
            height = window.innerHeight;
            target = { x: 0, y: height };

            largeHeader = document.getElementById('animation');
            largeHeader.style.height = height + 'px';

            canvas = document.getElementById('canvas');
            canvas.width = width;
            canvas.height = height;
            ctx = canvas.getContext('2d');

            // create particles
            circles = [];
            for (var x = 0; x < width * 0.5; x++) {
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
            if (animateHeader) {
                ctx.clearRect(0, 0, width, height);
                for (var i in circles) {
                    circles[i].draw();
                }
            }
            requestAnimationFrame(animate);
        }

        // Canvas manipulation
        function Circle() {
            var _this = this;

            // constructor
            (function () {
                _this.pos = {};
                init();
            })();

            function init() {
                _this.pos.x = Math.random() * width;
                _this.pos.y = height + Math.random() * 100;
                _this.alpha = 0.1 + Math.random() * 0.3;
                _this.scale = 0.1 + Math.random() * 0.3;
                _this.velocity = Math.random();
            }

            this.draw = function () {
                if (_this.alpha <= 0) {
                    init();
                }
                _this.pos.y -= _this.velocity;
                _this.alpha -= 0.00005;
                ctx.beginPath();
                ctx.arc(_this.pos.x, _this.pos.y, _this.scale * 10, 0, 2 * Math.PI, false);
                ctx.fillStyle = 'rgba(255,255,255,' + _this.alpha + ')';
                ctx.fill();
            };
        }

    })();
