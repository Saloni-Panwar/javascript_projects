const adduserbtn = document.getElementById('adduser');
const btntext = adduserbtn.innerText;
let searchdata=document.getElementById('search');

let username = document.getElementById('username');
let usersarray = [];
let edit_id = null;
const recorddisplay = document.getElementById('recorddisplay');
let objdata = localStorage.getItem("users");

if (objdata != null) {
    usersarray = JSON.parse(objdata);
}
displayinfo();
adduserbtn.onclick = () => {
    const name = username.value.trim();
    if (edit_id != null) {
        // edit
        usersarray.splice(edit_id, 1, { "name": name });
    }
    else {
        // insert
        usersarray.push({ "name": name });
    }
    // const name = username.value.trim();
    // usersarray.push({ "name": name });
    saveinfo(usersarray);
    displayinfo();
    username.value = "";
}

function saveinfo(usersarray) {
    let data = JSON.stringify(usersarray);
    localStorage.setItem('users', data);
}

function displayinfo() {
    let statement = '';
    usersarray.forEach((user, i) => {
        statement += `  <tr>
        <th scope="row">${i + 1}</th>
        <td>${user.name}</td>
        <td><i class="btn btn-custom bg-primary text-light fa fa-edit btn-primary  text-white mx-3" onclick="editinfo(${i})"></i> <i class="btn btn-custom bg-warning text-white fa-sharp fa-solid fa-trash"  onclick="deleteinfo(${i})"></i></td>
    </tr>`;
    });
    recorddisplay.innerHTML = statement;
    adduserbtn.innerText = btntext;
}
function editinfo(id) {
    edit_id = id;
    username.value = usersarray[id].name;
    adduserbtn.innerHTML = 'save changes';
}
function deleteinfo(id) {
    usersarray.splice(id, 1);
    saveinfo(usersarray);
    displayinfo();
}

function searchinfo(id) {
    let searchTerm = searchdata.value.trim().toLowerCase();
    let searchResults = usersarray.filter(user => user.name.toLowerCase().includes(searchTerm));
   
    if (searchResults.length === 0) {
        alert("No Data Found");
    } else {
        let statement = '';
        searchResults.forEach((user, i) => {
            statement += `  <tr>
            <th scope="row">${i + 1}</th>
            <td>${user.name}</td>
            <td><i class="btn fa fa-edit btn-primary  text-white mx-3" onclick="editinfo(${i})"></i> <i class="btn btn-danger fa-sharp fa-solid fa-trash"  onclick="deleteinfo(${i})"></i></td>
        </tr>`;
        });
        recorddisplay.innerHTML = statement;
    }
}
document.getElementById('searchBtn').onclick = searchinfo;