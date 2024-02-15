var selectedRow = null

let tempAmountTB = 0; //first budget

var tempBalance = 0 //in Edit Ex for help math
var tempEX = 0 //in Edit Ex for help math

function onFormSubmitBU(e) {
	event.preventDefault();
    var formData = readFormDataBudget();
    console.log(formData);
    insertNewRecordForBudget(formData);
    resetForm();    
}
function onFormSubmitEX(e) {
	event.preventDefault();
    var formData = readFormData();
    console.log(formData);
    if (selectedRow == null){
        insertNewRecord(formData);
    }
    else{
        updateRecord(formData);
    }
    resetForm();    
}
//Retrieve the data Budget
function readFormDataBudget() {
    var formData = {};
    // formData["budget"] = document.getElementById("budget").value;
    tempAmountTB =  document.getElementById("budget").value;
   return formData;
}
//Retrieve the data
function readFormData() {
    var formData = {};
    formData["productCode"] = document.getElementById("productCode").value;
    formData["product"] = document.getElementById("product").value;
    return formData;
}
function insertNewRecordForBudget(data) {    
   document.getElementById("amount").innerHTML = tempAmountTB;
   document.getElementById("balance-amount").innerHTML = tempAmountTB -parseInt(document.getElementById("expenditure-value").innerHTML);
   
}
//Insert the data
function insertNewRecord(data) {

    document.getElementById("balance-amount").innerHTML = parseInt(document.getElementById("balance-amount").innerHTML) - data.productCode;
    let sumEX=parseInt(document.getElementById("expenditure-value").innerHTML);
    if(data.productCode > 0 ){
        document.getElementById("expenditure-value").innerHTML = sumEX + parseInt(data.productCode) ;
    }
    var table = document.getElementById("ExpenseList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
		cell1.innerHTML = data.productCode;
    cell2 = newRow.insertCell(1);
		cell2.innerHTML = data.product;
    cell3 = newRow.insertCell(2);
        cell3.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;
}

//Edit the data
function onEdit(td) {
   
    selectedRow = td.parentElement.parentElement;

    document.getElementById("productCode").value = selectedRow.cells[0].innerHTML;
    document.getElementById("product").value = selectedRow.cells[1].innerHTML;

    tempBalance = parseInt(document.getElementById("balance-amount").innerHTML) + parseInt(selectedRow.cells[0].innerHTML);
    tempEX = parseInt(document.getElementById("expenditure-value").innerHTML) - parseInt(selectedRow.cells[0].innerHTML);
   
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.productCode;
    selectedRow.cells[1].innerHTML = formData.product;

    document.getElementById("balance-amount").innerHTML = tempBalance - parseInt(selectedRow.cells[0].innerHTML);
    document.getElementById("expenditure-value").innerHTML = tempEX + parseInt(selectedRow.cells[0].innerHTML);
//    console.log(tempAmountTB , selectedRow.cells[0].innerHTML );
}

//Delete the data
function onDelete(td) {
    if (confirm('Do you want to delete this record?')) {
        row = td.parentElement.parentElement;       
        // console.log(row.cells[0].innerHTML);
        
        document.getElementById("balance-amount").innerHTML = parseInt(document.getElementById("balance-amount").innerHTML) + parseInt(row.cells[0].innerHTML);
        document.getElementById("expenditure-value").innerHTML = parseInt(document.getElementById("expenditure-value").innerHTML) - row.cells[0].innerHTML ;
       
        document.getElementById('ExpenseList').deleteRow(row.rowIndex);
        resetForm();
    }
}

//Reset the data
function resetForm() {
    document.getElementById("budget").value ='';
    document.getElementById("productCode").value = '';
    document.getElementById("product").value = '';
    selectedRow = null;
}





