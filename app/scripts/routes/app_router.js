(function () {
  App.Routers.AppRouter = Parse.Router.extend ({

    routes: {
      '': 'home'
    },

    home: function() {

      new App.Views.PublicPosts({ collection: App.posts});
    }
  });



}());
