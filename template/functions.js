$(function () {
  var operation = "C";
  var selected_index = -1;
  var tblPersons = localStorage.getItem("tblPersons"); 
  tblPersons = JSON.parse(tblPersons); 
  if (tblPersons === null)
      tblPersons = [];

  function Create() {
  
    var person = JSON.stringify({
      Years: $("#txtYears").val(),
      Motivation: $("#txtMotivation").val(),
      Goals: $("#txtGoals").val(),
      Reason: $("#txtReason").val()
    }); 
  
    tblPersons.push(person);
 
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons));
    alert("Your Data Has Been Saved");
    return true;
  }

  function Edit() {

    tblPersons[selected_index] = JSON.stringify({
       Years: $("#txtYears").val(),
      Motivation: $("#txtMotivation").val(),
       Goals: $("#txtGoals").val(),
      Reason: $("#txtReason").val()
    });

    localStorage.setItem("tblPersons", JSON.stringify(tblPersons)); 
    alert("Your Data Has Been Edited"); 
    return true;
  }

  function Delete() {
   
    tblPersons.splice(selected_index, 1); 
   
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons)); 
    alert("Your Data Has Been Deleted"); 
  }

  function List() {
    $("#tblList").html("");
    $("#tblList").html(
            "<thead>" +
            "<tr>" +                
            "<th>Years</th>" +
            "<th>Motivation</th>" +
            "<th>Goals</th>" +
            "<th>Reason</th>" +
            "<th>Action</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
            ); 
    for (var i in tblPersons) {
        var per = JSON.parse(tblPersons[i]);
        $("#tblList tbody").append("<tr>" +                    
                "<td>" + per.Years + "</td>" +
                "<td>" + per.Motivation + "</td>" +
                "<td>" + per.Goals + "</td>" +
                "<td>" + per.Reason + "</td>" +                    
                "<td><img src='edit.png' alt='Edit" + i + "' class='btnEdit'/>&nbsp &nbsp<img src='delete.png' alt='Delete" + i + "' class='btnDelete'/></td>" +
                "</tr>"
                );
    } 
  }

  $("#frmPerson").bind("submit", function () {
    if (operation === "C")
        return Create();
    else
        return Edit();
  }); 
  
  List();

  $(".btnEdit").bind("click", function () {
    operation = "E"; 
    
    selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
    
    var per = JSON.parse(tblPersons[selected_index]); 
    $("#txtYears").val(per.Years);
    $("#txtMotivation").val(per.Motivation);
    $("#txtGoals").val(per.Goals);
    $("#txtReason").val(per.Reason);
    $("#txtYears").attr("readonly", "readonly");
    $("#txtMotivation").focus();
  });

  $(".btnDelete").bind("click", function () {

    selected_index = parseInt($(this).attr("alt").replace("Delete", "")); 
    Delete(); 
    List(); 
  });
});

