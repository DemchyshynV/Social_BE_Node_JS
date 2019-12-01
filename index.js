const app = require('./app');
const sequelize = require('./utils/database');
const port = process.env.PORT || 3000;

async function start() {
    try {
        await sequelize.sync();
        app.listen(port, () => console.log(`Server has been started on ${port} port`));
    } catch (e) {
        console.log(e);
    }
}

start();


