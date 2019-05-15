var readyfordata = false;
var ct = false;
var userid = domo.env.userId;
var username = domo.env.userName;
var null_date = '3000-01-01 00:00:00';

var ManagerIds = [
    '1157796626' /*Nolan L.*/
];

var loader_config = `<div class="flip-preloader example-1"><div></div><div></div><div></div><div></div><div></div></div><div class="flip-preloader example-2"><div></div><div></div><div></div><div></div><div></div></div><div class="flip-preloader example-3"><div></div><div></div><div></div><div></div><div></div></div>`;
document.getElementById('loader').innerHTML = loader_config;
while (username.indexOf("+") !== -1) {
    username = username.replace("+", " ");
}
var searchboxflag = false;
var tablecontrolflag = false;
document.getElementById('sideusername').innerHTML = username + '<b class="caret">';

function manager_list() {
    domo.get(`data/v1/managerList`).then(function(data) {
        for (i = 0; i < data.length; i++) {
            ManagerIds.push(data[i].id);
        }
    });
}