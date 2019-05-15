var following_side_html =
    `<li><a href="#" tabindex="-1">Legit 
    <span class="sidebar-badge">12</span>
</a></li>
<li><a href="#" tabindex="-1">
    654511
    <span class="sidebar-badge">0</span>
</a></li>`;



function create_sidebar_following() {
    document.getElementById('side_following_cases').innerHTML = following_side_html;
    if (document.getElementById('side_following_cases').innerHTML.length < 5) {
        setTimeout(function() {
            create_sidebar_following();
        }, 2000);
    }
}
create_sidebar_following();