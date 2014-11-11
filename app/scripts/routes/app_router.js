(function () {
  App.Routers.AppRouter = Parse.Router.extend ({

    routes: {
      '': 'home',
      'login': 'Login'
    },

    home: function() {

      new App.Views.PublicPosts({ collection: App.posts});
    },

    Login: function () {
      new App.Views.Login();
    }
  });



}());
