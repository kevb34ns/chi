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
        return $http.get("https://chidictionary.herokuapp.com/api/search/" + query)
          .then(
            function(response) {
              return response.data;
            }
          );
      },
      
      /**
       * Returns an array with all the entries for a specified term.
       * @param {String} term The term to retrieve entries for.
       * @return an array of objects, each of which represents an entry.
       */
      getTerm: function(term) {
        return $http.get("https://chidictionary.herokuapp.com/api/term/" + term)
          .then(
            function(response) {
              return response.data;
            }
          );
      },

      /**
       * Returns a radical object for the specified kangXi number
       * @param {String} kangXi The KangXi radical number, as a string.
       * @return {traditional: String, simplified: String, variants: [String]}
       */
      getRadical: function(kangXi) {
        return $http.get("https://chidictionary.herokuapp.com/api/radical/" + kangXi)
          .then(function(response) {
            return response.data;
          }
        );
      },

      /**
       * Returns a stroke order animation SVG
       * @param {String} charCode The character code of a Chinese word, which
       * can be obtained by calling String#charCodeAt(index), where index is
       * the index of the Chinese word in the string.
       * @return an SVG file
       */
      getSVG: function(charCode) {
        return $http.get("https://chidictionary.herokuapp.com/api/strokes/" + charCode)
          .then(function(response) {
            return response.data.svg;
          }
        );
      },

      getSentences: function(term) {
        return $http.get("https://chidictionary.herokuapp.com/api/sentences/" + term)
          .then(function(response) {
            return response.data;
          }
        );
      }
    }
  }
]);