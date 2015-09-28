define([
    'bacon.model',
    'jquery',
    'bacon.jquery'
  ],
  function(Bacon) {
    function dom_array(model, elem, row_constr, splice) {
      var dom_rows = Bacon.Model([]);

      model.onValue(function(rows) {
        var _ctrls = dom_rows.get();

        _ctrls
          .splice(rows.length)
          .forEach(function(_ctrl) {
            $.when(_ctrl)
              .then(splice)
              .then(function(ctl) {
                ctl.release();
                ctl.elem.remove();
              });
          });

        var ctls = rows
          .map(function(e, i) {
            var _ctrl = _ctrls[i];
            if (_ctrls.length <= i) {
              var _new_ctrl = row_constr(model.lens('' + i), i);
              return $.when(_new_ctrl)
                .then(function(ctl) {
                  elem.append(ctl.elem);
                  return ctl;
                });
            } else
              return _ctrl;
          });

        dom_rows.set(ctls);
      });
      return dom_rows;
    }
    return {
      dom_array: dom_array
    };
  });