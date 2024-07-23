import {Empleado, Clientes} from '../bd.js'
import {sequelize} from "../bd.js"

export class GestorEmpleados{
    async obtener_todas(condicion){
        return await Empleado.findAll({where:condicion.where, include:[
            {model:Clientes,
                key: 'id_cliente'
            }
        ]})
    }
    async obtener_id(idSelec){
        return await Empleado.findOne({where:{id:idSelec},  include: [{model:Clientes, key:'id_cliente'}]});
    }
    async crearEmpleado(req_body){
        return await Empleado.create(req_body)
    }

    async actualizarEmpleado(req_body, updateId){
        return await Empleado.update(req_body, {
            where: { id: updateId}
            });
    }

    async eliminarEmpleado(idSelecDel){
        return await Empleado.destroy({
            where: { id: idSelecDel}
    })}

}
