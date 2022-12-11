// Strict Mode

var timer;
var filterClicked = 'no';

// Window Load Event
$(window).on("load", function() {

    return false;
});

// Document Ready event
$(document).on("ready", function() {
	getAllNotifs();
	if(Notification.permission === "default"){
		if($("#my-notification-button").length){
			$("#my-notification-button").trigger("click");
		}			
	}
	$("#stocksform select[name='client']").trigger("change");
	$("#ramassagesform select[name='client']").trigger("change");
	$("#colisform select[name='client']").trigger("change");
	return false;
});

function onManageWebPushSubscriptionButtonClicked(event) {
	getSubscriptionState().then(function(state) {
		if (state.isPushEnabled) {
			/* Subscribed, opt them out */
			OneSignal.setSubscription(false);
		} else {
			if (state.isOptedOut) {
				/* Opted out, opt them back in */
				OneSignal.setSubscription(true);
			} else {
				/* Unsubscribed, subscribe them */
				OneSignal.registerForPushNotifications();
			}
		}
	});
	event.preventDefault();
}
function updateMangeWebPushSubscriptionButton(buttonSelector) {
	var hideWhenSubscribed = false;
	var subscribeText = "Oui";
	var unsubscribeText = "Unsubscribe";
	getSubscriptionState().then(function(state) {
		var buttonText = !state.isPushEnabled || state.isOptedOut ? subscribeText : unsubscribeText;
		var element = document.querySelector(buttonSelector);
		if (element === null) {
			return;
		}
		element.removeEventListener('click', onManageWebPushSubscriptionButtonClicked);
		element.addEventListener('click', onManageWebPushSubscriptionButtonClicked);
		//element.textContent = buttonText;
		if (state.hideWhenSubscribed && state.isPushEnabled) {
			element.style.display = "none";
		} else {
			element.style.display = "";
		}
	});
}

function getSubscriptionState() {
	return Promise.all([
		OneSignal.isPushNotificationsEnabled(),
		OneSignal.isOptedOut()
	]).then(function(result) {
		var isPushEnabled = result[0];
		var isOptedOut = result[1];
		return {
			isPushEnabled: isPushEnabled,
			isOptedOut: isOptedOut
		};
	});
}

var buttonSelector = "#my-notification-button";
/* This example assumes you've already initialized OneSignal */
if (typeof OneSignal !== 'undefined') {
	OneSignal.push(function() {
		// If we're on an unsupported browser, do nothing
		if (!OneSignal.isPushNotificationsSupported()) {
			return;
		}
		updateMangeWebPushSubscriptionButton(buttonSelector);
		OneSignal.on("subscriptionChange", function(isSubscribed) {
			/* If the user's subscription state changes during the page's session, update the button text */
			updateMangeWebPushSubscriptionButton(buttonSelector);
			OneSignal.getUserId(function(userId) {
				var ajaxurl = "ajax.php";
				$.ajax({
					url : ajaxurl,
					type : 'post',
					data : {
						player : userId,
						action : 'saveplayer'
					},
					success : function(response){

					}		
				});				
			});
		});
	});
}

$(".lx-show-filter").on("click",function(){
	$(".lx-advanced-filter").slideToggle();
});

function getAllNotifs(){
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			action : 'allnotifs'
		},
		success : function(response){
			if(response !== ""){
				var obj = eval ("(" + response + ")");
				if(obj.notifs[0].client !== "0"){
					$(".lx-client-notif").css("display","inline-block");
					$(".lx-client-notif").text(obj.notifs[0].client);
				}
				else{
					$(".lx-client-notif").css("display","none");
				}
				if(obj.notifs[0].shipment !== "0"){
					$(".lx-shipment-notif").css("display","inline-block");
					$(".lx-shipment-notif").text(obj.notifs[0].shipment);
				}
				else{
					$(".lx-shipment-notif").css("display","none");
				}
				if(obj.notifs[0].ramassage !== "0"){
					$(".lx-ramassage-notif").css("display","inline-block");
					$(".lx-ramassage-notif").text(obj.notifs[0].ramassage);
				}
				else{
					$(".lx-ramassage-notif").css("display","none");
				}
				if(obj.notifs[0].colisu !== "0"){
					$(".lx-colisu-notif").css("display","inline-block");
					$(".lx-colisu-notif").text(obj.notifs[0].colisu);
				}
				else{
					$(".lx-colisu-notif").css("display","none");
				}
				if(obj.notifs[0].colis !== "0"){
					$(".lx-colis-notif").css("display","inline-block");
					$(".lx-colis-notif").text(obj.notifs[0].colis);
				}
				else{
					$(".lx-colis-notif").css("display","none");
				}
				if(obj.notifs[0].br !== "0"){
					$(".lx-br-notif").css("display","inline-block");
					$(".lx-br-notif").text(obj.notifs[0].br);
				}
				else{
					$(".lx-br-notif").css("display","none");
				}
				if(obj.notifs[0].bs !== "0"){
					$(".lx-bs-notif").css("display","inline-block");
					$(".lx-bs-notif").text(obj.notifs[0].bs);
				}
				else{
					$(".lx-bs-notif").css("display","none");
				}
				if(obj.notifs[0].brl !== "0"){
					$(".lx-brl-notif").css("display","inline-block");
					$(".lx-brl-notif").text(obj.notifs[0].brl);
				}
				else{
					$(".lx-brl-notif").css("display","none");
				}
				if(obj.notifs[0].brc !== "0"){
					$(".lx-brc-notif").css("display","inline-block");
					$(".lx-brc-notif").text(obj.notifs[0].brc);
				}
				else{
					$(".lx-brc-notif").css("display","none");
				}
				if(obj.notifs[0].bls !== "0"){
					$(".lx-bls-notif").css("display","inline-block");
					$(".lx-bls-notif").text(obj.notifs[0].bls);
				}
				else{
					$(".lx-bls-notif").css("display","none");
				}
				if(obj.notifs[0].fc !== "0"){
					$(".lx-fc-notif").css("display","inline-block");
					$(".lx-fc-notif").text(obj.notifs[0].fc);
				}
				else{
					$(".lx-fc-notif").css("display","none");
				}
				if(obj.notifs[0].fl !== "0"){
					$(".lx-fl-notif").css("display","inline-block");
					$(".lx-fl-notif").text(obj.notifs[0].fl);
				}
				else{
					$(".lx-fl-notif").css("display","none");
				}
				if(obj.notifs[0].factures !== "0"){
					$(".lx-factures-notif").css("display","inline-block");
					$(".lx-factures-notif").text(obj.notifs[0].factures);
				}
				else{
					$(".lx-factures-notif").css("display","none");
				}
				if(obj.notifs[0].reclamation !== "0"){
					$(".lx-reclamation-notif").css("display","inline-block");
					$(".lx-reclamation-notif").text(obj.notifs[0].reclamation);
				}
				else{
					$(".lx-reclamation-notif").css("display","none");
				}
			}
		}
	});
}

function loadLog(){
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			datelog : $("#datelog").val(),
			action : 'loadlog'
		},
		success : function(response){
			$("#loghistory").html(response);	
		}
	});
}

function loadKPI(){
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			datestart : $("#datestart1").val(),
			dateend : $("#dateend1").val(),
			action : 'loadkpi'
		},
		success : function(response){
			$(".lx-kpis").html(response);	
		}
	});
}

function loadChartData(){
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			client : ($("#client").length)?$("#client").val():"",
			dlm : ($("#dlm").length)?$("#dlm").val():"",
			city : $("#city").val(),
			datestart : $("#datestart").val(),
			dateend : $("#dateend").val(),
			action : 'loadchartdata'
		},
		success : function(response){
			var data = response.split("|");
			chartdates = data[0].split(",");
			chartdelivered = data[1].split(",").map(Number);
			chartcanceled = data[2].split(",").map(Number);
			loadChart();	
		}
	});
}

function loadChart(){
	Highcharts.setOptions({
		colors: ['#7EC855','#CC0000'],
	});
	Highcharts.chart('salescontainer', {
		chart: {
			type: 'line',
			height: 300,
			backgroundColor: null
		},
		title: {
			text: ''
		},
		yAxis: {
			title: {
				text: ''
			},
			alternateGridColor: '#FBFBFB'
		},
		xAxis: {
			categories: chartdates,
		},
		series: [{
			showInLegend: false,
			name: 'Livré',
			data: chartdelivered
		},
		{
			showInLegend: false,
			name: 'Annulé & Refusé',
			data: chartcanceled
		}],
		credits: {
			 enabled: false
		},
		responsive: {
			rules: [{
				condition: {
					maxWidth: 500
				},
				chartOptions: {
					legend: {
						layout: 'horizontal',
						align: 'center',
						verticalAlign: 'bottom'
					}
				}
			}]
		}
	});	
}

$(".lx-login .lx-submit a").on("click",function(){
	if($(this).find("i").length === 0){
		$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
	}
	$(".lx-login form").submit();
});

$(document).on("keyup",function(e) {
    if(e.keyCode == 13) {	
		if($(".lx-login .lx-submit a").length){
			$(".lx-login .lx-submit a").trigger("click");
		}
		if($(".lx-popup").css("display") !== "none"){
			if($(".lx-search-keyword2").length){
				$(".lx-search-keyword2").trigger("click");
			}
		}
		else{
			if($(".lx-search-keyword").length){
				$(".lx-search-keyword").trigger("click");
			}
		}
    }
});

$(".lx-header-admin > ul > li > img").on("click",function(){
	$(".lx-account-settings").fadeToggle();
});

$(".lx-mobile-menu").on("click",function(){
	$(".lx-main-leftside").css("left","0px");
});

$(".lx-mobile-menu-hide").on("click",function(){
	$(".lx-main-leftside").css("left","-230px");
});

$(".lx-main-menu ul li a").on("click",function(){
	$(".lx-main-menu > ul > li > a").removeClass("active");
	$(this).next("ul").slideToggle();
	if($(this).next("ul").css("display") === "block"){
		$(this).addClass("active");
	}
});

$(".lx-login .lx-textfield label i").on("click",function(){
	if($(this).attr("class") === "fa fa-eye-slash"){
		$(this).attr("class","fa fa-eye").css("color","#f39200");
		$(this).prev("input").attr("type","text");
	}
	else{
		$(this).attr("class","fa fa-eye-slash").css("color","#CCCCCC");
		$(this).prev("input").attr("type","password");
	}
});

function _(el){
	return document.getElementById(el);
}

$("#medias").on("change",function(){
	for(var i = 0;i < _("medias").files.length;i++){
		uploadsImages(_("medias").files[i]);
	}
});

function uploadsImages(picture){
	var file = picture;
	var formdata = new FormData();
	formdata.append("picture", file);
	var ajax = new XMLHttpRequest();
	ajax.upload.addEventListener("progress", progressHandler, false);
	ajax.addEventListener("load", completeHandler, false);
	ajax.open("POST", "file_upload_parser.php");
	ajax.send(formdata);
	function progressHandler(event){
		var percent = (event.loaded / event.total) * 100;
	}
	function completeHandler(event){
		if (ajax.readyState === 4 && (ajax.status === 200 || ajax.status === 0)) {
			$(".lx-image-picker img").attr("src","../is-uploads/cropped_"+ajax.responseText);
			$("#thumbnail").val(ajax.responseText);
		}
	}
}

$(".lx-delete-image").on("click",function(){
	if($("#editstateform").length === 0){
		$(".lx-image-picker img").attr("src","../is-uploads/cropped_avatar.png");
		$("#thumbnail").val("avatar.png");		
	}
	else{
		$(".lx-image-picker img").attr("src","");
		$("#thumbnail").val("");			
	}
});

$("#importform .lx-submit a").on("click",function(){
	uploadsXLSColis(_("importcolis"));
});

function uploadsXLSColis(file){
	if(file.value !== ""){
		$("*[data-required]").removeAttr("style");
		var formdata = new FormData();
		formdata.append("file0", file.files[0]);
		var ajax = new XMLHttpRequest();
		ajax.addEventListener("load", completeHandler, false);
		ajax.open("POST", "file_upload_parser.php");
		ajax.send(formdata);
		function completeHandler(event){
			if (ajax.readyState === 4 && (ajax.status === 200 || ajax.status === 0)) {
				$(".lx-popup-content > a > .material-icons").trigger("click");
				loadRamassages($(".lx-pagination ul").attr("data-state"));
				$(".lx-error-import").css("display","inline-block");
			}
		}
	}
	else{
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez choisir un fichier excel !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
}

$("#accountform .lx-submit a").on("click",function(){
	if($(this).find("i").length === 0){
		$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
	}
	isNotEmpty($("#accountform input[name='fullname']"));
	isPhone($("#accountform input[name='phone']"));
	if(isNotEmpty($("#accountform input[name='fullname']"))
	&& isPhone($("#accountform input[name='phone']"))){
		var ajaxurl = "ajax.php";
		$.ajax({
			url : ajaxurl,
			type : 'post',
			data : {
				id : $("#accountform input[name='id']").val(),
				picture : $("#accountform input[name='thumbnail']").val(),
				fullname : $("#accountform input[name='fullname']").val(),
				phone : $("#accountform input[name='phone']").val(),
				sav : ($("#accountform input[name='sav']").length)?$("#accountform input[name='sav']").val():"",
				action : 'editaccount'
			},
			success : function(response){
				$("#accountform .lx-submit a i").remove();
				$(".lx-floating-response").remove();
				window.clearTimeout(timer);
				$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Informations modifié<i class="material-icons">close</i></p></div>');
				$(".lx-floating-response").fadeIn();
				timer = window.setTimeout(function(){
					$(".lx-floating-response").fadeOut();
				},5000);
			}
		});
	}
	else{
		$("#accountform .lx-submit a i").remove();
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez remplir les champs en rouge !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

$("#passwordform .lx-submit a").on("click",function(){
	if($(this).find("i").length === 0){
		$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : $("#passwordform input[name='id']").val(),
			oldpassword : $("#passwordform input[name='oldpassword']").val(),
			newpassword1 : $("#passwordform input[name='newpassword1']").val(),
			newpassword2 : $("#passwordform input[name='newpassword2']").val(),
			action : 'editpassword'
		},
		success : function(response){
			$("#passwordform .lx-submit a i").remove();
			$(".lx-floating-response").remove();
			window.clearTimeout(timer);
			if(response === "1"){
				$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Mot de pass modifié<i class="material-icons">close</i></p></div>');
			}
			else if(response === "2"){
				$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Vous devez remplir tous les champs<i class="material-icons">close</i></p></div>');
			}
			else if(response === "3"){
				$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Ancien mot de passe incorrect<i class="material-icons">close</i></p></div>');
			}
			else if(response === "4"){
				$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Nouveau mot de passe non identiques<i class="material-icons">close</i></p></div>');
			}
			$(".lx-floating-response").fadeIn();
			timer = window.setTimeout(function(){
				$(".lx-floating-response").fadeOut();
			},5000);
		}
	});
});

$("#settingsform input[name='cities']").click(function(){
	$("#settingsform input[name='citiestext']").val("");
	$("#settingsform input[name='cities']").each(function(){
		if($(this).prop("checked") === true){
			$("#settingsform input[name='citiestext']").val($("#settingsform input[name='citiestext']").val() + "," + $(this).val());
		}
	});
});

$("#settingsform .lx-submit a").on("click",function(){
	if($(this).find("i").length === 0){
		$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : $("#settingsform input[name='id']").val(),
			rowcolor : ($("#settingsform input[name='rowcolor']").prop("checked") === true)?"1":"0",
			nbrows : $("#settingsform select[name='nbrows']").val(),
			onesignal : $("#settingsform input[name='onesignal']").val(),
			autocollect : ($("#settingsform input[name='autocollect']").prop("checked") === true)?"1":"0",
			cities : $("#settingsform input[name='citiestext']").val(),
			openpackage : ($("#settingsform input[name='openpackage']").prop("checked") === true)?"1":"0",
			clientscore : ($("#settingsform input[name='clientscore']").prop("checked") === true)?"1":"0",
			action : 'editsetting'
		},
		success : function(response){
			$("#settingsform .lx-submit a i").remove();
			$(".lx-floating-response").remove();
			window.clearTimeout(timer);
			$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Informations modifié<i class="material-icons">close</i></p></div>');
			$(".lx-floating-response").fadeIn();
			timer = window.setTimeout(function(){
				$(".lx-floating-response").fadeOut();
			},5000);
		}
	});
});

$("#feesform .lx-submit a").on("click",function(){
	if($(this).find("i").length === 0){
		$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : $("#feesform input[name='id']").val(),
			rfees : $("#feesform input[name='rfees']").val(),
			cfees : $("#feesform input[name='cfees']").val(),
			chfees : $("#feesform input[name='chfees']").val(),
			action : 'editfees'
		},
		success : function(response){
			$("#feesform .lx-submit a i").remove();
			$(".lx-floating-response").remove();
			window.clearTimeout(timer);
			$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Frais modifiés<i class="material-icons">close</i></p></div>');
			$(".lx-floating-response").fadeIn();
			timer = window.setTimeout(function(){
				$(".lx-floating-response").fadeOut();
			},5000);
		}
	});
});

$("#moderatorsform input[name='roles']").click(function(){
	$("#moderatorsform input[name='rolestext']").val("");
	$("#moderatorsform input[name='roles']").each(function(){
		if($(this).prop("checked") === true){
			$("#moderatorsform input[name='rolestext']").val($("#moderatorsform input[name='rolestext']").val() + "," + $(this).val());
		}
	});
});

$(".lx-new-moderator").on("click",function(){
	$("#moderatorsform input[name='fullname']").val("");
	$("#moderatorsform input[name='email']").val("").prop("readonly",false).css("cursor","initial");
	$("#moderatorsform input[name='password']").val("");
	$("#moderatorsform input[name='phone']").val("");
	$("#moderatorsform input[name='roles']").each(function(){
		$(this).prop("checked",false);
	})
	$("#moderatorsform input[name='rolestext']").val("");
	$("#moderatorsform input[name='id']").val("0");
});

$("body").delegate(".lx-edit-moderator","click",function(){
	$("#moderatorsform input[name='fullname']").val($(this).attr("data-fullname"));
	$("#moderatorsform input[name='email']").val($(this).attr("data-email")).prop("readonly",true).css("cursor","not-allowed");
	$("#moderatorsform input[name='password']").val($(this).attr("data-password"));
	$("#moderatorsform input[name='phone']").val($(this).attr("data-phone"));
	$("#moderatorsform input[name='rolestext']").val($(this).attr("data-roles"));
	$("#moderatorsform input[name='roles']").each(function(){
		var val = $("#moderatorsform input[name='rolestext']").val().indexOf($(this).val());
		if(val !== -1){
			$(this).prop("checked",true);
		}
		else{
			$(this).prop("checked",false);
		}
	})
	$("#moderatorsform input[name='id']").val($(this).attr("data-id"));
});

$("#moderatorsform .lx-submit a").on("click",function(){
	isNotEmpty($("#moderatorsform input[name='fullname']"));
	isPhone($("#moderatorsform input[name='phone']"));
	isEmail($("#moderatorsform input[name='email']"));
	isPassword($("#moderatorsform input[name='password']"));
	if(isNotEmpty($("#moderatorsform input[name='fullname']"))
	&& isPhone($("#moderatorsform input[name='phone']"))
	&& isEmail($("#moderatorsform input[name='email']"))
	&& isPassword($("#moderatorsform input[name='password']"))){
		if($(this).attr("class") !== "lx-disabled"){
			$(this).attr("class","lx-disabled");
			if($(this).find("i").length === 0){
				$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
			}
			var ajaxurl = "ajax.php";
			$.ajax({
				url : ajaxurl,
				type : 'post',
				data : {
					id : $("#moderatorsform input[name='id']").val(),
					fullname : $("#moderatorsform input[name='fullname']").val(),
					email : $("#moderatorsform input[name='email']").val(),
					password : $("#moderatorsform input[name='password']").val(),
					phone : $("#moderatorsform input[name='phone']").val(),
					roles : $("#moderatorsform input[name='rolestext']").val(),
					action : 'addmoderator'
				},
				success : function(response){
					$("#moderatorsform .lx-submit a").attr("class","");
					$("#moderatorsform .lx-submit a i").remove();
					if(response === "Email exist déja !!"){
						$(".lx-floating-response").remove();
						window.clearTimeout(timer);
						$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Email exist déja !!<i class="material-icons">close</i></p></div>');
						$(".lx-floating-response").fadeIn();
						timer = window.setTimeout(function(){
							$(".lx-floating-response").fadeOut();
						},5000);
					}
					else{
						$(".lx-popup-content > a > .material-icons").trigger("click");
						loadModerators("1");
						$(".lx-floating-response").remove();
						window.clearTimeout(timer);
						$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Modérateur enregistré<i class="material-icons">close</i></p></div>');
						$(".lx-floating-response").fadeIn();
						timer = window.setTimeout(function(){
							$(".lx-floating-response").fadeOut();
						},5000);
					}
				}
			});
		}
	}
	else{
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez remplir les champs en rouge !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

$("body").delegate(".lx-trash-moderator","click",function(){
	filterClicked = "yes";
	loadModerators("0");
	$(".lx-pagination ul").attr("data-state","0");
});

$("body").delegate(".lx-published-moderator","click",function(){
	filterClicked = "yes";
	loadModerators("1");
	$(".lx-pagination ul").attr("data-state","1");
});

$("body").delegate(".lx-delete-moderator","click",function(){
	$(".lx-delete-record").attr("data-id",$(this).attr("data-id"));
});

$("body").delegate(".lx-restore-moderator","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'restoremoderator'
		},
		success : function(response){
			loadModerators("0");
		}
	});
});

$("body").delegate(".lx-delete-permanently-moderator","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'deletemoderatorpermanently'
		},
		success : function(response){
			loadModerators("0");
		}
	});
});

function loadModerators(state){
	if($(".lx-table-moderators .lx-loading").length === 0){
		$(".lx-table-moderators").prepend('<div class="lx-loading" style="padding:10px;text-align:center;"><p>Please wait ...<br /><i class="fa fa-circle-notch fa-spin"></i></p></div>');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			state : state,
			keyword : $("#keyword").val(),	
			start : $(".lx-pagination ul").attr("data-start"),
			nbpage : $(".lx-pagination ul").attr("data-nbpage"),
			sortby : $(".lx-keyword input[name='sortby']").val(),
			orderby : $(".lx-keyword input[name='orderby']").val(),
			action : 'loadmoderators'
		},
		success : function(response){
			$(".lx-table-moderators .lx-loading").remove();
			$(".lx-table-moderators").html(response);
			if(filterClicked === 'yes'){
				initPagination();
			}
		}
	});
}

$(".lx-new-dlm").on("click",function(){
	$("#dlmform input[name='fullname']").val("");
	$("#dlmform input[name='email']").val("").prop("readonly",false).css("cursor","initial");
	$("#dlmform input[name='password']").val("");
	$("#dlmform input[name='phone']").val("");
	$("#dlmform input[name='stockout']").val("");
	$("#dlmform input[name='id']").val("0");
});

$("body").delegate(".lx-edit-dlm","click",function(){
	$("#dlmform input[name='fullname']").val($(this).attr("data-fullname"));
	$("#dlmform input[name='email']").val($(this).attr("data-email")).prop("readonly",true).css("cursor","not-allowed");
	$("#dlmform input[name='password']").val($(this).attr("data-password"));
	$("#dlmform input[name='phone']").val($(this).attr("data-phone"));
	$("#dlmform input[name='stockout']").val($(this).attr("data-stockout"));
	$("#dlmform input[name='id']").val($(this).attr("data-id"));
});

$("#dlmform .lx-submit a").on("click",function(){
	isNotEmpty($("#dlmform input[name='fullname']"));
	isPhone($("#dlmform input[name='phone']"));
	isEmail($("#dlmform input[name='email']"));
	isPassword($("#dlmform input[name='password']"));
	if(isNotEmpty($("#dlmform input[name='fullname']"))
	&& isPhone($("#dlmform input[name='phone']"))
	&& isEmail($("#dlmform input[name='email']"))
	&& isPassword($("#dlmform input[name='password']"))){
		if($(this).attr("class") !== "lx-disabled"){
			$(this).attr("class","lx-disabled");
			if($(this).find("i").length === 0){
				$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
			}
			var ajaxurl = "ajax.php";
			$.ajax({
				url : ajaxurl,
				type : 'post',
				data : {
					id : $("#dlmform input[name='id']").val(),
					fullname : $("#dlmform input[name='fullname']").val(),
					email : $("#dlmform input[name='email']").val(),
					password : $("#dlmform input[name='password']").val(),
					phone : $("#dlmform input[name='phone']").val(),
					stockout : $("#dlmform input[name='stockout']").val(),
					action : 'adddlm'
				},
				success : function(response){
					$("#dlmform .lx-submit a").attr("class","");
					$("#dlmform .lx-submit a i").remove();
					if(response === "Email exist déja !!"){
						$(".lx-floating-response").remove();
						window.clearTimeout(timer);
						$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Email exist déja !!<i class="material-icons">close</i></p></div>');
						$(".lx-floating-response").fadeIn();
						timer = window.setTimeout(function(){
							$(".lx-floating-response").fadeOut();
						},5000);
					}
					else{
						$(".lx-popup-content > a > .material-icons").trigger("click");
						loadDLM("1");
						$(".lx-floating-response").remove();
						window.clearTimeout(timer);
						$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Livreur enregistré<i class="material-icons">close</i></p></div>');
						$(".lx-floating-response").fadeIn();
						timer = window.setTimeout(function(){
							$(".lx-floating-response").fadeOut();
						},5000);
					}
				}
			});
		}
	}
	else{
		$("#dlmform .lx-submit a i").remove();
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez remplir les champs en rouge !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

$("body").delegate(".lx-trash-dlm","click",function(){
	filterClicked = "yes";
	loadDLM("0");
	$(".lx-pagination ul").attr("data-state","0");
});

$("body").delegate(".lx-published-dlm","click",function(){
	filterClicked = "yes";
	loadDLM("1");
	$(".lx-pagination ul").attr("data-state","1");
});

$("body").delegate(".lx-delete-dlm","click",function(){
	$(".lx-delete-record").attr("data-id",$(this).attr("data-id"));
});

$("body").delegate(".lx-restore-dlm","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'restoredlm'
		},
		success : function(response){
			loadDLM("0");
		}
	});
});

$("body").delegate(".lx-delete-permanently-dlm","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'deletedlmpermanently'
		},
		success : function(response){
			loadDLM("0");
		}
	});
});

function loadDLM(state){
	if($(".lx-table-dlm .lx-loading").length === 0){
		$(".lx-table-dlm").prepend('<div class="lx-loading" style="padding:10px;text-align:center;"><p>Please wait ...<br /><i class="fa fa-circle-notch fa-spin"></i></p></div>');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			state : state,
			keyword : $("#keyword").val(),	
			start : $(".lx-pagination ul").attr("data-start"),
			nbpage : $(".lx-pagination ul").attr("data-nbpage"),
			sortby : $(".lx-keyword input[name='sortby']").val(),
			orderby : $(".lx-keyword input[name='orderby']").val(),
			action : 'loaddlm'
		},
		success : function(response){
			$(".lx-table-dlm .lx-loading").remove();
			$(".lx-table-dlm").html(response);
			if(filterClicked === 'yes'){
				initPagination();
			}
		}
	});
}

$(".lx-new-shippingfee").on("click",function(){
	$("#shippingfeesform select[name='dlm']").val("");
	$("#shippingfeesform select[name='city']").val("");
	$("#shippingfeesform input[name='cdfees']").val("");
	$("#shippingfeesform input[name='ddfees']").val("");
	$("#shippingfeesform input[name='rdfees']").val("");
	$("#shippingfeesform input[name='delay']").val("");
	$("#shippingfeesform input[name='id']").val();
});

$("body").delegate(".lx-edit-shippingfee","click",function(){
	$("#shippingfeesform select[name='dlm']").val($(this).attr("data-dlm"));
	$("#shippingfeesform select[name='city']").val($(this).attr("data-city"));
	$("#shippingfeesform input[name='cdfees']").val($(this).attr("data-cdfees"));
	$("#shippingfeesform input[name='ddfees']").val($(this).attr("data-ddfees"));
	$("#shippingfeesform input[name='rdfees']").val($(this).attr("data-rdfees"));
	$("#shippingfeesform input[name='delay']").val($(this).attr("data-delay"));
	$("#shippingfeesform input[name='id']").val($(this).attr("data-id"));
});

$("#shippingfeesform .lx-submit a").on("click",function(){
	isNotEmpty($("#shippingfeesform select[name='dlm']"));
	isNotEmpty($("#shippingfeesform select[name='city']"));
	isNumber($("#shippingfeesform input[name='cdfees']"));
	if(isNotEmpty($("#shippingfeesform select[name='dlm']"))
	&& isNotEmpty($("#shippingfeesform select[name='city']"))
	&& isNumber($("#shippingfeesform input[name='cdfees']"))){
		if($(this).attr("class") !== "lx-disabled"){
			$(this).attr("class","lx-disabled");
			if($(this).find("i").length === 0){
				$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
			}
			var ajaxurl = "ajax.php";
			$.ajax({
				url : ajaxurl,
				type : 'post',
				data : {
					id : $("#shippingfeesform input[name='id']").val(),
					dlm : $("#shippingfeesform select[name='dlm']").val(),
					city : $("#shippingfeesform select[name='city']").val(),
					cdfees : $("#shippingfeesform input[name='cdfees']").val(),
					ddfees : $("#shippingfeesform input[name='ddfees']").val(),
					rdfees : $("#shippingfeesform input[name='rdfees']").val(),
					delay : $("#shippingfeesform input[name='delay']").val(),
					action : 'addshippingfee'
				},
				success : function(response){
					$("#shippingfeesform .lx-submit a").attr("class","");
					$("#shippingfeesform .lx-submit a i").remove();
					if(response === "Email exist déja !!"){
						$(".lx-floating-response").remove();
						window.clearTimeout(timer);
						$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Email exist déja !!<i class="material-icons">close</i></p></div>');
						$(".lx-floating-response").fadeIn();
						timer = window.setTimeout(function(){
							$(".lx-floating-response").fadeOut();
						},5000);
					}
					else{
						$(".lx-popup-content > a > .material-icons").trigger("click");
						loadShippingFees("1");
						$(".lx-floating-response").remove();
						window.clearTimeout(timer);
						$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Frais enregistré<i class="material-icons">close</i></p></div>');
						$(".lx-floating-response").fadeIn();
						timer = window.setTimeout(function(){
							$(".lx-floating-response").fadeOut();
						},5000);
					}
				}
			});
		}
	}
	else{
		$("#shippingfeesform .lx-submit a i").remove();
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez remplir les champs en rouge !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

$("body").delegate(".lx-trash-shippingfee","click",function(){
	filterClicked = "yes";
	loadShippingFees("0");
	$(".lx-pagination ul").attr("data-state","0");
});

$("body").delegate(".lx-published-shippingfee","click",function(){
	filterClicked = "yes";
	loadShippingFees("1");
	$(".lx-pagination ul").attr("data-state","1");
});

$("body").delegate(".lx-delete-shippingfee","click",function(){
	$(".lx-delete-record").attr("data-id",$(this).attr("data-id"));
});

$("body").delegate(".lx-restore-shippingfee","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'restoreshippingfee'
		},
		success : function(response){
			loadShippingFees("0");
		}
	});
});

$("body").delegate(".lx-delete-permanently-shippingfee","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'deleteshippingfeepermanently'
		},
		success : function(response){
			loadShippingFees("0");
		}
	});
});

function loadShippingFees(state){
	if($(".lx-table-shippingfees .lx-loading").length === 0){
		$(".lx-table-shippingfees").prepend('<div class="lx-loading" style="padding:10px;text-align:center;"><p>Please wait ...<br /><i class="fa fa-circle-notch fa-spin"></i></p></div>');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			state : state,
			dlm : $("#dlm").val(),	
			keyword : $("#keyword").val(),	
			start : $(".lx-pagination ul").attr("data-start"),
			nbpage : $(".lx-pagination ul").attr("data-nbpage"),
			sortby : $(".lx-keyword input[name='sortby']").val(),
			orderby : $(".lx-keyword input[name='orderby']").val(),
			action : 'loadshippingfees'
		},
		success : function(response){
			$(".lx-table-shippingfees .lx-loading").remove();
			$(".lx-table-shippingfees").html(response);
			if(filterClicked === 'yes'){
				initPagination();
			}
		}
	});
}

$(".lx-new-subdlm").on("click",function(){
	$("#subdlmform input[name='fullname']").val("");
	$("#subdlmform input[name='email']").val("").prop("readonly",false).css("cursor","initial");
	$("#subdlmform input[name='password']").val("");
	$("#subdlmform input[name='phone']").val("");
	$("#subdlmform input[name='id']").val("0");
});

$("body").delegate(".lx-edit-subdlm","click",function(){
	$("#subdlmform input[name='fullname']").val($(this).attr("data-fullname"));
	$("#subdlmform input[name='email']").val($(this).attr("data-email")).prop("readonly",true).css("cursor","not-allowed");
	$("#subdlmform input[name='password']").val($(this).attr("data-password"));
	$("#subdlmform input[name='phone']").val($(this).attr("data-phone"));
	$("#subdlmform input[name='id']").val($(this).attr("data-id"));
});

$("#subdlmform .lx-submit a").on("click",function(){
	isNotEmpty($("#subdlmform input[name='fullname']"));
	isPhone($("#subdlmform input[name='phone']"));
	isEmail($("#subdlmform input[name='email']"));
	isPassword($("#subdlmform input[name='password']"));
	if(isNotEmpty($("#subdlmform input[name='fullname']"))
	&& isPhone($("#subdlmform input[name='phone']"))
	&& isEmail($("#subdlmform input[name='email']"))
	&& isPassword($("#subdlmform input[name='password']"))){
		if($(this).attr("class") !== "lx-disabled"){
			$(this).attr("class","lx-disabled");
			if($(this).find("i").length === 0){
				$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
			}
			var ajaxurl = "ajax.php";
			$.ajax({
				url : ajaxurl,
				type : 'post',
				data : {
					id : $("#subdlmform input[name='id']").val(),
					fullname : $("#subdlmform input[name='fullname']").val(),
					email : $("#subdlmform input[name='email']").val(),
					password : $("#subdlmform input[name='password']").val(),
					phone : $("#subdlmform input[name='phone']").val(),
					action : 'addsubdlm'
				},
				success : function(response){
					$("#subdlmform .lx-submit a").attr("class","");
					$("#subdlmform .lx-submit a i").remove();
					if(response === "Email exist déja !!"){
						$(".lx-floating-response").remove();
						window.clearTimeout(timer);
						$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Email exist déja !!<i class="material-icons">close</i></p></div>');
						$(".lx-floating-response").fadeIn();
						timer = window.setTimeout(function(){
							$(".lx-floating-response").fadeOut();
						},5000);
					}
					else{
						$(".lx-popup-content > a > .material-icons").trigger("click");
						loadSubDLM("1");
						$(".lx-floating-response").remove();
						window.clearTimeout(timer);
						$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Livreur enregistré<i class="material-icons">close</i></p></div>');
						$(".lx-floating-response").fadeIn();
						timer = window.setTimeout(function(){
							$(".lx-floating-response").fadeOut();
						},5000);
					}
				}
			});
		}
	}
	else{
		$("#subdlmform .lx-submit a i").remove();
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez remplir les champs en rouge !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

$("body").delegate(".lx-trash-subdlm","click",function(){
	filterClicked = "yes";
	loadSubDLM("0");
	$(".lx-pagination ul").attr("data-state","0");
});

$("body").delegate(".lx-published-subdlm","click",function(){
	filterClicked = "yes";
	loadSubDLM("1");
	$(".lx-pagination ul").attr("data-state","1");
});

$("body").delegate(".lx-delete-subdlm","click",function(){
	$(".lx-delete-record").attr("data-id",$(this).attr("data-id"));
});

$("body").delegate(".lx-restore-subdlm","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'restoresubdlm'
		},
		success : function(response){
			loadSubDLM("0");
		}
	});
});

$("body").delegate(".lx-delete-permanently-subdlm","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'deletesubdlmpermanently'
		},
		success : function(response){
			loadSubDLM("0");
		}
	});
});

function loadSubDLM(state){
	if($(".lx-table-subdlm .lx-loading").length === 0){
		$(".lx-table-subdlm").prepend('<div class="lx-loading" style="padding:10px;text-align:center;"><p>Please wait ...<br /><i class="fa fa-circle-notch fa-spin"></i></p></div>');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			state : state,
			keyword : $("#keyword").val(),	
			start : $(".lx-pagination ul").attr("data-start"),
			nbpage : $(".lx-pagination ul").attr("data-nbpage"),
			sortby : $(".lx-keyword input[name='sortby']").val(),
			orderby : $(".lx-keyword input[name='orderby']").val(),
			action : 'loadsubdlm'
		},
		success : function(response){
			$(".lx-table-subdlm .lx-loading").remove();
			$(".lx-table-subdlm").html(response);
			if(filterClicked === 'yes'){
				initPagination();
			}
		}
	});
}

$(".lx-new-client").on("click",function(){
	$("#clientsform input[name='store']").val("");
	$("#clientsform input[name='fullname']").val("");
	$("#clientsform input[name='phone']").val("");
	$("#clientsform input[name='sav']").val("");
	$("#clientsform input[name='email']").val("").prop("readonly",false).css("cursor","initial");
	$("#clientsform input[name='password']").val("");
	$("#clientsform select[name='city']").val("");
	$("#clientsform input[name='address']").val("");
	$("#clientsform select[name='bank']").val("");
	$("#clientsform input[name='rib']").val("");
	$("#clientsform select[name='pack']").val("1");
	$("#clientsform input[name='id']").val("0");
});

$("body").delegate(".lx-edit-client","click",function(){
	$("#clientsform input[name='store']").val($(this).attr("data-store"));
	$("#clientsform input[name='fullname']").val($(this).attr("data-fullname"));
	$("#clientsform input[name='phone']").val($(this).attr("data-phone"));
	$("#clientsform input[name='sav']").val($(this).attr("data-sav"));
	$("#clientsform input[name='email']").val($(this).attr("data-email")).prop("readonly",true).css("cursor","not-allowed");
	$("#clientsform input[name='password']").val($(this).attr("data-password"));
	$("#clientsform select[name='city']").val($(this).attr("data-city"));
	$("#clientsform input[name='address']").val($(this).attr("data-address"));
	$("#clientsform select[name='bank']").val($(this).attr("data-bank"));
	$("#clientsform input[name='rib']").val($(this).attr("data-rib"));
	$("#clientsform select[name='pack']").val($(this).attr("data-pack"));
	$("#clientsform input[name='id']").val($(this).attr("data-id"));
});

$("#clientsform .lx-submit a").on("click",function(){
	isNotEmpty($("#clientsform input[name='store']"));
	isNotEmpty($("#clientsform input[name='fullname']"));
	isPhone($("#clientsform input[name='phone']"));
	isEmail($("#clientsform input[name='email']"));
	isPassword($("#clientsform input[name='password']"));
	if(isNotEmpty($("#clientsform input[name='store']"))
	&& isNotEmpty($("#clientsform input[name='fullname']"))
	&& isPhone($("#clientsform input[name='phone']"))
	&& isEmail($("#clientsform input[name='email']"))
	&& isPassword($("#clientsform input[name='password']"))){
		if($(this).attr("class") !== "lx-disabled"){
			$(this).attr("class","lx-disabled");
			if($(this).find("i").length === 0){
				$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
			}
			var ajaxurl = "ajax.php";
			$.ajax({
				url : ajaxurl,
				type : 'post',
				data : {
					id : $("#clientsform input[name='id']").val(),
					store : $("#clientsform input[name='store']").val(),
					fullname : $("#clientsform input[name='fullname']").val(),
					phone : $("#clientsform input[name='phone']").val(),
					sav : $("#clientsform input[name='sav']").val(),
					email : $("#clientsform input[name='email']").val(),
					password : $("#clientsform input[name='password']").val(),
					city : $("#clientsform select[name='city']").val(),
					address : $("#clientsform input[name='address']").val(),
					bank : $("#clientsform select[name='bank']").val(),
					rib : $("#clientsform input[name='rib']").val(),
					pack : $("#clientsform select[name='pack']").val(),
					action : 'addclient'
				},
				success : function(response){
					$("#clientsform .lx-submit a").attr("class","");
					$("#clientsform .lx-submit a i").remove();
					if(response === "Email exist déja !!"){
						$(".lx-floating-response").remove();
						window.clearTimeout(timer);
						$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Email exist déja !!<i class="material-icons">close</i></p></div>');
						$(".lx-floating-response").fadeIn();
						timer = window.setTimeout(function(){
							$(".lx-floating-response").fadeOut();
						},5000);
					}
					else{
						$(".lx-popup-content > a > .material-icons").trigger("click");
						loadClients("1");
						$(".lx-floating-response").remove();
						window.clearTimeout(timer);
						$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Client enregistré<i class="material-icons">close</i></p></div>');
						$(".lx-floating-response").fadeIn();
						timer = window.setTimeout(function(){
							$(".lx-floating-response").fadeOut();
						},5000);
					}
				}
			});
		}
	}
	else{
		$("#clientsform .lx-submit a i").remove();
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez remplir les champs en rouge !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

$("body").delegate(".lx-trash-client","click",function(){
	filterClicked = "yes";
	loadClients("0");
	$(".lx-pagination ul").attr("data-state","0");
});

$("body").delegate(".lx-published-client","click",function(){
	filterClicked = "yes";
	loadClients("1");
	$(".lx-pagination ul").attr("data-state","1");
});

$("body").delegate(".lx-delete-client","click",function(){
	$(".lx-delete-record").attr("data-id",$(this).attr("data-id"));
});

$("body").delegate(".lx-restore-client","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'restoreclient'
		},
		success : function(response){
			loadClients("0");
		}
	});
});

$("body").delegate(".lx-delete-permanently-client","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'deleteclientpermanently'
		},
		success : function(response){
			loadClients("0");
		}
	});
});

function loadClients(state){
	if($(".lx-table-clients .lx-loading").length === 0){
		$(".lx-table-clients").prepend('<div class="lx-loading" style="padding:10px;text-align:center;"><p>Please wait ...<br /><i class="fa fa-circle-notch fa-spin"></i></p></div>');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			state : state,
			keyword : $("#keyword").val(),	
			pack : $("#pack").val(),	
			start : $(".lx-pagination ul").attr("data-start"),
			nbpage : $(".lx-pagination ul").attr("data-nbpage"),
			sortby : $(".lx-keyword input[name='sortby']").val(),
			orderby : $(".lx-keyword input[name='orderby']").val(),
			action : 'loadclients'
		},
		success : function(response){
			$(".lx-table-clients .lx-loading").remove();
			$(".lx-table-clients").html(response);
			if(filterClicked === 'yes'){
				initPagination();
			}
		}
	});
}

$(".lx-new-clientfee").on("click",function(){
	$("#clientfeesform select[name='client']").val("");
	$("#clientfeesform input[name='fees25']").val("");
	$("#clientfeesform input[name='fees30']").val("");
	$("#clientfeesform input[name='fees35']").val("");
	$("#clientfeesform input[name='fees40']").val("");
	$("#clientfeesform input[name='fees45']").val("");
	$("#clientfeesform input[name='fees50']").val("");
	$("#clientfeesform input[name='feesretour']").val("");
	$("#clientfeesform input[name='feesreject']").val("");
	$("#clientfeesform input[name='id']").val("0");
});

$("body").delegate(".lx-edit-clientfee","click",function(){
	$("#clientfeesform select[name='client']").val($(this).attr("data-client"));
	$("#clientfeesform input[name='fees25']").val($(this).attr("data-fees25"));
	$("#clientfeesform input[name='fees30']").val($(this).attr("data-fees30"));
	$("#clientfeesform input[name='fees35']").val($(this).attr("data-fees35"));
	$("#clientfeesform input[name='fees40']").val($(this).attr("data-fees40"));
	$("#clientfeesform input[name='fees45']").val($(this).attr("data-fees45"));
	$("#clientfeesform input[name='fees50']").val($(this).attr("data-fees50"));
	$("#clientfeesform input[name='feesretour']").val($(this).attr("data-feesretour"));
	$("#clientfeesform input[name='feesreject']").val($(this).attr("data-feesreject"));
	$("#clientfeesform input[name='id']").val($(this).attr("data-id"));
});

$("#clientfeesform .lx-submit a").on("click",function(){
	isNotEmpty($("#clientfeesform select[name='client']"));
	if(isNotEmpty($("#clientfeesform select[name='client']"))){
		if($(this).attr("class") !== "lx-disabled"){
			$(this).attr("class","lx-disabled");
			if($(this).find("i").length === 0){
				$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
			}
			var ajaxurl = "ajax.php";
			$.ajax({
				url : ajaxurl,
				type : 'post',
				data : {
					id : $("#clientfeesform input[name='id']").val(),
					client : $("#clientfeesform select[name='client']").val(),
					fees25 : $("#clientfeesform input[name='fees25']").val(),
					fees30 : $("#clientfeesform input[name='fees30']").val(),
					fees35 : $("#clientfeesform input[name='fees35']").val(),
					fees40 : $("#clientfeesform input[name='fees40']").val(),
					fees45 : $("#clientfeesform input[name='fees45']").val(),
					fees50 : $("#clientfeesform input[name='fees50']").val(),
					feesretour : $("#clientfeesform input[name='feesretour']").val(),
					feesreject : $("#clientfeesform input[name='feesreject']").val(),
					action : 'addclientfee'
				},
				success : function(response){
					$("#clientfeesform .lx-submit a").attr("class","");
					$("#clientfeesform .lx-submit a i").remove();
					$(".lx-popup-content > a > .material-icons").trigger("click");
					loadClientFees("1");
					$(".lx-floating-response").remove();
					window.clearTimeout(timer);
					$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Remise enregistré<i class="material-icons">close</i></p></div>');
					$(".lx-floating-response").fadeIn();
					timer = window.setTimeout(function(){
						$(".lx-floating-response").fadeOut();
					},5000);
				}
			});
		}
	}
	else{
		$("#clientfeesform .lx-submit a i").remove();
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez remplir les champs en rouge !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

$("body").delegate(".lx-trash-clientfee","click",function(){
	filterClicked = "yes";
	loadClientFees("0");
	$(".lx-pagination ul").attr("data-state","0");
});

$("body").delegate(".lx-published-clientfee","click",function(){
	filterClicked = "yes";
	loadClientFees("1");
	$(".lx-pagination ul").attr("data-state","1");
});

$("body").delegate(".lx-delete-clientfee","click",function(){
	$(".lx-delete-record").attr("data-id",$(this).attr("data-id"));
});

$("body").delegate(".lx-restore-clientfee","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'restoreclientfee'
		},
		success : function(response){
			loadClientFees("0");
		}
	});
});

$("body").delegate(".lx-delete-permanently-clientfee","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'deleteclientfeepermanently'
		},
		success : function(response){
			loadClientFees("0");
		}
	});
});

function loadClientFees(state){
	if($(".lx-table-clientfees .lx-loading").length === 0){
		$(".lx-table-clientfees").prepend('<div class="lx-loading" style="padding:10px;text-align:center;"><p>Please wait ...<br /><i class="fa fa-circle-notch fa-spin"></i></p></div>');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			state : state,
			keyword : $("#keyword").val(),	
			start : $(".lx-pagination ul").attr("data-start"),
			nbpage : $(".lx-pagination ul").attr("data-nbpage"),
			sortby : $(".lx-keyword input[name='sortby']").val(),
			orderby : $(".lx-keyword input[name='orderby']").val(),
			action : 'loadclientfees'
		},
		success : function(response){
			$(".lx-table-clientfees .lx-loading").remove();
			$(".lx-table-clientfees").html(response);
			if(filterClicked === 'yes'){
				initPagination();
			}
		}
	});
}

$("#workersform input[name='roles']").click(function(){
	$("#workersform input[name='rolestext']").val("");
	$("#workersform input[name='roles']").each(function(){
		if($(this).prop("checked") === true){
			$("#workersform input[name='rolestext']").val($("#workersform input[name='rolestext']").val() + "," + $(this).val());
		}
	});
});

$(".lx-new-worker").on("click",function(){
	$("#workersform input[name='fullname']").val("");
	$("#workersform input[name='email']").val("").prop("readonly",false).css("cursor","initial");
	$("#workersform input[name='password']").val("");
	$("#workersform input[name='phone']").val("");
	$("#workersform input[name='roles']").each(function(){
		$(this).prop("checked",false);
	})
	$("#workersform input[name='rolestext']").val("");
	$("#workersform input[name='id']").val("0");
});

$("body").delegate(".lx-edit-worker","click",function(){
	$("#workersform input[name='fullname']").val($(this).attr("data-fullname"));
	$("#workersform input[name='email']").val($(this).attr("data-email")).prop("readonly",true).css("cursor","not-allowed");
	$("#workersform input[name='password']").val($(this).attr("data-password"));
	$("#workersform input[name='phone']").val($(this).attr("data-phone"));
	$("#workersform input[name='rolestext']").val($(this).attr("data-roles"));
	$("#workersform input[name='roles']").each(function(){
		var val = $("#workersform input[name='rolestext']").val().indexOf($(this).val());
		if(val !== -1){
			$(this).prop("checked",true);
		}
		else{
			$(this).prop("checked",false);
		}
	})
	$("#workersform input[name='id']").val($(this).attr("data-id"));
});

$("#workersform .lx-submit a").on("click",function(){
	isNotEmpty($("#workersform input[name='fullname']"));
	isPhone($("#workersform input[name='phone']"));
	isEmail($("#workersform input[name='email']"));
	isPassword($("#workersform input[name='password']"));
	if(isNotEmpty($("#workersform input[name='fullname']"))
	&& isPhone($("#workersform input[name='phone']"))
	&& isEmail($("#workersform input[name='email']"))
	&& isPassword($("#workersform input[name='password']"))){
		if($(this).attr("class") !== "lx-disabled"){
			$(this).attr("class","lx-disabled");
			if($(this).find("i").length === 0){
				$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
			}
			var ajaxurl = "ajax.php";
			$.ajax({
				url : ajaxurl,
				type : 'post',
				data : {
					id : $("#workersform input[name='id']").val(),
					fullname : $("#workersform input[name='fullname']").val(),
					email : $("#workersform input[name='email']").val(),
					password : $("#workersform input[name='password']").val(),
					phone : $("#workersform input[name='phone']").val(),
					roles : $("#workersform input[name='rolestext']").val(),
					action : 'addworker'
				},
				success : function(response){
					$("#workersform .lx-submit a").attr("class","");
					$("#workersform .lx-submit a i").remove();
					if(response === "Email exist déja !!"){
						$(".lx-floating-response").remove();
						window.clearTimeout(timer);
						$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Email exist déja !!<i class="material-icons">close</i></p></div>');
						$(".lx-floating-response").fadeIn();
						timer = window.setTimeout(function(){
							$(".lx-floating-response").fadeOut();
						},5000);
					}
					else{
						$(".lx-popup-content > a > .material-icons").trigger("click");
						loadWorkers("1");
						$(".lx-floating-response").remove();
						window.clearTimeout(timer);
						$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Employé enregistré<i class="material-icons">close</i></p></div>');
						$(".lx-floating-response").fadeIn();
						timer = window.setTimeout(function(){
							$(".lx-floating-response").fadeOut();
						},5000);
					}
				}
			});
		}
	}
	else{
		$("#workersform .lx-submit a i").remove();
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez remplir les champs en rouge !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

$("body").delegate(".lx-trash-worker","click",function(){
	filterClicked = "yes";
	loadWorkers("0");
	$(".lx-pagination ul").attr("data-state","0");
});

$("body").delegate(".lx-published-worker","click",function(){
	filterClicked = "yes";
	loadWorkers("1");
	$(".lx-pagination ul").attr("data-state","1");
});

$("body").delegate(".lx-delete-worker","click",function(){
	$(".lx-delete-record").attr("data-id",$(this).attr("data-id"));
});

$("body").delegate(".lx-restore-worker","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'restoreworker'
		},
		success : function(response){
			loadWorkers("0");
		}
	});
});

$("body").delegate(".lx-delete-permanently-worker","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'deleteworkerpermanently'
		},
		success : function(response){
			loadWorkers("0");
		}
	});
});

function loadWorkers(state){
	if($(".lx-table-workers .lx-loading").length === 0){
		$(".lx-table-workers").prepend('<div class="lx-loading" style="padding:10px;text-align:center;"><p>Please wait ...<br /><i class="fa fa-circle-notch fa-spin"></i></p></div>');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			state : state,
			keyword : $("#keyword").val(),	
			start : $(".lx-pagination ul").attr("data-start"),
			nbpage : $(".lx-pagination ul").attr("data-nbpage"),
			sortby : $(".lx-keyword input[name='sortby']").val(),
			orderby : $(".lx-keyword input[name='orderby']").val(),
			action : 'loadworkers'
		},
		success : function(response){
			$(".lx-table-workers .lx-loading").remove();
			$(".lx-table-workers").html(response);
			if(filterClicked === 'yes'){
				initPagination();
			}
		}
	});
}

$(".lx-new-product").on("click",function(){
	$("#productsform input[name='title']").val("");
	$("#productsform input[name='ref']").val("");
	$("#productsform input[name='id']").val("0");
});

$("body").delegate(".lx-edit-product","click",function(){
	$("#productsform input[name='title']").val($(this).attr("data-titl"));
	$("#productsform input[name='ref']").val($(this).attr("data-ref"));
	$("#productsform input[name='id']").val($(this).attr("data-id"));
});

$("#productsform .lx-submit a").on("click",function(){
	isNotEmpty($("#productsform input[name='title']"));
	isNotEmpty($("#productsform input[name='ref']"));
	if(isNotEmpty($("#productsform input[name='title']"))
	&& isNotEmpty($("#productsform input[name='ref']"))){
		if($(this).attr("class") !== "lx-disabled"){
			$(this).attr("class","lx-disabled");
			if($(this).find("i").length === 0){
				$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
			}
			var ajaxurl = "ajax.php";
			$.ajax({
				url : ajaxurl,
				type : 'post',
				data : {
					id : $("#productsform input[name='id']").val(),
					title : $("#productsform input[name='title']").val(),
					ref : $("#productsform input[name='ref']").val(),
					action : 'addproduct'
				},
				success : function(response){
					$("#productsform .lx-submit a").attr("class","");
					$("#productsform .lx-submit a i").remove();
					$(".lx-popup-content > a > .material-icons").trigger("click");
					loadProducts("1");
					$(".lx-floating-response").remove();
					window.clearTimeout(timer);
					$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Produit enregistré<i class="material-icons">close</i></p></div>');
					$(".lx-floating-response").fadeIn();
					timer = window.setTimeout(function(){
						$(".lx-floating-response").fadeOut();
					},5000);
				}
			});
		}
	}
	else{
		$("#productsform .lx-submit a i").remove();
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez remplir les champs en rouge !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

$("body").delegate(".lx-trash-product","click",function(){
	filterClicked = "yes";
	loadProducts("0");
	$(".lx-pagination ul").attr("data-state","0");
});

$("body").delegate(".lx-published-product","click",function(){
	filterClicked = "yes";
	loadProducts("1");
	$(".lx-pagination ul").attr("data-state","1");
});

$("body").delegate(".lx-delete-product","click",function(){
	$(".lx-delete-record").attr("data-id",$(this).attr("data-id"));
});

$("body").delegate(".lx-restore-product","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'restoreproduct'
		},
		success : function(response){
			loadProducts("0");
		}
	});
});

$("body").delegate(".lx-delete-permanently-product","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'deleteproductpermanently'
		},
		success : function(response){
			loadProducts("0");
		}
	});
});

function loadProducts(state){
	if($(".lx-table-products .lx-loading").length === 0){
		$(".lx-table-products").prepend('<div class="lx-loading" style="padding:10px;text-align:center;"><p>Please wait ...<br /><i class="fa fa-circle-notch fa-spin"></i></p></div>');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			state : state,
			keyword : $("#keyword").val(),	
			start : $(".lx-pagination ul").attr("data-start"),
			nbpage : $(".lx-pagination ul").attr("data-nbpage"),
			sortby : $(".lx-keyword input[name='sortby']").val(),
			orderby : $(".lx-keyword input[name='orderby']").val(),
			action : 'loadproducts'
		},
		success : function(response){
			$(".lx-table-products .lx-loading").remove();
			$(".lx-table-products").html(response);
			if(filterClicked === 'yes'){
				initPagination();
			}
		}
	});
}

$(".lx-add-other-stock").on("click",function(){
	var html = $(this).prev("div").clone();
	$(this).before(html);
	if($(this).prev("div").find(".lx-remove-this-stock").length === 0){
		$(this).prev("div").append('<a href="javascript:;" class="lx-remove-this-stock">Supprimer</a><div class="lx-clear-fix"></div>');
	}
});

$(".lx-popup-content").delegate(".lx-remove-this-stock","click",function(){
	$(this).parent().remove();
});

$(".lx-new-shipment").on("click",function(){
	$("#shipmentsform select[name='product']").val("");
	var i = 0;
	$(".lx-add-other-stock").parent().find("> div").each(function(){
		if(i > 0){
			$(this).remove();
		}
		i++;
	});
	$("#shipmentsform input[name='producttext']").val("");
	$("#shipmentsform input[name='qty']").val("1");
	$("#shipmentsform input[name='id']").val("0");
});

$("body").delegate(".lx-edit-shipment","click",function(){
	var stocks = $(this).attr("data-product").split(",");
	var producttext = $(this).attr("data-producttext").split(",");
	var qtys = $(this).attr("data-qty").split(",");
	if(stocks.length > 1){
		var i = 0;
		$(".lx-add-other-stock").parent().find("> div").each(function(){
			if(i > 0){
				$(this).remove();
			}
			i++;
		});
		for(var i=1;i<stocks.length;i++){
			var html = $(".lx-add-other-stock").prev("div").clone();
			$(".lx-add-other-stock").before(html);
			if($(".lx-add-other-stock").prev("div").find(".lx-remove-this-stock").length === 0){
				$(".lx-add-other-stock").prev("div").append('<a href="javascript:;" class="lx-remove-this-stock">Supprimer</a><div class="lx-clear-fix"></div>');
			}
		}
		var k = 0;
		$("#shipmentsform select[name='product']").each(function(){
			$(this).val(stocks[k]);
			k++;
		});
		var k = 0;
		$("#shipmentsform input[name='producttext']").each(function(){
			$(this).val(producttext[k]);
			k++;
		});
		k = 0;
		$("#shipmentsform input[name='qty']").each(function(){
			$(this).val(qtys[k]);
			k++;
		});
	}
	else{
		$("#shipmentsform select[name='product']").val($(this).attr("data-product"));
		$("#shipmentsform input[name='qty']").val($(this).attr("data-qty"));
	}
	$("#shipmentsform input[name='id']").val($(this).attr("data-id"));
});

$("#shipmentsform .lx-submit a").on("click",function(){
	var stocks = "";
	var qtys = "";
	$("#shipmentsform select[name='product']").each(function(){
		stocks += ","+$(this).val();
	});
	$("#shipmentsform input[name='qty']").each(function(){
		qtys += ","+$(this).val();
	});
	isNotEmpty($("#shipmentsform select[name='product']"));
	isNumber($("#shipmentsform input[name='qty']"));
	if(isNotEmpty($("#shipmentsform select[name='product']"))
	&& isNumber($("#shipmentsform input[name='qty']"))){
		if($(this).attr("class") !== "lx-disabled"){
			$(this).attr("class","lx-disabled");
			if($(this).find("i").length === 0){
				$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
			}
			var ajaxurl = "ajax.php";
			$.ajax({
				url : ajaxurl,
				type : 'post',
				data : {
					id : $("#shipmentsform input[name='id']").val(),
					product : stocks,
					qty : qtys,
					action : 'addshipment'
				},
				success : function(response){
					$("#shipmentsform .lx-submit a").attr("class","");
					$("#shipmentsform .lx-submit a i").remove();
					$(".lx-popup-content > a > .material-icons").trigger("click");
					loadShipments("1");
					$(".lx-floating-response").remove();
					window.clearTimeout(timer);
					$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Envoie enregistré<i class="material-icons">close</i></p></div>');
					$(".lx-floating-response").fadeIn();
					timer = window.setTimeout(function(){
						$(".lx-floating-response").fadeOut();
					},5000);
				}
			});
		}
	}
	else{
		$("#shipmentsform .lx-submit a i").remove();
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez remplir les champs en rouge !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

$("body").delegate(".lx-trash-shipment","click",function(){
	filterClicked = "yes";
	loadShipments("0");
	$(".lx-pagination ul").attr("data-state","0");
});

$("body").delegate(".lx-published-shipment","click",function(){
	filterClicked = "yes";
	loadShipments("1");
	$(".lx-pagination ul").attr("data-state","1");
});

$("body").delegate(".lx-delete-shipment","click",function(){
	$(".lx-delete-record").attr("data-id",$(this).attr("data-id"));
});

$("body").delegate(".lx-restore-shipment","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'restoreshipment'
		},
		success : function(response){
			loadShipments("0");
		}
	});
});

$("body").delegate(".lx-delete-permanently-shipment","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'deleteshipmentpermanently'
		},
		success : function(response){
			loadShipments("0");
		}
	});
});

function loadShipments(state){
	if($(".lx-table-shipments .lx-loading").length === 0){
		$(".lx-table-shipments").prepend('<div class="lx-loading" style="padding:10px;text-align:center;"><p>Please wait ...<br /><i class="fa fa-circle-notch fa-spin"></i></p></div>');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			state : state,
			keyword : $("#keyword").val(),
			client : ($("#client").length)?$("#client").val():"",
			product : ($("#product").length)?$("#product").val():"",
			datestart : $(".lx-keyword #datestart").val(),
			dateend : $(".lx-keyword #dateend").val(),		
			start : $(".lx-pagination ul").attr("data-start"),
			nbpage : $(".lx-pagination ul").attr("data-nbpage"),
			sortby : $(".lx-keyword input[name='sortby']").val(),
			orderby : $(".lx-keyword input[name='orderby']").val(),
			action : 'loadshipments'
		},
		success : function(response){
			$(".lx-table-shipments .lx-loading").remove();
			$(".lx-table-shipments").html(response);
			if(filterClicked === 'yes'){
				initPagination();
			}
		}
	});
}

var htmtproductstocksform = $("#stocksform select[name='product']").clone().html();
$("#stocksform select[name='client']").change(function(){
	$("#stocksform select[name='product']").html(htmtproductstocksform);
	var client = $(this).val();
	$("#stocksform select[name='product'] option[data-client]").each(function(){
		if($(this).attr("data-client") !== client){
			$(this).remove();
		}
	});
});

$(".lx-new-stock").on("click",function(){
	//$("#stocksform select[name='client']").val("");
	$("#stocksform select[name='product']").val("");
	$("#stocksform input[name='qty']").val("1");
	$("#stocksform input[name='broken']").val("");
	$("#stocksform textarea[name='details']").val("");
	$("#stocksform input[name='id']").val("0");
});

$("body").delegate(".lx-edit-stock","click",function(){
	$("#stocksform select[name='client']").val($(this).attr("data-client"));
	$("#stocksform select[name='client']").trigger("change");
	$("#stocksform select[name='product']").val($(this).attr("data-product"));
	$("#stocksform input[name='qty']").val($(this).attr("data-qty"));
	$("#stocksform input[name='broken']").val($(this).attr("data-broken"));
	$("#stocksform textarea[name='details']").val($(this).attr("data-details"));
	$("#stocksform input[name='id']").val($(this).attr("data-id"));
});

$("#stocksform .lx-submit a").on("click",function(){
	isNotEmpty($("#stocksform select[name='client']"));
	isNotEmpty($("#stocksform select[name='product']"));
	isNumber($("#stocksform input[name='qty']"));
	if(isNotEmpty($("#stocksform select[name='client']"))
	&& isNotEmpty($("#stocksform select[name='product']"))
	&& isNumber($("#stocksform input[name='qty']"))){
		if($(this).attr("class") !== "lx-disabled"){
			$(this).attr("class","lx-disabled");
			if($(this).find("i").length === 0){
				$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
			}
			var ajaxurl = "ajax.php";
			$.ajax({
				url : ajaxurl,
				type : 'post',
				data : {
					id : $("#stocksform input[name='id']").val(),
					client : $("#stocksform select[name='client']").val(),
					product : $("#stocksform select[name='product']").val(),
					qty : $("#stocksform input[name='qty']").val(),
					broken : $("#stocksform input[name='broken']").val(),
					details : $("#stocksform textarea[name='details']").val(),
					action : 'addstock'
				},
				success : function(response){
					$("#stocksform .lx-submit a").attr("class","");
					$("#stocksform .lx-submit a i").remove();
					$(".lx-popup-content > a > .material-icons").trigger("click");
					loadStocks("1");
					$(".lx-floating-response").remove();
					window.clearTimeout(timer);
					$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Stock enregistré<i class="material-icons">close</i></p></div>');
					$(".lx-floating-response").fadeIn();
					timer = window.setTimeout(function(){
						$(".lx-floating-response").fadeOut();
					},5000);
				}
			});
		}
	}
	else{
		$("#stocksform .lx-submit a i").remove();
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez remplir les champs en rouge !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

$("body").delegate(".lx-trash-stock","click",function(){
	filterClicked = "yes";
	loadStocks("0");
	$(".lx-pagination ul").attr("data-state","0");
});

$("body").delegate(".lx-published-stock","click",function(){
	filterClicked = "yes";
	loadStocks("1");
	$(".lx-pagination ul").attr("data-state","1");
});

$("body").delegate(".lx-delete-stock","click",function(){
	$(".lx-delete-record").attr("data-id",$(this).attr("data-id"));
});

$("body").delegate(".lx-restore-stock","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'restorestock'
		},
		success : function(response){
			loadStocks("0");
		}
	});
});

$("body").delegate(".lx-delete-permanently-stock","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'deletestockpermanently'
		},
		success : function(response){
			loadStocks("0");
		}
	});
});

function loadStocks(state){
	if($(".lx-table-stocks .lx-loading").length === 0){
		$(".lx-table-stocks").prepend('<div class="lx-loading" style="padding:10px;text-align:center;"><p>Please wait ...<br /><i class="fa fa-circle-notch fa-spin"></i></p></div>');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			state : state,
			keyword : $("#keyword").val(),
			client : ($("#client").length)?$("#client").val():"",
			product : ($("#product").length)?$("#product").val():"",
			datestart : $(".lx-keyword #datestart").val(),
			dateend : $(".lx-keyword #dateend").val(),		
			start : $(".lx-pagination ul").attr("data-start"),
			nbpage : $(".lx-pagination ul").attr("data-nbpage"),
			sortby : $(".lx-keyword input[name='sortby']").val(),
			orderby : $(".lx-keyword input[name='orderby']").val(),
			action : 'loadstocks'
		},
		success : function(response){
			$(".lx-table-stocks .lx-loading").remove();
			$(".lx-table-stocks").html(response);
			if(filterClicked === 'yes'){
				initPagination();
			}
		}
	});
}

var htmtproductramassagesform = $("#ramassagesform select[name='product']").clone().html();
$("#ramassagesform select[name='client']").change(function(){
	$("#ramassagesform select[name='product']").html(htmtproductramassagesform);
	var client = $(this).val();
	$("#ramassagesform select[name='product'] option[data-client]").each(function(){
		if($(this).attr("data-client") !== client){
			$(this).remove();
		}
	});
});

$(".lx-new-ramassage").on("click",function(){
	//$("#ramassagesform select[name='client']").val("");
	$("#ramassagesform input[name='fullname']").val("");
	$("#ramassagesform input[name='phone']").val("");
	$("#ramassagesform input[name='code2']").val("");
	$("#ramassagesform input[name='city']").val("");
	$("#ramassagesform input[name='address']").val("");
	$(".fromstock").css("display","none");
	$("#ramassagesform select[name='product']").val("0");
	var i = 0;
	$(".lx-add-other-stock").parent().find("> div").each(function(){
		if(i > 0){
			$(this).remove();
		}
		i++;
	});
	$("#ramassagesform input[name='product']").val("");
	$("#ramassagesform input[name='fromstock']").prop("checked",false);
	$("#ramassagesform input[name='qty']").val("1");
	$("#ramassagesform input[name='price']").val("");
	$("#ramassagesform textarea[name='note']").val("");
	$("#ramassagesform input[name='change']").prop("checked",false);
	$("#ramassagesform input[name='id']").val("0");
});

$("body").delegate(".lx-edit-ramassage","click",function(){
	$("#ramassagesform select[name='client']").val($(this).attr("data-client"));
	$("#ramassagesform input[name='fullname']").val($(this).attr("data-fullname"));
	$("#ramassagesform input[name='phone']").val($(this).attr("data-phone"));
	$("#ramassagesform input[name='code2']").val($(this).attr("data-code2"));
	$("#ramassagesform input[name='city']").val($(this).attr("data-city"));
	$("#ramassagesform input[name='address']").val($(this).attr("data-address"));
	$("#ramassagesform select[name='client']").trigger("change");
	$("#ramassagesform input[name='fromstock']").prop("checked",$(this).attr("data-fromstock"));
	if($(this).attr("data-fromstock") == true){
		$(".fromstock").css("display","block");
		var products = $(this).attr("data-product").split(",");
		var qtys = $(this).attr("data-qty").split(",");
		if(products.length > 1){
			var i = 0;
			$(".lx-add-other-stock").parent().find("> div").each(function(){
				if(i > 0){
					$(this).remove();
				}
				i++;
			});
			for(var i=1;i<products.length;i++){
				var html = $(".lx-add-other-stock").prev("div").clone();
				$(".lx-add-other-stock").before(html);
				if($(".lx-add-other-stock").prev("div").find(".lx-remove-this-stock").length === 0){
					$(".lx-add-other-stock").prev("div").append('<a href="javascript:;" class="lx-remove-this-stock">Supprimer</a><div class="lx-clear-fix"></div>');
				}
			}
			var k = 0;
			$("#ramassagesform select[name='product']").each(function(){
				$(this).val(products[k]);
				k++;
			});
			k = 0;
			$("#ramassagesform input[name='qty']").each(function(){
				$(this).val(qtys[k]);
				k++;
			});
		}
		else{
			$("#ramassagesform select[name='product']").val($(this).attr("data-product"));
			$("#ramassagesform input[name='qty']").val($(this).attr("data-qty"));
		}
	}
	else{
		$(".fromstock").css("display","none");
		$("#ramassagesform input[name='product']").val($(this).attr("data-product"));
		$("#ramassagesform input[name='qty']").val($(this).attr("data-qty"));
	}
	$("#ramassagesform input[name='price']").val($(this).attr("data-price"));
	$("#ramassagesform textarea[name='note']").val($(this).attr("data-note"));
	$("#ramassagesform input[name='change']").prop("checked",($(this).attr("data-change")==="1")?true:false);
	$("#ramassagesform input[name='openpackage']").prop("checked",($(this).attr("data-openpackage")==="1")?true:false);
	$("#ramassagesform input[name='id']").val($(this).attr("data-id"));
});

$("input[name='fromstock']").on("click",function(){
	if($(this).prop("checked") === true){
		$(".fromstock").css("display","block");
	}
	else{
		$(".fromstock").css("display","none");
	}
});

$("#ramassagesform .lx-submit a").on("click",function(){
	var stocks = "";
	var qtys = "";
	if($("input[name='fromstock']").prop("checked") === true){
		$("#ramassagesform select[name='product']").each(function(){
			stocks += ","+$(this).val();
		});		
	}
	else{
		stocks += ","+$("#ramassagesform input[name='product']").val();
	}
	$("#ramassagesform input[name='qty']").each(function(){
		qtys += ","+$(this).val();
	});
	isNotEmpty($("#ramassagesform select[name='client']"));
	isNotEmpty($("#ramassagesform input[name='fullname']"));
	isPhone($("#ramassagesform input[name='phone']"));
	isNotEmpty($("#ramassagesform input[name='city']"));
	isNotEmpty($("#ramassagesform input[name='address']"));
	isNumber($("#ramassagesform input[name='price']"));
	if(isNotEmpty($("#ramassagesform select[name='client']"))
	&& isNotEmpty($("#ramassagesform input[name='fullname']"))
	&& isPhone($("#ramassagesform input[name='phone']"))
	&& isNotEmpty($("#ramassagesform input[name='city']"))
	&& isNotEmpty($("#ramassagesform input[name='address']"))
	&& isNumber($("#ramassagesform input[name='price']"))){
		if($(this).attr("class") !== "lx-disabled"){
			$(this).attr("class","lx-disabled");
			if($(this).find("i").length === 0){
				$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
			}
			var ajaxurl = "ajax.php";
			$.ajax({
				url : ajaxurl,
				type : 'post',
				data : {
					id : $("#ramassagesform input[name='id']").val(),
					client : $("#ramassagesform select[name='client']").val(),
					fullname : $("#ramassagesform input[name='fullname']").val(),
					phone : $("#ramassagesform input[name='phone']").val(),
					code2 : $("#ramassagesform input[name='code2']").val(),
					city : $("#ramassagesform input[name='city']").val(),
					address : $("#ramassagesform input[name='address']").val(),
					product : stocks,
					qty : qtys,
					price : $("#ramassagesform input[name='price']").val(),
					note : $("#ramassagesform textarea[name='note']").val(),
					change : ($("#ramassagesform input[name='change']").prop("checked") === true)?"1":"0",
					openpackage : ($("#ramassagesform input[name='openpackage']").prop("checked") === true)?"1":"0",
					action : 'addramassage'
				},
				success : function(response){
					$("#ramassagesform .lx-submit a").attr("class","");
					$("#ramassagesform .lx-submit a i").remove();
					$(".lx-popup-content > a > .material-icons").trigger("click");
					loadRamassages("1");
					$(".lx-floating-response").remove();
					window.clearTimeout(timer);
					$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Ramassage enregistré<i class="material-icons">close</i></p></div>');
					$(".lx-floating-response").fadeIn();
					timer = window.setTimeout(function(){
						$(".lx-floating-response").fadeOut();
					},5000);
				}
			});
		}
	}
	else{
		$("#ramassagesform .lx-submit a i").remove();
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez remplir les champs en rouge !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

$(".lx-create-br").on("click",function(){
	if($(this).find("i").length === 0){
		$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
	}
	var ids = "";
	$(".lx-main .lx-table input[type='checkbox']:checked").each(function(){
		if(Number.isInteger(parseInt($(this).val()))){
			ids += ","+$(this).val();
		}
	});
	if(ids != ""){
		var ajaxurl = "ajax.php";
		$.ajax({
			url : ajaxurl,
			type : 'post',
			data : {
				ids : ids,
				action : 'createbr'
			},
			success : function(response){
				$(".lx-create-br i").remove();
				if(response === ""){
					$(".lx-floating-response").remove();
					window.clearTimeout(timer);
					$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Bon de ramassage creé<i class="material-icons">close</i></p></div>');
					$(".lx-floating-response").fadeIn();
					timer = window.setTimeout(function(){
						$(".lx-floating-response").fadeOut();
					},5000);
					window.location.href = "bls.php?type=BR";
				}
				else{
					$(".lx-floating-response").remove();
					window.clearTimeout(timer);
					$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> '+response+'<i class="material-icons">close</i></p></div>');
					$(".lx-floating-response").fadeIn();
					timer = window.setTimeout(function(){
						$(".lx-floating-response").fadeOut();
					},5000);
					window.location.href = "bls.php?type=BR";
				}
			}
		});
	}
	else{
		$(".lx-create-br i").remove();
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez choisir des colis pour les ajoutés au bon !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

$("body").delegate(".lx-trash-ramassage","click",function(){
	filterClicked = "yes";
	loadRamassages("0");
	$(".lx-pagination ul").attr("data-state","0");
});

$("body").delegate(".lx-published-ramassage","click",function(){
	filterClicked = "yes";
	loadRamassages("1");
	$(".lx-pagination ul").attr("data-state","1");
});

$("body").delegate(".lx-delete-ramassage","click",function(){
	$(".lx-delete-record").attr("data-id",$(this).attr("data-id"));
});

$("body").delegate(".lx-restore-ramassage","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'restoreramassage'
		},
		success : function(response){
			loadRamassages("0");
		}
	});
});

$("body").delegate(".lx-delete-permanently-ramassage","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'deleteramassagepermanently'
		},
		success : function(response){
			loadRamassages("0");
		}
	});
});

function loadRamassages(state){
	if($(".lx-table-ramassages .lx-loading").length === 0){
		$(".lx-table-ramassages").prepend('<div class="lx-loading" style="padding:10px;text-align:center;"><p>Please wait ...<br /><i class="fa fa-circle-notch fa-spin"></i></p></div>');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			state : state,
			keyword : $("#keyword").val(),
			client : ($("#client").length)?$("#client").val():"",
			city : $("#city").val(),
			datestart : $(".lx-keyword #datestart").val(),
			dateend : $(".lx-keyword #dateend").val(),		
			start : $(".lx-pagination ul").attr("data-start"),
			nbpage : $(".lx-pagination ul").attr("data-nbpage"),
			sortby : $(".lx-keyword input[name='sortby']").val(),
			orderby : $(".lx-keyword input[name='orderby']").val(),
			action : 'loadramassages'
		},
		success : function(response){
			$(".lx-table-ramassages .lx-loading").remove();
			$(".lx-table-ramassages").html(response);
			if(filterClicked === 'yes'){
				initPagination();
			}
		}
	});
}

function collectThis(code){
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			code : code,
			action : 'collectthis'
		},
		success : function(response){
			if(response === ""){
				loadRamassages($(".lx-pagination ul").attr("data-state"));
			}
			else{
				$(".lx-floating-response").remove();
				window.clearTimeout(timer);
				$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> '+response+'<i class="material-icons">close</i></p></div>');
				$(".lx-floating-response").fadeIn();
				timer = window.setTimeout(function(){
					$(".lx-floating-response").fadeOut();
				},5000);				
			}
		}
	});
}

var htmtproductcolisform = $("#colisform select[name='product']").clone().html();
$("#colisform select[name='client']").change(function(){
	$("#colisform select[name='product']").html(htmtproductcolisform);
	var client = $(this).val();
	$("#colisform select[name='product'] option[data-client]").each(function(){
		if($(this).attr("data-client") !== client){
			$(this).remove();
		}
	});
});

$("body").delegate(".lx-edit-coli","click",function(){
	$("#colisform select[name='client']").val($(this).attr("data-client"));
	$("#colisform input[name='fullname']").val($(this).attr("data-fullname"));
	$("#colisform input[name='phone']").val($(this).attr("data-phone"));
	$("#colisform select[name='city']").val($(this).attr("data-city"));
	$("#colisform input[name='address']").val($(this).attr("data-address"));
	$("#colisform select[name='dlm']").val($(this).attr("data-dlm"));
	$("#colisform select[name='client']").trigger("change");
	$("#colisform input[name='fromstock']").prop("checked",$(this).attr("data-fromstock"));
	if($(this).attr("data-fromstock") == true){
		$(".fromstock").css("display","block");
		var products = $(this).attr("data-product").split(",");
		var qtys = $(this).attr("data-qty").split(",");
		if(products.length > 1){
			var i = 0;
			$(".lx-add-other-stock").parent().find("> div").each(function(){
				if(i > 0){
					$(this).remove();
				}
				i++;
			});
			for(var i=1;i<products.length;i++){
				var html = $(".lx-add-other-stock").prev("div").clone();
				$(".lx-add-other-stock").before(html);
				if($(".lx-add-other-stock").prev("div").find(".lx-remove-this-stock").length === 0){
					$(".lx-add-other-stock").prev("div").append('<a href="javascript:;" class="lx-remove-this-stock">Supprimer</a><div class="lx-clear-fix"></div>');
				}
			}
			var k = 0;
			$("#colisform select[name='product']").each(function(){
				$(this).val(products[k]);
				k++;
			});
			k = 0;
			$("#colisform input[name='qty']").each(function(){
				$(this).val(qtys[k]);
				k++;
			});
		}
		else{
			$("#colisform select[name='product']").val($(this).attr("data-product"));
			$("#colisform input[name='qty']").val($(this).attr("data-qty"));
		}
	}
	else{
		$(".fromstock").css("display","none");
		$("#colisform input[name='product']").val($(this).attr("data-product"));
		$("#colisform input[name='qty']").val($(this).attr("data-qty"));
	}
	$("#colisform input[name='price']").val($(this).attr("data-price"));
	$("#colisform input[name='extrafees']").val($(this).attr("data-extrafees"));
	$("#colisform input[name='id']").val($(this).attr("data-id"));
});

$("#colisform .lx-submit a").on("click",function(){
	var stocks = "";
	var qtys = "";
	if($("input[name='fromstock']").prop("checked") === true){
		$("#colisform select[name='product']").each(function(){
			stocks += ","+$(this).val();
		});		
	}
	else{
		stocks += ","+$("#colisform input[name='product']").val();
	}
	$("#colisform input[name='qty']").each(function(){
		qtys += ","+$(this).val();
	});
	isNotEmpty($("#colisform input[name='fullname']"));
	isPhone($("#colisform input[name='phone']"));
	isNotEmpty($("#colisform select[name='city']"));
	isNotEmpty($("#colisform input[name='address']"));
	isNumber($("#colisform input[name='price']"));
	if(isNotEmpty($("#colisform input[name='fullname']"))
	&& isPhone($("#colisform input[name='phone']"))
	&& isNotEmpty($("#colisform select[name='city']"))
	&& isNotEmpty($("#colisform input[name='address']"))
	&& isNumber($("#colisform input[name='price']"))){
		if($(this).attr("class") !== "lx-disabled"){
			$(this).attr("class","lx-disabled");
			if($(this).find("i").length === 0){
				$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
			}
			var ajaxurl = "ajax.php";
			$.ajax({
				url : ajaxurl,
				type : 'post',
				data : {
					id : $("#colisform input[name='id']").val(),
					fullname : $("#colisform input[name='fullname']").val(),
					phone : $("#colisform input[name='phone']").val(),
					city : $("#colisform select[name='city']").val(),
					address : $("#colisform input[name='address']").val(),
					dlm : $("#colisform select[name='dlm']").val(),
					product : stocks,
					qty : qtys,
					price : $("#colisform input[name='price']").val(),
					extrafees : $("#colisform input[name='extrafees']").val(),
					action : 'addcoli'
				},
				success : function(response){
					$("#colisform .lx-submit a").attr("class","");
					$("#colisform .lx-submit a i").remove();
					$(".lx-popup-content > a > .material-icons").trigger("click");
					if($(".lx-pagination ul").attr("data-table") === "colis"){
						loadColis($(".lx-pagination ul").attr("data-state"));
					}
					else{
						loadColisU($(".lx-pagination ul").attr("data-state"));
					}
					$(".lx-floating-response").remove();
					window.clearTimeout(timer);
					$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Colis enregistré<i class="material-icons">close</i></p></div>');
					$(".lx-floating-response").fadeIn();
					timer = window.setTimeout(function(){
						$(".lx-floating-response").fadeOut();
					},5000);
				}
			});
		}
	}
	else{
		$("#colisform .lx-submit a i").remove();
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez remplir les champs en rouge !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

$(".lx-coli-state-delivarymen").on("click",function(){
	$("#editstateform input[name='state']").val($(this).attr("data-state"));
	$(".lx-coli-state-delivarymen i").remove();
	$(this).prepend('<i class="fa fa-check"></i> ');
	if($("#editstateform input[name='state']").val() === "16"){
		$(".changeaddress").css("display","none");
		$(".proof").css("display","none");
		$(".datereported").css("display","block");
	}
	else if($("#editstateform input[name='state']").val() === "14"){
		$(".datereported").css("display","none");
		$(".proof").css("display","none");
		$(".changeaddress").css("display","block");
	}
	else if($("#editstateform input[name='state']").val() === "10" || $("#editstateform input[name='state']").val() === "11"){
		$(".datereported").css("display","none");
		$(".changeaddress").css("display","none");
		$(".proof").css("display","block");
	}
	else{
		$(".changeaddress").css("display","none");
		$(".proof").css("display","none");
		$(".datereported").css("display","none");
		$("#editstateform input[name='datereported']").val("");
	}
});

$("body").delegate(".lx-edit-state","click",function(){
	$("#editstateform input[name='state']").val($(this).attr("data-state"));
	var state = $(this).attr("data-state");
	$(".lx-coli-state-delivarymen").each(function(){
		$(this).find("i").remove();
		$(this).text($(this).text().trim());
		if($(this).attr("data-state") === state){
			$(this).prepend('<i class="fa fa-check"></i> ');
		}
	});
	$("#editstateform input[name='client']").val($(this).attr("data-client"));
	$("#editstateform input[name='dlm']").val($(this).attr("data-dlm"));
	$("#editstateform input[name='fullname']").val($(this).attr("data-fullname"));
	$("#editstateform input[name='phone']").val($(this).attr("data-phone"));
	$("#editstateform input[name='city']").val($(this).attr("data-city"));
	$("#editstateform input[name='address']").val($(this).attr("data-address"));
	$("#editstateform input[name='price']").val($(this).attr("data-price"));
	$("#editstateform input[name='change']").val($(this).attr("data-change"));
	$("#editstateform input[name='datereported']").val($(this).attr("data-datereported"));
	if($(this).attr("data-proof") !== ""){
		$("#editstateform img").attr("src","../is-uploads/cropped_"+$(this).attr("data-proof"));
		$("#editstateform input[name='thumbnail']").val($(this).attr("data-proof"));
		$("#editstateform .lx-delete-image").css("display","inline-block");
	}
	else{
		$("#editstateform img").attr("src","");
		$("#editstateform input[name='thumbnail']").val("");
		$("#editstateform .lx-delete-image").css("display","none");		
	}
	if(state === "16"){
		$("#editstateform .changeaddress").css("display","none");
		$("#editstateform .proof").css("display","none");
		$("#editstateform .datereported").css("display","block");
	}
	else if(state === "14" && $(".lx-delete").length === 0){
		$("#editstateform .datereported").css("display","none");
		$("#editstateform .proof").css("display","none");
		$("#editstateform .changeaddress").css("display","block");
	}
	else if(state === "10" || state === "11"){
		$("#editstateform .datereported").css("display","none");
		$("#editstateform .changeaddress").css("display","none");
		$("#editstateform .proof").css("display","block");
	}	
	else{
		$("#editstateform .changeaddress").css("display","none");
		$("#editstateform .proof").css("display","none");
		$("#editstateform .datereported").css("display","none");
	}
	if($(this).attr("data-note") !== ""){
		$(".lx-message-reclamation").html($(this).attr("data-note")).css("display","block");
		validateSeen($(this).attr("data-id"));
	}
	else{
		$(".lx-message-reclamation").html("").css("display","none");
	}
	$("#editstateform textarea[name='comment']").val("");
	$("#editstateform input[name='id']").val($(this).attr("data-id"));
});

function validateSeen(id){
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'validateseen'
		},
		success : function(response){}
	});
}

$("#editstateform .lx-submit a").on("click",function(){
	if($(this).find("i").length === 0){
		$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : $("#editstateform input[name='id']").val(),
			client : $("#editstateform input[name='client']").val(),
			dlm : $("#editstateform input[name='dlm']").val(),
			fullname : $("#editstateform input[name='fullname']").val(),
			phone : $("#editstateform input[name='phone']").val(),
			city : $("#editstateform input[name='city']").val(),
			address : $("#editstateform input[name='address']").val(),
			price : $("#editstateform input[name='price']").val(),
			change : $("#editstateform input[name='change']").val(),
			state : $("#editstateform input[name='state']").val(),
			proof : $("#editstateform input[name='thumbnail']").val(),
			datereported : $("#editstateform input[name='datereported']").val(),
			note : $("#editstateform textarea[name='comment']").val(),
			action : 'editstate'
		},
		success : function(response){
			$("#editstateform .lx-submit a i").remove();
			$(".lx-popup-content > a > .material-icons").trigger("click");
			if($(".lx-pagination ul").attr("data-table") === "colis"){
				loadColis($(".lx-pagination ul").attr("data-state"));
			}
			else if($(".lx-pagination ul").attr("data-table") === "colisu"){
				loadColisU($(".lx-pagination ul").attr("data-state"));
			}	
			else if($(".lx-pagination ul").attr("data-table") === "colisr"){
				loadColisR($(".lx-pagination ul").attr("data-state"));
			}
			else{
				loadColisErrors();
			}
			$(".lx-floating-response").remove();
			window.clearTimeout(timer);
			$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Etat enregistré<i class="material-icons">close</i></p></div>');
			$(".lx-floating-response").fadeIn();
			timer = window.setTimeout(function(){
				$(".lx-floating-response").fadeOut();
			},5000);
		}
	});
});

$("body").delegate(".lx-show-proof","click",function(){
	$(".lx-proof img").attr("src","../is-uploads/"+$(this).attr("data-pic"));
});

$("input[name='searchadvanced']").on("keyup",function(){
	var val = $(this).val();
	var valeur = new RegExp(val,'i');
	$(this).next("ul").find("li").each(function(){
		if(valeur.test($(this).text())){
			$(this).css("display","block");
		}
		else{
			$(this).css("display","none");
		}
	});
});

$(".lx-advanced-select > input").on("click",function(){
	$(".lx-advanced-select > div").css({"display":"none"});
	$(this).next("div").css({"display":"block"});
});

$(".lx-advanced-select > div label").on("click",function(){
	var val = "";
	$(this).parents(".lx-advanced-select").find("input[type='checkbox']").each(function(){
		if($(this).prop("checked") === true){
			val += "," + $(this).val();
		}
	});
	$(this).parents(".lx-advanced-select").find("> input[type='text']").val(val.substring(1));
});

$(".lx-advanced-select-add > div label").on("click",function(){
	$(this).parents(".lx-advanced-select-add").find("> input[type='text']").val($(this).text().trim());
	$(this).parents(".lx-advanced-select-add").find("> div").css("display","none");
});

$(".lx-state-filter").on("click",function(){
	if($(".lx-pagination ul").attr("data-table") === "colis"){
		loadColis($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "colisu"){
		loadColisU($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "confirmation"){
		loadColisR($(".lx-pagination ul").attr("data-colisr"));
	}	
});

$(".lx-state-empty").on("click",function(){
	$(this).parents(".lx-advanced-select").find("input[type='checkbox']").each(function(){
		$(this).prop("checked",false);
	});
	$(this).parents(".lx-advanced-select").find("> input[type='text']").val("");
	if($(".lx-pagination ul").attr("data-table") === "colis"){
		loadColis($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "colisu"){
		loadColisU($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "confirmation"){
		loadColisR($(".lx-pagination ul").attr("data-colisr"));
	}		
});

$("body").delegate(".lx-trash-coli","click",function(){
	filterClicked = "yes";
	loadColis("0");
	$(".lx-pagination ul").attr("data-state","0");
	if($(".lx-pagination ul").attr("data-table") === "colis"){
		loadColis($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "colisu"){
		loadColisU($(".lx-pagination ul").attr("data-state"));
	}	
	if($(".lx-pagination ul").attr("data-table") === "colisr"){
		loadColisR($(".lx-pagination ul").attr("data-state"));
	}
});

$("body").delegate(".lx-published-coli","click",function(){
	filterClicked = "yes";
	loadColis("1");
	$(".lx-pagination ul").attr("data-state","1");
	if($(".lx-pagination ul").attr("data-table") === "colis"){
		loadColis($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "colisu"){
		loadColisU($(".lx-pagination ul").attr("data-state"));
	}	
	if($(".lx-pagination ul").attr("data-table") === "colisr"){
		loadColisR($(".lx-pagination ul").attr("data-state"));
	}
});

$("body").delegate(".lx-delete-coli","click",function(){
	$(".lx-delete-record").attr("data-id",$(this).attr("data-id"));
	if($(".lx-pagination ul").attr("data-table") === "colis"){
		loadColis($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "colisu"){
		loadColisU($(".lx-pagination ul").attr("data-state"));
	}	
	if($(".lx-pagination ul").attr("data-table") === "colisr"){
		loadColisR($(".lx-pagination ul").attr("data-state"));
	}
});

$("body").delegate(".lx-restore-coli","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'restorecoli'
		},
		success : function(response){
			loadColis("0");
			if($(".lx-pagination ul").attr("data-table") === "colis"){
				loadColis($(".lx-pagination ul").attr("data-state"));
			}
			if($(".lx-pagination ul").attr("data-table") === "colisu"){
				loadColisU($(".lx-pagination ul").attr("data-state"));
			}	
			if($(".lx-pagination ul").attr("data-table") === "colisr"){
				loadColisR($(".lx-pagination ul").attr("data-state"));
			}
		}
	});
});

$("body").delegate(".lx-delete-permanently-coli","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'deletecolipermanently'
		},
		success : function(response){
			loadColis("0");
			if($(".lx-pagination ul").attr("data-table") === "colis"){
				loadColis($(".lx-pagination ul").attr("data-state"));
			}
			if($(".lx-pagination ul").attr("data-table") === "colisu"){
				loadColisU($(".lx-pagination ul").attr("data-state"));
			}	
			if($(".lx-pagination ul").attr("data-table") === "colisr"){
				loadColisR($(".lx-pagination ul").attr("data-state"));
			}
		}
	});
});

function loadColis(state){
	if($(".lx-table-colis .lx-loading").length === 0){
		$(".lx-table-colis").prepend('<div class="lx-loading" style="padding:10px;text-align:center;"><p>Please wait ...<br /><i class="fa fa-circle-notch fa-spin"></i></p></div>');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			state : state,
			keyword : $("#keyword").val(),
			client : ($("#client").length)?$("#client").val():"",
			dlm : ($("#dlm").length)?$("#dlm").val():"",
			city : $("#city").val(),
			statee : $("#multistate").val(),
			fc : ($("#fc").length)?$("#fc").val():"",
			archived : ($("#archived").length)?$("#archived").val():"",
			datestart : $(".lx-keyword #datestart").val(),
			dateend : $(".lx-keyword #dateend").val(),	
			datestartupdate : $(".lx-keyword #datestartupdate").val(),
			dateendupdate : $(".lx-keyword #dateendupdate").val(),				
			ids : $("#ids").val(),
			st : $("#st").val(),
			start : $(".lx-pagination ul").attr("data-start"),
			nbpage : $(".lx-pagination ul").attr("data-nbpage"),
			sortby : $(".lx-keyword input[name='sortby']").val(),
			orderby : $(".lx-keyword input[name='orderby']").val(),
			action : 'loadcolis'
		},
		success : function(response){
			$(".lx-table-colis .lx-loading").remove();
			$(".lx-table-colis").html(response);
			if(filterClicked === 'yes'){
				initPagination();
			}
		}
	});
}

$("#archiveform .lx-submit a").on("click",function(){
	isNotEmpty($("#archiveform input[name='dateadd3']"));
	if(isNotEmpty($("#archiveform input[name='dateadd3']"))){
		if($(this).attr("class") !== "lx-disabled"){
			$(this).attr("class","lx-disabled");
			if($(this).find("i").length === 0){
				$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
			}
			var ajaxurl = "ajax.php";
			$.ajax({
				url : ajaxurl,
				type : 'post',
				data : {
					datestart : $("#dateadd3").val(),
					action : 'addarchive'
				},
				success : function(response){
					console.log(response);
					$("#archiveform .lx-submit a").attr("class","");
					$("#archiveform .lx-submit a i").remove();
					$(".lx-popup-content > a > .material-icons").trigger("click");
					loadColis($(".lx-pagination ul").attr("data-state"));
					$(".lx-floating-response").remove();
					window.clearTimeout(timer);
					$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Colis enregistré<i class="material-icons">close</i></p></div>');
					$(".lx-floating-response").fadeIn();
					timer = window.setTimeout(function(){
						$(".lx-floating-response").fadeOut();
					},5000);
				}
			});
		}
	}
	else{
		$("#archiveform .lx-submit a i").remove();
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez remplir les champs en rouge !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

function loadColisErrors(state){
	if($(".lx-table-coliserrors .lx-loading").length === 0){
		$(".lx-table-coliserrors").prepend('<div class="lx-loading" style="padding:10px;text-align:center;"><p>Please wait ...<br /><i class="fa fa-circle-notch fa-spin"></i></p></div>');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			keyword : $("#keyword").val(),
			action : 'loadcoliserrors'
		},
		success : function(response){
			$(".lx-table-coliserrors .lx-loading").remove();
			$(".lx-table-coliserrors").html(response);
		}
	});
}

$("#assigncolisform .lx-submit a").on("click",function(){
	var ids = "0";
	$(".lx-main .lx-table input[type='checkbox']:checked").each(function(){
		if($(this).val() !== "selectall"){
			ids += "," + $(this).val();
		}
	});
	if(ids !== "0" && $("#assigncolisform select[name='subdlm']").val() !== ""){
		var ajaxurl = "ajax.php";
		$.ajax({
			url : ajaxurl,
			type : 'post',
			data : {
				ids : ids,
				subdlm : $("#assigncolisform select[name='subdlm']").val(),
				action : 'assigncolis'
			},
			success : function(response){
				$(".lx-popup-content > a > .material-icons").trigger("click");
				loadcolis("1");
				$(".lx-floating-response").remove();
				window.clearTimeout(timer);
				$("body").append('<div class="lx-floating-response"><p class="lx-success"><i class="material-icons">check</i> Bien affecter !!<i class="material-icons">close</i></p></div>');
				$(".lx-floating-response").fadeIn();
				timer = window.setTimeout(function(){
					$(".lx-floating-response").fadeOut();
				},5000);
			}
		});
	}
});

$("body").delegate(".lx-export-all-colis","click",function(){
	var ids = "";
	$(".lx-main .lx-table input[type='checkbox']:checked").each(function(){
		if(Number.isInteger(parseInt($(this).val()))){
			ids += ","+$(this).val();
		}
	});
	ids = ids.substring(1);
	if(ids !== ""){
		window.location.href = "exportcolis.php?ids="+ids;
	}
	else{
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez choisir des colis pour les exporter !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

function loadColisU(state){
	if($(".lx-table-colis .lx-loading").length === 0){
		$(".lx-table-colis").prepend('<div class="lx-loading" style="padding:10px;text-align:center;"><p>Please wait ...<br /><i class="fa fa-circle-notch fa-spin"></i></p></div>');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			state : state,
			keyword : $("#keyword").val(),
			client : ($("#client").length)?$("#client").val():"",
			dlm : ($("#dlm").length)?$("#dlm").val():"",
			city : $("#city").val(),
			statee : $("#multistate").val(),
			datestart : $(".lx-keyword #datestart").val(),
			dateend : $(".lx-keyword #dateend").val(),		
			datestartupdate : $(".lx-keyword #datestartupdate").val(),
			dateendupdate : $(".lx-keyword #dateendupdate").val(),	
			start : $(".lx-pagination ul").attr("data-start"),
			nbpage : $(".lx-pagination ul").attr("data-nbpage"),
			sortby : $(".lx-keyword input[name='sortby']").val(),
			orderby : $(".lx-keyword input[name='orderby']").val(),
			action : 'loadcolisu'
		},
		success : function(response){
			$(".lx-table-colis .lx-loading").remove();
			$(".lx-table-colis").html(response);
			if(filterClicked === 'yes'){
				initPagination();
			}
		}
	});
}

function returnThis(code){
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			code : code,
			action : 'returnthis'
		},
		success : function(response){
			if(response === ""){
				loadColisR($(".lx-pagination ul").attr("data-state"));
			}
			else{
				$(".lx-floating-response").remove();
				window.clearTimeout(timer);
				$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> '+response+'<i class="material-icons">close</i></p></div>');
				$(".lx-floating-response").fadeIn();
				timer = window.setTimeout(function(){
					$(".lx-floating-response").fadeOut();
				},5000);				
			}
		}
	});
}

function loadColisR(state){
	if($(".lx-table-colis .lx-loading").length === 0){
		$(".lx-table-colis").prepend('<div class="lx-loading" style="padding:10px;text-align:center;"><p>Please wait ...<br /><i class="fa fa-circle-notch fa-spin"></i></p></div>');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			state : state,
			keyword : $("#keyword").val(),
			client : ($("#client").length)?$("#client").val():"",
			dlm : ($("#dlm").length)?$("#dlm").val():"",
			city : $("#city").val(),
			datestart : $(".lx-keyword #datestart").val(),
			dateend : $(".lx-keyword #dateend").val(),		
			start : $(".lx-pagination ul").attr("data-start"),
			nbpage : $(".lx-pagination ul").attr("data-nbpage"),
			sortby : $(".lx-keyword input[name='sortby']").val(),
			orderby : $(".lx-keyword input[name='orderby']").val(),
			action : 'loadcolisr'
		},
		success : function(response){
			$(".lx-table-colis .lx-loading").remove();
			$(".lx-table-colis").html(response);
			if(filterClicked === 'yes'){
				initPagination();
			}
		}
	});
}

$("body").delegate(".lx-show-history","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'showcolihistory'
		},
		success : function(response){
			$(".colihistory .lx-add-form").html(response);
		}
	});
});

$(".lx-popup-content").delegate(".lx-delete-history","click",function(){
	var el = $(this);
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : el.attr("data-id"),
			action : 'deletehistory'
		},
		success : function(response){
			el.parent().remove();
		}
	});
});

$(".lx-new-bl").on("click",function(){
	if($("#blsform input[name='type']").val() === "BS" || $("#blsform input[name='type']").val() === "BRL"){
		$("#blsform select[name='dlm']").val("0");
	}
	else if($("#blsform input[name='type']").val() === "BRC"){
		$("#blsform select[name='client']").val("0");
	}
	$("#blsform input[name='colis']").val("");
	$("#blsform input[name='id']").val("0");
	$(".lx-colis-added").removeClass("active");
	$(".lx-colis-added ins").text("0");
	$(".lx-colis-to-add").addClass("active");
	loadBLSColis($(".lx-pagination ul").attr("data-type"),"loadblscolistoadd");
});

$("body").delegate(".lx-edit-bl","click",function(){
	if($("#blsform input[name='type']").val() === "BS" || $("#blsform input[name='type']").val() === "BRL"){
		$("#blsform select[name='dlm']").val($(this).attr("data-user"));
	}
	else if($("#blsform input[name='type']").val() === "BRC"){
		$("#blsform select[name='client']").val($(this).attr("data-user"));
	}
	$("#blsform input[name='colis']").val($(this).attr("data-colis"));
	$("#blsform input[name='fullname']").val($(this).attr("data-fullname"));
	$("#blsform input[name='id']").val($(this).attr("data-id"));
	$(".lx-colis-added ins").text($(this).attr("data-count"));
	$(".lx-colis-added").removeClass("active");
	$(".lx-colis-to-add").addClass("active");
	loadBLSColis($(".lx-pagination ul").attr("data-type"),"loadblscolistoadd");
});

$("body").delegate(".lx-validate-reception","click",function(){
	$("#validatereceptionform input[name='missing']").val($(this).attr("data-missing"));
	$("#validatereceptionform input[name='colis']").val($(this).attr("data-colis"));
	$("#validatereceptionform input[name='id']").val($(this).attr("data-id"));
});

$(".lx-colis-tabs a").on("click",function(){
	$(".lx-colis-tabs a").removeClass("active");
	$(this).addClass("active");
});

$(".lx-colis-to-add").on("click",function(){
	loadBLSColis($(".lx-pagination ul").attr("data-type"),"loadblscolistoadd");
});

$(".lx-colis-added").on("click",function(){
	loadBLSColis($(".lx-pagination ul").attr("data-type"),"loadblscolisadded");
});

function loadBLSColis(type,action){
	if($(".lx-table-bls-colis .lx-loading").length === 0){
		$(".lx-table-bls-colis").prepend('<div class="lx-loading" style="padding:10px;text-align:center;"><p>Please wait ...<br /><i class="fa fa-circle-notch fa-spin"></i></p></div>');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			type : type,
			id : $("#blsform input[name='id']").val(),
			colis : $("#blsform input[name='colis']").val(),
			keyword : $("#keyword2").val(),
			client : ($("#client2").length)?$("#client2").val():"",
			dlm : ($("#dlm2").length)?$("#dlm2").val():"",
			city : ($("#city2").length)?$("#city2").val():"",
			datestart : $(".lx-keyword #datestart2").val(),
			dateend : $(".lx-keyword #dateend2").val(),	
			action : action
		},
		success : function(response){
			$(".lx-table-bls-colis .lx-loading").remove();
			$(".lx-table-bls-colis").html(response);
			if(filterClicked === 'yes'){
				initPagination();
			}
		}
	});
}

$(".lx-popup-content").delegate(".lx-colis-to-remove","click",function(){
	if($("#blsform").length){
		$(this).parent().parent().fadeOut();
		var colis = $("#blsform input[name='colis']").val().split(",");
		var index = colis.indexOf($(this).attr("data-id"));
		if(index > -1){
			colis.splice(index,1);
		}
		$("#blsform input[name='colis']").val(colis.join(","));		
	}
});

$("#blsform .lx-submit a").on("click",function(){
	var ids = "";
	$(".lx-popup .lx-table input[type='checkbox']:checked").each(function(){
		if(Number.isInteger(parseInt($(this).val()))){
			ids += ","+$(this).val();
		}
	});
	if($("input[name='colis']").val() === ""){
		$("input[name='colis']").val(ids.substring(1));
	}
	else{
		$("input[name='colis']").val($("input[name='colis']").val()+ids);
	}
	if($("#blsform input[name='colis']").val() !== "" || $("#blsform input[name='id']").val() !== "0"){
		if($(this).attr("class") !== "lx-disabled"){
			$(this).attr("class","lx-disabled");
			if($(this).find("i").length === 0){
				$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
			}
			var user = $("#blsform input[name='user']").val();
			if($("#blsform input[name='type']").val() == "BS" || $("#blsform input[name='type']").val() == "BRL"){
				user = $("#blsform select[name='dlm']").val();
			}
			if($("#blsform input[name='type']").val() == "BRC"){
				user = $("#blsform select[name='client']").val();
			}
			var ajaxurl = "ajax.php";
			$.ajax({
				url : ajaxurl,
				type : 'post',
				data : {
					id : $("#blsform input[name='id']").val(),
					fullname : $("#blsform input[name='fullname']").val(),
					user : user,
					type : $("#blsform input[name='type']").val(),
					colis : $("#blsform input[name='colis']").val(),
					action : 'addbl'
				},
				success : function(response){
					$("#blsform .lx-submit a").attr("class","");
					$("#blsform .lx-submit a i").remove();
					$(".lx-popup-content > a > .material-icons").trigger("click");
					loadBLS($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
					$(".lx-floating-response").remove();
					window.clearTimeout(timer);
					$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Bon enregistré<i class="material-icons">close</i></p></div>');
					$(".lx-floating-response").fadeIn();
					timer = window.setTimeout(function(){
						$(".lx-floating-response").fadeOut();
					},5000);
				}
			});
		}
	}
	else{
		$("#blsform .lx-submit a i").remove();
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez choisir les colis pour les ajouter au bon !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

$("#generateblsform .lx-submit a").on("click",function(){
	if($(this).find("i").length === 0){
		$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			type : $("#generateblsform input[name='type']").val(),
			datestart : $("#generateblsform input[name='datestart3']").val(),
			dateend : $("#generateblsform input[name='dateend3']").val(),				
			action : 'generatebls'
		},
		success : function(response){
			$("#generateblsform .lx-submit a i").remove();
			$(".lx-popup-content > a > .material-icons").trigger("click");
			loadBLS($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
			$(".lx-floating-response").remove();
			window.clearTimeout(timer);
			$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Bons générés<i class="material-icons">close</i></p></div>');
			$(".lx-floating-response").fadeIn();
			timer = window.setTimeout(function(){
				$(".lx-floating-response").fadeOut();
			},5000);
		}
	});
});

function InsertIntoBS(code){
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			code : code,
			action : 'insertintobs'
		},
		success : function(response){
			if(response === ""){
				$(".lx-floating-response").remove();
				window.clearTimeout(timer);
				$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Bien ajouté<i class="material-icons">close</i></p></div>');
				$(".lx-floating-response").fadeIn();
				timer = window.setTimeout(function(){
					$(".lx-floating-response").fadeOut();
				},5000);
			}
			else{
				$(".lx-floating-response").remove();
				window.clearTimeout(timer);
				$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> '+response+'<i class="material-icons">close</i></p></div>');
				$(".lx-floating-response").fadeIn();
				timer = window.setTimeout(function(){
					$(".lx-floating-response").fadeOut();
				},5000);				
			}
		}
	});
}

$("#validatereceptionform .lx-submit a").on("click",function(){
	if($(this).find("i").length === 0){
		$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : $("#validatereceptionform input[name='id']").val(),
			type : $("#validatereceptionform input[name='type']").val(),
			colis : $("#validatereceptionform input[name='colis']").val(),
			missing : $("#validatereceptionform input[name='missing']").val(),
			action : 'validatebl'
		},
		success : function(response){
			$("#validatereceptionform .lx-submit a i").remove();
			$(".lx-popup-content > a > .material-icons").trigger("click");
			loadBLS($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
			$(".lx-floating-response").remove();
			window.clearTimeout(timer);
			$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Bon validé<i class="material-icons">close</i></p></div>');
			$(".lx-floating-response").fadeIn();
			timer = window.setTimeout(function(){
				$(".lx-floating-response").fadeOut();
			},5000);
		}
	});
});

$("body").delegate(".lx-edit-notebl","click",function(){
	$("#noteblform textarea[name='note']").val($(this).attr("data-note"));
	$("#noteblform input[name='id']").val($(this).attr("data-id"));
});

$("#noteblform .lx-submit a").on("click",function(){
	isNotEmpty($("#noteblform textarea[name='note']"));
	if(isNotEmpty($("#noteblform textarea[name='note']"))){
		if($(this).attr("class") !== "lx-disabled"){
			$(this).attr("class","lx-disabled");
			if($(this).find("i").length === 0){
				$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
			}
			var ajaxurl = "ajax.php";
			$.ajax({
				url : ajaxurl,
				type : 'post',
				data : {
					id : $("#noteblform input[name='id']").val(),
					note : $("#noteblform textarea[name='note']").val(),
					action : 'editnotebl'
				},
				success : function(response){
					$("#noteblform .lx-submit a").attr("class","");
					$("#noteblform .lx-submit a i").remove();
					$(".lx-popup-content > a > .material-icons").trigger("click");
					loadBLS($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
					$(".lx-floating-response").remove();
					window.clearTimeout(timer);
					$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Note enregistré<i class="material-icons">close</i></p></div>');
					$(".lx-floating-response").fadeIn();
					timer = window.setTimeout(function(){
						$(".lx-floating-response").fadeOut();
					},5000);
				}
			});
		}
	}
	else{
		$("#noteblform .lx-submit a i").remove();
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez remplir les champs en rouge !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

$("body").delegate(".lx-trash-bl","click",function(){
	filterClicked = "yes";
	$(".lx-pagination ul").attr("data-state","0");
	loadBLS($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
});

$("body").delegate(".lx-published-bl","click",function(){
	filterClicked = "yes";
	$(".lx-pagination ul").attr("data-state","1");
	loadBLS($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
});

$("body").delegate(".lx-delete-bl","click",function(){
	$(".lx-delete-record").attr("data-id",$(this).attr("data-id"));
});

$("body").delegate(".lx-restore-bl","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'restorebl'
		},
		success : function(response){
			loadBLS($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
		}
	});
});

$("body").delegate(".lx-delete-permanently-bl","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'deleteblpermanently'
		},
		success : function(response){
			loadBLS($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
		}
	});
});

function loadBLS(state,type){
	if($(".lx-table-bls .lx-loading").length === 0){
		$(".lx-table-bls").prepend('<div class="lx-loading" style="padding:10px;text-align:center;"><p>Please wait ...<br /><i class="fa fa-circle-notch fa-spin"></i></p></div>');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			state : state,
			type : type,
			keyword : $("#keyword").val(),
			client : ($("#client").length)?$("#client").val():"",
			dlm : ($("#dlm").length)?$("#dlm").val():"",
			received : ($("#received").length)?$("#received").val():"",
			datestart : $(".lx-keyword #datestart").val(),
			dateend : $(".lx-keyword #dateend").val(),		
			start : $(".lx-pagination ul").attr("data-start"),
			nbpage : $(".lx-pagination ul").attr("data-nbpage"),
			sortby : $(".lx-keyword input[name='sortby']").val(),
			orderby : $(".lx-keyword input[name='orderby']").val(),
			action : 'loadbls'
		},
		success : function(response){
			$(".lx-table-bls .lx-loading").remove();
			$(".lx-table-bls").html(response);
			if($(".lx-validate-reception[data-code='"+$("#qrcode").val()+"']").length){
				$(".lx-validate-reception[data-code='"+$("#qrcode").val()+"']").trigger("click");
			}
			if(filterClicked === 'yes'){
				initPagination();
			}
		}
	});
}

$("body").delegate(".lx-print-ticket","click",function(){
	$(".tickets a").attr("data-id",$(this).attr("data-id"));
});

$(".lx-print-tickets").on("click",function(){
	if($(this).attr("data-model") === "0"){
		window.location.href = "printticketszebra.php?id="+$(this).attr("data-id");
	}
	else{
		window.location.href = "printtickets.php?id="+$(this).attr("data-id")+"&model="+$(this).attr("data-model");
	}
});

function validateThis(code){
	$("#keyword").val(code);
	$(".lx-search-keyword").trigger("click");
}

$("body").delegate(".lx-download-all-bls","click",function(){
	var ids = "";
	$(".lx-main .lx-table input[type='checkbox']:checked").each(function(){
		if(Number.isInteger(parseInt($(this).val()))){
			ids += ","+$(this).val();
		}
	});
	ids = ids.substring(1);
	if(ids !== ""){
		window.location.href = "dallbls.php?ids="+ids+"&type="+$("#blsform input[name='type']").val();
	}
	else{
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez choisir les colis pour les ajouter au bon !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

$(".lx-new-facture").on("click",function(){
	if($("#facturesform input[name='type']").val() === "FL"){
		$("#facturesform select[name='dlm']").val("0");
	}
	else if($("#facturesform input[name='type']").val() === "FC"){
		$("#facturesform select[name='client']").val("0");
	}
	$("#facturesform input[name='colis']").val("");
	$("#facturesform input[name='id']").val("0");
	$(".lx-colis-added").removeClass("active");
	$(".lx-colis-added ins").text("0");
	$(".lx-colis-to-add").addClass("active");
	loadFacturesColis($(".lx-pagination ul").attr("data-type"),"loadfacturescolistoadd");
});

$("body").delegate(".lx-edit-facture","click",function(){
	if($("#facturesform input[name='type']").val() === "FL"){
		$("#facturesform select[name='dlm']").val($(this).attr("data-user"));
	}
	else if($("#facturesform input[name='type']").val() === "FC"){
		$("#facturesform select[name='client']").val($(this).attr("data-user"));
	}
	$("#facturesform input[name='colis']").val($(this).attr("data-colis"));
	$("#facturesform input[name='id']").val($(this).attr("data-id"));
	$(".lx-colis-added ins").text($(this).attr("data-count"));
	$(".lx-colis-added").removeClass("active");
	$(".lx-colis-to-add").addClass("active");
	loadFacturesColis($(".lx-pagination ul").attr("data-type"),"loadfacturescolistoadd");
});

$(".lx-colis-tabs a").on("click",function(){
	$(".lx-colis-tabs a").removeClass("active");
	$(this).addClass("active");
});

$(".lx-colis-to-add").on("click",function(){
	loadFacturesColis($(".lx-pagination ul").attr("data-type"),"loadfacturescolistoadd");
});

$(".lx-colis-added").on("click",function(){
	loadFacturesColis($(".lx-pagination ul").attr("data-type"),"loadfacturescolisadded");
});

function loadFacturesColis(type,action){
	if($(".lx-table-factures-colis .lx-loading").length === 0){
		$(".lx-table-factures-colis").prepend('<div class="lx-loading" style="padding:10px;text-align:center;"><p>Please wait ...<br /><i class="fa fa-circle-notch fa-spin"></i></p></div>');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			type : type,
			id : $("#facturesform input[name='id']").val(),
			colis : $("#facturesform input[name='colis']").val(),
			keyword : $("#keyword2").val(),
			client : ($("#client2").length)?$("#client2").val():"",
			dlm : ($("#dlm2").length)?$("#dlm2").val():"",
			city : ($("#city2").length)?$("#city2").val():"",
			datestart : $(".lx-keyword #datestart2").val(),
			dateend : $(".lx-keyword #dateend2").val(),	
			action : action
		},
		success : function(response){
			$(".lx-table-factures-colis .lx-loading").remove();
			$(".lx-table-factures-colis").html(response);
			if(filterClicked === 'yes'){
				initPagination();
			}
		}
	});
}

$(".lx-popup-content").delegate(".lx-colis-to-remove","click",function(){
	if($("#facturesform").length){
		$(this).parent().parent().fadeOut();
		var colis = $("#facturesform input[name='colis']").val().split(",");
		var index = colis.indexOf($(this).attr("data-id"));
		if(index > -1){
			colis.splice(index,1);
		}
		$("#facturesform input[name='colis']").val(colis.join(","));		
	}
});

$("#facturesform .lx-submit a").on("click",function(){
	var ids = "";
	$(".lx-popup .lx-table input[type='checkbox']:checked").each(function(){
		if(Number.isInteger(parseInt($(this).val()))){
			ids += ","+$(this).val();
		}
	});
	if($("input[name='colis']").val() === ""){
		$("input[name='colis']").val(ids.substring(1));
	}
	else{
		$("input[name='colis']").val($("input[name='colis']").val()+ids);
	}
	if($("#facturesform input[name='colis']").val() !== "" || $("#facturesform input[name='id']").val() !== "0"){
		if($(this).attr("class") !== "lx-disabled"){
			$(this).attr("class","lx-disabled");
			if($(this).find("i").length === 0){
				$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
			}
			var user = $("#facturesform input[name='user']").val();
			if($("#facturesform input[name='type']").val() == "FL"){
				user = $("#facturesform select[name='dlm']").val();
			}
			if($("#facturesform input[name='type']").val() == "FC"){
				user = $("#facturesform select[name='client']").val();
			}
			var ajaxurl = "ajax.php";
			$.ajax({
				url : ajaxurl,
				type : 'post',
				data : {
					id : $("#facturesform input[name='id']").val(),
					user : user,
					type : $("#facturesform input[name='type']").val(),
					colis : $("#facturesform input[name='colis']").val(),
					action : 'addfacture'
				},
				success : function(response){
					$("#facturesform .lx-submit a").attr("class","");
					$("#facturesform .lx-submit a i").remove();
					$(".lx-popup-content > a > .material-icons").trigger("click");
					loadFactures($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
					$(".lx-floating-response").remove();
					window.clearTimeout(timer);
					$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Facture enregistré<i class="material-icons">close</i></p></div>');
					$(".lx-floating-response").fadeIn();
					timer = window.setTimeout(function(){
						$(".lx-floating-response").fadeOut();
					},5000);
				}
			});
		}
	}
	else{
		$("#facturesform .lx-submit a i").remove();
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez choisir les colis pour les ajouter au factures !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

$("#generatefacturesform .lx-submit a").on("click",function(){
	if($(this).find("i").length === 0){
		$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			type : $("#generatefacturesform input[name='type']").val(),
			datestart : $("#generatefacturesform input[name='datestart3']").val(),
			dateend : $("#generatefacturesform input[name='dateend3']").val(),				
			action : 'generatefactures'
		},
		success : function(response){
			$("#generatefacturesform .lx-submit a i").remove();
			$(".lx-popup-content > a > .material-icons").trigger("click");
			loadFactures($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
			$(".lx-floating-response").remove();
			window.clearTimeout(timer);
			$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Factures générés<i class="material-icons">close</i></p></div>');
			$(".lx-floating-response").fadeIn();
			timer = window.setTimeout(function(){
				$(".lx-floating-response").fadeOut();
			},5000);
		}
	});
});

$("body").delegate(".lx-edit-notefacture","click",function(){
	$("#notefactureform input[name='charges']").val($(this).attr("data-charges"));
	$("#notefactureform textarea[name='note']").val($(this).attr("data-note"));
	$("#notefactureform input[name='id']").val($(this).attr("data-id"));
});

$("#notefactureform .lx-submit a").on("click",function(){
	isNumber($("#notefactureform input[name='charges']"));
	isNotEmpty($("#notefactureform textarea[name='note']"));
	if(isNumber($("#notefactureform input[name='charges']"))
	&& isNotEmpty($("#notefactureform textarea[name='note']"))){
		if($(this).attr("class") !== "lx-disabled"){
			$(this).attr("class","lx-disabled");
			if($(this).find("i").length === 0){
				$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
			}
			var ajaxurl = "ajax.php";
			$.ajax({
				url : ajaxurl,
				type : 'post',
				data : {
					id : $("#notefactureform input[name='id']").val(),
					charges : $("#notefactureform input[name='charges']").val(),
					note : $("#notefactureform textarea[name='note']").val(),
					action : 'editnotefacture'
				},
				success : function(response){
					$("#notefactureform .lx-submit a").attr("class","");
					$("#notefactureform .lx-submit a i").remove();
					$(".lx-popup-content > a > .material-icons").trigger("click");
					loadFactures($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
					$(".lx-floating-response").remove();
					window.clearTimeout(timer);
					$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Note enregistré<i class="material-icons">close</i></p></div>');
					$(".lx-floating-response").fadeIn();
					timer = window.setTimeout(function(){
						$(".lx-floating-response").fadeOut();
					},5000);
				}
			});
		}
	}
	else{
		$("#notefactureform .lx-submit a i").remove();
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez remplir les champs en rouge !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

$("body").delegate(".lx-trash-facture","click",function(){
	filterClicked = "yes";
	$(".lx-pagination ul").attr("data-state","0");
	loadFactures($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
});

$("body").delegate(".lx-published-facture","click",function(){
	filterClicked = "yes";
	$(".lx-pagination ul").attr("data-state","1");
	loadFactures($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
});

$("body").delegate(".lx-delete-facture","click",function(){
	$(".lx-delete-record").attr("data-id",$(this).attr("data-id"));
});

$("body").delegate(".lx-restore-facture","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'restorefacture'
		},
		success : function(response){
			loadFactures($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
		}
	});
});

$("body").delegate(".lx-delete-permanently-facture","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'deletefacturepermanently'
		},
		success : function(response){
			loadFactures($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
		}
	});
});

function loadFactures(state,type){
	if($(".lx-table-factures .lx-loading").length === 0){
		$(".lx-table-factures").prepend('<div class="lx-loading" style="padding:10px;text-align:center;"><p>Please wait ...<br /><i class="fa fa-circle-notch fa-spin"></i></p></div>');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			state : state,
			type : type,
			keyword : $("#keyword").val(),
			client : ($("#client").length)?$("#client").val():"",
			dlm : ($("#dlm").length)?$("#dlm").val():"",
			received : ($("#received").length)?$("#received").val():"",
			datestart : $(".lx-keyword #datestart").val(),
			dateend : $(".lx-keyword #dateend").val(),		
			start : $(".lx-pagination ul").attr("data-start"),
			nbpage : $(".lx-pagination ul").attr("data-nbpage"),
			sortby : $(".lx-keyword input[name='sortby']").val(),
			orderby : $(".lx-keyword input[name='orderby']").val(),
			action : 'loadfactures'
		},
		success : function(response){
			$(".lx-table-factures .lx-loading").remove();
			$(".lx-table-factures").html(response);
			if(filterClicked === 'yes'){
				initPagination();
			}
		}
	});
}

function loadPayouts(state){
	if($(".lx-table-payouts .lx-loading").length === 0){
		$(".lx-table-payouts").prepend('<div class="lx-loading" style="padding:10px;text-align:center;"><p>Please wait ...<br /><i class="fa fa-circle-notch fa-spin"></i></p></div>');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			state : state,
			keyword : $("#keyword").val(),
			client : ($("#client").length)?$("#client").val():"",
			bank : ($("#bank").length)?$("#bank").val():"",
			paid : ($("#paid").length)?$("#paid").val():"",
			datestart : $(".lx-keyword #datestart").val(),
			dateend : $(".lx-keyword #dateend").val(),		
			start : $(".lx-pagination ul").attr("data-start"),
			nbpage : $(".lx-pagination ul").attr("data-nbpage"),
			sortby : $(".lx-keyword input[name='sortby']").val(),
			orderby : $(".lx-keyword input[name='orderby']").val(),
			action : 'loadpayouts'
		},
		success : function(response){
			$(".lx-table-payouts .lx-loading").remove();
			$(".lx-table-payouts").html(response);
			if(filterClicked === 'yes'){
				initPagination();
			}
		}
	});
}

$("body").delegate(".lx-download-all-factures","click",function(){
	var ids = "";
	$(".lx-main .lx-table input[type='checkbox']:checked").each(function(){
		if(Number.isInteger(parseInt($(this).val()))){
			ids += ","+$(this).val();
		}
	});
	ids = ids.substring(1);
	if(ids !== ""){
		window.location.href = "dallfactures.php?ids="+ids+"&type="+$("#facturesform input[name='type']").val();
	}
	else{
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez choisir les colis pour les ajouter au factures !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

$("body").delegate(".lx-export-payouts","click",function(){
	var ids = "";
	$(".lx-main .lx-table input[type='checkbox']:checked").each(function(){
		if(Number.isInteger(parseInt($(this).val()))){
			ids += ","+$(this).val();
		}
	});
	ids = ids.substring(1);
	if(ids !== ""){
		window.location.href = "exportpayouts.php?ids="+ids;
	}
	else{
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez choisir des factures pour les exporter !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

$("body").delegate(".lx-download-payouts","click",function(){
	var ids = "";
	$(".lx-main .lx-table input[type='checkbox']:checked").each(function(){
		if(Number.isInteger(parseInt($(this).val()))){
			ids += ","+$(this).val();
		}
	});
	ids = ids.substring(1);
	if(ids !== ""){
		window.location.href = "downloadpayouts.php?ids="+ids;
	}
	else{
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez choisir des factures pour les télécharger !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

$("#trackingstatesform input[name='phases']").click(function(){
	$("#trackingstatesform input[name='phasestext']").val("");
	$("#trackingstatesform input[name='phases']").each(function(){
		if($(this).prop("checked") === true){
			$("#trackingstatesform input[name='phasestext']").val($("#trackingstatesform input[name='phasestext']").val() + "," + $(this).val());
		}
	});
});

$(".lx-new-trackingstate").on("click",function(){
	$("#trackingstatesform input[name='state']").val("").prop("readonly",false);
	$("#trackingstatesform input[name='color']").val("");
	$("#trackingstatesform input[name='description']").val("");
	$("#trackingstatesform input[name='phases']").each(function(){
		$(this).prop("checked",false);
	})
	$("#trackingstatesform input[name='phasestext']").val("");
	$("#trackingstatesform input[name='id']").val("0");
});

$("body").delegate(".lx-edit-trackingstate","click",function(){
	if($(this).attr("data-state") === "Livré" || $(this).attr("data-state") === "Annulé" || $(this).attr("data-state") === "Refusé" || $(this).attr("data-state") === "Change"){
		$("#trackingstatesform input[name='state']").val($(this).attr("data-state")).prop("readonly",true);
	}
	else{
		$("#trackingstatesform input[name='state']").val($(this).attr("data-state")).prop("readonly",false);
	}
	$("#trackingstatesform input[name='color']").val($(this).attr("data-color"));
	$("#trackingstatesform input[name='description']").val($(this).attr("data-description"));
	$("#trackingstatesform input[name='phasestext']").val($(this).attr("data-phases"));
	$("#trackingstatesform input[name='phases']").each(function(){
		var val = $("#trackingstatesform input[name='phasestext']").val().indexOf($(this).val());
		if(val !== -1){
			$(this).prop("checked",true);
		}
		else{
			$(this).prop("checked",false);
		}
	})
	$("#trackingstatesform input[name='id']").val($(this).attr("data-id"));
});

$("#trackingstatesform .lx-submit a").on("click",function(){
	isNotEmpty($("#trackingstatesform input[name='state']"));
	isNotEmpty($("#trackingstatesform input[name='color']"));
	if(isNotEmpty($("#trackingstatesform input[name='state']"))
	&& isNotEmpty($("#trackingstatesform input[name='color']"))){
		if($(this).attr("class") !== "lx-disabled"){
			$(this).attr("class","lx-disabled");
			if($(this).find("i").length === 0){
				$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
			}
			var ajaxurl = "ajax.php";
			$.ajax({
				url : ajaxurl,
				type : 'post',
				data : {
					id : $("#trackingstatesform input[name='id']").val(),
					state : $("#trackingstatesform input[name='state']").val(),
					color : $("#trackingstatesform input[name='color']").val(),
					description : $("#trackingstatesform input[name='description']").val(),
					phases : $("#trackingstatesform input[name='phasestext']").val(),
					action : 'addtrackingstate'
				},
				success : function(response){
					$("#trackingstatesform .lx-submit a").attr("class","");
					$("#trackingstatesform .lx-submit a i").remove();
					$(".lx-popup-content > a > .material-icons").trigger("click");
					loadTrackingstates("1");
					$(".lx-floating-response").remove();
					window.clearTimeout(timer);
					$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Etat enregistré<i class="material-icons">close</i></p></div>');
					$(".lx-floating-response").fadeIn();
					timer = window.setTimeout(function(){
						$(".lx-floating-response").fadeOut();
					},5000);
				}
			});
		}
	}
	else{
		$("#trackingstatesform .lx-submit a i").remove();
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez remplir les champs en rouge !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

$("body").delegate(".lx-trash-trackingstates","click",function(){
	filterClicked = "yes";
	loadTrackingstates("0");
	$(".lx-pagination ul").attr("data-state","0");
});

$("body").delegate(".lx-published-trackingstates","click",function(){
	filterClicked = "yes";
	loadTrackingstates("1");
	$(".lx-pagination ul").attr("data-state","1");
});

$("body").delegate(".lx-delete-trackingstate","click",function(){
	$(".lx-delete-record").attr("data-id",$(this).attr("data-id"));
});

$("body").delegate(".lx-restore-trackingstate","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'restoretrackingstate'
		},
		success : function(response){
			loadTrackingstates("0");
		}
	});
});

$("body").delegate(".lx-delete-permanently-trackingstate","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'deletetrackingstatepermanently'
		},
		success : function(response){
			loadTrackingstates("0");
		}
	});
});

function loadTrackingstates(state){
	if($(".lx-table-trackingstates .lx-loading").length === 0){
		$(".lx-table-trackingstates").prepend('<div class="lx-loading" style="padding:10px;text-align:center;"><p>Please wait ...<br /><i class="fa fa-circle-notch fa-spin"></i></p></div>');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			state : state,
			keyword : $("#keyword").val(),
			start : $(".lx-pagination ul").attr("data-start"),
			nbpage : $(".lx-pagination ul").attr("data-nbpage"),
			sortby : $(".lx-keyword input[name='sortby']").val(),
			orderby : $(".lx-keyword input[name='orderby']").val(),
			action : 'loadtrackingstates'
		},
		success : function(response){
			$(".lx-table-trackingstates .lx-loading").remove();
			$(".lx-table-trackingstates").html(response);
			if(filterClicked === 'yes'){
				initPagination();
			}
		}
	});
}

$("#fctblstatesform input[name='states']").click(function(){
	$("#fctblstatesform input[name='statestext']").val("");
	$("#fctblstatesform input[name='states']").each(function(){
		if($(this).prop("checked") === true){
			$("#fctblstatesform input[name='statestext']").val($("#fctblstatesform input[name='statestext']").val() + "," + $(this).val());
		}
	});
});

$(".lx-new-fctblstate").on("click",function(){
	$("#fctblstatesform select[name='type']").val("");
	$("#fctblstatesform input[name='statestext']").val("");
	$("#fctblstatesform input[name='states']").each(function(){
		$(this).prop("checked",false);
	});
	$("#fctblstatesform input[name='id']").val("0");
});

$("body").delegate(".lx-edit-fctblstate","click",function(){
	$("#fctblstatesform select[name='type']").val($(this).attr("data-type"));
	$("#fctblstatesform input[name='statestext']").val($(this).attr("data-states"));
	$("#fctblstatesform input[name='states']").each(function(){
		$(this).prop("checked",false);
	});
	var states = $("#fctblstatesform input[name='statestext']").val().split(",");
	$("#fctblstatesform input[name='states']").each(function(){
		for(var i=0;i<states.length;i++){
			if(states[i] === $(this).val()){
				$(this).prop("checked",true);
			}			
		}
	});
	$("#fctblstatesform input[name='id']").val($(this).attr("data-id"));
});

$("#fctblstatesform .lx-submit a").on("click",function(){
	isNotEmpty($("#fctblstatesform select[name='type']"));
	if(isNotEmpty($("#fctblstatesform select[name='type']"))){
		if($(this).attr("class") !== "lx-disabled"){
			$(this).attr("class","lx-disabled");
			if($(this).find("i").length === 0){
				$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
			}
			var ajaxurl = "ajax.php";
			$.ajax({
				url : ajaxurl,
				type : 'post',
				data : {
					id : $("#fctblstatesform input[name='id']").val(),
					type : $("#fctblstatesform select[name='type']").val(),
					states : $("#fctblstatesform input[name='statestext']").val(),
					action : 'addfctblstate'
				},
				success : function(response){
					$("#fctblstatesform .lx-submit a").attr("class","");
					$("#fctblstatesform .lx-submit a i").remove();
					$(".lx-popup-content > a > .material-icons").trigger("click");
					loadFCTBLStates("1");
					$(".lx-floating-response").remove();
					window.clearTimeout(timer);
					$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Etat enregistré<i class="material-icons">close</i></p></div>');
					$(".lx-floating-response").fadeIn();
					timer = window.setTimeout(function(){
						$(".lx-floating-response").fadeOut();
					},5000);
				}
			});
		}
	}
	else{
		$("#fctblstatesform .lx-submit a i").remove();
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez remplir les champs en rouge !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

$("body").delegate(".lx-trash-fctblstates","click",function(){
	filterClicked = "yes";
	loadFCTBLStates("0");
	$(".lx-pagination ul").attr("data-state","0");
});

$("body").delegate(".lx-published-fctblstates","click",function(){
	filterClicked = "yes";
	loadFCTBLStates("1");
	$(".lx-pagination ul").attr("data-state","1");
});

$("body").delegate(".lx-delete-fctblstate","click",function(){
	$(".lx-delete-record").attr("data-id",$(this).attr("data-id"));
});

$("body").delegate(".lx-restore-fctblstate","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'restorefctblstate'
		},
		success : function(response){
			loadFCTBLStates("0");
		}
	});
});

$("body").delegate(".lx-delete-permanently-fctblstate","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'deletefctblstatepermanently'
		},
		success : function(response){
			loadFCTBLStates("0");
		}
	});
});

function loadFCTBLStates(state){
	if($(".lx-table-fctblstates .lx-loading").length === 0){
		$(".lx-table-fctblstates").prepend('<div class="lx-loading" style="padding:10px;text-align:center;"><p>Please wait ...<br /><i class="fa fa-circle-notch fa-spin"></i></p></div>');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			action : 'loadfctblstates'
		},
		success : function(response){
			$(".lx-table-fctblstates .lx-loading").remove();
			$(".lx-table-fctblstates").html(response);
			if(filterClicked === 'yes'){
				initPagination();
			}
		}
	});
}

$(".lx-new-city").on("click",function(){
	$("#citiesform input[name='city']").val("");
	$("#citiesform input[name='id']").val("0");
});

$("body").delegate(".lx-edit-city","click",function(){
	$("#citiesform input[name='city']").val($(this).attr("data-city"));
	$("#citiesform input[name='id']").val($(this).attr("data-id"));
});

$("#citiesform .lx-submit a").on("click",function(){
	isNotEmpty($("#citiesform input[name='city']"));
	if(isNotEmpty($("#citiesform input[name='city']"))){
		if($(this).attr("class") !== "lx-disabled"){
			$(this).attr("class","lx-disabled");
			if($(this).find("i").length === 0){
				$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
			}
			var ajaxurl = "ajax.php";
			$.ajax({
				url : ajaxurl,
				type : 'post',
				data : {
					id : $("#citiesform input[name='id']").val(),
					city : $("#citiesform input[name='city']").val(),
					action : 'addcity'
				},
				success : function(response){
					$("#citiesform .lx-submit a").attr("class","");
					$("#citiesform .lx-submit a i").remove();
					$(".lx-popup-content > a > .material-icons").trigger("click");
					loadCities("1");
					$(".lx-floating-response").remove();
					window.clearTimeout(timer);
					$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Etat enregistré<i class="material-icons">close</i></p></div>');
					$(".lx-floating-response").fadeIn();
					timer = window.setTimeout(function(){
						$(".lx-floating-response").fadeOut();
					},5000);
				}
			});
		}
	}
	else{
		$("#citiesform .lx-submit a i").remove();
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez remplir les champs en rouge !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

$("body").delegate(".lx-trash-cities","click",function(){
	filterClicked = "yes";
	loadCities("0");
	$(".lx-pagination ul").attr("data-state","0");
});

$("body").delegate(".lx-published-cities","click",function(){
	filterClicked = "yes";
	loadCities("1");
	$(".lx-pagination ul").attr("data-state","1");
});

$("body").delegate(".lx-delete-city","click",function(){
	$(".lx-delete-record").attr("data-id",$(this).attr("data-id"));
});

$("body").delegate(".lx-restore-city","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'restorecity'
		},
		success : function(response){
			loadCities("0");
		}
	});
});

$("body").delegate(".lx-delete-permanently-city","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'deletecitypermanently'
		},
		success : function(response){
			loadCities("0");
		}
	});
});

function loadCities(state){
	if($(".lx-table-cities .lx-loading").length === 0){
		$(".lx-table-cities").prepend('<div class="lx-loading" style="padding:10px;text-align:center;"><p>Please wait ...<br /><i class="fa fa-circle-notch fa-spin"></i></p></div>');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			state : state,
			keyword : $("#keyword").val(),
			start : $(".lx-pagination ul").attr("data-start"),
			nbpage : $(".lx-pagination ul").attr("data-nbpage"),
			sortby : $(".lx-keyword input[name='sortby']").val(),
			orderby : $(".lx-keyword input[name='orderby']").val(),
			action : 'loadcities'
		},
		success : function(response){
			$(".lx-table-cities .lx-loading").remove();
			$(".lx-table-cities").html(response);
			if(filterClicked === 'yes'){
				initPagination();
			}
		}
	});
}

$(".lx-new-pack").on("click",function(){
	$("#packsform input[name='title']").val("");
	$("#packsform input[name='discount']").val("");
	$("#packsform input[name='id']").val("0");
});

$("body").delegate(".lx-edit-pack","click",function(){
	$("#packsform input[name='title']").val($(this).attr("data-titl"));
	$("#packsform input[name='discount']").val($(this).attr("data-discount"));
	$("#packsform input[name='id']").val($(this).attr("data-id"));
});

$("#packsform .lx-submit a").on("click",function(){
	isNotEmpty($("#packsform input[name='title']"));
	isNumber($("#packsform input[name='discount']"));
	if(isNotEmpty($("#packsform input[name='title']"))
	&& isNumber($("#packsform input[name='discount']"))){
		if($(this).attr("class") !== "lx-disabled"){
			$(this).attr("class","lx-disabled");
			if($(this).find("i").length === 0){
				$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
			}
			var ajaxurl = "ajax.php";
			$.ajax({
				url : ajaxurl,
				type : 'post',
				data : {
					id : $("#packsform input[name='id']").val(),
					title : $("#packsform input[name='title']").val(),
					discount : $("#packsform input[name='discount']").val(),
					action : 'addpack'
				},
				success : function(response){
					$("#packsform .lx-submit a").attr("class","");
					$("#packsform .lx-submit a i").remove();
					$(".lx-popup-content > a > .material-icons").trigger("click");
					loadPacks("1");
					$(".lx-floating-response").remove();
					window.clearTimeout(timer);
					$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Etat enregistré<i class="material-icons">close</i></p></div>');
					$(".lx-floating-response").fadeIn();
					timer = window.setTimeout(function(){
						$(".lx-floating-response").fadeOut();
					},5000);
				}
			});
		}
	}
	else{
		$("#packsform .lx-submit a i").remove();
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez remplir les champs en rouge !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

$("body").delegate(".lx-trash-packs","click",function(){
	filterClicked = "yes";
	loadPacks("0");
	$(".lx-pagination ul").attr("data-state","0");
});

$("body").delegate(".lx-published-packs","click",function(){
	filterClicked = "yes";
	loadPacks("1");
	$(".lx-pagination ul").attr("data-state","1");
});

$("body").delegate(".lx-delete-pack","click",function(){
	$(".lx-delete-record").attr("data-id",$(this).attr("data-id"));
});

$("body").delegate(".lx-restore-pack","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'restorepack'
		},
		success : function(response){
			loadPacks("0");
		}
	});
});

$("body").delegate(".lx-delete-permanently-pack","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'deletepackpermanently'
		},
		success : function(response){
			loadPacks("0");
		}
	});
});

function loadPacks(state){
	if($(".lx-table-packs .lx-loading").length === 0){
		$(".lx-table-packs").prepend('<div class="lx-loading" style="padding:10px;text-align:center;"><p>Please wait ...<br /><i class="fa fa-circle-notch fa-spin"></i></p></div>');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			state : state,
			keyword : $("#keyword").val(),
			start : $(".lx-pagination ul").attr("data-start"),
			nbpage : $(".lx-pagination ul").attr("data-nbpage"),
			sortby : $(".lx-keyword input[name='sortby']").val(),
			orderby : $(".lx-keyword input[name='orderby']").val(),
			action : 'loadpacks'
		},
		success : function(response){
			$(".lx-table-packs .lx-loading").remove();
			$(".lx-table-packs").html(response);
			if(filterClicked === 'yes'){
				initPagination();
			}
		}
	});
}

$(".lx-new-notice").on("click",function(){
	$("#noticesform select[name='client']").val("");
	$("#noticesform select[name='type']").val("");
	$("#noticesform textarea[name='message']").val("");
	$("#noticesform input[name='id']").val("0");
});

$("body").delegate(".lx-edit-notice","click",function(){
	$("#noticesform select[name='client']").val($(this).attr("data-client"));
	$("#noticesform select[name='type']").val($(this).attr("data-type"));
	$("#noticesform textarea[name='message']").val($(this).attr("data-message"));
	$("#noticesform input[name='id']").val($(this).attr("data-id"));
});

$("#noticesform .lx-submit a").on("click",function(){
	isNotEmpty($("#noticesform select[name='type']"));
	isNotEmpty($("#noticesform textarea[name='message']"));
	if(isNotEmpty($("#noticesform select[name='type']")) 
	&& isNotEmpty($("#noticesform textarea[name='message']"))){
		if($(this).attr("class") !== "lx-disabled"){
			$(this).attr("class","lx-disabled");
			if($(this).find("i").length === 0){
				$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
			}
			var ajaxurl = "ajax.php";
			$.ajax({
				url : ajaxurl,
				type : 'post',
				data : {
					id : $("#noticesform input[name='id']").val(),
					client : $("#noticesform select[name='client']").val(),
					type : $("#noticesform select[name='type']").val(),
					message : $("#noticesform textarea[name='message']").val(),
					action : 'addnotice'
				},
				success : function(response){
					$("#noticesform .lx-submit a").attr("class","");
					$("#noticesform .lx-submit a i").remove();
					$(".lx-popup-content > a > .material-icons").trigger("click");
					loadNotices("1");
					$(".lx-floating-response").remove();
					window.clearTimeout(timer);
					$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Etat enregistré<i class="material-icons">close</i></p></div>');
					$(".lx-floating-response").fadeIn();
					timer = window.setTimeout(function(){
						$(".lx-floating-response").fadeOut();
					},5000);
				}
			});
		}
	}
	else{
		$("#noticesform .lx-submit a i").remove();
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez remplir les champs en rouge !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

$("body").delegate(".lx-trash-notices","click",function(){
	filterClicked = "yes";
	loadNotices("0");
	$(".lx-pagination ul").attr("data-state","0");
});

$("body").delegate(".lx-published-notices","click",function(){
	filterClicked = "yes";
	loadNotices("1");
	$(".lx-pagination ul").attr("data-state","1");
});

$("body").delegate(".lx-delete-notice","click",function(){
	$(".lx-delete-record").attr("data-id",$(this).attr("data-id"));
});

$("body").delegate(".lx-restore-notice","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'restorenotice'
		},
		success : function(response){
			loadNotices("0");
		}
	});
});

$("body").delegate(".lx-delete-permanently-notice","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'deletenoticepermanently'
		},
		success : function(response){
			loadNotices("0");
		}
	});
});

function loadNotices(state){
	if($(".lx-table-notices .lx-loading").length === 0){
		$(".lx-table-notices").prepend('<div class="lx-loading" style="padding:10px;text-align:center;"><p>Please wait ...<br /><i class="fa fa-circle-notch fa-spin"></i></p></div>');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			state : state,
			keyword : $("#keyword").val(),
			client : $("#client").val(),
			datestart : $(".lx-keyword #datestart").val(),
			dateend : $(".lx-keyword #dateend").val(),	
			start : $(".lx-pagination ul").attr("data-start"),
			nbpage : $(".lx-pagination ul").attr("data-nbpage"),
			sortby : $(".lx-keyword input[name='sortby']").val(),
			orderby : $(".lx-keyword input[name='orderby']").val(),
			action : 'loadnotices'
		},
		success : function(response){
			$(".lx-table-notices .lx-loading").remove();
			$(".lx-table-notices").html(response);
			if(filterClicked === 'yes'){
				initPagination();
			}
		}
	});
}

$(".lx-new-reclamation").on("click",function(){
	$("#reclamationsform input[name='subject']").val("");
	$("#reclamationsform select[name='service']").val("");
	$("#reclamationsform input[name='code']").val("");
	$("#reclamationsform select[name='city']").val("");
	$("#reclamationsform textarea[name='message']").val("");
	$("#reclamationsform input[name='id']").val("0");
});

$("#reclamationsform .lx-submit a").on("click",function(){
	isNotEmpty($("#reclamationsform textarea[name='message']"));
	if(isNotEmpty($("#reclamationsform textarea[name='message']"))){
		if($(this).attr("class") !== "lx-disabled"){
			$(this).attr("class","lx-disabled");
			if($(this).find("i").length === 0){
				$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
			}
			var ajaxurl = "ajax.php";
			$.ajax({
				url : ajaxurl,
				type : 'post',
				data : {
					id : $("#reclamationsform input[name='id']").val(),
					subject : $("#reclamationsform input[name='subject']").val(),
					service : $("#reclamationsform select[name='service']").val(),
					code : $("#reclamationsform input[name='code']").val(),
					city : $("#reclamationsform select[name='city']").val(),
					message : $("#reclamationsform textarea[name='message']").val(),
					action : 'addreclamation'
				},
				success : function(response){
					$("#reclamationsform .lx-submit a").attr("class","");
					$("#reclamationsform .lx-submit a i").remove();
					$(".lx-popup-content > a > .material-icons").trigger("click");
					loadReclamations("1");
					$(".lx-floating-response").remove();
					window.clearTimeout(timer);
					$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Réclamation enregistré<i class="material-icons">close</i></p></div>');
					$(".lx-floating-response").fadeIn();
					timer = window.setTimeout(function(){
						$(".lx-floating-response").fadeOut();
					},5000);
				}
			});
		}
	}
	else{
		$("#reclamationsform .lx-submit a i").remove();
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez remplir les champs en rouge !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

$("body").delegate(".lx-add-reply","click",function(){
	$(".lx-message-reclamation").html($(this).attr("data-message"));
	$("#replyform textarea[name='message']").val("");
	$("#replyform input[name='id']").val($(this).attr("data-id"));
});

$("#replyform .lx-submit a").on("click",function(){
	isNotEmpty($("#replyform textarea[name='message']"));
	if(isNotEmpty($("#replyform textarea[name='message']"))){
		if($(this).attr("class") !== "lx-disabled"){
			$(this).attr("class","lx-disabled");
			if($(this).find("i").length === 0){
				$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
			}
			var ajaxurl = "ajax.php";
			$.ajax({
				url : ajaxurl,
				type : 'post',
				data : {
					id : $("#replyform input[name='id']").val(),
					message : $("#replyform textarea[name='message']").val(),
					action : 'addreply'
				},
				success : function(response){
					$("#replyform .lx-submit a").attr("class","");
					$("#replyform .lx-submit a i").remove();
					$(".lx-popup-content > a > .material-icons").trigger("click");
					loadReclamations("1");
					$(".lx-floating-response").remove();
					window.clearTimeout(timer);
					$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Réponse enregistré<i class="material-icons">close</i></p></div>');
					$(".lx-floating-response").fadeIn();
					timer = window.setTimeout(function(){
						$(".lx-floating-response").fadeOut();
					},5000);
				}
			});
		}
	}
	else{
		$("#replyform .lx-submit a i").remove();
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez remplir les champs en rouge !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

$("body").delegate(".lx-trash-reclamation","click",function(){
	filterClicked = "yes";
	loadReclamations("0");
	$(".lx-pagination ul").attr("data-state","0");
});

$("body").delegate(".lx-published-reclamation","click",function(){
	filterClicked = "yes";
	loadReclamations("1");
	$(".lx-pagination ul").attr("data-state","1");
});

$("body").delegate(".lx-delete-reclamation","click",function(){
	$(".lx-delete-record").attr("data-id",$(this).attr("data-id"));
});

$("body").delegate(".lx-restore-reclamation","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'restorereclamation'
		},
		success : function(response){
			loadReclamations("0");
		}
	});
});

$("body").delegate(".lx-delete-permanently-reclamation","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'deletereclamationpermanently'
		},
		success : function(response){
			loadReclamations("0");
		}
	});
});

function loadReclamations(state){
	if($(".lx-table-reclamations .lx-loading").length === 0){
		$(".lx-table-reclamations").prepend('<div class="lx-loading" style="padding:10px;text-align:center;"><p>Please wait ...<br /><i class="fa fa-circle-notch fa-spin"></i></p></div>');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			state : state,
			keyword : $("#keyword").val(),
			client : ($("#client").length)?$("#client").val():"",
			service : $("#service").val(),
			datestart : $(".lx-keyword #datestart").val(),
			dateend : $(".lx-keyword #dateend").val(),		
			start : $(".lx-pagination ul").attr("data-start"),
			nbpage : $(".lx-pagination ul").attr("data-nbpage"),
			sortby : $(".lx-keyword input[name='sortby']").val(),
			orderby : $(".lx-keyword input[name='orderby']").val(),
			action : 'loadreclamations'
		},
		success : function(response){
			$(".lx-table-reclamations .lx-loading").remove();
			$(".lx-table-reclamations").html(response);
			if(filterClicked === 'yes'){
				initPagination();
			}
		}
	});
}

$(".lx-new-contact").on("click",function(){
	$("#contactsform select[name='moderator']").val("");
	$("#contactsform input[name='fullname']").val("");
	$("#contactsform input[name='phone']").val("");
	$("#contactsform input[name='service']").val("");
	$("#contactsform input[name='color']").val("");
	$("#contactsform input[name='id']").val("0");
});

$("body").delegate(".lx-edit-contact","click",function(){
	$("#contactsform select[name='moderator']").val($(this).attr("data-moderator"));
	$("#contactsform input[name='fullname']").val($(this).attr("data-fullname"));
	$("#contactsform input[name='phone']").val($(this).attr("data-phone"));
	$("#contactsform input[name='service']").val($(this).attr("data-service"));
	$("#contactsform input[name='color']").val($(this).attr("data-color"));
	$("#contactsform input[name='id']").val($(this).attr("data-id"));
});

$("#contactsform .lx-submit a").on("click",function(){
	isNotEmpty($("#contactsform select[name='moderator']"));
	isNotEmpty($("#contactsform input[name='fullname']"));
	isPhone($("#contactsform input[name='phone']"));
	isNotEmpty($("#contactsform input[name='service']"));
	if(isNotEmpty($("#contactsform select[name='moderator']"))
	&& isNotEmpty($("#contactsform input[name='fullname']"))
	&& isPhone($("#contactsform input[name='phone']"))
	&& isNotEmpty($("#contactsform input[name='service']"))){
		if($(this).attr("class") !== "lx-disabled"){
			$(this).attr("class","lx-disabled");
			if($(this).find("i").length === 0){
				$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
			}
			var ajaxurl = "ajax.php";
			$.ajax({
				url : ajaxurl,
				type : 'post',
				data : {
					id : $("#contactsform input[name='id']").val(),
					moderator : $("#contactsform select[name='moderator']").val(),
					fullname : $("#contactsform input[name='fullname']").val(),
					phone : $("#contactsform input[name='phone']").val(),
					service : $("#contactsform input[name='service']").val(),
					color : $("#contactsform input[name='color']").val(),
					action : 'addcontact'
				},
				success : function(response){
					$("#contactsform .lx-submit a").attr("class","");
					$("#contactsform .lx-submit a i").remove();
					$(".lx-popup-content > a > .material-icons").trigger("click");
					loadContacts("1");
					$(".lx-floating-response").remove();
					window.clearTimeout(timer);
					$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Contact enregistré<i class="material-icons">close</i></p></div>');
					$(".lx-floating-response").fadeIn();
					timer = window.setTimeout(function(){
						$(".lx-floating-response").fadeOut();
					},5000);
				}
			});
		}
	}
	else{
		$("#contactsform .lx-submit a i").remove();
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez remplir les champs en rouge !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

$("body").delegate(".lx-trash-contact","click",function(){
	filterClicked = "yes";
	loadContacts("0");
	$(".lx-pagination ul").attr("data-state","0");
});

$("body").delegate(".lx-published-contact","click",function(){
	filterClicked = "yes";
	loadContacts("1");
	$(".lx-pagination ul").attr("data-state","1");
});

$("body").delegate(".lx-delete-contact","click",function(){
	$(".lx-delete-record").attr("data-id",$(this).attr("data-id"));
});

$("body").delegate(".lx-restore-contact","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'restorecontact'
		},
		success : function(response){
			loadContacts("0");
		}
	});
});

$("body").delegate(".lx-delete-permanently-contact","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'deletecontactpermanently'
		},
		success : function(response){
			loadContacts("0");
		}
	});
});

function loadContacts(state){
	if($(".lx-table-contacts .lx-loading").length === 0){
		$(".lx-table-contacts").prepend('<div class="lx-loading" style="padding:10px;text-align:center;"><p>Please wait ...<br /><i class="fa fa-circle-notch fa-spin"></i></p></div>');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			action : 'loadcontacts'
		},
		success : function(response){
			$(".lx-table-contacts .lx-loading").remove();
			$(".lx-table-contacts").html(response);
			if(filterClicked === 'yes'){
				initPagination();
			}
		}
	});
}

$(".lx-new-collector").on("click",function(){
	$("#collectorsform input[name='fullname']").val("");
	$("#collectorsform input[name='phone']").val("");
	$("#collectorsform input[name='zone']").val("");
	$("#collectorsform input[name='color']").val("");
	$("#collectorsform input[name='id']").val("0");
});

$("body").delegate(".lx-edit-collector","click",function(){
	$("#collectorsform input[name='fullname']").val($(this).attr("data-fullname"));
	$("#collectorsform input[name='phone']").val($(this).attr("data-phone"));
	$("#collectorsform input[name='zone']").val($(this).attr("data-zone"));
	$("#collectorsform input[name='color']").val($(this).attr("data-color"));
	$("#collectorsform input[name='id']").val($(this).attr("data-id"));
});

$("#collectorsform .lx-submit a").on("click",function(){
	isNotEmpty($("#collectorsform input[name='fullname']"));
	isPhone($("#collectorsform input[name='phone']"));
	isNotEmpty($("#collectorsform input[name='zone']"));
	if(isNotEmpty($("#collectorsform input[name='fullname']"))
	&& isPhone($("#collectorsform input[name='phone']"))
	&& isNotEmpty($("#collectorsform input[name='zone']"))){
		if($(this).attr("class") !== "lx-disabled"){
			$(this).attr("class","lx-disabled");
			if($(this).find("i").length === 0){
				$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
			}
			var ajaxurl = "ajax.php";
			$.ajax({
				url : ajaxurl,
				type : 'post',
				data : {
					id : $("#collectorsform input[name='id']").val(),
					fullname : $("#collectorsform input[name='fullname']").val(),
					phone : $("#collectorsform input[name='phone']").val(),
					zone : $("#collectorsform input[name='zone']").val(),
					color : $("#collectorsform input[name='color']").val(),
					action : 'addcollector'
				},
				success : function(response){
					console.log(response);
					$("#collectorsform .lx-submit a").attr("class","");
					$("#collectorsform .lx-submit a i").remove();
					$(".lx-popup-content > a > .material-icons").trigger("click");
					loadCollectors("1");
					$(".lx-floating-response").remove();
					window.clearTimeout(timer);
					$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Collector enregistré<i class="material-icons">close</i></p></div>');
					$(".lx-floating-response").fadeIn();
					timer = window.setTimeout(function(){
						$(".lx-floating-response").fadeOut();
					},5000);
				}
			});
		}
	}
	else{
		$("#collectorsform .lx-submit a i").remove();
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez remplir les champs en rouge !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

$("body").delegate(".lx-trash-collector","click",function(){
	filterClicked = "yes";
	loadCollectors("0");
	$(".lx-pagination ul").attr("data-state","0");
});

$("body").delegate(".lx-published-collector","click",function(){
	filterClicked = "yes";
	loadCollectors("1");
	$(".lx-pagination ul").attr("data-state","1");
});

$("body").delegate(".lx-delete-collector","click",function(){
	$(".lx-delete-record").attr("data-id",$(this).attr("data-id"));
});

$("body").delegate(".lx-restore-collector","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'restorecollector'
		},
		success : function(response){
			loadCollectors("0");
		}
	});
});

$("body").delegate(".lx-delete-permanently-collector","click",function(){
	var id = $(this).attr("data-id");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : 'deletecollectorpermanently'
		},
		success : function(response){
			loadCollectors("0");
		}
	});
});

function loadCollectors(state){
	if($(".lx-table-collectors .lx-loading").length === 0){
		$(".lx-table-collectors").prepend('<div class="lx-loading" style="padding:10px;text-align:center;"><p>Please wait ...<br /><i class="fa fa-circle-notch fa-spin"></i></p></div>');
	}
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			action : 'loadcollectors'
		},
		success : function(response){
			$(".lx-table-collectors .lx-loading").remove();
			$(".lx-table-collectors").html(response);
			if(filterClicked === 'yes'){
				initPagination();
			}
		}
	});
}

$("body").delegate(".lx-on-off","click",function(){
	if($(this).attr("data-state") !== "off"){
		$(this).removeClass("lx-on-off-blue");
		$(this).attr("data-state","off");
		changeState($(this).attr("data-table"),$(this).attr("data-column"),$(this).attr("data-id"),"off");
	}
	else{
		$(this).addClass("lx-on-off-blue");
		$(this).attr("data-state","on");
		changeState($(this).attr("data-table"),$(this).attr("data-column"),$(this).attr("data-id"),"on");
	}
});

function changeState(table,column,id,state){
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			table : table,
			column : column,
			id : id,
			state : state,
			action : 'changestate'
		},
		success : function(response){

		}
	});
}

$(".lx-cancel-delete").on("click",function(){
	$(".lx-popup-content > a > .material-icons").trigger("click");
});

$(".lx-delete-record").on("click",function(){
	var id = $(this).attr("data-id");
	var action = $(this).attr("data-action");
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : id,
			action : action
		},
		success : function(response){
			$(".lx-popup-content > a > .material-icons").trigger("click");
			if($(".lx-pagination ul").attr("data-table") === "moderators"){
				loadModerators($(".lx-pagination ul").attr("data-state"));
			}
			if($(".lx-pagination ul").attr("data-table") === "dlm"){
				loadDLM($(".lx-pagination ul").attr("data-state"));
			}
			if($(".lx-pagination ul").attr("data-table") === "shippingfees"){
				loadShippingFees($(".lx-pagination ul").attr("data-state"));
			}
			if($(".lx-pagination ul").attr("data-table") === "clients"){
				loadClients($(".lx-pagination ul").attr("data-state"));
			}
			if($(".lx-pagination ul").attr("data-table") === "clientfees"){
				loadClientFees($(".lx-pagination ul").attr("data-state"));
			}
			if($(".lx-pagination ul").attr("data-table") === "workers"){
				loadWorkers($(".lx-pagination ul").attr("data-state"));
			}
			if($(".lx-pagination ul").attr("data-table") === "products"){
				loadProducts($(".lx-pagination ul").attr("data-state"));
			}
			if($(".lx-pagination ul").attr("data-table") === "shipments"){
				loadShipments($(".lx-pagination ul").attr("data-state"));
			}
			if($(".lx-pagination ul").attr("data-table") === "stocks"){
				loadStocks($(".lx-pagination ul").attr("data-state"));
			}
			if($(".lx-pagination ul").attr("data-table") === "ramassages"){
				if(response === ""){
					loadRamassages($(".lx-pagination ul").attr("data-state"));
				}
				else{
					$(".lx-floating-response").remove();
					window.clearTimeout(timer);
					$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> '+response+'<i class="material-icons">close</i></p></div>');
					$(".lx-floating-response").fadeIn();
					timer = window.setTimeout(function(){
						$(".lx-floating-response").fadeOut();
					},5000);
				}
			}
			if($(".lx-pagination ul").attr("data-table") === "colis"){
				loadColis($(".lx-pagination ul").attr("data-state"));
			}
			if($(".lx-pagination ul").attr("data-table") === "colisu"){
				loadColisU($(".lx-pagination ul").attr("data-state"));
			}	
			if($(".lx-pagination ul").attr("data-table") === "colisr"){
				loadColisR($(".lx-pagination ul").attr("data-state"));
			}
			if($(".lx-pagination ul").attr("data-table") === "bls"){
				if(response === ""){
					loadBLS($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
				}
				else{
					$(".lx-floating-response").remove();
					window.clearTimeout(timer);
					$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> '+response+'<i class="material-icons">close</i></p></div>');
					$(".lx-floating-response").fadeIn();
					timer = window.setTimeout(function(){
						$(".lx-floating-response").fadeOut();
					},5000);
				}
			}
			if($(".lx-pagination ul").attr("data-table") === "factures"){
				loadFactures($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
			}
			if($(".lx-pagination ul").attr("data-table") === "payouts"){
				loadPayouts($(".lx-pagination ul").attr("data-state"));
			}
			if($(".lx-pagination ul").attr("data-table") === "trackingstates"){
				loadTrackingstates($(".lx-pagination ul").attr("data-state"));
			}
			if($(".lx-pagination ul").attr("data-table") === "cities"){
				loadCities($(".lx-pagination ul").attr("data-state"));
			}
			if($(".lx-pagination ul").attr("data-table") === "notices"){
				loadNotices($(".lx-pagination ul").attr("data-state"));
			}
			if($(".lx-pagination ul").attr("data-table") === "reclamations"){
				loadReclamations($(".lx-pagination ul").attr("data-state"));
			}
			if($(".lx-pagination ul").attr("data-table") === "contacts"){
				loadContacts($(".lx-pagination ul").attr("data-state"));
			}
		}
	});
});

$(".lx-search-keyword").on("click",function(){
	filterClicked = "yes";
	if($(".lx-pagination ul").attr("data-table") === "moderators"){
		loadModerators($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "dlm"){
		loadDLM($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "shippingfees"){
		loadShippingFees($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "clients"){
		loadClients($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "clientfees"){
		loadClientFees($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "workers"){
		loadWorkers($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "products"){
		loadProducts($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "shipments"){
		loadShipments($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "stocks"){
		loadStocks($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "ramassages"){
		loadRamassages($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "colis"){
		loadColis($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "colisu"){
		loadColisU($(".lx-pagination ul").attr("data-state"));
	}	
	if($(".lx-pagination ul").attr("data-table") === "colisr"){
		loadColisR($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "bls"){
		loadBLS($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
	}
	if($(".lx-pagination ul").attr("data-table") === "factures"){
		loadFactures($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
	}
	if($(".lx-pagination ul").attr("data-table") === "payouts"){
		loadPayouts($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "trackingstates"){
		loadTrackingstates($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "cities"){
		loadCities($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "notices"){
		loadNotices($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-table-coliserrors").length){
		loadColisErrors();
	}
	if($(".lx-pagination ul").attr("data-table") === "reclamations"){
		loadReclamations($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "contacts"){
		loadContacts($(".lx-pagination ul").attr("data-state"));
	}
});

$(".lx-search-keyword2").on("click",function(){
	filterClicked = "yes";
	if($(".lx-pagination ul").attr("data-table") === "bls"){
		$(".lx-table-bls-colis table tr[data-code]").each(function(){
			if($("#keyword2").val() !== ""){
				var regex = new RegExp($("#keyword2").val());
				if(regex.test($(this).attr("data-code")) || regex.test($(this).attr("data-phone")) || regex.test($(this).attr("data-fullname"))
					|| regex.test($(this).attr("data-address")) || regex.test($(this).attr("data-city"))){
					$(this).show();
				}
				else{
					$(this).hide();
				}
			}
			else{
				$(this).show();
			}
		});
	}
	if($(".lx-pagination ul").attr("data-table") === "factures"){
		$(".lx-table-factures-colis table tr[data-code]").each(function(){
			if($("#keyword2").val() !== ""){
				var regex = new RegExp($("#keyword2").val());
				if(regex.test($(this).attr("data-code")) || regex.test($(this).attr("data-phone")) || regex.test($(this).attr("data-fullname"))
					|| regex.test($(this).attr("data-address")) || regex.test($(this).attr("data-city"))){
					$(this).show();
				}
				else{
					$(this).hide();
				}
			}
			else{
				$(this).show();
			}
		});
	}
});

$("#dlm,#client,#city,#product,#service,#fc,#received,#bank,#paid,#pack").on("change",function(){
	filterClicked = "yes";
	if($("#salescontainer").length){
		loadChartData();
	}
	if($(".lx-pagination ul").attr("data-table") === "moderators"){
		loadModerators($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "dlm"){
		loadDLM($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "shippingfees"){
		loadShippingFees($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "clients"){
		loadClients($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "clientfees"){
		loadClientFees($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "workers"){
		loadWorkers($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "products"){
		loadProducts($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "shipments"){
		loadShipments($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "stocks"){
		loadStocks($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "ramassages"){
		loadRamassages($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "colis"){
		loadColis($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "colisu"){
		loadColisU($(".lx-pagination ul").attr("data-state"));
	}	
	if($(".lx-pagination ul").attr("data-table") === "colisr"){
		loadColisR($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "bls"){
		loadBLS($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
	}
	if($(".lx-pagination ul").attr("data-table") === "factures"){
		loadFactures($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
	}
	if($(".lx-pagination ul").attr("data-table") === "payouts"){
		loadPayouts($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "trackingstates"){
		loadTrackingstates($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "cities"){
		loadCities($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "notices"){
		loadNotices($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "reclamations"){
		loadReclamations($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "contacts"){
		loadContacts($(".lx-pagination ul").attr("data-state"));
	}
});

$("#dlm2,#client2,#city2").on("change",function(){
	filterClicked = "yes";
	if($(".lx-pagination ul").attr("data-table") === "bls"){
		loadBLSColis($(".lx-pagination ul").attr("data-type"),$(".lx-colis-tabs a.active").attr("data-action"));
	}
	if($(".lx-pagination ul").attr("data-table") === "factures"){
		loadFacturesColis($(".lx-pagination ul").attr("data-type"),$(".lx-colis-tabs a.active").attr("data-action"));
	}
});

$("#dlmstats").on("change",function(){
	window.location.href = "dlmstats.php?dlm="+$(this).val();
});

$("body").delegate(".lx-first-tr td i","click",function(){
	$(".lx-keyword input[name='sortby']").val($(this).attr("data-sort"));
	filterClicked = "yes";
	if($(".lx-pagination ul").attr("data-table") === "moderators"){
		loadModerators($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "dlm"){
		loadDLM($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "shippingfees"){
		loadShippingFees($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "clients"){
		loadClients($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "clientfees"){
		loadClientFees($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "workers"){
		loadWorkers($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "products"){
		loadProducts($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "shipments"){
		loadShipments($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "stocks"){
		loadStocks($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "ramassages"){
		loadRamassages($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "colis"){
		loadColis($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "colisu"){
		loadColisU($(".lx-pagination ul").attr("data-state"));
	}	
	if($(".lx-pagination ul").attr("data-table") === "colisr"){
		loadColisR($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "bls"){
		loadBLS($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
	}
	if($(".lx-pagination ul").attr("data-table") === "factures"){
		loadFactures($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
	}
	if($(".lx-pagination ul").attr("data-table") === "payouts"){
		loadPayouts($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "trackingstates"){
		loadTrackingstates($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "cities"){
		loadCities($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "notices"){
		loadNotices($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "reclamations"){
		loadReclamations($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "contacts"){
		loadContacts($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-keyword input[name='orderby']").val() === "DESC"){
		$(".lx-keyword input[name='orderby']").val("ASC");
	}
	else{
		$(".lx-keyword input[name='orderby']").val("DESC");
	}
});

function initPagination(){
	filterClicked = 'no';
	if(parseInt($("#posts").val()) > parseInt($(".lx-pagination ul").attr("data-nbpage"))){
		$(".lx-pagination").css("display","block");
		$(".lx-pagination ul").attr("data-start",0);
		$(".lx-pagination ul").attr("data-posts",$("#posts").val());
		$(".lx-pagination ul li ins").text("1");
		var nbpage = Math.ceil(parseInt($("#posts").val()) / parseInt($(".lx-pagination ul").attr("data-nbpage")))
		$(".lx-pagination ul li abbr").text(nbpage);
		$(".lx-pagination ul li .next").removeClass("disabled");
		$(".lx-pagination ul li .previous").removeClass("disabled");
		$(".lx-pagination ul li .previous").addClass("disabled");
		$("#pgnumber option").remove();
		for(var i=0;i<nbpage;i++){
			$("#pgnumber").append('<option value="'+i+'">'+(i+1)+'</option>');
		}
	}
	else{
		$(".lx-pagination").css("display","none");
	}
}

$(".lx-pagination ul li .next").on("click",function(){
	filterClicked = 'no';
	var start = parseInt($(".lx-pagination ul").attr("data-start"));
	var nbpage = parseInt($(".lx-pagination ul").attr("data-nbpage"));
	var posts = parseInt($(".lx-pagination ul").attr("data-posts"));
	if((start + nbpage) < posts){
		if((start + (nbpage * 2)) >= posts){
			$(this).addClass("disabled");
		}
		$(".lx-pagination ul li .previous").removeClass("disabled");
		$(".lx-pagination ul").attr("data-start",(start+nbpage));
		$(".lx-pagination ul li span ins").text((start+(nbpage*2))/nbpage);
		$(".lx-pagination ul li #pgnumber").val(parseInt($(".lx-pagination ul li span ins").text()) - 1);
		if($(".lx-pagination ul").attr("data-table") === "moderators"){
			loadModerators($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "dlm"){
			loadDLM($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "shippingfees"){
			loadShippingFees($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "clients"){
			loadClients($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "clientfees"){
			loadClientFees($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "workers"){
			loadWorkers($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "products"){
			loadProducts($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "shipments"){
			loadShipments($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "stocks"){
			loadStocks($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "ramassages"){
			loadRamassages($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "colis"){
			loadColis($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "colisu"){
			loadColisU($(".lx-pagination ul").attr("data-state"));
		}	
		if($(".lx-pagination ul").attr("data-table") === "colisr"){
			loadColisR($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "bls"){
			loadBLS($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
		}
		if($(".lx-pagination ul").attr("data-table") === "factures"){
			loadFactures($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
		}
		if($(".lx-pagination ul").attr("data-table") === "payouts"){
			loadPayouts($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "trackingstates"){
			loadTrackingstates($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "cities"){
			loadCities($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "notices"){
			loadNotices($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "reclamations"){
			loadReclamations($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "contacts"){
			loadContacts($(".lx-pagination ul").attr("data-state"));
		}
		$('html, body').animate({
			scrollTop: $(".lx-main-content").offset().top
		}, 1000);
	}
});

$(".lx-pagination ul li .previous").on("click",function(){
	filterClicked = 'no';
	var start = parseInt($(".lx-pagination ul").attr("data-start"));
	var nbpage = parseInt($(".lx-pagination ul").attr("data-nbpage"));
	var posts = parseInt($(".lx-pagination ul").attr("data-posts"));
	if(start > 0){
		if((start - nbpage) === 0){
			$(this).addClass("disabled");
		}
		$(".lx-pagination ul li .next").removeClass("disabled");
		$(".lx-pagination ul").attr("data-start",(start-nbpage));
		$(".lx-pagination ul li span ins").text(start/nbpage);
		$(".lx-pagination ul li #pgnumber").val(parseInt($(".lx-pagination ul li span ins").text()) - 1);
		if($(".lx-pagination ul").attr("data-table") === "moderators"){
			loadModerators($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "dlm"){
			loadDLM($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "shippingfees"){
			loadShippingFees($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "clients"){
			loadClients($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "clientfees"){
			loadClientFees($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "workers"){
			loadWorkers($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "products"){
			loadProducts($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "shipments"){
			loadShipments($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "stocks"){
			loadStocks($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "ramassages"){
			loadRamassages($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "colis"){
			loadColis($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "colisu"){
			loadColisU($(".lx-pagination ul").attr("data-state"));
		}	
		if($(".lx-pagination ul").attr("data-table") === "colisr"){
			loadColisR($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "bls"){
			loadBLS($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
		}
		if($(".lx-pagination ul").attr("data-table") === "factures"){
			loadFactures($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
		}
		if($(".lx-pagination ul").attr("data-table") === "payouts"){
			loadPayouts($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "trackingstates"){
			loadTrackingstates($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "cities"){
			loadCities($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "notices"){
			loadNotices($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "reclamations"){
			loadReclamations($(".lx-pagination ul").attr("data-state"));
		}
		if($(".lx-pagination ul").attr("data-table") === "contacts"){
			loadContacts($(".lx-pagination ul").attr("data-state"));
		}
		$('html, body').animate({
			scrollTop: $(".lx-main-content").offset().top
		}, 1000);
	}
});

$("#pgnumber").on("change",function(){
	filterClicked = 'no';
	$(".lx-pagination ul").attr("data-start",parseInt($(".lx-pagination ul").attr("data-nbpage")) * $(this).val())
	$(".lx-pagination ul li span ins").text(parseInt($(this).val()) + 1);
	if((parseInt($(this).val()) + 1) >= (parseInt($(".lx-pagination ul").attr("data-posts")) / parseInt($(".lx-pagination ul").attr("data-nbpage")))){
		$(".lx-pagination ul li .previous").removeClass("disabled");
		$(".lx-pagination ul li .next").addClass("disabled");
	}
	else if(parseInt($(this).val() + 1) === 1 ){
		$(".lx-pagination ul li .previous").addClass("disabled");
		$(".lx-pagination ul li .next").removeClass("disabled");
	}
	else{
		$(".lx-pagination ul li .previous").removeClass("disabled");
		$(".lx-pagination ul li .next").removeClass("disabled");
	}
	if($(".lx-pagination ul").attr("data-table") === "moderators"){
		loadModerators($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "dlm"){
		loadDLM($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "shippingfees"){
		loadShippingFees($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "clients"){
		loadClients($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "clientfees"){
		loadClientFees($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "workers"){
		loadWorkers($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "products"){
		loadProducts($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "shipments"){
		loadShipments($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "stocks"){
		loadStocks($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "ramassages"){
		loadRamassages($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "colis"){
		loadColis($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "colisu"){
		loadColisU($(".lx-pagination ul").attr("data-state"));
	}	
	if($(".lx-pagination ul").attr("data-table") === "colisr"){
		loadColisR($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "bls"){
		loadBLS($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
	}
	if($(".lx-pagination ul").attr("data-table") === "factures"){
		loadFactures($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
	}
	if($(".lx-pagination ul").attr("data-table") === "payouts"){
		loadPayouts($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "trackingstates"){
		loadTrackingstates($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "cities"){
		loadCities($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "notices"){
		loadNotices($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "reclamations"){
		loadReclamations($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "contacts"){
		loadContacts($(".lx-pagination ul").attr("data-state"));
	}
	$('html, body').animate({
		scrollTop: $(".lx-main-content").offset().top
	}, 1000);
});

$("body").delegate(".lx-floating-response","click",function(){
	$(".lx-floating-response").fadeOut();
});

$("body").delegate(".lx-first-tr input[name='selectall']","click",function(){
	var checked = $(this).prop("checked");
	$(".lx-main .lx-table input[type='checkbox']").each(function(){
		$(this).prop("checked",checked)
	});
});

$(".lx-popup-content").delegate(".lx-first-tr input[name='selectall']","click",function(){
	var checked = $(this).prop("checked");
	$(".lx-popup .lx-table input[type='checkbox']").each(function(){
		$(this).prop("checked",checked)
	});
});

$(".lx-action-bulk a").on("click",function(){
	var ids = "0";
	$(".lx-main .lx-table input[type='checkbox']:checked").each(function(){
		if($(this).val() !== "selectall"){
			ids += "," + $(this).val();
		}
	});
	var table = $(".lx-pagination ul").attr("data-table");
	if($(".lx-pagination ul").attr("data-table") === "moderators"
	|| $(".lx-pagination ul").attr("data-table") === "dlm"
	|| $(".lx-pagination ul").attr("data-table") === "clients"
	|| $(".lx-pagination ul").attr("data-table") === "workers"){
		table = "users";
	}
	if($(".lx-pagination ul").attr("data-table") === "ramassages"){
		table = "colis";
	}
	var column = "id";
	if(ids !== "0" && $(".lx-action-bulk select[name='statebulk']").val() !== ""){
		var ajaxurl = "ajax.php";
		$.ajax({
			url : ajaxurl,
			type : 'post',
			data : {
				ids : ids,
				table : table,
				column : column,
				state : $(".lx-action-bulk select[name='statebulk']").val(),
				action : 'updatebulk'
			},
			success : function(response){
				if($(".lx-pagination ul").attr("data-table") === "moderators"){
					loadModerators($(".lx-pagination ul").attr("data-state"));
				}
				if($(".lx-pagination ul").attr("data-table") === "dlm"){
					loadDLM($(".lx-pagination ul").attr("data-state"));
				}
				if($(".lx-pagination ul").attr("data-table") === "shippingfees"){
					loadShippingFees($(".lx-pagination ul").attr("data-state"));
				}
				if($(".lx-pagination ul").attr("data-table") === "clients"){
					loadClients($(".lx-pagination ul").attr("data-state"));
				}
				if($(".lx-pagination ul").attr("data-table") === "clientfees"){
					loadClientFees($(".lx-pagination ul").attr("data-state"));
				}
				if($(".lx-pagination ul").attr("data-table") === "workers"){
					loadWorkers($(".lx-pagination ul").attr("data-state"));
				}
				if($(".lx-pagination ul").attr("data-table") === "products"){
					loadProducts($(".lx-pagination ul").attr("data-state"));
				}
				if($(".lx-pagination ul").attr("data-table") === "shipments"){
					loadShipments($(".lx-pagination ul").attr("data-state"));
				}
				if($(".lx-pagination ul").attr("data-table") === "stocks"){
					loadStocks($(".lx-pagination ul").attr("data-state"));
				}
				if($(".lx-pagination ul").attr("data-table") === "ramassages"){
					loadRamassages($(".lx-pagination ul").attr("data-state"));
				}
				if($(".lx-pagination ul").attr("data-table") === "colis"){
					loadColis($(".lx-pagination ul").attr("data-state"));
				}
				if($(".lx-pagination ul").attr("data-table") === "colisu"){
					loadColisU($(".lx-pagination ul").attr("data-state"));
				}	
				if($(".lx-pagination ul").attr("data-table") === "colisr"){
					loadColisR($(".lx-pagination ul").attr("data-state"));
				}
				if($(".lx-pagination ul").attr("data-table") === "bls"){
					loadBLS($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
				}
				if($(".lx-pagination ul").attr("data-table") === "factures"){
					loadFactures($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
				}
				if($(".lx-pagination ul").attr("data-table") === "payouts"){
					loadPayouts($(".lx-pagination ul").attr("data-state"));
				}
				if($(".lx-pagination ul").attr("data-table") === "trackingstates"){
					loadTrackingstates($(".lx-pagination ul").attr("data-state"));
				}
				if($(".lx-pagination ul").attr("data-table") === "cities"){
					loadCities($(".lx-pagination ul").attr("data-state"));
				}
				if($(".lx-pagination ul").attr("data-table") === "notices"){
					loadNotices($(".lx-pagination ul").attr("data-state"));
				}
				if($(".lx-pagination ul").attr("data-table") === "reclamations"){
					loadReclamations($(".lx-pagination ul").attr("data-state"));
				}
				if($(".lx-pagination ul").attr("data-table") === "contacts"){
					loadContacts($(".lx-pagination ul").attr("data-state"));
				}
			}
		});
	}
});

$(".lx-action-bulk select[name='nbrows']").on("change",function(){
	filterClicked = 'yes';
	$(".lx-pagination ul").attr("data-nbpage",$(this).val());
	if($(".lx-pagination ul").attr("data-table") === "moderators"){
		loadModerators($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "dlm"){
		loadDLM($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "shippingfees"){
		loadShippingFees($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "clients"){
		loadClients($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "clientfees"){
		loadClientFees($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "workers"){
		loadWorkers($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "products"){
		loadProducts($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "shipments"){
		loadShipments($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "stocks"){
		loadStocks($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "ramassages"){
		loadRamassages($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "colis"){
		loadColis($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "colisu"){
		loadColisU($(".lx-pagination ul").attr("data-state"));
	}	
	if($(".lx-pagination ul").attr("data-table") === "colisr"){
		loadColisR($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "bls"){
		loadBLS($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
	}
	if($(".lx-pagination ul").attr("data-table") === "factures"){
		loadFactures($(".lx-pagination ul").attr("data-state"),$(".lx-pagination ul").attr("data-type"));
	}
	if($(".lx-pagination ul").attr("data-table") === "payouts"){
		loadPayouts($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "trackingstates"){
		loadTrackingstates($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "cities"){
		loadCities($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "notices"){
		loadNotices($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "reclamations"){
		loadReclamations($(".lx-pagination ul").attr("data-state"));
	}
	if($(".lx-pagination ul").attr("data-table") === "contacts"){
		loadContacts($(".lx-pagination ul").attr("data-state"));
	}
});

var mover = "no";
$(document).mousemove(function(){
	if($(".lx-autocomplete:hover").length != 0){
		mover = "yes";
	} 
	else{
		mover = "no";
	}
});

$("body").mouseup(function (e){
	if($(".lx-autocomplete").length){
		var container = $(".lx-autocomplete");
		var inside = $(".lx-autocomplete *");
		if (!inside.is(e.target) && mover === "no"){
			container.hide();
		}
	}
	if($(".lx-advanced-select").length){
		var elToHide = $(".lx-advanced-select > div");
		var elPreventHide = $(".lx-advanced-select *");
		if (!elPreventHide.is(e.target)){
			elToHide.hide();
		}
	}
});

function isNotEmpty(el){
	var val = el.val();
	if(typeof el.attr("data-id") !== typeof undefined && el.attr("data-id") !== false){
		val = el.attr("data-id");
	}
	if(val === "" || val === "0:0:0"){
		if(el.parent().find("ins").length === 0){
			el.after("<ins>"+el.attr("data-message")+"</ins>");
			el.css("border-color","#d63232");
		}
		return false;
	}
	else{
		el.removeAttr("style");
		return true;
	}
}

$("*[data-isnotempty]").on("keyup blur paste",function(){
	if($(this).val() !== "" && $(this).parent().find("ins").length){
		$(this).parent().find("ins").remove();
		$(this).removeAttr("style");
	}
});

function isNumber(el){
	var regex = /^[0-9]+$/;
	if(!regex.test(el.val())){
		if(el.parent().find("ins").length === 0){
			el.after("<ins>"+el.attr("data-message")+"</ins>");
			el.css("border-color","#d63232");
		}
		return false;
	}
	else{
		el.removeAttr("style");
		return true;
	}
}

$("*[data-isnumber]").on("keyup blur paste",function(){
	var regex = /^[0-9]+$/;
	if(regex.test($(this).val()) && $(this).parent().find("ins").length){
		$(this).parent().find("ins").remove();
		$(this).removeAttr("style");
	}
});

function isPhone(el){
	var regex = /^0[0-9]{1}[0-9]{8}$/;
	if(!regex.test(el.val())){
		if(el.parent().find("ins").length === 0){
			el.after("<ins>"+el.attr("data-message")+"</ins>");
			el.css("border-color","#d63232");
		}
		return false;
	}
	else{
		el.removeAttr("style");
		return true;
	}
}

$("*[data-isphone]").on("keyup blur paste",function(){
	var regex = /^0[0-9]{1}[0-9]{8}$/;
	if(regex.test($(this).val()) && $(this).parent().find("ins").length){
		$(this).parent().find("ins").remove();
		$(this).removeAttr("style");
	}
});

function isEmail(el){
	var regex = /^[A-Za-z0-9._-]+@[A-Za-z0-9._-]{2,}\.[A-Za-z]{2,4}$/;
	if(!regex.test(el.val())){
		if(el.parent().find("ins").length === 0){
			el.after("<ins>"+el.attr("data-message")+"</ins>");
			el.css("border-color","#d63232");
		}
		return false;
	}
	else{
		el.removeAttr("style");
		return true;
	}
}

$("*[data-isemail]").on("keyup blur paste",function(){
	var regex = /^[A-Za-z0-9._-]+@[A-Za-z0-9._-]{2,}\.[A-Za-z]{2,4}$/;
	if(regex.test($(this).val()) && $(this).parent().find("ins").length){
		$(this).parent().find("ins").remove();
		$(this).removeAttr("style");
	}
});

function isPassword(el){
	if(el.val().length < 6){
		if(el.parent().find("ins").length === 0){
			el.after("<ins>"+el.attr("data-message")+"</ins>");
			el.css("border-color","#d63232");
		}
		return false;
	}
	else{
		el.removeAttr("style");
		return true;
	}
}

$("*[data-ispassword]").on("keyup blur paste",function(){
	if($(this).val().length >= 6 && $(this).parent().find("ins").length){
		$(this).parent().find("ins").remove();
		$(this).removeAttr("style");
	}
});

$(".lx-notices-item i.material-icons").on("click",function(){
	$(this).parent().fadeOut();
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			action : 'hidenotice'
		},
		success : function(response){}
	});
});

$("body").delegate(".lx-show-ref","click",function(){
	$(this).parent().find(".lx-refs").slideToggle();
});