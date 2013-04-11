<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>SFN Academy - Övning</title>
		<link rel="stylesheet" type="text/css" href="/css/style.css">
	</head>
	<body>
		<?php echo $single_drill_id; ?>
		<div class="drills" id="drills"></div>

	<!-- TEMPLATES -->

	<script type="text/template" id="drillTemplate">
		<div class="drill-content">
			<a href="http://img.youtube.com/vi/<%=video%>/mqdefault.jpg">
				<img src="http://img.youtube.com/vi/<%=video%>/mqdefault.jpg" alt="">
				<h3><span><%=label%></span>: <%= title %></h3>
			</a>
		</div>
	</script>

		<!-- <iframe width="420" height="315" src="http://www.youtube.com/embed/<%= video %>" frameborder="0" allowfullscreen></iframe> -->
	<!-- /TEMPLATES -->

		<script src="/javascript/vendor/underscore-min.js"></script>
		<script src="/javascript/vendor/jquery-min.js"></script>
		<script src="/javascript/vendor/backbone-min.js"></script>
		<script src="/javascript/scripts-ck.js"></script>

		<script>
			new App.Router;
			Backbone.history.start();
			var pathArray = window.location.pathname.split( '/' );
			console.log(pathArray[pathArray.length-1]);
		</script>
	</body>
</html>