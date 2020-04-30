function updateModalProject(projectID) {
    $(function(){
        let blur =  $("#blur");
        blur.show();
        blur.scrollTop(0);
        blur.toggleClass("loading", false);

        let project = $("#project");
        project.load("projects/" + projectID + ".html");
        $("#project_container").toggleClass("loading", false);
    });
}

$(function() {
    $("div.card").on("click", function(e){
        updateModalProject(this.id);

        e.preventDefault(); //to prevent any other unwanted behavior clicking the div might cause
    });

    $("#blur").on("click", function(e){
        $(this).hide();
        $(this).toggleClass("loading", true);
        $("#project_container").toggleClass("loading", true);
        // e.preventDefault(); //to prevent any other unwanted behavior clicking the div might cause
    })
});