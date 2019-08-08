function onOpen() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [{
    name : "Calcular Costos",
    functionName : "calcularCostos"
  },{
    name: "Enviar Listado",
    functionName: "enviarListado"
  }];
  spreadsheet.addMenu("Menu Ejercicio", entries);
};



function calcularCostos() 
{
  var ui = SpreadsheetApp.getUi()

  ui.alert("Hola Mundooooo Feo!!!!");
};


function enviarListado()
{
  var ui = SpreadsheetApp.getUi()
  var productId = SpreadsheetApp.getActiveSheet().getRange("A2:A6").getValues()
  //aca tengo los ids de productos, ahora tengo que leer las rows q tengan ese id de producto




  ui.alert(productId);
};

