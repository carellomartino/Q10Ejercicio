function HelloWorld() 
{
  var ui = SpreadsheetApp.getUi()

  ui.alert("Hola Mundo!!!!");
};

function onOpen() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [{
    name : "Calcular Costos",
    functionName : "HelloWorld"
  },{
    name: "Enviar Listado",
    functionName: "LALA"
  }];
  spreadsheet.addMenu("Menu Ejercicio", entries);
};
