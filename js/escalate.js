function escalate_request(id) {

    var e = document.getElementById('escalation_text').value;
    if (e.length > 50) {
        var d = new Date;
        d = d.customFormat("#YYYY#-#MM#-#DD# #hhhh#:#mm#:#ss#");
        var event = {
            "case_id": id,
            "r_user": username,
            "a_user": null,
            "status": "pending",
            "r_date": d,
            "a_date": null_date,
            "r_comment": e,
            "a_comment": null,
            "a_priority": null,
            "created_at": d,
            "updated_at": d,
            "deleted_at": null_date
        };
        var escalation_url = `https://{}/api/SEA_Escalations?access_token=${token}`

        $.ajax({
            type: "POST",
            url: escalation_url,
            data: event,
            success: function(response) {
                console.log(response);

                send_event(event);
                get_case_comments(event.id)
                success_escalation();
                get_case_comments(event.id)
                escalated_side_fun()
                get_case_comments(event.id)
            },
            error: function(request, msg, error) {
                // handle failure
                console.log(request)
                console.log(msg)
                console.log(error)
            }
        });



    } else {
        var input = e;
        document.getElementById('escalation_text').value = 'Not enough characters!';
        setTimeout(function() {
            document.getElementById('escalation_text').value = input;
        }, 4000);
    }

}

function success_escalation() {
    document.getElementById('escalation_text').value = 'Success';
    setTimeout(function() {
        $('#takeAction_div').hide();
        document.getElementById('escalation_text').value = '';
    }, 3000);
}