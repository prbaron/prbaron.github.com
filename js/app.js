window.addEventListener('load', function () {
    FastClick.attach(document.body);
}, false);

// Navbar and dropdowns
var toggle    = document.getElementsByClassName('navbar-toggle')[0],
    collapse  = document.getElementsByClassName('navbar-collapse')[0],
    dropdowns = document.getElementsByClassName('dropdown');

// Toggle if navbar menu is open or closed
function toggleMenu() {
    toggle.classList.toggle('collapsed');
    collapse.classList.toggle('collapse');
    collapse.classList.toggle('in');
}

// Close all dropdown menus
function closeMenus() {
    for (var j = 0; j < dropdowns.length; j++) {
        dropdowns[j].getElementsByClassName('dropdown-toggle')[0].classList.remove('dropdown-open');
        dropdowns[j].classList.remove('open');
    }
}

// Add click handling to dropdowns
for (var i = 0; i < dropdowns.length; i++) {
    dropdowns[i].addEventListener('click', function () {
        if (document.body.clientWidth < 768) {
            closeMenus();
            this.getElementsByClassName('dropdown-toggle')[0].classList.toggle('dropdown-open');
                this.classList.toggle('open');
        }
    });
}

toggle.addEventListener('click', toggleMenu, false);