// INPUT
const dayInp = document.getElementById("day");
const monthInp = document.getElementById("month");
const yearInp = document.getElementById("year");

// OUTPUTS
const dayOtp = document.getElementById("DD");
const monthOtp = document.getElementById("MM");
const yearOtp = document.getElementById("YY");

// FORM ELEMENT
const form = document.querySelector("form");

// ADDING THE SUBMIT EVENTLISTENER TO FORM
form.addEventListener("submit", handleSubmit);

const date = new Date();
let day = date.getDate();
let month = 1 + date.getMonth();
let year = date.getFullYear();

const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function validate() {
    const inputs = document.querySelectorAll("input");
    let validator = true;
    inputs.forEach((i) => {
        const parent = i.parentElement;
        if (!i.value) {
            i.style.borderColor = "red";
            parent.querySelector("small").innerText = "this field is required";
            validator = false;
        } else if (i === monthInp && (i.value < 1 || i.value > 12)) {
            monthInp.style.borderColor = "red";
            monthInp.parentElement.querySelector("small").innerText = "must be a valid month";
            validator = false;
        } else if (i === dayInp && (i.value < 1 || i.value > 31)) {
            dayInp.style.borderColor = "red";
            dayInp.parentElement.querySelector("small").innerText = "must be a valid day";
            validator = false;
        } else {
            i.style.borderColor = "black";
            parent.querySelector("small").innerText = "";
        }
    });
    return validator;
}

function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
        const inputDay = parseInt(dayInp.value);
        const inputMonth = parseInt(monthInp.value);
        const inputYear = parseInt(yearInp.value);

        let d = day - inputDay;
        let m = month - inputMonth;
        let y = year - inputYear;

        // Adjust for negative days
        if (d < 0) {
            d += months[(month - 2 + 12) % 12]; // Adjust for the previous month
            m--;
        }
        // Adjust for negative months
        if (m < 0) {
            m += 12;
            y--;
        }

        dayOtp.innerHTML = d;
        monthOtp.innerHTML = m;
        yearOtp.innerHTML = y; // Corrected from year.innerHTML to yearOtp.innerHTML
    }
}