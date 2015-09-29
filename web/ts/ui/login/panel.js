define([
    'ts/models/user/login',
    'jquery',
    'ramda',
    'bacon',
    'qix!./panel.html',
    'bacon.jquery',
    'select2'
  ],
  function(loginModel, $, R, Bacon, panel_templ, dom_model) {
    return function(done, par_elem, opts, ctx, def) {
      var elem = $(panel_templ.clone());
      $(par_elem).append(elem)
      var configs = opts.login_conf;
      var submit = elem.find('.submit');

      var conf_select = elem.find('[data-model="userLogin.conf"]');
      // var conf_select = elem.find('.conf');
      // var user_inp = elem.find('.user');
      // var pass_inp = elem.find('.pass');

      // configs.forEach(function(e) {
      //   conf_select.append($('<option value="' + e.name + '">' + e.description + '</option>'));
      // });


      var select_conf =
        /* {
                results: */
        configs.map(function(c) {
          return {
            id: c.name,
            text: c.description
          };
        })
        // };
      conf_select.select2({
        allowClear: true,
        placeholder: "Select a config",
        data: select_conf
      });

      var loginInfo = loginModel();

      // var user = Bacon.$.textFieldValue(user_inp);
      // var pass = Bacon.$.textFieldValue(pass_inp);
      // var conf = Bacon.$.selectValue(conf_select);

      // var loginInfo = Bacon.combineTemplate({
      //   user: user,
      //   pass: pass,
      //   conf: conf
      // });

      var cant_login = loginInfo.map(function(obj) {
        return !(obj.user && obj.pass && obj.conf);
      });

      submit.clickE().log('CLICK');
      cant_login.onValue(submit, 'attr', 'disabled');

      done({
        fn: alert.bind(window),
        elem: elem
      });
    };
  });