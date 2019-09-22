jQuery(function($)
{
    try
    {
        if(typeof is_inside_screen !== "function")
        {
            throw new Error("helper.jsが読み込まれていません。");
        }

        const DIRECTION_FROM_LEFT = 0;
        const DIRECTION_FROM_RIGHT = 1;

        function slideIn($obj, animateTime,  offset, Direction)
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
                defaultLeft.push($(this).position().left);
                animated.push(false);

                var tmp = $(this).css("top");
                $(this).css({top: ""});
                defaultTop.push($(this).offset().top);
                $(this).css({top: tmp});

                var width = $(this).width();
                var screenRight = $(window).width();
                switch(Direction)
                {
                    case DIRECTION_FROM_LEFT:
                        // 左から
                        $(this).css("left", "-" + (width + screenRight) + "px");
                        break;

                    case DIRECTION_FROM_RIGHT:
                        // 右から
                        $(this).css("left", (screenRight - width));
                        break;
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
        
        $.fn.slideInFromLeft = function(animateTime, offset)
        {
            if(animateTime == undefined)
            {
                animateTime = 500;
            }

            if(offset == undefined)
            {
                offset = 0;
            }

            slideIn($(this), animateTime, offset, DIRECTION_FROM_LEFT);
            return $(this);
        }
        
        $.fn.slideInFromRight = function(animateTime, offset)
        {
            if(animateTime == undefined)
            {
                animateTime = 500;
            }
            
            if(offset == undefined)
            {
                offset = 0;
            }

            slideIn($(this), animateTime, offset, DIRECTION_FROM_RIGHT);
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
            var direction = $(this).data("scrollslidedirection");
            var time = $(this).data("scrollslidetime");
            var offset = $(this).data("scrollslideoffset");
            if(direction == "left")
            {
                $(this).slideInFromLeft(time, offset);
            }
            else if(direction == "right")
            {
                $(this).slideInFromRight(time, offset);
            }
        }
    });
});
