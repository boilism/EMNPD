function format_Cell_Line_NP_Active(d) {
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
        '<td style="width:150px">Assay Description:</td>' +
        '<td style="width:85%">' +
        d.Assay_Description +
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
    $('#Cell_Line_NP_Active').on('click', 'tbody td.dt-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
        } else {
            // Open this row
            row.child(format_Cell_Line_NP_Active(row.data())).show();
        }
    });

    $('#Cell_Line_NP_Active').on('requestChild.dt', function (e, row) {
        row.child(format_Cell_Line_NP_Active(row.data())).show();
    });

    var url = window.location.href;
    var ent_id = url.match(/\/cell_line\/(.*?)\//)[1];

    var table = $('#Cell_Line_NP_Active').DataTable({
        ajax: 'http://127.0.0.1:8000/emnpd/target/' + ent_id + '/target_active_json/',
        rowId: 'id',
        stateSave: true,
        columns: [
            {
                className: 'dt-control',
                orderable: false,
                data: null,
                defaultContent: '',
            },
            {data: 'EMNPD_SID'},
            {data: 'Endophyte_Name', className: 'center'},
            {data: 'NPs_ID', className: 'center'},
            {data: 'NPs_Name', className: 'center'},
            {data: 'Target_ID', className: 'center'},
            {data: 'Target_Name', className: 'center'},
            {data: 'Target_Type', className: 'center'},
            {data: 'Activity_Label', className: 'center'},
            {data: 'Activity_Name', className: 'center'},
            {data: 'Activity_Type', className: 'center'},
            {data: 'Value', className: 'center'},
            {data: 'Unit', className: 'center'},
            {data: 'Value_2'},
        ],
        order: [[9, 'asc'], [12, 'asc'], [8, 'asc'],[13, 'desc']],
        scrollX: true,
        scrollY: '450px',
        scrollCollapse: true,
        columnDefs: [
            {
                targets: 8,
                type: 'activity-label',
            },
                        {
                            target: 13,
                            visible: false,
                            searchable: false,
                        },
        ],
    });

    $.fn.dataTable.ext.type.order['activity-label-pre'] = function (data) {
        switch (data) {
            case 'Strong':
                return 0;
            case 'Moderate':
                return 1;
            case 'Weak':
                return 2;
            case 'Active':
                return 3;
            case 'Inactive':
                return 4;
            default:
                return -1;
        }
    };
});
