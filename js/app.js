if ('serviceWorker' in navigator){
  navigator.serviceWorker.register('/js/service-worker-cache.js').then(function() {
    console.log('CLIENT: service worker registration complete.');
  },function(err){
    console.log('CLIENT: service worker registration failure.', err);
  });
}

function salvaEventoNoAnalytics(categoria, acao, label){
	categoria = categoria || 'evento';
	acao = acao || 'acao';
	label = label || 'label';
	ga('send', 'event', categoria, acao, label);
}

var app = angular.module('app', ['ngRoute']);

function loadScript(path){
  return new Promise(function(resolve, reject){
    var script = document.createElement("script");
    script.async = "async";
    script.type = "text/javascript";
    path = verificaSePrecisaAdicionarVersaoNaUrl(path);
    script.src = path;
    script.onload = script.onreadystatechange = function (_, isAbort) {
      if (!script.readyState || /loaded|complete/.test(script.readyState)) {
        if (isAbort)
          reject(Error("Erro ao fazer o download do javascript"));
        else
          resolve();
      }
    };
    script.onerror = function () {reject();};
    document.querySelector("head").appendChild(script);
  });
}

function loader(arrayName){
	return {
      load: function(){
				return new Promise(function(resolve, reject){
  				var map = arrayName.map(function(name) {
  					if(name.match('class/')){
  						return loadScript('./js/'+name+".js");
  					}

  					if(name.match('service/')){
  						return loadScript(name+".js");
  					}

  					return loadScript('js/controllers/'+name+".js");
  				});

  				Promise.all(map).then(function(r){
  					resolve();
  				});

				});
		}
	};
}

app.config(['$routeProvider', '$controllerProvider', '$httpProvider', '$locationProvider', '$compileProvider', function($routeProvider, $controllerProvider, $httpProvider, $locationProvider, $compileProvider){
  $locationProvider.html5Mode(true);
  $compileProvider.debugInfoEnabled(false);
}]);

app.run(function($http, $location, $rootScope, $q){
  window.$http = $http;
  window.$q = $q;
  window.$location = $location;
});

app.directive('whenReady', ['$interpolate', function($interpolate) {
  return {
    restrict: 'A',
    priority: Number.MIN_SAFE_INTEGER, // execute last, after all other directives if any.
    link: function($scope, $element, $attributes) {
      var expressions = $attributes.whenReady.split(';');
      var waitForInterpolation = false;
      var hasReadyCheckExpression = false;

      function evalExpressions(expressions) {
        expressions.forEach(function(expression) {
          $scope.$eval(expression);
        });
      }

      if ($attributes.whenReady.trim().length === 0) { return; }

    if ($attributes.waitForInterpolation && $scope.$eval($attributes.waitForInterpolation)) {
        waitForInterpolation = true;
    }

      if ($attributes.readyCheck) {
        hasReadyCheckExpression = true;
      }

      if (waitForInterpolation || hasReadyCheckExpression) {
        requestAnimationFrame(function checkIfReady() {
          var isInterpolated = false;
          var isReadyCheckTrue = false;

          if (waitForInterpolation && $element.text().indexOf($interpolate.startSymbol()) >= 0) { // if the text still has {{placeholders}}
            isInterpolated = false;
          }
          else {
            isInterpolated = true;
          }

          if (hasReadyCheckExpression && !$scope.$eval($attributes.readyCheck)) { // if the ready check expression returns false
            isReadyCheckTrue = false;
          }
          else {
            isReadyCheckTrue = true;
          }

          if (isInterpolated && isReadyCheckTrue) { evalExpressions(expressions); }
          else { requestAnimationFrame(checkIfReady); }

        });
      }
      else {
        evalExpressions(expressions);
      }
    }
  };
}]);

window.onload = function(){
	//Adicionar o fundo de triangulos
  var pattern = Trianglify({
    width: window.innerWidth,
    height: window.innerHeight
  });

  document.body.style.backgroundImage = "url('"+pattern.png()+"')";
};

app.controller('MainCtrl',function($scope){

	$scope.sites = [
		{nome:"Eucatur", link:"https://www.eucatur.com.br", img:"eucatur.jpg"},
		{nome:"Dia do bit", link:"http://www.diadobit.com.br", img:"dia-do-bit.jpg"}
	];

	/*$q.all(
		$scope.sites.map(function(site){
			return $http.get('http://images.shrinktheweb.com/xino.php?stwembed=1&stwaccesskeyid=233abcc6b38ea7c&stwsize=xlg&stwurl=' + site.link);
		})
	).then(function(imagens){
		console.log(imagens);
	});*/

});
