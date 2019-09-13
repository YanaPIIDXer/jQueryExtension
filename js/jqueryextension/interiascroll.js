// 慣性スクロールの有効化。
function enableInteriaScroll()
{
    $window = $(window);
    var scroll = 0;
    
    $window.on("wheel", function(e)
    {
        e.preventDefault();
        scroll += e.originalEvent.deltaY;
        var id = setInterval(function()
        {
            scroll *= 0.925;
            value = $window.scrollTop() + scroll;
            if(Math.abs(scroll) <= 1)
            {
                $window.scrollTop(value);
                scroll = 0;
                clearInterval(id);
                return;
            }
            $window.scrollTop(value);
        }, 60);
    });
}