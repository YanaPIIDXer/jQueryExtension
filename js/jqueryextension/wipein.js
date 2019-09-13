try
{
    if(typeof is_inside_screen !== "function")
    {
        throw new Error("helper.jsが読み込まれていません。");
    }

    function wipeIn($obj, offset, fromRight)
    {
        if(offset == undefined)
        {
            offset = 0;
        }
        
        var $window = $(window);

        var defaultPosition = [];
        var animated = [];

        $obj.each(function(index)
        {
            // positionがstaticの時はrelativeに書き換える。
            var positionType = $(this).css("position");
            if(positionType == "static")
            {
                $(this).css("position", "relative");
            }
            defaultPosition.push($(this).css("left"));
            animated.push(false);
        
            if(fromRight)
            {
                // 右から
                $(this).css("left", "1000px");
            }
            else
            {
                // 左から
                $(this).css("left", "-1000px");
            }
        });

        function checkAndAnimate()
        {
            $obj.each(function(index)
            {
                if(!animated[index] && is_inside_screen($(this), offset))
                {
                    $(this).animate(
                        {left: defaultPosition[index]},
                        {duration: 500, queue: false},
                        "linear");
                    animated[index] = true;
                }
            });
        }

        $window.scroll(checkAndAnimate);
        checkAndAnimate();
    }
    
    $.fn.wipeInFromLeft = function(offset)
    {
        wipeIn($(this), offset, false);
    }
    
    $.fn.wipeInFromRight = function(offset)
    {
        wipeIn($(this), offset, true);
    }
}
catch(e)
{
    alert(e);
}
