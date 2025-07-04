$(document).click(function(e) {

    switch(e.target.id) {
    case "outButton" :
        $('#outCheckModal').css(`visibility`, `visible`);
        break;
    case "cancelButton" :
        $('#outCompleteModal').css(`visibility`, `hidden`);
        $('#outCardModal').css(`visibility`, `hidden`);
        $('#outCheckModal').css(`visibility`, `hidden`);
        break;
    case "paymentButton" :
            $('#outCardModal').css(`visibility`, `visible`);
        break;
    case "inPageModalButton" :
        $('#outCompleteModal').css(`visibility`, `visible`);
        break;
    }
});