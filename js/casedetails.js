function casedetails(id) {
    var html = ''
    loader(true);
    get_case_comments(id);
    domo.get(`/data/v1/cases?filter=CaseNumber=${id}`).then(function(data) {
        html = `
        <div class="banner"></div>
        <h2 style="padding-top: -5%;background: linear-gradient(#9ccaeb, #9ccaeb80);margin-bottom: 3%;text-shadow: 2px 2px #689ace;margin-top: 0%;/* text-decoration: underline; */font-family: sans-serif;font-size: 2em;" >${id}</h2> 
        <div style="background: linear-gradient(#9ccaeb80, #9ccaeb05);margin-top: -3%;height: 2.5em;"><button style="margin-top: 1%" id='takeAction' onclick="takeaction(${id}, 1);">Take Action</button></div>
        <div id="takeAction_div" style="display:none"></div>
            <div class="star-rating-container">
                <div class="star-rating">
                    <button id="star_${id}" class="one-star" onclick="following_exists(${id}, follow_case);">Follow ★</button>
                </div>        
            </div>
            <div class="infoTable">
                <h3 class="info_title">Created Date: </h3>
                <p>${data[0].case_created_date}</p>
            </div>
            <div class="infoTable">
                <h3 class="info_title">Last Updated Date: </h3>
                <p>${data[0].DLastContact}</p>
            </div>
            <div class="infoTable">
                <h3 class="info_title">Next Updated Date: </h3>
                <p>${data[0].Days_Contact}</p>
            </div>
            <div class="infoTable">
                <h3 class="info_title">Customer Name: </h3>
                <p>${data[0].customer_name}</p>
            </div>
            <div class="infoTable">
                <h3 class="info_title">Account: </h3>
                <p>${data[0].company_name}</p>
            </div>
            <div class="infoTable">
                <h3 class="info_title">CSM:</h3>
                <p>${data[0].Account_csm}</p>
            </div>
            <div class="infoTable">
                <h3 class="info_title">Status: </h3>
                <p>${data[0].case_status}</p>
            </div>
            <div class="infoTable">
                <h3 class="info_title">Attached Jira(s):</h3>
                <p>${data[0].case_jira}</p>
            </div>
            <div class="infoTable">
                <h3 class="info_title">Subject:</h3>
                <p> ${data[0].subject_short}</p>
            </div>
            <div style="background: linear-gradient(#adddff08, #9ccaeb80);" id='description'></div>
        `;

        document.getElementById('caseSubject').innerHTML = html;
        get_description(id);

    });

}

function get_description(id) {
    var html = '';
    domo.get(`/data/v1/description?filter=CaseNumber=${id}`).then(function(data) {
        html = `<h3 class="info_title">Description</h3
                <p>${data[0].description}</p>`;

        document.getElementById('description').innerHTML = html;
        follow_exists_check(id);
        $('#case_details').show();
        loader(false);
    });
}

function follow_exists_check(id) {
    following_exists(id, change_color)
}

function change_color(exists) {
    if (exists === true) {
        document.getElementById(`star_${id}`).style.color = "#ff9d00";
    }
}