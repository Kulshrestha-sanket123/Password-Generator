const lengthSlider = document.getElementById('lengthSlider');
const sliderValue = document.getElementById('sliderValue');
const checkboxes = document.querySelectorAll('.checkbox');
const includeLabels = document.querySelectorAll('.row label');
const generateBtn = document.getElementById('generateBtn');
const password = document.getElementById('password');
const copyIcon = document.getElementById('copyIcon');
const showIcon = document.getElementById('showIcon');
const passwordField = document.getElementById('password');
const strengthText = document.getElementById('strengthText');
const line1 = document.querySelector('.line1');
const line2 = document.querySelector('.line2');


sliderValue.textContent = lengthSlider.value; 
lengthSlider.addEventListener("input", (e)=>{
    
    let min = lengthSlider.min || 0;
    let max = lengthSlider.max || 12;
    let val = lengthSlider.value;

    sliderValue.textContent = lengthSlider.value;
    
    let percentage = ((val - min) / (max - min)) * 100;
    lengthSlider.style.background = `linear-gradient(to right, #4400ff ${percentage}%, #d3d3d3 ${percentage}%)`;
});


Array.from(checkboxes).forEach(Element=>{
    Element.addEventListener('click',(e)=>{
        if(e.target.innerText == 'radio_button_unchecked'){
            e.target.innerText = 'task_alt'
            e.target.nextElementSibling.nextElementSibling.checked = true
        }
        else{
            e.target.innerText = 'radio_button_unchecked'
            e.target.nextElementSibling.nextElementSibling.checked = false
        }
    })
});


Array.from(includeLabels).forEach(Element=>{
    Element.addEventListener('click',(e)=>{
        if(e.target.previousElementSibling.innerText == 'radio_button_unchecked'){
            e.target.previousElementSibling.innerText = 'task_alt';
        }
        else{
            e.target.previousElementSibling.innerText = 'radio_button_unchecked';
        }
    })
});


generateBtn.addEventListener('click', function(){
    let length = lengthSlider.value;

    let uppercase = document.getElementById('uppercase').checked;
    let lowercase = document.getElementById('lowercase').checked;
    let symbols = document.getElementById('symbols').checked;
    let numbers = document.getElementById('numbers').checked;

    let password_generated = generatePassword(length, uppercase, lowercase, symbols, numbers);
    password.value = password_generated;

        weak.classList.remove('active');
        strong.classList.remove('active');

    let val = password.value;
    let hasUpper = /[A-Z]/.test(val);
    let hasLower = /[a-z]/.test(val);
    let hasNumbers = /\d/.test(val);
    let hasSymbols = /[!@#$%^&*/+-]/.test(val);

    if (val.length >= 6 && hasUpper && hasLower && hasNumbers && hasSymbols) {
        strong.classList.add("active");
        strengthText.textContent = "Strong Password! Ready to use.";
        strengthText.style.color = "#2ecc71"; 
        password.style.borderColor = '#2ecc71';
        line1.style.backgroundColor = '#2ecc71';
        line2.style.backgroundColor = '#2ecc71';
    } 
    else {
        weak.classList.add("active");
        strengthText.textContent = "Mix more options for a stronger password.";
        strengthText.style.color = "#ff4d4d";
        password.style.borderColor = '#ff4d4d';
        line1.style.backgroundColor = '#ff4d4d';
        line2.style.backgroundColor = '#ff4d4d';
    }
    });


function generatePassword(length, uppercase, lowercase, symbols, numbers){

    let charset = "";
    let string = "";

    if(uppercase){
        charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if(lowercase){
        charset += "abcdefghijklmnopqrstuvwxyz";
    }
    if(symbols){
        charset += "!@#$%^&*/+-";
    }
    if(numbers){
        charset += "0123456789";
    }

    for(let i=0; i<length; i++){
        string += charset.charAt(Math.floor(Math.random()*charset.length));
    }
    password.value = string;
    password.setAttribute('type', 'password');

    return string;
}


// Password copying function
copyIcon.addEventListener('click', ()=> {

    if(password.value !== ""){
        navigator.clipboard.writeText(password.value);
        copyIcon.innerText = 'check';

        setTimeout(()=>{
            copyIcon.innerText= 'content_copy'
        }, 2000);
        alert("Password Copied!");
    }
});


// Show password function 
let timeoutId;
showIcon.addEventListener('click', ()=>{
    const isPasswordVisible = passwordField.getAttribute('type') === 'text';

    // Toggle the password visibility
    passwordField.setAttribute('type', isPasswordVisible ? 'password' : 'text');

    // Update the icon based on the visibility
    showIcon.textContent = isPasswordVisible ? 'visibility' : 'visibility_off';

    // Time-out to again hide the password
    clearTimeout(timeoutId);

    if(!isPasswordVisible){
        timeoutId = setTimeout(() => {
            passwordField.setAttribute('type', 'password');
            showIcon.textContent = 'visibility';
        }, 3000);
    }
});


// Theme changing function
const toggleTheme = () => {

    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);

    // Updating theme icon
    const themeSwitch = document.getElementById('themeSwitch');
    themeSwitch.textContent = newTheme === 'dark' ? 'light_mode' : 'dark_mode';

    // Updating Color of the theme icon
    themeSwitch.style.color = newTheme === 'dark' ? 'white' : 'black';
};
document.getElementById('themeSwitch').addEventListener('click', toggleTheme);


// Check the Password Strength
password.addEventListener('input', () => {
    
    let value = password.value;
    
    weak.classList.remove('active');
    strong.classList.remove('active');

    if(password.value.length === 0){
        return;
    }
    
    let hasUpper = /[A-Z]/.test(value);
    let hasLower = /[a-z]/.test(value);
    let hasNumbers = /\d/.test(value);
    let hasSymbols = /[!@#$%^&*/+-]/.test(value);

    if (value.length >= 6 && hasUpper && hasLower && hasNumbers && hasSymbols) {
        strong.classList.add("active");
        strengthText.textContent = "Strong Password! Ready to use.";
        strengthText.style.color = "#2ecc71";
        password.style.borderColor = '#2ecc71';
        line1.style.backgroundColor = '#2ecc71';
        line2.style.backgroundColor = '#2ecc71'; 
    } 
    else{
        weak.classList.add("active");
        if(password.value.length < 6) {
            strengthText.textContent = "Too short (Minimum 6 characters)";
        }
        else {
            strengthText.textContent = "Mix Upper, Lower, Numbers & Symbols";
        }
        strengthText.style.color = "#ff4d4d";
        password.style.borderColor = '#ff4d4d';
        line1.style.backgroundColor = '#ff4d4d';
        line2.style.backgroundColor = '#ff4d4d';
    }
}); 

