var select = document.getElementById('blendMode');

select.onchange = function (e) {
    var selectedValue = e.target.value;
    var items = document.querySelectorAll('.item');
    items.forEach(function (item) {
        item.style.backgroundBlendMode = selectedValue;
    });
}

var items = document.querySelectorAll('.item');

items.forEach(function (item) {
    item.onclick = function () {
        var audio = item.getElementsByTagName('audio')[0];
        audio.play();
    }
});

