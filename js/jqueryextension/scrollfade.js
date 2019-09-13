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

        this.each(function()
        {
            $(this).css({opacity: 0});
        });

        function checkAndAnimate()
        {
            self.each(function()
            {
                if(is_inside_screen($(this), offset))
                {
                    $(this).stop(true).animate({opacity: 1}, 500, "linear");
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
