$(document).ready(function(){

	//mobile select
	$('.select-beauty').niceSelect();
	//mobile select===end
	//mobile-menu
		$('.header-toggle').click(function(event){
				event.stopPropagation();
				$('.header__nav-cont').slideToggle("fast");
				$(this).toggleClass("header-toggle--active");
				$('body').toggleClass("fixbody");
				$('head').toggleClass("head--open");
				$('.head').toggleClass("head--openmenu");
		});
		$('.header__nav-cont').on("click", function (event) {
			event.stopPropagation();
		});
		$(document).on("click", function () {
				$('.header__nav-cont').hide();
		});
	//mobile-menu===end

	//tab modal
	var tabConstruct = function (elHead,elTab){
		$("."+elHead).click(function () {
			var elHeadActive = elHead+'--active';
			var elTabActive = elTab+'--active';

			$("."+elHead).removeClass(elHeadActive);
			$(this).addClass(elHeadActive);
			var curentTab = $(this).data('tab');
			$("."+elTab).each(function () {
				$(this).removeClass(elTabActive);
				if ($(this).data('tab') == curentTab) {
					$(this).addClass(elTabActive);
				}
			})
		});
	};

	tabConstruct('modal-title__el','modal-tab');
	//tab modal===end

	//slider-main
	$('.main-slider').slick({
		slidesToShow: 1,
		autoplay: true,
		speed: 1500,
		vertical:false,
		arrows: false,
		fade: true,
	});
	$('.slider-control--right').click(function(){
		$(this).closest(".slider-wrap").find(".main-slider").slick('slickNext');
	});

	$('.slider-control--left').click(function(){
		$(this).closest(".slider-wrap").find(".main-slider").slick('slickPrev');
	});
	//slider-main===end

	//dott text
	/*	var dot = $(".basket__el-inf").dotdotdot({
      ellipsis: "...",
			wrap: "word",
			fallbackToLetter: true,
			after: null,
			watch: false,
			height: 75,
			tolerance: 0,
			callback: function(isTruncated, orgContent){},
			lastCharacter: {
				remove: [" ", ",", ";", ".", "!", "?"],
				noEllipsis: []
			}
   });*/
	//dott text===end

	//modals
	$('.modal-content').click(function(event){
			event.stopPropagation();
		});
		var scrollPos = 0;
		var openModal = function () {
		if(!$('.modal-layer').hasClass('modal-layer-show')){
			$('.modal-layer').addClass('modal-layer-show');
		}
		 scrollPos = $(window).scrollTop();
			$('body').css({
				overflow: 'hidden',
				position: 'fixed',
				top : -scrollPos,
				width:'100%'
			});
			return scrollPos;
		};

		var closeModal = function () {
			 $('.modal').removeClass('modal__show');
			$('.modal-layer').removeClass('modal-layer-show');
			$(".content").removeClass("modal-blur");
			$('body').css({
				overflow: '',
				position: '',
				top: ''
			})
			 $(window).scrollTop(scrollPos);
		};

		var initModal = function(el){
			openModal();
			$(".content").addClass("modal-blur");
			$('.modal').each(function () {
				if ($(this).data('modal')===el){
					$(this).addClass('modal__show')
				} else {
					$(this).removeClass('modal__show')
				}
			});
		};

		$('.modal-get').click(function (){
			var currentModal = $(this).data("modal");
			initModal(currentModal);
		});

		$('.modal-layer , .modal-close').click(function (){
			closeModal();
		});
	//modals===end



		//scroll menu
		var cartScroll = $('.basket__list').perfectScrollbar();

		//increment field
		$('.incr__minus').click(function () {
			var $input = $(this).parent().find('.incr__val span');
			var count = parseInt($input.html()) - 1;
			count = count < 1 ? 0 : count;
			if(count == 0){
				//header-basket--remove
				$(this).closest('.item-el__info-get').removeClass('item-el__info-get--incr');

				$(this).closest('.basket__el').slideUp(400, function() {
			    $(this).remove();
				});
				//header-basket--remove===end

				//cart-basket--remove
				$(this).closest('.cart__el').slideUp(400, function() {
			    $(this).remove();
			    if($('.cart__el').length < 1){
			    	$('.cart__empty-wrap').show();
			    	$('.cart-get').hide();
			    }
				});
				//cart-basket--remove===end
			}
			cartScroll.perfectScrollbar('update');
			$input.html(count);
			if($('.basket__el').size() <=1){
				$('.header-basket').addClass('header-basket--empty');
				$('.basket').slideUp('slow');
			}
		});
		$('.incr__plus').click(function () {
			var $input = $(this).parent().find('.incr__val span');
			var count = parseInt($input.html()) + 1;
			count = count > 100 ? 100 : count;
			$input.html(count);
		});
	//increment field end

		//toggle cart
		$('.header-basket').click(function(event){
			event.stopPropagation();
			if(!$(this).hasClass('header-basket--empty')){
				$('.basket').slideToggle('slow',function(){
					cartScroll.perfectScrollbar('update');
				});
			}

		});
		$('.basket').on("click", function (event) {
			event.stopPropagation();
		});
		$(document).on("click", function () {
				$('body').removeClass('fixbody');
				$('.basket').slideUp('slow');
		});
		if($(window).width()<=640){
			$('.header-basket').click(function(){
				$('body').addClass('fixbody');
			});
		}
		$('.basket--close').click(function(){
				$('body').removeClass('fixbody');
				$('.basket').slideUp('slow');
		});
		//toggle cart===end

	/* ###### For only ies  ######*/
	//if(/MSIE \d|Trident.*rv:/.test(navigator.userAgent)){
	//	//code
	//}

	function detectIE() {
	var ua = window.navigator.userAgent;

	var msie = ua.indexOf('MSIE ');
	if (msie > 0) {
		// IE 10 or older => return version number
		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}

	var trident = ua.indexOf('Trident/');
	if (trident > 0) {
		// IE 11 => return version number
		var rv = ua.indexOf('rv:');
		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}

	var edge = ua.indexOf('Edge/');
	if (edge > 0) {
		// Edge (IE 12+) => return version number
		return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	}

	// other browser
	return false;
}

	console.log(detectIE());
	if (detectIE() <= 11 && detectIE()) {
		$('body').empty();
		$('body').prepend('' +
		 '<div class="old-browser">' +
			'<div class="old-browser-text"> Сайт не поддерживае Браузер Internet Explorer</div><br>' +
			'<div class="old-browser-text"> Установите <br><br> Chrome Firefox Opera </div><br>' +
		'</div>');
	}

	//for init SVG 
	svg4everybody();
	// ==== clear storage =====
	 localStorage.clear();
	 sessionStorage.clear();
	 $(window).unload(function(){
		 localStorage.clear();
	 });
	// ==== clear storage end =====

	
	/* ###### For SlideToggle Elements  ######*/
	/*var hideToggle = function(targetClick,toggleEl) {
		$(targetClick).click(function(event){
				event.stopPropagation();
				$(toggleEl).slideToggle("fast");
		});
		$(toggleEl).on("click", function (event) {
			event.stopPropagation();
		});
		$(document).on("click", function () {
				$(toggleEl).hide();
		});
	}
	hideToggle('.icon-bars','.top-menu_link');*/

})

//cash SVG

;( function( window, document )
{
	'use strict';

	var file  = 'img/pack.html',
		revision = 1;

	if( !document.createElementNS || !document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect )
		return true;

	var isLocalStorage = 'localStorage' in window && window[ 'localStorage' ] !== null,
		request,
		data,
		insertIT = function()
		{
			document.body.insertAdjacentHTML( 'afterbegin', data );
		},
		insert = function()
		{
			if( document.body ) insertIT();
			else document.addEventListener( 'DOMContentLoaded', insertIT );
		};

	if( isLocalStorage && localStorage.getItem( 'inlineSVGrev' ) == revision )
	{
		data = localStorage.getItem( 'inlineSVGdata' );
		if( data )
		{
			insert();
			return true;
		}
	}

	try
	{
		request = new XMLHttpRequest();
		request.open( 'GET', file, true );
		request.onload = function()
		{
			if( request.status >= 200 && request.status < 400 )
			{
				data = request.responseText;
				insert();
				if( isLocalStorage )
				{
					localStorage.setItem( 'inlineSVGdata',  data );
					localStorage.setItem( 'inlineSVGrev',   revision );
				}
			}
		}
		request.send();
	}
	catch( e ){}

}( window, document ) );