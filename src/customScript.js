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


//READ AND WRITE USER PROGRESS CODE FROM INPUT

function readProgCode() {
    var userProgCodeVal = document.getElementById("progCodeInput").value;
    writeProgCode(userProgCodeVal);
}

//SHOW AND RETURN PROGRESS CODE
function getProgCode() {
    var progCode = getCookie("progCode");
    //alert(progCode);
    return(progCode);
}

//SET COOKIE WITH PROGRESS CODE (and color)
function writeProgCode(progCode) {
    var oldUserProgCodeVal = getCookie("progCode");
    var oldColor = getCookie("color");
    if (oldUserProgCodeVal !== "") {
        //if (confirm("Your latest progress was: " + "50%" + ". Your code shows progress of " + "40%" + ". Are you sure, you want to apply it?")) {
            setCookie("progCode", progCode, 10);
        //}

    } else {
        alert("Your progress code: " + progCode + " has been sucesfully loaded.");
        setCookie("progCode", progCode, 10);
    }
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
// <<<<<<< HEAD
                    i = i - 1;
                } else {
                    var addTemp = con2bin(partStr);
                    var add = "";
                    for(var j = 0; j < (6 - addTemp.length); j++) {
                        add += 0;
                    }
                    add += con2bin(partStr);
                    binProgCode += add;
                }
                i = i + 1;
         }       
// =======
//                     binProgCode = binProgCode.slice(0, -1);
//                     binProgCode += "-";
//                     i = i - 1;
//                 } else {
//                     binProgCode += con2bin(partStr);
//                     binProgCode += ".";
//                 }
//                 i = i + 1;
//          }
//          binProgCode = binProgCode.slice(0, -1);
       
// >>>>>>> origin/marta
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
// <<<<<<< HEAD

    for(var i = 0; i < progCode.length; i++) {                        
        if (i*2 % 36 === 0 && i>1) {
            decProgCode += "-";
        }
        partStr = progCode.substring(i,i+6);
        var add = con2dec(partStr);
        if (add<10) {
            add += "0";
        }
        decProgCode += add;
 
        i = i + 5; 
    }              
    return(decProgCode);
}

//AFTER CLICKED  

function complete(x) {
    x.style.background="#000000";
    var clickedId = Number(x.getAttribute('id')) - 1;
    var progCode = getProgCode();
    var binProgCode = progCd2bin(progCode);
    var arr = binProgCode.split("");
    alert(clickedId + " " + binProgCode + " " + progCd2dec(binProgCode));
    if (binProgCode.charAt(clickedId) === "0") {
        arr.splice(clickedId, 1, "1");
    } else {
        arr.splice(clickedId, 1, "0");
    }
    binProgCode = arr.join("");
    
    progCode = progCd2dec(binProgCode);
    alert(clickedId + " " + binProgCode + " " + progCode);
    writeProgCode(progCode);
}  

//asdasda
// =======
//         for(var i = 0; i < progCode.length; i++) {
//                 partStr = progCode.substring(i,i+6);
//                 decProgCode += con2dec(partStr);
                
//                 if (progCode.charAt(i + 6) === "-") {
//                     decProgCode += "-";
//                 }
//                 i = i + 6;
            
//          }      
//          return(decProgCode);
// }
// >>>>>>> origin/marta
