const heroForm = document.querySelector(".hero-form");
const addbutton = document.querySelector(".add");
let inputum = document.querySelector("#fname");
let ustdiv = document.querySelector(".ustdiv");
let deleteBtn;
let checkboxBtn;
let editBtn;
let saveBtn;

const startConf = () => {
  //baslangic ayari
  const todos = JSON.parse(localStorage.getItem("todos")); //at the beginning we call todos from localStorage if there is no todos we created a todos array in local storage
  if (!todos) {
    localStorage.setItem("todos", JSON.stringify([]));
  } else {
    todos.forEach((todo) => {
      addElements(todo); //after this addElements(todo) we created the elements we add the buttons buttons have to be added later
    });
    deleteBtn = document.querySelectorAll(".delete-btn"); // after created my html elements we need to call deleteBtn from here otherwise we cannot find this
    checkboxBtn = document.querySelectorAll(".checkbox-btn"); // after created my html elements we
    editBtn = document.querySelectorAll(".edit-btn"); // after created my html elements we need
    saveBtn = document.querySelectorAll(".todo_save");
    console.log(checkboxBtn);
  }
};

startConf();

function gorevPlanla(e) {
  // use english verbs when declaring the method name
  e.preventDefault();

  if (inputum.value == "") {
    // boş değer girilmeye çalışıyor ise hata veriyoruz
    inputum.style.border = "1px solid tomato";
    setTimeout(() => {
      input.style.borderColor = "transparent";
    }, 2500);
    return false;
  }

  const todo = {
    text: inputum.value,
    isCompleted: false,
  };

  const todos = JSON.parse(localStorage.getItem("todos")); //to use push method we need to turn this into array
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  console.log(todos);

  addElements(todo);

  heroForm.reset();
}

function deleleteFtn(e) {
  const tiklanilanEleman = e.target;

  if (
    tiklanilanEleman.parentElement.classList.contains("delete-btn") ||
    tiklanilanEleman.classList.contains("delete-btn")
  ) {
    tiklanilanEleman.parentElement.closest(".yeniDiv").classList.add("kaybol");

    const text =
      tiklanilanEleman.closest("div.yeniDiv").firstChild.children[2]
        .textContent;

    console.log(text);

    let todos = JSON.parse(localStorage.getItem("todos"));
    todos = todos.filter((td) => td.text != text);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

function checkFunction(e) {
  const text = e.target.closest(".yeniDiv").firstChild.children[2].textContent;

  console.log(text);

  let todos = JSON.parse(localStorage.getItem("todos")); //to use push method we need to turn this into array
  todos.forEach((chck) => {
    if (chck.text === text) chck.isCompleted = !chck.isCompleted; //
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

const editFunction = (e) => {
  const tiklanilanEleman = e.target;
  if (
    tiklanilanEleman.parentElement.classList.contains("edit-btn") ||
    tiklanilanEleman.classList.contains("edit-btn")
  ) {
    const secilenleft = e.target.closest("div.yeniDiv").firstChild.children[1];
    const secilenright = e.target.closest("div.yeniDiv").firstChild.children[2];
    const secilenButton1 =
      e.target.closest("div.yeniDiv").children[1].children[0];
    const secilenButton2 =
      e.target.closest("div.yeniDiv").children[1].children[1];

    secilenleft.classList.add("blockla");
    secilenright.classList.add("blockla");
    secilenButton1.classList.add("blockla");
    secilenButton2.classList.add("blockla");

    const secilenSolInput =
      e.target.closest("div.yeniDiv").firstChild.firstChild;
    const secilenSagSave =
      e.target.closest("div.yeniDiv").children[1].children[2];

    secilenSolInput.classList.add("show");
    secilenSagSave.classList.add("show");
  }
};

function saveTodo(e) {


  if (e.target.classList.contains("todo_save")) {
  
    const eskiText = e.target.closest("div.yeniDiv").firstChild.children[2].textContent
    const newInput = e.target.closest("div.yeniDiv").firstChild.children[0].value
  
    let todos =JSON.parse(localStorage.getItem("todos"));    

    todos.forEach((td)=>{
      if(td.text === eskiText){
        td.text = newInput 
      }
    })

    localStorage.setItem("todos", JSON.stringify(todos));


  console.log(eskiText);
  console.log(newInput);
 

 e.target.closest("div.yeniDiv").firstChild.children[2].textContent= newInput; 

 
    const secilenleft = e.target.closest("div.yeniDiv").firstChild.children[1];
    const secilenright = e.target.closest("div.yeniDiv").firstChild.children[2];
    const secilenButton1 = e.target.closest("div.yeniDiv").children[1].children[0];
   const secilenButton2 =e.target.closest("div.yeniDiv").children[1].children[1];

    secilenleft.classList.remove("blockla");
    secilenright.classList.remove("blockla");
    secilenButton1.classList.remove("blockla");
    secilenButton2.classList.remove("blockla");

    const secilenSolInput =
      e.target.closest("div.yeniDiv").firstChild.firstChild;
    const secilenSagSave =
      e.target.closest("div.yeniDiv").children[1].children[2];

    secilenSolInput.classList.remove("show");
    secilenSagSave.classList.remove("show");
  }
}

deleteBtn.forEach((btn) => {
  btn.addEventListener("click", deleleteFtn);
});
checkboxBtn.forEach((btn) => {
  btn.addEventListener("click", checkFunction);
});
editBtn.forEach((btn) => {
  btn.addEventListener("click", editFunction);
});
saveBtn.forEach((btn) => {
  btn.addEventListener("click", saveTodo);
});

function addElements(todo) {
  const yeniDiv = document.createElement("div");
  yeniDiv.setAttribute("class", "yeniDiv");

  console.log(yeniDiv);

  const divLeft = document.createElement("div");
  divLeft.setAttribute("class", "leftDiv");

  const editInput = document.createElement("input");
  editInput.classList.add("todo_editInput");
  editInput.defaultValue = todo.text;

  const checkBtn = document.createElement("input");
  checkBtn.type = "checkbox";
  checkBtn.setAttribute("class", "checkbox-btn");
  checkBtn.innerHTML = '<i class="fas fa-check-square"></i>';

  const newInput = document.createElement("li");
  newInput.setAttribute("class", "fname");
  newInput.textContent = todo.text;

  divLeft.appendChild(editInput);

  divLeft.appendChild(checkBtn);

  divLeft.appendChild(newInput);

  const rightDiv = document.createElement("div");
  rightDiv.setAttribute("class", "rightDiv");

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");
  editBtn.innerHTML = '<i class="fa fa-edit" style="font-size:25px"></i>';

  const saveBtn = document.createElement("div");
  saveBtn.classList.add("todo_save");
  saveBtn.textContent = "Save";

  yeniDiv.appendChild(divLeft);
  rightDiv.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = '<i class="fa fa-trash" style="font-size:25px" ></i>';
  rightDiv.appendChild(deleteBtn);

  rightDiv.appendChild(saveBtn);

  yeniDiv.appendChild(rightDiv);

  ustdiv.appendChild(yeniDiv);
}

heroForm.addEventListener("submit", gorevPlanla);
