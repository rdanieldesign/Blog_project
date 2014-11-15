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

      $("#nav_container").html(this.$el);

      this.updateUser();

    },

    render: function () {

      this.$el.html(this.template);

    },

    // Change Nav Text
    updateUser: function(){

      App.user = Parse.User.current();

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

      this.updateUser();

      this.initialize();

      App.router.navigate('login', {trigger: true});

      // this.updateUser();

    }

  });

}());
