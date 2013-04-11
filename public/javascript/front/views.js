/*-------------------------------------------------------------------------
| VIEWS FOR GRIFFINS WORK DB
|------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------
| Home APP VIEW
|------------------------------------------------------------------------*/
App.Views.Home = Backbone.View.extend({
	initialize: function () {
			vent.on('recent:newItem', this.newRecent, this);

			//var filterView = new App.Views.Filters({ collection: App.positions }).render();
			var mainView = new App.Views.Main();
			var listView = new App.Views.Drills({ collection: App.drills }).render();
			var singleView = new App.Views.SingleDrill();
			$('#main-content').html( listView.el );
	},

	newRecent: function ( drill ) {
		if( 5 <= $('#latest-nav li').length ) {
			$('#latest-nav > li:last-child').remove();
		}
		$('#latest-nav').prepend('<li><a href="/#/' + drill.get('id') + '/">' + drill.get('title') + '</a></li>');
	},
});

/*-------------------------------------------------------------------------
| MAIN VIEW
|------------------------------------------------------------------------*/

App.Views.Main = Backbone.View.extend({
	el: '#main-content',
});
/*-------------------------------------------------------------------------
| VIEW CONTAINING ALL DRILLS
|------------------------------------------------------------------------*/
App.Views.Drills = Backbone.View.extend({
	tagName: 'ul',
	className: 'drill-list',

	initialize: function () {
		vent.on('filter:setFilter', this.setFilter, this);
	},

	render: function () {
		this.collection.each( function(drill) {
			this.addOne(drill);
		}, this);
		return this;
	},

	addOne: function (drill) {
		var drillView = new App.Views.Drill({ model: drill }).render();
		this.$el.append(drillView.el);
	},

	setFilter: function () {
		this.$el.html('');
		if ( 0 < this.collection.length ) {
			this.collection.each( function(drill) {
				this.addOne(drill);
			}, this);
		} else {
			this.$el.append('Inga videos i denna kategori ännu...');
		}
		$('#main-content').html( this.el );
	},
});

/*-------------------------------------------------------------------------
| VIEW CONTAINING EACH INDIVIDUAL DRILL
|------------------------------------------------------------------------*/
App.Views.Drill = Backbone.View.extend({
	tagName: 'li',
	template: template('drillTemplate'),

	render: function () {
		this.$el.html( this.template( this.model.toJSON()) );
		return this;
	},
});


/*-------------------------------------------------------------------------
| FILTERS VIEW
|------------------------------------------------------------------------*/

App.Views.Filters = Backbone.View.extend({
	el: '#filter-nav',
	tagName: 'li',

	render: function () {
		this.collection.each(function(pos) {
			this.addOne(pos);
		}, this);
	},

	addOne: function (pos) {
		this.$el.append( '<li><a href="#/tag/">' + pos.get('full_name') + '</a></li>' );
	},
});

/*-------------------------------------------------------------------------
| SINGLE VIEW
|------------------------------------------------------------------------*/

App.Views.SingleDrill = Backbone.View.extend({
	tagName: 'section',
	className: 'single-drill',
	template: template('singleDrillTemplate'),

	initialize: function () {
		//this.render();
		vent.on('filter:showSingle', this.render, this);
	},

	render: function () {
		this.model = App.drill;
		this.$el.html( this.template( this.model.toJSON() ) );
		$('#main-content').html( this.el );
		this.renderTags(this.model.get('tags'));
		vent.trigger('recent:newItem', this.model);
		return this;
	},

	renderTags: function (tags) {
		console.log(tags);
	},
});