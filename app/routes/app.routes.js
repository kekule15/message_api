module.exports = (app) => {
    const App = require("../controllers/app.controller.js");
  
    app.post("/create", App.create);
  
    app.get("/getAll", App.findAll);
  
    app.get("/product/:productId", App.findOne);
  
    app.put("/product/:productId", App.update);
  
    app.delete("/product/:productId", App.delete);
  };
  