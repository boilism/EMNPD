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


// 表格内容隐藏和显示
$(document).on("click", ".text-ellipsis", function() {
  $(this).toggleClass("opened");
});
// 分隔



// 物种隐藏显示表格加减号和横杠
 $(document).ready(function() {
    // 点击按钮时触发折叠效果
    $(".toggle-btn_Species_Classification").click(function() {
      // 切换加减号图标
      $(this).find("i").toggleClass("glyphicon-plus glyphicon-minus");

      // 切换表格的显示和隐藏
      $("#Species_Classification").slideToggle("fast");
      $("#h4_Species_Classification").slideToggle("fast");
    });
  });
//


// 树形结构-物种
$(document).ready(function() {
    // 显示所有节点的子节点
    $(".tree ul").show();

    // 当点击节点内容或箭头图标时，展开或收起子节点
    $(document).on("click", ".tree .node-content", function() {
        var $ul = $(this).siblings("ul");
        if ($ul.length) {
            $ul.toggle();
            $(this).find(".glyphicon").toggleClass("glyphicon-triangle-bottom glyphicon-triangle-right");
        }
    });
});
// 分隔


