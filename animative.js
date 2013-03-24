(function($){
	/**
	 * Animative is implemented as a document ready function instead
	 * of a plugin by design. Maybe we can compromise on this later and
	 * take the best from both worlds.
	 */
	$(document).ready(function(){
		
		/**
		 * Default options.
		 */
		var defaultOpts = {
			// Interval between frames in milliseconds
			'interval' : 2000,
			
			// Duration of the transition in milliseconds
			'transition-duration' : 100,
			
			// Type of animation. See the documentation, or animate() below.
			'animation' : 'fade'
		}
		
		/**
		 * Does this element have a background set? Slightly hacky, but
		 * future-proof.
		 * @param checkEle Element to check for a background.
		 */
		function hasBackground(checkEle){
			// Create a test ele to get the null background string as
			// returned by this browser.
			var testEle = $('<div style="position:absolute;width;0;height:0;"></div>');
			$('body').append(testEle);
			
			// Check if the given ele has the same string.
			var hasBackground = $(checkEle).css('background') != testEle.css('background');
			
			// remove the test ele.
			testEle.remove();
			
			return hasBackground;
		}

		/**
		 * getOpt
		 * Get a data- property from an element.
		 * @param ele The element to check
		 * @param key The key to check. The non data- portion of the attr.
		 * @param defaultVal The value to return if none was set.
		 * @returns string value, or defaultVal if not found.
		 */
		function getOpt(ele,key,defaultVal){
			key = $(ele).data(key);
			return key ? key : defaultVal;
		}
		
		/**
		 * Get all requested options from an element.
		 * @param ele The element to check
		 * @param defaults An array of keys and default values to check for.
		 * @returns A copy of the input array filled with any specified values.
		 */
		function getOpts(ele,defaults){
			var opts = $.extend({},defaults);
			for(opt in opts){
				opts[opt] = getOpt(ele,opt,opts[opt]);
			}
			return opts;
		}
		
		/**
		 * Animate
		 * Perform an animation.
		 * @param opts An array of options. Must have at least "ele". May
		 * include "duration" in milliseconds, "type" and "callback".
		 */
		function animate(opts){
			opts = $.extend({
				ele  :false,
				duration : 500,
				type : 'fade',
				callback : function(){}
			},opts);
			
			/*
			 * Callback function for animate
			 * Used to remove the animating class before returning to
			 * the script.
			 */
			var callback = function(){
				$(opts.ele).parent().removeClass('animating');
				opts.callback();
			}
			
			$(opts.ele).parent().addClass('animating');
			
			switch(opts.type){
				case 'fade':
					$(opts.ele).fadeIn(opts.duration,callback);
					break;
				case 'slide' : 
					$(opts.ele).slideDown(opts.duration,callback);
					break;
				case 'none' : 
					$(opts.ele).show();
					callback();
					break;
			}
			
		}

		/**
		 * The bulk of it. This may be separated into a proper jQuery
		 * plugin in future.
		 */
		$('.animative').each(function(){
			var ele = $(this);
			var opts = getOpts(ele,defaultOpts);
			
			// The slide we are currently on.
			var slideNum = 0;
			
			// The last element to fade in.
			var lastEle = false;
			
			// The total number of slides.
			var slides = $(ele).children()
				.hide()
				// Apply the CSS here so we don't have to bundle an external CSS file.
				.css({
					position:'absolute',
					left:0,
					top:0,
					right:0,
					bottom:0,
					margin:0
				}).length;
					
			// Don't override an absolutely positioned element.
			if($(ele).css('position') != 'absolute'){
				$(ele).css({
					overflow:'hidden',
					position:'relative'
				})
			}
			
			/**
			 * nextFrame
			 * Loads the next frame. Called when the timer ticks.
			 */
			function nextFrame(){
				// The new element to show
				var thisEle = $(ele).children().eq(slideNum);
				
				// Any options for this specific element.
				var thisOpts = getOpts(thisEle,opts);
				
				// Set a background if one isn't already.
				// Otherwise we'll get an ugly bleed-through from behind
				// while we animate.
				if(!hasBackground(thisEle)){
					$(this).css('background','white');
				}
				
				// If we've been through this before, mode the slide to
				// the bottem of the z-index.
				if(lastEle){
					$(lastEle)
						.css('zIndex',0)
						.removeClass('active');
				}
				
				// Move the new element to the top of the z-index.
				$(thisEle)
					.css('zIndex',1);
				
				// Animate our new element in, with the specified opts.
				animate({
					ele : thisEle,
					duration : thisOpts['transition-duration'],
					type : thisOpts['animation'],
					callback : function(){
						// Housekeeping, ready for next time.
						$(lastEle).hide();
						$(thisEle).addClass('active');
						lastEle = thisEle;
						
						slideNum = slideNum == slides-1 ? 0 : slideNum+1;
						window.setTimeout(nextFrame,thisOpts.interval);
					}
				});
				
			}
			
			// Start the ball rolling.
			nextFrame();
			
			
		});
		
	});
})(jQuery);
