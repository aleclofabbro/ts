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

      configs.forEach(function(e) {
        conf_select.append($('<option value="' + e.name + '">' + e.description + '</option>'));
      });


      conf_select.select2({
        placeholder: "Select a state",
        allowClear: true
      });


      var user = Bacon.$.textFieldValue(user_inp);
      var pass = Bacon.$.textFieldValue(pass_inp);
      var conf = Bacon.$.selectValue(conf_select);

      var loginInfo = Bacon.combineTemplate({
        user: user,
        pass: pass,
        conf: conf
      }).toProperty();

      loginInfo.onValue(function(obj) {
        var can_login = !(obj.user && obj.pass);
        submit.attr('disabled', can_login);
      });

      submit.click(login_fn, loginInfo.get());

      return {
        elem: elem
      };
    };
  });