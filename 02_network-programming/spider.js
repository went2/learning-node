
const originRequest = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

function request(url, callback) {
  const options = {
    url,
    encoding: null
  };
  originRequest(url, options, callback);
}

const url = `https://www.nunuyy2.org/dianshiju/%E5%90%8C%E6%80%A7---0-.html`;

for (let i = 100553; i < 100563; i++) {
  const url = `https://www.dy2018.com/i/${i}.html`;
  request(url, (err, res, body) => {
    const html = iconv.decode(body, 'gb2312');
    const $ = cheerio.load(html);
    console.log($('.title_all h1').text());
  });
}
