// Firebase SDK import
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUduVi_b41Ajui8CNfw-aWCEe90noc0EU",
  authDomain: "wedding-f515.firebaseapp.com",
  projectId: "wedding-f515",
  storageBucket: "wedding-f515.firebasestorage.app",
  messagingSenderId: "465072013903",
  appId: "1:465072013903:web:2dae675cfaeaed65fe603a",
  measurementId: "G-5Y3CGWQ4W1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add guest dynamically
function addGuest() {
  const container = document.getElementById("guests-container");
  const wrapper = document.createElement("div");

  const input = document.createElement("input");
  input.type = "text";
  input.name = "guests[]";
  input.placeholder = "Հյուրի անունը";
  input.className = "input-style";

  const btn = document.createElement("button");
  btn.type = "button";
  btn.classList.add("remove-btn");

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
      timestamp: new Date()
  };

  try {
    await addDoc(collection(db, "RSVP"), data);
    alert("Տվյալները հաջողությամբ պահպանվել են Firestore-ում!");
    // Reset form and guests container
    document.getElementById("rsvp-form").reset();
    document.getElementById("guests-container").innerHTML = "";
  } catch (err) {
    alert("Չհաջողվեց պահպանել տվյալները: " + err);
    console.error(err);
  }
}

// Export functions for use in HTML
window.addGuest = addGuest;
window.submitForm = submitForm;
