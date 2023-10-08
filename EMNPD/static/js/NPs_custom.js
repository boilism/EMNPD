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

    var sectionNames = ['NPs Basic Information', 'NPs Physi-Chem Properties', 'NPs ADMET Properties', 'NPs Species Source', 'NPs Biological Activity', 'NPs Content', 'NPs Similarity'];
    var sectionIds = ['basic-info', 'physi-chem', 'admet', 'source', 'activity', 'content', 'similarity'];

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




// 表格内容隐藏和显示
$(document).on("click", ".text-ellipsis", function() {
  $(this).toggleClass("opened");
});
// 分隔


// 化合物隐藏显示表格加减号和横杠
 $(document).ready(function() {
    // 点击按钮时触发折叠效果
    $(".toggle-btn_NPs_Classification").click(function() {
      // 切换加减号图标
      $(this).find("i").toggleClass("glyphicon-plus glyphicon-minus");

      // 切换表格的显示和隐藏
      $("#NPs_Classification").slideToggle("fast");
      $("#h4_NPs_Classification").slideToggle("fast");
    });
  });

 $(document).ready(function() {
    // 点击按钮时触发折叠效果
    $(".toggle-btn_Physi_Chem").click(function() {
      // 切换加减号图标
      $(this).find("i").toggleClass("glyphicon-plus glyphicon-minus");

      // 切换表格的显示和隐藏
      $("#Physi_Chem").slideToggle("fast");
      $("#h4_Physi_Chem").slideToggle("fast");
    });
  });

 $(document).ready(function() {
    // 点击按钮时触发折叠效果
    $(".toggle-btn_Absorption").click(function() {
      // 切换加减号图标
      $(this).find("i").toggleClass("glyphicon-plus glyphicon-minus");

      // 切换表格的显示和隐藏
      $("#ADMET_Absorption").slideToggle("fast");
      $("#h4_ADMET_Absorption").slideToggle("fast");
    });
  });

 $(document).ready(function() {
    // 点击按钮时触发折叠效果
    $(".toggle-btn_Distribution").click(function() {
      // 切换加减号图标
      $(this).find("i").toggleClass("glyphicon-plus glyphicon-minus");

      // 切换表格的显示和隐藏
      $("#ADMET_Distribution").slideToggle("fast");
      $("#h4_ADMET_Distribution").slideToggle("fast");
    });
  });

 $(document).ready(function() {
    // 点击按钮时触发折叠效果
    $(".toggle-btn_Metabolism").click(function() {
      // 切换加减号图标
      $(this).find("i").toggleClass("glyphicon-plus glyphicon-minus");

      // 切换表格的显示和隐藏
      $("#ADMET_Metabolism").slideToggle("fast");
      $("#h4_ADMET_Metabolism").slideToggle("fast");
    });
  });

 $(document).ready(function() {
    // 点击按钮时触发折叠效果
    $(".toggle-btn_Excretion").click(function() {
      // 切换加减号图标
      $(this).find("i").toggleClass("glyphicon-plus glyphicon-minus");

      // 切换表格的显示和隐藏
      $("#ADMET_Excretion").slideToggle("fast");
      $("#h4_ADMET_Excretion").slideToggle("fast");
    });
  });

 $(document).ready(function() {
    // 点击按钮时触发折叠效果
    $(".toggle-btn_Toxicity").click(function() {
      // 切换加减号图标
      $(this).find("i").toggleClass("glyphicon-plus glyphicon-minus");

      // 切换表格的显示和隐藏
      $("#ADMET_Toxicity").slideToggle("fast");
      $("#h4_ADMET_Toxicity").slideToggle("fast");
    });
  });
 // 分隔



// 树形结构-化合物
$(document).ready(function() {
  // 显示所有节点的子节点
  $(".tree ul").show();

  // 当点击节点内容或箭头图标时，展开或收起子节点
  $(".tree .node-content").on("click", function() {
    var $ul = $(this).parent().children("ul");
    if ($ul.length) {
      $ul.toggle();
      $(this).find(".glyphicon").toggleClass("glyphicon-triangle-bottom glyphicon-triangle-right");
    }
  });
});
// 分隔
