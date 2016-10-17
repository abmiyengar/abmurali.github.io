(function($) {

	var position = 1;
	var thumbnail = thumbnail = $(".thumbnail-gallery").find("[data-position='" + position + "']");
	var maxPosition = thumbnail.data("max-position");
	var imageUrl = "";
	var imageUrl2 = "";
	var thumbState = {
		'g1': 1,
		'g2': 1,
		'g3': 1,
		'g4': 1
	}

	//var activeImage = $('#gallery-active-img');

	// var imgEle = $('#work01-img-gallery');
	var imgEle = $(".image-gallery");

	var changeActiveImage = function($gallery, $thumbnail){
		var $activeImg =  $('#gallery-active-img' + $gallery.attr('id').substr(1,1)); 
		$thumbnail.removeClass("overlay");
		$thumbnail.children('.lightbox-img-link').data('lightbox-gallery', '');
		imageUrl = $thumbnail.css("background-image");
		$activeImg.css("background-image", imageUrl);
		// The following line is to obtain background image url from the css attribute
		debugger
		$activeImg.parent().attr("href", imageUrl.replace('url(','').replace(')',''));
		console.log($activeImg.attr("href"));
	}
	var addOverlayToThumbnail = function($gallery, galleryID) {
		var thumbnail = $gallery.find("[data-position='" + thumbState[galleryID] + "']");
		thumbnail.addClass("overlay");
		thumbnail.children('.lightbox-img-link').data('lightbox-gallery', galleryID);
	}

	$('.image-gallery-thumbnail').click(function(e){
		var $gallery = $(this).parent().parent();
		var galleryID = $gallery.attr('id');
		console.log(galleryID);
		var position = $(this).data('position');
		console.log(position);
		var $thumbnail = $gallery.find("[data-position='" + position + "']");
		addOverlayToThumbnail($gallery, galleryID);
		thumbState[galleryID] = position;
		changeActiveImage($gallery, $thumbnail);
	});

	$(".gallery-action-icon-right").click(function(e){
		var $gallery = $(this).parent();
		var galleryID = $gallery.attr('id');
		var position = thumbState[galleryID];
		var $thumbnail =$gallery.find("[data-position='1']");
		var maxPosition = thumbnail.data('max-position');
		addOverlayToThumbnail($gallery, galleryID);
		position = position + 1;
		if(position <= maxPosition) {
			thumbState[galleryID] = position;
			$thumbnail = $gallery.find("[data-position='" + position + "']");
			changeActiveImage($gallery, $thumbnail)		
		} else {
			position = 1;
			thumbState[galleryID] = position;
			$thumbnail = $gallery.find("[data-position='" + position + "']");
			addOverlayToThumbnail($gallery, galleryID);
			changeActiveImage($gallery, $thumbnail);
		}
		e.preventDefault();
		
	});

	$(".gallery-action-icon-left").click(function(e){
		var $gallery = $(this).parent();
		var galleryID = $gallery.attr('id');
		var position = thumbState[galleryID];
		var $thumbnail =$gallery.find("[data-position='1']");
		var maxPosition = thumbnail.data('max-position');
		addOverlayToThumbnail($gallery, galleryID);
		position = position - 1;
		if(position >= 1) {
			thumbState[galleryID] = position;
			$thumbnail = $gallery.find("[data-position='" + position + "']");
			changeActiveImage($gallery, $thumbnail)		
		} else {
			position = maxPosition;
			thumbState[galleryID] = position;
			$thumbnail = $gallery.find("[data-position='" + position + "']");
			addOverlayToThumbnail($gallery, galleryID);
			changeActiveImage($gallery, $thumbnail);
		}
		e.preventDefault();	
	});

	$('.light-box').nivoLightbox();
})(jQuery);