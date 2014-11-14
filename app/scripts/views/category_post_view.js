(function () {
  App.Views.Category = Parse.View.extend({

    tagName: 'ul',
    className: 'myPosts',

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