(function () {
  App.Views.EditPost = Parse.View.extend({

    tagName: 'form',
    className: 'createForm',

    events: {
      'click #publish': 'editPost'
    },

    template: _.template($('#editPost').html()),

    initialize: function (options) {

      console.log(this.options.post);

      this.options = options;

      this.render();
      $(".container").html(this.$el);

    },

    render: function () {
      var self = this;

      $(".container").empty();

      this.$el.html(this.template(this.options.post.toJSON()));

      // var myPost_query = new Parse.Query(App.Models.Post);
      // myPost_query.equalTo('objectId', this.options.objectId);
      // myPost_query.find({
      //   success: function(post){
      //     // _.each(posts, function(p) {
      //       self.$el.html(self.template(post[0].toJSON()));
      //     // });
      //   }
      // });

    },

    editPost: function(e){
      e.preventDefault();

      var newP = this.options.post;

      newP.set({
        title: $('#title').val(),
        copy: $('#copy').val(),
        published: true
      });

      newP.save(null, {
        success: function () {
          // App.posts.add(newP);
          App.router.navigate('me', { trigger: true });
        }
      });
    }

  });

}());