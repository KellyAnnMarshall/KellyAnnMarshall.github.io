var scrollTriggers = document.querySelectorAll('.scroll');
var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var scrollBehavior = reducedMotion ? "auto" : "smooth";

[].forEach.call(scrollTriggers, (trigger) => {
    trigger.addEventListener('click', (e) => {
        var target = document.getElementById(e.currentTarget.dataset.hook + '_target')
        target.scrollIntoView({ behavior: scrollBehavior, block: "start", inline: "nearest" })
    })
})

document.querySelector('[data-hook="contact"]').addEventListener('click', (e) => {
    document.querySelector('.footer').scrollIntoView({ behavior: scrollBehavior, block: "start", inline: "nearest" })
    setTimeout(() => {
        document.querySelector('input[name="name"]').focus();
    }, 2000)
})


var contactFormMarkup = `
<form method="POST" action="https://formspree.io/kelly_ann_marshall@yahoo.com">
<input type="hidden" name="_subject" value="Your enquiry to Kelly Ann Marshall" />
<label for="name">Name* <span class="required-flag">This field is required</span><input id="name" autocomplete="name" type="text" name="name" required></label>
<label for="_replyto">Email* <span class="required-flag">This field is required</span><input id="_replyto" autocomplete="email" type="email" name="_replyto" required></label>
<label for="phone">Phone <input id="phone" autocomplete="tel-national" type="tel" name="phone"></label>
<label for="message">Message* <span class="required-flag">This field is required</span><textarea id="message" name="message" required></textarea></label>
<input type="hidden" name="_next" value="https://kellyannmarshall.github.io" />
<input type="text" name="_gotcha" style="display:none" autocomplete="nope" />
<button type="submit">Send</button>
</form>`;

document.querySelector('.form_container').innerHTML = contactFormMarkup;

var menuToggle = document.getElementById("switch");
var navigation = document.querySelector('.off_canvas_navigation');

function setNavigationOpen(isOpen) {
    menuToggle.classList.toggle('active', isOpen);
    document.querySelector('.page_wrapper').classList.toggle('offset', isOpen);
    navigation.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    navigation.setAttribute('aria-hidden', String(!isOpen));
    navigation.toggleAttribute('inert', !isOpen);
}

menuToggle.addEventListener('click', () => {
    setNavigationOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
})

navigation.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        setNavigationOpen(false);
        menuToggle.focus();
    }
})