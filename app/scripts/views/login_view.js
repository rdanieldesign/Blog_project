(function () {
  App.Views.Login = Parse.View.extend({

    events: {},

    template: _.template($('#logInForm').html()),

    initialize: function () {
        console.log('hey');
      this.render();
      $(".container").html(this.$el);
    },

    render: function () {

      this.$el.html(this.template);

    }
  });



}());
