//INITIALL SETUP
    window.onload = function() {
        setCookie("progCode", "600000-000000", 10);
        setCookie("userName", "Andrzej", 10);

        fillFields();
        configureSite();
        countPoints();

        document.getElementById("askNamePu").style.visibility = "hidden";
        document.getElementById("successPu").style.visibility = "hidden";
        document.getElementById("failurePu").style.visibility = "hidden"; 
        document.getElementById("questionPu").style.visibility = "hidden"; 
    };

//BASIC OPERATIONS ON COOKIES
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
//WORKING WITH INPUTS
    //READ AND WRITE USER PROGRESS CODE FROM INPUT
    function readProgCode() {
        var userProgCodeVal = document.getElementById("progCodeInput").value;
        writeProgCode(userProgCodeVal);
        fillFields();
    }
    //SET COOKIE WITH PROGRESS CODE (and color)
    function writeProgCode(progCode) {
        var oldUserProgCodeVal = getCookie("progCode");
        //var oldColor = getCookie("color");
        if (oldUserProgCodeVal !== "") {
            //if (confirm("Your latest progress was: " + "50%" + ". Your code shows progress of " + "40%" + ". Are you sure, you want to apply it?")) {
                setCookie("progCode", progCode, 10);
            //}

        } else {
            alert("Your progress code: " + progCode + " has been sucesfully loaded.");
            setCookie("progCode", progCode, 10);
        }
    }
    
//WORKING WITH USERS
    //LOAD USER
    function loadUser(userName) {
        var progCode;
        var exUsers = getCookie("users");
        //alert(userName + ' ' + progCode);
        var exUsersArr;
        //var exUsersNew;
        //var exUsersNewArr;
        if (cookieEx("users")) {
            exUsersArr = exUsers.split("//");
            var exist = 0;
            var pos = 999;
            for (i=0; i<exUsersArr.length; i++) {
                if (exUsersArr[i] == userName) {
                    exist = 1;
                    pos = i;
                }
            }
            if (exist === 1) {
                //exUsersArr.Splice(pos + 1,1);
                progCode = exUsersArr[pos + 1];
                alert("Nowy uzytkownik znaleziony na pozycji: " + pos + "! Czytam prog code: " + exUsersArr[pos + 1] + " dla uzytkownika: " + exUsersArr[pos]);
                setCookie("progCode", progCode, 10);
                return progCode;
            } else {
                alert("Nowy uzytkownik nie znaleziony - nowy uzytkownik serwisu");
                setCookie("progCode", "000000-000000-000000", 10);
                return "000000-000000-000000";
            }
        } 
    }
    //REMEMBER USER
    function rememberUser(userName, progCode) {
        //setCookie("users", "" , 10); //CLEANER
        //alert(userName + ' ' + progCode);
        var exUsersArr;
        var exUsersNew;
        var exUsersNewArr;
        if (cookieEx("users")) {
            var exUsers = getCookie("users");
            exUsersArr = exUsers.split("//");
            var exist = 0;
            var pos = 999;
            for (i=0; i<exUsersArr.length; i++) {
                if (exUsersArr[i] == userName) {
                    exist = 1;
                    pos = i;
                }
            }
            if (exist === 1) {
                //exUsersArr.Splice(pos + 1,1);
                exUsersArr[pos + 1] = progCode;
                alert("Stary uzytkownik znaleziony na pozycji: " + pos + "! Wpisuje prog code: " + exUsersArr[pos + 1] + " dla uzytkownika: " + exUsersArr[pos]);
                exUsersNewArr = exUsersArr;
                exUsersNew = exUsersNewArr.join("//");
                setCookie("users", exUsersNew, 10);
            } else {
                exUsersNewArr = exUsersArr.concat([userName, progCode]);
                exUsersNew = exUsersNewArr.join("//");
                setCookie("users", exUsersNew, 10);
                alert("Stary uzytkownik nie znalecony");
            }
        } else {
        exUsersNewArr = [userName, progCode];    
        exUsersNew = exUsersNewArr.join("//");
        setCookie("users", exUsersNew, 10);
        }

        for (f = 0; f < exUsersNewArr.length; f++) {
            alert(f + " [" + exUsersNewArr[f] + "]-[" + exUsersNewArr[f + 1]+ "]");
            f = f + 1;
        }
    }
    //READ USER NAME
    function readUserName() {
        var userName = document.getElementById("userNameInput").value;
        var progCode;
        var oldUserName;
        var oldProgCode;
        if (cookieEx("userName")) {
            oldUserName = getCookie("userName");
        } else {
            oldUserName = "my friend";
        }
        if (cookieEx("progCode")) {
            oldProgCode = getCookie("progCode");
        } else {
            oldProgCode = "00000-00000-00000";
            setCookie("progCode", oldProgCode, 10);
        }
        if (oldUserName === userName) {
            alert("Hello " + userName + "! We already know Your nickname, so You don't have to submit it again :) \nIf however you did not use our site yet, that seems that someone with the same nickname did. Please choose another name.");
        } else {
            alert("You have sumbitted name: " + userName + ". Someone called: " + oldUserName + " was using our website before. \nDo you want to switch from user: "+ oldUserName + " to: "+ userName + " ?");

            rememberUser(oldUserName, oldProgCode);  //save old user
            progCode = loadUser(userName);           //check and load new user
            setCookie("userName", userName, 10);
        }
        
    }  
//CHECK IF COOKIE EXISTS
    function cookieEx(cookieName) {
        //var cookieExist = /^(.*;)?\s*cookie1\s*=/.test(document.cookie);
        var cookieExist = document.cookie.indexOf(cookieName + '=')!== -1;
        return cookieExist;
    }





//CODING ACHIEVMENTS INTO NUMBER
    // covert to binary
    function con2bin(decNo) {
        var num = Number(decNo);

        // if(num>= 0) {
            return num.toString(2);
        // }
        // else {
        //     return (~num).toString(2);
        // }
    }
    // convert to decimal
    function con2dec(binNo) {
        var num = parseInt(binNo,2);

        // if(num>= 0) {
            return num.toString(10);
        // }
        // else {
        //     return (~num).toString(10);
        // }
    }
    //decode progress code
    function progCd2bin(progCode) {
        var partStr;
        var binProgCode = "";
            for(var i = 0; i < progCode.length; i++) {
                    partStr = progCode.substring(i,i+2);
                    if (progCode.charAt(i) === "-") {
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
            return(binProgCode);
    }
    //code progress code
    function progCd2dec(progCode) {
        var partStr;
        var decProgCode = "";
        for(var i = 0; i < progCode.length; i++) {                        
            if ((i*2) % 36 === 0 && i>1) {
                decProgCode += "-";
            }
            partStr = progCode.substring(i,i+6);
            var add = con2dec(partStr);
            if (add<10) {
                add = "0" + add;
            }
            decProgCode += add;
    
            i = i + 5; 
        }              
        return(decProgCode);
    }

//CHANGE PROGRESS CODE AFTER CLICKING ELEMENT
    function complete(clickedIdNo) {
        
        //var clickedId = x.getAttribute('id').substring(3);
        //var clickedIdNo = Number(clickedId) - 1;
        //alert(clickedId);
        clickedIdNo = clickedIdNo - 1;
        var progCode = getCookie("progCode");
        var binProgCode = progCd2bin(progCode);
        var arr = binProgCode.split("");
        //alert(clickedId + " " + binProgCode + " " + progCd2dec(binProgCode));
        if (binProgCode.charAt(clickedIdNo) === "0") {
            arr.splice(clickedIdNo, 1, "1");
            //x.style.backgroundColor = "red";
        } 
        binProgCode = arr.join("");
        progCode = progCd2dec(binProgCode);
        setCookie("progCode", progCode, 10);
        fillFields();
        configureSite();
        countPoints();
    }  
//WORKING WITH SITE DISPLAY
    //FILL STATIC FIELDS
    function fillFields() {
        var progCode = getCookie("progCode");
        var userName = getCookie("userName");
        var binProgCode = progCd2bin(progCode);
        if (document.getElementById("userNameField") !== null && document.getElementById("showCode") !== null) {
            //document.getElementById("showBinCode").value = binProgCode;
            document.getElementById("showCode").value = progCode;
            document.getElementById("userNameField").innerHTML = userName;
        }
    }

    //HIGHLIGHT READ ARTICLES
    function configureSite() {
        var progCode = getCookie("progCode");
        //alert(progCode);
        var binProgCode = progCd2bin(progCode);
        var clickedElement;
        for (i = 0; i < binProgCode.length; i++) {
            if (document.getElementById("id-" + (i + 1).toString()) !== null) {
            clickedElement = document.getElementById("id-" + (i + 1).toString());
                if (binProgCode.charAt(i) === "0") {
                    //clickedElement.style.backgroundColor = "yellow";
                    clickedElement.children[0].style.color = "#6b7482";
                } else {
                    //clickedElement.style.backgroundColor = "red";
                    clickedElement.children[0].style.color = "#90ee90";
                }   
            }    
        }
    }   

    var askedQuesitonId = 0;

    function askQuestion(q) {        
        document.getElementById("questionPu").style.visibility = "visible";
        var clickedId = q.parentElement.parentElement.getAttribute('id').substring(3);
        askedQuesitonId = Number(clickedId);
        var question = document.getElementById("q" + askedQuesitonId.toString()).innerHTML;
        question = question.substring(0, question.length - 3);
        document.getElementById("questionText").innerHTML = question;
        //alert();
    }

    function userAnswer(a) {
        var ans;
        var clickedId = a.getAttribute('id');
        if (clickedId === "yes") {
            ans = 1;
        } else {
            ans = 0;
        }
        //alert(askedQuesitonId);
        var corAnswer = document.getElementById("q" + askedQuesitonId.toString()).innerHTML;
        var corAnswerLogical = Number(corAnswer.substring(corAnswer.length -1));
        if (ans === corAnswerLogical) {
            document.getElementById("questionPu").style.visibility = "hidden";
            document.getElementById("successPu").style.visibility = "visible";
            closePopupTime("successPu");
            complete(askedQuesitonId);
            //grey-out whole box
        } else {
            document.getElementById("questionPu").style.visibility = "hidden";
            document.getElementById("failurePu").style.visibility = "visible";
            closePopupTime("failurePu");
        }
    }

    function closePopupX(p) { 
        var clickedId = p.parentElement.parentElement.parentElement.getAttribute('id');
        document.getElementById(clickedId).style.visibility = "hidden";
    }

    function closePopupTime(popupName) {
        setTimeout(function () {
            document.getElementById(popupName).style.visibility = "hidden";
        }, 3000);
    }
    function countPoints() {
        var progCode = getCookie("progCode");
        var binProgCode = progCd2bin(progCode);
        var arr = binProgCode.split("");
        var userProgress = 0;
        for (i = 0; i < arr.length; i++) {
            userProgress = userProgress + Number(arr[i]);
        }
        var iconsNo = userProgress / 4;
        var iconsCount = iconsNo - (userProgress % 4 / 4);
        var iconDiv;
        if (iconsCount > 0) {
            //alert(iconsCount);
            for (i = 1; i <= iconsCount; i++) {
                iconDiv = document.getElementById("icon-" + i.toString());
                iconDiv.style.opacity = "1.0";
           //iconDiv[0].setAttribute("style","opacity:1.0; -moz-opacity:1.0; filter:alpha(opacity=100)");
                iconDiv.children[0].style.color = "#9F1E49";
                iconDiv.children[1].style.color = "#9F1E49";
                iconDiv.children[0].style.opacity = "1.0";
                iconDiv.children[1].style.opacity = "1.0";
            }
        }
        var stagePer = 0;
        var styledRating;
        userProgress = 0;
        for (i = 0; i < arr.length; i++) {
            for (j = 0; j < 4; j++) {
                userProgress = userProgress + Number(arr[i + j]);
            }
            stagePer = userProgress / 4 * 250;           
            styledRating = document.getElementById("rat-" + (i/4+1).toString());
            if (styledRating !== null) {
                styledRating.style.height = stagePer.toString() + "px";
            }
            stagePer = userProgress / 4 * 100;
            styledRating.children[0].innerHTML = stagePer.toString() + "%";
            userProgress = 0;
            i = i + 3;
        }
      
    }