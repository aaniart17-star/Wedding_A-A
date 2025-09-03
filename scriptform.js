// Firebase SDK import
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD67OgSjc3O0vjpJ3-M0Od2K6VJv5GqAD0",
  authDomain: "weddinginvitation-1f0ee.firebaseapp.com",
  projectId: "weddinginvitation-1f0ee",
  storageBucket: "weddinginvitation-1f0ee.firebasestorage.app",
  messagingSenderId: "417266689281",
  appId: "1:417266689281:web:b382844a85561012c5a700",
  measurementId: "G-DSPJ8X7G66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add guest dynamically
function addGuest() {
  const container = document.getElementById("guests-container");
  const wrapper = document.createElement("div");
  wrapper.className = "guest-input-wrapper"; // Եթե ուզում ես fadeIn effect

  const input = document.createElement("input");
  input.type = "text";
  input.name = "guests[]";
  input.placeholder = "Հյուրի անունը";
  input.className = "guest-input"; // Համընկնում CSS-ի հետ

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "remove-guest-btn"; // Համընկնում CSS-ի հետ

  const icon = document.createElement("i");
  icon.className = "fas fa-trash";

  btn.appendChild(icon);
  btn.onclick = function () {
    container.removeChild(wrapper);
  };

  wrapper.appendChild(input);
  wrapper.appendChild(btn);
  container.appendChild(wrapper);
}

// Submit form to Firestore
async function submitForm() {
  const name = document.querySelector('input[name="name"]').value;
  const guests = Array.from(document.querySelectorAll('input[name="guests[]"]')).map(input => input.value);
  const invitedBy = Array.from(document.querySelectorAll('input[name="invited_by"]:checked')).map(input => input.value);
  const attending = document.querySelector('input[name="check"]:checked').value;

  const data = { 
      name: name, 
      attending: attending, 
      guests: guests, 
      invitedBy: invitedBy,
      timestamp: serverTimestamp()
  };

try {
  await addDoc(collection(db, "guests"), data);
  alert("Տվյալները հաջողությամբ պահպանվել են");
} catch (err) {
  alert("Չհաջողվեց պահպանել տվյալները: " + err);
  console.error(err);
  return; // Անմիջապես դուրս գալ ֆունկցիայից, եթե սխալ կա
}

// DOM-ի փոփոխությունները առանձնացնում ենք try/catch-ից
const form = document.getElementById("guests-form");
const container = document.getElementById("guests-container");

if (form) form.reset();
if (container) container.innerHTML = "";


}

// Export functions for use in HTML
window.addGuest = addGuest;
window.submitForm = submitForm;







