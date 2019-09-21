// 要素が画面内に入っているかをチェックする。
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

// 画面内に入った時に発火させるイベント
jQuery(function()
{
    $.fn.onScreen = function(callback, offset)
    {
        if(offset == undefined)
        {
            offset = 0;
        }

        $(this).on("onscreen", callback);

        var is_inside = false;
        var $self = $(this);
        $(window).scroll(function()
        {
            if(is_inside_screen($self, offset))
            {
                if(!is_inside)
                {
                    $self.triggerHandler("onscreen");
                    is_inside = true;
                }
            }
            else
            {
                is_inside = false;
            }
        });

        return this;
    }
});

// 文字列の領域を返す。
var check_str_area = function($obj)
{
    $check = $("<span>",
    {
        css:
        {
            visibility: "hidden",
            position: "absolute",
            whiteSpace: "nowrap",
            fontSize: $obj.css("font-size"),
        },
    });

    $check.text($obj.text());
    $("body").append($check);
    var strWidth = $check.get(0).offsetWidth;
    var strHeight = $check.get(0).offsetHeight;
    $check.remove();

    return {width: strWidth, height: strHeight};
}
