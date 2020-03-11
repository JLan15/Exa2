var ObjectID = require('mongodb').ObjectID;

function employeeModel(db){
  var lib = {};
  var empColl = db.collection('employees');
  lib.getEmployees = (handler)=>
  {

    empColl.find({}).toArray(
      (err, employee)=>
      {
          if(err)
          {
              console.log(err);
              return handler(err, null);
          }
          return handler(null, employee)
      }
  );
    // implementar
    // obtener todos los documentos
    //return handler(new Error("No Implementado"), null);
  }

  lib.getEmployeesById = (id, handler) => 
  {
    var query = { "_id": new ObjectID(id) };
    empColl.findOne(
      query,
      (err, employee) => {
        if (err) {
          return handler(err, null);
        }
        return handler(null, employee);
      }
    ); //findOne

    // implementar
    // Obtener un Documento solo mostrar
    // email, phone, name y age
    //return handler(new Error("No Implementado"), null);
  }

  lib.getEmployeesByCompany = (company, handler) => {
    var query = { "_company": new ObjectID(company) };
    empColl.findOne(
      query,
      (err, demployee) => {
        if (err) {
          return handler(err, null);
        }
        return handler(null, employee);
      }
    ); //findOne
    //return handler(new Error("No Implementado"), null);
  }

  lib.getEmployeesByTag = (tag, handler) => {
    var query = { "_tag": new ObjectID(tag) };
    empColl.findOne(
      query,
      (err, employee) => {
        if (err) {
          return handler(err, null);
        }
        return handler(null, employee);
      }
    ); //findOne
    //implementar
    // obtener todos los documentos que contenga 
    // al menos una vez el tag dentro del arreglo
    // tags
    // mostrar solo name, email, tags
    return handler(new Error("No Implementado"), null);
  }

  lib.addEmployeeATag = ( tag, id, handler) => {
    //Implementar
    //Se requiere agregar a un documento un nuevo tag
    // $push
    return handler(new Error("No Implementado"), null);
  }

  lib.removeEmployee = (id, handler) => {
    var query = {"_id": new ObjectID(id)};
    empColl.deleteOne(
      query,
      (err, rslt)=>{
        if(err){
          return handler(err, null);
        }
        return handler(null, rslt.result);
      }
    ); //deleteOne
    //Implementar
    //Se requiere eliminar un documento de la colección
    return handler(new Error("No Implementado"), null);
  }

  lib.increaseAgeToAll = (ageDelta, handler) => {
    //Implementar
    //Se requiere modificar todos los documentos de la colección
    // incrementando age por la cantidad de ageDelta $inc
    return handler(new Error("No Implementado"), null);
  }
  return lib;
}

module.exports = employeeModel;
