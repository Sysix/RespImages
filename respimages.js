$.fn.RespImages = function (options, breaks) {
    var that = $(this),
		_window = $(window),
		w_w = _window.width(),
        current,		
		imageSize,
		regex = /(\/?index\.php\?rex_img_type=|\/?imagetypes\/)resp\d*(&rex_img_file=|\/)(.*)/,
		breakpoints = breaks || [400, 600, 800, 1000, 1200];
	
	if(!that.length) {
		return that;	
	}
		
	var	settings = $.extend({
    		data: 'data-src',
            toSrc: true
        }, options);

    function setCurrent() {
        current = $.map(breakpoints, function (point, n) {
            if (w_w >= point) {
                return point;
            }
        });
        if (current.length == 0) {
            current.push(breakpoints[0])
        }
        imageSizeNew = current.pop();
		if(imageSizeNew != imageSize) {
       	    imageSize = imageSizeNew;		 
		    return true;
		}
		
		return false;
    }
	
    function resplaceImages() {
        that.each(function () {
            var _this = $(this),
                src = _this.attr(settings.data);
				
            if (src && regex.test(src)) {
                var result = src.match(regex),
                    attr = (settings.toSrc) ? 'src' : settings.data;
					
                _this.attr(attr, result[1]+'resp' + imageSize + result[2] + result[3]);
            }
			
        })
    }
	
    setCurrent();
    resplaceImages();
	
    _window.on('resize', function () {
        w_w = _window.width();
        if(setCurrent()) {
			resplaceImages();
		}
    });
	
	return that;
};