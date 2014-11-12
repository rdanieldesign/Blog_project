(function () {
  App.Routers.AppRouter = Parse.Router.extend ({

    routes: {
      '': 'home',
      'login': 'Login',
      'create': 'createPost'
    },

    home: function() {

      new App.Views.PublicPosts({ collection: App.posts});
    },

    Login: function () {
      new App.Views.Login();
    },

    createPost: function(){
      new App.Views.CreatePost();
    }

  });



}());
