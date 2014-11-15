(function () {

  App.Views.Nav = Parse.View.extend({

    tagName: 'nav',

    events: {},

    template: _.template($('#nav').html()),

    initialize: function () {
      this.render();

      console.log(this);

      // this.listenTo(User, "change", this.render);
      // this.listenTo('sync', this.render, this);

      $(".wrapper").prepend(this.$el);
    },

    render: function () {

      this.$el.html(this.template);

    },

  });

}());
