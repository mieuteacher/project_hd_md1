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

function renderData(userList){
    let htmlStr = ``;
    for(let i = 0; i < userList.length; i++) {
        htmlStr += `
            <tr>
                <th scope="row">${i + 1}</th>
                <td>${userList[i].userName}</td>
                <td>${userList[i].status ? "bình thường" : "tạm khóa"}</td>
                <td>
                    <button onclick="changeStatusUser(${userList[i].id})">block / unlock</button>
                </td>
            </tr>
        `
    }
    document.querySelector("#user_box").innerHTML = htmlStr;
}

function changeStatusUser(userId) {
    let userList = JSON.parse(localStorage.getItem("userList"));
    for(let i = 0; i < userList.length; i++) {
        if(userList[i].id == userId) {
            userList[i].status = !userList[i].status;
            break
        }
    }
    localStorage.setItem("userList", JSON.stringify(userList))
    renderData()
}

function addUser() {
    let newUser = {
        id: Date.now(),
        userName: window.prompt("Nhập user name"),
        password: window.prompt("Nhập password"),
        status: true
    }

    let userList = JSON.parse(localStorage.getItem("userList"));
    userList.push(newUser)
    localStorage.setItem("userList", JSON.stringify(userList))
    changePage(0)
}


// phân trang

let limit = 3; // một trang có 3 user
let nowPage = 0;


function printPageList() {
    let userList = JSON.parse(localStorage.getItem("userList"));
    let pageCount = Math.ceil(userList.length / limit);

    let pageBtnList = ``;
    for(let i = 0; i < pageCount; i++) {
        pageBtnList += `
            <button onclick="changePage(${i})" style="color: ${nowPage == i ? "red" : ""}">${i}</button>
        `
    }
    document.querySelector(".page_list").innerHTML = pageBtnList;
}

// [0,1,2,3,4,5,6]

printPageList()

function loadPageData() {

    let userList = JSON.parse(localStorage.getItem("userList"));
    // 0 // 1
    let start = nowPage * limit;  // 0 // 3
    let end = start + limit; // 3 // 6

    let pageDataList = [];
    for(let i = start; i < end; i++) {
        console.log("userList[i]", userList[i])
        if(userList[i]) {
            pageDataList.push(userList[i])
        }else {
            break
        }
        

    }

    renderData(pageDataList)
}

loadPageData()

function changePage(page) {
    nowPage = page;
    printPageList()
    loadPageData()
}

function search(event) {
    let inputSearch = event.target.value;
    console.log("đã vào", inputSearch)
    let userList = JSON.parse(localStorage.getItem("userList"));

    let seatchResult = [];

    for(let i in userList) {
        if(userList[i].userName.includes(inputSearch)) {
            seatchResult.push(userList[i])
        }
    }


    renderData(seatchResult)
}