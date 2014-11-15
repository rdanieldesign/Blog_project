(function () {

  App.Views.Nav = Parse.View.extend({

    tagName: 'nav',

    events: {
      'click #navLogin': 'logOut'
    },

    template: _.template($('#nav').html()),

    initialize: function (options) {

      this.options = options;

      this.render();

      $(".wrapper").prepend(this.$el);

      this.updateUser();

    },

    render: function () {

      this.$el.html(this.template);

    },

    // Change Nav Text
    updateUser: function(){

      if(App.user !== null){
        $('#navLogin').text('Logout');
      }
      else {
        $('#navLogin').text('Login');
      }

    },

    logOut: function(e){

      var current = this.options;

      $('#navLogin').text('Login');

      Parse.User.logOut();

      this.initialize();

      App.router.navigate('login', {trigger: true});

      this.updateUser();

    }

  });

}());
