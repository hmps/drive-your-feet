/*global jQuery */
/*jshint multistr:true browser:true */
/*!
* FitVids 1.0
*
* Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
* Date: Thu Sept 01 18:00:00 2011 -0500
*/

(function( $ ){

  "use strict";

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null
    };

    var div = document.createElement('div'),
        ref = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0];

    div.className = 'fit-vids-style';
    div.innerHTML = '&shy;<style>         \
      .fluid-width-video-wrapper {        \
         width: 100%;                     \
         position: relative;              \
         padding: 0;                      \
      }                                   \
                                          \
      .fluid-width-video-wrapper iframe,  \
      .fluid-width-video-wrapper object,  \
      .fluid-width-video-wrapper embed {  \
         position: absolute;              \
         top: 0;                          \
         left: 0;                         \
         width: 100%;                     \
         height: 100%;                    \
      }                                   \
    </style>';

    ref.parentNode.insertBefore(div,ref);

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='youtube.com']",
        "iframe[src*='youtube-nocookie.com']",
        "iframe[src*='kickstarter.com']",
        "object",
        "embed"
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var $allVideos = $(this).find(selectors.join(','));

      $allVideos.each(function(){
        var $this = $(this);
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + Math.floor(Math.random()*999999);
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
})( jQuery );

/* **********************************************
     Begin scripts.js
********************************************** */

//@codekit-prepend "fitvids"

(function() {

// SETUP BACKBONE
	window.App = {
		Models: {},
		Collections: {},
		Views: {},
		Router: {}
	};

	window.vent = _.extend({}, Backbone.Events);

	window.template = function(id) {
		return _.template( $('#' + id).html() );
	};

	$('#filter-nav a').on('click', function() {
		$('#filter-nav .active').removeClass('active');
		$(this).addClass('active');
	});

// OTHER JS
	$('#fitThis').fitVids();

})();

//@codekit-append "common/models.js"
//@codekit-append "common/collections.js"
//@codekit-append "front/views.js"
//@codekit-append "front/router.js"

/* **********************************************
     Begin models.js
********************************************** */

App.Models.Position = Backbone.Model.extend({
	urlRoot: '/position'
});

App.Models.Drill = Backbone.Model.extend({
	urlRoot: '/drill'
});

App.Models.Session = Backbone.Model.extend({});

App.Models.User = Backbone.Model.extend({});

/* **********************************************
     Begin collections.js
********************************************** */

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

/* **********************************************
     Begin views.js
********************************************** */

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

/* **********************************************
     Begin router.js
********************************************** */

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