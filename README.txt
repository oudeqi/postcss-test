
/*
	will-change属性用于提前让浏览器知道某些元素设计的动画。这允许浏览器优化呈现动画渲染过程，防止延误和闪烁。
	然而，目前IE/Edge，Safari和Opera Mini还不支持这个属性。
	@Andrey Sitnik开发的postcss-will-change插件，添加一个回退，这将有助于这些浏览器渲染做得更好，
	即使浏览器不支持will-change属性，也不会影响效率。它通过添加backface-visibility属性，触发GPU处理器。
	这个插件在gulpfile.js 文件中应该在Autoprefixer之前加载。
	这是允许Autoprefixer插件给backface-visibility添加浏览器前缀著作权归作者所有。
	------------------------------------------------------
	.thisWillChange { will-change: transform; }
	------------------------------------------------------
	.thisWillChange { backface-visibility: hidden; will-change: transform; }
*/

/*
	IE8不支持rgba()颜色，所以@Guillaume Demesy的postcss-color-rgba-fallback插件添加了一个十六进制颜色作为降级处理
	------------------------------------------------------
	.rgbaFallback { background: rgba(0,0,0,0.5); }
	------------------------------------------------------
	.rgbaFallback { background: #000000; background: rgba(0,0,0,0.5); }
*/

/*
	IE8也不支持opacity属性，所以@Vincent De Oliveira提供了postcss-opacity插件，给IE浏览器添加滤镜属性，作为降级处理。
	------------------------------------------------------
	.opacityFallback { opacity: 0.5; }
	------------------------------------------------------
	.opacityFallback { opacity: 0.5; -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)"; }
*/

/*
	将伪元素的::转换为:例如::before使用两个冒号,::表示为伪元素，而:hover使用一个冒号:表示为伪类。
	在IE8中仅支持一个冒号:，并不支持::的伪元素。通过@Sven Tschui的postcss-pseudoelements插件，可以得到最好的实践，
	插件能自将的将::转换为:
	------------------------------------------------------
	.pseudo-element::before { content: ''; }
	------------------------------------------------------
	.pseudo-element:before { content: ''; }
*/

/*
	使用vm为vmin做降级处理:IE9中并不支持viewport相对单位vmin，但可以使用vm作为等效的单位。
	如果你为了让IE9支持vmin，可以使用@Vincent De Oliveira的postcss-vmin插件，对IE9做降级处理。
	------------------------------------------------------
	.vmFallback { width: 50vmin; }
	------------------------------------------------------
	.vmFallback { width: 50vm; width: 50vmin; }
*/

/*
	给rem添加px作为降级处理:IE8一直都不支持rem单位，而且在IE9和IE10中他们都不支持伪元素和font的缩写。
	使用@Vincent De Oliveira和@Rob Wierzbowski的node-pixrem插件，可以自动为rem添加px单位作为降级处理
	------------------------------------------------------
	.remFallback { height: 10rem; font: 2rem Arial; } 
	.remFallback::before { content: ''; line-height: 1rem; }
	------------------------------------------------------
	.remFallback { height: 160px; height: 10rem; font: 32px Arial; font: 2rem Arial; } 
	.remFallback:before { content: ''; line-height: 16px; line-height: 1rem; }

*/

/*
	postcss-calc可以在你的代码中输出静态的值，如果它不能，需要浏览器自己根据calc()进行动态计算。
	------------------------------------------------------
	@define-mixin columns_calc $count { 
		width: calc( 100% / $count );
		@if $count > 1 { float: left; } 
	} 
	.column_calculated { @mixin columns_calc 2; }
	------------------------------------------------------
	.column_calculated {
    	width: 50%;
    	float: left;
	}
*/

/*
	处理颜色的插件:postcss-color-function
	在预处理器中计算颜色是最有用的特性之一。PostCSS的颜色插件可以根据颜色进行计算
	比如变亮(lighten())，变暗(darken())，饱和度和透明度的值处理等等
*/

/*	
	// TODO
	生成CSS雪碧图:postcss-sprites
	这个插件会扫描你CSS中的图像，然后将这些图像合并成一张雪碧图，
	并且按照正确的显示位置重新更新你的代码。
	------------------------------------------------------
	.comment { background: url(images/sprite/ico-comment.png) no-repeat 0 0; }
	.bubble { background: url(images/sprite/ico-bubble.png) no-repeat 0 0; }
	------------------------------------------------------
	.comment { background-image: url(images/sprite.png); background-position: 0 0; }
	.bubble { background-image: url(images/sprite.png); background-position: 0 -50px; }
*/

/*
	postcss-rgba-hex --将rgba颜色值转为纯hex
	color-convert --用hex颜色值替换rgba颜色值
	postcss-cssstats --为编译后的css项目提供静态分析数据
	postcss-neat --创建网格
	postcss-instagram --给页面元素创建不同滤镜
	gulp-evil-icons --allows to use Evil Icons in your project with Gulp.
------------------------------------------
	// TODO 
	postcss-assets --inserts image dimensions and inlines files.
	// TODO 
	postcss-write-svg --allows you to write simple SVG directly in your CSS.
	postcss-inline-svg --reference an SVG file and control its attributes with CSS syntax.
	postcss-svg -- lets you inline SVGs in CSS.
	postcss-font-magician --generates all the @font-face rules needed in CSS.
	postcss-px-to-viewport --A plugin for PostCSS that generates viewport units (vw, vh, vmin, vmax) from pixel units.
	postcss-media-minmax 
		--@media screen and (500px <= width <= 1200px)
		--@media screen and (min-width: 500px) and (max-width: 1200px)
		----------------------------------------------
		@custom-media --foo (width >= 20em) and (width <= 50em);
		@custom-media --bar (height >= 300px) and (height <= 600px);
		@media (--foo) and (--bar) {}
		--------------------------------------------------
		@media (min-width: 20em) and (max-width: 50em) and (min-height: 300px) and (max-height: 600px) {}
*/ 

/*
	postcss-px2rem
	gulp.task('default', function() {
		var processors = [px2rem({remUnit: 75})];
		return gulp.src('./src/*.css')
	    	.pipe(postcss(processors))
	    	.pipe(gulp.dest('./dest'));
	});
*/

/*
	postcss-at2x
	--------------------------------
	.multi {
  		background: url(http://example.com/image.png),
            		linear-gradient(to right, rgba(255, 255, 255, 0),  rgba(255, 255, 255, 1)),
            		green,
            		url(/public/images/cool.png) at-2x;
	}
	--------------------------------
	.multi {
		background: url(http://example.com/image.png),
              linear-gradient(to right, rgba(255, 255, 255, 0),  rgba(255, 255, 255, 1)),
              green,
              url(/public/images/cool.png);
	}
	@media (min-device-pixel-ratio: 1.5), (min-resolution: 144dpi), (min-resolution: 1.5dppx) {
	  .multi {
	    background-image: url(http://example.com/image.png), 
	                      linear-gradient(to right, rgba(255, 255, 255, 0),  rgba(255, 255, 255, 1)), 
	                      none,
	                      url(/public/images/cool@2x.png);
	  }
	}
*/

/*
	postcss-image-set 
	------------------------------------------------
	.foo {
    	background-image: image-set(url(img/test.png) 1x,
                                url(img/test-2x.png) 2x,
                                url(my-img-print.png) 600dpi);
	}
	------------------------------------------------
	.foo {
	    background-image: url(img/test.png);
	    background-image: image-set(url(img/test.png) 1x,
	                                url(img/test-2x.png) 2x,
	                                url(my-img-print.png) 600dpi);
	}
*/

/*
	postcss-responsive-type:响应式文本
	-------------------------------------
	html {
	  font-size: responsive;
	}
*/

/*

	postcss-mq-keyframes:将所有关键帧从现有媒体查询中移动到样式表的底部
	---------------------------------------------------------
	@media only screen and (min-width: 415px) {
	    .pace {
	        animation: pace-anim 5s;
	    }
	    @keyframes pace-anim {
	        100% {
	            opacity: 0;
	        }
	    }
	}
	-----------------------------------------------
	@KyoNagashima的css-mqpacker插件可以找到样式表中相同的媒体查询样式合并到一个媒体查询中
	这样允许你在写CSS的时候，媒体查询可以重复编写，你也不用担心这样会对你的样式产生冗余代码，而影响你的效率。
	node-css-mqpacker：将所有相同规则的媒体查询，合并为一条
*/

/*
	postcss-fontpath:
	-----------------------------------
	@font-face {
	  font-family: 'My Font';
	  font-path: '/path/to/font/file';
	  font-weight: normal;
	  font-style: normal;
	}
	-----------------------------------
	@font-face {
	  font-family: 'My Font';
	  src: url("/path/to/font/file.eot") format('embedded-opentype'),
	       url("/path/to/font/file.woff") format('woff2'),
	       url("/path/to/font/file.woff") format('woff'),
	       url("/path/to/font/file.ttf") format('truetype'),
	       url("/path/to/font/file.svg") format('svg');
	  font-weight: normal;
	  font-style: normal;
	}
*/

