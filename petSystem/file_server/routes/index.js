var express = require('express');
var router = express.Router();
const fs = require('fs');
var formidable = require('formidable');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


// 图片上传的接口
router.post('/uploadFile', function (req, res) {
  var form = new formidable.IncomingForm();
  //设置文件上传存放地址
  //form.uploadDir = "./public/images";
  //执行里面的回调函数的时候，表单已经全部接收完毕了。
  form.parse(req, function (err, fields, files) {
    console.log("files:", files)  //这里能获取到图片的信息
    console.log("fields:", fields) //这里能获取到传的参数的信息，如上面的message参数，可以通过fields。message来得到

    // console.log(files.file.name);
    // console.log(files.file.path);
    // 文件已经被存储到了临时目录，要做的事儿：1. 从临时目录读取文件 2.将文件写入到指定的目录
    // 设置上传的图片保存在服务器端的名字
    // 为了名字不重复，前面添加上时间戳以及一个随机数
    const saveName = Math.round(Date.now() / 1000) + Math.floor(Math.random() * 100) + files.file.name;
    const des_file = __dirname + '/../public/images/' + saveName; // 设置文件最终存储的路径和文件名
    // 从临时目录里面读取文件 然后写入到指定的位置
    fs.readFile(files.file.path, function (err, data) {
      fs.writeFile(des_file, data, function (err) {
        if (err) throw err;
        // 删除临时文件
        fs.unlink(files.file.path, function (err) {
          if (err) throw err;
          response = {
            success: true,
            message: 'File uploaded successfully',
            filename: files.file.name,
            saveName: saveName
          };
          res.end(JSON.stringify(response));
        });
      });
    });
  })

});


module.exports = router;
