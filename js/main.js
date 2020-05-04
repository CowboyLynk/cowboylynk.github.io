let projects = [
    {
        "name": "Gazer",
        "pid": "gazer",
        "tags": ["Swift", "Open CV", "ARKit"],
        "category": "coding"
    },
    {
        "name": "Planit",
        "pid": "planit",
        "tags": ["Django", "Python", "HTML", "JS", "CSS"],
        "category": "coding"
    },
    {
        "name": "Scribr",
        "pid": "scribr",
        "tags": ["Python", "Flask", "FFmpeg"],
        "category": "coding"
    },
    {
        "name": "The Word Game",
        "pid": "thewordgame",
        "tags": ["Swift"],
        "category": "coding"
    },
    {
        "name": "MIT Admissions",
        "pid": "mitadmissions",
        "tags": ["Film"],
        "category": "film",
        "cover": true
    }
];

function filterProjects() {

}

function initProjects() {
    let tbody = document.querySelector('#project-grid');
    let template = document.querySelector('#project-item-template');
    for (let i = 0; i < projects.length; i++) {
        let project = projects[i];
        let pid = project["pid"];
        let name = project["name"];
        let clone = template.content.cloneNode(true);

        let projectContainer = clone.querySelector(".element-item");
        projectContainer.setAttribute('data-category', project["category"]);

        let projectCard = clone.querySelector("#project-card");
        projectCard.id = pid;

        let projectTitle = clone.querySelector("#project-title");
        projectTitle.textContent = name;

        let tagsContainer = clone.querySelector(".tags");
        let tags = project["tags"];
        for (let j = 0; j < tags.length; j++) {
            let tag = document.createElement("span");
            tag.className = "tag";
            tag.textContent = tags[j];
            tagsContainer.appendChild(tag);
        }

        let projectImage = clone.querySelector("#cover-image");
        if (project["cover"]) {
            projectImage.src = "images/" + pid + "/cover.png";
            projectImage.alt = name + "Image";
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
    $('.filters-button-group').on( 'click', 'button', function() {
        let filterValue = $( this ).attr('data-filter');
        // use filterFn if matches value
        console.log(filterValue);
        $grid.isotope({ filter: filterValue });
    });

    // Set up the grid
    let $grid = $('.grid').isotope({
        itemSelector: '.element-item',
        layoutMode: 'fitRows'
    });

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

    // Check id of page and load project if necessary
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('pid')) {
        let pid = searchParams.get('pid');
        showModalProject(pid);
    }
});
