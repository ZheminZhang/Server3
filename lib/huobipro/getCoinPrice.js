const moment = require('moment');
const http = require('./framework/httpClient');
const Promise = require('bluebird');

// const BASE_URL = 'https://api.huobi.pro';
// 此地址用于国内不翻墙调试
const BASE_URL = 'https://api.huobi.br.com';

// function getTrade(coin, currency) {
//     return new Promise(resolve => {
//         //let url = `${BASE_URL}/market/trade?symbol=${coin}${currency}&type=step0`;
//         let url = `${BASE_URL}/market/trade?symbol=${coin}${currency}`;
//         http.get(url, {
//             timeout: 1000,
//             gzip: true
//         }).then(data => {
//             //console.log(data);
//             resolve(data);
//         }).catch(ex => {
//             //console.log(coin, currency, ex);
//             reject(data);
//         });
//     });
// }

function getCoinPrice(coin, currency, response) {
    let url = `${BASE_URL}/market/trade?symbol=${coin}${currency}`;
    http.get(url, {
        timeout: 1000,
        gzip: true
    }).then(data => {
        //console.log(JSON.parse(data).tick.data[0].price);
        response.ETHPrice = JSON.parse(data).tick.data[0].price;
    }).catch(error => {
        console.log("Get coin price error:");
        console.log(error);
    });
}

//setInterval(get_trade, 1000, 'eth', 'usdt');
module.exports = getCoinPrice;