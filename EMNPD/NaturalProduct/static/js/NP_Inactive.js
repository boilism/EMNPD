function format_NP_Inactive(d) {
    // `d` is the original data object for the row
    return (
        '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px; width:100%">' +
        '<tr>' +
        '<td style="width:150px">NPs Concentration:</td>' +
        '<td style="width:85%">' +
        d.NPs_Concentration +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="width:150px">Concentration Unit:</td>' +
        '<td style="width:85%">' +
        d.Concentration_Unit +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="width:150px">Assay Description:</td>' +
        '<td style="width:85%">' +
        d.Assay_Description +
        '</td>' +
        '<tr>' +
        '<td style="width:150px">Control Name:</td>' +
        '<td style="width:85%">' +
        d.Control_Name +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="width:150px">Control Activity Values:</td>' +
        '<td style="width:85%">' +
        d.Control_Activity_Values +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="width:150px">Reference:</td>' +
        '<td style="width:85%">' +
        d.Reference +
        '</td>' +
        '</tr>' +
        '</table>'
    );
}

$(document).ready(function () {
    // Add event listener for opening and closing details
    $('#NP_Inactive').on('click', 'tbody td.dt-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
        } else {
            // Open this row
            row.child(format_NP_Inactive(row.data())).show();
        }
    });

    $('#NP_Inactive').on('requestChild.dt', function (e, row) {
        row.child(format_NP_Inactive(row.data())).show();
    });

    var url = window.location.href;
    var enc_id = url.match(/\/naturalproducts\/(.*?)\//)[1];

    var table = $('#NP_Inactive').DataTable({
        ajax: 'http://172.23.254.40/emnpd/naturalproducts/' + enc_id + '/target_inactive_json/',
        rowId: 'id',
        stateSave: true,
        columns: [
            {
                className: 'dt-control',
                orderable: false,
                data: null,
                defaultContent: '',
            },
            {data: 'Activity_Name'},
            {data: 'Target_ID'},
            {data: 'Target_Name'},
            {data: 'Target_Type'},
            {data: 'Target_Organism'},
            {data: 'Target_Organism_ID'},
            {data: 'Activity_Label'},
            {data: 'Activity_Type'},
            {data: 'Value'},
            {data: 'Unit'},
            {data: 'EMNPD_SID'},
            {data: 'Endophyte_Name'},
        ],
        order: [[1, 'asc']],
        scrollX: true,
    });
});
