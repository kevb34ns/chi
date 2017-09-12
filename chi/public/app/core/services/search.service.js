angular.module('app')
.factory('APIService', ['$http', 'CacheService', 
  function($http, CacheService) {

    /**
     * Saves an array of dictionary entry objects to local storage. 
     * @param {Object[]} entries An array of dictionary objects.
     */
    function cacheEntries(entries) {
    
    }

    return {
      /**
       * Returns an array of results for the specified query.
       * @param {String} query The query to search the database for.
       * @return an array of objects, each of which represents a entry.
       */
      search: function(query) {
        // TODO you must find a way to point this url to a constant address, otherwise it won't work on any machine except localhost
        return $http.get("http://localhost:3000/api/search/" + query)
          .then(
            function(response) {
              return response.data;
            }
          )
      },
      
      /**
       * Returns an array with all the entries for a specified term.
       * @param {String} term The term to retrieve entries for.
       * @return an array of objects, each of which represents an entry.
       */
      getTerm: function(term) {
        console.log("http://localhost:3000/api/term/" + term);
        return $http.get("http://localhost:3000/api/term/" + term)
          .then(
            function(response) {
              return response.data;
            }
          )
      },

      /**
       * Returns a radical object for the specified kangXi number
       * @param {String} kangXi The KangXi radical number, as a string.
       * @return {traditional: String, simplified: String, variants: [String]}
       */
      getRadical: function(kangXi) {
        return $http.get("http://localhost:3000/api/radical/" + kangXi)
          .then(function(response) {
            return response.data;
          })
      }
    }
  }
]);