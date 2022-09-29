const mongodb = require('./models/db');

mongodb.once('connect', async () => {
    const col = mongodb.col('fruites');

    // 删除已有
    await col.deleteMany();


    const data = new Array(100).fill().map((v, i) => {
        return {
            name: 'xxxx' + i,
            price: i,
            category: Math.random() > 0.5 ? '水果' : '蔬菜'
        }
    });

    await col.insertMany(data);
    console.log('插入测试数据成功');
});