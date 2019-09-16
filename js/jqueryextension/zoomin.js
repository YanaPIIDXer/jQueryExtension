jQuery(function($)
{
    $.fn.zoomIn = function(animateTime, scaleRate, $target)
    {
        if(animateTime == undefined)
        {
            animateTime = 500;
        }
        
        if(scaleRate == undefined)
        {
            scaleRate = 1.5;
        }
        
        if($target == undefined)
        {
            $target = $(this);
        }

        var milliSec = animateTime / 1000;
        $target.css("transition", milliSec + "s");
        
        this.each(function()
        {
            $(this).mouseenter(function()
            {
                var value = "scale(" + scaleRate + ")";
                $target.stop(true).css({transform: value});
            })
            .mouseleave(function()
            {
                $target.stop(true).css({transform: "scale(1.0)"});
            });
        });
    }
});
