// Функція для оновлення відображуваного проценту
function updatePercentageDisplay(element) {
    let percent = element.getAttribute('data-percent');
    element.textContent = `+${percent}%`;
}

// Встановлюємо спостерігач за змінами атрибутів для кожного елемента з класом item-end
document.querySelectorAll('.item.item-end').forEach(item => {
    let observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-percent') {
                updatePercentageDisplay(item);
            }
        });
    });

    // Конфігурація спостерігача: спостерігаємо за змінами атрибутів
    let config = { attributes: true };

    // Починаємо спостереження за елементом
    observer.observe(item, config);
    // Оновлюємо відображення відразу після встановлення спостерігача
    updatePercentageDisplay(item);
});

window.calculateEarnings = function () {
    let inputValue = document.getElementById('price-number-mask').value.replace(/[^0-9.]/g, '');
    if (!inputValue) return;
    let totalEarnings = 0;
    document.querySelectorAll('.rightCalculator .row').forEach(row => {
        let percent = parseFloat(row.querySelector('.item.item-end').getAttribute('data-percent'));
        let earnings = parseFloat(inputValue) * (percent / 100);
        row.querySelector('.item.item-center').textContent = `+${earnings.toFixed(2)}$`;
        totalEarnings += earnings;
    });
    document.querySelector('.left-calc-text-container span').textContent = `+ ${totalEarnings.toFixed(2)}$`;
};
