var require = {
  shim: {
    "bootstrap": {
      "deps": ['jquery']
    },
    "select2": {
      "deps": ['jquery']
    }
  },
  packages: [{
    name: 'qix',
    location: '/lib/qix/src',
    main: 'qix'
  }],
  paths: {
    "bluebird": "/lib/bluebird/js/browser/bluebird.min",
    "json": "/require-json",
    "select2": "/lib/select2/dist/js/select2", //.min",
    "bootstrap": "/lib/bootstrap/dist/js/bootstrap", //.min",
    "validate": "/lib/validate/validate", //.min",
    "bacon": "/lib/bacon/dist/Bacon", //.min",
    "bacon.model": "/lib/bacon.model/dist/bacon.model", //.min",
    "bacon.jquery": "/lib/bacon.jquery/dist/bacon.jquery", //.min",
    "bacon.matchers": "/lib/bacon.matchers/bacon.matchers",
    "ramda": "/lib/ramda/dist/ramda", //.min",
    "jquery": "/lib/jquery/dist/jquery" //.min"
  }
};