$(document).ready(function () {
	$("a").on("click", function (t) {
		t.preventDefault();
		window.location.replace(window.location.href);
	});

	$(".showPassword").on("click", function () {
		if ($(this).hasClass("mask-hide")) {
			$(this).removeClass("mask-hide");
			$(this).addClass("mask-show");
			$(this).text("Hide");
			$(this).next().attr("type", "text");
		} else {
			$(this).removeClass("mask-show");
			$(this).addClass("mask-hide");
			$(this).text("Show");
			$(this).next().attr("type", "password");
		}
	});

	$(".cb-input").on("keyup blur", function () {
		if ($(this).val().trim() == "") {
			$(this).parent().parent().addClass("hasError");
			$(this).parent().next(".input-bottom-text").show();
		} else {
			$(this).parent().parent().removeClass("hasError");
			$(this).parent().next(".input-bottom-text").hide();
		}
	});

	$(".button-submit").on("click", function (e) {
		$(".cb-input").each(function () {
			if ($(this).val().trim() == "") {
				$(this).parent().parent().addClass("hasError");
				$(this).parent().next(".input-bottom-text").show();
				e.preventDefault();
			}
		});
	});
});