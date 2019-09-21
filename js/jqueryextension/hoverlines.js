jQuery(function()
{
    try
    {
        if(typeof check_str_area !== "function")
        {
            throw new Error("helper.jsが読み込まれていません。");
        }
            
        $.fn.hoverLines = function(animateTime)
        {
            if(animateTime == undefined)
            {
                animateTime = 100;
            }

            var area = check_str_area($(this));

            var thisLeft = $(this).offset().left;
            $over = $("<div>",
            {
                width: 0,
                height: area.height,
                css:
                {
                    position: "absolute",
                    left: thisLeft,
                    top: $(this).offset().top,
                    borderTop: "1px solid",
                },
            });
            
            var underLeft = $(this).offset().left + area.width;
            $under = $("<div>",
            {
                width: 0,
                height: area.height,
                css:
                {
                    position: "absolute",
                    left: underLeft,
                    top: $(this).offset().top,
                    borderBottom: "1px solid",
                },
            });
            $(this).append($over);
            $(this).append($under);

            $(this).on("mouseover", function()
            {
                $over.stop(true).animate({width: area.width}, animateTime, "linear");
                $under.stop(true).animate({width: area.width, left: thisLeft}, animateTime, "linear");
            }).on("mouseout", function()
            {
                $over.stop(true).animate({width: 0}, animateTime, "linear");
                $under.stop(true).animate({width: 0, left: underLeft}, animateTime, "linear");
            });

            return $(this);
        }
    }
    catch(e)
    {
        alert(e);
    }
});
