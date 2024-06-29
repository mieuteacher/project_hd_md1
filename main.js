// let userList = [
//     {
//         id: Date.now(),
//         userName: "admin",
//         password: "123",
//         status: true
//     },
//     {
//         id: Date.now(),
//         userName: "member",
//         password: "123",
//         status: true
//     }
// ]

// localStorage.setItem("userList", JSON.stringify(userList))

let userLogin = JSON.parse(localStorage.getItem("userLogin"));

function logout() {
    localStorage.removeItem("userLogin");
    window.location.href = '/authen'
}

function renderHeader() {
    document.querySelector("header").innerHTML = `
        <span onclick="window.location.href='/'">AMS</span>
        <div class="user_box">
            <span>Hi, ${userLogin.userName}!</span>
            <button onclick="logout()" class="btn btn-danger">logout</button>
        </div>
    `
}

renderHeader()