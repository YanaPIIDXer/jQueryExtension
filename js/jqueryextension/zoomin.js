$.fn.zoomIn = function(scaleRate, $target)
{
    if(scaleRate == undefined)
    {
        scaleRate = 1.5;
    }
    
    if($target == undefined)
    {
        $target = $(this);
    }

    $target.css("transition", "0.5s");
    
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
