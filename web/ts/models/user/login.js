define(['bacon.model'],
  function(Bacon) {
    return function() {
      return new Bacon.Model.combine({
        user: new Bacon.Model('.'),
        pass: new Bacon.Model('..'),
        conf: new Bacon.Model('...')
      });
    };
  });