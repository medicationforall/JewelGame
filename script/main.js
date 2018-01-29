$.fn.extend({
    animateCss: function (animationName) {
        var animationDeferred = $.Deferred();
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            animationDeferred.resolve();
        });
        return animationDeferred;
    },

    transitionCss: function (className) {
        var animationDeferred = $.Deferred();
        var animationEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
        $(this).addClass(className).one(animationEnd, function() {
            animationDeferred.resolve();
        });
        return animationDeferred;
    }
});

$(document).ready(function(){
    //console.log('main loaded');
    var game = new Game();
});
