import request from "supertest";
import app from "../app.js";
import { inicializarDatosClientes, inicializarDatosEmpleados } from "../bd.js";



const cliente = {
    nombre: "Alejandro",
    apellido: "Castro",
    fecha_nacimiento: "2002-02-14"
}
const clienteMalCodeado = {
    nombres: "",
    apellido: "aaa",
    fecha_nacimiento: 993329,
    otro: "asdds"
}

const empleados = {
    nombre: "Marcelo",
    apellido: "Madrid",
    fecha_nacimiento: "2003-01-10",
    id_cliente: 2
   
};
const EmpleadoMalCodeado = {
    nombre: "",
    apellido: "aaa",
    fecha_nacimiento: 993329,
    id_cliente: 6,
    otro: "asdds"
}




describe("Testeos unitarios de endpoints Empleados.", () => {

    // GETS

    it("Método get de Empleados.", async () => {
        const res = await request(app).get("/Empleados/");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                nombre: expect.any(String),
                apellido: expect.any(String),
                fecha_nacimiento: expect.any(String),
                id_cliente: expect.any(Number)

            })]))
    });

    it("Método get de Empleados Existente.", async () => {
        const res = await request(app).get("/Empleados/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toEqual(1);
        expect(res.body.nombre).toEqual('Marcelo');
        expect(res.body.apellido).toEqual('Madrid');
        expect(res.body.fecha_nacimiento).toEqual("2003-01-10");
        expect(res.body.id_cliente).toEqual(2);

    });


    
    it("Método get de Empleados INEXISTENTE.", async () => {
        const res = await request(app).get("/Empleados/9999");
        expect(res.statusCode).toEqual(404);
    });

    // POSTS

    it("Método post de Empleados (ok).", async () => {
        const res = await request(app).post("/Empleados/").send(empleados);
        expect(res.statusCode).toEqual(201);
        expect(res.body.nombre).toEqual(empleados.nombre);
        expect(res.body.apellido).toEqual(empleados.apellido);
        expect(res.body.fecha_nacimiento).toEqual(empleados.fecha_nacimiento);
        expect(res.body.id_cliente).toEqual(empleados.id_cliente);


    });
    
  
   

    it("Método post de Empleados (error)", async () => {
        const res = await request(app).post("/Empleados/999").send(EmpleadoMalCodeado);
        expect(res.statusCode).toEqual(404);
    });

    
   

    // PUTS

    it("Método put de Empleados (ok)", async () => {

        const res = await request(app).put("/Empleados/1").send(empleados);

        expect(res.statusCode).toEqual(200);
        expect(res.body.nombre).toEqual(empleados.nombre);
        expect(res.body.apellido).toEqual(empleados.apellido);
        expect(res.body.fecha_nacimiento).toEqual(empleados.fecha_nacimiento);
        expect(res.body.id_cliente).toEqual(empleados.id_cliente);
    });

    it("Método put de Empleados (error)", async () => {
        const res = await request(app).put("/Empleados/999").send(empleados);
        expect(res.statusCode).toEqual(404);
    });
   

    // DELETES 

    it("Método delete de  Empleados (ok)", async () => {

        const res = await request(app).delete("/Empleados/5");
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual("Empleado eliminado.");
    });

    it("Método delete de Empleados (error)", async () => {
        const res = await request(app).delete("/Empleados/155");
        expect(res.statusCode).toEqual(404);
        expect(res.text).toEqual("Empleado no encontrado");
    });

})


describe("Testeos unitarios de endpoints Clientes.", () => {

    // GETS

    it("Método get de Clientes.", async () => {
        const res = await request(app).get("/Clientes/");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                nombre: expect.any(String),
                apellido: expect.any(String),
                fecha_nacimiento: expect.any(String),
            })]))
    });


    it("Método get de Cliente Existente.", async () => {
        const res = await request(app).get("/Clientes/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ id: 1, fecha_nacimiento: "2002-02-14", nombre: "Alejandro", apellido: "Castro" });
    });

    it("Método get de clientes INEXISTENTE.", async () => {
        const res = await request(app).get("/Clientes/9999");
        expect(res.statusCode).toEqual(404);
    });

    // POSTS

    it("Método post de Cliente (ok).", async () => {
        const res = await request(app).post("/Clientes/").send(cliente);
        expect(res.statusCode).toEqual(201);
        expect(res.body.nombre).toEqual(cliente.nombre);
        expect(res.body.apellido).toEqual(cliente.apellido);
        expect(res.body.fecha_nacimiento).toEqual(cliente.fecha_nacimiento);
    });

   

    it("Método post de clientes (error)", async () => {
        const res = await request(app).post("/Clientes/").send(clienteMalCodeado);
        expect(res.statusCode).toEqual(400);
    });

    // PUTS

    it("Método put de Clientes (ok)", async () => {

        const res = await request(app).put("/Clientes/1").send(cliente);
        expect(res.statusCode).toEqual(200);
        expect(res.body.nombre).toEqual(cliente.nombre);
        expect(res.body.apellido).toEqual(cliente.apellido);
        expect(res.body.fecha_nacimiento).toEqual(cliente.fecha_nacimiento);
    });

    it("Método put de Clientes (error)", async () => {
        const res = await request(app).put("/Clientes/999").send(cliente);
        expect(res.statusCode).toEqual(404);
    });

    // DELETES 

    it("Método delete de Clientes (ok)", async () => {

        const res = await request(app).delete("/Clientes/5");
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual("Cliente eliminado.");
    });

    it("Método delete de Cliente (error)", async () => {
        const res = await request(app).delete("/Clientes/155");
        expect(res.statusCode).toEqual(404);
        expect(res.text).toEqual("Cliente no encontrado");
    });

})


