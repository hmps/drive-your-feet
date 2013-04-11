/*-------------------------------------------------------------------------
| GLOBAL COLLECTIONS
|------------------------------------------------------------------------*/
App.Collections.Positions = Backbone.Collection.extend({
	model: App.Models.Position,
	url: '/position',
});

App.Collections.Drills = Backbone.Collection.extend({
	model: App.Models.Drill,
	url: '/drill',
});

App.Collections.Users = Backbone.Collection.extend({
	model: App.Models.User,
	url: '/user',

	// Secure the password with HASH
	authenticate: function (user, password) {
		user = this.where( {email: user} );
		if( user.length > 0 && password == user[0].get('password') ) {
			vent.trigger('admin:login', user);
		} else {
			console.log('Felaktiga användaruppgifter');
		}
	},
});