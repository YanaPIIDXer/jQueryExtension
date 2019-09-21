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
            
            // ↓replace()使ってる時点で気付くかも知れんけど、cssメソッドが返してるのは文字列と言うトラップ。（プロパティの種類によるか・・・？）
            //  何も考えずに数値と演算すると文字列結合になって死なますよ。
            var paddingTop = parseInt($(this).css("padding-top").replace("px", ""));
            var paddingLeft = parseInt($(this).css("padding-left").replace("px", ""));

            var thisLeft = $(this).position().left + paddingLeft;
            var $over = $("<div>",
            {
                width: 0,
                height: area.height,
                css:
                {
                    position: "absolute",
                    left: thisLeft,
                    top: $(this).position().top + paddingTop,
                    borderTop: "1px solid",
                },
            });
            
            var underLeft = thisLeft + area.width;
            var $under = $("<div>",
            {
                width: 0,
                height: area.height,
                css:
                {
                    position: "absolute",
                    left: underLeft,
                    top: $(this).position().top + paddingTop,
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
