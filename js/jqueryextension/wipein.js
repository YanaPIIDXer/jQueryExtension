var LEFT_TO_RIGHT = 0;
var RIGHT_TO_LEFT = 1;
var TOP_TO_BOTTOM = 2;
var BOTTOM_TO_TOP = 3;
jQuery(function()
{
    $.fn.wipeIn = function(direction, animateTime, maskColor)
    {
        if(direction == undefined)
        {
            direction = LEFT_TO_RIGHT;
        }

        if(animateTime == undefined)
        {
            animateTime = 1000;
        }

        if(maskColor == undefined)
        {
            maskColor = $("body").css("background-color");
        }

        $mask = $("<div>",
                {
                    width: $(this).width(),
                    height: $(this).height(),
                    css:
                    {
                        position: "absolute",
                        left: $(this).offset().left,
                        top: $(this).offset().top,
                        backgroundColor: maskColor,
                        zOrder: 1,
                    },
                });
        $("body").append($mask);

        switch(direction)
        {
            case LEFT_TO_RIGHT:

                var width = $mask.offset().left + $mask.width();
                $mask.animate(
                {
                    width: 0,
                    left: width,
                }, animateTime, "linear");
                break;

            case RIGHT_TO_LEFT:

                $mask.animate(
                {
                    width: 0,
                }, animateTime, "linear");
                break;

            case TOP_TO_BOTTOM:

                var height = $mask.offset().top + $mask.height();
                $mask.animate(
                {
                    height: 0,
                    top: height,
                }, animateTime, "linear");
                break;

            case BOTTOM_TO_TOP:

                $mask.animate(
                {
                    height: 0,
                }, animateTime, "linear");
                break;        
        }
    }
});
