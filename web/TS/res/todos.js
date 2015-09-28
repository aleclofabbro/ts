define(['mylib'],
  function(mylib) {
    var coll = 'todos';

    return {
      get: mylib.resource.get(coll),
      del: mylib.resource.del.bind(null, coll),
      all: mylib.resource.all.bind(null, coll),
      ins: mylib.resource.ins(coll)
    };
  });