require('dotenv').config();
const http = require("http");


function requestController(){
    //Lógica de función
    console.log("Nueva petición");
}

//Configuración del servidor
const server = http.createServer(requestController);

const PORT = process.env.PORT
server.listen(PORT, function(){
console.log("Aplicación corriendo en puerto: " + PORT); 
});
