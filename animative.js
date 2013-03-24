(function($){

	$(document).ready(function(){
		
		var defaultOpts = {
			'interval' : 2000,
			'transition-duration' : 100,
			'animation' : 'fade'
		}
		
		/**
		 * Does this element have a background set? Slightly hacky, but
		 * future-proof.
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

		function getOpt(ele,key,defaultVal){
			key = $(ele).data(key);
			return key ? key : defaultVal;
		}
		
		function getOpts(ele,defaults){
			var opts = $.extend({},defaults);
			for(opt in opts){
				opts[opt] = getOpt(ele,opt,opts[opt]);
			}
			return opts;
		}
		
		function animate(opts){
			opts = $.extend({
				ele  :false,
				duration : 500,
				type : 'fade',
				callback : function(){}
			},opts);
			
			
			switch(opts.type){
				case 'fade':
					$(opts.ele).fadeIn(opts.duration,opts.callback);
					break;
				case 'slide' : 
					$(opts.ele).slideDown(opts.duration,opts.callback);
					break;
				case 'none' : 
					$(opts.ele).show();
					opts.callback();
					break;
			}
			
		}

		$('.animative').each(function(){
			var ele = $(this);
			var opts = getOpts(ele,defaultOpts);
			var slideNum = 0;
			var lastEle = false;
			var slides = $(ele)
				.css({
					overflow:'hidden',
					position:'relative'
				})
				.children()
					.hide()
					.css({
						position:'absolute',
						left:0,
						top:0,
						right:0,
						bottom:0,
						margin:0
					}).length;
					
			function nextFrame(){
				var thisEle = $(ele).children().eq(slideNum);
				var thisOpts = getOpts(thisEle,opts);
							
				if(!hasBackground(thisEle)){
					$(this).css('background','white');
				}
				
				if(lastEle){
					$(lastEle).css('zIndex',0);
				}
				$(thisEle).css('zIndex',1);
				
				animate({
					ele : thisEle,
					duration : thisOpts['transition-duration'],
					type : thisOpts['animation'],
					callback : function(){
						$(lastEle).hide();
						lastEle = thisEle;
						
						slideNum = slideNum == slides-1 ? 0 : slideNum+1;
						window.setTimeout(nextFrame,thisOpts.interval);
					}
				});
				
			}
			
			nextFrame();
			
			
		});
		
	});
})(jQuery);
