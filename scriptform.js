

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

 
  async function submitForm() {
    const name = document.querySelector('input[name="name"]').value;
    const guests = Array.from(document.querySelectorAll('input[name="guests[]"]')).map(input => input.value);
    const invitedBy = Array.from(document.querySelectorAll('input[name="invited_by"]:checked')).map(input => input.value);
    const attending = document.querySelector('input[name="check"]:checked').value;

    const data = { 
        name: name, 
        attending: attending, 
        guests: guests, 
        invitedBy: invitedBy 
    };

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbz0nYPqE-1lWsDs_FrB7CSzMc3VzxMKCRokmDUz72nuzI9GuirsvU-5rDNV6LR67JlX/exec", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });

      const result = await response.json();
      if (result.result === "success") {
        alert("Տվյալները հաջողությամբ պահպանվել են!");
      } else {
        alert("Սխալ գրանցման ժամանակ: " + JSON.stringify(result));
      }
    } catch (err) {
      alert("Չհաջողվեց կապ հաստատել սերվերի հետ: " + err);
    }
  }

