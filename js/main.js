let projects = [
    {
        "name": "Gazer",
        "pid": "gazer",
        "tags": ["Swift", "Open CV", "ARKit"]
    },
    {
        "name": "Planit",
        "pid": "planit",
        "tags": ["Django", "Python", "HTML", "JS", "CSS"]
    },
    {
        "name": "Scribr",
        "pid": "scribr",
        "tags": ["Python", "Flask", "FFmpeg"]
    }
];

function initProjects() {
    let tbody = document.querySelector('#project-grid');
    let template = document.querySelector('#project-item-template');
    console.log(projects);
    console.log(projects.length);
    for (let i = 0; i < projects.length; i++) {
        console.log("here");
        let project = projects[i];
        let clone = template.content.cloneNode(true);

        let projectCard = clone.querySelector("#project-card");
        projectCard.id = project["pid"];

        let projectTitle = clone.querySelector("#project-title");
        projectTitle.textContent = project["name"];

        let tagsContainer = clone.querySelector(".tags");
        let tags = project["tags"];
        for (let j = 0; j < tags.length; j++) {
            let tag = document.createElement("span");
            tag.className = "tag";
            tag.textContent = tags[j];
            tagsContainer.appendChild(tag);
        }

        tbody.appendChild(clone);
    }
}


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
    // Init projects
    initProjects();

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
    });

    // Check id of page
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('pid')) {
        let pid = searchParams.get('pid');
        showModalProject(pid);
    }
});
