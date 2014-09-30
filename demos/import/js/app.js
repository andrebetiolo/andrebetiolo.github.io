window.onload = function(){
	var link = document.querySelector('link[href="views/header.html"]');
	var header = link.import.querySelector('header');

	var content = document.querySelector('.main');

	content.appendChild(header);
};