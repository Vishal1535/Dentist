document.getElementById("fullName").textContent =
    localStorage.getItem("fullName");

document.getElementById("DOB").textContent =
    localStorage.getItem("DOB");

document.getElementById("Gender").textContent =
    localStorage.getItem("Gender");

document.getElementById("ContactNumber").textContent =
    localStorage.getItem("ContactNumber");

document.getElementById("Ages").textContent =
    localStorage.getItem("Ages");

document.getElementById("email").textContent =
    localStorage.getItem("email");

document.getElementById("Timing").textContent =
    localStorage.getItem("Timing");
document.getElementById("Department").textContent =
    localStorage.getItem("Department");
    document.getElementById("procedure").textContent=localStorage.getItem("procedure");

    let Done=document.getElementById("Done");
    Done.addEventListener("click",()=>{
        alert("Thanks You")
    })
    let AppointMentNumber=document.getElementById("AppointMentNumber");
    AppointMentNumber.innerText=Math.floor(Math.random()*100);