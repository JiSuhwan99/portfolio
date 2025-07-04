class GameStart {
    constructor(roundNumber, scoreNumber) {
        this.roundNumber = Number(roundNumber);
        this.scoreNumber = Number(scoreNumber);
    }
    start() {
        $(`#gameArticle`).empty();
        $(`#timeBox`).html(`0.0`);
        $(`#roundBox`).html(`ROUND ${this.roundNumber+1}`);
        $(`#scoreBox`).html(this.scoreNumber);
        $(`#nextButton`).css(`width`,`15rem`);
        let roundArray = [10,14,18,22,26,30];
        let keyCodeArray = [37,38,39,40,32];
        let outputKeyArray = ["arrowLeft","arrowTop","arrowRight","arrowDown","spaceBar"];
        let keyArray = [];
        let tryTime = parseFloat(15 - this.roundNumber);
        let timerInterval;
        let result = this.scoreNumber;
        let nowTime;
        let i;
        
        setTimeout(()=>{

        for(i=0; i < roundArray[this.roundNumber]; i++) {
            let randomKeys = Math.floor((Math.random() * 5 - 0) + 0);
            keyArray.push(keyCodeArray[randomKeys]);
            $(`#gameArticle`).append(`<div id="randomBox${i}" class="randomBox${i}"> ${outputKeyArray[randomKeys]} </div>`);
            $(`#randomBox${i}`).css(`background`,`url(../css/images/${outputKeyArray[randomKeys]}.png) no-repeat`);
            $(`#randomBox${i}`).css(`background-size`,`contain`);
        }
        keyArray.push(32*10);

        $(`#gameArticle`).append(`<div id="randomBox${i}" class="lastSpaceBar"></div>`);

        $(`#timeBox`).html(tryTime);
        $(`#textArticle >p`).css(`transform`,`translate(0rem, -2rem)`);

        timerInterval = setInterval(() => {

            nowTime = $(`#timeBox`).html();
            let setTryTime = $(`#timeBox`).html();
            $(`#timeBox`).html((setTryTime-0.1).toFixed(1));

            if(setTryTime == 0) {
                clearInterval(timerInterval);
                $(`#timeBox`).html(`0.0`);

                $(`#textArticle`).css(`visibility`,`visible`);
                $(`#textArticle`).css(`height`,`70rem`);
                $(`#rankButton`).css(`width`,`15rem`);
                $(`#rankButton`).css(`visibility`,`visible`);
                
                $(`#textArticle >p`).html(`ROUND${this.roundNumber + 1} 실패!`);
                $(`#textArticle >p`).css(`text-shadow`,`none`);
                $(`#textArticle >p`).css(`color`,`#fa4545`);
                $(`#textArticle >p`).css(`text-shadow`,`0rem 0rem 0.8rem #f2f2f2, 0rem 0rem 1rem #ff4848`);
                $(`#textArticle >p`).css(`transition`,`linear 0.2s all`);
                $(`#textArticle >p`).css(`transform`,`translate(0rem, 2rem)`);
                
                $(`#nextButton`).css(`visibility`,`hidden`);
                $(`#nextButton`).css(`width`,`0rem`);
                $(`#roundResult`).html($(`#roundBox`).html());
                $(`#scoreResult`).html($(`#scoreBox`).html());
            }
        },100);

        let removeBox = 0;
        let lastKey = 320 - 32;
        $(`#randomBox0`).css(`transform`,`scale(1.2)`);
        $(`#randomBox0`).css(`opacity`,`1`);
        $(document).keyup((e)=>{
            if($(`#textArticle`).css(`visibility`) == `hidden`) {
                let resultPlus = Math.floor(((this.roundNumber+1)*2) * Number(nowTime));
                if(keyArray.length != 0) {
                    //common pang
                    if(e.keyCode == keyArray[0]) {
                        keyArray.shift();
                        result += resultPlus;
                        $(`#randomBox${removeBox}`).css(`transition`,`0.05s`);
                        $(`#randomBox${removeBox}`).css(`opacity`,`0.5`);
                        $(`#randomBox${removeBox}`).css(`transform`,`translate(0rem,0.8rem)`);
                        $(`#randomBox${removeBox}`).css(`visibility`,`hidden`);
                        $(`#randomBox${removeBox + 1}`).css(`opacity`,`1`);
                        $(`#randomBox${removeBox + 1}`).css(`transform`,`scale(1.2)`);
                        removeBox += 1;
                        $(`#scoreBox`).html(result);
                    } else if(e.keyCode != keyArray[0]) {
                        
                        if(result <= 0) {
                            result = 0;

                        } else if(keyArray[0] == 320 && e.keyCode == 32) {
                            
                            result += (resultPlus * 2);
                            lastKey -= 32;

                            if(lastKey == 224) {
                                $(`#randomBox${removeBox}`).css(`background`,`url("../css/images/lastSpace20.png") no-repeat`);
                                $(`#randomBox${removeBox}`).css(`background-size`,`contain`);
                            } else if(lastKey == 160) {
                                $(`#randomBox${removeBox}`).css(`background`,`url("../css/images/lastSpace40.png") no-repeat`);
                                $(`#randomBox${removeBox}`).css(`background-size`,`contain`);
                            } else if(lastKey == 96) {
                                $(`#randomBox${removeBox}`).css(`background`,`url("../css/images/lastSpace60.png") no-repeat`);
                                $(`#randomBox${removeBox}`).css(`background-size`,`contain`);
                            } else if(lastKey == 32) {
                                $(`#randomBox${removeBox}`).css(`background`,`url("../css/images/lastSpace80.png") no-repeat`);
                                $(`#randomBox${removeBox}`).css(`background-size`,`contain`);
                            } else if(lastKey == 0) {
                                $(`#randomBox${removeBox}`).css(`background`,`url("../css/images/lastSpace100.png") no-repeat`);
                                $(`#randomBox${removeBox}`).css(`background-size`,`contain`);
                            }
                            if(lastKey == 0) {
                                if(this.roundNumber != 5) {
                                    keyArray.shift();
                                    lastKey = 0;
                                    result -= resultPlus;
                                    $(`#randomBox${removeBox}`).css(`visibility`,`hidden`);
                                    $(`#textArticle`).css(`visibility`,`visible`);
                                    $(`#textArticle`).css(`height`,`70rem`);
                                    $(`#textArticle >p`).html(`ROUND${this.roundNumber + 1} 클리어!`);
                                    $(`#textArticle >p`).css(`-webkit-animation`,`rotate-scale-up-ver 1s linear`);
                                    $(`#buttonArticle >button`).css(`margin`,`0rem`);
                                    $(`#rankButton`).css(`width`,`0rem`);
                                    $(`#rankButton`).css(`visibility`,`hidden`);
                                    clearInterval(timerInterval);
                                } else if(this.roundNumber == 5) {
                                    keyArray.shift();
                                    lastKey = 0;
                                    result -= resultPlus;

                                    $(`#randomBox${removeBox}`).css(`visibility`,`hidden`);
                                    $(`#textArticle`).css(`visibility`,`visible`);
                                    $(`#textArticle`).css(`height`,`70rem`);
                                    $(`#textArticle >p`).html(`ROUND5 클리어!`);
                                    $(`#textArticle >p`).css(`-webkit-animation`,`swirl-in-fwd 0.7s linear`);

                                    $(`#nextButton`).css(`visibility`,`hidden`);
                                    $(`#nextButton`).css(`width`,`0rem`);
                                    $(`#rankButton`).css(`width`,`15rem`);
                                    $(`#rankButton`).css(`visibility`,`visible`);
                                    
                                    $(`#blastImage`).css(`background`,`url("../css/images/blast.png")no-repeat`);
                                    $(`#blastImage`).css(`background-size`,`contain`);
                                    $(`#blastImage`).css(`transform`,`scale(0.5)`);
                                    $(`#blastImage`).css(`opacity`,`0`);
                                    
                                    setTimeout(()=>{
                                        $(`#blastImage`).css(`transform`,`scale(0.98)`);
                                        $(`#blastImage`).css(`opacity`,`0.7`);
                                    },400);

                                    clearInterval(timerInterval);
                                }
                            } 
                        } else {
                            result -= resultPlus;
                        }
                        $(`#scoreBox`).html(result);
                        $(`#roundResult`).html($(`#roundBox`).html());
                        $(`#scoreResult`).html($(`#scoreBox`).html());
                    }
                }
            }
        })
        },1700);
    }
}


$(document).ready(()=>{
    k = 1;
    setInterval(()=>{
        switch(k) {
            case 1 :
                $(`#imageOne`).css(`margin-top`,`-5rem`);
                $(`#imageOne`).css(`transform`,`scale(1.0)`);
                $(`#imageOne`).css(`transform`,`scale(1.2)`);
                setTimeout(()=>{
                $(`#imageOne`).css(`margin-top`,`0rem`);
                $(`#imageOne`).css(`transform`,`scale(1.0)`);
                },300)
                break;
            case 2 :
                $(`#imageTwo`).css(`margin-top`,`-5rem`);
                $(`#imageTwo`).css(`transform`,`scale(1.2)`);
                setTimeout(()=>{
                $(`#imageTwo`).css(`margin-top`,`0rem`);
                $(`#imageTwo`).css(`transform`,`scale(1.0)`);
                },300)
                break;
            case 3 :
                $(`#imageThree`).css(`margin-top`,`-5rem`);
                $(`#imageThree`).css(`transform`,`scale(1.2)`);
                setTimeout(()=>{
                $(`#imageThree`).css(`margin-top`,`0rem`);
                $(`#imageThree`).css(`transform`,`scale(1.0)`);
                },300)
                break;
            case 4 :
                $(`#imageFour`).css(`margin-top`,`-5rem`);
                $(`#imageFour`).css(`transform`,`scale(1.2)`);
                setTimeout(()=>{
                $(`#imageFour`).css(`margin-top`,`0rem`);
                $(`#imageFour`).css(`transform`,`scale(1.0)`);
                },300)
                break;
            case 5 :
                $(`#imageFive`).css(`margin-top`,`-5rem`);
                $(`#imageFive`).css(`transform`,`scale(1.2)`);
                setTimeout(()=>{
                $(`#imageFive`).css(`margin-top`,`0rem`);
                $(`#imageFive`).css(`transform`,`scale(1.0)`);
                },300)
                k = 0;
                break;
        }
    k++;
    },600)

    $(`#startButton`).click(()=>{
        $(`#mainSection`).css(`visibility`,`hidden`);
        $(`#mainSection`).css(`height`,`0rem`);
        $(`#gameSection`).css(`visibility`,`visible`);
        $(`#gameSection`).css(`height`,`70rem`);
        $(`#startMessage`).html(`3`);
        setTimeout(()=>{
            $(`#startMessage`).html(`2`);
        },500);
        setTimeout(()=>{
            $(`#startMessage`).html(`1`);
        },1000);
        setTimeout(()=>{
            $(`#startMessage`).html(`START`);
            setTimeout(()=>{
            $(`#startMessage`).css(`visibility`,`hidden`);
            },300);
        },1500);
        let gs = new GameStart(0,0);
        gs.start();
    });
    $(`#questionButton`).click(()=>{
        $(`#questionArticle`).css(`visibility`,`visible`);
        let imageTimer = 0;
        setInterval(()=>{
            if(imageTimer == 120) {imageTimer = 0};
            $(`#lastSpaceImage`).css(`background`,`url("../css/images/lastSpace${imageTimer}.png")no-repeat`);
            $(`#lastSpaceImage`).css(`background-size`,`contain`);
            imageTimer += 20;
        },800);
        $(`#cancelButton`).click(()=>{
            $(`#questionArticle`).css(`visibility`,`hidden`);
        });
    });
    $(`#rankingButton`).click(()=>{
        let jsonArray = [];
        $(`#rankingArticle`).css(`visibility`,`visible`);
        $(`#rankingTable`).empty();
        $.getJSON("../script/gameRanking.json", (jsonData) => {
                $.each(jsonData, function(value,object){
                    jsonArray.push(object)
                });
                for(i=0;i<jsonArray.length; i++) {
                    let rankName = jsonArray[i].rank_name;
                    let rankScore = jsonArray[i].rank_score;
                    let rankTimeBefore = jsonArray[i].rank_time;
                    let rankTimeAfter = rankTimeBefore.substr(0,10);
                    $(`#rankingTable`).append(`<ul>
                        <li>${i+1}</li>
                        <li>${rankName}</li>
                        <li>${rankScore}</li>
                        <li>${rankTimeAfter}</li>
                    </ul>`);
                }
        });
        $(`#rankingCancelButton`).click(()=>{
            $(`#rankingArticle`).css(`visibility`,`hidden`);
        });
    });
    $(`#homeButton`).click(()=>{
        $(`#mainSection`).css(`visibility`,`visible`);
        $(`#mainSection`).css(`height`,`70rem`);
        $(`#gameSection`).css(`visibility`,`hidden`);
        $(`#gameSection`).css(`height`,`0rem`);
        setTimeout(()=>{
            location.reload();
        },500)
    });
    $(`#resetButton`).click(()=>{
        location.reload();
    });
    $(`#nextButton`).click(()=>{
        let nextRoundNumber = $(`#roundResult`).html();
        let nextScoreNumber = $(`#scoreResult`).html();
        $(`#textArticle >p`).css(`-webkit-animation`,`none`);
        $(`#textArticle`).css(`visibility`,`hidden`);
        $(`#textArticle`).css(`height`,`0rem`);
        $(`#startMessage`).html(`3`);
        $(`#startMessage`).css(`visibility`,`visible`);
        $(`#scoreBox`).html(nextScoreNumber);
        $(`#roundBox`).html(nextRoundNumber);
        setTimeout(()=>{
            $(`#startMessage`).html(`2`);
        },400);
        setTimeout(()=>{
            $(`#startMessage`).html(`1`);
        },800);
        setTimeout(()=>{
            $(`#startMessage`).html(`START`);
            setTimeout(()=>{
            $(`#startMessage`).css(`visibility`,`hidden`);
            },200);
        },1200);
        let gs = new GameStart(nextRoundNumber[6], nextScoreNumber);
        gs.start();
    });
    $(`#rankButton`).click(()=>{
        $(`#scoreInput`).attr(`value`,$(`#scoreResult`).html());
        $(`#rankSaveOutArticle`).css(`visibility`,`visible`);
        let scoreInput = $(`#scoreInput`).html;
        $(`#submitButton`).click(()=>{
            let nameInput = $(`#nameInput`).val();
            if(nameInput.length <= 5) {
                console.log(nameInput.length);
                $(`#submitButton`).prop(`type`,`submit`);
            } else {
                $(`#nameMessage`).html(`이름이 5자를 초과하였습니다!`);
                $(`#nameMessage`).css(`color`,`#ff4040`);
                setTimeout(()=>{
                    $(`#nameMessage`).html(`이름은 숫자, 영어, 특수문자 포함 5글자까지 가능해요!`);
                    $(`#nameMessage`).css(`color`,`#ff6b6b`);
                },800)
            }
        });
    });
});