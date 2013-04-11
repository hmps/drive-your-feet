<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>SFN Academy - Övningsbibliotek</title>
		<link rel="stylesheet" type="text/css" href="css/style.css">
	</head>
	<body>
		<div class="grid">
			<div class="grid__item one-sixth portable-one-whole">
				<header class="site-header"><a href="/" title="Tillbaka till första sidan"><img src="/images/sfn_logo.png" alt="SAFEs logo"></a></header>
				<nav role="navigation">
					<h3>FILTER</h3>
					<ul class="filter-nav" id="filter-nav">
						<li><a href="#/" class="active">Alla</a></li>
						<!-- <li><a href="#/favs/">Favoriter</a></li> -->
						<?php foreach( $positions as $position ): ?>
						<li><a href="#/tag/<?php echo $position['label']; ?>/"><?php echo $position['full_name']; ?></a></li>
						<?php endforeach; ?>
					</ul>
				</nav>
				<nav>
					<h3>SENASTE</h3>
					<ul class="latest-nav" id="latest-nav"></ul>
				</nav>
			</div>
			<div class="grid__item five-sixths portable-one-whole">
				<section id="main-content" role="main"></section>
			</div>
		</div>

	<!-- TEMPLATES -->

	<script type="text/template" id="drillTemplate">
		<div class="drill-content" >
			<a href="/#/<%=id%>/">
				<img src="http://img.youtube.com/vi/<%=video%>/mqdefault.jpg" alt="">
				<!--<h3><span><%=label%></span>: <%= title %></h3>-->
			</a>
		</div>
	</script>

	<script type="text/template" id="singleDrillTemplate">
		<div class="single-drill-content">
			<h2><%= title %></h2>
			<ul class="nav tag-list">
				<li><span class="pill uppercase"><%=full_name%></span></li>
			</ul>
			<div id="fitThis"><iframe width="940" height="529" src="http://www.youtube.com/embed/<%= video %>" frameborder="0" allowfullscreen></iframe></div>
			<p><%= description %></p>
		</div>
	</script>


	<!-- /TEMPLATES -->

		<script> window.bootstrap_pos = <?php echo json_encode($positions); ?>;	</script>
		<script src="javascript/vendor/underscore-min.js"></script>
		<script src="javascript/vendor/jquery-min.js"></script>
		<script src="javascript/vendor/backbone-min.js"></script>
		<script src="javascript/scripts-ck.js"></script>

		<script>
			new App.Router;
			Backbone.history.start();
		</script>
	</body>
</html>