var escalated_side_html;

function escalated_side_fun() {
    if (token === undefined) {

        setTimeout(function() {
            escalated_side_fun();

        }, 3000);
    } else if (token.length < 5) {
        setTimeout(function() {
            escalated_side_fun();

        }, 3000);
    } else {
        escalated_side_html = '';

        var escalate_queue_url = `https://{}/api/SEA_Escalations?access_token=${token}`
        $.get(escalate_queue_url, function(data) {
            for (i = 0; i < data.length; i++) {
                if (data[i].status === 'pending') {
                    escalated_side_html += `<li><a onclick="casedetails(${data[i].case_id})" href="#" tabindex="-1">${data[i].case_id}</a></li>`;
                }
            }
        });
        create_sidebar_escalated();
    }
}



function create_sidebar_escalated() {
    document.getElementById('side_escalated_cases').innerHTML = escalated_side_html;
    if (document.getElementById('side_escalated_cases').innerHTML.length < 5) {
        setTimeout(function() {
            create_sidebar_escalated();
        }, 2000);
    }
}