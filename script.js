// Отримуємо доступ до HTML елементів
const qrDataInput = document.getElementById('qrDataInput');
const generateButton = document.getElementById('generateButton'); // Використовуйте, якщо у вас є ця кнопка
const qrcodeDisplay = document.getElementById('qrcodeDisplay');
const downloadButton = document.getElementById('downloadButton');
const sizeRadioButtons = document.getElementsByName('qrSizeOption');

let qrcode = null; // Змінна для зберігання об'єкту QR-коду

// Функція для генерації QR-коду
function generateQr() {
    const data = qrDataInput.value.trim();

    qrcodeDisplay.innerHTML = ""; // Завжди очищуємо перед новою генерацією
    downloadButton.style.display = "none";

    if (data === "") {
        // Можна додати alert або інше сповіщення, якщо поле порожнє,
        // але для "чистого коду" поки приберемо alert.
        // Якщо потрібно, щоб порожнє поле нічого не генерувало:
        return;
    }

    let selectedSize = 256; // Розмір за замовчуванням
    for (let i = 0; i < sizeRadioButtons.length; i++) {
        if (sizeRadioButtons[i].checked) {
            selectedSize = parseInt(sizeRadioButtons[i].value);
            break;
        }
    }

    qrcode = new QRCode(qrcodeDisplay, {
        text: data,
        width: selectedSize,
        height: selectedSize,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    setTimeout(() => {
        if (qrcodeDisplay.querySelector('img') || qrcodeDisplay.querySelector('canvas')) {
            downloadButton.style.display = "inline-block";
        }
    }, 100);
}

// Функція для завантаження QR-коду
function downloadQr() {
    const imgElement = qrcodeDisplay.querySelector('img');
    const canvasElement = qrcodeDisplay.querySelector('canvas');
    let dataUrl = "";

    if (imgElement) {
        dataUrl = imgElement.src;
    } else if (canvasElement) {
        dataUrl = canvasElement.toDataURL("image/png");
    } else {
        // Можна додати alert або інше сповіщення
        return;
    }

    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Додаємо обробники подій
if (generateButton) { // Якщо кнопка генерації існує
    generateButton.addEventListener('click', generateQr);
} else { // Якщо кнопки немає, генеруємо при введенні
    qrDataInput.addEventListener('input', generateQr);
}

downloadButton.addEventListener('click', downloadQr);

sizeRadioButtons.forEach(radio => {
    radio.addEventListener('change', () => {
        if (qrDataInput.value.trim() !== "") {
            generateQr();
        }
    });
});

// Початкова генерація, якщо потрібно (наприклад, якщо є значення в полі вводу при завантаженні)
// if (qrDataInput.value.trim() !== "") {
//     generateQr();
// }
