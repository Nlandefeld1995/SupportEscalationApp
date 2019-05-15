function send_event(e) {
    var d = new Date;
    d = d.customFormat("#YYYY#-#MM#-#DD# #hhhh#:#mm#:#ss#");
    var c = {
        "case_id": e.case_id,
        "user_id": userid,
        "user_name": username,
        "action": "Escalation Request",
        "date": d,
        "comment": e.r_comment,
        "created_at": d,
        "updated_at": d,
        "deleted_at": null_date
    };
    var event_url = `https://{}/api/SEA_CaseEvents?access_token=${token}`;
    $.ajax({
        type: "POST",
        url: event_url,
        data: c,
        success: function(response) {
            console.log(response);

        },
        error: function(request, msg, error) {
            // handle failure
            console.log(request)
            console.log(msg)
            console.log(error)
        }
    });

}



/*
{
  "case_id": "string",
  "user_id": 0,
  "user_name": "string",
  "action": "string",
  "date": "2018-03-02T00:51:39.003Z",
  "comment": "string",
  "created_at": "2018-03-02T00:51:39.003Z",
  "updated_at": "2018-03-02T00:51:39.003Z",
  "deleted_at": "2018-03-02T00:51:39.003Z"
}
*/