define([
    'jquery',
    'ramda',
    'bacon.model',
    './row',
    './res/todos',
    'tpl!./main.html',
    'common/dom-model'
  ],
  function($, R, Bacon, row_ctl, todos, main_templ, dom_model) {
    return function() {
      var elem = main_templ.clone();

      var list = Bacon.Model([]);

      var refreshList = R.composeP(list.set, todos.all);
      var insertTodo = R.composeP(refreshList, todos.ins);
      var delTodo = R.composeP(refreshList, todos.del);

      elem.on('del-todo', function(ev, todo) {
        delTodo(todo._id)
          .fail(alert.bind(window, 'AH!!' + txt));
      });

      var promptAdd = function() {
        var txt = prompt('testo?');
        if (!txt)
          return;
        insertTodo({
            text: txt
          })
          .fail(alert.bind(window, 'AH!!' + txt));
      };

      elem
        .find('.add-button').first()
        .click(promptAdd);

      var row_cont = elem.find('.todo-list').first();

      var ctrls = dom_model.dom_array(list, row_cont, row_ctl);

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