// This website was made in 34 minutes

window.onload = function() {
    var cookie = document.cookie;
    if (cookie != "") {
        var cookieData = readCookie("data");

        document.getElementById("endpoint").value = data.endpoint;
        document.getElementById("port").value = data.port;
        document.getElementById("wait").value = data.wait;
        document.getElementById("auto").checked = data.auto;

        if (document.getElementById("auto").checked) {
            setTimeout(redirect(), parseInt(wait.value));
        }
    }
}

function redirect() {
    var endpointString = document.getElementById("endpoint").value;
    if (endpointString.startsWith("/")) {
        endpointString = endpointString.substring(1);
    }
    var finalUrl = "https://localhost:" + port.value + "/" + endpointString;
    window.location.replace(finalUrl);
}

function saveChanges() {
    var cookieObject = {
        endpoint: document.getElementById("endpoint").value,
        port: document.getElementById("port").value,
        wait: document.getElementById("wait").value,
        auto: document.getElementById("auto").checked
    }
    console.log(cookieObject);
    bakeCookie("data", cookieObject)
}

function bakeCookie(name, value) {
    var cookie = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/; HttpOnly; Secure; SameSite=None'].join('');
    document.cookie = cookie;
}

function readCookie(name) {
    var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
    result && (result = JSON.parse(result[1]));
    return result;
}