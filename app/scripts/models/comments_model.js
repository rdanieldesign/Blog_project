(function () {

  App.Models.Comment = Parse.Object.extend({

    className: 'Comment',

    idAttribute: 'objectId',

    defaults: {
      commentText: '',
      user: '',
      author: ''
    }

  });


}());
