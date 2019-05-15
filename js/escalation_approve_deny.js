function escalation_approve_deny(id, t, cId) {
    var id2;
    var prompt;
    if (t === 1) {
        id2 = id;
        $('#approve_deny_div').show();

        prompt = `
        <div id="prompt_approve">
            <input id="approve_deny_text_box" class="user_text_box" type="text-box" placeholder="Comments back to requestor...">
            <br><br>
            <button onclick="escalation_approval(${id2}, true);">Approve</button>
            <button onclick="escalation_approval(${id2}, false);">Deny</button>
            <button onclick="exit_approve_deny()";>Exit</button>
        </div>   
    `;
        document.getElementById('approve_deny_div').innerHTML = prompt;

    } else if (t === 2) {
        var escalate_queue_url = `https://{}/api/SEA_Escalations?access_token=${token}`

        $.get(escalate_queue_url, function(data) {
            for (i = 0; i < data.length; i++) {
                if (data[i].status === 'pending') {
                    if (data[i].case_id = cId) {
                        id2 = data[i].id;
                        prompt = `
        <div id="prompt_approve">
            <input id="approve_deny_text_box" class="user_text_box" type="text-box" placeholder="Comments back to requestor...">
            <br><br>
            <button onclick="escalation_approval(${id2}, true);">Approve</button>
            <button onclick="escalation_approval(${id2}, false);">Deny</button>
            <button onclick="exit_approve_deny()";>Exit</button>
        </div>   
    `;
                    }
                }

            }

            $('#approve_deny_div2').show();
            document.getElementById('approve_deny_div2').innerHTML = prompt;
        });

    }





}

function exit_approve_deny() {
    $('#approve_deny_div').hide();
    $('#approve_deny_div2').hide();
    document.getElementById('approve_deny_text_box').value = '';
}

function escalation_approval(id, t) {
    var stat;
    var comments = document.getElementById('approve_deny_text_box').value;
    if (t === true) {
        stat = 'Approved';
    } else {
        stat = 'Denied';
    }
    var d = new Date;
    d = d.customFormat("#YYYY#-#MM#-#DD# #hhhh#:#mm#:#ss#");

    var r_url = `https://{}/api/SEA_Escalations/${id}?access_token=${token}`
    $.get(r_url, function(data) {

        var c = {
            "case_id": data.case_id,
            "r_user": data.r_user,
            "a_user": username,
            "status": stat,
            "r_date": data.r_date,
            "a_date": d,
            "r_comment": data.r_comment,
            "a_comment": comments,
            "a_priority": null,
            "created_at": data.created_at,
            "updated_at": d,
            "deleted_at": data.deleted_at
        };
        $.ajax({
            url: r_url,
            type: 'PUT',
            data: c,
            success: function(response) {
                console.log(response)
                get_case_comments(c.case_id)
                escalation_overview();
                add_escalation_history(c);
                get_case_comments(c.case_id);
                escalated_side_fun();

            },
            error: function(request, msg, error) {
                // handle failure
                console.log(request)
                console.log(msg)
                console.log(error)
            }
        });

        document.getElementById('approve_deny_text_box').value = 'Success';
        setTimeout(function() {
            // document.getElementById('approve_deny_text_box').value = '';
            exit_approve_deny();

        }, 2000);
        get_case_comments(c.case_id);
    });
}

function add_escalation_history(c) {

    var event = {
        "case_id": c.case_id,
        "user_id": c.a_user,
        "user_name": username,
        "action": `${c.status} Escalation Request`,
        "date": c.a_date,
        "comment": c.a_comment,
        "created_at": c.created_at,
        "updated_at": c.updated_at,
        "deleted_at": null_date
    };

    var event_history_url = `https://{}/api/SEA_CaseEvents?access_token=${token}`;
    $.ajax({
        type: "POST",
        url: event_history_url,
        data: event,
        success: function(response) {
            console.log(response);
            get_case_comments(c.case_id)
        },
        error: function(request, msg, error) {
            // handle failure
            console.log(request)
            console.log(msg)
            console.log(error)
        }
    });
}