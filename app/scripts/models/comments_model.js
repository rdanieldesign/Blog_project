(function () {

  App.Models.Comment = Parse.Object.extend({

    className: 'Comment',

    defaults: {
      commentText: ''
    }

  });


}());
