const express = require('express');
const app = express();
const api = require('./controller/api');
const helper = require('./controller/helper');

app.use(express.json());

app.get('/', api.getDataFromApi);
app.listen(3000, () => {
	console.log(`3000 port'undan server ayaga kaldirildi`);
});
