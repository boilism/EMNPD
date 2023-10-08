function format_NP_Content(d) {
    // `d` is the original data object for the row
    return (
        '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px; width:100%">' +
        '<tr>' +
        '<td style="width:150px">Fermentation Condition:</td>' +
        '<td style="width:87%">' +
        d.Fermentation_Condition +
        '</td>' +
        '</tr>' +
        '</table>'
    );
}

$(document).ready(function () {
    var url = window.location.href;
    var enc_id = url.match(/\/naturalproducts\/(.*?)\//)[1];
    var ajaxConfig = {url: 'http://127.0.0.1:8000/emnpd/naturalproducts/' + enc_id + '/np_content_json/'};

    // Retrieve data and create tables dynamically
    $.ajax({
        url: ajaxConfig.url,
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            var unitData = response.data;

            // Loop through each unit and create a DataTable
            $.each(unitData, function (unit, unitList) {
                var tableId = 'NPs_Content_' + unit.replace(' ', '_');


                // Create the table element
                var tableHTML = '<table id="' + tableId + '" class="hover row-border" style="width:100%">' +
                    '<thead>' +
                    '<tr>' +
                    '<th></th>' +
                    '<th>Organism ID</th>' +
                    '<th style="text-align: center">Endophyte Name</th>' +
                    '<th style="text-align: center">Endophyte Type</th>' +
                    '<th style="width: 10%;text-align: center">Fermentation Condition Index</th>' +
                    '<th style="text-align: center">Content Percentage*</th>' +
                    '<th style="text-align: center">NP Content</th>' +
                    '<th style="text-align: center">Unit**</th>' +
                    '<th style="text-align: center">Reference</th>' +
                    '</tr>' +
                    '</thead>' +
                    '</table>';

                // Append the table HTML to the container
                $('#npContentTables').append(tableHTML);

                // Create the DataTable
                $('#' + tableId).DataTable({
                    data: unitList,
                    columns: [
                        // Define your column configuration
                        {className: 'dt-control', orderable: false, data: null, defaultContent: ''},
                        {data: 'ENS_ID'},
                        {data: 'Endophyte_Name', className: 'center'},
                        {data: 'Endophyte_Type', className: 'center'},
                        {data: 'Fermentation_Index', className: 'center'},
                        {
                            data: 'Content_Bar',
                            className: 'center',
                            render: function (data, type, row) {
                                if (type === 'display') {
                                    var colorMap = {
                                        'mg': '#ffa500',
                                        '%': '#00a5dc',
                                        'μg/mL': '#004eaf',
                                        'pmol/mL': '#2db928',
                                        'Relative area': '#057855',
                                        'g/L': '#ff2d37',
                                        'mg/L': '#b62b6e',
                                        'ng/mL': '#9628c6',
                                        'mg/g': '#4374b7',
                                        'μg/L': '#ffed00',
                                        'μg/g dcw': '#71c6c1',
                                        'μg/g': '#a560e8',
                                        'mg/plate': '#4285f4',
                                        'mg/g DW': '#099d84',
                                        'g dry wt/L': '#fec600',
                                        'mg/100 g': '#c9c3e6',
                                    };
                                    var value = parseFloat(data);
                                    var unit = row['Content_Unit'];
                                    var color = colorMap[unit] || 'gray';
                                    var sumByUnit = row['unit_sum'];
                                    if (typeof sumByUnit !== 'undefined' && sumByUnit !== 0) {
                                        var percentage = (value / sumByUnit) * 100; // Calculate the percentage
                                        // Return the rendered content
                                        return '<div class="progress" style="margin-top: 15px">'
    + '<div class="progress-bar bg-primary" role="progressbar" style="width: ' + percentage + '%; background-color: ' + color + ';" aria-valuenow="' + value + '" aria-valuemin="0" aria-valuemax="100" data-toggle="tooltip" data-placement="top" title="' + percentage.toFixed(2) + '%"></div>'
    + '</div>';
                                    }
                                }
                                return data;
                            }
                        },
                        {data: 'NP_Content', className: 'center'},
                        {data: 'Content_Unit', className: 'center'},
                        {data: 'Reference', className: 'center'},
                        {data: 'unit_sum'}
                    ],
                    order: [5, 'desc'],
                    scrollY: '450px',
                    scrollCollapse: true,
                    searching: false, // Remove the search box
                    info: false,
                    columnDefs: [
                        {
                            target: 9,
                            visible: false,
                            searchable: false,
                        }
                    ],

                    drawCallback: function (settings) {
                        // Open all child rows by default
                        var api = this.api();
                        api.rows().every(function () {
                            var row = this;
                            var tr = row.node();
                            row.child(format_NP_Content(row.data())).show();
                            $(tr).addClass('shown');
                        });
                    }
                });
            });

            // Add event listener for opening and closing details
            $('#npContentTables').on('click', 'tbody td.dt-control', function () {
                var tr = $(this).closest('tr');
                var table = tr.closest('table').DataTable();
                var row = table.row(tr);

                if (row.child.isShown()) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                } else {
                    // Open this row
                    row.child(format_NP_Content(row.data())).show();
                    tr.addClass('shown');
                }
            });
        }
    });
});
