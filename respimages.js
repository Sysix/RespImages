$.fn.RespImages = function (options, breaks) {
    var that = $(this),
		_document = $(document),
		d_w = _document.width(),
        current,		
		imageSize,
		breakpoints = breaks || [400, 600, 800, 1000, 1200];
		
		
	var	settings = $.extend({
            data: 'data-src',
            toSrc: true
        }, options);

    function setCurrent() {
        current = $.map(breakpoints, function (point, n) {
            if (d_w >= point) {
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
                src = _this.attr(settings.data),
                regex = /(index\.php\?rex_img_type=|imagetypes\/)resp\d*(&rex_img_file=|\/)(.*)/;
				
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
        d_w = _document.width();
        if(setCurrent()) {
			resplaceImages();
		}
    });
	
	return that;
};