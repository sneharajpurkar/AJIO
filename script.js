function register(event) {
    event.preventDefault();
    // getting data from html to js
    var userName = document.getElementById("userName").value;
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;
    var userData = { name: userName, email: userEmail, password: userPassword }

    // storing data from js to ls
    var dataFromLS = JSON.parse(localStorage.getItem("userData")) || [];
    console.log(dataFromLS, 'dataFromLS')
    var flag = false;
    
    for (var i = 0; i < dataFromLS.length; i++) {
        if (dataFromLS[i].email === userEmail) {
            flag = true;
        }
    }
    if (flag === true) {
        alert("Email already Present, User another one.")
    } else if (userPassword.length < 1 && userName.length < 1 && userEmail < 1) {
        alert("Must Fill all fields!")
    } else if (userPassword.length < 8) {
        alert("Password must be more than 8 Digit!")
    } else {
        dataFromLS.push(userData);
        localStorage.setItem("userData", JSON.stringify(dataFromLS));
        document.getElementById("userName").value = '';
        document.getElementById("userEmail").value = '';
        document.getElementById("userPassword").value = '';
        window.location.href = "/register.html";
        alert("Registration Done.");
    }
}

function login(event) {
    event.preventDefault();
    var userEmail = document.getElementById("email").value;
    var userPassword = document.getElementById("password").value;
    
    var datafromLS = JSON.parse(localStorage.getItem("userData"));

    var flag = false;
    for (var i = 0; i < datafromLS.length; i++) {
        if (datafromLS[i].email === userEmail && datafromLS[i].password === userPassword) {
            flag = true;
        }
    }
    if (flag === true) {
        document.getElementById("email").value = '';
        document.getElementById("password").value = '';
        var user = {};
        user["current-user-email"] = userEmail ;
        localStorage.setItem("current-user", JSON.stringify(user))
        window.location.href = "/show-products.html";
        alert("Logged in successfull.")
    } else {
        alert("Wrong cred, Please check your email and password.");
    }
}

var gettingEmail;

function forgetPassword() {
    var dataFromLS = JSON.parse(localStorage.getItem("userData"));
    var userEmail = document.getElementById("email").value;
    gettingEmail = userEmail;
    var flag = false;
    for (var i = 0; i < dataFromLS.length; i++) {
        if (dataFromLS[i].email === userEmail) {
            flag = true;
        }
    }

    if (flag === true) {
        var newCode = `<input type="password" id="password" /><br/><button onclick="newPassword()">Set new Password</button>`
        var divFromHtml = document.getElementById("change")
        divFromHtml.innerHTML = newCode;
        alert("Now Set new password...")
    } else {
        alert("Your email not in our db, check email again.")
    }

}

function newPassword() {
    var userPassword = document.getElementById("password").value;
    var dataFromLS = JSON.parse(localStorage.getItem("userData"));

    for (var i = 0; i < dataFromLS.length; i++) {
        if (dataFromLS[i].email === gettingEmail) {
            dataFromLS[i].password = userPassword
        }
    }

    localStorage.setItem('userData', JSON.stringify(dataFromLS));
    gettingEmail = "";
    window.location.href = '/login.html';
    alert('Password Changed, Now login.')
}



function addToLS(){
    var proName = document.getElementById("name").value;
    var proImage = document.getElementById("image").value;
    var proPrice = document.getElementById("price").value;

    var product = { name:proName, price:proPrice , image:proImage }

    var dataFromLS = JSON.parse(localStorage.getItem("products")) || [] ; 
    dataFromLS.push(product);

    localStorage.setItem("products", JSON.stringify(dataFromLS));
    alert("Product submited!")

}
