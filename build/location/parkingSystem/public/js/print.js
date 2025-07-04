
        // function printPage() {
        //     window.onbeforeprint = function(){
        //     initBody = document.body.innerHTML;
        //     document.body.innerHTML = $(`#modalMainTextSection`).html();
        //     };
        //     window.onafterprint = function(){
        //     document.body.innerHTML = initBody;
        //     };
        //     window.print();
        // };
$(document).ready(()=>{
    $('#printButton').click(function() {
        // printPage();
        $('#outCompleteModal').css("background-color", "transparent");
        $('.buttonSection > a').css("display", "none");
        $('#printText').css("display", "block");

        window.print();
    });
})