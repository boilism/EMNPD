// 返回顶部按钮
var mybutton = document.getElementById("back-to-top-btn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
// 分隔



// NPs页面滑动进度条及跳转并浏览区域名字高亮
function updateProgressBar() {
    var scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight || 0;
    var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
    var progressWidth = (scrollPosition / (scrollHeight - windowHeight)) * 100;

    document.getElementById("progress-bar").style.width = progressWidth + "%";

    var sectionNames = ['NPs name', 'NPs structure', 'Endophyte', 'Target', 'Bioactivity', 'Browse Endophyte', 'Browse NP', 'Browse Cell Line', 'Browse Protein', 'Browse Organism'
    , 'specific NP', 'specific endophyte', 'specific protein', 'specific cell line', 'specific organism'];
    var sectionIds = ['NPs-name', 'NPs-structure', 'Endophyte', 'Target', 'Bioactivity', 'Browse-Endophyte', 'Browse-NP', 'Browse-Cell-Line', 'Browse-Protein', 'Browse-Organism'
    , 'specific-NP', 'specific-endophyte', 'specific-protein', 'specific-cell-line', 'specific-organism'];

    var currentSection = null;
    for (var i = 0; i < sectionIds.length; i++) {
        var section = document.getElementById(sectionIds[i]);
        if (scrollPosition >= section.offsetTop - windowHeight / 2) {
            currentSection = sectionIds[i];
        }
        var sectionName = document.getElementById('section-name-' + sectionIds[i]);
        if (sectionName) {
            var rect = section.getBoundingClientRect();
            if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
                sectionName.classList.add('blue');
            } else {
                sectionName.classList.remove('blue');
            }
        }
    }
}

window.addEventListener("scroll", updateProgressBar);

updateProgressBar();
// 分隔


