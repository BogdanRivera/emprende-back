require('dotenv').config(); //Para lectura del archivo .env 
const http = require("http"); //Solicitudes http 
const fs = require("fs"); //Librería para leer contenido HTML


function requestController(req,res){
    const url = req.url;
    const method = req.method;
    console.log({url,method});


    if (method === 'GET' && url === '/'){
        res.setHeader("Content-type","text/html; charset=utf-8");
        fs.readFile("./public/index.html",(error,file)=>{
            if(error){
                console.log('Hubo un error');
            }
            res.write(file); 
            res.end();
        });
        return
    }

    if (method === 'GET' && url === '/about'){
        res.setHeader("Content-type","text/html");
        fs.readFile("./public/about.html",(error,file)=>{
            if(error){
                console.log("HUBO UN ERROR");
            }

            res.write(file);
            res.end();
        });
        return; 
    }

    res.setHeader("Content-type","text/html; charset=utf-8");
    res.write("<h1>Página no encontrada xd</h1>");
    res.end();
}

//Configuración del servidor
const server = http.createServer(requestController);

const PORT = process.env.PORT
server.listen(PORT, function(){
console.log("Aplicación corriendo en puerto: " + PORT); 
});
