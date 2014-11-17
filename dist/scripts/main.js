(function () {
  App.Models.Post = Parse.Object.extend({
    className: 'Post',

    idAttribute: 'objectId',

    defaults: {
      title: '',
      copy: '',
      category: '',
      user: '',
      author: '',
      published: false
    },

    initialize: function () {}

  })

}());

(function () {

  App.Models.Comment = Parse.Object.extend({

    className: 'Comment',

    idAttribute: 'objectId',

    defaults: {
      commentText: '',
      user: '',
      author: ''
    }

  });


}());

(function () {
  App.Collections.Posts = Parse.Collection.extend({

    model: App.Models.Post

  });

}());

(function () {

  App.Collections.Comments = Parse.Collection.extend({

    model: App.Models.Comment

  });



}());

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
      new App.Views.Nav({user: App.user});
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
      new App.Views.SinglePost({post: singleP, user: postAuthor, collection: App.posts, comments: App.comments});
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

(function () {

  App.Views.Login = Parse.View.extend({

    events: {
      'submit #signUp': 'newUser',
      'submit #logIn': 'logIn'
    },

    template: _.template($('#logInForm').html()),

    initialize: function () {
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
          $('#navLogin').text('Logout');
          App.router.navigate('', {trigger: true});
        },
        error: function (user) {
          alert("Sign in better.");
        }
      });

    }

  });

}());

(function () {
  App.Views.PublicPosts = Parse.View.extend({

    tagName: 'ul',
    className: 'allPosts',

    events: {},

    template: _.template($('#postsList').html()),

    initialize: function (options) {
      this.options = options;

      this.render();
      $(".container").html(this.$el);
    },

    render: function () {
      var self = this;


      var myPost_query = new Parse.Query(App.Models.Post);
      myPost_query.equalTo('published', true);
      myPost_query.descending("updatedAt");
      myPost_query.find({
        success: function(posts){
        _.each(posts, function(p) {
              self.$el.append(self.template(p.toJSON()));
          });
        }
      });

    }

  });

}());

(function () {
  App.Views.CreatePost = Parse.View.extend({

    tagName: 'form',
    className: 'createForm',

    events: {
      'click #publish': 'createPost',
      'click #draft' : 'draftPost'
    },

    template: _.template($('#createPost').html()),

    initialize: function () {

      this.render();
      $(".container").html(this.$el);

    },

    render: function () {
      var self = this;

      $(".container").empty();

      this.$el.html(this.template());

    },

    createPost: function(e){
      e.preventDefault();

      if($('#title').val() === ""){
        alert('Please create a title for your post.');
      }
      else if($('#copy').val() === ""){
        alert("Don't create a blank post.");
      }
      else if($('#categories option:selected').val() === ""){
        alert("Please select a category");
      }
      else{

        var p = new App.Models.Post({
          title: $('#title').val(),
          copy: $('#copy').val(),
          category: $('#categories option:selected').val(),
          published: true,
          user: App.user,
          author: App.user.attributes.name
        });

        // Set Access Control List
        var postACL = new Parse.ACL(App.user);
        postACL.setPublicReadAccess(true);
        p.setACL(postACL);

        p.save(null, {
          success: function () {
            App.posts.add(p);
            App.router.navigate('', { trigger: true });
          }
        });

      }

    },

    draftPost: function(e){
      e.preventDefault();

      if($('#title').val() === ""){
        alert('Please create a title for your post.');
      }
      else if($('#copy').val() === ""){
        alert("Don't create a blank post.");
      }
      else if($('#categories option:selected').val() === ""){
        alert("Please select a category");
      }
      else{

        var p = new App.Models.Post({
          title: $('#title').val(),
          copy: $('#copy').val(),
          category: $('#categories option:selected').val(),
          published: false,
          user: App.user,
          author: App.user.attributes.name
        });

        // Set Access Control List
        var postACL = new Parse.ACL(App.user);
        postACL.setPublicReadAccess(true);
        p.setACL(postACL);

        p.save(null, {
          success: function () {
            App.posts.add(p);
            App.router.navigate('', { trigger: true });
          }
        });
        
      }

    }


  });

}());

(function () {
  App.Views.SinglePost = Parse.View.extend({


    events: {
      'submit #addComment' : 'addComment'
    },

    template: _.template($('#singlePost').html()),

    initialize: function (options) {

      this.options = options;

      this.render();

      $(".container").html(this.$el);

    },

    render: function () {

      var self = this;

      $(".container").empty();

      this.$el.empty();

      this.$el.html(this.template(this.options.post.toJSON()));

      var commentTemplate = _.template($('#commentTemp').html());
      var comments_query = new Parse.Query(App.Models.Comment);
      comments_query.equalTo('parent', this.options.post);
      comments_query.descending("createdAt");

      this.$el.append('<ul class="comments"></ul>');

      comments_query.find({
        success: function (results) {

          _.each(results, function(comment) {
            $('ul.comments').append(commentTemplate(comment.toJSON()));
          })

        }
      })

    },

    addComment: function (e) {
      e.preventDefault();

      var self = this;
      var current = this.options;

      if($('#commentText').val() === ""){
        alert("Don't leave a blank comment");
      }
      else{

        var comment = new App.Models.Comment({

          commentText: $('#commentText').val(),
          parent: this.options.post,
          user: App.user,
          author: App.user.attributes.name

        });

        comment.save(null, {
          success: function(){
            App.posts.add(comment);
            App.comments.fetch().done(function(){
              new App.Views.SinglePost(current);
            });
          }
        });
      }

    }

  });

}());

(function () {
  App.Views.EditPost = Parse.View.extend({

    tagName: 'form',
    className: 'createForm',

    events: {
      'click #publish': 'editPost',
      'click #draft' : 'draftPost'
    },

    template: _.template($('#editPost').html()),

    initialize: function (options) {

      this.options = options;

      this.render();
      $(".container").html(this.$el);

    },

    render: function () {
      var self = this;

      $(".container").empty();

      this.$el.html(this.template(this.options.post.toJSON()));

    },

    editPost: function(e){
      e.preventDefault();

      if($('#title').val() === ""){
        alert('Please create a title for your post.');
      }
      else if($('#copy').val() === ""){
        alert("Don't create a blank post.");
      }
      else if($('#categories option:selected').val() === ""){
        alert("Please select a category");
      }
      else{

        this.options.post.set({
          title: $('#title').val(),
          copy: $('#copy').val(),
          category: $('#categories option:selected').val(),
          published: true,
          user: App.user
        });

        // Set Access Control List
        // var postACL = new Parse.ACL(App.user);
        // postACL.setPublicReadAccess(true);
        // p.setACL(postACL);

        this.options.post.save(null, {
          success: function () {
            App.router.navigate('', { trigger: true });
          }
        });
      }
    },


    draftPost: function(e){
      e.preventDefault();

      this.options.post.set({
        title: $('#title').val(),
        copy: $('#copy').val(),
        category: $('#categories option:selected').val(),
        published: false,
        user: App.user
      });

      // Set Access Control List
      // var postACL = new Parse.ACL(App.user);
      // postACL.setPublicReadAccess(true);
      // p.setACL(postACL);

      this.options.post.save(null, {
        success: function () {
          App.router.navigate('', { trigger: true });
        }
      });
    }


  });

}());

(function () {
  App.Views.MyPosts = Parse.View.extend({

    tagName: 'ul',
    className: 'allPosts',

    events: {},

    template: _.template($('#postsList').html()),

    initialize: function (options) {

      this.options = options;

      this.render();
      $(".container").html(this.$el);

    },

    render: function () {

      $(".container").html(this.$el);

      var self = this;

      var myPost_query = new Parse.Query(App.Models.Post);
      myPost_query.equalTo('user', this.options.user);
      myPost_query.descending("updatedAt");
      myPost_query.find({
        success: function(posts){
          _.each(posts, function(p) {
            self.$el.append(self.template(p.toJSON()));
          });
        }
      });

    }

  });

}());
(function () {
  App.Views.Category = Parse.View.extend({

    tagName: 'ul',
    className: 'allPosts',

    events: {},

    template: _.template($('#postsList').html()),

    initialize: function (options) {

      this.options = options;

      this.render();
      $(".container").html(this.$el);

    },

    render: function () {

      var self = this;

      var myPost_query = new Parse.Query(App.Models.Post);
      myPost_query.equalTo('category', this.options.category);
      myPost_query.descending("updatedAt");
      myPost_query.find({
        success: function(posts){
          _.each(posts, function(p) {
            self.$el.append(self.template(p.toJSON()));
          });
        }
      });

    }

  });

}());
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