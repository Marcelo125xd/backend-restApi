import {Clientes} from '../bd.js'
import {sequelize} from "../bd.js"

export class GestorClientes{
    async obtener_clientes(condicion){
        return await Clientes.findAll({
            where: condicion.where, 
            include: {all:true}
        })
    }
    async obtener_idCliente(idSelec){
        return await Clientes.findOne({where:{id:idSelec}})
    }
    async crearCliente(req_body){
        return await Clientes.create(req_body)
    }

    async actualizarCliente(req_body, updateId){
        return await Clientes.update(req_body, {
            where: { id: updateId}
          });
    }

   


    async eliminarCliente(idSelecDel){
        return await Clientes.destroy({
            where: { id: idSelecDel}
    })}

}
