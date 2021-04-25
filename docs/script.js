// This website was made in 34 minutes

var params = "";

window.onload = function() {
    var cookie = document.cookie;
    params = window.location.search;
    if (cookie != "") {
        var cookieData = readCookie("data");

        document.getElementById("endpoint").value = cookieData.endpoint;
        document.getElementById("port").value = cookieData.port;
        document.getElementById("wait").value = cookieData.wait;
        document.getElementById("auto").checked = cookieData.auto;
        document.getElementById("darkMode").checked = cookieData.darkMode;

        if (document.getElementById("darkMode").checked) {
            setDarkMode();
        }

        if (document.getElementById("auto").checked) {
            setTimeout(redirect(), parseInt(wait.value));
        }
    }
}

function changeMode() {
    if (document.getElementById("darkMode").checked) {
        setDarkMode();
    } else {
        setLightMode();
    }
}

function setLightMode() {
    var rootStyle = document.querySelector(":root").style;
    rootStyle.setProperty("--bodyColor", "white");
    rootStyle.setProperty("--textColor", "black");
    rootStyle.setProperty("--footerColor", "gray");
    rootStyle.setProperty("--sliderColorInner", "white");
}

function setDarkMode() {
    var rootStyle = document.querySelector(":root").style;
    rootStyle.setProperty("--bodyColor", "rgb(48,48,48)");
    rootStyle.setProperty("--textColor", "white");
    rootStyle.setProperty("--footerColor", "rgb(164,164,164)");
    rootStyle.setProperty("--sliderColorInner", "rgb(128,128,128)");
}

function redirect() {
    var endpointString = document.getElementById("endpoint").value;
    if (endpointString.startsWith("/")) {
        endpointString = endpointString.substring(1);
    }
    var finalUrl = "https://localhost:" + port.value + "/" + endpointString + params;
    window.location.replace(finalUrl);
}

function saveChanges() {
    var cookieObject = {
        endpoint: document.getElementById("endpoint").value,
        port: document.getElementById("port").value,
        wait: document.getElementById("wait").value,
        auto: document.getElementById("auto").checked,
        darkMode: document.getElementById("darkMode").checked
    }
    bakeCookie("data", cookieObject)
}

function bakeCookie(name, value) {
    var cookie = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/; Secure; SameSite=None'].join('');
    document.cookie = cookie;
}

function readCookie(name) {
    var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
    result && (result = JSON.parse(result[1]));
    return result;
}