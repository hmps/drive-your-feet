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