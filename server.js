import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

// Estas dos líneas nos permiten obtener la ruta del directorio actual de forma segura.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

// Servimos los archivos estáticos de la carpeta 'public'
// Usamos path.join para crear una ruta absoluta, lo que previene errores.
app.use(express.static(path.join(__dirname, "public")));

// Lógica de Socket.IO
// 'io.on' escucha eventos globales. El evento 'connection' se dispara
// cada vez que un nuevo usuario abre la página web.
io.on("connection", (socket) => {
  console.log("✅ Un usuario se ha conectado:", socket.id);

  // Notificamos a TODOS los demás clientes que alguien nuevo ha llegado.
  // 'socket.broadcast.emit' envía un mensaje a todos excepto al que acaba de conectar.
  socket.broadcast.emit(
    "user connected",
    "Un nuevo usuario se ha unido al chat."
  );

  // Escuchamos el evento 'chat message' que nos envía el cliente
  socket.on("chat message", (msg) => {
    console.log(`💬 Mensaje de ${socket.id}: ${msg}`);
    // Reenviamos ese mensaje a TODOS los clientes conectados, incluyéndome.
    io.emit("chat message", msg);
  });

  // Escuchamos el evento 'typing' que nos envía el cliente
  socket.on("escribiendo", (user) => {
    // Retransmitimos este evento a todos los demás clientes
    socket.broadcast.emit("escribiendo", user);
  });

  // El evento 'disconnect' se dispara cuando un usuario cierra la pestaña.
  socket.on("disconnect", () => {
    console.log("Un usuario se ha desconectado:", socket.id);
    // Notificamos a todos los que quedan que alguien se fue.
    io.emit("usario desconectado", "Un usuario ha abandonado el chat.");
  });
});

// 6. Iniciamos el servidor para que empiece a escuchar peticiones
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
