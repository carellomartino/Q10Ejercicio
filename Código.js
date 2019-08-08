/******* Ejercicio Q10 *******/ 

/* Funcion para crear el menu y sus opciones */
function onOpen() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [
    {
      name: "Calcular Costos",
      functionName: "calcularCostos"
    },
    {
      name: "Enviar Listado",
      functionName: "enviarListado"
    }
  ];
  spreadsheet.addMenu("Menu Ejercicio", entries);
}

/* Funcion para obtener precio de los productos */
function getPrice(id) {
  var matIds = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Materiales").getRange("A2:A").getValues().filter(String);
  var matPrices = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Materiales").getRange("C2:C").getValues().filter(String);
  for (var i = 0; i < matIds.length; i++) {
    if (matIds[i] == id) {
      return matPrices[i];
    }
  }
}

/* Funcion Calcular costos */
function calcularCostos(){
  var productsId = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Productos").getRange("A2:A").getValues().filter(String);
  var idProdMat = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Productos-Materiales").getRange("A2:A").getValues().filter(String);
  var idMat = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Productos-Materiales").getRange("B2:B").getValues().filter(String);
  var cant = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Productos-Materiales").getRange("C2:C").getValues().filter(String);
  var columnaCostos = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Productos").getRange("D2:D6");
  var arrPrices = []

  for(var i = 0; i < productsId.length; i++){
    var precio = 0
    var arr = []
    for(var j = 0; j < idProdMat.length; j++){
        if(parseInt(productsId[i]) == parseInt(idProdMat[j])){
          var p = getPrice(parseInt(idMat[j]))
          var total = p * (parseInt(cant[j]))
          precio += total          
        }  
      }
      arr.push(precio)
      arrPrices.push(arr)
    }
    columnaCostos.setValues(arrPrices)
  }
  




  function enviarListado() {
    var ui = SpreadsheetApp.getUi();
    ui.alert("Hola Mundooooo Feo!!!!");
  }