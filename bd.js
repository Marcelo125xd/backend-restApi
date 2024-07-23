import { Sequelize } from 'sequelize';
import { DataTypes } from 'sequelize';

export const sequelize = new Sequelize('sqlite::memory:')

//table Empleado

export const Empleado = sequelize.define('Empleado', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING },
    apellido: { type: DataTypes.STRING },
    fecha_nacimiento: { type: DataTypes.STRING },
    id_cliente: { type: DataTypes.INTEGER}
}, {
    tableName: 'Empleado', timestamps: false
});



//construction

export async function inicializarDatosEmpleados() {
    await sequelize.sync();
    await Empleado.bulkCreate([
        { nombre: 'Marcelo', apellido: 'Madrid', fecha_nacimiento: '2003-01-10', id_cliente:2 },
        { nombre: 'Luisa', apellido: 'González', fecha_nacimiento: '1995-05-20', id_cliente: 3},
        { nombre: 'Carlos', apellido: 'Martínez', fecha_nacimiento: '2000-11-15', id_cliente: 4},
        { nombre: 'Laura', apellido: 'Sánchez', fecha_nacimiento: '2007-09-03', id_cliente: 5},
        { nombre: 'Juan', apellido: 'Pérez', fecha_nacimiento: '1998-07-25', id_cliente: 2},
        { nombre: 'Ana', apellido: 'López', fecha_nacimiento: '2004-03-8', id_cliente: 2},
        { nombre: 'Diego', apellido: 'Gómez', fecha_nacimiento: '1996-2-30', id_cliente: 3},
        { nombre: 'Sofía', apellido: 'Fernández', fecha_nacimiento: '2005-08-12', id_cliente:2 },
        { nombre: 'Pedro', apellido: 'Rodríguez', fecha_nacimiento: '2002-06-05', id_cliente: 2},
        { nombre: 'María', apellido: 'Gutiérrez', fecha_nacimiento: '2001-04-17', id_cliente: 4},
    ]);
}


//cliente

export const Clientes = sequelize.define('Clientes', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING },
    apellido: { type: DataTypes.STRING },
    fecha_nacimiento: { type: DataTypes.DATEONLY }
}, {
    tableName: 'Clientes',
    timestamps: false,
});


export async function inicializarDatosClientes() {
    await sequelize.sync();
    await Clientes.bulkCreate([
        { nombre: 'Alejandro', apellido: 'Castro', fecha_nacimiento: '2002-02-14' },
        { nombre: 'Camila', apellido: 'Mendoza', fecha_nacimiento: '1994-11-23' },
        { nombre: 'Fernando', apellido: 'Ruiz', fecha_nacimiento: '1999-08-10' },
        { nombre: 'Isabella', apellido: 'Morales', fecha_nacimiento: '2008-10-25' },
        { nombre: 'Miguel', apellido: 'Vargas', fecha_nacimiento: '1997-03-19' },
        { nombre: 'Elena', apellido: 'Jiménez', fecha_nacimiento: '2005-06-01' },
        { nombre: 'Javier', apellido: 'Torres', fecha_nacimiento: '1995-12-04' },
        { nombre: 'Valeria', apellido: 'Herrera', fecha_nacimiento: '2006-01-22' },
        { nombre: 'Roberto', apellido: 'Cruz', fecha_nacimiento: '2003-09-17' },
        { nombre: 'Adriana', apellido: 'Flores', fecha_nacimiento: '2000-07-29' },

    ]);
};

inicializarDatosClientes();
inicializarDatosEmpleados();