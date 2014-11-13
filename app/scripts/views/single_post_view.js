(function () {
  App.Views.SinglePost = Parse.View.extend({


    events: {
      'click #publish': 'editPost'
    },

    template: _.template($('#singlePost').html()),

    initialize: function (options) {

      this.options = options;

      this.render();
      $(".container").html(this.$el);

    },

    render: function () {
      var self = this;

      $(".container").empty();

      this.$el.html(this.template(this.options.post.toJSON()));

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
