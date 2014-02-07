$.fn.RespImages = function (options, breaks) {
    var that = $(this),
        breakpoints, settings = $.extend({
            data: 'data-src',
            toSrc: true
        }, options);
		
    if (breaks) {
        breakpoints = breaks
    } else {
        breakpoints = [400, 600, 800, 1000, 1200]
    }
	
    var _document = $(document),
		d_w = _document.width(),
        current,
		
		imageSize;

    function setCurrent() {
        current = $.map(breakpoints, function (point, n) {
            if (d_w >= point) {
                return point
            }
        });
        if (current.length == 0) {
            current.push(breakpoints[0])
        }
        imageSize = current.pop()
    }
	
    function resplaceImages() {
        that.each(function () {
            var _this = $(this),
                src = _this.attr(settings.data),
                regex = /index\.php\?rex_img_type=resp(\d*)&rex_img_file=(.*)/;
				
            if (src && regex.test(src)) {
                var result = src.match(regex),
                    attr = (settings.toSrc) ? 'src' : settings.data;
					
                _this.attr(attr, 'index.php?rex_img_type=resp' + imageSize + '&rex_img_file=' + result[2])
            }
			
        })
    }
	
    setCurrent();
    resplaceImages();
	
    _window.on('resize', function () {
        d_w = _document.width();
        setCurrent();
        resplaceImages()
    })
};