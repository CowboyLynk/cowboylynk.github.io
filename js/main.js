function showModalProject(projectID) {
    let blur =  $("#blur");
    blur.show();
    blur.scrollTop(0);
    blur.toggleClass("loading", false);

    let project = $("#project");
    project.load(projectID + ".html");
    $("#project_box").toggleClass("loading", false);

    // Set the url
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.set('pid', projectID);
    console.log(location.pathname);
    window.history.replaceState({}, null, location.pathname + '?pid=' + projectID);
}

function hideModalProject() {
    let blur = $("#blur");
    $(blur).toggleClass("loading", true);
    let projectBox = $("#project_box");
    projectBox.toggleClass("loading", true);
    projectBox.one('transitionend', function(e) {
        $(blur).hide();
    });
    window.history.replaceState({}, null, location.pathname);
}

$(function() {
    // Set up click events
    $("div.card").on("click", function(e){
        showModalProject(this.id);

        e.preventDefault(); //to prevent any other unwanted behavior clicking the div might cause
    });

    $("#blur").on("click", function(e){
        if (e.target === this) {
            hideModalProject();
            e.preventDefault(); //to prevent any other unwanted behavior clicking the div might cause
        }
    })

    // Check id of page
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('pid')) {
        let pid = searchParams.get('pid');
        showModalProject(pid);
    }
});
