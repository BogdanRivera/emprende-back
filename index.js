require("dotenv").config();
const express = require('express')
const app = express()
const port = process.env.PORT

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
console.log("Conexión exitosa con la BDDD!");  
})
.catch((error)=>{
console.log("Hubo un error al conectarnos a la BDDD",{error})
})

const taskSchema = new Schema({
  name: String,
  done: Boolean,
})

const Task = mongoose.model("Task",taskSchema,"Tasks");

//Servir archivos estáticos (Middleware)
app.use(express.static('public'))

// Middleware para parsear el BODY de las request
app.use(express.json());


//Configurar RUTAS 
app.get('/', (req, res) => {
  //  Envia todo lo que hay en la carpeta Public
})

const logger = {
  logThis: (whatToLog) =>{
    return (req,res,next)=>{
      console.log("Middleware 2: ",whatToLog);
      next();
    }
  },
}

app.get("/api/tasks",(req,res)=>{
  Task.find().then((tasks)=>{
    res.status(200).json({ok: true, data: tasks})
  }).catch((err)=>{
    resp.status(400).json({ok: false,message:"Hubo un problema al obtener las tareas"})
  })
})

app.post("/api/tasks",(req,res)=>{
  const body = req.body; 
  console.log({body});
  Task.create({
    name: body.text,
    done: false,
    hello: "HOLA", 
  }).then((createdTask)=>{
    res.status(201).json({ok:true, message: "Tarea creada con éxito"})
  }).catch((err)=>{
    res.status(400).json(json({ok:false, message: "Error al crear la tarea"}))
  });

})

app.put("/api/tasks/:id",(req,res)=>{
  const body = req.body;
  const id = req.params.id

  console.log({body});
  Task.findByIdAndUpdate(id,{
    name: body.text,
  }).then((updateTask)=>{
    res.status(200).json({ok:true, message: "Tarea editada con éxito"})
  }).catch((err)=>{
    res.status(400).json(json({ok:false, message: "Error al editar la tarea"}))
  });

})

app.delete("/api/tasks/:id",(req,res)=>{
  const id = req.params.id; 
  Task.findByIdAndDelete(id).then((deleteTask)=>{
    res.status(200).json({ok:true, data: deleteTask})
  }).catch(()=>{
    res.status(400).json({ok: false, message: "Hubo un error al eliminar la tarea"})
  })
})


app.get('/bogdan',logger.logThis("Logueame estooo"))

//Poner a escuchar la APP en un puerto
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})