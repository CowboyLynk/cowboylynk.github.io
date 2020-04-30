function presentProject(projectID) {
    let myDivElement = $("#blur");
    myDivElement.hidden = true;
    console.log("here fucker")
}

presentProject("planit");



// Initial setup of click events
let body = document.body,
    blurOverlay = document.querySelector('.overlay'),
    overlayToggles = document.querySelectorAll('div[class$="overlay"]'),
    projectContent = document.querySelector('#modal_project_content');


[].forEach.call(overlayToggles, function(div) {
    div.addEventListener('click', function() {
        /* Detect the div class name */
        let overlayOpen = this.classList.contains('open-overlay');

        /* Toggle the aria-hidden state on the overlay and the
        no-scroll class on the body */
        blurOverlay.setAttribute('aria-hidden', !overlayOpen);
        body.classList.toggle('noscroll', overlayOpen);

        projectContent.setAttribute('src', 'projects/' + this.id + '.html');
        projectContent.onload = function() {
            console.log("here2");
            console.log(this.contentWindow.document.body.scrollHeight);
            this.style.height = this.contentWindow.document.body.scrollHeight + 'px';
        }

        /* On some mobile browser when the overlay was previously
        opened and scrolled, if you open it again it doesn't
        reset its scrollTop property */
        blurOverlay.scrollTop = 0;
    }, false);
});