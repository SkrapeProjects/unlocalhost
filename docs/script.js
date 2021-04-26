// This website was made in 34 minutes

var params = "";
var redirecting = false;

var portValue, endpointValue, darkModeValue, waitValue, autoValue;

window.onload = function() {
    var cookie = document.cookie;
    params = window.location.search;
    if (cookie != "") {
        var cookieData = readCookie("data");

        // There is a special place in hell for people like me
        if (cookieData.endpoint !== undefined) {
            document.getElementById("endpoint").value = cookieData.endpoint;
        }
        if (cookieData.port !== undefined) {
            document.getElementById("port").value = cookieData.port;
        }
        if (cookieData.wait !== undefined) {
            document.getElementById("wait").value = cookieData.wait;
        }
        if (cookieData.auto !== undefined) {
        document.getElementById("auto").checked = cookieData.auto;
        }
        if (cookieData.darkMode !== undefined) {
            document.getElementById("darkMode").checked = cookieData.darkMode;
        }

        if (document.getElementById("darkMode").checked) {
            setDarkMode();
        }

        if (document.getElementById("auto").checked) {
            redirect();
        }
    }
    updateValues();
}

function changeMode() {
    if (document.getElementById("darkMode").checked) {
        setDarkMode();
    } else {
        setLightMode();
    }
    darkModeValue = document.getElementById("darkMode").checked;
}

function clamp(val, min, max) {
    if (val > max) {
        return max;
    } else if (val < min) {
        return min;
    }
    return val;
}

function updateValues() {
    autoValue = document.getElementById("auto").checked;
    
    var minWait = 0;
    if (autoValue) {
        minWait = 5;
    }
    
    document.getElementById("port").value = clamp(parseInt(document.getElementById("port").value), 0, 65535).toString();
    document.getElementById("wait").value = clamp(parseInt(document.getElementById("wait").value), minWait, 60).toString();

    portValue = document.getElementById("port").value;
    endpointValue = document.getElementById("endpoint").value;
    waitValue = document.getElementById("wait").value;
}

// This is horrible
function setLightMode() {
    var rootStyle = document.querySelector(":root").style;
    rootStyle.setProperty("--bodyColor", "white");
    rootStyle.setProperty("--textColor", "black");
    rootStyle.setProperty("--footerColor", "gray");
    rootStyle.setProperty("--sliderColorInner", "white");
}

// This one too
function setDarkMode() {
    var rootStyle = document.querySelector(":root").style;
    rootStyle.setProperty("--bodyColor", "rgb(48,48,48)");
    rootStyle.setProperty("--textColor", "white");
    rootStyle.setProperty("--footerColor", "rgb(164,164,164)");
    rootStyle.setProperty("--sliderColorInner", "rgb(128,128,128)");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function redirect() {
    redirecting = !redirecting;
    setComponentsDisabled(redirecting);
    var redirectBtn = document.getElementById("redirectBtn");
    if(redirecting) {
        updateValues();
        var i;
        for (i = parseInt(waitValue); i > 0; i--) {
            redirectBtn.textContent = "CANCEL " + i.toString();
            await sleep(1000);
            if (!redirecting) {
                return;
            }
        }
        redirectBtn.textContent = "CANCEL 0";
        saveChanges();
        var endpointString = endpointValue;
        if (endpointString.startsWith("/")) {
            endpointString = endpointString.substring(1);
        }
        var finalUrl = "https://localhost:" + document.getElementById("port").value + "/" + endpointString + params;
        window.location.replace(finalUrl);
    } else {
        redirectBtn.textContent = "REDIRECT";
    }
}

// Bruh momento
function setComponentsDisabled(value) {
    document.getElementById("endpoint").disabled = value;
    document.getElementById("port").disabled = value;
    document.getElementById("wait").disabled = value;
    document.getElementById("auto").disabled = value;
    document.getElementById("darkMode").disabled = value;
}

function saveChanges() {
    var cookieObject = {
        endpoint: endpointValue,
        port: portValue,
        wait: waitValue,
        auto: autoValue,
        darkMode: darkModeValue
    }
    bakeCookie("data", cookieObject)
}

function bakeCookie(name, value) {
    var cookie = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/; Secure; SameSite=None'].join('');
    console.log(cookie);
    document.cookie = cookie;
}

function readCookie(name) {
    var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
    result && (result = JSON.parse(result[1]));
    return result;
}