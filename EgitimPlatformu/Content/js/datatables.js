
    var table = $('#data_table').DataTable({
        responsive: true,
        select: true,
        'aoColumnDefs': [{
            'bSortable': false,
            'aTargets': ['nosort']
        }]
    });
    $('#data_table tbody').on( 'click', 'tr', function() {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    // Plugin data table
    $.fn.dataTable.Api.register('column().data().sum()', function() {
        return this.reduce(function(a, b) {
            var x = parseFloat(a) || 0;
            var y = parseFloat(b) || 0;
            return x + y;
        });
    });

    /* Init the table and fire off a call to get the hidden nodes. */

    var table = $('#dt-plugin-method').DataTable();

    $('<button class="btn btn-primary  m-b-20">sum of age in all rows</button>')
        .prependTo('.dt-plugin-buttons')
        .on('click', function() {
            alert('Column sum is: ' + table.column(3).data().sum());
        });

    $('<button class="btn btn-primary m-r-10 m-b-20">sum of  age of visible rows</button>')
        .prependTo('.dt-plugin-buttons')
        .on('click', function() {
            alert('Column sum is: ' + table.column(3, { page: 'current' }).data().sum());
        });


    $.fn.dataTable.ext.type.detect.unshift(
        function(d) {
            return d === 'Low' || d === 'Medium' || d === 'High' ?
                'salary-grade' :
                null;
        }
    );

    $.fn.dataTable.ext.type.order['salary-grade-pre'] = function(d) {
        switch (d) {
            case 'Low':
                return 1;
            case 'Medium':
                return 2;
            case 'High':
                return 3;
        }
        return 0;
    };
    $('#dt-ordering').DataTable();

    /* Custom filtering function which will search data in column four between two values */
    $.fn.dataTable.ext.search.push(
        function(settings, data, dataIndex) {
            var min = parseInt($('#min').val(), 10);
            var max = parseInt($('#max').val(), 10);
            var age = parseFloat(data[3]) || 0; // use data for the age column

            if ((isNaN(min) && isNaN(max)) ||
                (isNaN(min) && age <= max) ||
                (min <= age && isNaN(max)) ||
                (min <= age && age <= max)) {
                return true;
            }
            return false;
        }
    );

    var dtage = $('#dt-range').DataTable();

    // Event listener to the two range filtering inputs to redraw on input
    $('#min, #max').keyup(function() {
        dtage.draw();
    });

    /* Create an array with the values of all the input boxes in a column */
    $.fn.dataTable.ext.order['dom-text'] = function(settings, col) {
        return this.api().column(col, { order: 'index' }).nodes().map(function(td, i) {
            return $('input', td).val();
        });
    }

    /* Create an array with the values of all the input boxes in a column, parsed as numbers */
    $.fn.dataTable.ext.order['dom-text-numeric'] = function(settings, col) {
        return this.api().column(col, { order: 'index' }).nodes().map(function(td, i) {
            return $('input', td).val() * 1;
        });
    }

    /* Create an array with the values of all the select options in a column */
    $.fn.dataTable.ext.order['dom-select'] = function(settings, col) {
        return this.api().column(col, { order: 'index' }).nodes().map(function(td, i) {
            return $('select', td).val();
        });
    }

    /* Create an array with the values of all the checkboxes in a column */
    $.fn.dataTable.ext.order['dom-checkbox'] = function(settings, col) {
        return this.api().column(col, { order: 'index' }).nodes().map(function(td, i) {
            return $('input', td).prop('checked') ? '1' : '0';
        });
    }

    /* Initialise the table with the required column ordering data types */
    $(document).ready(function() {
        $('#dt-live-dom').DataTable({
            "columns": [
                null,
                { "orderDataType": "dom-text-numeric" },
                { "orderDataType": "dom-text", type: 'string' },
                { "orderDataType": "dom-select" }
            ]
        });
    });




    // Server side processing Data-table
    $('#dt-server-processing').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": "dt-json-data/scripts/server-processing.php",
        "columns": [
            { "data": "first_name" },
            { "data": "last_name" },
            { "data": "position" },
            { "data": "office" },
            { "data": "start_date" },
            { "data": "salary" }
        ]
    });

    $('#dt-http').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "dt-json-data/scripts/server-processing.php",
            data: function(d) {
                d.myKey = "myValue";
                // d.custom = $('#myInput').val();
                // etc
            }
        },
        "columns": [
            { "data": "first_name" },
            { "data": "last_name" },
            { "data": "position" },
            { "data": "office" },
            { "data": "start_date" },
            { "data": "salary" }
        ]
    });

    $('#dt-post').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "dt-json-data/scripts/post.php",
            type: "post"
        },
        "columns": [
            { "data": "first_name" },
            { "data": "last_name" },
            { "data": "position" },
            { "data": "office" },
            { "data": "start_date" },
            { "data": "salary" }
        ]
    });

    // Data-table ajax
    $('#dt-ajax-array').DataTable({
        "ajax": "dt-json-data/arrays.txt"
    });
    $('#dt-ajax-object').DataTable({
        "ajax": "dt-json-data/objects.txt",
        "columns": [
            { "data": "name" },
            { "data": "position" },
            { "data": "office" },
            { "data": "extn" },
            { "data": "start_date" },
            { "data": "salary" }
        ]
    });
    $('#dt-nested-object').DataTable({
        "processing": true,
        "ajax": "dt-json-data/objects_deep.txt",
        "columns": [
            { "data": "name" },
            { "data": "hr.position" },
            { "data": "contact.0" },
            { "data": "contact.1" },
            { "data": "hr.start_date" },
            { "data": "hr.salary" }
        ]
    });
    $('#dt-orthogonal').DataTable({
        ajax: "dt-json-data/orthogonal.txt",
        columns: [
            { data: "name" },
            { data: "position" },
            { data: "office" },
            { data: "extn" }, {
                data: {
                    _: "start_date.display",
                    sort: "start_date.timestamp"
                }
            },
            { data: "salary" }
        ]
    });
    var generatetable = $('#dt-generate-content').DataTable({
        "ajax": "dt-json-data/arrays.txt",
        "columnDefs": [{
            "targets": -1,
            "data": null,
            "defaultContent": "<button>Click!</button>"
        }]
    });

    $('#dt-generate-content tbody').on('click', 'button', function() {
        var data = generatetable.row($(this).parents('tr')).data();
        alert(data[0] + "'s salary is: " + data[5]);
    });

    $('#dt-render').DataTable({
        "ajax": "dt-json-data/arrays.txt",
        "deferRender": true
    });
    // Data source table js start
    $('#dom-table').DataTable();
    $('#ajax-table').DataTable({
        "ajax": 'dt-json-data/ajax-table.json'
    });

    // Jsource table start

    $('#jsource-table').DataTable({
        data: dataSet,
        columns: [
            { title: "Name" },
            { title: "Position" },
            { title: "Office" },
            { title: "Extn." },
            { title: "Start date" },
            { title: "Salary" }
        ]
    });
    // Jsource table end

    // Server side script table start
    $('#server-table').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": "dt-json-data/server-table.php"
    });
    // Server side script table end
    // Data source table js end

    // Api table js start
    var t = $('#add-row-table').DataTable();
    var counter = 1;

    $('#addRow').on('click', function() {
        t.row.add([
            counter + '.1',
            counter + '.2',
            counter + '.3',
            counter + '.4',
            counter + '.5'
        ]).draw(false);

        counter++;
    });

    // Automatically add a first row of data
    $('#addRow').click();

    // Setup - add a text input to each footer cell
    $('#footer-search tfoot th').each(function() {
        var title = $(this).text();
        $(this).html('<input type="text" class="form-control" placeholder="Search ' + title + '" />');
    });

    // DataTable
    var table = $('#footer-search').DataTable();

    // Apply the search
    table.columns().every(function() {
        var that = this;

        $('input', this.footer()).on('keyup change', function() {
            if (that.search() !== this.value) {
                that
                    .search(this.value)
                    .draw();
            }
        });
    });

    $('#footer-select').DataTable({
        initComplete: function() {
            this.api().columns().every(function() {
                var column = this;
                var select = $('<select class="form-control form-control-sm"><option value=""></option></select>')
                    .appendTo($(column.footer()).empty())
                    .on('change', function() {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );

                        column
                            .search(val ? '^' + val + '$' : '', true, false)
                            .draw();
                    });

                column.data().unique().sort().each(function(d, j) {
                    select.append('<option value="' + d + '">' + d + '</option>')
                });
            });
        }
    });
    // Add Rows start
    var srow = $('#row-select').DataTable();

    $('#row-select tbody').on('click', 'tr', function() {
        $(this).toggleClass('selected');
    });

    $('#row-select-btn').on('click',function() {
        alert(srow.rows('.selected').data().length + ' row(s) selected');
    });
    // Add Rows end
    // Delete rows start
    var drow = $('#row-delete').DataTable();

    $('#row-delete tbody').on('click', 'tr', function() {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            drow.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    $('#row-delete-btn').on('click',function() {
        drow.row('.selected').remove().draw(!1);
    });
    // Delete rows end

    // /* Formatting function for row details - modify as you need */
    function format(d) {
        // `d` is the original data object for the row
        return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
            '<tr>' +
            '<td>Full name:</td>' +
            '<td>' + d.name + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td>Extension number:</td>' +
            '<td>' + d.extn + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td>Extra info:</td>' +
            '<td>And any further details here (images etc)...</td>' +
            '</tr>' +
            '</table>';
    }

    var ct = $('#child-table').DataTable({
        "ajax": "dt-json-data/ajax-child-rows.json",
        "columns": [{
                "className": 'details-control',
                "orderable": false,
                "data": null,
                "defaultContent": ''
            },
            { "data": "name" },
            { "data": "position" },
            { "data": "office" },
            { "data": "salary" }
        ],
        "order": [
            [1, 'asc']
        ]
    });

    // Add event listener for opening and closing details
    $('#child-table tbody').on('click', 'td.details-control', function() {
        var tr = $(this).closest('tr');
        var row = ct.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        } else {
            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
    });

    // Form input start
    var table = $('#form-input-table').DataTable();

    $('#form-input-btn').on('click',function() {
        var data = table.$('input, select').serialize();
        alert(
            "The following data would have been submitted to the server: \n\n" +
            data.substr(0, 120) + '...'
        );
        return false;
    });
    // Form input end

    // Show-hide table js start
    var sh = $('#show-hide-table').DataTable({
        "scrollY": "200px",
        "paging": false
    });

    $('a.toggle-vis').on('click', function(e) {
        e.preventDefault();

        // Get the column API object
        var column = sh.column($(this).attr('data-column'));

        // Toggle the visibility
        column.visible(!column.visible());
    });
    // Show-hide table js end
    // Search API start
    function filterGlobal() {
        $('#search-api').DataTable().search(
            $('#global_filter').val(),
            $('#global_regex').prop('checked'),
            $('#global_smart').prop('checked')
        ).draw();
    }

    function filterColumn(i) {
        $('#search-api').DataTable().column(i).search(
            $('#col' + i + '_filter').val(),
            $('#col' + i + '_regex').prop('checked'),
            $('#col' + i + '_smart').prop('checked')
        ).draw();
    }
    $('#search-api').DataTable();

    $('input.global_filter').on('keyup click', function() {
        filterGlobal();
    });

    $('input.column_filter').on('keyup click', function() {
        filterColumn($(this).parents('tr').attr('data-column'));
    });
    // Search API end
    // Api table js end

    // Styling js start
    $('#base-style').DataTable();
    $('#no-style').DataTable();
    $('#compact').DataTable();
    $('#table-style-hover').DataTable();
    // Styling js end


    $('#simpletable').DataTable();

    $('#order-table').DataTable({
        "order": [
            [3, "desc"]
        ]
    });

    $('#multi-colum-dt').DataTable({
        columnDefs: [{
            targets: [0],
            orderData: [0, 1]
        }, {
            targets: [1],
            orderData: [1, 0]
        }, {
            targets: [4],
            orderData: [4, 0]
        }]
    });

    $('#complex-dt').DataTable();

    $('#DOM-dt').DataTable({
        "dom": '<"top"i>rt<"bottom"flp><"clear">'
    });

    $('#alt-pg-dt').DataTable({
        "pagingType": "full_numbers"
    });

    $('#scr-vrt-dt').DataTable({
        "scrollY": "200px",
        "scrollCollapse": true,
        "paging": false
    });

    $('#scr-vtr-dynamic').DataTable({
        scrollY: '50vh',
        scrollCollapse: true,
        paging: false
    });

    $('#lang-dt').DataTable({
        "language": {
            "decimal": ",",
            "thousands": "."
        }
    });

    var table = $('#dom-jqry').DataTable();

    $('#dom-jqry tbody').on('click', 'tr', function() {
        var data = table.row(this).data();
        alert('You clicked on ' + data[0] + '\'s row');
    });

    $('#colum-rendr').DataTable({
        "columnDefs": [{
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function(data, type, row) {
                    return data + ' (' + row[3] + ')';
                },
                "targets": 0
            },
            { "visible": false, "targets": [3] }
        ]
    });

    $('#multi-table').DataTable({
        "dom": '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>'
    });

    $('#complex-header').DataTable({
        "columnDefs": [{
            "visible": false,
            "targets": -1
        }]
    });

    $('#lang-file').DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/German.json"
        }
    });

    $.extend(true, $.fn.dataTable.defaults, {
        "searching": false,
        "ordering": false
    });

    $('#setting-default').DataTable();

    var table = $('#row-grouping').DataTable({
        "columnDefs": [
            { "visible": false, "targets": 2 }
        ],
        "order": [
            [2, 'asc']
        ],
        "displayLength": 25,
        "drawCallback": function(settings) {
            var api = this.api();
            var rows = api.rows({ page: 'current' }).nodes();
            var last = null;

            api.column(2, { page: 'current' }).data().each(function(group, i) {
                if (last !== group) {
                    $(rows).eq(i).before(
                        '<tr class="group"><td colspan="5">' + group + '</td></tr>'
                    );

                    last = group;
                }
            });
        }
    });

    // Order by the grouping
    $('#row-grouping tbody').on('click', 'tr.group', function() {
        var currentOrder = table.order()[0];
        if (currentOrder[0] === 2 && currentOrder[1] === 'asc') {
            table.order([2, 'desc']).draw();
        } else {
            table.order([2, 'asc']).draw();
        }
    });


    $('#footer-callback').DataTable({
        "footerCallback": function(row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function(i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                    i : 0;
            };

            // Total over all pages
            total = api
                .column(4)
                .data()
                .reduce(function(a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            // Total over this page
            pageTotal = api
                .column(4, { page: 'current' })
                .data()
                .reduce(function(a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            // Update footer
            $(api.column(4).footer()).html(
                '$' + pageTotal + ' ( $' + total + ' total)'
            );
        }
    });


    $('#custm-tool-ele').DataTable({
        "dom": '<"toolbar">frtip'
    });

    $("div.toolbar").html('<b>Custom tool bar! Text/images etc.</b>');

    $('#row-callback').DataTable({
        "createdRow": function(row, data, index) {
            if (data[5].replace(/[\$,]/g, '') * 1 > 150000) {
                $('td', row).eq(5).addClass('highlight');
            }
        }
    });



