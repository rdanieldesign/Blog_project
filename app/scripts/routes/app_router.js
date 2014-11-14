(function () {
  App.Routers.AppRouter = Parse.Router.extend ({

    routes: {
      '': 'home',
      'login': 'Login',
      'create': 'createPost',
      'me': 'myPosts',
      'edit/:objectId': 'editPost',
      'single/:objectId': 'singlePost',
      'author/:userId' : 'goToAuthor',
      'category/:category': 'goToCategory'
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
    },

    singlePost: function(objectId){
      var singleP = App.posts.get(objectId);
      var postAuthor = singleP.attributes.user;
      new App.Views.SinglePost({post: singleP, user: postAuthor, collection: App.posts});
    },

    goToAuthor: function(userId){
      var query = new Parse.Query('User');
      query.equalTo('objectId', userId);
      query.find({
        success: function(user){
          new App.Views.MyPosts({user: user[0]});
        }
      });
    },

    goToCategory: function(category){
      new App.Views.Category({category: category});
    }

  });



}());
