$(document).ready(function() {
    // 愿�由ъ옄 �섏씠吏� 鍮꾨�踰덊샇 李� �꾩슦湲� �대깽��
    $('.xi-info-o').click(function() {
        $('#loginPage').css('visibility', 'visible');
        //$('#loginPage').fadeIn(300);
    });
    $('.xi-close-circle-o').click(function() {
        $('#loginPage').css('visibility', 'hidden');
    });

    $(`#inBtn`).click(()=>{
        var clickTime = new Date();
        var clickHours = clickTime.getHours();
        var clickMinutes = clickTime.getMinutes();
        var clickSeconds = clickTime.getSeconds();
        localStorage.setItem('clickHours', clickHours);
        localStorage.setItem('clickMinutes', clickMinutes);
        localStorage.setItem('clickSeconds', clickSeconds);
        location.replace('/in');
    });

    $(`#outBtn`).click(()=>{
        var clickTime = new Date();
        var clickHours = clickTime.getHours();
        var clickMinutes = clickTime.getMinutes();
        var clickSeconds = clickTime.getSeconds();
        localStorage.setItem('clickHours', clickHours);
        localStorage.setItem('clickMinutes', clickMinutes);
        localStorage.setItem('clickSeconds', clickSeconds);
        location.replace('/out');
    });

    //鍮꾨�踰덊샇 �낅젰 �ㅽ뙣�� �대깽��
    let password = '';

    let numPad = $('#loginPageNum > article:nth-child(-n+3) > button');
    $(numPad).each(function(index) {
        $(this).click(function() {
            $(this).css('background','rgb(210,210,210)');
            setTimeout(()=>{
                $(this).css(`background`,`rgb(250,250,250)`)
            },200)
            $('input[name=inNum]').css('color', 'black');
            $('input[name=inNum]').css('font-size', '6rem');
            console.log(this);
            password += $(this).html();
            $('input[name=inNum]').val(password);
            password = $('input[name=inNum]').val();
            if(password.length == 4) {
                if(password == '9999') {
                    setTimeout(function() {location.replace('/manage')}, 200);
                } else {
                    password= '';
                $('input[name=inNum]').val('�쀫퉬諛�踰덊샇媛� ���몄뒿�덈떎.��');
                $('input[name=inNum]').css('color', 'rgb(231, 67, 89)');
                $('input[name=inNum]').css('font-size', '5rem');
                }
            }
        })
    });
    let zero = $('#loginPageNum > article:nth-child(4) > button:nth-child(2)');
    $(zero).click(function() {
        $(this).css('background','rgb(210,210,210)');
        setTimeout(()=>{
            $(this).css(`background`,`rgb(250,250,250)`)
        },200)
        password += zero.html();
        $('input[name=inNum]').val(password);
        $('input[name=inNum]').css('color', 'black');
        $('input[name=inNum]').css('font-size', '6rem');
        console.log(0);
        if(password.length == 4) {
            if(password == '9999') {
                setTimeout(function() {location.replace('/manage')}, 200);
            } else {
                password= '';
            $('input[name=inNum]').val('�쀫퉬諛�踰덊샇媛� ���몄뒿�덈떎.��');
            $('input[name=inNum]').css('color', 'rgb(231, 67, 89)');
            $('input[name=inNum]').css('font-size', '5rem');
            }
        }
    });

    $('#pwdReset').click(function() {
        $(this).css('background','rgb(210,210,210)');
        setTimeout(()=>{
            $(this).css(`background`,`rgb(250,250,250)`)
        },200)
        password = '';
        $('input[name=inNum]').val('');
        console.log('珥덇린��');
        password = $('input[name=inNum]').val();
    });

    $('#pwdDelete').click(function() {
        $(this).css('background','rgb(210,210,210)');
        setTimeout(()=>{
            $(this).css(`background`,`rgb(250,250,250)`)
        },200)
        console.log($('input[name=inNum]').val().length);
        password = $('input[name=inNum]').val().substring(0, $('input[name=inNum]').val().length-1) ;
        $('input[name=inNum]').val(password);
        password = $('input[name=inNum]').val();
    }); 

});