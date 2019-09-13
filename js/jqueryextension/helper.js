var is_inside_screen = function($obj, offset)
{
    var $window = $(window);
    var top = $obj.offset().top;
    var border = $window.scrollTop() + $window.height();
    return (border > top + offset);
}
