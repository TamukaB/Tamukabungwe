<?php

include_once("./includes/db.php");

$tbl_personaldata = "select * from tbl_personaldata";
$personal = mysqli_query($db_config, $tbl_personaldata);

$tbl_location = "select * from tbl_location";
$location = mysqli_query($db_config, $tbl_location);

$tbl_department = "select * from tbl_department";
$department = mysqli_query($db_config, $tbl_department);

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Company Directory</title>
    <link rel="icon" type="image/x-icon" href="./images/logo.png" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="./css/style.css">
</head>

<body>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <img src="./images/logo.png" width="190" height="60" alt="">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <marquee behavior="" direction="">
                    Welcome to the company directory.
                </marquee>

                <form action="">
                    <div class="input-group ">
                        <div class=" input-group-prepend">
                            <span style="padding: 11px;" class="bg-dark input-group-text" id="basic-addon1"><i class="fa text-light fa-search"></i></span>
                        </div>
                        <input type="text" class="form-control" placeholder="Search" id="search-value">
                    </div>
                </form>

                <button class="btn btn-primary mx-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdropOff" aria-controls="staticBackdropOff"><i class="fa fa-add"></i></button>
            </div>
        </div>
    </nav>
    <div>
        <hr>
        <div class="row m-3">
            <div class="col-4">
                <button id="per" class="w-100 btn border btn-primary" onclick="chnageTab('p')">Personel</button>
            </div>
            <div class="col-4">
                <button id="dep" class="w-100 btn border" onclick="chnageTab('d')">Department</button>
            </div>
            <div class="col-4">
                <button id="loc" class="w-100 btn border" onclick="chnageTab('l')">Location</button>
            </div>
        </div>
        <hr>
    </div>
    <section>
        <div class="m-4" id="pers">
            <table id="table_per" class="table table-striped my-5">

                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Email</th>
                        <th scope="col">Department</th>
                        <th scope="col">Location</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody id="personalTable">
                    <?php
                    $counter = 0;
                    while ($rows = mysqli_fetch_assoc($personal)) {
                        $counter++;
                    ?>
                        <tr>
                            <th scope="row">
                                <?php echo $counter; ?>
                            </th>
                            <td>
                                <?php echo $rows['Fname']; ?>
                            </td>
                            <td>
                                <?php echo $rows['Lname']; ?>
                            </td>
                            <td>
                                <?php echo $rows['Email']; ?>
                            </td>
                            <td>
                                <?php echo $rows['Department']; ?>
                            </td>
                            <td>
                                <?php echo $rows['Location']; ?>
                            </td>
                            <td>
                                <div class="d-flex ">
                                    <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdropPersonal" onclick="updatePersonalInfo('<?php echo $rows['Id']; ?>','<?php echo $rows['Fname']; ?>','<?php echo $rows['Lname']; ?>','<?php echo $rows['Department']; ?>','<?php echo $rows['Location']; ?>','<?php echo $rows['Email']; ?>')"><i class="fa fa-pencil"></i></button>
                                    <button class="btn mx-1 btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdropPDEL" onclick="deletePersonalInfo('<?php echo $rows['Id']; ?>')"><i class="fa fa-trash"></i></button>
                                </div>
                            </td>
                        </tr>
                    <?php
                    }
                    ?>
                </tbody>


            </table>

        </div>
        <div class="m-4" id="depa" hidden>
            <table id="table_dep" class="my-5 table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody id="departmentTable">
                    <?php
                    $counter = 0;
                    while ($rows = mysqli_fetch_assoc($department)) {
                        $counter++;
                    ?>
                        <tr>
                            <th scope="row">
                                <?php echo $counter; ?>
                            </th>
                            <td>
                                <?php echo $rows['Name']; ?>
                            </td>
                            <td>
                                <?php echo $rows['Location']; ?>
                            </td>
                            <td>
                                <div class="d-flex ">
                                    <button class="btn btn-warning" data-bs-toggle="modal" onclick="updateDepartmentInfo('<?php echo $rows['Id']; ?>','<?php echo $rows['Name']; ?>','<?php echo $rows['Location']; ?>')" data-bs-target="#staticBackdropDepartment"><i class="fa fa-pencil"></i></button>
                                    <button class="btn mx-1 btn-danger" data-bs-toggle="modal" onclick="deleteDepartmentInfo('<?php echo $rows['Id']; ?>')" data-bs-target="#staticBackdropDDEL"><i class="fa fa-trash"></i></button>
                                </div>
                            </td>
                        </tr>
                    <?php
                    }
                    ?>
                </tbody>
            </table>
        </div>
        <div class="m-4" id="loca" hidden>
            <table id="table_loc" class="my-5 table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody id="locationTable">
                    <?php
                    $counter = 0;
                    while ($rows = mysqli_fetch_assoc($location)) {
                        $counter++;
                    ?>
                        <tr>
                            <th scope="row">
                                <?php echo $counter; ?>
                            </th>
                            <td>
                                <?php echo $rows['City']; ?>
                            </td>
                            <td>
                                <div class="d-flex ">
                                    <button class="btn btn-warning" data-bs-toggle="modal" onclick="updateLocationInfo('<?php echo $rows['Id']; ?>','<?php echo $rows['City']; ?>')" data-bs-target="#staticBackdropLocation"><i class="fa fa-pencil"></i></button>
                                    <button class="btn mx-1 btn-danger" data-bs-toggle="modal" onclick="deleteLocationInfo('<?php echo $rows['Id']; ?>')" data-bs-target="#staticBackdropLDEL"><i class="fa fa-trash"></i></button>
                                </div>
                            </td>
                        </tr>
                    <?php
                    }
                    ?>
                </tbody>
            </table>
        </div>
    </section>
    <!-- Modal -->
    <div class="modal fade" id="staticBackdropPersonal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit Personal Information</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <form action="./php/personal.php" class="p-3" method="post">
                    <div class="modal-body">
                        <input type="text" id="pid" name="perid" hidden>
                        <div class="form-group">
                            <label>First name</label>
                            <input type="text" id="fname" required class="form-control" name="fname" aria-describedby="emailHelp">

                        </div>
                        <div class="form-group">
                            <label>Last name</label>
                            <input type="text" required id="lname" name="lname" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Department</label>
                            <select required name="department" class="form-select">
                                    <?php
                                    $department = mysqli_query($db_config, "select * from tbl_department");
                                    while ($rows = mysqli_fetch_assoc($department)) {
                                    ?>
                                        <option value="<?php echo $rows['Name']; ?>">
                                            <?php echo $rows['Name']; ?>
                                        </option>
                                    <?php
                                    }
                                    ?>
                                </select>
                        </div>
                        <div class="form-group">
                            <label>Location</label>
                            <select required name="location" id="location" class="form-select">
                                <?php
                                $location = mysqli_query($db_config, "select * from tbl_location");
                                while ($rows = mysqli_fetch_assoc($location)) { ?>
                                    <option value="<?php echo $rows['City']; ?>">
                                        <?php echo $rows['City']; ?>
                                    </option>
                                <?php } ?>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input required type="email" name="email" id="email" class="form-control">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="modal fade" id="staticBackdropDepartment" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit Department Information</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form action="./php/department.php" class="p-3" method="post">
                    <div class="modal-body">
                        <input type="text" id="did" name="depid" hidden>
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" id="name" required class="form-control" name="name" aria-describedby="emailHelp">
                        </div>
                        <div class="form-group">
                            <label>Location</label>
                            <select required name="location" id="location" class="form-select">
                                <?php
                                $location = mysqli_query($db_config, "select * from tbl_location");
                                while ($rows = mysqli_fetch_assoc($location)) { ?>
                                    <option value="<?php echo $rows['City']; ?>">
                                        <?php echo $rows['City']; ?>
                                    </option>
                                <?php } ?>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="modal fade" id="staticBackdropLocation" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit Location Information</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form action="./php/location.php" class="p-3" method="post">
                    <div class="modal-body">
                        <input type="text" id="lid" name="locid" hidden>
                        <div class="form-group">
                            <label>City</label>
                            <input type="text" required class="form-control" id="loccity" name="city" aria-describedby="emailHelp">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="modal fade" id="staticBackdropPDEL" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Delete Memeber</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form action="./php/delPersonal.php" method="post">
                    <div class="modal-body">
                        <p>Are you sure...!</p>
                        <input type="text" hidden class="form-control" name="pdelid" id="pdelid">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="SUBMIT" class="btn btn-danger">Delete</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="modal fade" id="staticBackdropDDEL" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Delete Department</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form action="./php/delDepartment.php" method="post">
                    <div class="modal-body">
                        <p>Are you sure...!</p>
                        <input type="text" class="form-control" hidden name="Ddelid" id="Ddelid">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="SUBMIT" class="btn btn-danger">Delete</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="modal fade" id="staticBackdropLDEL" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Delete Location</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form action="./php/delLocation.php" method="post">
                    <div class="modal-body">
                        <p>Are you sure...!</p>
                        <input type="text" class="form-control" hidden name="Ldelid" id="Ldelid">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="SUBMIT" class="btn btn-danger">Delete</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="offcanvas offcanvas-start w-50" tabindex="-1" id="staticBackdropOff" aria-labelledby="staticBackdropLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="staticBackdropLabel">Add Information</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <div class="d-flex flex-column">
                <hr>
                <details>
                    <summary>Personal Information</summary>
                    <div class="d-flex justify-content-center">
                        <form action="./php/personal.php" class="w-50 p-3" method="post">
                            <input type="text" name="perid" value="0" hidden>
                            <div class="form-group">
                                <label>First name</label>
                                <input type="text" required class="form-control" name="fname" aria-describedby="emailHelp">
                            </div>
                            <div class="form-group">
                                <label>Last name</label>
                                <input type="text" required name="lname" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Department</label>
                                <select required name="department" class="form-select">
                                    <?php
                                    $department = mysqli_query($db_config, "select * from tbl_department");
                                    while ($rows = mysqli_fetch_assoc($department)) {
                                    ?>
                                        <option value="<?php echo $rows['Name']; ?>">
                                            <?php echo $rows['Name']; ?>
                                        </option>
                                    <?php
                                    }
                                    ?>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Location</label>
                                <select required name="location" id="location" class="form-select">
                                    <?php
                                    $location = mysqli_query($db_config, "select * from tbl_location");
                                    while ($rows = mysqli_fetch_assoc($location)) { ?>
                                        <option value="<?php echo $rows['City']; ?>">
                                            <?php echo $rows['City']; ?>
                                        </option>
                                    <?php } ?>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input required type="email" name="email" class="form-control">
                            </div>
                            <button type="submit" class="btn btn-primary mt-4">Submit</button>
                        </form>
                    </div>
                </details>
                <hr>
                <details>
                    <summary>Department Information</summary>
                    <div class="d-flex justify-content-center">
                        <form action="./php/department.php" class="w-50 p-3" method="post">
                            <input type="text" name="depid" value="0" hidden>
                            <div class="form-group">
                                <label>Department name</label>
                                <input type="text" class="form-control" aria-describedby="emailHelp" name="name" required>
                            </div>
                            <div class="form-group">
                                <label>Location</label>
                                <select required name="location" id="location" class="form-select">
                                    <?php
                                    $location = mysqli_query($db_config, "select * from tbl_location");
                                    while ($rows = mysqli_fetch_assoc($location)) { ?>
                                        <option value="<?php echo $rows['City']; ?>">
                                            <?php echo $rows['City']; ?>
                                        </option>
                                    <?php } ?>
                                </select>
                            </div>
                            <button type="submit" class="btn mt-3 btn-primary">Submit</button>
                        </form>
                    </div>
                </details>
                <hr>
                <details>
                    <summary>Location Information</summary>
                    <div class="d-flex justify-content-center">
                        <form action="./php/location.php" class="w-50 p-3" method="post">
                            <input type="text" name="locid" value="0" hidden>
                            <div class="form-group">
                                <label>City</label>
                                <input type="text" name="city" required class="form-control" i aria-describedby="emailHelp">
                            </div>
                            <button type="submit" class="btn mt-3 btn-primary">Submit</button>
                        </form>
                    </div>
                </details>
                <hr>
                <small id="emailHelp" class="form-text text-center text-muted">We'll never share your information with
                    anyone
                    else.</small>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script src="./js/script.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <script>
        $(document).ready(function() {
            $("#search-value").on("keyup", function() {
                var value = $(this).val().toLowerCase();
                $("#personalTable tr").filter(function() {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
                $("#departmentTable tr").filter(function() {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
                $("#locationTable tr").filter(function() {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });
        });
    </script>
</body>

</html>