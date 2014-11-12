(function () {
  App.Routers.AppRouter = Parse.Router.extend ({

    routes: {
      '': 'home',
      'login': 'Login',
      'create': 'createPost',
      'me': 'myPosts',
      'edit/:objectId': 'editPost'
    },

    home: function() {

      new App.Views.PublicPosts({ collection: App.posts});
    },

    Login: function () {
      new App.Views.Login();
    },

    createPost: function(){
      new App.Views.CreatePost();
    },

    myPosts: function(){
      new App.Views.MyPosts({user: App.user});
    },

    editPost: function(objectId){
      var newP = App.posts.get(objectId);
      new App.Views.EditPost({objectId: objectId, post: newP});
    }

  });



}());
