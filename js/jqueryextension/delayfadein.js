jQuery(function()
{
    $.fn.delayFadeIn = function(delayTime, onFinished)
    {
        if(onFinished == undefined)
        {
            onFinished = function() {}
        }
        
        $items = [$(this)];
        $items.push($(this).children());
        
        delay = 0;
        $items.map(function($item, index)
        {
            $item.css("opacity", 0);
            setTimeout(function()
            {
                $item.stop(true).animate({opacity: 1}, delay + delayTime, "linear", function()
                {
                    if(index == $items.length - 1)
                    {
                        onFinished();
                    }
                });
            }, delay);
            delay += delayTime;
        });
    }
});