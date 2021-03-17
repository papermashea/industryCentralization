$(document).ready(function(){
    $("#toggle a").click(function(e) {
        e.preventDefault();
        
        $("#sector-frame").attr("src", $(this).attr("href"));
    })

$("#sector-frame").attr("src", $("#toggle a:first").attr("href"));


});
