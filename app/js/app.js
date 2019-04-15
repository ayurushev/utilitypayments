var app = angular.module('app', ['ui.router', 'ngMaterial', 'ngMessages', 'ngAnimate', 'templates']);

app.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', '$mdDateLocaleProvider', '$mdThemingProvider', function($httpProvider, $stateProvider, $urlRouterProvider, $mdDateLocaleProvider, $mdThemingProvider) {
	$httpProvider.interceptors.push('HttpInterceptor');

	$stateProvider.state('payments', {
		url: '/',
		params: {
			// any month by default
			month: {
         value: -1,
         dynamic: true
      }
		},
		protected: true,
		templateUrl: 'partials/payments.html',
		controller: 'PaymentsController',
		resolve: {
			'': ['$q', 'Payments', function($q, Payments) {
				return $q.when(Payments.get(), function() {
					return $q.promise;
				}, function(error) {
					console.error('Payments.resolve error', error);
					return $q.reject(error);
				});
			}]
		}
	}).state('payments.detail', {
		url: '?{id}',
		protected: true,
		views: {
			'toolbar@': {
				templateUrl: 'partials/payment.toolbar.html',
				controller: 'PaymentToolbarController'
			},
			'': {
				templateUrl: 'partials/payment.html',
				controller: 'PaymentController'
			}
		},
		resolve: {
			'': ['$q', '$stateParams', '$mdDialog', 'Payment', function($q, $stateParams, $mdDialog, Payment) {
				return $q.when(Payment.get($stateParams.id), function() {
					return $q.promise;
				}, function(error) {
					$mdDialog.show($mdDialog.alert({
						title: 'Ошибка',
						textContent: error,
						ok: 'Ok'
					}));
					return $q.reject(error);
				});
			}]
		}
	});
	$urlRouterProvider.otherwise('/');

	$mdDateLocaleProvider.firstDayOfWeek = 1;
  $mdDateLocaleProvider.formatDate = function(date) {
    return moment(date).format('YYYY-MM-DD');
  }
  $mdDateLocaleProvider.parseDate = function(dateString) {
    var m = moment(dateString, 'YYYY-MM-DD', true);
    return m.isValid() ? m.toDate() : new Date(NaN);
  }

	$mdThemingProvider.theme('default', 'default').primaryPalette('blue');
	$mdThemingProvider.theme('yellow-dark', 'default').primaryPalette('yellow').dark();
}]);

app.run(['$rootScope', '$state', '$transitions', '$mdDialog', 'Session', function($rootScope, $state, $transitions, $mdDialog, Session) {
	let loginShown = false;

	$transitions.onBefore({}, function(transition) {
		$rootScope.$state = $state;
		$rootScope.$transition = {
			to: {
				state: transition.to(),
				params: transition.params('to')
			}
		};

	  if (transition.to().protected) {
			if (!Session.isAuthenticated()) {
				if (loginShown) {
					// don't reopen login dialog if it already showing in case of nested states
					// (multiple api requests with 403 status)
					return;
				}
				$mdDialog.show({
	      	templateUrl: 'partials/login.html',
					controller: 'LoginController',
	      	targetEvent: event,
					onShowing: function() {
						loginShown = true;
					},
					onRemoving: function() {
						loginShown = false;
					}
	    	}).then(function(result) {
					if (result.loggedIn === true) {
						// continue transition
						transition.run();
					}
				}, function() {
				});
				// 'pause' transition
				return false;
			}
	  }
  });
}]);
