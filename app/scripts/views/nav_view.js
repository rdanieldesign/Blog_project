(function () {

  App.Views.Nav = Parse.View.extend({

    tagName: 'nav',

    events: {
      'click #navLogin': 'logOut'
    },

    template: _.template($('#nav').html()),

    initialize: function (options) {
      this.render();

      console.log(this.options.user);

      // this.options.user.on("change", this.render);
      // this.listenTo('sync', this.render, this);

      $("#nav_container").html(this.$el);
    },

    render: function () {

      this.$el.html(this.template);

    },

    logOut: function(e){

      // Nav Login Switch
      e.preventDefault();

      Parse.User.logOut();

      App.router.navigate('login', {trigger: true});

      // Change Nav Text
      App.updateUser = function(){

        if(App.user !== null){
          $('#navLogin').text('Logout');
        }
        else {
          $('#navLogin').text('Login');
        }

      };

      App.updateUser();

    }

  });

}());
