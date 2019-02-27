function insertAllRows(data) {
    for (var obj in data) {
        console.log(data[obj])
        addRow(data[obj])
    }
}

function addRow(data) {
    tabBody = document.getElementsByTagName("tbody").item(0);
    row = document.createElement("tr");
    cell1 = document.createElement("td");
    cell2 = document.createElement("td");
    cell3 = document.createElement("td");
    cell4 = document.createElement("td");
    cell5 = document.createElement("td");
    cell6 = document.createElement("td");
    cell7 = document.createElement("td");
    textnode1 = document.createTextNode(data["date"]);
    textnode2 = document.createTextNode(data["category"]);
    textnode3 = document.createTextNode(data["project"]);
    textnode4 = document.createTextNode(data["time_start"]);
    textnode5 = document.createTextNode(data["time_end"]);
    textnode6 = document.createTextNode("0");
    textnode7 = document.createTextNode(data["comment"]);
    cell1.appendChild(textnode1);
    cell2.appendChild(textnode2);
    cell3.appendChild(textnode3);
    cell4.appendChild(textnode4);
    cell5.appendChild(textnode5);
    cell6.appendChild(textnode6);
    cell7.appendChild(textnode7);
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    row.appendChild(cell5);
    row.appendChild(cell6);
    row.appendChild(cell7);
    console.log(textnode7)
    tabBody.appendChild(row);
}



function insertAllCategories(categoryArray) {
    var select = document.getElementById("category");
    for (var category in categoryArray) {
        var categoryName = categoryArray[category]
        var el = document.createElement("option");
        el.textContent = categoryName;
        el.value = categoryName;
        select.appendChild(el);
    }
}


function insertProject(projectName) {
    var select = document.getElementById("project");
    var el = document.createElement("option");
    el.textContent = projectName;
    el.value = projectName;
    select.appendChild(el);
}