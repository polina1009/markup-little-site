window.addEventListener('load', function(){
    $('.main__product-cont').slick({
            autoplay: true,
            autoplaySpeed: 2000,
            speed: 1500
        });
});

var opened = false;

function dropMenu() {
	var menu = document.getElementById("mob-menu");
	var langMenu = document.getElementById("lang-menu");
	if(opened) {
        menu.style.display = "none";
        langMenu.style.display = "none";
        opened = false;
	} else {
        menu.style.display = "block";
        langMenu.style.display = "block";
        opened = true;
	}




}