const inputText = document.getElementById('input-text');
const listContainer = document.getElementById('list-container');

addTask = () => {
    if(inputText.value === ''){
        alert("Please add a name to the task.")
    } else{
        let newListElement = document.createElement('li');
        newListElement.textContent = inputText.value;
        listContainer.appendChild(newListElement);
        
        //  how you supposed to add an image here??
        // let newImageElement = document.createElement('img');
        // newImageElement.src = 'Images/deleteRed.png';
        
        let newSpanElement = document.createElement('span')
        newSpanElement.innerHTML = '\u00d7';
        newListElement.appendChild(newSpanElement);
    }
    saveToLocalStorage();
    inputText.value = '';
}

// press enter to add task
document.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        addTask();
    }
})

// strike and/or remove element from the list
listContainer.addEventListener('click', (obj)=>{
    if(obj.target.tagName === 'LI'){
        obj.target.classList.toggle('checked');
        saveToLocalStorage();
    } else if(obj.target.tagName === 'SPAN'){
        // when clicked spanelem it deletes its respective newlistelem which is the parent elem
        obj.target.parentElement.remove();
        saveToLocalStorage();
    }
});
 
// save data to local storage..
saveToLocalStorage = () => {
    if(listContainer.childNodes.length > 0){
        localStorage.setItem('todoData', listContainer.innerHTML);
    }else{
        localStorage.clear();
    }
}

// load data from local storage..
document.addEventListener('DOMContentLoaded', ()=> {
    listContainer.innerHTML = localStorage.getItem('todoData');
})

// delete everything from the local storage and refresh page..
deleteAllItems = () => {
    if(localStorage.getItem('todoData') !== null){
        const choice = confirm('Click "Ok" if you agree to delete all items.')
        if(choice){
            localStorage.clear();
            document.location.reload();
        }else{
            alert('No items Deleted.')
        }
    } else {
        alert('Sorry, There is nothing to be deleted.')
    }
}

// press the delete icon to delete everything
const deleteAllButton = document.getElementById('my-delete-btn')
deleteAllButton.addEventListener('click', () => {
    deleteAllItems();
});

// press the 'del' button to delete everything
document.addEventListener('keydown', (event) => {
    if(event.key === 'Delete'){
        deleteAllItems();
    }
})
