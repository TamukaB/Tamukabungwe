let locations = [];
let departments = [];

$(document).ready(() => {
    getPersonalData();
    getLocationsData();
    getDepartmentsData();

    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has('active')) {
        if (searchParams.get('active') === 'personal') {

            $("#locationsBtn").removeClass("active");
            $("#departmentsBtn").removeClass("active");
            $("#locations-tab-pane").removeClass("active show");
            $("#departments-tab-pane").removeClass("active show");

            $("#personnel-tab-pane").addClass("active show");
            $("#personnelBtn").addClass("active");

        } else if (searchParams.get('active') === 'location') {

            $("#personnelBtn").removeClass("active");
            $("#departmentsBtn").removeClass("active");
            $("#personnel-tab-pane").removeClass("active show");
            $("#departments-tab-pane").removeClass("active show");

            $("#locations-tab-pane").addClass("active show");
            $("#locationsBtn").addClass("active");

        } else if (searchParams.get('active') === 'department') {

            $("#personnelBtn").removeClass("active");
            $("#locationsBtn").removeClass("active");
            $("#personnel-tab-pane").removeClass("active show");
            $("#locations-tab-pane").removeClass("active show");

            $("#departments-tab-pane").addClass("active show");
            $("#departmentsBtn").addClass("active");

        }
    }
});

$("#searchInp").on("keyup", function () {

    var value = $(this).val().toLowerCase();
    $("#personalTable tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
    $("#departmentTable tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
    $("#locationTable tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });

});

$("#refreshBtn").click(function () {

    if ($("#personnelBtn").hasClass("active")) {

        getPersonalData();

    } else {

        if ($("#departmentsBtn").hasClass("active")) {

            getDepartmentsData();

        } else {

            getLocationsData();

        }

    }

});

$("#filterBtn").click(function () {

    // Open a modal of your own design that allows the user to apply a filter to the personnel table on either department or location

});

$("#personnelBtn").click(function () {

    getPersonalData();

});

$("#departmentsBtn").click(function () {

    getDepartmentsData();

});

$("#locationsBtn").click(function () {

    getLocationsData();

});

$("#editPersonnelModal").on("show.bs.modal", function (e) {

    $.ajax({
        url: "https://coding.itcareerswitch.co.uk/companydirectory/libs/php/getPersonnelByID.php",
        type: "POST",
        dataType: "json",
        data: {
            id: $(e.relatedTarget).attr("data-id") // Retrieves the data-id attribute from the calling button
        },
        success: function (result) {
            var resultCode = result.status.code;

            if (resultCode == 200) {
                // Update the hidden input with the employee id so that
                // it can be referenced when the form is submitted

                $("#editPersonnelEmployeeID").val(result.data.personnel[0].id);

                $("#editPersonnelFirstName").val(result.data.personnel[0].firstName);
                $("#editPersonnelLastName").val(result.data.personnel[0].lastName);
                $("#editPersonnelJobTitle").val(result.data.personnel[0].jobTitle);
                $("#editPersonnelEmailAddress").val(result.data.personnel[0].email);

                $("#editPersonnelDepartment").html("");

                $.each(result.data.department, function () {
                    $("#editPersonnelDepartment").append(
                        $("<option>", {
                            value: this.id,
                            text: this.name
                        })
                    );
                });

                $("#editPersonnelDepartment").val(result.data.personnel[0].departmentID);

            } else {
                $("#editPersonnelModal .modal-title").replaceWith(
                    "Error retrieving data"
                );
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#editPersonnelModal .modal-title").replaceWith(
                "Error retrieving data"
            );
        }
    });
});

function getPersonalData() {
    $.ajax({
        url: "./libs/php/api.php",
        type: "POST",
        data: {
            API_TYPE: 1
        },
        success: function (result) {
            let response = JSON.parse(result);
            $("#personalTable").html("");
            let html = '';
            for (var i = 0; i < response.length; i++) {
                html += `
                        <tbody>
                            <tr>
                                <td class="align-middle text-nowrap">
                                    ${response[i].firstName + ' ' + response[i].lastName}
                                </td>
                                <td class="align-middle text-nowrap d-none d-md-table-cell">
                                    ${response[i].email}
                                </td>
                                <td class="align-middle text-nowrap d-none d-md-table-cell">
                                    ${response[i].department}
                                </td>
                                <td class="align-middle text-nowrap d-none d-md-table-cell">
                                    ${response[i].location}
                                </td>
                                <td class="text-end text-nowrap">
                                    <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editPersonalModal" onclick="updatePersonalInfo('${response[i].id}','${response[i].firstName}','${response[i].lastName}','${response[i].departmentID}','${response[i].email}')">
                                        <i class="fa-solid fa-pencil fa-fw"></i>
                                    </button>
                                    <button type="button" class="btn btn-primary btn-sm deletePersonnelBtn" data-bs-toggle="modal" data-bs-target="#deletePersonalModal" onclick="deletePersonalInfo('${response[i].id}')">
                                        <i class="fa-solid fa-trash fa-fw"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>`;
            }
            $('#personalTable').append(html);
        },
        error: function (jqXHR, textStatus, errorThrown) { }
    });
}

function getDepartmentsData() {
    $.ajax({
        url: "./libs/php/api.php",
        type: "POST",
        data: {
            API_TYPE: 3
        },
        success: function (result) {
            let response = JSON.parse(result);
            departments = response;
            fillDepartmentDropdown('addinfo-department');
            $("#departmentTable").html("");
            let html = '';
            for (var i = 0; i < response.length; i++) {
                html += `
                        <tbody>
                            <tr>
                                <td class="align-middle text-nowrap">
                                    ${response[i].department}
                                </td>
                                <td class="align-middle text-nowrap d-none d-md-table-cell">
                                    ${response[i].location}
                                </td>
                                <td class="align-middle text-end text-nowrap">
                                    <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal"
                                        onclick="updateDepartmentInfo('${response[i].id}','${response[i].department}','${response[i].location}')"
                                        data-bs-target="#updateDepartmentModal">
                                        <i class="fa-solid fa-pencil fa-fw"></i>
                                    </button>
                                    <button type="button" class="btn btn-primary btn-sm deleteDepartmentBtnr"
                                        data-bs-toggle="modal" onclick="deleteDepartmentInfo('${response[i].id}')"
                                        data-bs-target="#deleteDepartmentModal">
                                        <i class="fa-solid fa-trash fa-fw"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>`;
            }
            $('#departmentTable').append(html);
        },
        error: function (jqXHR, textStatus, errorThrown) { }
    });
}

function getLocationsData() {
    $.ajax({
        url: "./libs/php/api.php",
        type: "POST",
        data: {
            API_TYPE: 2
        },
        success: function (result) {
            let response = JSON.parse(result);
            locations = response;
            fillLocationDropdown('addinfo-location');
            fillLocationDropdown('adddepartment-location');
            $("#locationTable").html("");
            let html = '';
            for (var i = 0; i < response.length; i++) {
                html += `
                        <tbody>
                            <tr>
                                <td class="align-middle text-nowrap">
                                    ${response[i].name}
                                </td>
                                <td class="align-middle text-end text-nowrap">
                                    <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal"
                                        onclick="updateLocationInfo('${response[i].id}','${response[i].name}')"
                                        data-bs-target="#updateLocationModal">
                                        <i class="fa-solid fa-pencil fa-fw"></i>
                                    </button>
                                    <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal"
                                        onclick="deleteLocationInfo('${response[i].id}')"
                                        data-bs-target="#deleteLocationModal">
                                        <i class="fa-solid fa-trash fa-fw"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>`;
            }
            $('#locationTable').append(html);
        },
        error: function (jqXHR, textStatus, errorThrown) { }
    });
}

function updatePersonalInfo(Id, Fname, Lname, Department, Email) {
    fillLocationDropdown('personal-location');
    fillDepartmentDropdown('personal-department');
    $("#fname").val(Fname);
    $("#lname").val(Lname);
    $("#personal-department").val(Department);
    $("#email").val(Email);
    $("#pid").val(Id);
}

function fillLocationDropdown(id) {
    $("#" + id).html("");
    let html = '';
    for (var i = 0; i < locations.length; i++) {
        html += `
                    <option value="${locations[i].id}">
                        ${locations[i].name}
                    </option>`;
    }
    $("#" + id).append(html);
}

function fillDepartmentDropdown(id) {
    $("#" + id).html("");
    let html = '';
    for (var i = 0; i < departments.length; i++) {
        html += `
                    <option value="${departments[i].id}">
                        ${departments[i].department}
                    </option>`;
    }

    $("#" + id).append(html);
}

function updateDepartmentInfo(Id, Name, Location) {
    fillLocationDropdown('location-department');
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
