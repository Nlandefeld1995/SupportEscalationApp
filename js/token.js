var token;

function create_token() {
    var u = '';
    var p = '#';
    var url = 'https://{}/api/Users/login';
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "headers": {
            "accept": "application/json",
            "Content-Type": "application/json",
        },
        "data": `{"username": "${u}","password": "${p}"}`
    };

    $.ajax(settings).done(function(data) {
        token = data.id;
    });
}