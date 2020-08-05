const app = require('./app');
let http = require('http');
const server = http.createServer(app)
const sequelize = require('./utils/database');
const port = process.env.PORT || 3000;
const io = require('socket.io')(server)

async function start() {
    try {
        await sequelize.sync();
        server.listen(port, () => console.log(`Server has been started on ${port} port`));

        io.on("connection", socket => {
            console.log('hi');
            socket.on('message', data=>{
                console.log(data);
                socket.broadcast.emit('message', data)
            })
            socket.on('confirm', (data)=>{
                console.log(data);
                socket.broadcast.emit('confirm', {data})
            })
        })
    } catch (e) {
        console.log(e);
    }
}

start();


