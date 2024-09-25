// OPERAZIONI DA FARE AD AVVIO PAGINA
// Recupero gli elementi di interesse dalla pagina
const button = document.querySelector('button');
const inputField = document.querySelector('input');
const todolist = document.querySelector('.todo-list');
const emptyListMessage = document.querySelector('.empty-list-message');

// Creo una chiave per il local storage
const STORAGE_KEY = '__bool_todo__';


// Preparo una lista di attività
let activities = [];

// Controllo se per caso c'erano delle attività nel local storage
const storage = localStorage.getItem(STORAGE_KEY);

if (storage) {
    activities = JSON.parse(storage);
}


// Chiedo a JS di decidere cosa mostrare
showContent();


// OPERAZIONI DINAMICHE
button.addEventListener('click', function(){
    addNewActivity();
})


inputField.addEventListener('keyup', function(event){
    if (event.key === "Enter") {
        addNewActivity();
    }
})



// FUNZIONI
 
// funzione che decide cosa mostrare in pagina
function showContent(){

    // Innanzitutto pulisco tutto
    todolist.innerText = '';
    emptyListMessage.innerText = '';

    // Se c'è almeno un'attività: mostra le attività
    if (activities.length > 0) {
        activities.forEach(function(activity){   
            
            const template = createActivityTemplate(activity);
            
            todolist.innerHTML += template;

        })
     
        // Cerca tutti i check e fa' sì che siano cliccabili
        makeCheckClickable();

    } else {       // Se non c'è nessun'attività: mostra il messaggio di lista vuota
        emptyListMessage.innerText = "It appears you have nothing to do!";
    }

}


function addNewActivity() {
    const newActivity = inputField.value.trim();   // Recupero il testo nel campo
    
    if (newActivity.length > 0) {
        
        activities.push(newActivity);        // Aggiungo l'attività alla lista

        localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));                   // Aggiorno lo storage

        showContent();               // Ridecidi cosa mostrare
 
        inputField.value = '';       // Svuoto il campo
    }
}


function makeCheckClickable(){ 
    const checks = document.querySelectorAll('.todo-check');
    checks.forEach(function(check, index){
        check.addEventListener('click', function(){
            activities.splice(index, 1);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));   // Aggiorna anche il local storage
            showContent();
        });
    })
}


function createActivityTemplate(activity){
    return `
    <li class="todo-item">
        <div class="todo-check">
        <img src="tick.png" width=25px>
        </div>
        <p class="todo-text">${activity}</p>
    </li>
    `; 
}