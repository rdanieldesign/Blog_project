(function () {
  App.Models.Post = Parse.Object.extend({
    className: 'Post',

    idAttribute: 'objectId',

    defaults: {
      title: '',
      copy: '',
      categories: '',
      user: '',
      published: false
    },

    initialize: function () {
     console.log('added');
    }
  })



}());
