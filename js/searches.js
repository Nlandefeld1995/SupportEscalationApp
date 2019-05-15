function debounce(fn, duration) {
    var timer;
    return function(){
      clearTimeout(timer);
      timer = setTimeout(fn, duration);
    }
  }
$(function(){
    $('#searchcases').on('keyup', debounce(function(){
        search_cases('searchcases','case_table');
        search_cases('searchcases','jira_table');
    }, 750));
});
function searchMycustomers(){
    // If I am the accounts CSM
    // If I am the accounts AE
    // If I am the case owner
    // If I am the contact on a case (this should catch if the rep does not change contact name)
    // Accounts should be primary and secondary. (incase primary is domo domo)
    var input, filter, table, tr, td, i;
    filter = username.toUpperCase();
    table = document.getElementById("case_table");
    tr = table.getElementsByTagName("tr");
    console.log(filter);
    // Loop through all table rows, and hide those who don't match the search query
    for(i = 0; i < tr.length; i++){
        var counter = 0;
        for(j = 0; j <= tr[i].getElementsByTagName("td").length; j++){
        
            td = tr[i].getElementsByTagName("td")[j];
                if(td){
                    if(td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                        counter = counter + 1;
                        if(j == (tr[i].getElementsByTagName("td").length -1)){
                            console.log(`1`);
                            if(counter > 0){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }
                        }
                    }
                    else{
                        if(j == (tr[i].getElementsByTagName("td").length -1)){
                            if(counter > 0){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }
                        }
                    } 
                }
        } 
    }


}
function search_cases(s,t){
    var input, filter, table, tr, td, i, j;
    input = document.getElementById(s);
    filter = input.value.toUpperCase();
    table = document.getElementById(t);
    tr = table.getElementsByTagName("tr");
    // Loop through all table rows, and hide those who don't match the search query
    for(i = 0; i < tr.length; i++){
        var counter = 0;
        for(j = 0; j <= tr[i].getElementsByTagName("td").length; j++){
        
            td = tr[i].getElementsByTagName("td")[j];
                if(td){
                    if(td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                        counter = counter + 1;
                        if(j == (tr[i].getElementsByTagName("td").length -1)){
                            console.log(`1`);
                            if(counter > 0){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }
                        }
                    }
                    else{
                        if(j == (tr[i].getElementsByTagName("td").length -1)){
                            if(counter > 0){
                                tr[i].style.display = "";
                            }
                            else{
                                tr[i].style.display = "none";
                            }
                        }
                    } 
                }
        } 
    }
}