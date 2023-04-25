$(document).ready(function() {
    $('#output').hide();
})

$('#btnRun1').click(function() {
    $.ajax({
        url: 'api/api.php',
        type: 'POST',
        dataType: 'json',
        data: {
            api: 'api2',
            username: 'tamukabungwe'
        },
        success: function(result) {
            console.log(result);
            if (result.status.name == "ok") {
                var rows = ``;
                for (var i = 0 ; i < result.data.streetSegment.length; i++) {
                    rows += `
                    <tr> 
                        <td>${result.data.streetSegment[i].placename}</td>
                        <td>${result.data.streetSegment[i].postalcode}</td>
                        <td>${result.data.streetSegment[i].line}</td>
                    </tr>
                    `
                }
                $('#nearbyPlacesRows').html('');
                $('#nearbyPlacesRows').html(rows);

                $('#timezone').hide();
                $('#postalCode').hide();

                $('#output').show();
                $('#nearbyPlaces').show();
            }
        },
        error: function(jqxhr, textstatus, errorThrown) {
            // Your error code
        }
    });
});

$('#btnRun2').click(function() {
    $.ajax({
        url: 'api/api.php',
        type: 'POST',
        dataType: 'json',
        data: {
            api: 'api3',
            username: 'tamukabungwe'
        },
        success: function(result) {
            console.log(result);
            if (result.status.name == "ok") {
                if (result.status.name == "ok") {
                    var rows = ``;
                        rows = `
                        <tr> 
                            <td>${result.data.timezoneId}</td>
                            <td>${result.data.countryName}</td>
                            <td>${result.data.countryCode}</td>
                        </tr>
                        `
                    }
                    $('#timezoneRows').html('');
                    $('#timezoneRows').html(rows);

                    $('#nearbyPlaces').hide();
                    $('#postalCode').hide();

                    $('#output').show();
                    $('#timezone').show();
            }
        },
        error: function(jqxhr, textstatus, errorThrown) {
            // Your error code
        }
    });
});

$('#btnRun3').click(function() {
    $.ajax({
        url: 'api/api.php',
        type: 'POST',
        dataType: 'json',
        data: {
            api: 'api1',
            username: 'tamukabungwe'
        },
        success: function(result) {
            console.log(result);
            if (result.status.name == "ok") {
                var rows = ``;

                let results = result.data.geonames.filter(x => x.countryName === 'United Kingdom');
                for (var i = 0 ; i < results.length; i++) {
                    rows += `
                    <tr> 
                        <td>${results[i].countryCode}</td>
                        <td>${results[i].countryName}</td>
                    </tr>
                    `
                }
                $('#postalCodeRows').html('');
                $('#postalCodeRows').html(rows);

                $('#timezone').hide();
                $('#nearbyPlaces').hide();

                $('#output').show();
                $('#postalCode').show();
            }
        },
        error: function(jqxhr, textstatus, errorThrown) {
            // Your error code
        }
    });
});
