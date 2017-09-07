var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
// var sourcemaps = require('gulp-sourcemaps');
// var rename = require('gulp-rename');
// var reporter = require('postcss-reporter');
var autoprefixer = require('autoprefixer');
// var cssnano = require('cssnano');

var processors = [
	require('precss'),
	// require('postcss-px-to-viewport')({
	// 	viewportWidth: 320,
	// 	viewportHeight: 568,
	// 	unitPrecision: 5,
	// 	viewportUnit: 'vw',
	// 	selectorBlackList: [],
	// 	minPixelValue: 1,
	// 	mediaQuery: false
	// }),//px转vw
	require('postcss-will-change'),//给不支持will-change属性的浏览器触发GPU处理器
	require('postcss-color-rgba-fallback'),//给不支持rgba的ie8作降级处理
	require('postcss-opacity'),//给不支持opacity的ie8作降级处理
	require('postcss-pseudoelements'),//给不支持::伪元素的ie8作降级处理
	require('postcss-vmin'),//给不支持vmin的ie9作降级处理、
	// require('pixrem'),//给不支持rem的ie8作降级处理
	require('postcss-calc'),//尽可能让calc输出静态的值
	require("postcss-color-function"),//提供颜色函数
	require('postcss-write-svg'),//在样式表的写svg // TODO
	require('postcss-aspect-ratio-mini'),//长宽比效果
	require('postcss-px2rem')({remUnit: 32}),//px转rem
	require('postcss-at2x'),//retina 2倍图片 响应式图片
	// require('postcss-image-set'),//响应式图片,postcss 版本@4.x
	require('postcss-responsive-type'),//响应式文本
	autoprefixer({ browsers: ['> 0%'] }),
	//----------------------------------------
	require('postcss-mq-keyframes'),//将所有关键帧从现有媒体查询中移动到样式表的底部
	require('css-mqpacker'),//相同的媒体查询样式合并到一个媒体查询中
];

gulp.task('styles',function(){
	return gulp.src('src/styles/*.css')
	.pipe(postcss(processors))
	.pipe(gulp.dest('dest/styles/'));
});

gulp.task('default', ['styles']);
var watcher = gulp.watch('src/**/*.css', ['default']);
watcher.on('change', function(event) {
	console.log('File ' + event.path + ' was ' + event.type + ',running tasks...');
});
	