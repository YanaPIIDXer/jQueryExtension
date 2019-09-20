jQuery(function($)
{
    try
    {
        if(typeof is_inside_screen !== "function")
        {
            throw new Error("helper.jsが読み込まれていません。");
        }
        
        $.fn.scrollFade = function(animateTime, offset)
        {
            if(animateTime == undefined)
            {
                animateTime = 500;
            }
            
            if(offset == undefined)
            {
                offset = 0;
            }
            var self = this;
            var $window = $(window);

            var animated = [];
            var defaultTop = [];
            this.each(function()
            {
                $(this).css({opacity: 0});
                animated.push(false);

                var tmp = $(this).css("top");
                $(this).css({top: ""});
                defaultTop.push($(this).offset().top);
                $(this).css({top: tmp});
            });

            function checkAndAnimate()
            {
                self.each(function(index)
                {
                    if(!animated[index] && is_inside_screen($(this), offset, defaultTop[index]))
                    {
                        $(this).animate(
                            {opacity: 1},
                            {duration: animateTime, queue: false},
                            "linear");
                        animated[index] = true;
                    }
                });
            }

            $window.scroll(checkAndAnimate);
            checkAndAnimate();

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
            var time = $(this).data("scrollfadetime");
            var offset = $(this).data("scrollfadeoffset");
            $(this).scrollFade(time, offset);
        }
    });
});
