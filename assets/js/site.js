//site global js functions
function toggleMenu() {
	menu = document.getElementById("main-menu")
	menu.classList.toggle('toggle-visible')
}

var inits = []
window.onload = function () {
	/* initialize all javascript after loading the DOM */
	var i;
	for (i = 0; i < inits.length; i++) {
		inits[i]();
	}
};

/* simple collapsible implementation */
inits.push(function () {
	var coll = document.getElementsByClassName("collapsible");
	var i;
	for (i = 0; i < coll.length; i++) {
		coll[i].addEventListener("click", function () {
			this.classList.toggle("collapsible-closed");
			var content = this.nextElementSibling;
			content.classList.toggle('toggle-visible')
		});
	}
});
