define([
    'tpl!./todo-row.html'
  ],
  function(row_tpl) {
    // var cnt = 0;
    return function(todo) {
      // var _c = ++cnt;
      var def = $.Deferred();

      setTimeout(function() {
        var todo_elem = row_tpl.clone();

        var txt_span = todo_elem
          .find('span.todo-text');

        var _unsub = todo
          .map('.text')
          // .doLog(_c)
          .assign(txt_span, 'text');

        var delTodo = function() {
          todo_elem.trigger('del-todo', todo.get());
        };

        todo_elem
          .find('i.todo-del.btn').first()
          .click(delTodo);

        def.resolve({
          elem: todo_elem,
          release: function() {
            // console.log('destroyed:' + _c);
            _unsub();
          }
        });
      }, 1000);

      return def.promise();
    };
  });