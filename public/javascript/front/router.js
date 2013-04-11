/*-------------------------------------------------------------------------
| FRONT ROUTER
|------------------------------------------------------------------------*/
App.Router = Backbone.Router.extend({
	routes: {
		'': 'index',
		'favs(/)': 'favs',
		':id(/)': 'single',
		'tag/:id(/)': 'tag'
	},

	initalize: function () {
		if( typeof App.drills == 'undefined' ) {
			App.drills = new App.Collections.Drills();

			App.drills.fetch().then(function() {
				new App.Views.Home( { collection: App.drills } );
			});
		}

		if( typeof App.positions == 'undefined' ) {
			App.positions = new App.Collections.Positions();
			App.positions.reset(window.bootstrap_pos);
		}
	},

	index: function() {
		this.initalize();
		App.drills.fetch().then(function() {
			vent.trigger('filter:setFilter');
		});
	},

	single: function (drill_id) {
		this.initalize();
		App.drill = new App.Models.Drill({id:drill_id});
		App.drill.fetch({ id: drill_id }).then(function() {
			vent.trigger('filter:showSingle');
		});
	},

	tag: function (tag_label) {
		this.initalize();
		var tag_id = App.positions.where( {'label': tag_label} );
		App.drills.fetch({ data: { tag: tag_id[0].id } } ).then(function() {
			vent.trigger('filter:setFilter');
		});
	},

	favs: function () {
		console.log('favs');
	},
});