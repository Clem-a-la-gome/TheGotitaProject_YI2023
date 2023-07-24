export function setupId(data) {
    
    var select = document.getElementById("idOptions");

    for(var i = 0; i < data.length; i++) {
        var opt = data[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
}

