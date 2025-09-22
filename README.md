Hoja de Trabajo: Chat en Tiempo Real con WebSockets
Es una aplicación de chat simple construida con Node.js, Express y Socket.IO. El objetivo es demostrar la comunicación bidireccional y en tiempo real entre múltiples clientes a través de un servidor.

Características
-Mensajería Instantánea: Envía y recibe mensajes al instante sin necesidad de recargar la página.
-Notificaciones de Conexión: Avisa a todos los usuarios cuando alguien se une o abandona el chat.
-Indicador de "Escribiendo": Muestra un mensaje cuando un usuario está escribiendo, mejorando la interacción.

¿Cómo Funciona la Comunicación con Sockets?

Imagina que tu servidor es una central de radio y cada usuario conectado es una persona con un walkie-talkie.

1.Conexión Inicial (HTTP): Cuando abres la página web, tu navegador primero hace una petición normal (HTTP) al servidor para recibir el archivo index.html.

2.Apertura del Canal (WebSocket): Una vez cargada la página, el código de Socket.IO en el cliente "levanta la antena" y le dice al servidor: "¡Quiero abrir un canal de comunicación permanente!". El servidor responde afirmativamente y se establece una conexión WebSocket.
3.Comunicación Bidireccional: A partir de este momento, el canal está abierto en ambas direcciones.
-Cliente a Servidor (emit): Cuando envías un mensaje, tu walkie-talkie (cliente) emite una señal con el mensaje al canal.
-Servidor a Todos (broadcast): La central de radio (servidor) recibe esa señal y la retransmite inmediatamente a todos los demás walkie-talkies (clientes) que están escuchando en ese canal.


¿Que aprendi en este ejercicio?
1.El Paradigma de la Comunicación en Tiempo Real: Diferencia fundamental entre el modelo tradicional de "petición y respuesta" de la web (donde el usuario siempre tiene que pedir la información) y el modelo de los WebSockets, donde el servidor puede "empujar" información a los usuarios instantáneamente. Es como pasar de enviar cartas a tener una llamada telefónica siempre abierta.
2.Arquitectura Cliente-Servidor: Aprendi cómo se dividen las responsabilidades.

-El Servidor (Backend - server.js): Actúa como el cerebro y el centro de distribución. Su única tarea es escuchar eventos (nuevos mensajes, conexiones, desconexiones) y retransmitir la información a todos los demás. No se preocupa por cómo se ven los botones ni los colores.
-El Cliente (Frontend - index.html): Es la cara visible de la aplicación. Se encarga de la interfaz con la que el usuario interactúa (el campo de texto, el botón de enviar) y de comunicarse con el servidor para enviar y recibir los mensajes.

3.Programación Orientada a Eventos: Tanto en el cliente como en el servidor, el código no se ejecuta de arriba hacia abajo de forma lineal. En su lugar, se queda "escuchando" (listening) a que ocurran ciertos eventos.

-io.on('connection', ...): El servidor espera a que alguien se conecte.
-socket.on('chat message', ...): El servidor o el cliente esperan a que llegue un mensaje.
-form.addEventListener('submit', ...): El cliente espera a que el usuario presione "Enviar".
Este es un concepto clave en JavaScript y en el desarrollo de aplicaciones interactivas.

4. Broadcasting (Difusión de Mensajes): Aprendi cómo el servidor puede recibir un mensaje de un solo cliente y difundirlo (broadcast) eficientemente a todos los demás clientes conectados. Comprendi la diferencia entre io.emit() (enviar a todos) y socket.broadcast.emit() (enviar a todos menos al que lo originó).
