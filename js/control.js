var comment_detail_toggle = false;
var escalation_comment_detail_toggle = false;
domo.onDataUpdate(function() {
    console.log('the data updated');
})
$(function() {
    controler();
});


function controler() {
    manager_list();
    loader(true);
    create_token();
    casetablecontrol();
    tablereadycheck();
    escalation_overview();
    escalated_side_fun();
}

function loader(e) {
    if (e === true) {
        $('#searchbox').hide();
        $("#loader").show();
        $("#table_div_jira").hide();
        $('#escalation_div').hide();
        $("#table_div_case").hide();
        $('#helppage').hide();
        $('#enhancements').hide();
        $('#appbugs').hide();
        $('#case_details').hide();
        $('#main_div').hide();
        $('#following_div').hide();
        $('#requests_div').hide();
    } else {
        $("#loader").hide();
    }
}
$(document).ready(function() {
    $('.dropdown-toggle').dropdown();
    $("#sidecase").click(function() {
        loader(true);
        if (readyfordata === true) {
            $("#table_div_case").show();
            $('#searchbox').show();
        } else {
            console.log(`not ready for data`);
        }
        loader(false);
    });
    $("#sidetablecontrol").click(function() {
        if (tablecontrolflag === true) {
            $("#tableheadbox").hide();
            tablecontrolflag = false;
        } else {
            $("#tableheadbox").show();
            tablecontrolflag = true;
        }

    });
    $("#sidemain").click(function() {
        loader(true);
        loader(false);
        $('#main_div').show();
    });
    $("#side_following_overview").click(function() {
        loader(true);
        loader(false);
        $('#following_div').show();
    });
    $("#side_myrequests_overview").click(function() {
        loader(true);
        loader(false);
        $('#requests_div').show();
    });

    $("#side_escalate_overview").click(function() {
        loader(true);
        loader(false);
        $('#escalation_div').show();
    });

});

function show_comment_detail(id) {
    if (comment_detail_toggle === false) {
        comment_detail_toggle = true;
        $(`#comment_details_${id}`).show();
    } else {
        comment_detail_toggle = false;
        $(`#comment_details_${id}`).hide();
    }

}

function show_escalation_comment_detail(id) {
    if (escalation_comment_detail_toggle === false) {
        escalation_comment_detail_toggle = true;
        $(`#escalation_comment_detail_id${id}`).show();
        $(`#escalation_comment_detail_id2${id}`).show();
    } else {
        escalation_comment_detail_toggle = false;
        $(`#escalation_comment_detail_id${id}`).hide();
        $(`#escalation_comment_detail_id2${id}`).hide();
    }

}

function tablereadycheck() {
    if (ct === true) {
        readyfordata = true;
        loader(false);
        $('#main_div').show();

    } else {
        setTimeout(function() {
            tablereadycheck();
        }, 2000);
    }
}