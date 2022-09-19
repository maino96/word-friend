

// 로그인
function login(){

    let jsonData = {
        'id': $('#id').val(),
        'pw': $('#password').val()
    }

    $.ajax({
    type: "POST",
    url: "/login",
    data: JSON.stringify(jsonData),
    dataType: "JSON",
    contentType: "application/json; charset=utf-8",
    success: function (response) {
        alert(response.msg);
        if(response.result ==='success'){
            document.location.href = '/';
        }
    }
    });
}

function logout(){
    $.ajax({
        type: "POST",
        url: "/logout",
        data: {},
        success: function (response) {
            alert('로그아웃 되었습니다.');
            document.location.href = '/';
        }
    }); 
}

function go_signup(){

    //유효성 체크
    let uid = $('#id').val();
    let pw = $('#password').val();
    let confirm = $('#confirm').val();

    //id체크
    if(uid === undefined || uid ===''){
        alert('아이디를 입력하세요!');
        $('#id').focus();
        return false;
    }

    //pw체크
    if(pw === undefined || pw ===''){
        alert('비밀번호를 입력하세요!');
        $('#password').focus();
        return false;
    }

    if(pw === confirm){

        //비밀번호 일치 시 회원가입
        let jsonData = {
            'id':uid,
            'pw':pw
        }

        $.ajax({
            type: "POST",
            url: "/sign_up",
            data: JSON.stringify(jsonData),
            dataType: "JSON",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                alert(response.msg)
                document.location.href = '/login';
            }
        });
    }else{
        alert('비밀번호가 일치하지 않습니다!');
        $('#confirm').focus();
        return false;
    }

    
}


$(document).ready(function () {

    //로그인 확인
    $.ajax({
        type: "POST",
        url: "login_check",
        data: {},
        success: function (response) {
            let responseData = response.loginData;

            //로그인 여부에 따라서 메뉴에 로그인/로그아웃 버튼으로 변경
            if(responseData !== 'notlogin'){
                $('#login').attr('href','').attr('onclick','logout()').text('로그아웃');
                $('#signup').hide();
            }
        }
      }); 

});