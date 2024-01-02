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

    if ($('#personnelBtn').hasClass('active')) {
        var departmentDropdown = $("#filterPersonnelModal #filterPersonnelByDepartment");
        departmentDropdown.html(""); // Clear existing options

        departmentDropdown.append(
            $("<option>", {
                value: "",
                text: "All",
            })
        );
        // Populate the "Select Department" dropdown with relevant options
        $.each(departments, function () {
            departmentDropdown.append(
                $("<option>", {
                    value: this.id,
                    text: this.name,
                })
            );
        }); ``

        var locationDropdown = $("#filterPersonnelModal #filterPersonnelByLocation");
        locationDropdown.html(""); // Clear existing options

        locationDropdown.append(
            $("<option>", {
                value: "",
                text: "All",
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

        $('#filterPersonnelModal').modal('show');
    }

    if ($('#departmentsBtn').hasClass('active')) {

        var locationDropdown = $("#filterDepartmentModal #filterDepartmentByLocation");
        locationDropdown.html(""); // Clear existing options

        locationDropdown.append(
            $("<option>", {
                value: "",
                text: "All",
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

        $('#filterDepartmentModal').modal('show');
    }

});

$("#filterPersonnelByDepartment").change(function () {
    $("#filterPersonnelByLocation").val('')
    // Get the selected department and location values from the dropdowns
    let requestModal = {
        departmentId: $("#filterPersonnelByDepartment").val()
    }
    $.ajax({
        url: "./libs/php/filter_personnel.php", // Replace with the actual endpoint to fetch filtered data
        type: 'POST',
        data: requestModal,
        success: function (data) {
            // Update the "personnelTable" with the filtered data
            let response = JSON.parse(data);
            loadPersonalData(response);
        },
        error: function () {
            alert('Error: Unable to fetch filtered data.');
        }

    });
});

$("#filterPersonnelByLocation").change(function () {
    $("#filterPersonnelByDepartment").val('');
    // Get the selected department and location values from the dropdowns
    let requestModal = {
        locationId: $("#filterPersonnelByLocation").val()
    }
    $.ajax({
        url: "./libs/php/filter_personnel.php", // Replace with the actual endpoint to fetch filtered data
        type: 'POST',
        data: requestModal,
        success: function (data) {
            // Update the "personnelTable" with the filtered data
            let response = JSON.parse(data);
            loadPersonalData(response);
        },
        error: function () {
            alert('Error: Unable to fetch filtered data.');
        }

    });
});

$("#filterDepartmentByLocation").change(function () {
    // Get the selected department and location values from the dropdowns
    let requestModal = {
        locationId: $("#filterDepartmentByLocation").val()
    }
    $.ajax({
        url: "./libs/php/filter_department.php", // Replace with the actual endpoint to fetch filtered data
        type: 'POST',
        data: requestModal,
        success: function (data) {
            // Update the "personnelTable" with the filtered data
            let response = JSON.parse(data);
            loadDepartmentsData(response);
        },
        error: function () {
            alert('Error: Unable to fetch filtered data.');
        }

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
        $('#addPersonnelModal').modal('show');
    }

    if ($('#departmentsBtn').hasClass('active')) {
        $('#addDepartmentModal').modal('show');
    }

    if ($('#locationsBtn').hasClass('active')) {
        $('#addLocationModal').modal('show');
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
    $.ajax({
        url: "./libs/php/deleteDepartmentByID.php",
        type: "POST",
        data: { Ddelid: $('#Ddelid')[0].value },
        success: function (result) {
            var resultCode = result.status.code;
            if (resultCode == 200) {
                $('#deleteDepartmentModal').modal('hide');
                getDepartmentsData();
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

$("#deleteLocBtn").click(function () {
    $.ajax({
        url: "./libs/php/delLocation.php",
        type: "POST",
        data: { Ldelid: $('#Ldelid')[0].value },
        success: function (result) {
            var data = JSON.parse(result);
            var resultCode = data.status.code;
            if (resultCode == 200) {
                $('#deleteLocationModal').modal('hide');
                getLocationsData();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#editPersonnelModal .modal-title").replaceWith(
                "Error retrieving data"
            );
        }
    });

});

$("#deletePersonalBtn").click(function () {
    $.ajax({
        url: "./libs/php/delPersonal.php",
        type: "POST",
        data: { pdelid: $('#pdelid')[0].value },
        success: function (result) {
            var data = JSON.parse(result);
            var resultCode = data.status.code;
            if (resultCode == 200) {
                $('#deletePersonnelModal').modal('hide');
                getPersonnelData();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#editPersonnelModal .modal-title").replaceWith(
                "Error retrieving data"
            );
        }
    });

});

$(".editPersonnelBtn").click(function () {
    $.ajax({
        url: "https://coding.itcareerswitch.co.uk/companydirectory/libs/php/getPersonnelByID.php",
        type: "POST",
        dataType: "json",
        data: {
            id: $(this).attr("data-id")
        },
        success: function (result) {
            var resultCode = result.status.code;

            if (resultCode == 200) {
                $("#editPersonnelEmployeeID").val(result.data.personnel[0].id);
                $("#editPersonnelFirstName").val(result.data.personnel[0].firstName);
                $("#editPersonnelLastName").val(result.data.personnel[0].lastName);
                $("#editPersonnelJobTitle").val(result.data.personnel[0].jobTitle);
                $("#editPersonnelEmailAddress").val(result.data.personnel[0].email);

                // Clear and populate department dropdown
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

                // Show the modal
                $("#editPersonnelModal").modal("show");
            } else {
                // Handle error
                console.error("Error retrieving data");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Handle error
            console.error("Error retrieving data");
        }
    });
});

$(".insertPersonal").submit(function (e) {
    e.preventDefault();
    var form = $(this);
    $.ajax({
        url: "./libs/php/insertPerssonel.php",
        type: "POST",
        data: form.serialize(),
        success: function (result) {
            window.location = 'index.html';
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Handle error
            console.error("Error retrieving data");
        }
    });
});

$(".addDepartment").submit(function (e) {
    e.preventDefault();
    var form = $(this);

    $.ajax({
        url: "./libs/php/department.php",
        type: "POST",
        data: form.serialize(),
        success: function (result) {
            window.location = 'index.html?active=department';

        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Handle error
            console.error("Error retrieving data");
        }
    });
});

$(".addlocationForm").submit(function (e) {
    var form = $(this);

    e.preventDefault();
    $.ajax({
        url: "./libs/php/location.php",
        type: "POST",
        data: form.serialize(),
        success: function (result) {
            window.location = 'index.html?active=location';

        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Handle error
            console.error("Error retrieving data");
        }
    });
});

$("#editPersonnelForm").on("submit", function (e) {
    e.preventDefault();

    // Get the form data dynamically
    var formData = {
        id: $("#editPersonnelEmployeeID").val(),
        firstName: $("#editPersonnelFirstName").val(),
        lastName: $("#editPersonnelLastName").val(),
        jobTitle: $("#editPersonnelJobTitle").val(),
        email: $("#editPersonnelEmailAddress").val(),
        departmentID: $("#editPersonnelDepartment").val()
        // Add other fields as needed
    };

    // AJAX call to save form data
    $.ajax({
        url: "./libs/php/personal.php",
        type: "POST",
        dataType: "json",
        data: formData,
        success: function (result) {
            // Handle success
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Handle error
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
        url: "./libs/php/getAll.php",
        type: "POST",
        success: function (result) {
            let response = result.data[0];
            loadPersonalData(result.data);
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
                            ${response[i].lastName + ', ' + response[i].firstName}
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
                            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editPersonnelModal" 
                            data-myId="${response[i].id}"
                            >
                                <i class="fa-solid fa-pencil fa-fw"></i>
                            </button>
                            <button type="button" class="btn btn-primary btn-sm deletePersonnelBtn"  data-myId="${response[i].id}" data-bs-toggle="modal" data-bs-target="#deletePersonnelModal" ">
                                <i class="fa-solid fa-trash fa-fw"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>`;
    }
    $('#personnelTable').append(html);
}

$('#editPersonnelModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget);
    var id = button.data('myid');
    $('#editPersonnelEmployeeID').val(id);
    $.ajax({
        method: "POST",
        url: "./libs/php/getPersonnelByID.php",
        data: { id: id, API_TYPE: 7 },
        success: function (d) {
            let data = JSON.parse(d.data.personnel);
            data = data;
            var modal = $(this);
            $("#editPersonnelFirstName").val(data.firstName);
            $("#editPersonnelLastName").val(data.lastName);
            $("#editPersonnelJobTitle").val(data.jobTitle);
            $("#editPersonnelDepartment").val(data.departmentID);
            $("#editPersonnelEmailAddress").val(data.email);
            $("#pid").val(data.id);

        },
        error: function (jqXHR, textStatus, errorThrown) { }
    })
});

$('#deletePersonnelModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget);
    var id = button.data('myid');
    $.ajax({
        method: "POST",
        url: "./libs/php/getPersonnelByID.php",
        data: { id: id, API_TYPE: 7 },
        success: function (d) {
            let data = JSON.parse(d.data.personnel);
            data = data;
            var modal = $(this);
            $("#pdelid").val(id);
            $("#areYouSurePersonnelName").html(data.lastName + ' ' + data.firstName);

        },
        error: function (jqXHR, textStatus, errorThrown) { }
    })
});

$('#updateDepartmentModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget);
    var Id = button.data('id');
    var info = button.data('info');
    var location = button.data('location');
    $("#updateDepartmentID").val(Id);
    $("#updateDepartmentName").val(info);
    $("#updateDepartmentLocation").val(location);
});

$('#updateLocationModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget);
    var Id = button.data('id');
    var location = button.data('location');
    $("#updateLocationID").val(Id);
    $("#updateLocationCity").val(location);
});

$('#deleteDepartmentModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget);
    var name = button.data('name');
    $("#deleteDepartmentName").html(name);
});

function getDepartmentsData() {
    $.ajax({
        url: "./libs/php/getAllDepartments.php",
        type: "POST",

        success: function (result) {
            let response = result.data;
            departments = response;
            fillDepartmentDropdown('addinfo-department');
            loadDepartmentsData(result.data);
        },
        error: function (jqXHR, textStatus, errorThrown) { }
    });
}

function loadDepartmentsData(depts) {
    $("#departmentTable").html("");
    let html = '';
    for (var i = 0; i < depts.length; i++) {
        html += `
                        <tbody>
                            <tr>
                                <td class="align-middle text-nowrap">
                                    ${depts[i].name}
                                </td>
                                <td class="align-middle text-nowrap d-none d-md-table-cell">
                                    ${depts[i].location}
                                </td>
                                <td class="align-middle text-end text-nowrap">
                                    <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal"
                                    data-id="${depts[i].id}" data-info="${depts[i].name}"  data-location="${depts[i].name}"
                                        data-bs-target="#updateDepartmentModal">
                                        <i class="fa-solid fa-pencil fa-fw"></i>
                                    </button>
                                    <button type="button" class="btn btn-primary btn-sm deleteDepartmentBtnr"
                                        data-name="${depts[i].name}" onclick="deleteDepartmentInfo('${depts[i].id}','${depts[i].empCount}','${depts[i].name}')">
                                        <i class="fa-solid fa-trash fa-fw"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>`;
    }
    $('#departmentTable').append(html);
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
                                        data-id="${response[i].id}"
                                        data-location="${response[i].name}"
                                        data-bs-target="#updateLocationModal">
                                        <i class="fa-solid fa-pencil fa-fw"></i>
                                    </button>
                                    <button type="button" class="btn btn-primary btn-sm"onclick="deleteLocationInfo('${response[i].id}','${response[i].deptCount}','${response[i].name}')">
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
    $("." + id).html("");
    let html = '';
    for (var i = 0; i < locations.length; i++) {
        html += `
                    <option value="${locations[i].id}">
                        ${locations[i].name}
                    </option>`;
    }
    $("." + id).append(html);
}

function fillDepartmentDropdown(id) {
    $("." + id).html("");
    let html = '';
    for (var i = 0; i < departments.length; i++) {
        html += `
                    <option value="${departments[i].id}">
                        ${departments[i].name}
                    </option>`;
    }

    $("." + id).append(html);
}

function deletePersonnelInfo(Id) {
    $("#pdelid").val(Id);
}

function deleteDepartmentInfo(Id, empCount, dptName) {
    if (Number(empCount) > 0) {
        $('#deleteDepartmentWarningModal').modal('show');
        $("#departmentEmpCount").text(empCount);
    } else {
        $("#Ddelid").val(Id);
        $("#deleteDepartmentName").text(dptName);
        $('#deleteDepartmentModal').modal('show');
    }
}

function deleteLocationInfo(Id, deptCount, locName) {
    if (Number(deptCount) > 0) {
        $('#deleteLocationWarningModal').modal('show');
        $("#locationDepartmentCountWarning").text(deptCount);
    } else {
        $("#Ldelid").val(Id);
        $("#deleteLocationName").html(locName);
        $('#deleteLocationModal').modal('show');
    }
}

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




