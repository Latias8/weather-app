function castParallax() {
    window.addEventListener("scroll", function (event) {

        let top = this.pageYOffset;
        let scrollTop = window.scrollY;
        /*console.log(scrollTop)*/
        /*console.log(window.innerWidth)*/
        let layers = document.getElementsByClassName("parallax");
        let layer, speed, yPos;
        for (let i = 0; i < layers.length; i++) {
            layer = layers[i];
            speed = layer.getAttribute('data-speed');
            let yPos = -(top * speed / 100);
            layer.setAttribute('style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)');

        }
    })
}

function dispelParallax() {
    document.getElementById("parallax").style.display = "none";
    document.querySelectorAll(".parallax").forEach( (i) => {
        i.style.display = "none";
    })}

function startSite() {

    let platform = navigator.platform.toLowerCase();
    let userAgent = navigator.userAgent.toLowerCase();

    if ( platform.indexOf('ipad') != -1  ||  platform.indexOf('iphone') != -1 )
    {
        dispelParallax();
    }

    else
    {
        castParallax();
    }

}

if (document.getElementById("keyart-0")) {
    document.getElementById("keyart-0").style.backgroundImage = "url('../img/cute-cloud-simple-illustration-for-kids-drawing-png.webp')";
}

document.body.onload = startSite();

