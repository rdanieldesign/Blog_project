(function () {
  App.Models.Post = Parse.Object.extend({
    className: 'Post',

    idAttribute: 'objectId',

    defaults: {
      title: '',
      copy: '',
      published: false
    },

    initialize: function () {
     console.log('added');
    }
  })



}());
