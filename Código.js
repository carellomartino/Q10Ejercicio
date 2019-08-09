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
  spreadsheet.addMenu("Menu - Desafio Q10", entries);
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
  var cantidad = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Productos-Materiales").getRange("C2:C").getValues().filter(String);
  var columnaCostos = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Productos").getRange("D2:D6");
  var arrPrices = []

  for(var i = 0; i < productsId.length; i++){
    var precio = 0
    var arr = []
    for(var j = 0; j < idProdMat.length; j++){
      if(parseInt(productsId[i]) == parseInt(idProdMat[j])){
        var p = getPrice(parseInt(idMat[j]))
        var total = p * (parseInt(cantidad[j]))
        precio += total
      }
    }
    arr.push(precio)
    arrPrices.push(arr)
  }
  columnaCostos.setValues(arrPrices)
}
  
/* Funcion para enviar listado por mail */
function enviarListado(){
  var ui = SpreadsheetApp.getUi();
  var categoriasNombres = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Categorias").getRange("B2:B").getValues().filter(String);
  var nombreProducto = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Productos").getRange("B2:B").getValues().filter(String);
  var costoProducto = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Productos").getRange("D2:D").getValues().filter(String);
  var idCategorias = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Productos").getRange("C2:C").getValues().filter(String);
  var data = 'Categoria         Producto         Costo' 

  for(i = 0; i < nombreProducto.length; i++){
    var separator = '----------------'
    if(parseInt(idCategorias[i]) == 1){
      data = data + '\n' + categoriasNombres[0] + ' ------- ' + nombreProducto[i] + separator.slice(nombreProducto[i].toString().length, -1) + costoProducto[i] 
    } else if(parseInt(idCategorias[i]) == 2){
      data = data + '\n' + categoriasNombres[1] + ' -- ' + nombreProducto[i] + separator.slice(nombreProducto[i].toString().length, -1) + costoProducto[i]
    }
  }

  ui.alert(data)
  var prompt = ui.prompt("Enviar Listado por e-mail", "Ingrese e-mail de destino", ui.ButtonSet.OK_CANCEL)
  var mail = prompt.getResponseText().toString();
  var button = prompt.getSelectedButton();
  
  if(button == ui.Button.OK){
    MailApp.sendEmail(mail, "Lista de Productos", data)
    ui.alert("Lista enviada!")
  }
} 
  