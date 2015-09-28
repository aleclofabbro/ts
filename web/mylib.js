define([
    'ramda',
    'jquery'
  ],
  function(R, $) {

    var resource_get = R.curry(function(collection, _id) {
      return $.ajax({
        url: '/_/' + collection + '/' + _id,
        type: 'GET',
        contentType: "application/json"
      });
    });

    var resource_get_all = function(collection) {
      return $.ajax({
        url: '/_/' + collection,
        type: 'GET',
        contentType: "application/json"
      });
    };

    var resource_ins = R.curry(function(collection, data) {
      return $.ajax({
        url: '/_/' + collection,
        type: 'POST',
        contentType: "application/json",
        data: typeof data === 'object' ? JSON.stringify(data) : data
      });
    });

    var resource_del = R.curry(function(collection, id) {
      return $.ajax({
        url: '/_/' + collection + '/' + id,
        type: 'DELETE',
        contentType: "application/json"
      });
    });

    return {
      resource: {
        get: resource_get,
        ins: resource_ins,
        all: resource_get_all,
        del: resource_del
      }
    };
  });