function format_Species_Source(d) {
    // `d` is the original data object for the row
    return (
        '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px; width:100%">' +
        '<tr>' +
        '<td style="width:160px">Plant Material:</td>' +
        '<td style="width:88%">' +
        d.Plant_Material +
        '</td>' +
        '</tr>' +
        '</table>'
    );
}


$(document).ready(function () {
    // Add event listener for opening and closing details
    $('#Species_Source').on('click', 'tbody td.dt-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
        } else {
            // Open this row
            row.child(format_Species_Source(row.data())).show();
        }
    });

    $('#Species_Source').on('requestChild.dt', function (e, row) {
        row.child(format_Species_Source(row.data())).show();
    });

    var url = window.location.href;
    var enc_id = url.match(/\/naturalproducts\/(.*?)\//)[1];

    var table = $('#Species_Source').DataTable({
        ajax: 'http://127.0.0.1:8000/emnpd/naturalproducts/' + enc_id + '/species_source_json/',
        rowId: 'id',
        stateSave: true,
        columns: [
            {
                className: 'dt-control',
                orderable: false,
                data: null,
                defaultContent: '',
            },
            {data: 'Endophyte_ID'},
            {data: 'Endophyte_Name', className: 'center'},
            {data: 'Family', className: 'center'},
            {data: 'Genus', className: 'center'},
            {data: 'Taxonomy_ID', className: 'center'},
            {data: 'GenBank_ID', className: 'center'},
            {data: 'Closest_GenBank_ID', className: 'center'},
            {data: 'Reference', className: 'center'},
        ],
        order: [[1, 'asc']],
        scrollX: true,
    });
});
