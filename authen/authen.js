const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

function signUp(event) {
    event.preventDefault();
    let newUser = {
        id: Date.now(),
        userName: event.target.userName.value,
        password: event.target.password.value,
        status: true
    }

    if(newUser.password != event.target.passwordAgain.value) {
        alert("Mật khẩu nhập lại và mật khẩu không trùng khớp!")
        return;
    }

    if(newUser.userName == "") {
        alert("User Name không thể bỏ trống")
        return;
    }

    
    if(newUser.password == "") {
        alert("Password không thể bỏ trống")
        return;
    }

    let userList = JSON.parse(localStorage.getItem("userList"));
    userList.push(newUser)
    localStorage.setItem("userList", JSON.stringify(userList))


    alert("Bạn đã đăng ký thành công")
    container.classList.remove("right-panel-active");
}

function signIn(event) {
    event.preventDefault();
    let userInfor = {
        userName: event.target.userName.value,
        password: event.target.password.value
    }

    let userList = JSON.parse(localStorage.getItem("userList"));

    let userResult = null;
    for(let i = 0; i < userList.length; i++) {
        if(userList[i].userName == userInfor.userName) {
            userResult = userList[i];
            break;
        }
    }

    if(!userResult) {
        alert("Người dùng không tồn tại!")
        return;
    }

    if(userResult.password != userInfor.password) {
        alert("Mật khẩu không chính xác!")
        return;
    }

    if(!userResult.status) {
        alert("Tài khoản đã bị khóa")
        return;
    }

    localStorage.setItem("userLogin", JSON.stringify(userResult))
    window.location.href = "/"
}