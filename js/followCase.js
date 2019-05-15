function follow_case(id, exists) {
    // call to see if id already exists. 
    console.log(`test ` + exists)
    if (exists === false) {
        console.log('create object')
    }
    if (exists === true) {
        console.log('update object');
    }


    // Id will be user_case
    // if id exists read value
    // true = gold false = grey
    document.getElementById(`star_${id}`).style.color = "#ff9d00";

    // when clicked send opposite request. 
    // change color. 



}

function following_exists(id, callback) {
    console.log(`${id}${userid}`)
        /*var url = `https://{}/api/EST/${id}${userid}/following?access_token=${token}`;
    var result;
    $.ajax({
        type: "GET",
        url: url,
        error: function() {
            result = false;
            callback(id, result);
        },
        success: function() {
            result = true;
            callback(id, result);
        }
    });
*/
    callback(id, true)
}