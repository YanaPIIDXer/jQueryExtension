jQuery(function($)
{
    $.fn.attachTop = function()
    {
        this.each(function()
        {
            $self = $(this);
            $self.css("position", "absolute");
            defaultTop = $self.offset().top;
            
            $(window).scroll(function()
            {
                if($(window).scrollTop() > defaultTop)
                {
                    $self.css("position", "fixed");
                    $self.css("top", 0);   
                }
                else
                {
                    $self.css("position", "absolute");
                    $self.css("top", "auto");
                }
            });
        });
    
        $(window).scroll();

        return $(this);
    } 
});
