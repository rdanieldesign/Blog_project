Parse.initialize("HsaC3RscbvbKWk7xWi6PdBbYJg3462oeRRYbIPkh", "li6QV1nKGUuXRpYR4Yj2OzFFDxlxgU2Og9foEf8Q");

    (function () {
      App.user = Parse.User.current();

      App.posts = new App.Collections.Posts();

      App.posts.fetch().done(function () {
        App.router = new App.Routers.AppRouter();
          Parse.history.start();
      });



    }());
