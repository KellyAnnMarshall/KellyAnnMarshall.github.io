var scrollTriggers = document.querySelectorAll('.scroll');

[].forEach.call(scrollTriggers, (trigger) => {
    trigger.addEventListener('click', (e) => {
        var target = document.getElementById(e.currentTarget.dataset.hook + '_target')
        target.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
    })
})

document.querySelector('[data-hook="contact"]').addEventListener('click', (e) => {
    document.querySelector('.footer').scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
    setTimeout(() => {
        document.querySelector('input[name="name"]').focus();
    }, 2000)
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