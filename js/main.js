let projects = [
    {
        "name": "Gazer",
        "pid": "gazer",
        "tags": ["Swift", "OpenCV", "ARKit"],
        "category": "coding"
    },
    {
        "name": "Planit",
        "pid": "planit",
        "tags": ["Django", "Python", "Javascript"],
        "category": "coding"
    },
    {
        "name": "MC Ray Tracer",
        "pid": "raytracer",
        "tags": ["C++"],
        "category": "coding"
    },
    {
        "name": "Scribr",
        "pid": "scribr",
        "tags": ["Python", "Flask", "FFmpeg"],
        "category": "coding"
    },
    {
        "name": "BioTune",
        "pid": "biotune",
        "tags": ["Python"],
        "category": "coding"
    },
    {
        "name": "The Word Game",
        "pid": "thewordgame",
        "tags": ["Swift", "Firebase"],
        "category": "coding"
    },
    {
        "name": "Pong Stat",
        "pid": "pongstat",
        "tags": ["Swift", "Charts"],
        "category": "coding"
    },
    {
        "name": "MIT Admissions",
        "pid": "mitadmissions",
        "tags": ["After Effects", "Blender", "C4D"],
        "category": "coding"
    }
];
let allTags = new Set();
let activeTags = [];

window.onpopstate = checkState;

function checkState(e) {
    if(e.state && e.state.pid) {
        let pid = e.state.pid;
        if (pid === "index") {
            hideModalProject();
        } else {
            showModalProject(pid);
        }
    } else {
        hideModalProject();
    }
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

        let projectLink = clone.querySelectorAll(".project-link");
        $(projectLink).data("id", pid);

        let projectTitle = clone.querySelector("#project-title");
        projectTitle.textContent = name;

        let tagsContainer = clone.querySelector(".tags");
        let tags = project["tags"];
        for (let j = 0; j < tags.length; j++) {
            let tag = document.createElement("span");
            tag.className = "tag display-tag";
            tag.textContent = tags[j];
            tagsContainer.appendChild(tag);
            allTags.add(tags[j]);
        }

        let projectImage = clone.querySelector("#cover-image");
        projectImage.src = "images/" + pid + "/cover.png";
        projectImage.alt = name + "Image";

        tbody.appendChild(clone);
    }
}

function showModalProject(projectID) {
    let blur =  $("#blur");
    blur.show();
    blur.scrollTop(0);
    blur.toggleClass("loading", false);
    $('body,html').toggleClass("modal-open", true);

    let project = $("#project");
    project.load(projectID + ".html", function() {
        $('.carousel').flickity({
            // options
            fullscreen: true,
            pageDots: true,
            lazyLoad: 1
        });
    });
    $("#project_box").toggleClass("loading", false);
}

function hideModalProject() {
    let blur = $("#blur");
    $(blur).toggleClass("loading", true);
    let projectBox = $("#project_box");
    projectBox.toggleClass("loading", true);
    projectBox.one('transitionend', function(e) {
        if (getPidFromURL() === "index") {
            $(blur).hide();
        }
    });
    $('body,html').toggleClass("modal-open", false);
}

function closeModalProject() {
    hideModalProject();
    window.history.pushState({pid: "index"}, null, location.pathname);
}


function removeTagFilter(tagID) {
    $("#tag-" + $.escapeSelector(tagID)).remove();
    activeTags = activeTags.filter(function(e) { return e !== tagID });
    filterGrid();
}

function addTagFilter(tagName) {
    let tagID = tagName.toLocaleLowerCase();
    if (activeTags.includes(tagID)) {
        return;
    }

    // let tags = $("#tag-filters");
    let tag = document.createElement("span");
    tag.classList.add("tag");
    tag.id = "tag-" + tagID;
    tag.textContent = tagName;
    tag.setAttribute("data-id", tagID);
    let button = document.createElement("div");
    button.className = "delete is-small";
    $(button).click(function() {
        removeTagFilter(tagID);
    });
    tag.append(button);
    let autocomplete = $(".autocomplete");
    autocomplete.before(tag);

    activeTags.push(tagID);
    filterGrid();
}

function filterGrid() {
    let filterFunc = function() {
        let tags = $(this).find(".tag").map(function() {
            return this.textContent.toLowerCase();
        }).get();

        for (let i = 0; i < tags.length; i++) {
            if (activeTags.includes(tags[i])) {
                return true;
            }
        }
        return false;
    };
    if (activeTags.length === 0) {
        filterFunc = "*"
    }
    $('.grid').isotope({filter: filterFunc});
}

function getPidFromURL() {
    let currentPid = "index";
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('pid')) {
        currentPid = searchParams.get('pid');
    }
    return currentPid;
}

$(function() {
    // Init projects
    initProjects();

    // Set up the grid
    let $grid = $('.grid').isotope({
        itemSelector: '.element-item',
        layoutMode: 'fitRows',
        fitRows: {
            gutter: 0
        }
    });

    // Set up click events
    $(".project-link").on("click", function(e){
        let projectID = $(this).data("id");
        showModalProject(projectID);
        window.history.pushState({pid: projectID}, null, '?pid=' + projectID);
        e.preventDefault(); // to prevent any other unwanted behavior clicking the div might cause
    });
    $("#blur").on("click", function(e){
        if (e.target === this && !this.classList.contains("loading")) {
            closeModalProject();
            e.preventDefault(); //to prevent any other unwanted behavior clicking the div might cause
        }
    });
    $(".display-tag").on("click", function(e) {
        addTagFilter(this.textContent);
        e.preventDefault();
    });
    $("#close_project").on("click", function(e) {
        closeModalProject();
    });

    // Set up autocomplete tags
    autocomplete(document.getElementById("tagsInput"), [...allTags]);
    // TODO: Figure out how to do this

    // Check id of page and load project if necessary
    let startPid = getPidFromURL();
    if (startPid !== "index") {
        showModalProject(startPid);
    }
    // Set initial state of the website
    history.replaceState({pid: startPid}, null, null);
});
