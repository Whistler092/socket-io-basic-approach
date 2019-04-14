const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

// Start Express server
const app = express();
app.use(index);

const server = http.createServer(app);

// Socket.io
const io = socketIo(server);
const getApiAndEmit = async socket => {
    try {
        const api_url = "https://api.darksky.net/forecast/d7770dedafb3d23ec7d32d0749d0913c/37.8267,-122.4233";
        const res = await axios.get(api_url);

        // Emitting a new message. It will be consumed by the client
        console.log("Emiting FromAPI");
        socket.emit("FromAPI", res.data);
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};

let interval;
io.on("connection", socket => {
    //console.log("new client connected"), setInterval(() => getApiAndEmit(socket), 10000);
    console.log("new client connected",socket.id);

    if (interval) {
        clearInterval(interval);
    }

    interval = setInterval(() => getApiAndEmit(socket), 10000);

    socket.on("disconnect", () => console.log("client disconnected"));
})

// start server
server.listen(port, () => console.log(`Listening on port ${port}`));