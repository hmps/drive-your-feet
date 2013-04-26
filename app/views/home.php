<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>SFN Academy - Coaches</title>
		<link rel="stylesheet" type="text/css" href="css/style.css">
		<link rel="stylesheet" type="text/css" href="css/joyride-2.0.3.css">
	</head>
	<body>

		<section class="message">
			<a href="https://github.com/hampuspersson/drive-your-feet" id="joyride-help" title="Drive your feet på Github">Hjälp oss göra SFN Academy Online bättre!</a>
			<a href="#" class="help-btn btn btn--small" onClick="javascript:$('#tour-list').joyride();">Guide</a>
		</section>
		<div class="grid">
			<div class="grid__item one-sixth portable-one-whole">
				<header class="site-header"><a href="/" title="Tillbaka till första sidan"><img id="site-logo" src="/images/sfn_logo.png" alt="SAFEs logo"></a></header>
				<nav role="navigation">
					<h3 id="joyride-filter">FILTER</h3>
					<ul class="filter-nav" id="filter-nav">
						<li><a href="#/" class="active">Alla</a></li>
						<!-- <li><a href="#/favs/">Favoriter</a></li> -->
						<?php foreach( $positions as $position ): ?>
						<li><a href="#/tag/<?php echo $position['label']; ?>/"><?php echo $position['fullname']; ?></a></li>
						<?php endforeach; ?>
					</ul>
				</nav>
				<nav>
					<h3>SENASTE</h3>
					<ul class="latest-nav" id="latest-nav"></ul>
				</nav>
			</div>
			<div class="grid__item five-sixths portable-one-whole">
				<section class="add-video" id="add-video"></section>
				<section id="main-content" role="main"></section>
			</div>
		</div>
		<ol id="tour-list" class="tour-list">
		  <li data-id="site-logo" data-button="Lägg till video">
		  	<h3>Välkommen!</h3>
		  	<p>Vi hoppas att SFN Academy ska bli en resurs för alla som sysslar med amerikansk fotboll i Sverige. Denna sida är ett litet steg mot vad vi tror kan bli en samling resurser som gör ditt coachande enklare, roligare och bättre!</p>
		  </li>
		  <li data-id="video-url" data-button="Filtrera videos">
		  	<h3>Lägg till nya videos</h3>
		  	<p>Bara klistra in en Youtube-adress och tryck på enter...</p>
		  </li>
		  <li data-id="joyride-filter" data-button="Titta på videos">
		  	<h3>Filtrera</h3>
		  	<p>Välj en kategori här nedan så filtrerar vi vårt bibliotek direkt!</p>
		  </li>
		  <li data-class="drill-content" data-button="Hjälp till...">
		  	<h3>Titta</h3>
		  	<p>Det är inte svårare än att klicka på en video i listan!</p>
		  </li>
		  <li data-id="joyride-help" data-button="OK - Kör igång!">
		  	<h3>Hjälp till</h3>
		  	<p>Vi behöver hjälp att utveckla SFN Academy. Klicka på länken så kommer du till en sida där du kan läsa mer!</p>
		  </li>
		</ol>

	<!-- TEMPLATES -->

	<script type="text/template" id="drillTemplate">
		<div class="drill-content" >
			<a href="/#/<%=id%>/">
				<img src="http://img.youtube.com/vi/<%=video%>/mqdefault.jpg" alt="">
			</a>
		</div>
	</script>

	<script type="text/template" id="singleDrillTemplate">
		<div class="single-drill-content">
			<h2><%= title %></h2>
			<ul class="nav tag-list">
				<li><span class="pill uppercase"><%=fullname%></span></li>
			</ul>
			<div id="fitThis"><iframe width="940" height="529" src="http://www.youtube.com/embed/<%= video %>" frameborder="0" allowfullscreen></iframe></div>
			<p><%= description %></p>
		</div>
	</script>


	<script type="text/template" id="addVideoTemplate">
		<div id="fitThis"><iframe src="http://www.youtube.com/embed/<%= id %>" frameborder="0" allowfullscreen></iframe></div>
		<input type="hidden" name="video-url" id="video-url" value="<%= id %>">
		<label for="video-title">Titel</label>
		<input type="text" id="video-title" name="video-title" placeholder="Titel">
		<label for="video-pos">Kategori</label>
		<select name="video-pos" id="video-pos">
			<% _.each(positions, function(obj) { %>
			<option value="<%= obj.get('id') %>"><%= obj.get('fullname') %></option>
			<% }); %>
		</select>
		<label for="video-desc">Beskrivning</label>
		<textarea name="video-desc" id="video-desc" cols="30" rows="5"></textarea>
		<input type="submit" id="video-submit" class="btn btn--large btn--positive" value="Lägg till video">
		<div class="loading-bar" id="loading-bar"><img src="/images/loading-bar.gif" alt="Loading..."></div>
	</script>

	<!-- /TEMPLATES -->

		<script> window.bootstrap_pos = <?php echo json_encode($positions); ?>;	</script>
		<script src="javascript/vendor/underscore-min.js"></script>
		<script src="javascript/vendor/jquery-min.js"></script>
		<script src="javascript/vendor/backbone-min.js"></script>
		<script src="javascript/vendor/jquery.joyride-2.0.3.js"></script>
		<script src="javascript/scripts-ck.js"></script>

		<script>
			new App.Router;
			Backbone.history.start();
		</script>
	</body>
</html>