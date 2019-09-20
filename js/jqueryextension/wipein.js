jQuery(function($)
{
    try
    {
        if(typeof is_inside_screen !== "function")
        {
            throw new Error("helper.jsが読み込まれていません。");
        }

        function wipeIn($obj, animateTime,  offset, fromRight)
        {            
            var $window = $(window);

            var defaultLeft = [];
            var animated = [];
            var defaultTop = [];

            $obj.each(function(index)
            {
                // positionがstaticの時はrelativeに書き換える。
                var positionType = $(this).css("position");
                if(positionType == "static")
                {
                    $(this).css("position", "relative");
                }
                defaultLeft.push($(this).css("left"));
                animated.push(false);

                var tmp = $(this).css("top");
                $(this).css({top: ""});
                defaultTop.push($(this).offset().top);
                $(this).css({top: tmp});

                width = $(this).width();
                if(fromRight)
                {
                    // 右から
                    screenRight = $(window).width();
                    $(this).css("left", (width + screenRight) + "px");
                }
                else
                {
                    // 左から
                    $(this).css("left", "-" + width + "px");
                }
            });

            function checkAndAnimate()
            {
                $obj.each(function(index)
                {
                    if(!animated[index] && is_inside_screen($(this), offset, defaultTop[index]))
                    {
                        $(this).animate(
                            {left: defaultLeft[index]},
                            {duration: animateTime, queue: false},
                            "linear");
                        animated[index] = true;
                    }
                });
            }

            $window.scroll(checkAndAnimate);
            checkAndAnimate();
        }
        
        $.fn.wipeInFromLeft = function(animateTime, offset)
        {
            if(animateTime == undefined)
            {
                animateTime = 500;
            }

            if(offset == undefined)
            {
                offset = 0;
            }

            wipeIn($(this), animateTime, offset, false);
            return $(this);
        }
        
        $.fn.wipeInFromRight = function(animateTime, offset)
        {
            if(animateTime == undefined)
            {
                animateTime = 500;
            }
            
            if(offset == undefined)
            {
                offset = 0;
            }

            wipeIn($(this), animateTime, offset, true);
            return $(this);
        }
    }
    catch(e)
    {
        alert(e);
    }

    $("body *").each(function()
    {
        if($(this).data("scrollfade"))
        {
            var direction = $(this).data("scrollwipedirection");
            var time = $(this).data("scrollwipetime");
            var offset = $(this).data("scrollwipeoffset");
            if(direction == "left")
            {
                $(this).wipeInFromLeft(time, offset);
            }
            else if(direction == "right")
            {
                $(this).wipeInFromRight(time, offset);
            }
        }
    });
});
