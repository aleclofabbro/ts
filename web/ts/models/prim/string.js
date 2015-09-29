define(function() {
  return function(model, opts) {
    var _model = model
      .map(function(val) {

        return String(val);
      });
    return _model;
  };
});