(function () {
  App.Views.PublicPosts = Parse.View.extend({

    tagName: 'ul',
    className: 'allPosts',

    events: {
      'click #navigate': 'goToLogin',
      'click #logOut': 'logOut'
    },

    template: _.template($('#postsList').html()),

    initialize: function (options) {
      this.options = options;

      this.render();
      $(".container").html(this.$el);
    },

    render: function () {
      var self = this;

      _.each(this.collection.models, function(p) {
        self.$el.append(self.template(p.toJSON()));
      })

    },

    goToLogin: function(e) {
      e.preventDefault();
      App.router.navigate('login', {trigger: true});
    },

    logOut: function(e){
      e.preventDefault();
      Parse.User.logOut();
      App.user = null;
      App.router.navigate('login', {trigger: true});
    }

  });



}());
