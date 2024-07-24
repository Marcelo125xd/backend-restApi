import cors from 'cors';
import express from 'express';
import { Empleado, Clientes, sequelize } from './bd.js';
import { GestorEmpleados } from './gestor/gestorEmpleados.js';
import { GestorClientes } from './gestor/gestorClientes.js';
import { ARRAY, json, Op } from "sequelize";


const PORT = 3030;
const app = express();
app.use(express.json());
await sequelize.sync();
app.use(cors());


// Definición de relaciones
Clientes.hasMany(Empleado, { foreignKey: 'id_cliente' }); // Cliente tiene muchos Empleados.
Empleado.belongsTo(Clientes, { foreignKey: 'id_cliente' }); // Empleado tiene 1 cliente. 

//EndPoint

//validar fecha
function isValidDate(dateString) {
    // Regex para verificar formato YYYY-MM-DD
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
  
    if (!dateString.match(regEx)) return false;  // Formato incorrecto
  
    const d = new Date(dateString);
    const dNum = d.getTime();
  
    if (!dNum && dNum !== 0) return false;  // NaN o fecha inválida
    return d.toISOString().slice(0, 10) === dateString;
  }
  

const gestorEmpleados = new GestorEmpleados();
const gestorClientes = new GestorClientes();


app.get('/Empleados', async (req, res) => {

    const nombre = req.query.nombre
    let condicion = {}
    if (nombre) {
      condicion.nombre = { [Op.like]: `%${nombre}%` }
    }
    const datosEmpleados = await gestorEmpleados.obtener_todas({ where: condicion })
    if (datosEmpleados) {
      res.status(200).json(datosEmpleados);
    } else {
      res.status(404).send("Empleados no encontrados.")
    }
  
  })
  


app.get('/Empleados/:id', async (req, res) => {
    const idSelec = req.params.id
    const datosIdEmpleadoSeleccionado = await gestorEmpleados.obtener_id(idSelec)
    if (datosIdEmpleadoSeleccionado) {
      res.status(200).json(datosIdEmpleadoSeleccionado);
    } else {
      res.status(404).send("Empleado inexistente.")
    }
  })
  
  
  


  app.post('/Empleados/', async (req, res) => {
    try {
      const body = req.body
      const nuevoEmpleado = await gestorEmpleados.crearEmpleado(body)
      res.status(201).json(nuevoEmpleado);
    }
    catch (error) {
      res.status(400).json({ error: error.message })
    }
  })
  
  
  
  
  app.put('/Empleados/:idEmpleado', async (req, res) => {
    try {
      const idEmpleado = req.params.idEmpleado;
      const body = req.body;
      const EmpleadoModificado = await gestorEmpleados.actualizarEmpleado(body, idEmpleado)
      if (EmpleadoModificado != "0") {
        const empleado = await gestorEmpleados.obtener_id(idEmpleado)
        res.status(200).json(empleado);
      } else {
        res.status(404).json("Empleado inexistente.")
      }
    }
    catch (error) {
      res.status(500).json({ error: error.message })
    }
  })
  
  
  
  app.delete('/Empleados/:id', async (req, res) => {
    try {
      const idSelecDel = req.params.id
      const deleted = await gestorEmpleados.eliminarEmpleado(idSelecDel)
      if (deleted) {
        res.status(200).send("Empleado eliminado.");
      } else {
        res.status(404).send('Empleado no encontrado');
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  
  })


  //Endpoint cliente

  

app.get('/Clientes', async (req, res) => {

    const nombre = req.query.nombre
    let condicion = {}
    if (nombre) {
      condicion.nombre = { [Op.like]: `%${nombre}%` }
    }
    const datosClientes = await gestorClientes.obtener_clientes({ where: condicion })
    if (datosClientes) {
      res.status(200).json(datosClientes);
    } else {
      res.status(404).send("Clientes no encontrados.")
    }
  
  })
  
  app.get('/Clientes/:id', async (req, res) => {
    const idSelec = req.params.id
    const datosIdClienteSeleccionado = await gestorClientes.obtener_idCliente(idSelec)
    if (datosIdClienteSeleccionado) {
      res.status(200).json(datosIdClienteSeleccionado);
    } else {
      res.status(404).send("Cliente inexistente.")
    }
  })
  
  

  
  app.post('/Clientes/', async (req, res) => {
    try {
      // Validación
      if (!req.body.nombre || typeof req.body.nombre !== 'string' || req.body.nombre.trim() === '') {
        return res.status(400).json({ message: "Nombre del cliente es requerido y debe ser una cadena no vacía" });
      }
      if (!req.body.apellido || typeof req.body.apellido !== 'string' || req.body.apellido.trim() === '') {
        return res.status(400).json({ message: "Apellido del cliente es requerido y debe ser una cadena no vacía" });
      }
      if (!req.body.fecha_nacimiento || !isValidDate(req.body.fecha_nacimiento)) {
        return res.status(400).json({ message: "Fecha de nacimiento del cliente es requerida y debe tener un formato válido (YYYY-MM-DD)" });
      }
  
      // Creación del cliente si las validaciones pasan
      const nuevoCliente = await gestorClientes.crearCliente(req.body);
  
      res.status(201).json(nuevoCliente);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  
  
  
  
  app.put('/Clientes/:id', async (req, res) => {
    try {
      const updateId = req.params.id;
      const req_body = req.body;
  
      // Verifica si el cliente existe
      const clienteExistente = await Clientes.findByPk(updateId);
  
      if (!clienteExistente) {
        return res.status(404).send('Cliente no encontrado');  // Si no existe, retorna 404
      }
  
      // Actualiza el cliente
      const updatedCliente = await gestorClientes.actualizarCliente(req_body, updateId);
      console.log(updatedCliente)
  
      if (updatedCliente != "0") {
        const updatedClienteF = await Clientes.findByPk(updateId);
        res.status(200).json(updatedClienteF);
      } else {
        res.status(404).send('Cliente no encontrado');
      }
  
      // Devuelve el cliente actualizado
    } catch (error) {
      res.status(500).json({ error: error.message });  // Manejo de errores
    }
  });
  
  app.delete('/Clientes/:id', async (req, res) => {
    try {
      const idSelecDel = req.params.id
      const deleted = await gestorClientes.eliminarCliente(idSelecDel)
      if (deleted) {
        res.status(200).send("Cliente eliminado.");
      } else {
        res.status(404).send('Cliente no encontrado');
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  
  })
  
  
  
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
  
export default app;