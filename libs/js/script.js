let locations = [];
let departments = [];

$(document).ready(() => {
    getPersonnelData();
    getLocationsData();
    getDepartmentsData();

    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has('active')) {
        if (searchParams.get('active') === 'personnel') {

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

$("#filterBtn").click(function () {
    // Get the filter criteria from the input field

    // Update the filter criteria in the filter personnel modal

    // Update the "Select Department" dropdown options
    var departmentDropdown = $("#filterModal #filterDepartment");
    departmentDropdown.html(""); // Clear existing options

    departmentDropdown.append(
        $("<option>", {
            value: "",
            text: "All Departments",
        })
    );

    // Populate the "Select Department" dropdown with relevant options
    $.each(departments, function () {
        departmentDropdown.append(
            $("<option>", {
                value: this.id,
                text: this.department,
            })
        );
    }); ``

    var locationDropdown = $("#filterModal #filterLocation");
    locationDropdown.html(""); // Clear existing options

    locationDropdown.append(
        $("<option>", {
            value: "",
            text: "All Locations",
        })
    );

    // Populate the "Select Location" dropdown with relevant options
    $.each(locations, function () {
        locationDropdown.append(
            $("<option>", {
                value: this.id,
                text: this.name,
            })
        );
    });

    $("#applyFilterBtn").click(function () {
        // Get the selected department and location values from the dropdowns
        var selectedDepartmentId = $("#filterDepartment").val();
        var selectedLocationId = $("#filterLocation").val();

        $.ajax({
            url: "./libs/php/filter_personnel.php", // Replace with the actual endpoint to fetch filtered data
            type: 'POST',
            data: {
                departmentId: selectedDepartmentId,
                locationId: selectedLocationId,
            },
            success: function (data) {
                // Update the "personnelTable" with the filtered data
                let response = JSON.parse(data);
                loadPersonalData(response);
            },
            error: function () {
                alert('Error: Unable to fetch filtered data.');
            }

        });

        // Show the filter personnel modal
        $("#filterModal").modal("show");
    });

});


$("#refreshBtn").click(function () {

    if ($("#personnelBtn").hasClass("active")) {

        getPersonnelData();

    } else {

        if ($("#departmentsBtn").hasClass("active")) {

            getDepartmentsData();

        } else {

            getLocationsData();

        }

    }

});

$("#addBtn").click(function () {

    if ($('#personnelBtn').hasClass('active')) {
        $('#addPersonnelModal').offcanvas('show');
    }

    if ($('#departmentsBtn').hasClass('active')) {
        $('#addDepartmentModal').offcanvas('show');
    }

    if ($('#locationsBtn').hasClass('active')) {
        $('#addLocationModal').offcanvas('show');
    }
});

$("#personnelBtn").click(function () {

    getPersonnelData();

});

$("#departmentsBtn").click(function () {

    getDepartmentsData();

});

$("#locationsBtn").click(function () {

    getLocationsData();

});

$("#deleteDptBtn").click(function () {

    let employeeCount = Number($('#employeeCount')[0].innerHTML);

    if (employeeCount > 0) {
        alert("You cannot delete this department as it's has " + employeeCount + " employees");
    }

    $.ajax({
        url: "./libs/php/delDepartment.php",
        type: "POST",
        data: { Ddelid: $('#Ddelid')[0].value },
        success: function (result) {
            var resultCode = result.status.code;

            if (resultCode == 200) {
                $('#deleteDepartmentModal').modal('hide');
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

$("#deleteLocationModal").click(function () {

    let departmentCount = Number($('#departmentCount')[0].innerHTML);

    if (departmentCount > 0) {
        alert("You cannot delete this location as it's has " + departmentCount + " departments");
    }

    $.ajax({
        url: "./libs/php/delLocation.php",
        type: "POST",
        data: { Ldelid: $('#Ldelid')[0].value },
        success: function (result) {
            var resultCode = result.status.code;

            if (resultCode == 200) {
                $('#deleteDepartmentModal').modal('hide');
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

$("#searchInp").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#personnelTable tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
    $("#departmentTable tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
    $("#locationTable tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});

function getPersonnelData() {
    $.ajax({
        url: "./libs/php/api.php",
        type: "POST",
        data: {
            API_TYPE: 1
        },
        success: function (result) {
            let response = JSON.parse(result);
            loadPersonalData(response);
        },
        error: function (jqXHR, textStatus, errorThrown) { }
    });
}

function loadPersonalData(response) {
    $("#personnelTable").html("");
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
                            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editPersonnelModal" onclick="updatePersonnelInfo('${response[i].id}','${response[i].firstName}','${response[i].lastName}','${response[i].departmentID}','${response[i].email}')">
                                <i class="fa-solid fa-pencil fa-fw"></i>
                            </button>
                            <button type="button" class="btn btn-primary btn-sm deletePersonnelBtn" data-bs-toggle="modal" data-bs-target="#deletePersonnelModal" onclick="deletePersonnelInfo('${response[i].id}')">
                                <i class="fa-solid fa-trash fa-fw"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>`;
    }
    $('#personnelTable').append(html);
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
                                        data-bs-toggle="modal" onclick="deleteDepartmentInfo('${response[i].id}','${response[i].empCount}')"
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
                                        onclick="deleteLocationInfo('${response[i].id}','${response[i].empCount}')"
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

function updatePersonnelInfo(Id, Fname, Lname, Department, Email) {
    fillLocationDropdown('personnel-location');
    fillDepartmentDropdown('personnel-department');
    $("#fname").val(Fname);
    $("#lname").val(Lname);
    $("#personnel-department").val(Department);
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

function deletePersonnelInfo(Id) {
    $("#pdelid").val(Id);
}

function deleteDepartmentInfo(Id, empCount) {
    $("#Ddelid").val(Id);
    $("#employeeCount").text(empCount);
}

function deleteLocationInfo(Id, empCount) {
    $("#Ldelid").val(Id);
    $("#departmentCount").text(empCount);
}

// ... (previous code)

// Attach click event listener to delete department button
$('.deleteDepartmentBtn').click(function () {
    var departmentId = $(this).data('departmentId');

    // Call the function to get the department count and update the modal
    getEmployeeCountInDepartment(departmentId);
});

// Attach click event listener to delete location button
$('.deleteLocationBtn').click(function () {
    var locationId = $(this).data('locationid');

    // Call the function to get the employee count and update the modal
    getDepartmentCountInLocation(locationId);
});

// Function to get the count of employees in a department
function getEmployeeCountInDepartment(departmentId) {
    $.ajax({
        url: './libs/php/getEmployeeCountInDepartment.php', // Replace with the actual PHP routine URL
        type: 'POST',
        data: { departmentId: departmentId },
        success: function (response) {
            // Display the count in the modal
            $('#employeeCount').text(response); // Assuming you have an element with id 'employeeCount' in your modal
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error getting employee count:', errorThrown);
        }
    });
}

// Function to get the count of departments in a location
function getDepartmentCountInLocation(locationId) {
    $.ajax({
        url: './libs/php/getDepartmentCountInLocation.php', // Replace with the actual PHP routine URL
        type: 'POST',
        data: { locationId: locationId },
        success: function (response) {
            // Display the count in the modal
            $('#departmentCount').text(response); // Assuming you have an element with id 'departmentCount' in your modal
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error getting department count:', errorThrown);
        }
    });
}



