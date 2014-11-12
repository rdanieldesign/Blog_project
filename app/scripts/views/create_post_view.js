(function () {
  App.Views.CreatePost = Parse.View.extend({

    tagName: 'form',
    className: 'createForm',

    events: {
      'click #publish': 'createPost'
    },

    template: _.template($('#createPost').html()),

    initialize: function () {

      this.render();
      $(".container").html(this.$el);
      
    },

    render: function () {
      var self = this;

      $(".container").empty();

      this.$el.html(this.template());

    },

    createPost: function(e){
      e.preventDefault();

      var p = new App.Models.Post({
        title: $('#title').val(),
        copy: $('#copy').val(),
        published: true,
        user: App.user
      });

      // Set Access Control List
      p.setACL(new Parse.ACL(App.user));

      p.save(null, {
        success: function () {
          App.posts.add(p);
          App.router.navigate('', { trigger: true });
        }
      });
    }

  });

}());
