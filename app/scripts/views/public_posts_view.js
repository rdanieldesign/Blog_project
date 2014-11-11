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
      console.log(this.collection);
      _.each(this.collection.models, function(p) {
        console.log(p);
        self.$el.append(self.template(p.toJSON()));
      })


    }
  });



}());
