// Отримуємо доступ до HTML елементів
const qrDataInput = document.getElementById('qrDataInput');
const generateButton = document.getElementById('generateButton');
const qrcodeDisplay = document.getElementById('qrcodeDisplay');
const downloadButton = document.getElementById('downloadButton');

let qrcode = null; // Змінна для зберігання об'єкту QR-коду

// Функція для генерації QR-коду
function generateQr() {
    const data = qrDataInput.value; // Отримуємо текст з поля введення

    if (data.trim() === "") { // Перевіряємо, чи поле не порожнє
        alert("Будь ласка, введіть текст або URL!");
        return;
    }

    // Очищуємо попередній QR-код, якщо він був
    qrcodeDisplay.innerHTML = "";
    downloadButton.style.display = "none"; // Ховаємо кнопку завантаження

    // Створюємо новий QR-код за допомогою бібліотеки
    // 'qrcodeDisplay' - це ID елемента, куди буде вставлено QR-код
    qrcode = new QRCode(qrcodeDisplay, {
        text: data,
        width: 200,  // Ширина QR-коду в пікселях
        height: 200, // Висота QR-коду в пікселях
        colorDark: "#000000", // Колір темних модулів
        colorLight: "#ffffff", // Колір світлих модулів (фон)
        correctLevel: QRCode.CorrectLevel.H // Рівень корекції помилок (H - найвищий)
    });

    // Показуємо кнопку завантаження, коли QR-код згенеровано
    // Потрібна невелика затримка, щоб зображення встигло згенеруватися
    setTimeout(() => {
        if (qrcodeDisplay.querySelector('img') || qrcodeDisplay.querySelector('canvas')) {
            downloadButton.style.display = "inline-block";
        }
    }, 100); // 100 мілісекунд
}

// Функція для завантаження QR-коду
function downloadQr() {
    // Бібліотека qrcode.js зазвичай генерує зображення (<img>) або малює на <canvas>
    const imgElement = qrcodeDisplay.querySelector('img');
    const canvasElement = qrcodeDisplay.querySelector('canvas');

    let dataUrl = "";

    if (imgElement) {
        dataUrl = imgElement.src; // Отримуємо дані зображення
    } else if (canvasElement) {
        dataUrl = canvasElement.toDataURL("image/png"); // Конвертуємо canvas в дані зображення
    } else {
        alert("Не вдалося знайти QR-код для завантаження.");
        return;
    }

    const link = document.createElement('a'); // Створюємо тимчасове посилання
    link.download = 'my-qrcode.png'; // Назва файлу для завантаження
    link.href = dataUrl;
    document.body.appendChild(link); // Додаємо посилання на сторінку
    link.click(); // Імітуємо клік для завантаження
    document.body.removeChild(link); // Видаляємо тимчасове посилання
}

// Додаємо обробники подій для кнопок
generateButton.addEventListener('click', generateQr);
downloadButton.addEventListener('click', downloadQr);