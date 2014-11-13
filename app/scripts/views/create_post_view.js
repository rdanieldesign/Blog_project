(function () {
  App.Views.CreatePost = Parse.View.extend({

    tagName: 'form',
    className: 'createForm',

    events: {
      'click #publish': 'createPost',
      'click #draft' : 'draftPost'
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
      var postACL = new Parse.ACL(App.user);
      postACL.setPublicReadAccess(true);
      p.setACL(postACL);

      p.save(null, {
        success: function () {
          App.posts.add(p);
          App.router.navigate('', { trigger: true });
        }
      });
    },

    draftPost: function(e){
      e.preventDefault();

      var p = new App.Models.Post({
        title: $('#title').val(),
        copy: $('#copy').val(),
        published: false,
        user: App.user
      });

      // Set Access Control List
      var postACL = new Parse.ACL(App.user);
      postACL.setPublicReadAccess(true);
      p.setACL(postACL);

      p.save(null, {
        success: function () {
          App.posts.add(p);
          App.router.navigate('', { trigger: true });
        }
      });
    }


  });

}());
