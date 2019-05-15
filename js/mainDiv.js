var main_html = `
                <h1 style="padding-top: -5%;background: linear-gradient(#9ccaeb, #9ccaeb80); text-shadow: 2px 2px #689ace;margin-top: 0%; font-family: sans-serif;font-size: 2em; height: 1.25em;">Support Metrics</h1>
                <iframe src="https://domo.domo.com/embed/view/1878?enable=title,filter" width="400" height="400" marginheight="0" marginwidth="0" frameborder="0" scrolling="no"></iframe>
                <iframe src="https://domo.domo.com/embed/view/448875437?enable=title,summary,filter" width="400" height="400" marginheight="0" marginwidth="0" frameborder="0" scrolling="no"></iframe>
                <iframe src="https://domo.domo.com/embed/view/1879?enable=title,filter" width="400" height="400" marginheight="0" marginwidth="0" frameborder="0" scrolling="no"></iframe>
                <iframe src="https://domo.domo.com/embed/view/305284581?enable=title,summary,drill,filter" width="400" height="400" marginheight="0" marginwidth="0" frameborder="0" scrolling="no"></iframe>
                `;
document.getElementById('main_div').innerHTML = main_html;