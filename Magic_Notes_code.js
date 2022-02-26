console.log("Hello World");
showNotes();
// If user add a note add it to the local storage

let addbtn = document.getElementById("addbtn");
addbtn.addEventListener('click', function (e) {

    let addtext = document.getElementById("addtext");
    let addtitle = document.getElementById("addtitle"); 
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }
    let myObj={
        title: addtitle.value,
        text: addtext.value
    }
    notesobj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    addtext.value = "";
    addtitle.value="";
    console.log(notesobj);
    showNotes();
})

// Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) { 
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }
    let html = "";
    notesobj.forEach(function (element, index) {
        html += `
              <div class="notecard my-2 mx-2 card" style="width: 18rem;">
                      <div class="card-body">
                          <h5 class="card-title"> ${element.title}</h5>
                          <p class="card-text"> ${element.text}</p>
                          <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                      </div>
                  </div>`;
    });
    let notesElm = document.getElementById("Notes");
    if (notesobj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}

// Function to delete a note
  
function deleteNote(index) {

    //   console.log("I am deleting", index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }

    notesobj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    showNotes();
}

//Function to search notes


let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value;
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('notecard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        let cardttl = element.getElementsByTagName("h5")[0].innerText;
        if (cardTxt.includes(inputVal) || cardttl.includes(inputVal) ) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })

})