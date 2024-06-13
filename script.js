var adminList = [];
var count = 1;
function addAdmin(name, email) {
  var newAdmin = { id: count++, name: name, email: email };
  adminList.push(newAdmin);
  localStorage.setItem('adminList', JSON.stringify(adminList));
  renderAdminList();
}

function deleteAdmin(adminId) {
  var updatedAdminList = adminList.filter(function (admin) {
    return admin.id !== adminId;
  });

  if (updatedAdminList.length < adminList.length) {
    adminList = updatedAdminList;
    localStorage.setItem('adminList', JSON.stringify(adminList));
    renderAdminList();
  } else {
    alert('Cadastro não encontrado.');
  }
}
function getAdminList() {
  var storedList = JSON.parse(localStorage.getItem('adminList'));
  adminList = storedList || [];
}
function renderAdminList(admins) {
  var adminListElement = document.getElementById('adminList');
  adminListElement.innerHTML = '';

  adminList.forEach(function (admin) {
    var listItem = document.createElement('li');
    listItem.innerHTML = '<span class="admin-name">' + admin.name + '</span> (Email: ' + admin.email + ') <button class="delete-button" onclick="deleteAdmin(' + admin.id + ')">Excluir</button>';
    adminListElement.appendChild(listItem);
  });
}
getAdminList();
renderAdminList(adminList);

document.getElementById('adminForm').addEventListener('submit', function (event) {
  event.preventDefault();
  var nameInput = document.getElementById('nameInput');
  var emailInput = document.getElementById('emailInput');
  addAdmin(nameInput.value, emailInput.value);
  nameInput.value = '';
  emailInput.value = '';
});
localStorage.removeItem('nome');
if (localStorage.getItem('nome') !== null) {
  localStorage.removeItem('nome');

}
function deleteAllAdmins(){
document.getElementById('limparLista').addEventListener('click', function () {
  let lista = document.getElementById('AdminList');
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }
});
}

function searchAdmins() {
  var procurar = document.getElementById('searchInput').value
  var filteredAdminList = adminList.filter(function (admin) {
    return admin.name.includes(procurar) || admin.email.includes(procurar);
  });
  renderAdminList(filteredAdminList);
}
document.getElementById('limparLista').addEventListener('click', deleteAllAdmins);
document.getElementById('searchButton').addEventListener('click', searchAdmins);
