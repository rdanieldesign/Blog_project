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

      this.$el.append('<h3>Comments</h3><ul class="comments"></ul>');

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

  });

}());
