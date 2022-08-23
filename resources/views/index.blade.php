<!DOCTYPE html>
<html lang="zxx">
	<head>
		<meta charset="utf-8">
		<title>Tawsilex - Votre solution pour envoyer vos colis partout au Maroc</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!-- General CSS Settings -->
		<link rel="stylesheet" href="css/general_style.css">
		<!-- Main Style of the template -->
		<link rel="stylesheet" href="css/main_style.css">
		<!-- Landing Page Style -->
		<link rel="stylesheet" href="css/reset_style.css">
		<!-- Awesomefont -->
		<link href="https://use.fontawesome.com/releases/v5.11.0/css/all.css" rel="stylesheet">
		<!-- Fav Icon -->
		<link rel="shortcut icon" href="favicon.ico">
	</head>
	<body>

		<!-- Wrapper -->
		<div class="lx-wrapper" id="lx-wrapper">
			<!-- Header -->
			<div class="lx-header">
				<div class="lx-header-bottom">
					<div class="lx-header-bottom-content">
						<div class="lx-header-logo">
							<a href="/"><img src="images/logo.png" /></a>
						</div>
						<div class="lx-menu-mobile">
							<a href="javascript:;"><i class="fa fa-bars"></i></a>
						</div>
						<div class="lx-header-menu">
							<ul>
								<li><a href="javascript:;" data-bloc="#lx-wrapper" class="active">Accueil</a></li>
								<li><a href="javascript:;" data-bloc="#lx-aboutus">Que somme nous?</a></li>
								<li><a href="javascript:;" data-bloc="#lx-howitworks">Comment ça marche?</a></li>
								<li><a href="javascript:;" data-bloc="#lx-services">Services</a></li>
								<li><a href="javascript:;" data-bloc="#lx-tarifs">Tarifs</a></li>
								<div class="lx-clear-fix"></div>
							</ul>
							<div class="lx-header-cta">
								<a href="javascript:;" data-bloc="#lx-signup">S'inscrire</a>
								<a href="{{route('login')}}" class="lx-signin">Connexion</a>
							</div>
							<div class="lx-clear-fix"></div>
						</div>
						<div class="lx-clear-fix"></div>
					</div>
				</div>
			</div>
			<div class="lx-sub-header">
				<div class="lx-sub-header-content">
					<p>Les solutions E-commerce de Tawsilex sont adaptées aux besoins de vos clients et à la taille de votre entreprise</p>
				</div>				
			</div>
			<!-- Main -->
			<div class="lx-main">
				<div class="lx-video-container">
					<video controls poster="poster.jpg" class="video-bg" id="video-bg">
						<source src="hero.mp4" type="video/mp4" alt="HTML5 background video">
					</video>
				</div>
				<!--<div class="lx-hero">
					<div class="lx-hero-item" data-url-bg="images/slide5.jpg">
						<div class="lx-hero-shadow lx-white"></div>
						<div class="lx-hero-text">
							<h2><span>Développez</span> votre service en toute confiance.</h2>
							<p>Grâce à notre plateforme, vous trouverez le moyen d'évoluer et de prospérer dans votre domaine d'activité.</p>
							<a href="signup.php">Rejoinez nous</a>
						</div>
					</div>
				</div>-->
				<div class="lx-main-content">
					<div class="lx-bloc" id="lx-signup">
						<div class="lx-bloc-title">
							<h2>Inscription</h2>
							<div class="lx-clear-fix"></div>
						</div>
						<div class="lx-bloc-content">
							<div class="lx-add-form">
								<form action="#" method="post" id="clientform">
									<div class="lx-textfield lx-g1 lx-pb-0">
										<label><span>Êtes vous:</span>
											<select name="city" data-required="yes">
												<option value="Personne physique">Personne physique</option>
												<option value="Personne morale (Société)">Personne morale (Société)</option>
											</select>
										</label>
									</div>
									<div class="lx-clear-fix"></div>
									<div class="lx-textfield lx-g2 lx-pb-0">
										<label><span>Nom ét prénom: </span><input type="text" name="fullname" data-required="yes" /></label>
									</div>									
									<div class="lx-textfield lx-g2 lx-pb-0">
										<label><span>Boutique / Store: </span><input type="text" name="rs" data-required="yes" /></label>
									</div>
									<div class="lx-clear-fix"></div>
									<div class="lx-textfield lx-g2 lx-pb-0">
										<label><span>CIN: </span><input type="text" name="cin" data-required="yes" /></label>
									</div>
									<div class="lx-textfield lx-g2 lx-pb-0">
										<label><span>Téléphone: </span><input type="text" name="phone" data-required="yes" /></label>
									</div>
									<div class="lx-clear-fix"></div>
									<div class="lx-textfield lx-g2 lx-pb-0">
										<label><span>Banque: </span>
											<select name="bank">
												<option value="">Choisissez un banque</option>
												<option value="Al Barid Bank">Al Barid Bank</option>
												<option value="Attijariwafa Bank note">Attijariwafa Bank</option>
												<option value="Banque Populaire">Banque Populaire</option>
												<option value="BMCE Bank">BMCE Bank</option>
												<option value="BMCI Bank">BMCI Bank</option>
												<option value="Crédit Agricole">Crédit Agricole</option>
												<option value="CIH Bank">CIH Bank</option>
												<option value="Crédit du Maroc">Crédit du Maroc</option>
												<option value="Société Générale">Société Générale</option>
												<option value="Autres">Autres</option>
											</select>
										</label>
									</div>
									<div class="lx-textfield lx-g2 lx-pb-0">
										<label><span>RIB: </span><input type="text" name="rib" data-required="yes" /></label>
									</div>
									<div class="lx-clear-fix"></div>
									<div class="lx-textfield lx-g1 lx-pb-0">
										<label><span>Email: </span><input type="text" name="email" data-required="yes" /></label>
									</div>
									<div class="lx-clear-fix"></div>
									<div class="lx-textfield lx-g2 lx-pb-0">
										<label><span>Mot de passe: </span><input type="password" name="password1" data-required="yes" /></label>
										<p>Le mot de passe de contenir au mois 6 caractéres</p>
									</div>
									<div class="lx-textfield lx-g2 lx-pb-0">
										<label><span>Confirmer mot de passe: </span><input type="password" name="password2" data-required="yes" /></label>
									</div>
									<div class="lx-clear-fix"></div>
									<div class="lx-submit lx-g1">
										<input type="hidden" name="id" value="0" />
										<a href="javascript:;">Rejoinez nous</a>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div class="lx-bloc lx-gray" id="lx-aboutus">
						<div class="lx-bloc-title">
							<h2>A propos de <span>Tawsilex</span></h2>
						</div>
						<div class="lx-bloc-content">
							<div class="lx-aboutus">
								<div class="lx-g2">
									<p>Tawsilex est une société située au coeur de la capitale économique du royaume de maroc, notre société dispose de plusieurs compétances dédiée à la satisfaction de nos clients.</p>
									<p>Notre équipe est specialisée dans la course urgente, solution logistique de l'e-commerce. durant ces dernières années nous avons acquis beaucoup d'experiences, alors ça nous a permis d'etre bien présenté sur le marché transport et services et ainsi atteindre notre objectif qui est la satisfaction de nos clients.</p>
									<a href="contact.php">Contactez nous</a>
								</div>
								<div class="lx-g2">
									<img src="images/IMG-20210317-WA0060.jpg" />
								</div>
								<div class="lx-clear-fix"></div>
							</div>
							<div class="lx-clear-fix"></div>
						</div>
					</div>
					<div class="lx-bloc" id="lx-howitworks">
						<div class="lx-bloc-content">
							<div class="lx-aboutus">
								<div class="lx-desktop">
									<img src="images/LEX-08.png" />
								</div>
								<div class="lx-mobile">
									<img src="images/LEX-07.png" />
								</div>
								<div class="lx-clear-fix"></div>
							</div>
							<div class="lx-clear-fix"></div>
						</div>
					</div>
					<div class="lx-bloc lx-gray" id="lx-services">
						<div class="lx-bloc-title">
							<h2>NOS <span>SERVICES</span></h2>
							<div class="lx-clear-fix"></div>
						</div>
						<div class="lx-bloc-content">
							<div class="lx-g2">
								<div class="lx-box1">
									<i class="fas fa-hand-holding-usd"></i>
									<h3>Livraison</h3>
									<p>En raison de notre expérience dans le domaine de la livraison des commandes e-commerce, nous avons fourni de nombreuses options logistiques pour augmenter le taux et la qualité de la livraison.</p>
								</div>
							</div>
							<div class="lx-g2">
								<div class="lx-box1">
									<i class="fa fa-bell"></i>
									<h3>Retour de fond</h3>
									<p>Tawsilex vous propose un service de paiement à la livraison, où nous effectuons un virement bancaire gratuit toutes les 48 heures</p>
								</div>
							</div>
							<div class="lx-clear-fix"></div>
							<div class="lx-g2">
								<div class="lx-box1">
									<i class="fa fa-shipping-fast"></i>
									<h3>Stockage</h3>
									<p>Nous vous éviterons d'utiliser de nombreuses plates-formes et fichiers pour gérer votre inventaire, grâce à notre plate-forme, vous pouvez gérer votre inventaire à distance en douceur</p>
								</div>
							</div>
							<div class="lx-g2">
								<div class="lx-box1">
									<i class="fa fa-headset"></i>
									<h3>Suivi</h3>
									<p>Vous pouvez facilement suivre vos commandes en vous connectant à votre compte, nous mettons aussi a votre disposition un lien de suivi intelligent et vous serez notifié à chaque mouvement de votre colis</p>
								</div>
							</div>
							<div class="lx-clear-fix"></div>
						</div>
					</div>
					<div class="lx-bloc" id="lx-howitworks">
						<div class="lx-bloc-content">
							<div class="lx-aboutus">
								<img src="images/LEX-09.png" />
							</div>
							<div class="lx-clear-fix"></div>
						</div>
					</div>
					<div class="lx-bloc lx-gray">
						<div class="lx-bloc-content">
							<div class="lx-g3">
								<div class="lx-box3">
									<img src="images/LEX-02.png" />
								</div>
							</div>
							<div class="lx-g3">
								<div class="lx-box3">
									<img src="images/LEX-03.png" />
								</div>
							</div>
							<div class="lx-g3">
								<div class="lx-box3">
									<img src="images/LEX-04.png" />
								</div>
							</div>
							<div class="lx-clear-fix"></div>
						</div>
					</div>
					<div class="lx-bloc" id="lx-tarifs">
						<div class="lx-bloc-title">
							<h2>Zones et <span>tarifs</span></h2>
						</div>
						<div class="lx-bloc-content">
							<div class="lx-aboutus">
								<div class="lx-g2">
									<h2>Nous assurons la livraison vers plusieurs <span>destinations</span>.</h2>
									<p>Tawsilex est présente dans plus de 280 villes (et villages). Notre réseau regroupe +2000 vendeurs et 300 livreurs.</p>
									<a href="liste ville et tarif tawsilex 2022.xlsx">Liste villes et tarifs</a>
									<br /><br /><br />
									<h2>Nous fournissons aux clients le service de <span>Ramassage</span> dans les villes mentionnées sur la carte.</h2>
								</div>
								<div class="lx-g2">
									<img src="images/LEX-11.png" />
								</div>
								<div class="lx-clear-fix"></div>
							</div>
							<div class="lx-clear-fix"></div>
						</div>
					</div>
					<div class="lx-bloc lx-gray" id="lx-howitworks">
						<div class="lx-bloc-content">
							<div class="lx-aboutus">
								<img src="images/LEX-01.png" />
							</div>
							<div class="lx-clear-fix"></div>
						</div>
					</div>
				</div>
			</div>
			<!-- End Popup -->	
			<div tabindex="0" class="lx-popup colihistory">
				<div class="lx-popup-inside">
					<div class="lx-popup-content">
						<a href="javascript:;"><i class="material-icons">close</i></a>
						<div class="lx-popup-details">
							<div class="lx-form">
								<div class="lx-form-title">
									<h3>Suivi de votre coli</h3>
								</div>
								<div class="lx-add-form lx-colihistory">
									
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- Footer -->
			<div class="lx-footer lx-bg2">
				<div class="lx-footer-top">
					<div class="lx-footer-top-content">
						<div class="lx-g1">
							<div class="lx-footer-about">
								<img src="images/logo2.png" />
							</div>
						</div>
						<div class="lx-clear-fix"></div>
						<div class="lx-g2">
							<div class="lx-footer-about">
								<p>Nous somme une société 100% marocaine qui vise à développer votre activité et de vous aider d’évoluer dans la bonne voie à travers un service basé sur des stratégies bien définit. Un service qui contient la logistique dans tout son ensemble à savoir, la livraison à domicile, l’importation, stockage des marchandise et son emballage … et plein d’autre choses. Ajoutant aussi le marketing qui devient une clé de succès pour toute entreprise. Dans ce service particulier nous essayons d’appliquer les nouveaux techniques de la transformation digitale pour vous approcher à votre clientèle, à savoir la production des vidéos publicitaires en haut qualité, le shooting de votre produit, les annonces … etc. Tout ce que vous avez besoin pour être distinguer dans le marché et avec une proximité de votre client.</p>
								<ul>
									<li><a href="https://www.facebook.com/Tawsilexpress.ma/"><i class="fab fa-facebook-f"></i></a></li>
									<li><a href="#"><i class="fab fa-youtube"></i></a></li>
									<li><a href="https://api.whatsapp.com/send?phone=+212624982480" target="_blank"><i class="fab fa-whatsapp"></i></a></li>
									<li><a href="https://www.instagram.com/tawsilex.ma"><i class="fab fa-instagram"></i></a></li>
								</ul>
							</div>
						</div>
						<div class="lx-g6">
							<div class="lx-footer-links">
								<h2>Liens</h2>
								<ul>
									<li><a href="javascript:;" data-bloc="#lx-wrapper"><i class="material-icons">keyboard_arrow_right</i> Accueil</a></li>
									<li><a href="javascript:;" data-bloc="#lx-aboutus"><i class="material-icons">keyboard_arrow_right</i> Que somme nous?</a></li>
									<li><a href="javascript:;" data-bloc="#lx-services"><i class="material-icons">keyboard_arrow_right</i> Services</a></li>
									<li><a href="javascript:;" data-bloc="#lx-tarifs"><i class="material-icons">keyboard_arrow_right</i> Tarifs</a></li>
								</ul>
							</div>						
						</div>
						<div class="lx-g3">
							<div class="lx-footer-contact">
								<h2>Contactez-nous</h2>
								<p><i class="fa fa-map-marker-alt"></i> Hay Al Osra Rue 21 N 19 Casablanca</p>
								<p><i class="fa fa-phone"></i> (+212) 0661498564</p>
								<p><i class="fa fa-mobile-alt"></i> (+212) 0661493364</p>
								<p><i class="fa fa-mobile-alt"></i> (+212) 0520132944</p>
								<p><i class="fa fa-envelope"></i> <a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="55213422263c39302d153238343c397b363a38">[email&#160;protected]</a></p>
							</div>						
						</div>
						<div class="lx-clear-fix"></div>
					</div>				
				</div>
				<div class="lx-footer-bottom">
					<div class="lx-footer-bottom-content">
						<p>Copyright @ 2022 <span>Tawsilex</span>, All Right Reserved</p>
					</div>						
				</div>
				<a href="javascript:;" class="lx-to-top"><i class="fa fa-angle-up"></i></a>
			</div>
		</div>

		<!-- JQuery -->
		<script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script><script src="js/jquery-1.12.4.min.js"></script>
		<!-- Google Script -->
		<script src="https://maps.googleapis.com/maps/api/js?sensor=true&key=AIzaSyBRLpYJlvaggQh93pbUDIbpJtlWC52rMBY&signed_in=true&libraries=places&callback=initMap" defer></script>
		<!-- Popup Script -->
		<script src="js/jquery.popup.js"></script>
		<!-- Main Script -->
		<script src="js/script.js"></script>
		<script>
					</script>
	</body>
</html>