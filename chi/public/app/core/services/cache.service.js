angular.module('app')
.factory('CacheService', function(){

  let SIMPLIFIED_KEY = 'isSimplified'
  
  var CACHE_SIZE = 100;

  // async function getEntryCache() {
  //   var raw = localStorage.getItem("entryCache");
  //   var array = null;

  //   if (typeof(Storage) !== 'undefined') {
  //     try {
  //       array = JSON.parse(raw);
  //       if (!isArray(array)) {
  //         throw new SyntaxError('entryCache in localStorage is not an array');
  //       }
  //     } catch (e) {
  //       array = null;
  //     }
  //   }

  //   return array;
  // } TODO

  var entryCache;
  // getEntryCache().then(array => {
  //   entryCache = array;
  // }) TODO
  /** TODO
   * 1. asynchronously get entries array of objects using JSON.parse from localStorage
   * 2. set a hardcoded limit of entries in the array like 100 for now, to limit
   *    runtime. In the future, could expand this by implementing more efficient
   *    search.
   * 3. use FIFO to remove entries from the array using Array.prototype.splice()
   *    to remove objects from the front as needed (or another more efficient
   *    way to pop objects off the front).  
   * 
   * TODO caching entries
   * 1. in SearchService, when new entries are received, call a method in CacheService
   *    to add it to the entryCache. If the entry exists in the cache already,
   *    don't add it again (or remove the old one?)
   * 2. when you receive a getEntry() request go through the cache and look for it,
   *    and return null if you don't have it
   * 3. May consider differentiating between getting a term and searching a query
   *    on the mongo backend, so the definition page can just request a term
   *    while the search page can request queries
   */
  
  // TODO refactor into a utility class/service perhaps
  function isArray(obj) {
    if (Array.isArray) {
      return Array.isArray(obj);
    } else {
      return Object.prototype.toString.call(obj) === '[object Array]';
    }
  }

  return {
    /**
     * Checks if the user has set a preference for Simplified/Traditional
     * script.
     * @return {Boolean} true if the user prefers Simplified, script, false if
     * 				 the user prefers Traditional script, and true if the preference
     * 				 was not set (defaults to Simplified).
     */
    isSimplified: function() {
      var simplifiedCheck = true;
      if (typeof(Storage) !== 'undefined') {
        var val = localStorage.getItem(SIMPLIFIED_KEY);
        if (val === 'false') {
          simplifiedCheck = false;
        }
      }

      return simplifiedCheck;
    },

    setSimplified: (isSimplified) => {
      if (typeof(Storage) !== 'undefined') {
        localStorage.setItem(SIMPLIFIED_KEY, isSimplified)
      }
    },

    saveEntries: function(newEntries) {
      if (isArray(newEntries) && newEntries.length > 0) {
        /** TODO Issue: what if entryCache is still asynchronously updating
         * when this method wants to save new entries?
         */
      }
    },

    getEntry: function(term) {
      if (!entryCache || entryCache.length === 0) {
        return null;
      }

      var results = [];
      entryCache.forEach(function(element) {
        if (element.simplified === term || element.traditional === term) {
          results.push(element);
        }
      });

      if (results.length === 0) {
        return null;
      }
      else {
        return results;
      }
    }
  };
});