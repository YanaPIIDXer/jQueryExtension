jQuery(function($)
{
    $.fn.setCarousel = function(changeTime, onActive, onDeactive)
    {
        if(onActive == undefined)
        {
            onActive = function() {}
        }
        if(onDeactive == undefined)
        {
            onDeactive = function() {}
        }
        
        var $items = [];
        this.each(function()
        {
            $items.push($(this));
            $(this).css({opacity: 0, position: "absolute"});
            $(this).css("top", $items[0].css("top"));
            $(this).bind("onCarouselActive", onActive);
            $(this).bind("onCarouselDeactive", onDeactive);
        });
        if($items.length == 0) { return; }

        $items[0].css("opacity", 1);
        var currentIndex = 0;
        function switchItem()
        {
            nextIndex = currentIndex + 1;
            if(nextIndex >= $items.length)
            {
                nextIndex = 0;
            }
            $items[currentIndex].stop(true).animate({opacity: 0}, 500, "linear", function()
            {
                $(this).triggerHandler("onCarouselDeactive");
            });
            $items[nextIndex].stop(true).animate({opacity: 1}, 500, "linear");
            currentIndex = nextIndex;
            $items[currentIndex].triggerHandler("onCarouselActive");
            setTimeout(switchItem, changeTime);
        }

        $items[0].triggerHandler("onCarouselActive");
        setTimeout(switchItem, changeTime);
    }
});