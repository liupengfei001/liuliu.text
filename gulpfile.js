
// 引入 gulp 摸快
var gulp = require("gulp");
// 引入 sass 摸快
var sass = require("gulp-ruby-sass");
//引入 less 模块
var less = require("gulp-less");

//css 压缩
var minCss = require("gulp-minify-css");
//文件合并
var concat = require("gulp-concat");
//js 文件压缩
var minJs = require("gulp-uglify");
//重命名
var rename = require("gulp-rename");

//css 后编译
var postcss = require('gulp-postcss');
//css 属性前缀
var autoprefixer = require('autoprefixer');
//后编译压缩  处理css
var cssnano = require('cssnano');

var path = {
	"src" : {
		"css" : [
			"./src/css/demo.scss"
		],
		"js" : [
			"./src/js/a.js",
			"./src/js/b.js"
		]
	},
	"dest" : "./dest/"
}
// less 任务
gulp.task("less",function(){
	gulp.src("./src/css/demo2.less")
		.pipe(less())
		.pipe(postcss([
        	autoprefixer //浏览器前缀
        ]))
		.pipe(gulp.dest(path.dest + "css/"))
});

//css 事件任务
gulp.task("css",function(){
	sass(path.src.css)
		//监听 scss 语法错误
    .on('error', sass.logError)
//  .pipe(concat("new.css"))//文件合并,并传入新文件的名字
	.pipe(postcss([
		autoprefixer  // 浏览器前缀
//		cssnano   //压缩css
	]))
//  .pipe(minCss())//输出前先压缩，去除多余空白
//      //输出到指定目录
    .pipe(gulp.dest(path.dest + "css/"))
});

gulp.task("js",function(){
	gulp.src(path.src.js)
	.pipe(concat("min.js"))  
	.pipe(minJs())
	.pipe(gulp.dest(path.dest + "js/"))
	
})
//打包静态文件
gulp.task("build",["css","js"]);


//添加一个默认任务
//执行默认任务时 先 执行 css 任务
gulp.task("default",["css","js"],function(){
	//监听文件修改
	//当监听到文件修改会触发相应的任务事件
	gulp.watch(path.src.css,["css"]);
	gulp.watch(path.src.css,["js"]);
});

