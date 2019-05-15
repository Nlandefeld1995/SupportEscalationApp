var caseheaderlist;
var casecolumndefault = ['Account', 'Cust. Name', 'Status', 'Subject', 'Last Contact'];
var casecolumnalias = [];

function casetablecontrol() {
    var userpref = '1'; // Need to write call to find if user has a pref
    // Need to add check for if the user has a column prference. If they do then need to replace column list with this.
    if (userpref.length > 5) {
        caseheaderlist = userpref;
        console.log(`Made if statment (should not make this until get sql data configured)`);
        casealias();
    } else {
        caseheaderlist = casecolumndefault;
        casealias();
    }
}

function casetable() {
    var html = '';

    html += `<div><table id="case_table_header" style="background: linear-gradient( #e2edf5, #ffffffab);border-bottom: .5px solid black;width: 100%;"><thead><tr><th style="width: 5%;">Case</th>`;
    for (i = 0; i < caseheaderlist.length; i++) {
        html += `<th style="width: 17%;">${caseheaderlist[i]}</th>`;
    }
    html += `</tr></thead></table></div>`;
    // end header info now need to add data
    // add row data
    html += `<div class="table_div_body"><table style="background: linear-gradient(#ffffffab, #e2edf5);width: 100%;" id="case_table"><tbody id="caseBody">`;
    domo.get('/data/v1/cases').then(function(data) {
        for (j = 0; j < 100; j++) { //data.length; j++){
            html += `<tr>`;
            var data2 = data[j];
            html += `<td style="width: 5%;"><input type="button" onclick="casedetails(${data2.case_num})" value=${data2.case_num}></input></td>`
            for (i = 0; i < casecolumnalias.length; i++) { //casecolumnalias.length;
                var casecolumnalias2 = casecolumnalias[i];
                html += `<td style="width: 17%;">${data2[casecolumnalias2]}</td>`;
            }
            html += `</tr>`;
        }
        html += `</tbody></table></div>`;
        ct = true;
        document.getElementById("table_div_case").innerHTML = html;
        tablereadycheck();
    });
};

function casealias() {

    var counter = 0;
    for (i = 0; i < caseheaderlist.length; i++) {
        if (caseheaderlist[i] == 'Case Number') {
            var e = 'case_num';
            casecolumnalias.push(e);
            counter++;
        } else if (caseheaderlist[i] == 'Account') {
            var e = 'company_name';
            casecolumnalias.push(e);
            counter++;
        } else if (caseheaderlist[i] == 'Cust. Name') {
            var e = 'customer_name';
            casecolumnalias.push(e);
            counter++;
        } else if (caseheaderlist[i] == 'Status') {
            var e = 'case_status';
            casecolumnalias.push(e);
            counter++;
        } else if (caseheaderlist[i] == 'Subject') {
            var e = 'subject_short';
            casecolumnalias.push(e);
            counter++;
        } else if (caseheaderlist[i] == 'Last Contact') {
            var e = 'DLastContact';
            casecolumnalias.push(e);
            counter++;
        }
    }
    if (counter == caseheaderlist.length) {
        casetable();
    }
}