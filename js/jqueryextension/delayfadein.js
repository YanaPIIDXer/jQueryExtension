jQuery(function()
{
    $.fn.delayFadeIn = function(delayTime)
    {
        $items = [$(this)];
        $items.push($(this).children());
        
        delay = 0;
        $items.map(function($item)
        {
            $item.css("opacity", 0);
            setTimeout(function()
            {
                $item.stop(true).animate({opacity: 1}, delay + delayTime, "linear");
            }, delay);
            delay += delayTime;
        });
    }
});