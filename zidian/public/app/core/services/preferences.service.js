angular.module('app')
.factory('PreferencesService', function(){
	var simplifiedCheck = true;
	if (typeof(Storage) !== 'undefined') {
		var val = localStorage.getItem("isSimplified");
		if (val === 'false') {
			simplifiedCheck = false;
		}
	}

	return {
		isSimplified: simplifiedCheck
	};
});