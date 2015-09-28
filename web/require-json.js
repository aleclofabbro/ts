define('json', ['jquery'], function($) {
  "use strict";

  return {
    loadElem: function(url, cb) {
      $.ajax({
          type: 'GET',
          url: url,
          dataType: 'json'
        })
        .then(cb);
    },
    load: function(name, parentRequire, onload, config) {
      var url = parentRequire.toUrl(name);
      this.loadElem(url + '.json', onload);
    }
  };
});