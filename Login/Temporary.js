
// CLEAR ALL ERRORS (GLOBAL)
function clearAllErrors() {
    // saare error messages hatao
    document.querySelectorAll(".error-msg").forEach(err => err.remove());

    // saare red borders hatao
    document.querySelectorAll("input, select").forEach(el => {
        el.style.border = "";
    });
}


// FORM & BUTTON

const form = document.querySelector("form");
const submitBtn = document.querySelector(".SubmitBtn");

// form submit default block
form.addEventListener("submit", e => e.preventDefault());


// SUBMIT BUTTON CLICK

submitBtn.addEventListener("click", () => {

    let isValid = true;
    let firstErrorField = null;

    // ---- show error helper ----
    function showError(input, message) {
        isValid = false;
        input.style.border = "2px solid red";

        const old = input.parentElement.querySelector(".error-msg");
        if (old) old.remove();

        const error = document.createElement("small");
        error.className = "error-msg";
        error.style.color = "red";
        error.textContent = message;
        input.parentElement.appendChild(error);

        if (!firstErrorField) firstErrorField = input;
    }

    // submit pe aate hi pehle sab clear
    clearAllErrors();

   
    // FIELD VALIDATIONS
   

    // First Name (alphabets only)
    const fname = document.getElementById("fname");
    if (fname.value.trim() === "") {
        showError(fname, "First name is required");
    } else if (!/^[A-Za-z\s]+$/.test(fname.value)) {
        showError(fname, "Only alphabets allowed");
    }

    // Last Name (alphabets only)
    const lname = document.getElementById("LastName");
    if (lname.value.trim() === "") {
        showError(lname, "Last name is required");
    } else if (!/^[A-Za-z\s]+$/.test(lname.value)) {
        showError(lname, "Only alphabets allowed");
    }

    // Appointment ID (numbers only – optional)
    const appointmentId = document.getElementById("AppointmentID");
    if (appointmentId && appointmentId.value.trim() !== "") {
        if (!/^\d+$/.test(appointmentId.value)) {
            showError(appointmentId, "Numbers only allowed");
        }
    }

    // Appointment Date (DD-MM-YYYY + real date)
    const dob = document.getElementById("DOB");
    if (dob.value.trim() === "") {
        showError(dob, "Appointment Date is required");
    } else if (!isValidDate(dob.value)) {
        showError(dob, "Invalid date (DD-MM-YYYY)");
    }

    // Gender
    const gender = document.getElementById("Gender");
    if (gender.value === "Gender") {
        showError(gender, "Please select gender");
    }

    // Contact Number (10 digits)
    const contact = document.getElementById("ContactNumber");
    if (!/^\d{10}$/.test(contact.value)) {
        showError(contact, "Enter valid 10 digit number");
    }

    // Email (gmail only)
    const email = document.getElementById("email");
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email.value)) {
        showError(email, "Enter valid Gmail ID");
    }

    // Age (1–120)
    const age = document.getElementById("Ages");
    const ageValue = parseInt(age.value, 10);
    if (age.value.trim() === "") {
        showError(age, "Age is required");
    } else if (isNaN(ageValue) || ageValue < 1 || ageValue > 120) {
        showError(age, "Age must be between 1 and 120");
    }

    // Timing
    const timing = document.getElementById("Timing");
    if (timing.value === "Please Select") {
        showError(timing, "Please select timing");
    }

    // Area
    const area = document.getElementById("Area");
    if (area.value === "--Please Select") {
        showError(area, "Please select area");
    }

    // Radio (Yes / No)
    const radios = document.querySelectorAll('input[name="radio"]');
    let radioChecked = false;
    radios.forEach(r => { if (r.checked) radioChecked = true; });

    if (!radioChecked) {
        // alert("❌ Please select Yes / No");
        isValid = false;
    }

   
    // STOP IF ERROR
 
    if (!isValid) {
        firstErrorField?.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
        return;
    }

    let Department=document.getElementById("Department");
    let procedure=document.getElementById("procedure");
    // SUCCESS → SAVE + REDIRECT

    localStorage.setItem("fullName", fname.value + " " + lname.value);
    localStorage.setItem("DOB", dob.value);
    localStorage.setItem("Gender", gender.value);
    localStorage.setItem("ContactNumber", contact.value);
    localStorage.setItem("Ages", age.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("Timing", timing.value);
    localStorage.setItem("Department",Department.value);
    localStorage.setItem("procedure",procedure.value);

    if (appointmentId) {
        localStorage.setItem("AppointmentID", appointmentId.value);
    }

    //  Redirect
   window.open("./Appointment/Appointment.html", "_blank");

    
});


// DATE VALIDATION FUNCTION

function isValidDate(dateStr) {
    if (!/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) return false;

    const [day, month, year] = dateStr.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
}


// LIVE ERROR CLEAR (GLOBAL)

document.querySelectorAll("input, select").forEach(el => {
    const eventType = el.tagName === "SELECT" ? "change" : "input";
    el.addEventListener(eventType, () => {
        clearAllErrors(); //  sab errors ek saath hatenge
    });
});
