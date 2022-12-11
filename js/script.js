// Strict Mode
var timer;

// Window Load Event
$(window).on("load", function() {
	
    return false;
});

// Document Ready event
$(document).on("ready", function() {
	$("*[data-url-bg]").each(function(){
		$(this).css({"background":"url('"+$(this).attr("data-url-bg")+"') no-repeat","background-size":"cover"});
	});
	
	window.setInterval(function(){
		$(".lx-hero-nav i.fa-chevron-right").trigger("click");
	},6000);
	
	if($(".lx-map").length){
		addMapMarker("lx-map");
	}	
	
	// Carousel Set Up
	if($(".lx-carousel").length){
		$(".lx-carousel ul").each(function(){
			if($(this).find("li").length > 1){
				$(this).width(($(this).find("li").length+1)*$(this).find("li").outerWidth());
				$(this).css("left","-"+($(this).find("li").outerWidth())+"px");				
			}
			else{
				$(this).parent().prev("i").remove();
				$(this).parent().prev("i").remove();
			}
		});				
	}

	window.setInterval(function(){
		$(".lx-services > .fa-angle-right").trigger("click");
	},10000);	
	
	return false;
});

var passed = "yes";
var timer;
$(".lx-services > .fa-angle-right").on("click",function(){
	var el = $(this);
	if(passed === "yes"){
		passed = "no";
		el.next("div").find("ul").css({"-webkit-transition":"all 0.4s","transition":"all 0.4s","left":"-"+(el.next("div").find("ul").find("li").outerWidth()*2)+"px"});
		window.setTimeout(function(){
			el.next("div").find("ul").css({"-webkit-transition":"all 0s","transition":"all 0s","left":"-"+el.next("div").find("ul").find("li").outerWidth()+"px"});
			var item = "<li>"+el.next("div").find("ul").find("li:eq(0)").html()+"</li>";
			el.next("div").find("ul").append(item);
			el.next("div").find("ul").find("li:eq(0)").remove();
			passed = "yes";
		},500);
	}
});
$(".lx-services > .fa-angle-left").on("click",function(){
	var el = $(this);
	if(passed === "yes"){
		passed = "no";
		el.parent().find("div.lx-carousel").find("ul").css({"-webkit-transition":"all 0.4s","transition":"all 0.4s","left":"0px"});
		window.setTimeout(function(){
			el.parent().find("div.lx-carousel").find("ul").css({"-webkit-transition":"all 0s","transition":"all 0s","left":"-"+(el.parent().find("div.lx-carousel").find("ul").find("li").outerWidth())+"px"});
			var item = "<li>"+el.parent().find("div.lx-carousel").find("ul").find("li:last-child").html()+"</li>";
			el.parent().find("div.lx-carousel").find("ul").prepend(item);
			el.parent().find("div.lx-carousel").find("ul").find("li:last-child").remove();
			passed = "yes";
		},500);
	}
});

var map;
var marker = [];
function addMapMarker(id){
	var latLng = new google.maps.LatLng(33.535384,-7.584523);
	var mapProp = {
		center: latLng,
		zoom:16,
        styles: [
              {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
              {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
              {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
              {
                featureType: 'administrative',
                elementType: 'geometry.stroke',
                stylers: [{color: '#c9b2a6'}]
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'geometry.stroke',
                stylers: [{color: '#dcd2be'}]
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'labels.text.fill',
                stylers: [{color: '#ae9e90'}]
              },
              {
                featureType: 'landscape.natural',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#93817c'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'geometry.fill',
                stylers: [{color: '#a5b076'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#447530'}]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#f5f1e6'}]
              },
              {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [{color: '#fdfcf8'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#f8c967'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#e9bc62'}]
              },
              {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry',
                stylers: [{color: '#e98d58'}]
              },
              {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry.stroke',
                stylers: [{color: '#db8555'}]
              },
              {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [{color: '#806b63'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'labels.text.fill',
                stylers: [{color: '#8f7d77'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#ebe3cd'}]
              },
              {
                featureType: 'transit.station',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [{color: '#b9d3c2'}]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#92998d'}]
              }
            ],
		mapTypeId:google.maps.MapTypeId.ROADMAP
	};
	
	map = new google.maps.Map(document.getElementById(id),mapProp);		
	
	marker[0] = new google.maps.Marker({
		position: new google.maps.LatLng(33.535384,-7.584523),
		map: map,
		title: 'Hay Al Osra Rue 21 N 19'
	});				
}

$(".lx-menu-mobile a").on("click",function(){
	$(".lx-header-menu").slideToggle();
});

$("a[data-bloc]").on("click",function(){
	var id = $(this);
	$("a[data-bloc]").removeClass("active");
	$(this).addClass("active");
	$("a[data-bloc='"+id.attr("data-bloc")+"']").addClass("active");
    $('html, body').animate({
        scrollTop: $(id.attr("data-bloc")).offset().top - 109
    }, 1000);
	if($(window).width() < 1024){
		$(".lx-header-menu").fadeToggle();
		$(".lx-header-cta").fadeToggle();
	}	
});

var slidenb = 0;
$(".lx-hero-nav i.fa-chevron-right").on("click",function(){
	$(".lx-hero-item").not(".lx-hero-item:eq("+slidenb+")").fadeOut();
	$(".lx-hero-item:eq("+slidenb+")").fadeIn();
	if(slidenb < ($(".lx-hero-item").length - 1)){
		slidenb += 1;
	}
	else{
		slidenb = 0;
	}
});

$(".lx-hero-nav i.fa-chevron-left").on("click",function(){
	$(".lx-hero-item").not(".lx-hero-item:eq("+slidenb+")").fadeOut();
	$(".lx-hero-item:eq("+slidenb+")").fadeIn();
	if(slidenb > 0){
		slidenb -= 1;
	}
	else{
		slidenb = ($(".lx-hero-item").length - 1);
	}
});

$("#clientform .lx-submit a").on("click",function(){
	if($(this).find("i").length === 0){
		$(this).prepend('<i class="fa fa-circle-notch fa-spin"></i> ');
	}
	$("*[data-required]").removeAttr("style");
	if($("#clientform input[name='fullname']").val() !== "" && $("#clientform input[name='email']").val() !== "" && $("#clientform input[name='password1']").val() !== "" && $("#clientform input[name='phone']").val() !== "" && $("#clientform select[name='city']").val() !== "" && ($("#clientform input[name='password1']").val() === $("#clientform input[name='password2']").val()) && $("#clientform input[name='password1']").val().length > 5){
		var ajaxurl = "ajax.php";
		$.ajax({
			url : ajaxurl,
			type : 'post',
			data : {
				rs : $("#clientform input[name='rs']").val(),
				fullname : $("#clientform input[name='fullname']").val(),
				email : $("#clientform input[name='email']").val(),
				password : $("#clientform input[name='password1']").val(),
				phone : $("#clientform input[name='phone']").val(),
				cin : $("#clientform input[name='cin']").val(),
				bank : $("#clientform select[name='bank']").val(),
				rib : $("#clientform input[name='rib']").val(),
				action : 'addclient'
			},
			success : function(response){
				$("#clientform .lx-submit a i").remove();
				if(response !== ""){
					$(".lx-floating-response").remove();
					window.clearTimeout(timer);
					$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> '+response+'<i class="material-icons">close</i></p></div>');
					$(".lx-floating-response").fadeIn();
					timer = window.setTimeout(function(){
						$(".lx-floating-response").fadeOut();
					},5000);
				}
				else{
					$(".lx-popup-inside").trigger("click");
					$(".lx-floating-response").remove();
					window.clearTimeout(timer);
					$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">check</i> Merci pour votre confience, nous vous contacterons dans les plus brefs delais pour confirmer et activer votre compte!!<i class="material-icons">close</i></p></div>');
					$(".lx-floating-response").fadeIn();
					timer = window.setTimeout(function(){
						$(".lx-floating-response").fadeOut();
					},5000);
				}
			}		
		});
	}
	else{
		$("#clientform .lx-submit a i").remove();
		$("*[data-required]").each(function(){
			if($(this).val() === ""){
				$(this).css("border-color","red");
			}
		});
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Veuillez remplir les champs en rouge !!<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);
	}
});

$("#clientform input[name='rs']").on("keyup",function(){
	$("#clientform input[name='email']").val($(this).val().toLowerCase().replace(/\-|\.|,|;|\?|!|:|é|è|ê|à|â| /gi,"") + "@gmail.com");
});

$(document).on("scroll",function(){
	if($(this).scrollTop() > 50){
		$(".lx-header").addClass("lx-header-scroll");
	}
	else{
		$(".lx-header").removeClass("lx-header-scroll");
	}
	if($(this).scrollTop() > 620){
		$(".lx-to-top").fadeIn();
	}
	else{
		$(".lx-to-top").fadeOut();
	}
});

$(".lx-tarifs select[name='city']").on("change",function(){
	if($(this).val() !== ""){
		$("[data-city]").css("display","none");
		$("[data-city='"+$(this).val()+"']").css("display","table-row");
	}
	else{
		$("[data-city]").css("display","table-row");
	}
});

$(".lx-suivi-coli a").on("click",function(){
	loadColiHistory($(".lx-suivi-coli input[name='code']").val());
});

function loadColiHistory(coli){
	$(".colihistory .lx-add-form").html('<p>Patienez SVP ...<br /><i class="fa fa-circle-notch fa-spin"></i></p>');
	var ajaxurl = "ajax.php";
	$.ajax({
		url : ajaxurl,
		type : 'post',
		data : {
			id : coli,
			action : 'loadcolihistory'
		},
		success : function(response){
			$(".colihistory .lx-add-form").html(response);
		}		
	});		
}

$(".lx-to-top").on("click",function(){
	$('html, body').animate({
		scrollTop: $("body").offset().top
	}, 1000);
});