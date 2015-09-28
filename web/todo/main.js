define([
    'jquery',
    'ramda',
    'bacon.model',
    './row',
    './res/todos',
    'tpl!./main.html'
  ],
  function($, R, Bacon, row_ctl, todos, main_templ) {
    return function() {
      var elem = main_templ.clone();

      var list = Bacon.Model([]);

      var refreshList = R.composeP(list.set, todos.all);
      var insertTodo = R.composeP(refreshList, todos.ins);
      var delTodo = R.composeP(refreshList, todos.del);

      elem.on('del-todo', function(ev, todo) {
        delTodo(todo._id);
      });

      var promptAdd = function() {
        var txt = prompt('testo?');
        if (!txt)
          return;
        insertTodo({
          text: txt
        });
      };

      elem
        .find('.add-button').first()
        .click(promptAdd);

      var row_cont = elem.find('.todo-list').first();

      var row_ctls = [];
      list.onValue(function(rows) {
        row_ctls
          .splice(rows.length)
          .forEach(function(_ctrl) {
            _ctrl.then(function(ctl) {
              ctl.release();
              ctl.elem.remove();
            });
          });

        row_ctls = rows
          .map(function(e, i) {
            var _ctrl = row_ctls[i];
            if (!_ctrl) {
              _ctrl = row_ctl(list.lens('' + i));
              _ctrl.then(function(ctl) {
                row_cont.append(ctl.elem);
              });
            }
            return _ctrl;
          });

      });

      refreshList();

      return {
        refreshList: refreshList,
        insertTodo: insertTodo,
        delTodo: delTodo,
        promptAdd: promptAdd,
        list: list,
        elem: elem
      };
    };
  });