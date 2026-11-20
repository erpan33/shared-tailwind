import './styles/theme.css';
import './styles/components.css';

// 1. Perpindahan tab aktif melengkung (curved notch) di sidebar
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach((item) => {
    item.addEventListener('click', () => {
        menuItems.forEach((el) => el.classList.remove('active'));
        item.classList.add('active');
    });
});

// 2. Interaksi 4 kartu sistem (klik kartu / toggle switch)
const controlCards = document.querySelectorAll('[data-card]');
controlCards.forEach((card) => {
    const checkbox = card.querySelector('input[type="checkbox"]');
    const stateLabel = card.querySelector('.state-text');

    card.addEventListener('click', (e) => {
        if (e.target.closest('.switch')) return;
        controlCards.forEach((c) => c.classList.remove('is-active'));
        card.classList.add('is-active');
    });

    checkbox.addEventListener('change', () => {
        stateLabel.textContent = checkbox.checked ? 'ON' : 'OFF';
    });
});

// 3. Sinkronisasi label HEX & fitur copy otomatis dari variabel di theme.css
const rootStyles = getComputedStyle(document.documentElement);
const toast = document.getElementById('copy-toast');
const toastText = document.getElementById('toast-text');
const toastDot = document.getElementById('toast-dot');
let toastTimer;

document.querySelectorAll('.swatch-rule-btn').forEach((btn) => {
    const cssVarName = btn.dataset.var;
    const liveHex = rootStyles.getPropertyValue(cssVarName).trim().toUpperCase();
    const hexLabel = btn.querySelector('[data-hex-label]');

    if (hexLabel && liveHex) {
        hexLabel.textContent = liveHex;
    }

    btn.addEventListener('click', async () => {
        const currentHex = rootStyles.getPropertyValue(cssVarName).trim().toUpperCase();
        await navigator.clipboard.writeText(currentHex);
        toastDot.style.background = currentHex;
        toastText.textContent = `Warna ${currentHex} disalin!`;
        toast.classList.add('show');

        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
    });
});