### https://www.valentinog.com/blog/socket-io-node-js-react/


WebSocket is basically an internet communication protocol with a relevant interesting feature: it provides a full-duplex channel over a single TCP connection.

With WebSockets, a client and a server will be able to talk to each other in real time, kind of like they were involved in a telephone call: once connected, a client will be able to receive data from the server, without any need to continuously refresh the web page. On the other hand the server will also be able to receive data in real time from the client inside the same connection.

What’s more interesting is the WebSockets ability to work with an event-driven model: both the server and the client can react to events and messages.

However one thing to keep in mind is that Socket.IO is not an WebSocket implementation.

The authors state that “Socket.IO indeed uses WebSocket as a transport when possible [..] but a WebSocket client will not be able to connect to a Socket.IO server, and a Socket.IO client will not be able to connect to a WebSocket server”.

## Commands

npm i axios express socket.io





## How does Socket.IO works by the way?
The first and most important method you will encounter while working with Socket.IO is on(). The on() method takes two arguments: the name of the event, in this case “connection” and a callback which will be executed after every connection event. on() is nothing more than a core Node.js method tied to the EventEmitter class.

The connection event returns a socket object which will be passed to the callback function. By using said socket you will be able to send data back to the client in real time.

If you remember, Caty wants to know the temperature every 10 seconds: we can use setInterval inside the callback, and inside setInterval we can use another arrow function which will call the getApiAndEmit function we saw earlier. The code should be really straightforward: