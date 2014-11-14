(function () {
  App.Views.EditPost = Parse.View.extend({

    tagName: 'form',
    className: 'createForm',

    events: {
      'click #publish': 'editPost',
      'click #draft' : 'draftPost'
    },

    template: _.template($('#editPost').html()),

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

    this.options.post.set({
          title: $('#title').val(),
          copy: $('#copy').val(),
          category: $('#categories option:selected').val(),
          published: true,
          user: App.user
        });

        // Set Access Control List
        // var postACL = new Parse.ACL(App.user);
        // postACL.setPublicReadAccess(true);
        // p.setACL(postACL);

        this.options.post.save(null, {
          success: function () {
            App.router.navigate('', { trigger: true });
          }
        });
      },


    draftPost: function(e){
      e.preventDefault();

      this.options.post.set({
        title: $('#title').val(),
        copy: $('#copy').val(),
        category: $('#categories option:selected').val(),
        published: false,
        user: App.user
      });

      // Set Access Control List
      // var postACL = new Parse.ACL(App.user);
      // postACL.setPublicReadAccess(true);
      // p.setACL(postACL);

      this.options.post.save(null, {
        success: function () {
          App.router.navigate('', { trigger: true });
        }
      });
    }


  });

}());
