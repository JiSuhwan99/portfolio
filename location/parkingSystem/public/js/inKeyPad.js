class PlusZero{
    constructor(theId, theHours, theMinutes, theSeconds) {
        this.theId = theId;
        this.theHours = theHours;
        this.theMinutes = theMinutes;
        this.theSeconds = theSeconds;
    }
    timePlusZero() {
    if(this.theHours < 10) {
        let smallTimeArray = [];
        smallTimeArray[0] = 0;
        smallTimeArray[1] = this.theHours;
        this.theHours = smallTimeArray[0]+smallTimeArray[1];
    }
    if(this.theMinutes < 10) {
        let smallTimeArray = [];
        smallTimeArray[0] = 0;
        smallTimeArray[1] = this.theMinutes;
        this.theMinutes = smallTimeArray[0]+smallTimeArray[1];
    }
    if(this.theSeconds < 10) {
        let smallTimeArray = [];
        smallTimeArray[0] = 0;
        smallTimeArray[1] = this.theSeconds;
        this.theSeconds = smallTimeArray[0]+smallTimeArray[1];
    }
    $(this.theId).html(
        this.theHours + ":" + this.theMinutes +":" + this.theSeconds
    );
    }
}

$(document).ready(function() {
    let inHours = localStorage.getItem('clickHours');
    let inMinutes = localStorage.getItem('clickMinutes');
    let inSeconds = localStorage.getItem('clickSeconds');

    let clickTimesPlusZero = new PlusZero("#clickTime",inHours,inMinutes,inSeconds);
    clickTimesPlusZero.timePlusZero();
   
    setInterval(()=>{
        let nowtime = new Date();
        let nowHours = nowtime.getHours() + "";
        let nowMinutes = nowtime.getMinutes() + "";
        let nowSeconds = nowtime.getSeconds() + "";

        let nowTimePlusZero = new PlusZero("#nowTime",nowHours,nowMinutes,nowSeconds);
        nowTimePlusZero.timePlusZero();
    },1000);

    //李⑤웾踰덊샇, 二쇱감援ъ뿭, �낆감�쒓컙 �쒖쑝濡� �대뒗 諛곗뿴
    let saveData = ['','',''];
    
    
    //二쇱감�� �꾩씠肄� �대┃ �대깽��
    let parkingStatus = $('#parkingStatus > article > article > div');
    $(parkingStatus).each(function(index) {
        $(this).click(function() {
            if ($(this).css("background-color") != `rgb(100, 100, 100)`) {
                console.log($(this).css("background-color"))
                $(this).addClass('selectBox');
                parkingStatus.not($(this)).removeClass('selectBox');
                saveData[1] = $('.selectBox').html();
            } else {
                $(`#errorArticle`).html(`�ъ슜 以묒씤 二쇱감 援ъ뿭�낅땲��.`);
                $(`#errorArticle`).css(`visibility`,`visible`);
                setTimeout(()=>{
                    $(`#errorArticle`).css(`visibility`,`hidden`);
                },500)
            }
        })
    })

    //�대┃�� 踰꾪듉�� 媛믪쓣 �대뒗 諛곗뿴
    let carNumberArray = [];
    let inputText = '';
    $(`#bottomSection button`).click((e)=>{
        let targetValue = e.target.innerHTML;
        let beforeStyle = $(e.target).css(`background`);
        if(e.target.tagName = "BUTTON" && e.target.id == "enterButton") {
            $(e.target).css(`background`,`rgb(67,83,182)`)
            setTimeout(()=>{
                $(e.target).css(`background`,`rgb(110,124,212)`)
            },200)
        } else if (e.target.id == "backspaceIcon") {
            $('#deleteButton').css(`background`,`rgb(210,210,210)`)
            setTimeout(()=>{
                $('#deleteButton').css(`background-color`,`rgb(250,250,250)`)
            },100)

        } else {
            $(e.target).css(`background`,`rgb(210,210,210)`)
            setTimeout(()=>{
                $(e.target).css(`background`,`rgb(250,250,250)`)
            },200)
        }
        //珥덇린�붾쾭�쇱쓣 �뚮��� ��
        if(e.target.id == "resetButton") {
            saveData[0] = '';
            carNumberArray = [];
            $(`#bottomSection button`).attr('disabled',false);
            $('input[name=inText]').css('color', 'rgb(49,49,49)');
            $('input[name=inText]').attr('value','');

        //諛깆뒪�섏씠�� 踰꾪듉�� �뚮��� ��
        } else if(e.target.id == "deleteButton" || e.target.id == "backspaceIcon") {
            saveData[0] = '';
            $(`#bottomSection button`).attr('disabled',false);
            $('input[name=inText]').css('color', 'rgb(49,49,49)');
            carNumberArray.pop();
            inputText = Hangul.assemble(carNumberArray);
            $('input[name=inText]').attr('value', inputText);

        //議고쉶踰꾪듉�� �뚮��� ��
        } else if (e.target.id == "enterButton") {
            let jsonArray = [];
            let testArray = [];

            // json �쎌뼱��
            $.getJSON("./js/json/outData.json", (jsonData) => {
                $.each(jsonData, function(value,object){
                    jsonArray.push(object)
                });
                for(i=0;i<jsonArray.length; i++) {

                    if(jsonArray[i].car_num == inputText) {
                        testArray.push(jsonArray[i].car_num);
                    }
                }

                console.log(testArray);
        
                //�뺢퇋��
            const carNumberRegex = /\d{2,3}[媛�-��]{1}\d{4}/gm;
            console.log(inputText.length);
            if(testArray[0] != null) {
                $('input[name=inText]').attr('value','');
                $('input[name=inText]').attr('value','�쀬씠誘� �깅줉�� 李⑤웾踰덊샇 �낅땲��.��');
                $('input[name=inText]').css('color', 'rgb(231, 67, 89)');
            } else if(!carNumberRegex.test(inputText)) {
                carNumberArray = [];
                $('input[name=inText]').attr('value','');
                $('input[name=inText]').attr('value','�쀬쑀�⑦븯吏� �딆� 李⑤웾踰덊샇 �낅땲��.��');
                $('input[name=inText]').css('color', 'rgb(231, 67, 89)');
                
            }else { 
                $("#inButton").css("visibility", "visible")
                $('input[name=inText]').css('color', 'rgb(110,124,212)');
                $('input[name=inText]').css('weight', '900');
                saveData[0] = inputText;
                $(`#bottomSection button`).attr('disabled',true);
                $(`#deleteButton`).attr('disabled',false);
                $(`#resetButton`).attr('disabled',false);
            }
        });
        //�쇰컲�곸씤 �ㅻⅨ 踰꾪듉�� �뚮��� ��
        } else {
            let inText = $(`#inText`).val();
            if(inText.length >= 7) {
                $(`#errorArticle`).html(`李⑤웾 踰덊샇�� 理쒕� 7湲��먭퉴吏� <br> �낅젰�� 媛��ν빀�덈떎.`);
                $(`#errorArticle`).css(`visibility`,`visible`);
                setTimeout(()=>{
                    $(`#errorArticle`).css(`visibility`,`hidden`);
                },500)
            } else {
                $('input[name=inText]').css('color', 'rgb(49,49,49)');
                $('input[name=inText]').attr('value','');
                carNumberArray.push(targetValue);
                inputText = (Hangul.assemble(carNumberArray));
                $('input[name=inText]').attr('value',inputText);

            }
        }
    });
    //�낆감�좎껌 踰꾪듉�� �뚮��� �� 議곌굔�� 留욌뒗吏� �뺤씤 �꾩뿉 泥ル쾲吏� �뺤씤 紐⑤떖李쎌쓣 �꾩슫��.
    $(`#inButton`).click(()=>{
        $('#inButton').css(`background`,`rgb(67,83,182)`)
        setTimeout(()=>{
            $('#inButton').css(`background`,`rgb(110,124,212)`)
        },200)
        if(saveData[0] != '' && saveData[1] != '') {
            //if(parseInt($(`#clickTime`).html()) > 10){ ;
                saveData[2] = $(`#clickTime`).html();
            //}
            $(`#inPageBg`).css('visibility','visible');
            $(`#checkNumber`).html(saveData[0]);
            $(`#checkParking`).html(saveData[1]);
            $(`#inTime`).html(saveData[2]);
            console.log(saveData);
        } else if (saveData[0] == '') {
            $(`#errorArticle`).html(`李⑤웾 踰덊샇瑜� <br> �뺥솗�� �낅젰�댁＜�몄슂.`);
            $(`#errorArticle`).css(`visibility`,`visible`);
            setTimeout(()=>{
                $(`#errorArticle`).css(`visibility`,`hidden`);
            },500)
        } else if (saveData[1] == '') {
            $(`#errorArticle`).html(`二쇱감 援ъ뿭�� �좏깮�섍퀬 <br> �낆감 �좎껌�� �댁＜�몄슂.`);
            $(`#errorArticle`).css(`visibility`,`visible`);
            setTimeout(()=>{
                $(`#errorArticle`).css(`visibility`,`hidden`);
            },500)
        }
        //泥ル쾲吏� �뺤씤 紐⑤떖李쎌뿉�� 痍⑥냼瑜� �뚮��� �� 紐⑤떖 李쎌쓣 �놁븻��.
        $(`#cancelBTN`).click(()=>{
            $(`#inPageBg`).css('visibility','hidden');
        });
        //泥ル쾲吏� �뺤씤 紐⑤떖李쎌뿉��  �뺤씤�� �뚮��� �� 理쒖쥌 �뺤씤 紐⑤떖 李쎌쓣 �꾩슫��.
        $(`#checkBTN`).click(()=>{
            $(`#inPageBg`).css('visibility','hidden');
            $(`#inPageBBg`).css('visibility','visible');
            $(`input[name="carNumber"]`).attr('value',saveData[0]);
            $(`input[name="useArea"]`).attr('value',saveData[1]);    
            $(`input[name="entranceTime"]`).attr('value',saveData[2])
            //理쒖쥌 �뺤씤 紐⑤떖李쎌쓣 �뚮��� �� 硫붿씤 �섏씠吏�濡� �대룞�쒕떎.
            $(`input[type="submit"]`).click(()=>{
                console.log('ok');
                location.replace('/main');
            });
        });
    });
});