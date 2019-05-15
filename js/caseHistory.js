function get_case_comments(id2) {
    var html = ''
    domo.get(`/data/v1/history?filter=Case=${id2}`).then(function(data) {
        html += `<table>
                <tbody>`;
        for (i = 0; i < data.length; i++) {
            html += `<tr>`;
            html += `<td style="width: 25%">${data[i].date}</td>`;
            html += `<td style="width: 25%">${data[i].user}</td>`;
            html += `<td style="width: 25%">${data[i].action}</td>`;
            html += `<td style="width: 15%"><button onclick="show_comment_detail('id${i}');">+</button></td>`;
            html += `</tr>`;
            html += `<tr>
                    <td colspan="5" class="comment_details" id="comment_details_id${i}" style="display:none;">${data[i].comment}
                    </td></tr>`;

        }
        var event_history_url = `https://{}/api/SEA_CaseEvents?access_token=${token}`;
        var escalate_queue_url = `https://{}/api/SEA_Escalations?access_token=${token}`
        var f_array;
        $.get(escalate_queue_url, function(f) { f_array = f; });
        $.get(event_history_url, function(e) {
            var m_id = -1;
            var hit;
            for (j = 0; j < e.length; j++) {
                if (e[j].case_id == id2) {
                    html += `<tr>`;
                    for (k = 0; k < f_array.length; k++) {
                        var a = e[j].case_id.trim();
                        var b = f_array[k].case_id.trim();
                        if (a == b) {
                            hit = true;
                            if (f_array[k].status == 'pending') {
                                m_id = 3;
                            }

                        } else if (a === b) {
                            hit = true;
                            if (f_array[k].status == 'pending') {
                                m_id = 3;
                            }
                        }
                    }
                    if (m_id > -1) {
                        html += `<td style="width: 10%"><button onclick="escalation_approve_deny(${m_id},2,${e[j].case_id})">TakeAction</button></td>`
                    } else {
                        if (hit === true) {
                            console.log(e[j]);
                            console.log(`232 ${e[j].date}`)
                            if (e[j].date) {
                                var d = e[j].date.substring(0, e[j].date.length - 5);
                                console.log(`2322 ${d}`)
                                html += `<td style="width: 25%">${d}</td>`;
                            } else {
                                // delete record
                                var escalate_delete_url = `https://{}/api/SEA_CaseEvents/${e[j].id}?access_token=${token}`
                                console.log(escalate_delete_url);

                                $.ajax({
                                    url: 'escalate_delete_url',
                                    type: 'DELETE',
                                    success: function(result) {
                                        // Do something with the result
                                        console.log('invalic entry, deleted')
                                    },
                                    error: function(request, msg, error) {
                                        // handle failure
                                        console.log(request)
                                        console.log(msg)
                                        console.log(error)
                                    }
                                });
                            }

                        } else {
                            html += `<td style="width: 25%">${e[j].date}</td>`;
                        }

                    }
                    html += `<td style="width: 25%">${e[j].user_name}</td>`;
                    html += `<td style="width: 25%">${e[j].action}</td>`;
                    html += `<td style="width: 15%"><button onclick="show_comment_detail('id1${j}');">+</button></td>`;
                    html += `</tr>`;
                    html += `<tr>
                            <td colspan="5" class="comment_details" id="comment_details_id1${j}" style="display:none;">${e[j].comment}
                            </td></tr>`;

                }

            }
            html += `</tbody>
            </table>`;
            document.getElementById('case_history_body_table').innerHTML = '';
            document.getElementById('case_history_body_table').innerHTML = html;
        });
    });

}