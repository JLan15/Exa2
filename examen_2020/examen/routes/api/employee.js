var express = require('express');
var router = express.Router();

function initEmployee(db) {
  var empModel = require('./employeeModel')(db);

  //rutas a implementar
  // metodo     ruta                     body
  /*
      GET       /all
      GET       /byid/:id
      GET       /bycompany/:company
      GET       /bytag/:tag
      POST      /addtag/:id              tag
      DELETE    /delete/:id
      POST      /makeolder               age
   */
  router.delete(
    '/delete/:id',
    function (req, res){
        var id = req.params.employeeId || '';
        if(id===' ')
        {
            return res.status(404).json({"error": "Indentificador no válido"});
        }

        animalsModels.deleteEmployee(id, (err, rslt)=>{
            if(err)
            {
                return res.status(500).json({"error": "Ocurrió un error, intente nuevamente."})
            }
            return res.status(200).json({"msg": "Deleted ok"});
        });
    }
);


  router.get('/bycompany', function(req, res){
    empModel.getEmployeesByCompany((err, employee)=>{
        if(err)
        {
            res.status(404).json([]);
        }
        else{
            res.status(200).json(employee);
        }
    });
  });

  router.get('/bytag', function(req, res){
    empModel.getEmployeesByTag((err, employee )=>{
        if(err)
        {
            res.status(404).json([]);
        }
        else{
            res.status(200).json(employee);
        }
    });
  });



  router.post('/addtag', function(req, res)
  {
      var newEmployee = Object.assign(
          {},
          req.body,
          {
              "Tag": req.body.Tag
          }
      );

      empModel.saveNewTag(newEmployee, (err, rslt)=>{
          if(err)
          {
              res.status(400).json(err);
          }
          res.status(200).json(rslt);
      });
  });


  router.post('/add', function(req, res)
  {
      var newEmployee = Object.assign(
          {},
          req.body,
          {
            "Name": req.body.Name,
            "Phone": req.body.Phone,
            "Email": req.body.Email,
            "Company": req.body.company,
            "Age": req.body.Age,
          }
      );

      empModel.saveNewEmployee(newEmployee, (err, rslt)=>{
          if(err)
          {
              res.status(400).json(err);
          }
          res.status(200).json(rslt);
      });
  });


// http://localhost:3000/api/employee/all
router.get('/all', function(req, res){
  empModel.getAllEmployees((err, employee)=>{
      if(err)
      {
          res.status(404).json([]);
      }
      else{
          res.status(200).json(employee);
      }
  });
});


// http://localhost:3000/api/employee/one
router.get(
  '/byid/:id',
  function(req, res)
  {
      var id = req.params.employeeId || '';
      if(id===' ')
      {
          return res.status(404).json({"error": "Identificador no válido"});
      }

      empModel.getOneEmployee(id, (err, rslt)=>
      {
          if(err)
          {
              return res.status(500).json({"error": "Ocurrió un error."});
          }
          return res.status(200).json(rslt);
      });
  }

);
  return router;
}

module.exports = initEmployee;
