var is_inside_screen = function($obj, offset, defaultTop)
{
    var $window = $(window);
    
    var top = $obj.offset().top;
    if(defaultTop != undefined)
    {
        top = defaultTop;
    }
    var border_bottom = $window.scrollTop() + $window.height();

    var bottom = top + $obj.height();
    var border_top = $window.scrollTop();
    
    return (border_bottom > top + offset && border_top < bottom - offset);
}
