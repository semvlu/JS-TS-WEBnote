var http = require('http');
// URL module parse web adr into readable parts
var url = require('url');
http.createServer(function (req,res) {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    var q = url.parse(req.url, true).query;
    var txt = q.year + " " + q.month;
    res.write(req.url);
    res.end(txt);
}).listen(8080);


// create a module
// ----------dateTimeModule.js-------------------
exports.dateTime = function() { return Date();}
// ----------------------------------------------
var dt = require ('./dateTimeModule');

var adr = 'http://localhost:8080/default.htm?year=2024&month=oct';
var q = url.parse(adr, true);
console.log(q.host); // 'localhost:8080'
console.log(q.pathname); // default.htm'
console.log(q.search); // '?year=2024&month=oct'
var qData = q.query; // obj: {year : 2017, month : 'oct'}
console.log(qData.month);


// File Sys
var fs = require('fs');
http.createServer(function(req,res) {
    fs.readFile('template4JS.html', function(err, data) {
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(8080);

// Create & Update file
// appendFile / writeFile: no diff in creation,
// but diff in update, append: add; write: overwrite
fs.appendFile('file.txt', 'This is the content', function(err) {
    if(err) throw err;
    console.log('Saved!');
});

fs.open('file.txt', 'w', function(err,file) {
    if(err) throw err;
    console.log('Saved!');
});

// Delete file
fs.unlink('file.txt', function(err) {
    if(err) throw err;
    console.log('File Deleted!');
});

// Rename file
fs.rename(oldFileName, newFileName, function(err) {
    if(err) throw err;
    console.log(`File: ${oldFileName} renamed as ${newFileName}`);
});

// return content, or 404
// access: http://localhost:8080/<filename>.html
http.createServer(function(req, res) {
    var q = url.parse(req.url, true);
    var filename = '.' + q.pathname;
    fs.readFile(filename, function(err,data) {
        if(err) {
            res.writeHead(404, {'Content-Type' : 'text/plain'});
            res.end('404 Not Found');
        }
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.write(data);
        res.end();
    });
}).listen(8080);


// Events
var events = require('events');
var eventEmitter = new events.eventEmitter();
var eventHandler = () => {
    console.log('Event Received');
}
eventEmitter.on('explosion', eventHandler);
eventEmitter.emit('explosion');


// Upload file
// produce html form
var formid = require('formidable');

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.write('<form action="fileupload" \
         method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
}).listen(8080);

// parse uploaded file
http.createServer(function(req, res) {
    if(req.url == '/fileupload') {
        var form = new formid.IncomingForm();
        form.parse(req, function (err, fields, files) {
            res.write('File uploaded');
            res.end();
        });
    } else {
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.write('<form action="fileupload" \
             method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
}).listen(8080);

// Once uploaded, file is placed in a pro tem. folder
// Need to save file
http.createServer(function(req,res) {
    if(req.url == '/fileupload') {
        var form = new formid.IncomingForm();
        form.parse(req, function(err, fields, files) {
            var oldpath = files.filetoupload.path;
            var newpath = './uploads/' + files.filetoupload.name;
            fs.rename(oldpath, newpath, function(err) {
                if (err) throw err;
                res.write('File uploaded and moved!');
                res.end();
            });
        });
    } else {
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.write('<form action="fileupload" \
            method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('</form>');
        return res.end();
    }
}).listen(8080);


// Send email
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'password'
    }
});

let _2fa = Math.floor(100000 + Math.random() * 900000); // gen 6-digit number
var mailOpt = {
    from: 'your-email@gmail.com',
    to: 'receiver@outlook.com, receiver2@gmail.com',
    subject: 'Test authentication mail server',
    text: `Your authentication code is: ${_2fa}`,
    // html in place of text:
    html: `<h1>Welcome Back</h1><p>You authentication code is: ${_2fa}</p>`
};
transporter.sendMail(mailOpt, function(error, info){
    if(error) console.log(error);
    else console.log('Email sent: ' + info.respsone);
});


// NPM:
// npm install <module>