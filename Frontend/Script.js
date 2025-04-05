let menuIcon = document.querySelector('#menu-icon');
let navbar=document.querySelector('.navbar');
let sections=document.querySelectorAll('section');
let navLinks=document.querySelectorAll('header nav a'); 
window.onscroll = () => {
    sections.forEach(sec => {
        let top=window.scrollY;
        let offset=sec.offsetTop-150;
        let height=sec.offsetHeight;
        let id=sec.getAttribute('id');
        if(top >= offset && top < offset + height){
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });
}
menuIcon.onclick = () =>{
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}
document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    let formData = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
    };

    const BASE_URL = "http://localhost:3000"; // FIXED: Use HTTP

    try {
        let response = await fetch(`${window.location.origin}/submit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        let result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error("Error sending data:", error);
        alert("Failed to send data. Check console for details.");
    }
});
