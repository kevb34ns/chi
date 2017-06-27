angular.module('app')
.factory('SearchService', ['$http', function($http) {
	return {
		/**
		 * Returns an array of results for the specified query.
		 * @param searchTerm The term to query the database for.
		 * @return an array of objects, each of which represents a term.
		 */
		search: function(searchTerm) {
			return $http.get("http://localhost:3000/api/search/" + searchTerm)
        .then(
				  function(response) {
				  	return response.data;
				  }
			  )
		}
	}
}]);