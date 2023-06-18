
// Function to delete the note form localStorage
function deleteNote(index) {
    let isConfirm = confirm("Do you really want to delete this note?");
    if (isConfirm) {
        console.log("I am deleting ")
        console.log(index)
        notes = localStorage.getItem('notes');
        notesObj = JSON.parse(notes);
        notesObj.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notesObj));
        show();
    } else {
        show();
    }

}

// Function to Edit the node from the lcoalStorage
function editNotes(index) {
    console.log("I am editing")
    id = index;
    console.log(id);
    notes = localStorage.getItem('notes');
    notesObj = JSON.parse(notes)
    console.log(notesObj[id])
    oldTitle = notesObj[id].title;
    oldDesc = notesObj[id].desc;
    newTitle = prompt("Edit your title", oldTitle);
    newDesc = prompt('Edit your description', oldDesc);
    console.log(newTitle, newDesc)
    confirmation = confirm("Do you really want to save these changes");
    if (confirmation) {
        notesObj[id].title = newTitle;
        notesObj[id].desc = newDesc;
        localStorage.setItem('notes', JSON.stringify(notesObj));
    } else {

    }
    show();
}


// Function to show the notes from localStorage
function show() {
    notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    console.log(notesObj);
    let html = "";
    pending = document.getElementById('pending');
    pending.innerText = `You have ${notesObj.length} pending tasks.`;
    notesObj.forEach((element, index) => {
        date = element.time;
        date = new Date(date).toLocaleDateString();
        html += ` 
        <div  class="items js-tilt" data-tilt data-tilt-scale="1.1" data-tilt-glare data-tilt-max-glare="1">
            <div>
                <div class="date"><ion-icon name="calendar-outline" class="dateIcon"></ion-icon> ${(date)} </div>
                <div class=" title"> ${element['title']} </div>
                <div class="desc">${element['desc']}</div>
            </div>
            <div>
            <button id=${index} onclick="editNotes(this.id)" class="btn btnEdit" class="edit">
                <ion-icon name="create-sharp"></ion-icon>
            </button>
            <button id=${index} onclick="deleteNote(this.id)" class="btn btnDelete" class="delete">
                <ion-icon name="trash-sharp"></ion-icon>
            </button>
            </div>
        </div>`;
    });
    if (notesObj.length != 0) {
        itemsElem = document.getElementById('itemsElem');
        itemsElem.innerHTML = html;
    }
    else {
        itemsElem = document.getElementById('itemsElem');
        itemsElem.innerHTML = `<h1> Nothing to show Add a note to see here </h1>`;
    }
    $('.js-tilt').tilt({
        glare: true,
        maxGlare: 1,
    })

}


btn = document.getElementById('btn');
btn.addEventListener('click', (e) => {
    let addTitle = document.getElementById('forTit');
    let addDesc = document.getElementById('forDesc');

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes)
    }
    let myObj = {
        title: addTitle.value,
        desc: addDesc.value,
        time: new Date(),
    }
    if (myObj.title.length == 0 && myObj.desc.length == 0) {
        alert("Enter a valid title or valid description.")
    } else {
        notesObj.push(myObj);
        localStorage.setItem('notes', JSON.stringify(notesObj));
        addTitle.value = "";
        addDesc.value = "";
        alert("Your notes has been added");
        document.getElementById('add').style.transform = "scale(0)";

    }

    show();

})

show();

hambIcon = document.querySelector('.hambIcon');
hambIcon.addEventListener('click', () => {
    add = document.getElementById('add');
    add.style.transform = "scale(1)";
})

addCloseIcon = document.querySelector('.addCloseIcon')
addCloseIcon.addEventListener('click', () => {
    add = document.getElementById('add');
    add.style.transform = "scale(0)";
    // add.style.top="-70vh";
})

// Adding tilt funcionalities
$('.js-tilt').tilt({
    glare: true,
    maxGlare: 1,
})