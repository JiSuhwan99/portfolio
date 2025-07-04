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
        smallTimeArray[0] = "0";
        smallTimeArray[1] = this.theHours;
        this.theHours = smallTimeArray[0]+smallTimeArray[1];
        console.log(this.theHours);
    }
    if(this.theMinutes < 10) {
        let smallTimeArray = [];
        smallTimeArray[0] = "0";
        smallTimeArray[1] = this.theMinutes;
        this.theMinutes = smallTimeArray[0]+smallTimeArray[1];
    }
    if(this.theSeconds < 10) {
        let smallTimeArray = [];
        smallTimeArray[0] = "0";
        smallTimeArray[1] = this.theSeconds;
        this.theSeconds = smallTimeArray[0]+smallTimeArray[1];
    }
    $(this.theId).attr('value',
        this.theHours + ":" + this.theMinutes +":" + this.theSeconds
    );
    }
}

$(document).ready(function() {

    //�④꺼�볦� �꾩옱 �쒓컙 
    let outHours = localStorage.getItem('clickHours');
    let outMinutes = localStorage.getItem('clickMinutes');
    let outSeconds = localStorage.getItem('clickSeconds');

    let hiddenInputPlusZero = new PlusZero("#hiddenInput",outHours, outMinutes, outSeconds);
    hiddenInputPlusZero.timePlusZero();

    $(`#outButton`).click(()=>{
            $('#outButton').css(`background`,`rgb(207, 31, 55)`)
            setTimeout(()=>{
                $('#outButton').css(`background`,`rgb(231,67,89)`)
            },100)
    let outSubmitTest = $(`#outText`).val();
    console.log(1);
    if(outSubmitTest.length != 7) {
        $(`#errorArticle`).html(`�뺥솗�� 李⑤웾 踰덊샇瑜� <br> �낅젰�댁＜�몄슂`);
        $(`#errorArticle`).css(`visibility`,`visible`);
        setTimeout(()=>{
            $(`#errorArticle`).css(`visibility`,`hidden`);
        },500)
    }
    });
    $(`#cardExitIcon`).click(()=>{
        console.log(1);
        $(`#outCardModal`).css(`visibility`,`hidden`);
    })

    //�대┃�� 踰꾪듉�� 媛믪쓣 �대뒗 諛곗뿴
    let carNumberArray = [];
    let inputText = '';
    $(`#bottomSection button`).click((e)=>{
        $(`#outText`).css(`outline`,`none`);
        let targetValue = e.target.innerHTML;

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
            carNumberArray = [];
            $('input[name=outText]').attr('value','');
            $(`#bottomSection button`).attr('disabled',false);
            $('input[name=outText]').css('color', 'rgb(49,49,49)');
            $(`article.parkingBoxArticle div`)
            .css("border","1rem solid rgb(250,250,250)");

        //諛깆뒪�섏씠�� 踰꾪듉�� �뚮��� ��
        } else if(e.target.id == "deleteButton" || e.target.id == "backspaceIcon") {
            $(`#bottomSection button`).attr('disabled',false);
            $('input[name=outText]').css('color', 'rgb(49,49,49)');
            carNumberArray.pop();
            inputText = Hangul.assemble(carNumberArray);
            $('input[name=outText]').attr('value', inputText);
            $(`article.parkingBoxArticle div`)
            .css("border","1rem solid rgb(250,250,250)");

        //議고쉶踰꾪듉�� �뚮��� ��
        } else if (e.target.id == "enterButton") {
            //�뺢퇋��
            $('#enterButton').css(`background`,`rgb(67,83,182)`)
            setTimeout(()=>{
                $('#enterButton').css(`background`,`rgb(110, 124, 212)`)
            },100)

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
                            testArray.push(jsonArray[i].use_area);
                            testArray.push(jsonArray[i].entrance_time);
                        }
                    }
                testArray.push($(`#hiddenInput`).val());
                console.log(testArray);

            const carNumberRegex = /\d{2,3}[媛�-��]{1,2}\d{4}/gm;

            //�뺢퇋�앹뿉 �닿툔�섍굅�� �깅줉�� 李⑤웾 踰덊샇媛� �꾨땺 �� FALSE
            if(!carNumberRegex.test(inputText) || testArray[2] == null) {
                carNumberArray = [];
                $('input[name=outText]').attr('value','');
                $('input[name=outText]').attr('value','�쀬쑀�⑦븯吏� �딆� 李⑤웾踰덊샇 �낅땲��.��');
                $('input[name=outText]').css('color', 'rgb(231, 67, 89)');
                
            //�뺥솗�� �뺣낫瑜� �낅젰�덉쓣 �� TRUE
            }else {
                $("#outButton").css("visibility", "visible");
                let useAreaArray = [];
                if(testArray[1][0] == "A") {
                    useAreaArray.push(0,parseInt(testArray[1][2]));
                } else if(testArray[1][0] == "B") {
                    useAreaArray.push(1,parseInt(testArray[1][2]));
                } else if(testArray[1][0] == "C") {
                    useAreaArray.push(2,parseInt(testArray[1][2]));
                } else {
                    useAreaArray.push(3,parseInt(testArray[1][2]));
                }
                $(`article.parkingBoxArticle:eq(${useAreaArray[0]})
                    div:nth-child(${useAreaArray[1]})`)
                .css("border","1rem dashed rgb(196, 66, 84)");

                $('input[name=outText]').css('color', 'rgb(110,124,212)');
                $('input[name=outText]').css('weight', '900');

                $(`#bottomSection button`).attr('disabled',true);

                $(`#deleteButton`).attr('disabled',false);

                $(`#resetButton`).attr('disabled',false);
                
                
                $(`#clickTime`).attr('value', testArray[2]);

                let setHours = (testArray[2][0]+testArray[2][1])
                let setMinutes = (testArray[2][3]+testArray[2][4])
                let setSeconds = (testArray[2][6]+testArray[2][7])
                let resultHours = outHours - setHours ;
                let resultMinutes = outMinutes - setMinutes ;
                let resultSeconds = outSeconds - setSeconds ;
                
                if(resultSeconds < 0) {
                    resultSeconds += 60;
                    resultMinutes -= 1;
                };
                if(resultMinutes < 0) {
                    resultMinutes += 60;
                    resultHours -= 1;
                };

                let resultTime = new PlusZero(`#nowTime`, resultHours, resultMinutes, resultSeconds);
                resultTime.timePlusZero();
                let resultPriceTime = resultHours * 60; 
                let resultPrice = Math.floor((resultPriceTime + resultMinutes) / 30);
                let lastPrice = resultPrice * 2000;
                if(lastPrice == "0") {
                    lastPrice = 2000;
                }
                $(`#nowPrice`).attr('value', lastPrice.toLocaleString(`ko-KR`) + '��');
                // 紐⑤떖李�
                $(`#outButton`).click(()=>{
                    console.log(inputText);
                    if(testArray[0] == inputText) {
                        $('#outCheckModal').css('visibility','visible');
                        $('#entranceTimeBox p').html($('#clickTime').val());
                        $('#exitTimeBox p').html($('#hiddenInput').val());
                        $('#carNumberBox p').html($('#outText').val());
                        $('#settlementAmountBox p').html($('#nowPrice').val());
                        
                        $(`#paymentButton`).click(()=>{
                            $('#outCheckModal').css(`visibility`, `hidden`);
                            $('#outCardModal').css(`visibility`, `visible`);
                            $('#parkingTime').attr(`value`, $(`#nowTime`).val());
                            $('#outCarNumber').attr(`value`, $(`#carNumberBox p`).html());
                            $('#outTime').attr(`value`, $(`#exitTimeBox p`).html());
                            $('#outPrice').attr(`value`, lastPrice);
                            
                        });
                        $('#cancelButton').click(()=>{
                            location.replace('/out');
                        })
                        //寃곗젣 �꾨즺�섏뿀�듬땲�� 踰꾪듉 �대┃ ��  
                        $(`#cardPost`).click(()=>{
                            $('#outCardModal').css(`visibility`, `hidden`);
                            $('#outCompleteModal').css(`visibility`, `visible`);
                            $('#parkingTime').attr(`value`, $(`#nowTime`).val());
                            $('#outCarNumber').attr(`value`, $(`#carNumberBox p`).html());
                            $('#outTime').attr(`value`, $(`#exitTimeBox p`).html());
                            $('#outPrice').attr(`value`, lastPrice);
                        });
                        //�곸닔利� �몄뇙 踰꾪듉 �대┃ ��  
                            $('#printButton').click(function() {
                                //console.log(1);
                                //window.print();
                            });
                            //�곸닔利� �リ린 踰꾪듉 �대┃ ��  
                            $(``).click(()=>{
                                location.replace('/main');
                            });

                    }
                });
            }
        });
        //�ㅽ뙣�쒖쓽 �쇰컲�곸씤 �レ옄, �쒓� 踰꾪듉�� �뚮��� ��
        } else {
            let outText = $(`#outText`).val();
            if(outText.length >= 7) {
                $(`#errorArticle`).html(`李⑤웾 踰덊샇�� 理쒕� 7湲��먭퉴吏� <br> �낅젰�� 媛��ν빀�덈떎.`);
                $(`#errorArticle`).css(`visibility`,`visible`);
                setTimeout(()=>{
                    $(`#errorArticle`).css(`visibility`,`hidden`);
                },500)
                console.log(outText);
            } else {
                $('input[name=outText]').css('color', 'rgb(49,49,49)');
                $('input[name=outText]').attr('value','');
                carNumberArray.push(targetValue);
                inputText = (Hangul.assemble(carNumberArray));
                $('input[name=outText]').attr('value',inputText);
                console.log(outText);
            }
        }
    });
});