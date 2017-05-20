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

//READ USER PROGRESS CODE FROM COOKIE
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
// CODING ACHIEVMENTS INTO NUMBER

// covert to binary
function con2bin(decNo) {
    var num = Number(decNo);

    if(num>= 0) {
        return num.toString(2);
    }
    else {
        return (~num).toString(2);
    }
}
function alertNo() {
    var dummyNo = document.getElementById("dummyNo").value;
    alert("Your number was: " + dummyNo + "; It has deen converted to: " + con2bin(dummyNo));
}
// convert to decimal
function con2dec(binNo) {
    var num = parseInt(binNo,2);

    if(num>= 0) {
        return num.toString(10);
    }
    else {
        return (~num).toString(10);
    }
}
function alertBinNo() {
    var dummyNo = document.getElementById("dummyBinNo").value;
    alert("Your number was: " + dummyNo + "; It has deen converted to: " + con2dec(dummyNo));
}
//decode progress code
function progCd2bin(progCode) {
    var partStr;
    var binProgCode = "";
        for(var i = 0; i < progCode.length; i++) {
                partStr = progCode.substring(i,i+2);
                if (progCode.charAt(i) === "-") {
                    binProgCode = binProgCode.slice(0, -1);
                    binProgCode += "-";
                    i = i - 1;
                } else {
                    binProgCode += con2bin(partStr);
                    binProgCode += ".";
                }
                i = i + 1;
         }
         binProgCode = binProgCode.slice(0, -1);
       
         return(binProgCode);
}
function alertProgCode() {
    var dummyNo = document.getElementById("dummyProgCode").value;
    alert("Your number was: " + dummyNo + "; It has deen converted to: " + progCd2bin(dummyNo));
}
//code progress code
function progCd2dec(progCode) {
    var partStr;
    var decProgCode = "";
        for(var i = 0; i < progCode.length; i++) {
                partStr = progCode.substring(i,i+6);
                decProgCode += con2dec(partStr);
                
                if (progCode.charAt(i + 6) === "-") {
                    decProgCode += "-";
                }
                i = i + 6;
            
         }      
         return(decProgCode);
}