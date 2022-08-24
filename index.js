const express = require('express');
const app = express();
const api = require('./controller/api');
const { authController } = require('./controller/auth');

const { auhtMw } = require('./middleware/auth');
const { userMw } = require('./middleware/user');

app.use(express.json());
app.post('/login', auhtMw.signIn, authController.signIn);
app.get('/', auhtMw.authenticated, api.getDataFromApi);
app.route('/user', auhtMw.authenticated)
	.post(userMw.create, authController.create)
	.put(userMw.update, authController.update)
	.delete(userMw.delete, authController.delete);
app.listen(3000, () => {
	console.log(`3000 port'undan server ayaga kaldirildi`);
});
