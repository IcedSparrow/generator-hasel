// Funkcja generująca hasło na podstawie wybranych opcji
function generatePassword() {
    const length = parseInt(document.getElementById('length').value, 10); // Parsowanie długości hasła do liczby
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;

    // Sprawdzenie długości hasła
    if (length < 6 || length > 20) {
        showToast('Wybierz długość hasła pomiędzy 6 a 20', 'error');
        return;
    }

    // Zestawy znaków do użycia
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
  
    let availableChars = '';
    if (includeUppercase) availableChars += uppercaseLetters;
    if (includeLowercase) availableChars += lowercaseLetters;
    if (includeNumbers) availableChars += numbers;
    if (includeSymbols) availableChars += symbols;

    // Sprawdzenie, czy wybrano przynajmniej jeden zestaw znaków
    if (availableChars.length === 0) {
        showToast('Wybierz przynajmniej jeden zestaw znaków do generowania hasła', 'error');
        return;
    }

    // Generowanie hasła
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * availableChars.length);
        password += availableChars[randomIndex];
    }

    document.getElementById('password').value = password; // Ustawienie wygenerowanego hasła w polu
    showToast('Hasło wygenerowane', 'success'); // Powiadomienie o sukcesie
}

// Funkcja kopiująca hasło do schowka
function copyPassword() {
    const passwordField = document.getElementById('password');
    passwordField.select();
    document.execCommand('copy'); // Kopiowanie hasła
    showToast('Hasło skopiowane do schowka', 'success');
}

// Funkcja wyświetlająca powiadomienia (toasty)
function showToast(message, type) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.classList.add('toast');

    // Ustawienie koloru obramowania w zależności od typu powiadomienia
    if (type === 'error') {
        toast.style.border = '1px solid red';
    } else if (type === 'success') {
        toast.style.border = '1px solid green';
    }

    // Dodanie treści powiadomienia
    toast.innerHTML = `
        <span>${message}</span>
        <button class="toast-close" onclick="closeToast(this)">×</button>
    `;

    toastContainer.appendChild(toast); // Dodanie powiadomienia do kontenera

    // Animacja znikania powiadomienia
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            toast.remove();
        }, 500); // Usunięcie powiadomienia po zniknięciu
    }, 5000); // Czas wyświetlania powiadomienia
}

// Funkcja zamykająca powiadomienie
function closeToast(button) {
    const toast = button.parentElement;
    toast.style.opacity = '0'; // Animacja znikania
    setTimeout(() => {
        toast.remove();
    }, 500); // Usunięcie powiadomienia
}
