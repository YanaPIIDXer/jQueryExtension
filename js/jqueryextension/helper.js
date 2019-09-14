var is_inside_screen = function($obj, offset)
{   
    var $window = $(window);
    
    var top = $obj.offset().top;
    var border_bottom = $window.scrollTop() + $window.height();

    var bottom = top + $obj.height();
    var border_top = $window.scrollTop();
    
    return (border_bottom > top + offset && border_top < bottom - offset);
}
