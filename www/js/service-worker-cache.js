var arquivosOffLine = [
  '/',
	'/js/pushbots-chrome.js',
	//CSS
	'/bower_components/materialize/dist/css/materialize.min.css',
	'/bower_components/angular-loading-bar/build/loading-bar.min.css',
	'/css/style.css',
	//JS
	'/bower_components/angular/angular.min.js',
	'/bower_components/angular-route/angular-route.min.js',
	'/bower_components/angular-messages/angular-messages.min.js',
	'/bower_components/angular-animate/angular-animate.min.js',
	'/bower_components/jquery/dist/jquery.min.js',
	'/bower_components/materialize/dist/js/materialize.min.js',
	'/bower_components/angular-loading-bar/build/loading-bar.min.js',
	'/bower_components/angular-mask/dist/ngMask.min.js',
	'/jquery-ui/jquery-ui.min.js',
	'/js/class/Cookie.js',
	'/js/class/Storage.js',
	'/js/class/Seccionamento.js',
	'/js/app.js',
	//views e partials
	'/partials/_consulta.html',
	'/partials/_carrinho-de-compras.html',
	'/partials/_descricao-endereco.html'
];

var versao = 'v3';

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
					console.log(key);
          console.log(key.indexOf(versao));
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
