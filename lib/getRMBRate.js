var http = require('http');
var cheerio = require('cheerio');

function getRMBRate(response){
    http.get('http://www.boc.cn/sourcedb/whpj/', function(res){
    //http.get('http://www.gongjuji.net', function(res){
        var html = '';
        res.on('data', function(data){
            html+=data;
        });
        res.on('end', function(){
            //console.log(html)
            parseHtml(html, response);
        });
    }).on('error', function(err){
        console.log("Get rate error:");
        console.log(err);
    });
}

//解析html 获取内容
function parseHtml(html, response) {
    var $ = cheerio.load(html);
    var $table = $('td');
    var tableList = [];
    $table.each(function () {
        //var h2 = $(this).find("td").text();
        var item = $(this).text()
        tableList.push(item)
    })
    //console.log(tableList)
    var currency = '美元'
    for (var i = 0; i < tableList.length; i++){
        if (tableList[i] == currency){
            var RMBRate = Number(tableList[i+5]);
            if (RMBRate){
                response.RMBRate = RMBRate;
            }
            return;
        }
    }
}

module.exports = getRMBRate;