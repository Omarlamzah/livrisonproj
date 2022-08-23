
<!DOCTYPE html>
<html lang="zxx">
	<head>
		<meta charset="utf-8">
		<title>MyLiv - CPanel</title>
		<meta name="description" content="MyLiv - CPanel">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!-- General CSS Settings -->
		<link rel="stylesheet" href="is-admin/css/general_style.css">
		<!-- Main Style of the template -->
		<link rel="stylesheet" href="is-admin/css/main_style.css">
		<!-- Landing Page Style -->
		<link rel="stylesheet" href="is-admin/css/reset_style.css">
		<!-- Awesomefont -->
		<link href="https://use.fontawesome.com/releases/v5.0.7/css/all.css" rel="stylesheet">
		<!-- Fav Icon -->
		<link rel="shortcut icon" href="https://tawsilexpress.ma/is-admin/favicon.ico">
				<!-- OneSignal Push Notification -->
		<link rel="manifest" href="https://tawsilexpress.ma/is-admin/manifest.json" />
		<script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>
		<script>
						var OneSignal = window.OneSignal || [];
			OneSignal.push(function() {
				OneSignal.init({
					appId: "12d1994c-6d92-48fe-b0bf-ad888b3ac302",
					autoRegister: false,
					notifyButton: {
						enable: false,
					},
					welcomeNotification: {
						disable: true
					}
				});
			});
						</script>	</head>
	<body class="lx-login-body">
		<!-- Wrapper -->
		<div class="lx-wrapper lx-login-body">	
			<!-- Main -->
			<div class="lx-main">
				<div class="lx-login">
					<div class="lx-login-content">
						<img src="images/logo1.png" />
						<h2>Se connecter à votre compte</h2>
						<form action="login.php" method="post">
														<div class="lx-textfield">
								<label><input type="text" name="username" placeholder="Adresse E-mail" /></label>
							</div>
							<div class="lx-textfield">
								<label><input type="password" name="password" placeholder="Mot de passe" /><i class="fa fa-eye-slash"></i></label>
							</div>
							<div class="lx-textfield">
								<label style="float:left;"><input type="checkbox" name="rememberme"  /> Se souvenir de moi<del class="checkmark"></del></label>
								<a href="password.php" class="lx-password-forgotten">Mot de passe oublier?</a>
								<div class="lx-clear-fix"></div>
							</div>
							<div class="lx-submit">
								<a href="javascript:;">Se connecter</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>

		<!-- JQuery -->
		<script src="is-admin/js/jquery-1.12.4.min.js"></script>
		<!-- Main Script -->
		<script src="is-admin/js/script.js"></script>
	</body>
</html>