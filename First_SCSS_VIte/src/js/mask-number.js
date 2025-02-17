IMask(document.getElementById('price-number-mask'), {
    mask: [
        {
            mask: '0$',
            lazy: false,
            placeholderChar: '0' // Вказуємо, що плейсхолдером має бути '0' замість '_'
        },
        {
            mask: 'num$',
            lazy: false,
            blocks: {
                num: {
                    mask: Number,
                    thousandsSeparator: ' ',
                    min: 1,  // Мінімальне значення тепер 1, щоб не дозволяти нуль як перше число
                    max: 100000000000000000,
                    expose: true
                }
            }
        }
    ],
    dispatch: (appended, dynamicMasked) => {
        // Якщо введення порожнє або є тільки символ долара, використовуємо маску '0$'
        if (dynamicMasked.value === '' || dynamicMasked.value === '$') {
            return dynamicMasked.compiledMasks[0]; // Перша маска - '0$'
        }
        // Перевірка першого символу, якщо введено щось більше ніж просто '$'
        let firstChar = (dynamicMasked.value + appended).replace(/[^0-9]/g, '')[0];
        if (firstChar === '0' && (dynamicMasked.value + appended).replace(/[^0-9]/g, '').length > 1) {
            // Якщо перший символ '0' і довжина числа більше 1, повертаємо маску 'num$', але користувач не зможе ввести 0 як перше число завдяки min: 1
            return dynamicMasked.compiledMasks[1];
        }
        // В інших випадках використовуємо маску 'num$'
        return dynamicMasked.compiledMasks[1];
    }
});