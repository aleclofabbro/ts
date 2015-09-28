define([
    'jquery',
    'ramda',
    'bacon',
    'tpl!./panel.html',
    'bacon.jquery',
    'select2'
  ],
  function($, R, Bacon, panel_templ, dom_model) {
    return function(configs, login_fn) {
      var elem = panel_templ.clone();


      var submit = elem.find('.submit');

      var conf_select = elem.find('.conf');
      var user_inp = elem.find('.user');
      var pass_inp = elem.find('.pass');

      // configs.forEach(function(e) {
      //   conf_select.append($('<option value="' + e.name + '">' + e.description + '</option>'));
      // });


      var select_conf = {
        results: configs.map(function(c) {
          return {
            id: c.name,
            text: c.description
          };
        })
      };
      conf_select.select2({
        allowClear: true,
        placeholder: "Select a config",
        data: select_conf
      });


      var user = Bacon.$.textFieldValue(user_inp);
      var pass = Bacon.$.textFieldValue(pass_inp);
      // var conf = Bacon.$.selectValue(conf_select);
      var conf = Bacon.fromEvent(conf_select, 'change').map('.val');

      var loginInfo = Bacon.combineTemplate({
        user: user,
        pass: pass,
        conf: conf
      });

      var cant_login = loginInfo.map(function(obj) {
        return !(obj.user && obj.pass && obj.conf);
      });

      submit.clickE().log('CLICK');
      cant_login.onValue(submit, 'attr', 'disabled');


      return {
        elem: elem
      };
    };
  });