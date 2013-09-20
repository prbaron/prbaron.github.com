document.addEventListener("touchstart", function(){}, true);

window.onload = function windowLoad() {
    var prettify = false;
    var blocks = document.querySelectorAll('pre')
    for (var i = 0; i < blocks.length ; i++) {
        blocks[i].className += 'prettyprint linenums';
        prettify = true;
    }
    if (prettify) {
      prettyPrint();
    }
}