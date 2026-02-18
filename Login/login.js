
// CLEAR ALL ERRORS

function clearAllErrors() {
    document.querySelectorAll(".error-msg").forEach(err => err.remove());

    document.querySelectorAll("input, select, #radio").forEach(el => {
        el.style.border = "";
    });
}


// DATE FORMAT (DD-MM-YYYY)

function formatDateToDDMMYYYY(dateValue) {
    const date = new Date(dateValue);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}


// FORM & BUTTON

const form = document.querySelector("form");
const submitBtn = document.querySelector(".SubmitBtn");

form.addEventListener("submit", e => e.preventDefault());


// SUBMIT CLICK

submitBtn.addEventListener("click", () => {

    let isValid = true;
    let firstErrorField = null;

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

    clearAllErrors();

    
    // VALIDATIONS
    

    // First Name
    const fname = document.getElementById("fname");
    if (fname.value.trim() === "") {
        showError(fname, "First name is required");
    } else if (!/^[A-Za-z\s]+$/.test(fname.value)) {
        showError(fname, "Only alphabets allowed");
    }

    // Last Name
    const lname = document.getElementById("LastName");
    if (lname.value.trim() === "") {
        showError(lname, "Last name is required");
    } else if (!/^[A-Za-z\s]+$/.test(lname.value)) {
        showError(lname, "Only alphabets allowed");
    }

    // Appointment Date (Calendar compulsory)
    const dob = document.getElementById("DOB");
    if (dob.value === "") {
        showError(dob, "Please select appointment date");
    }

    // Gender
    const gender = document.getElementById("Gender");
    if (gender.value === "Gender") {
        showError(gender, "Please select gender");
    }

    // Contact Number
    const contact = document.getElementById("ContactNumber");
    if (!/^\d{10}$/.test(contact.value)) {
        showError(contact, "Enter valid 10 digit number");
    }

    // Email
    const email = document.getElementById("email");
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email.value)) {
        showError(email, "Enter valid Gmail ID");
    }

    // Age
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

    
    // RADIO YES / NO
    
    const radios = document.querySelectorAll('input[name="radio"]');
    const radioContainer = document.getElementById("radio");
    let radioChecked = false;

    radios.forEach(r => {
        if (r.checked) radioChecked = true;
    });

    if (!radioChecked) {
        isValid = false;
        radioContainer.style.border = "2px solid red";
        radioContainer.style.padding = "6px";

        const old = radioContainer.querySelector(".error-msg");
        if (old) old.remove();

        const error = document.createElement("small");
        error.className = "error-msg";
        error.style.color = "red";
        error.textContent = "Please select Yes or No";
        radioContainer.appendChild(error);

        if (!firstErrorField) firstErrorField = radioContainer;
    }

    
    // STOP IF ERROR
    
    if (!isValid) {
        firstErrorField?.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
        return;
    }

    
    // SAVE DATA
    
    const Department = document.getElementById("Department");
    const procedure = document.getElementById("procedure");

    localStorage.setItem("fullName", fname.value + " " + lname.value);
    localStorage.setItem("DOB", formatDateToDDMMYYYY(dob.value));
    localStorage.setItem("Gender", gender.value);
    localStorage.setItem("ContactNumber", contact.value);
    localStorage.setItem("Ages", age.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("Timing", timing.value);
    localStorage.setItem("Department", Department.value);
    localStorage.setItem("procedure", procedure.value);

    
    // OPEN NEXT PAGE (NEW TAB)
    
    window.open("./Appointment.html", "_blank");
});


// LIVE ERROR REMOVE

document.querySelectorAll("input, select").forEach(el => {
    const eventType = el.tagName === "SELECT" ? "change" : "input";
    el.addEventListener(eventType, clearAllErrors);
});

document.querySelectorAll('input[name="radio"]').forEach(r => {
    r.addEventListener("change", clearAllErrors);
});
