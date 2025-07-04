    $(`#printButton`).click(()=>{
        console.log(1);
        let printContents = document.getElementById('modalBox').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        location.reload();
        //document.body.innerHTML = originalContents;
    })

$(document).ready(()=>{

//二쇱감�� 怨� �뚯깋�쇰줈 �쒖떆
let areaArray = [];
$.getJSON("js/json/useAreaData.json", (jsonData) => {
    $.each(jsonData, (index, item) => {
        areaArray.push(item.use_area);
    });
    let arr = [];
    for(i=0; i<areaArray.length; i++) {

        let innerArr = [];
        if(areaArray[i][0] == "A") {
            innerArr.push(0,parseInt(areaArray[i][2]));
        } else if(areaArray[i][0] == "B") {
            innerArr.push(1,parseInt(areaArray[i][2]));
        } else if(areaArray[i][0] == "C") {
            innerArr.push(2,parseInt(areaArray[i][2]));
        } else if(areaArray[i][0] == "D") {
            innerArr.push(3,parseInt(areaArray[i][2]));
        }
        arr[i] = innerArr;
    }

    for(i=0; i<arr.length; i++) {
        $(`article.parkingBoxArticle:eq(${arr[i][0]})
        div:nth-child(${arr[i][1]})`)
        .css("background-color","rgb(100,100,100)");
    }
    });
    //怨듯넻 �대┃ �대깽�� switch-case臾몄쑝濡� 紐⑥쓬
    $(document).click((e)=>{

        switch(e.target.id) {
            case "inBtn" :
                $('#inBtn').css(`background`,`rgb(67,83,182)`)
                $('#inBtn').css(`box-shadow`,`inset 0.8rem 0.8rem 2rem 0.1rem rgba(20, 20, 20, 0.1)`)
                setTimeout(()=>{
                    $('#inBtn').css(`background`,`rgb(110, 124, 212)`)
                    $('#inBtn').css(`box-shadow`,`inset 0.8rem 0.8rem 2rem 0.1rem rgba(255, 255, 255, 0.25)`)
                },200)
                document.location.href('/in');
                let inTime = new Date();
                let inHours = time.getHours();
                let inMinutes = time.getMinutes();
                let inSeconds = time.getSeconds();
                localStorage.setItem('clickHours',inHours);
                localStorage.setItem('clickMinutes',inMinutes);
                localStorage.setItem('clickSeconds',inSeconds);
                break;
            case "outBtn" :
                $('#outBtn').css(`background`,`rgb(207, 31, 55)`)
                $('#outBtn').css(`box-shadow`,`inset 0.8rem 0.8rem 2rem 0.1rem rgba(20, 20, 20, 0.1)`)
                setTimeout(()=>{
                    $('#outBtn').css(`background`,`rgb(228,100,117)`)
                    $('#outBtn').css(`box-shadow`,`inset 0.8rem 0.8rem 2rem 0.1rem rgba(255, 255, 255, 0.25)`)
                },200)
                document.location.href('/out');
                let outTime = new Date();
                let outHours = time.getHours();
                let outMinutes = time.getMinutes();
                let outSeconds = time.getSeconds();
                localStorage.setItem('clickHours',outHours);
                localStorage.setItem('clickMinutes',outMinutes);
                localStorage.setItem('clickSeconds',outSeconds);
                break;
            case "returnButton" :
                document.location.href="/main"
                break;
        }
    });
    /*
    $(`#printButton`).click(()=>{
        console.log(1);
        let printContents = document.getElementById('modalBox').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        location.reload();
        //document.body.innerHTML = originalContents;
    })*/
});