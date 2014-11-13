(function () {

  App.Views.Login = Parse.View.extend({

    events: {
      'submit #signUp': 'newUser',
      'submit #logIn': 'logIn'
    },

    template: _.template($('#logInForm').html()),

    initialize: function () {
        console.log('hey');
      this.render();
      $(".container").html(this.$el);
    },

    render: function () {

      this.$el.html(this.template);

    },

    newUser: function(e){

      e.preventDefault();

      var newUser = new Parse.User({
        username: $('#newUsername').val(),
        password: $('#newPassword').val(),
        name: $('#fullname').val()
      });

      var l = $('#newUsername').val();
      var p = $('#newPassword').val();

      newUser.signUp(null, {
        success: function(){
          Parse.User.logIn(l, p, {
            success: function (user) {
              App.user = user;
              App.router.navigate('#/', {trigger: true});
            },
            error: function (user) {
              alert("Sign in better.");
            }
          });
        }
      });

    },

    logIn: function(e){

      e.preventDefault();

      var l = $('#username').val();
      var p = $('#password').val();

      Parse.User.logIn(l, p, {
        success: function (user) {
          App.user = user;
          App.router.navigate('', {trigger: true});
        },
        error: function (user) {
          alert("Sign in better.");
        }
      });

    }

  });

}());
