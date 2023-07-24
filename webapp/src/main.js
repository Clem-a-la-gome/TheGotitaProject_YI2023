
function displayWindowSize(){
    // Get width and height of the window excluding scrollbars
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;

    console.log(w)

    if(w < 1380) {
        document.getElementById("OWID").style.display = 'initial';
    } else {
        document.getElementById("OWID").style.display = 'flex';
    }

}
    
// Attaching the event listener function to window's resize event
window.addEventListener("resize", displayWindowSize);