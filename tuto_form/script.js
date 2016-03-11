var UserTracker = new Backbone.Marionette.Application();

var User = Backbone.Model.extend({});
var Users = Backbone.Collection.extend({
    model: User,
});

var UserView = Backbone.Marionette.ItemView.extend({
    template: "#userView"
});

var NoUsersView = Backbone.Marionette.ItemView.extend({
    template: "#noUsersView"
});

var UsersView = Backbone.Marionette.CollectionView.extend({
    childView: UserView,
    emptyView: NoUsersView,
});

var FormView = Backbone.Marionette.ItemView.extend({
    template: "#formView",
    events: {
        'click button': 'createNewUser',
    },

    ui: {
        name: '#name',
        age: '#age',
    },

    createNewUser: function(){
        this.collection.add({
            name: this.ui.name.val(),
            age: this.ui.age.val(),
        });
        this.ui.name.val("");
        this.ui.age.val("");
    },
});

UserTracker.addRegions({
    form: '#form',
    list: "#list",
});

UserTracker.addInitializer(function(){
    this.users = new Users();

    //form and list ==> property add in UserTracker.addRegions
    this.form.show(new FormView({collection: this.users}));
    this.list.show(new UsersView({collection: this.users}));
});

UserTracker.start();
