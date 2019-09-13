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

    function checkVisibility()
    {
        self.each(function()
        {
            var top = $(this).offset().top;
            var border = $window.scrollTop() + $window.height();
            if(border > top + offset)
            {
                $(this).stop(true).animate({opacity: 1}, 500, "linear");
            }
        });
    }

    $window.scroll(checkVisibility);

    checkVisibility();
}
