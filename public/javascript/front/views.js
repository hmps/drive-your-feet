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
			//var mainView = new App.Views.Main();
			var listView = new App.Views.Drills({ collection: App.drills }).render();
			var addView = new App.Views.AddVideo({ collection: App.drills }).render();
			var singleView = new App.Views.SingleDrill();
			$('#add-video').html( addView.el );
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
| ADD VIDEO VIEW
|------------------------------------------------------------------------*/

App.Views.AddVideo = Backbone.View.extend({
	tagName: 'form',
	template: '<input type="url" id="video-url" placeholder="Länk till Youtube-video">',

	events: {
		'submit': 'addVideo'
	},

	initialize: function () {
		console.log(this.collection);
	},

	render: function () {
		this.$el.html( this.template );
		return this;
	},

	parse_link: function (link) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = link.match(regExp);
    if ( match && 11 === match[7].length ) {
        return match[7];
    } else {
        console.log('Felaktig URL');
    }
	},

	addVideo: function (e) {
		e.preventDefault();
		var videoId = this.parse_link( $('#video-url', this.el).val() );
		var detailsView = new App.Views.VideoDetails({ collection: this.collection, data: {'video': videoId}}).render();
		$('#main-content').html( detailsView.el );
		$('#video-title').focus();
		this.clearForm();

	},

	clearForm: function () {
		$(':input', this.el)
			.not(':button, :submit, :reset, :hidden')
			.val('')
			.removeAttr('checked')
			.removeAttr('selected');
	},

});


App.Views.VideoDetails = Backbone.View.extend({
	tagName: 'form',
	className: 'video-details',
	id: 'video-details',
	template: template('addVideoTemplate'),

	events: {
		'submit': 'addVideo'
	},

	render: function () {
		console.log(this.collection);
		this.$el.html( this.template({'id': this.options.data.video, 'positions': App.positions.models}));
		return this;
	},

	addVideo: function (e) {
		e.preventDefault();
		if( ! $('#video-url', this.el).val().length ||
				! $('#video-title', this.el).val().length ||
				! $('#video-desc', this.el).val().length ) {
			alert(' Du måste fylla i alla fälten');
		} else {
			this.collection.create({
				position_id: 		$('#video-pos option:selected', this.el).val(),
				title: 					$('#video-title', this.el).val(),
				description: 		$('#video-desc', this.el).val(),
				video: 					$('#video-url', this.el).val()
			}, {wait:true});
			console.log('created');
			console.log(this.collection);
		}
	},
});

/*-------------------------------------------------------------------------
| VIEW CONTAINING ALL DRILLS
|------------------------------------------------------------------------*/
App.Views.Drills = Backbone.View.extend({
	tagName: 'ul',
	className: 'drill-list',

	initialize: function () {
		vent.on('filter:setFilter', this.setFilter, this);
		this.collection.on('add', this.show, this);
	},

	render: function () {
		this.collection.each( function(drill) {
			this.addOne(drill, false);
		}, this);
		return this;
	},

	show: function () {
		console.log(this.collection);
		this.addOne(this)
		//var drillView = new App.Views.Drill({ model: this.collection.models[0] }).render();
		// this.$el.prepend(drillView.el);
		$('#main-content').html(this.el);
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