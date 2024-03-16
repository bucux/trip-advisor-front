

const contact = document.getElementById("contact")
const contactTitre = document.getElementById("contactTitre")
const contact2 = document.getElementById("contact2")
const contact2Titre = document.getElementById("contact2Titre")
const contact2Message = document.getElementById("contact2Message")
const buttonOK = document.querySelector("#contact2 button")
let backend = 'http://localhost:3000'

console.log(window.location.hostname)
if (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
  backend = 'site--contactform--tripadvisor-back--ving-btfr.code.run'
}

const clickContact = () => {
  contact.style.display = contact.style.display === "block" ? "none" : "block" // ouvre ou ferme la popup
  contactTitre.innerText = "FORMULAIRE DE CONTACT"
  contactTitre.style.color = 'black'
}

const clickSubmit = (e) => {
  e.preventDefault()
  const form = e.target.form
  const formData = new FormData(form)
  const data = {}
  for (let [key, value] of formData.entries()) {
    data[key] = value
  }
  if(!isEmail(data.email)){
    contactTitre.innerText = "FORMAT D'EMAIL INCORRECT"
    contactTitre.style.color = 'red'
    return
  }
  if(!data.nom || !data.prenom || !data.message){
    contactTitre.innerText = "TOUS LES CHAMPS SONT REQUIS"
    contactTitre.style.color = 'red'
    return
  }
  post(data)
  openContact2()
}

const post = async (data) => {
  try{
    console.log(backend)
    const rep = await axios.post(`${backend}/contact`, data);
    majContact2(rep.data.message)
    contact.style.display = "none"
  }catch(error){
    console.log(error.message) // affiche un message d'erreur system généré par axios
    console.log(error.response.data) // affiche le message d'erreur personnalisé définit dans le backend
  }
}

const openContact2 = () => {
  contact2.style.display = "block"
  contact2Titre.innerHTML = "ENVOI EN COURS...."
  contact2Message.innerText = "....PATIENCE...."
  buttonOK.style.display = "none"
}

const majContact2 = (message) => {
  contact2Titre.innerText = "VOTRE MESSAGE A ÉTÉ ENVOYÉ AVEC SUCCES !"
  contact2Message.innerText = message
  buttonOK.style.display = "block"
}

const closeContact2 = () => {
  contact2.style.display = "none"
}

function isEmail(val) { // si l'email est valide
  if(!val){return false}
  var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(val);
}