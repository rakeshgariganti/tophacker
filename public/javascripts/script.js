/**
 * Created by rakesh on 18/1/15.
 */
$(document).ready(function () {
    $('#menu-button').on('click',function(event){
        $('.sidebar')
            .sidebar('setting', 'transition', 'push')
            .sidebar('toggle')
        ;
    });

    $('.message .close').on('click', function() {
        $(this).closest('.message').fadeOut();
    });

});