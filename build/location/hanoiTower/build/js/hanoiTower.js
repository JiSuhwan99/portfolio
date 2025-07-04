$(document).ready(()=>{
    let i = 1;
    let s = 1;
    let inputNumber;

    function moveFloor(n, giveArray, getArray, giveTower, getTower,setTime){
        let towerIdArray = [
            [`#firstTower`,`<span>1踰덉㎏ ����</span>`],
            [`#secondTower`,`<span>2踰덉㎏ ����</span>`],
            [`#thirdTower`,`<span>3踰덉㎏ ����</span>`]
        ];
        getArray.push(giveArray.pop(n));
        let moveFloor;
        setTimeout(()=>{
            moveFloor = $(`${giveTower} article:first-of-type`).detach();
            $(getTower).prepend(moveFloor);
            let progressString = "";

            if(giveTower == towerIdArray[0][0]) {
                progressString += `${s}: ${towerIdArray[0][1]}�먯꽌 <span>${moveFloor[0].id[10]}痢�</span>��`;
            } else if(giveTower == towerIdArray[1][0]) {
                progressString += `${s}: ${towerIdArray[1][1]}�먯꽌 <span>${moveFloor[0].id[10]}痢�</span>��`;
            } else if(giveTower == towerIdArray[2][0]) {
                progressString += `${s}: ${towerIdArray[2][1]}�먯꽌 <span>${moveFloor[0].id[10]}痢�</span>��`;
            }

            if(getTower == towerIdArray[0][0]) {
                progressString += ` ${towerIdArray[0][1]}濡� �대룞`;
            } else if(getTower == towerIdArray[1][0]) {
                progressString += ` ${towerIdArray[1][1]}濡� �대룞`;
            } else if(getTower == towerIdArray[2][0]) {
                progressString += ` ${towerIdArray[2][1]}濡� �대룞`;
            }
            $(`#progressBox`).append(`<div><p>${progressString}</p></div>`);
        s++;
        let endNumber = Math.pow(2, inputNumber)-1;
        if(endNumber == s) {
            setTimeout(()=>{
                $(`#progressBox`).append(`<div><p class="endProgress">醫낅즺�섏뿀�듬땲��.</p></div>`);
                $(`#progressBox`).append(`<div><p class="endProgress">�대룞�잛닔�� 珥� ${endNumber}�뚯엯�덈떎.</p></div>`);
            },setTime+100);
        }
        },setTime * i);
        i++;
    }
    function hanoiTower(n, firstArray, secondArray,thirdArray,
        firstTower, secondTower, thirdTower,setTime) {
        if (n == 1) {
            moveFloor(1, firstArray, secondArray,firstTower, secondTower,setTime);
        } else {
            hanoiTower(n-1,firstArray,thirdArray,secondArray, firstTower,thirdTower,secondTower,setTime);
            moveFloor(1,firstArray,secondArray,firstTower,secondTower,setTime);
            hanoiTower(n-1,thirdArray,secondArray,firstArray,thirdTower,secondTower,firstTower,setTime);
        }
    }
    
    $(`#speedArticle`).click((e)=>{
        switch(e.target.id) {
            case `fastButton` :
                $(`#defaultButton`).removeClass('selectButton');
                $(`#slowButton`).removeClass('selectButton');
                $(`#${e.target.id}`).attr('class','selectButton');
                $(`.selectButton`).css(`background`,`#111111`);
                $(`.selectButton`).css(`color`,`#ececec`);
                $(`#defaultButton`).css(`background`,`transparent`);
                $(`#defaultButton`).css(`color`,`#111111`);
                $(`#slowButton`).css(`background`,`transparent`);
                $(`#slowButton`).css(`color`,`#111111`);

                break;
            case `defaultButton` :
                $(`#fastButton`).removeClass('selectButton');
                $(`#slowButton`).removeClass('selectButton');
                $(`#${e.target.id}`).attr('class','selectButton');
                $(`.selectButton`).css(`background`,`#111111`);
                $(`.selectButton`).css(`color`,`#ececec`);
                $(`#fastButton`).css(`background`,`transparent`);
                $(`#fastButton`).css(`color`,`#111111`);
                $(`#slowButton`).css(`background`,`transparent`);
                $(`#slowButton`).css(`color`,`#111111`);
                break;
            case `slowButton` :
                $(`#fastButton`).removeClass('selectButton');
                $(`#defaultButton`).removeClass('selectButton');
                $(`#${e.target.id}`).attr('class','selectButton');
                $(`.selectButton`).css(`background`,`#111111`);
                $(`.selectButton`).css(`color`,`#ececec`);
                $(`#fastButton`).css(`background`,`transparent`);
                $(`#fastButton`).css(`color`,`#111111`);
                $(`#defaultButton`).css(`background`,`transparent`);
                $(`#defaultButton`).css(`color`,`#111111`);
                break;
        }
    });

    $(`#stopButton`).click(()=>{
        location.reload(true);
    });

    $(`#startButton`).click(()=>{
        inputNumber = $(`#inputNumber`).val();
        let setTime = 0;

        if($(`.selectButton`).html() == "鍮좊Ⅴ寃�") {
            setTime += 250;
        } else if($(`.selectButton`).html() == "�먮━寃�") {
            setTime += 1000;
        } else if($(`.selectButton`).html() == "蹂댄넻") {
            setTime += 500;
        }

        if(inputNumber >= 11 || inputNumber <= 0) {

            $(`#errorSection`).css(`visibility`,`visible`);
            $(`#errorArticle p`).html(`0遺��� 10源뚯��� �レ옄瑜� �낅젰�댁＜�몄슂.`);

            setTimeout(()=>{
                $(`#errorSection`).css(`visibility`,`hidden`);
            },500);
        } else if (setTime == 0) {
            $(`#errorSection`).css(`visibility`,`visible`);
            $(`#errorArticle p`).html(`�띾룄瑜� �ㅼ젙�댁＜�몄슂.`);
            setTimeout(()=>{
                $(`#errorSection`).css(`visibility`,`hidden`);
            },500);
        } else {
            $(`#stopButton`).css(`display`,`block`);
            $(`#startButton`).css(`display`,`none`);
            $(`#speedArticle`).css(`display`,`none`);
            $(`#inputArticle`).css(`display`,`none`);
            $(`#speedMessage`).css(`display`,`none`);
            $(`#progressBox`).css(`height`,`40vmin`);
            $(`#logMessage`).css(`margin-top`,`1vmin`);
            $(`#startMessage`).html(`<i class="xi-mouse mouseIcon"></i>�대┃ �� 泥� �붾㈃�쇰줈 �뚯븘媛묐땲��.`)
            $(`#buttonArticle`).css(`width`,`30vmin`);
            $(`#buttonArticle`).css(`align-items`,`center`);
            $(`#startMessage`).css(`justify-content`,`center`);
            $(`#startMessage`).css(`width`,`30vmin`);
            $(`#inputButtonArticle`).css(`justify-content`,`center`);

            let firstTower = "#firstTower";
            let secondTower = "#secondTower";
            let thirdTower = "#thirdTower";
            let firstArray = [];
            let secondArray = [];
            let thirdArray = [];

            setTimeout(()=>{
                $(`#progressBox`).append(`<div><p class="startProgress">�대룞�� �쒖옉�⑸땲��.</p></div>`);
                setTimeout(()=>{
                hanoiTower(inputNumber,firstArray,thirdArray,secondArray,
                firstTower, thirdTower, secondTower,setTime);
                },750);
            },250);

            for(j=0; j<inputNumber; j++) {
                $(`#firstTower`).append(`<article id="towerFloor${j+1}"><div></div></article>`)
                $(`#towerFloor${j+1}`).css(`width`,`${2+(j*3)}vmin`);
                $(`#towerFloor${j+1}`).css(`height`,`${4+j}vmin`);
                $(`#towerFloor${j+1} div`).css(`height`,`${1+j}vmin`);
                $(`#towerFloor${j+1}`).css(`background-color`,`rgb(${250-(j*20)},${200-(j*5)},25)`);
                $(`#towerFloor${j+1}`).css(`margin-top`,`-${j}vmin`);
                $(`#towerFloor${j+1}`).css(`z-index`,`${100-j}`);
            }
        }
    });
});
