var kam = function(elems){
	return new kam.prototype.init(elems);
};

kam.prototype = {
	init: function(elems){
		this.elements = (elems.nodeType) ? [elems] : elems;
	},

	elements: [],

	//each Function
	each: function(fn){
        for(var i = 0, j=this.elements.length; i<j; i++){
            fn.call(this.elements[i]);
        };
    }, // End of each

    //getStyle Function
 	getStyle: function(prop){
		var elem = this.elements[0];
		if(elem.style[prop]){ 
			return elem.style[prop];
		}
		else if(elem.currentStyle){
			return elem.currentStyle[prop];
		}
		else if(document.defaultView){
			prop = prop.replace( /([A-Z])/g, "-$1" ).toLowerCase();
			return document.defaultView.getComputedStyle(elem, "").getPropertyValue(prop);
		}else{
			return 0;
		};
	}, // End of getStyle

	//animate Function
	animate: function(options){
		
		this.each(function(){
		
			var elem = this;
			
			var time = 0;
			
			var startCss = {};
			
			for(var prop in options.css){
				
				startCss[prop] = {};
				startCss[prop].start = parseFloat( kam(elem).getStyle(prop) ); 
				startCss[prop].change = options.css[prop] - startCss[prop].start;
			
			};
			
			var anim = setInterval(function(){
			
				time += 30;
				
				for(var prop in options.css){
				
					var newval = Math[options.easing](time, startCss[prop].start, startCss[prop].change, options.duration, 2);
										
					elem.style[prop] = newval + "px";
					
				};
				
				if(time >= options.duration){
					clearInterval(anim);
					options.done();
					anim = null; // Clean Up to prevent memory leaks.
					
				};
			
			}, 30); // end setInterval()
		
		}); // end each()
	} // End of animate
 };

kam.prototype.init.prototype = kam.prototype;

//AJAX
kam.ajax = function(options){

	options = {
		type: options.type || "GET",
		dataType: options.dataType || "json",
		url: options.url || "/",
		timeout: options.timeout || 10000,
		success: options.success || function(){},
		error: options.error || function(){},
		data: options.data || {}
	};
	
	var xhr = new XMLHttpRequest();
	
	var serialize = function(){
		var ser = [];
		for(var key in options.data){
			ser.push( key + "=" + encodeURIComponent(options.data[key]) );
		};
		return "?" + ser.join("&");
	};
	
	xhr.open(options.type, options.url + serialize(), true);
	
	var checkHttp = function(){		
		return (xhr && (xhr.status === 200 || xhr.status === 304)); 
	};
	
	var handleResponse = function(){
		var dt = options.dataType;
		return dt === "xml" ? xhr.responseXML : dt === "json" && JSON ? JSON.parse(xhr.responseText) : xhr.responseText;
	};
	
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(checkHttp()){
				options.success( handleResponse() );
			}else{
				options.error();
			};
			
			xhr = null;
		};
	};
	
	xhr.send(null);
	
	setTimeout(function(){
		if(xhr){
			xhr.abort();
			options.error();
			xhr = null;
		};
	}, options.timeout);

}; // end ajax


/*
	Easing
	----------
	Example: easing(currentTime, startValue, changeToValue, duration, elasticity)
	----------
	Methods:
		linearTween
		easeInQuad
		easeOutQuad
		easeInOutQuad
		easeInCubic
		easeOutCubic
		easeInOutCubic
		easeInQuart
		easeOutQuart
		easeInOutQuart
		easeInQuint
		easeOutQuint
		easeInOutQuint
		easeInSine
		easeOutSine
		easeInOutSine
		easeInExpo
		easeOutExpo
		easeInOutExpo
		easeInCirc
		easeOutCirc
		easeInOutCirc
		easeInElastic
		easeOutElastic
		easeInOutElastic
		easeInBack
		easeOutBack
		easeInOutBack
		easeInBounce
		easeOutBounce
		easeInOutBounce	
*/

Math.linearTween=function(a,c,b,d){return b*a/d+c};Math.easeInQuad=function(a,c,b,d){return b*(a/=d)*a+c};Math.easeOutQuad=function(a,c,b,d){return-b*(a/=d)*(a-2)+c};Math.easeInOutQuad=function(a,c,b,d){return(a/=d/2)<1?b/2*a*a+c:-b/2*(--a*(a-2)-1)+c};Math.easeInCubic=function(a,c,b,d){return b*(a/=d)*a*a+c};Math.easeOutCubic=function(a,c,b,d){return b*((a=a/d-1)*a*a+1)+c};Math.easeInOutCubic=function(a,c,b,d){return(a/=d/2)<1?b/2*a*a*a+c:b/2*((a-=2)*a*a+2)+c};
Math.easeInQuart=function(a,c,b,d){return b*(a/=d)*a*a*a+c};Math.easeOutQuart=function(a,c,b,d){return-b*((a=a/d-1)*a*a*a-1)+c};Math.easeInOutQuart=function(a,c,b,d){return(a/=d/2)<1?b/2*a*a*a*a+c:-b/2*((a-=2)*a*a*a-2)+c};Math.easeInQuint=function(a,c,b,d){return b*(a/=d)*a*a*a*a+c};Math.easeOutQuint=function(a,c,b,d){return b*((a=a/d-1)*a*a*a*a+1)+c};Math.easeInOutQuint=function(a,c,b,d){return(a/=d/2)<1?b/2*a*a*a*a*a+c:b/2*((a-=2)*a*a*a*a+2)+c};
Math.easeInSine=function(a,c,b,d){return-b*Math.cos(a/d*(Math.PI/2))+b+c};Math.easeOutSine=function(a,c,b,d){return b*Math.sin(a/d*(Math.PI/2))+c};Math.easeInOutSine=function(a,c,b,d){return-b/2*(Math.cos(Math.PI*a/d)-1)+c};Math.easeInExpo=function(a,c,b,d){return a==0?c:b*Math.pow(2,10*(a/d-1))+c};Math.easeOutExpo=function(a,c,b,d){return a==d?c+b:b*(-Math.pow(2,-10*a/d)+1)+c};
Math.easeInOutExpo=function(a,c,b,d){return a==0?c:a==d?c+b:(a/=d/2)<1?b/2*Math.pow(2,10*(a-1))+c:b/2*(-Math.pow(2,-10*--a)+2)+c};Math.easeInCirc=function(a,c,b,d){return-b*(Math.sqrt(1-(a/=d)*a)-1)+c};Math.easeOutCirc=function(a,c,b,d){return b*Math.sqrt(1-(a=a/d-1)*a)+c};Math.easeInOutCirc=function(a,c,b,d){return(a/=d/2)<1?-b/2*(Math.sqrt(1-a*a)-1)+c:b/2*(Math.sqrt(1-(a-=2)*a)+1)+c};
Math.easeInElastic=function(a,c,b,d,e,f){if(a==0)return c;if((a/=d)==1)return c+b;f||(f=d*0.3);e<Math.abs(b)?(e=b,b=f/4):b=f/(2*Math.PI)*Math.asin(b/e);return-(e*Math.pow(2,10*(a-=1))*Math.sin((a*d-b)*2*Math.PI/f))+c};Math.easeOutElastic=function(a,c,b,d,e,f){if(a==0)return c;if((a/=d)==1)return c+b;f||(f=d*0.3);if(e<Math.abs(b))var e=b,g=f/4;else g=f/(2*Math.PI)*Math.asin(b/e);return e*Math.pow(2,-10*a)*Math.sin((a*d-g)*2*Math.PI/f)+b+c};
Math.easeInOutElastic=function(a,c,b,d,e,f){if(a==0)return c;if((a/=d/2)==2)return c+b;f||(f=d*0.3*1.5);if(e<Math.abs(b))var e=b,g=f/4;else g=f/(2*Math.PI)*Math.asin(b/e);return a<1?-0.5*e*Math.pow(2,10*(a-=1))*Math.sin((a*d-g)*2*Math.PI/f)+c:e*Math.pow(2,-10*(a-=1))*Math.sin((a*d-g)*2*Math.PI/f)*0.5+b+c};Math.easeInBack=function(a,c,b,d,e){e==void 0&&(e=1.70158);return b*(a/=d)*a*((e+1)*a-e)+c};Math.easeOutBack=function(a,c,b,d,e){e==void 0&&(e=1.70158);return b*((a=a/d-1)*a*((e+1)*a+e)+1)+c};
Math.easeInOutBack=function(a,c,b,d,e){e==void 0&&(e=1.70158);return(a/=d/2)<1?b/2*a*a*(((e*=1.525)+1)*a-e)+c:b/2*((a-=2)*a*(((e*=1.525)+1)*a+e)+2)+c};Math.easeInBounce=function(a,c,b,d){return b-Math.easeOutBounce(d-a,0,b,d)+c};Math.easeOutBounce=function(a,c,b,d){return(a/=d)<1/2.75?b*7.5625*a*a+c:a<2/2.75?b*(7.5625*(a-=1.5/2.75)*a+0.75)+c:a<2.5/2.75?b*(7.5625*(a-=2.25/2.75)*a+0.9375)+c:b*(7.5625*(a-=2.625/2.75)*a+0.984375)+c};
Math.easeInOutBounce=function(a,c,b,d){return a<d/2?Math.easeInBounce(a*2,0,b,d)*0.5+c:Math.easeOutBounce(a*2-d,0,b,d)*0.5+b*0.5+c};