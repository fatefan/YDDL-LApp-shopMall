var path = require('path');
var fs = require("fs");
var name = "";
process.argv.map(function (value) {
    if(/^page=/.test(value)) {
        name = value.split("=")[1];
    }
});
if(name == '') {
    console.error("您没有传页面名称","格式: node createPage.js page='name'");
    process.exit(1);
}
var item = {
        dir:path.resolve('pages/'+name),
        js:path.resolve('pages/'+name+"/"+name+".js"),
        json:path.resolve('pages/'+name+"/"+name+".json"),
        wxml:path.resolve('pages/'+name+"/"+name+".wxml"),
        wxss:path.resolve('pages/'+name+"/"+name+".wxss")
};

fs.exists(item.dir,function (exists) {
    if(!exists) {
        fs.mkdir(item.dir,function (err) {
            if(err) {
                return isError(err);
            } else {
                fs.writeFile(item.js,'',"utf8")
                fs.writeFile(item.json,'',"utf8")
                fs.writeFile(item.wxml,'',"utf8")
                fs.writeFile(item.wxss,'',"utf8")
            }
        })
    }
})