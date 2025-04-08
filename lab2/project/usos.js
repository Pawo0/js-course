const addBtn = document.getElementById("addBtn");
const changeBtn = document.getElementById("changeBtn");
const viewBtn = document.getElementById("viewBtn");

const addBlock = document.getElementById("addBlock");
const changeBlock = document.getElementById("changeBlock");
const viewBlock = document.getElementById("viewBlock");


const choiceForm = document.getElementById("choiceForm")
const myInp = document.getElementById("myInput");

const gradeInput = document.getElementById("gradeInput");

const add_grade = document.getElementById("add_grade");
const subjects_select = document.getElementById("subjects_select");

const inp_matematyka = document.getElementById("inp_matematyka");
const inp_fizyka = document.getElementById("inp_fizyka");
const inp_chemia = document.getElementById("inp_chemia");
const inp_polski = document.getElementById("inp_polski");
const change_grade = document.getElementById("change_grade");

const view_matematyka = document.getElementById("view_matematyka");
const view_fizyka = document.getElementById("view_fizyka");
const view_chemia = document.getElementById("view_chemia");
const view_polski = document.getElementById("view_polski");

const badInput = "bg-red-100";

let currentUser = null;
let currentData = {
    "subjects": {
        "Matematyka": "",
        "Fizyka": "",
        "Chemia": "",
        "Polski": ""
    }
}

const users = [
    "Krzysztof Kolumb",
    "Karol Wojtyła",
    "Krzysztof Penderecki",
    "Adam Mickiewicz",
    "Maria Curie-Skłodowska",
    "Mikołaj Kopernik",
    "Jan Matejko",
    "Henryk Sienkiewicz",
    "Janusz Korczak",
    "Tadeusz Kościuszko",
    "Wisława Szymborska",
    "Czesław Miłosz",
];

const subjects = [
    "Matematyka",
    "Fizyka",
    "Chemia",
    "Polski"
];

function clearData() {
    currentData = {
        "subjects": {
            "Matematyka": "",
            "Fizyka": "",
            "Chemia": "",
            "Polski": ""
        }
    }
}

function downloadData() {
    clearData();
    if (localStorage.getItem(currentUser) === null){
        localStorage.setItem(currentUser, JSON.stringify(currentData));
    }
    currentData = JSON.parse(localStorage.getItem(currentUser));
}


addBlock.addEventListener('submit' , (event) => {
    event.preventDefault();
    const gradeToAdd = gradeInput.value;
    const subjectToAdd = subjects_select.value;
    if (isNaN(gradeToAdd) || gradeToAdd < 1 || gradeToAdd > 6){
        alert("Niepoprawna ocena");
        return;
    }
    if (currentData.subjects[subjectToAdd] === ""){
        currentData.subjects[subjectToAdd] = gradeToAdd;
    }
    else{
        currentData.subjects[subjectToAdd] = (currentData.subjects[subjectToAdd] + ', ' +gradeToAdd);
    }
    localStorage.setItem(currentUser, JSON.stringify(currentData));
    gradeInput.value = "dodano";
})

choiceForm.addEventListener('submit', (event) => {
    event.preventDefault()
})

myInp.addEventListener('input' , (event) => {
    if (myInp.classList.contains(badInput)){
        myInp.classList.remove(badInput)
    }
})

addBtn.addEventListener('click', () => {
    if(checkIfCanClick(myInp.value, addBlock)){

    }
})

changeBtn.addEventListener('click', () => {
    if(checkIfCanClick(myInp.value, changeBlock)){
        inp_matematyka.value = currentData.subjects.Matematyka;
        inp_fizyka.value = currentData.subjects.Fizyka;
        inp_chemia.value = currentData.subjects.Chemia;
        inp_polski.value = currentData.subjects.Polski;
    }
})

viewBtn.addEventListener('click', () => {
    if(checkIfCanClick(myInp.value, viewBlock)){
        console.log(currentData);
        console.log(view_matematyka)
        view_matematyka.innerText = currentData.subjects.Matematyka;
        view_fizyka.innerText = currentData.subjects.Fizyka;
        view_chemia.innerText = currentData.subjects.Chemia;
        view_polski.innerText = currentData.subjects.Polski;
    }
})


function checkIfCanClick(user, block){
    addBlock.classList.add('hidden');
    changeBlock.classList.add('hidden');
    viewBlock.classList.add('hidden');

    if (users.includes(user)){
        currentUser = user;
        downloadData();

        block.classList.remove('hidden');
        block.childNodes[1].innerText = `"Wybrano użytkownika ${user}"`;
        return true;
    }
    else{
        myInp.classList.add(badInput)
        return false;
    }
}

function preventDefault(event) {
    event.preventDefault();
}



const createAutocomplete = (inputElement, dataArray) => {
    let currentFocus = -1;

    const createSuggestionList = () => {
        const inputValue = inputElement.value;
        clearSuggestions();

        if (!inputValue) return;

        currentFocus = -1;

        // Create suggestions container
        const suggestionsContainer = document.createElement("div");
        suggestionsContainer.id = `${inputElement.id}-autocomplete-list`;
        suggestionsContainer.className = "absolute top-full left-0 right-0 border border-gray-300 rounded-b-lg bg-white z-50 max-h-60 overflow-y-auto";
        inputElement.parentNode.appendChild(suggestionsContainer);

        // Filter and display matching suggestions
        const matchingSuggestions = dataArray.filter(item =>
            item.toUpperCase().startsWith(inputValue.toUpperCase())
        );

        matchingSuggestions.forEach(suggestion => {
            const suggestionElement = document.createElement("div");
            suggestionElement.className = "px-4 py-2 cursor-pointer hover:bg-gray-100 border-b border-gray-200";

            // Highlight matching part
            const matchLength = inputValue.length;
            suggestionElement.innerHTML = `
                <span class="font-bold">${suggestion.substring(0, matchLength)}</span>
                ${suggestion.substring(matchLength)}
            `;

            // Add hidden input with the full value
            const hiddenInput = document.createElement("input");
            hiddenInput.type = "hidden";
            hiddenInput.value = suggestion;
            suggestionElement.appendChild(hiddenInput);

            // Handle click on suggestion
            suggestionElement.addEventListener("click", () => {
                inputElement.value = suggestion;
                clearSuggestions();
            });

            suggestionsContainer.appendChild(suggestionElement);
        });
    };

    const clearSuggestions = (exceptElement) => {
        const lists = document.querySelectorAll(`[id$="-autocomplete-list"]`);
        lists.forEach(list => {
            if (list !== exceptElement && list.parentNode !== exceptElement) {
                list.parentNode.removeChild(list);
            }
        });
    };

    const setActiveSuggestion = (direction) => {
        const suggestionList = document.getElementById(`${inputElement.id}-autocomplete-list`);
        if (!suggestionList) return;

        const suggestions = suggestionList.querySelectorAll("div");
        if (!suggestions.length) return;

        // Update current focus
        currentFocus += direction;

        // Handle cycling through suggestions
        if (currentFocus >= suggestions.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = suggestions.length - 1;

        // Remove active class from all suggestions
        suggestions.forEach(suggestion => {
            suggestion.classList.remove("bg-blue-500", "text-white");
        });

        // Add active class to current suggestion
        suggestions[currentFocus].classList.add("bg-blue-500", "text-white");
    };

    // Event listeners
    inputElement.addEventListener("input", createSuggestionList);

    inputElement.addEventListener("keydown", (event) => {
        const suggestionList = document.getElementById(`${inputElement.id}-autocomplete-list`);
        if (!suggestionList) return;

        const suggestions = suggestionList.querySelectorAll("div");

        switch (event.key) {
            case "ArrowDown":
                setActiveSuggestion(1);
                break;
            case "ArrowUp":
                setActiveSuggestion(-1);
                break;
            case "Enter":
                event.preventDefault();
                if (currentFocus > -1 && suggestions[currentFocus]) {
                    suggestions[currentFocus].click();
                }
                break;
            case "Escape":
                clearSuggestions();
                break;
        }
    });

    // Close suggestions when clicking outside
    document.addEventListener("click", (event) => {
        if (event.target !== inputElement) {
            clearSuggestions();
        }
    });
};

// Initialize autocomplete on the input
document.addEventListener("DOMContentLoaded", () => {
    const inputElement = document.getElementById("myInput");
    if (inputElement) {
        inputElement.parentNode.classList.add("relative");
        createAutocomplete(inputElement, users);
    }
});