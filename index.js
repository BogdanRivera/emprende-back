const http = require("http");
const exportsFromAnother = require("./another");

console.log({http});

function requestController(){
    //Lógica de función
    console.log("Nueva petición");
}

//Configuración del servidor
const server = http.createServer(requestController);

server.listen(4000);
