const http = require("http");

console.log({http});

function requestController(){
    //Lógica de función
    console.log("Nueva petición");
}

//Configuración del servidor
const server = http.createServer(requestController);

server.listen(4000);
