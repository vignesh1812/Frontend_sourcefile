let button=document.getElementById("btnadd");
let listbox=document.getElementById("list-box");
let input=document.getElementById("inputbox");
let todos=[];

button.addEventListener('click',()=>{
todos.push(input.value)
console.log(todos);
addtodo(input.value)
input.value="";
})

function addtodo(todo){
     let list=document.createElement("li");
     list.innerHTML=todo;
     listbox.appendChild(list);
     let span=document.createElement("span")
     span.innerHTML="\u00d7";
     list.appendChild(span)
     list.addEventListener('click',() => {
        list.style.textDecoration='line-through';
        remove(todo)
      })
      list.addEventListener('dblclick',()=>{
        listbox.removeChild(list);
        remove(todo)
      })
}

function remove(todo){
    let index=todos.indexOf(todo)
    if(index>-1)
    todos.splice(index,1)
}
