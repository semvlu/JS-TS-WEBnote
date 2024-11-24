function showPwdTempo(inputElement) {
    let timer;
    let fullPwd = "";
    clearTimeout(timer); 
    const curPwd = inputElement.value;

    const newChar = curPwd.slice(fullPwd.length); 
    fullPwd += newChar;

    // display new char
    inputElement.type = 'text';
    inputElement.value = '●'.repeat(fullPwd.length - 1) + newChar; // Show dots except the new char

    timer = setTimeout(() => {
        // Revert to password type and restore all dots
        inputElement.type = 'password';
        inputElement.value = '●'.repeat(fullPwd.length); // Restore dots for the full length
    }, 500);              
}

function showSpinner(button) {
    // Create a spinner
    const spinner = document.createElement('span');
    const sel = Math.round(Math.random());
    if (sel == 0) {
        spinner.className = 'spinner-border spinner-border-sm';
    } else spinner.className = 'spinner-grow spinner-grow-sm';
    spinner.setAttribute('role', 'status');
    spinner.setAttribute('aria-hidden', 'true');

    button.disabled = true;
    const btnTxt = button.innerHTML;
    button.innerHTML = ''; 
    button.appendChild(spinner);

    setTimeout(() => {
        button.disabled = false;
        button.innerHTML = btnTxt; 
    }, 2000); 
}

function addEventListeners() {
    $(() => {
    });
}
