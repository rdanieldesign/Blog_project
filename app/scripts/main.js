Parse.initialize("HsaC3RscbvbKWk7xWi6PdBbYJg3462oeRRYbIPkh", "li6QV1nKGUuXRpYR4Yj2OzFFDxlxgU2Og9foEf8Q");

(function () {

  App.posts = new App.Collections.Posts();
  App.comments = new App.Collections.Comments();

  App.user = Parse.User.current();

  new App.Views.Nav({user: App.user});

  App.posts.fetch().done(function () {
    App.comments.fetch().done(function(){
      App.router = new App.Routers.AppRouter();
      Parse.history.start();
    });
  });

  // // Nav Login Switch
  // $('#navLogin').on('click', function(e){
  //
  //   e.preventDefault();
  //
  //   // $('#navLogin').text('Login');
  //
  //   Parse.User.logOut();
  //
  //   App.updateUser();
  //
  //   App.router.navigate('login', {trigger: true});
  //
  // });
  //
  // // Change Nav Text
  // App.updateUser = function(){
  //
  //   App.user = Parse.User.current();
  //
  //   if(App.user !== null){
  //     $('#navLogin').text('Logout');
  //   }
  //
  // };
  //
  // App.updateUser();


}());
