function showModalProject(projectID) {
    let blur =  $("#blur");
    blur.show();
    blur.scrollTop(0);
    blur.toggleClass("loading", false);

    let project = $("#project");
    project.load(projectID + ".html");
    $("#project_box").toggleClass("loading", false);
}

function hideModalProject() {
    let blur = $("#blur");
    $(blur).toggleClass("loading", true);
    let projectBox = $("#project_box");
    projectBox.toggleClass("loading", true);
    projectBox.one('transitionend', function(e) {
        $(blur).hide();
    });
}

$(function() {
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
});