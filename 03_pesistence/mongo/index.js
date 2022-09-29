const express = require('express');
const path = require('path');
const mongo = require('./models/db');

const app = express();

// 路由
app.get('/', (req, res) => {
    res.sendFile(path.resolve('./index.html'));
});

//<---ajax接口--->

// 分页查询
app.get('/api/list', async (req, res) => {
    const { page, category, keyword } = req.query;

    // 构建查询条件
    const condition = {};
    if (category) {
        condition.category = category;
    }
    if (keyword) {
        condition.name = { $regex: new RegExp(keyword) };
    }

    try {
        const col = mongo.col('fruits');
        const total = await col.countDocuments(condition);
        const fruits = await col.find(condition)
            .skip((page - 1) * 5)
            .limit(5)
            .toArray();

        res.json({ ok: 1, data: { fruits, page: { total, page } } });
    } catch (err) {
        console.log(err);
    }
});

app.get('/api/category', async (req, res) => {
    const col = mongo.col('fruits');
    const data = await col.distinct('category');
    res.json({ ok: 1, data });
});

app.listen(3000);
