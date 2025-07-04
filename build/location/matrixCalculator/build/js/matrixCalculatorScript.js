class MatrixCalculator {
    constructor(eventTargetId, leftValueOne, leftValueTwo, rightValueOne, rightValueTwo) {
        this.eventTagetId = eventTargetId;
        this.leftValueOne = leftValueOne;
        this.leftValueTwo = leftValueTwo;
        this.rightValueOne = rightValueOne;
        this.rightValueTwo = rightValueTwo;
    }
    /*valueCheck() {
        if(
            this.leftValueOne <= 10 &&
            this.leftValueTwo <= 10 &&
            this.rightValueOne <= 10 &&
            this.rightValueTWo <= 10
        ) {
            console.log(a);
        }
    }*/

    valueSave(arrayOne, arrayTwo) {
        let i,j=0;
        //leftBox
        for(i=0; i<this.leftValueTwo; i++) {
            let innerArray = [];
            for(j=0; j<this.leftValueOne; j++) {
                innerArray.push(parseInt($(`#leftBox${i} #input${j}`).val()));
            }
            arrayOne.push(innerArray);
        }
        //rightBox
        for(i=0; i<this.rightValueTwo; i++) {
            let innerArray = [];
            for(j=0; j<this.rightValueOne; j++) {
                innerArray.push(parseInt($(`#rightBox${i} #input${j}`).val()));
            }
            arrayTwo.push(innerArray);
        }
    }

    matrixPrint(arrayOne, arrayTwo, arrayThree) {
        let i,j = 0;

        $(`#thirdMatrixArticle`).empty();
        for(i=0; i < arrayThree.length; i++) {
            $(`#thirdMatrixArticle`).append(`<article id="valueBox${i}"></article>`);
            for(j=0; j < arrayThree[0].length; j++) {
                $(`#valueBox${i}`).append(`<div id="box${j}">
                <input id="input${j}" disabled></input>
                </div>`);
            }
        }
        
        for(i=0; i<arrayThree.length; i++) {
            for(j=0; j<arrayThree[0].length; j++) {
                $(`#valueBox${i} #input${j}`).attr(`value`, arrayThree[i][j] );
            }
        }
    }

    clickEvent() {
        let i,j,k=0;
        if(
            parseInt(this.leftValueOne) < 10 &&
            this.leftValueTwo < 10 &&
            this.rightValueOne < 10 &&
            this.rightValueTWo < 10
        ) {
            console.log(`big`);
        } else {
            console.log(`oo`);
        }

        switch(this.eventTagetId) {
            
        case "leftOutputButton" :
            $(`#firstMatrixArticle`).empty();
            for(i=0; i<this.leftValueTwo; i++) {
                $(`#firstMatrixArticle`).append(`<article id="leftBox${i}"></article>`);
                for(j=0; j<this.leftValueOne; j++) {
                    $(`#leftBox${i}`).append(`<div id="box${j}">
                    <input id="input${j}" type="number" max="10"></input>
                    </div>`);
                }
            }
        break;

        case "leftRandomButton" :
            for(i=0; i<this.leftValueTwo; i++) {
                for(j=0; j<this.leftValueOne; j++) {
                    $(`#leftBox${i} #input${j}`).attr(`value`,Math.floor(Math.random() * (10-1+1) + 1));
                }
            }
        break;

        case "leftResetButton" :
            $(`#firstMatrixArticle input`).val(``);
        break;

        case "rightOutputButton" :
                $(`#secondMatrixArticle`).empty();
                for(i=0; i<this.rightValueTwo; i++) {
                    $(`#secondMatrixArticle`).append(`<article id="rightBox${i}"></article>`);
                    for(j=0; j<this.rightValueOne; j++) {
                        $(`#rightBox${i}`).append(`<div id="box${j}">
                        <input id="input${j}" type="number" max="10"></input>
                        </div>`);
                    }
                }
        break;

        case "rightRandomButton" :
            for(i=0; i<this.rightValueTwo; i++) {
                for(j=0; j<this.rightValueOne; j++) {
                    $(`#rightBox${i} #input${j}`).attr(`value`,Math.floor(Math.random() * (10-1+1) + 1));
                }
            }
        break;

        case "rightResetButton" :
            $(`#secondMatrixArticle input`).val(``);
        break;

        case "plusButton" :
            if(
                this.leftValueOne == this.rightValueOne &&
                this.leftValueTwo == this.rightValueTwo
            ) {

            let plusArrayOne = [];
            let plusArrayTwo = [];
            let plusArrayThree =[];

            this.valueSave(plusArrayOne, plusArrayTwo);

            $(`#operatorBox`).text(`+`);
            $(`#operatorBox`).css(`line-height`,`3rem`);

            for(i=0; i<plusArrayOne.length; i++) {
                let innerArray = [];
                let plusValue = 0;
                for(j=0; j<plusArrayOne[0].length; j++) {
                    plusValue = parseInt(plusArrayOne[i][j] + plusArrayTwo[i][j]);
                    innerArray.push(plusValue);
                }
                plusArrayThree.push(innerArray);
            }
            for(i=0; i<plusArrayThree.length; i++) {
                for(j=0; j<plusArrayThree[0].length; j++) {
                    if(isNaN(plusArrayThree[i][j]) == false) {
                        this.matrixPrint(plusArrayOne, plusArrayTwo, plusArrayThree);
                    } else if(isNaN(plusArrayThree[i][j]) == true) {
                        $(`#errorBox span`).html(`�됰젹�� �ㅼ떆 �뺤씤�� 二쇱꽭��.`);
                        $(`#errorSection`).css(`visibility`,`visible`);
                        $(`#thirdMatrixArticle input`).val(``);
                    } 
                }
            }
        } else {
            $(`#errorBox span`).html(`�� �됰젹�� �ш린媛� 媛숈븘�� �⑸땲��.`);
            $(`#errorSection`).css(`visibility`,`visible`);
        }
            break;

        case "minusButton" :
        if(
            this.leftValueOne == this.rightValueOne &&
            this.leftValueTwo == this.rightValueTwo
        ) {
            $(`#operatorBox`).text(`-`);
            $(`#operatorBox`).css(`line-height`,`3rem`);

            let minusArrayOne = [];
            let minusArrayTwo = [];
            let minusArrayThree =[];

            this.valueSave(minusArrayOne, minusArrayTwo);

            for(i=0; i<minusArrayOne.length; i++) {
                let innerArray = [];
                let minusValue = 0;
                for(j=0; j<minusArrayOne[0].length; j++) {
                    minusValue = parseInt(minusArrayOne[i][j] - minusArrayTwo[i][j]);
                    innerArray.push(minusValue);
                }
                minusArrayThree.push(innerArray);
            }
            for(i=0; i<minusArrayThree.length; i++) {
                for(j=0; j<minusArrayThree[0].length; j++) {
                    if(isNaN(parseInt(minusArrayThree[i][j]))) {
                        $(`#errorBox span`).html(`�됰젹�� �ㅼ떆 �뺤씤�� 二쇱꽭��.`);
                        $(`#errorSection`).css(`visibility`,`visible`);
                        $(`#thirdMatrixArticle input`).val(``);

                    } else {
                        this.matrixPrint(minusArrayOne, minusArrayTwo, minusArrayThree);
                    } 
                }
            }
            
        } else {
            $(`#errorBox span`).html(`�� �됰젹�� �ш린媛� 媛숈븘�� �⑸땲��.`);
            $(`#errorSection`).css(`visibility`,`visible`);
        }
        break;

        case "multiplyButton" :
        
        if(this.leftValueTwo == this.rightValueOne) {
        let multiplyArrayOne = [];
        let multiplyArrayTwo = [];
        let multiplyArrayThree = [];
        
        $(`#operatorBox`).text(`*`);
        $(`#operatorBox`).css(`line-height`,`4.5rem`);

        this.valueSave(multiplyArrayOne, multiplyArrayTwo);

        //multiply
        for(i=0; i < multiplyArrayOne.length; i++) {
            let innerArray = [];
            let sumValue = 0;
            let sumValueTwo = 0;
            for(j=0; j < multiplyArrayTwo[0].length; j++) {
                sumValue = 0;
                sumValueTwo = 0;
                for(k=0; k < multiplyArrayOne[i].length; k++) {
                    sumValue = multiplyArrayOne[i][k] * multiplyArrayTwo[k][j];
                    sumValueTwo += sumValue;
                }
                innerArray.push(sumValueTwo);
            }
            multiplyArrayThree.push(innerArray);
        }
        //print
            for(i=0; i<multiplyArrayThree.length; i++) {
                for(j=0; j<multiplyArrayThree[0].length; j++) {
                    if(isNaN(parseInt(multiplyArrayThree[j]))) {
                        $(`#errorSection`).css(`visibility`,`visible`);
                        $(`#errorBox span`).html(`�됰젹�� �ㅼ떆 �뺤씤�� 二쇱꽭��.`);
                    } else {
                        this.matrixPrint(multiplyArrayOne, multiplyArrayTwo, multiplyArrayThree);
                    } 
                }
            }
            $(`#thirdMatrixArticle * input`).css(`font-size`,`1.5vmin`);
        } else {
            $(`#errorBox span`).html(`泥� 踰덉㎏ �됰젹�� �� �섎뒗 <br> �� 踰덉㎏ �됰젹�� �� �섏� 媛숈븘�� �⑸땲��.`);
            $(`#errorSection`).css(`visibility`,`visible`);
        }
        break;
        }
    }
}

class ErrorExitButton {
    constructor() {}
    clickExitButton() {
        $(`#errorExitButton`).click(()=>{
            $(`#errorSection`).css(`visibility`,`hidden`);
        });
    }
}

$(document).ready(()=>{
    let errorExit = new ErrorExitButton();
    errorExit.clickExitButton();
    $(document).click((e)=>{
        let leftFirstInput = $(`#leftFirstInput`).val();
        let leftSecondInput = $(`#leftSecondInput`).val();
        let rightFirstInput = $(`#rightFirstInput`).val();
        let rightSecondInput = $(`#rightSecondInput`).val();

        let matrixCalculator = new MatrixCalculator(e.target.id, leftFirstInput, leftSecondInput, rightFirstInput, rightSecondInput);
        matrixCalculator.clickEvent();
    });

});