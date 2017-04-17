
//CREATE COOKIE
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//READ PARAMETER FROM COOKIE
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//ASK FOR NAME AND CODE
// function checkUser() {
//     var username = getCookie("username");
//     if (username !== "") {
//         alert("Welcome again " + username);
//     } else {
//         username = prompt("Please enter your name:", "");
//         if (username !=="" && username !== null) {
//             setCookie("username", username);
//         }
//     }
// }

//READ USER PROGRESS CODE
function readProgCode() {
    var oldUserProgCodeVal = getCookie("progCode");
    var userProgCodeVal = document.getElementById("progCodeInput").value;
    alert("Your progress code: " + userProgCodeVal + " has been sucesfully loaded." + "\nOld code was: " + oldUserProgCodeVal);
    setCookie("progCode", userProgCodeVal, 10);
}

//READ USER NAME
function readUserName() {
    var oldUserName = getCookie("userName");
    var userName = document.getElementById("userNameInput").value;
    if (oldUserName === userName) {
        alert("Hello " + userName + "! We already know Your name, so You don't have to submit it again :)");
    } else {
        alert("You have sumbitted name: " + userName + ". We do remember you as " + oldUserName + ". Are we wrong?");
    }
    setCookie("userName", userName, 10);
}

// ASK FOR NAME, WHEN FIRST ARTICLE CLICKED
//button(onclick="")
function askForName() {
    var userName = getCookie("userName");
    if (userName === "") {
        userName = prompt("Please share with us Your name, so we can know You better ;)\n ..and save your progress!", "");
    }
}