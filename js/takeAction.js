function takeaction(id, p) {

    console.log(`take action ${id}`);
    var prompt1 = `
        <div id="prompt1">
            <button style="margin-top: 13%;" onclick="takeaction(${id},3);">Post Question To Support</button>
            <button onclick="takeaction(${id},2);">Escalate Case</button>
            <button onclick="exit_takeAction()";>Exit</button>
        </div>   
    `;
    var prompt2 = `
        <div id="prompt2">
            <input id="escalation_text" class="user_text_box" type="text-box" placeholder="Please describe why this should be escalated. (100 characters)">
            <br><br>
            <button onclick="escalate_request(${id});">Submit</button>
            <button onclick="exit_takeAction()";>Exit</button>
        </div>   
    `;

    var prompt3 = `
        <div id="prompt2">
            <input class="user_text_box" type="text-box" placeholder="Comming Soon... ">
            <br><br>
            <button onclick="exit_takeAction()";>Exit</button>
        </div>
    `;



    if (p == 1) {
        document.getElementById('takeAction_div').innerHTML = prompt1;
        $('#takeAction_div').show();
    }
    if (p == 2) {
        document.getElementById('takeAction_div').innerHTML = prompt2;
        $('#takeAction_div').show();
    }
    if (p == 3) {
        document.getElementById('takeAction_div').innerHTML = prompt3;
        $('#takeAction_div').show();
    }

}

function exit_takeAction() {
    $('#takeAction_div').hide();
    document.getElementById('escalation_text').value = '';
    document.getElementById('user_text_box').value = '';
}