try
{
    if(typeof is_inside_screen !== "function")
    {
        throw new Error("helper.jsが読み込まれていません。");
    }
    
    $.fn.scrollFade = function(offset)
    {
        if(offset == undefined)
        {
            offset = 0;
        }
        var self = this;
        var $window = $(window);

        var animated = [];
        this.each(function()
        {
            $(this).css({opacity: 0});
            animated.push(false);
        });

        function checkAndAnimate()
        {
            self.each(function(index)
            {
                if(!animated[index] && is_inside_screen($(this), offset))
                {
                    $(this).animate(
                        {opacity: 1},
                        {duration: 500, queue: false},
                        "linear");
                    animated[index] = true;
                }
            });
        }

        $window.scroll(checkAndAnimate);
        checkAndAnimate();
    }
}
catch(e)
{
    alert(e);
}
