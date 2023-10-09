
function chnageTab(btn) {
    if (btn == 'p') {
        $("#per").addClass("btn-primary");
        $("#pers").prop("hidden", false);
        $("#loca").prop("hidden", true);
        $("#depa").prop("hidden", true);
        $("#dep").removeClass("btn-primary");
        $("#loc").removeClass("btn-primary");
    }
    else if (btn == 'd') {
        $("#dep").addClass("btn-primary");
        $("#per").removeClass("btn-primary");
        $("#loc").removeClass("btn-primary");


        $("#pers").prop("hidden", true);
        $("#loca").prop("hidden", true);
        $("#depa").prop("hidden", false);
    }
    else if (btn == 'l') {
        $("#loc").addClass("btn-primary");
        $("#per").removeClass("btn-primary");
        $("#dep").removeClass("btn-primary");
        $("#pers").prop("hidden", true);
        $("#loca").prop("hidden", false);
        $("#depa").prop("hidden", true);
    }
}

function updatePersonalInfo(Id, Fname, Lname, Department, Location, Email) {
    $("#fname").val(Fname);
    $("#lname").val(Lname);
    $("#department").val(Department);
    $("#location").val(Location);
    $("#email").val(Email);
    $("#pid").val(Id);
}
function updateDepartmentInfo(Id, Name, Location) {
    $("#did").val(Id);
    $("#name").val(Name);
    $("#loc_loc").val(Location);
}
function updateLocationInfo(Id, City) {
    $("#lid").val(Id);
    $("#loccity").val(City);
}




function deletePersonalInfo(Id) {
    $("#pdelid").val(Id);
}
function deleteDepartmentInfo(Id) {
    $("#Ddelid").val(Id);
}
function deleteLocationInfo(Id) {
    $("#Ldelid").val(Id);
}