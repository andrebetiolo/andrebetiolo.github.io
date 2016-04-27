var arquivosOffLine = [
  '/',
	//CSS
  '/bower_components/materialize/dist/css/materialize.min.css',
  '/bower_components/materialize/dist/css/materialize.min.css',
  //IMG
  '/img/eucatur.jpg',
  '/img/dia-do-bit.jpg',
	'/css/style.css',
	//JS
	'/js/pushbots-chrome.js',
	'/bower_components/angular/angular.min.js',
	'/bower_components/angular-route/angular-route.min.js',
	'/bower_components/jquery/dist/jquery.min.js',
	'/bower_components/materialize/dist/js/materialize.min.js',
	'/bower_components/trianglify/dist/trianglify.min.js',
	'/js/app.js'
];

var versao = 'v0';

self.addEventListener('install', function installer(event){
  event.waitUntil(
    caches
      .open(versao)
      .then(function prefill(cache){
        cache.addAll(arquivosOffLine);
      })
  );
});

self.addEventListener('activate', function activator(event){
  event.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys
        .filter(function(key){
          return key.indexOf(versao)!== 0;
        })
        .map(function(key){
          console.log('Deleta a key', key);
          return caches.delete(key);
        })
      );
    })
  );
});
