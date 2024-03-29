function autocomplete(inp, arr) {
    let currentFocus;
    let set = new Set(arr);
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        let a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = 0;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            let tagVal = arr[i].toLowerCase();
            if (activeTags.includes(tagVal)) continue;
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toLowerCase() === val.toLowerCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    addTagFilter(this.getElementsByTagName("input")[0].value);
                    inp.value = "";
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
        let x = a.getElementsByTagName("div");
        addActive(x);
    });

    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        let autocompleteList = document.getElementById(this.id + "autocomplete-list");
        let a, b, i, val = this.value;
        if (e.keyCode === 8 && activeTags.length > 0 && val === "") {  // Delete
            removeTagFilter(activeTags[activeTags.length - 1]);
        }
        if (!autocompleteList) return;
        let x = autocompleteList.getElementsByTagName("div");
        if (e.keyCode === 40) {  // Down
            currentFocus++;
            addActive(x);
        } else if (e.keyCode === 38) {  // Up
            currentFocus--;
            addActive(x);
        } else if (e.keyCode === 13) {  // Enter
            if (currentFocus > -1) {
                let val = autocompleteList.getElementsByTagName("input")[currentFocus].value;
                addTagFilter(val);
                inp.value = "";
                closeAllLists();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        let x = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < x.length; i++) {
            if (elmnt !== x[i] && elmnt !== inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}