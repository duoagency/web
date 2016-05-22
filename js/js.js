jQuery('img.svg').each(function(){
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg');

        // Add replaced image's ID to the new SVG
        if(typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }

        // Replace image with new SVG
        $img.replaceWith($svg);

    }, 'xml');
});

$(document).ready( function() {
    var welcome             = document.querySelector('#welcome'),
        welcome_height      = getComputedStyle(welcome).height.split('px')[0],
        navbar              = document.querySelector('nav'),
        navbar_height       = getComputedStyle(navbar).height.split('px')[0],
        fix_class           = 'is-fixed',
        hide_header         = 'hide-header';
    $( "#goPortfolio" ).click(function(event) {
        event.preventDefault();
        $('#portfolio').animatescroll({scrollSpeed:500,padding:81});
    });
    $( "#goServices" ).click(function(event) {
        event.preventDefault();
        $('#services').animatescroll({scrollSpeed:500,padding:81});
    });
    $( "#goAbout" ).click(function(event) {
        event.preventDefault();
        $('#about').animatescroll({scrollSpeed:500,padding:81});
    });
    $( "#goContact" ).click(function(event) {
        event.preventDefault();
        $('#contact').animatescroll({scrollSpeed:500,padding:81});
    });



    function stickyScroll(e) {


        if( window.pageYOffset < 15 ) {
            navbar.classList.remove(hide_header);
        }

        if( window.pageYOffset > 15 && window.pageYOffset < (welcome_height - 100)) {
            navbar.classList.add(hide_header);
            navbar.classList.remove(fix_class);
        }

        if( window.pageYOffset > (welcome_height - 100) ) {
            navbar.classList.remove(hide_header);
            navbar.classList.add(fix_class);
        }
    }
// Scroll handler to toggle classes.
    window.addEventListener('scroll', stickyScroll, false);

});