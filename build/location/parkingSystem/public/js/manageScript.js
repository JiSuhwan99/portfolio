$(document).ready(()=>{
$.getJSON("./js/json/parkingSystemData.json", (jsonData) => {
let parkingSystemArray = [];

    $.each(jsonData, function(value,object){
        let innerArray = [];
        innerArray.push(object.record_num);
        innerArray.push(object.car_num);
        innerArray.push(object.entrance_time);
        innerArray.push(object.use_area);
        if(object.exit_time != null) {
            innerArray.push(object.exit_time);
            innerArray.push(object.sale_amount);
        } else {
            innerArray.push(" ");
            innerArray.push(" ");
        }
        parkingSystemArray.push(innerArray);
    });
    let totalSaleAmount = 0;
    if(parkingSystemArray.length <= 18) {
        for(i=0; i<parkingSystemArray.length; i++) {
            $(`#infoCarnumberCell${i+1}`).append(`<p>${parkingSystemArray[i][1]}</p>`)
            $(`#infoIntimeCell${i+1}`).append(`<p>${parkingSystemArray[i][2]}</p>`)
            $(`#infoOutimeCell${i+1}`).append(`<p>${parkingSystemArray[i][4]}</p>`)
            if(parkingSystemArray[i][5] == " ") {
                $(`#infoAmountCell${i+1}`).append(`<p>${parkingSystemArray[i][5]}</p>`)
            } else {
                let parkingSystemAmount = parkingSystemArray[i][5];
                $(`#infoAmountCell${i+1}`).append(`<p>${parkingSystemAmount.toLocaleString(`ko-KR`)}<span>��</span></p>`)
            }
            totalSaleAmount = totalSaleAmount + Number(parkingSystemArray[i][5]);
        }
    } else {
        for(j=0; j<parkingSystemArray.length-18; j++) {
            $(`#infoField1`).append(`<div id="infoCarnumberCell${18+(j+1)}"></div>`)
            $(`#infoField2`).append(`<div id="infoIntimeCell${18+(j+1)}"></div>`)
            $(`#infoField3`).append(`<div id="infoOutimeCell${18+(j+1)}"></div>`)
            $(`#infoField4`).append(`<div id="infoAmountCell${18+(j+1)}"></div>`)
        }

        for(k=0; k<parkingSystemArray.length; k++) {
            $(`#infoCarnumberCell${k+1}`).append(`<p>${parkingSystemArray[k][1]}</p>`)
            $(`#infoIntimeCell${k+1}`).append(`<p>${parkingSystemArray[k][2]}</p>`)
            $(`#infoOutimeCell${k+1}`).append(`<p>${parkingSystemArray[k][4]}</p>`)
            if(parkingSystemArray[k][5] == " ") {
                $(`#infoAmountCell${k+1}`).append(`<p>${parkingSystemArray[k][5]}</p>`)
            } else {
                let parkingSystemAmount = parkingSystemArray[k][5];
                $(`#infoAmountCell${k+1}`).append(`<p>${parkingSystemAmount.toLocaleString(`ko-KR`)}<span>��</span></p>`)
            }
            totalSaleAmount = totalSaleAmount + Number(parkingSystemArray[k][5]);
        }
    }
    

    $(`#revenueBoxTcar`).append(`<p>${parkingSystemArray.length}</p>`)
    $(`#revenueBoxTamount`).append(`<p>${totalSaleAmount.toLocaleString(`ko-KR`)}<span>��</span></p>`)
});
});