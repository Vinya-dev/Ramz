document.addEventListener('DOMContentLoaded', () => {
    const areaInput = document.getElementById('area-input');
    const checkboxes = document.querySelectorAll('.service-checkbox');
    const radioButtons = document.querySelectorAll('input[name="term"]');
    
    const totalPriceEl = document.getElementById('total-price');
    const selectedTermEl = document.getElementById('selected-term');

    function formatPrice(number) {
        return number.toLocaleString('ru-RU') + ' ₽';
    }

    function calculate() {
        const area = parseFloat(areaInput.value) || 0;

        let basePricePerMeter = 0;
        checkboxes.forEach(cb => {
            if (cb.checked) {
                basePricePerMeter += parseFloat(cb.value);
            }
        });

        let timeFactor = 1;
        let termText = '';
        radioButtons.forEach(radio => {
            if (radio.checked) {
                timeFactor = parseFloat(radio.value);
                termText = radio.nextElementSibling.textContent.trim();
            }
        });

        const total = (area * basePricePerMeter) * timeFactor;

        totalPriceEl.textContent = formatPrice(total);
        selectedTermEl.innerHTML = `<img src="kalendar.png" alt="Срок"> Срок: ${termText}`;
    }

    areaInput.addEventListener('input', calculate);
    
    checkboxes.forEach(cb => {
        cb.addEventListener('change', calculate);
    });

    radioButtons.forEach(radio => {
        radio.addEventListener('change', calculate);
    });

    calculate();
});
