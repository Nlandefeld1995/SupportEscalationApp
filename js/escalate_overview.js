function escalation_overview() {
    if (token === undefined) {

        setTimeout(function() {
            escalation_overview();

        }, 3000);
    } else if (token.length < 5) {
        setTimeout(function() {
            escalation_overview();

        }, 3000);
    } else {

        var headers_escalate = `<div id="approve_deny_div" style="display:none"></div>
        <table style="background: linear-gradient( #e2edf5, #ffffffab);border-bottom: .5px solid black;width: 100%;"> 
        <thead>`
        if (ManagerIds.includes(userid)) {
            headers_escalate += `<th style = "width: 15%"> Take Action </th>`;
        }
        headers_escalate += `<th style="width: 15%">Case Number</th>
            <th style="width: 25%">Requestor Name</th>                
            <th style="width: 25%">Status</th>
            <th style="width: 25%">Request Age</th>
            <th style="width: 15%">Request Comments</th>
        </thead>
        </table>`;


        var escalate_queue_url = `https://{}/api/SEA_Escalations?access_token=${token}`

        $.get(escalate_queue_url, function(data) {
            headers_escalate += `<table style="background: linear-gradient(#ffffffab, #e2edf5);width: 100%;" id="escalation_overview_table"><tbody id="escalation_overview_tbody">`

            //[one, two, three] = data
            //$.forEach()
            for (j = 0; j < data.length; j++) {

                headers_escalate += `<tr>`
                if (ManagerIds.includes(userid)) {
                    if (data[j].status === 'pending') {
                        headers_escalate += `<td style="width: 15%"><button onclick="escalation_approve_deny(${data[j].id},1);">Approve/Deny</button></td>`
                    } else {
                        headers_escalate += `<td style="width: 15%"> </td>`
                    }
                }
                headers_escalate += `<td style="width: 15%"><button onclick="casedetails(${data[j].case_id})">${data[j].case_id}</button></td>`
                headers_escalate += `<td style="width: 25%">${data[j].r_user}</td>`
                headers_escalate += `<td style="width: 25%">${data[j].status}</td>`
                headers_escalate += `<td style="width: 25%">Age will go here</td>`
                headers_escalate += `<td style="width: 15%"><button onclick="show_escalation_comment_detail('${j}');">+</button></td>`
                headers_escalate += `</tr>`;
                headers_escalate += `<tr id="escalation_comment_detail_id${j}" style="display:none;"><td colspan="5" class="comment_details"  >Request Comments: \n${data[j].r_comment}</td></tr><tr id="escalation_comment_detail_id2${j}" style="display:none;"><td colspan="5" class="comment_details"  >Manager Comments:  \n${data[j].a_comment}</td></tr>`;

            }

            headers_escalate += `</tbody></table>`;
            document.getElementById('escalation_div').innerHTML = headers_escalate;
        });
    }

    setTimeout(function() {
        escalation_overview();
    }, 60000);
}