
// Script principal: menu mobile, validação de formulário e accordion FAQ
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile toggle
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
    menuToggle.innerHTML = '&#9776;'; // hamburger

    const headerContainer = document.querySelector('.header-container');
    if (headerContainer) {
        headerContainer.insertBefore(menuToggle, headerContainer.querySelector('nav'));
        const nav = headerContainer.querySelector('nav');
        menuToggle.addEventListener('click', function() {
            const isOpen = nav.classList.toggle('open');
            this.setAttribute('aria-expanded', String(isOpen));
            this.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
        });
    }

    // Validação do formulário de contato (se existir)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            clearErrors();

            const nome = document.getElementById('nome');
            const email = document.getElementById('email');
            const mensagem = document.getElementById('mensagem');
            let valid = true;

            if (!nome || nome.value.trim().length < 2) {
                showError(nome, 'Informe seu nome completo.');
                valid = false;
            }
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                showError(email, 'Informe um e-mail válido.');
                valid = false;
            }
            if (!mensagem || mensagem.value.trim().length < 5) {
                showError(mensagem, 'A mensagem é muito curta.');
                valid = false;
            }

            if (valid) {
                // Simular envio (já que estamos em ambiente local)
                contactForm.reset();
                alert('Mensagem enviada com sucesso (simulado).');
            }
        });
    }

    // Accordion para FAQ (utilizando details/summary ou .faq-item)
    const faqItems = document.querySelectorAll('.faq-item, details.faq-item');
    faqItems.forEach(item => {
        // Se for <details>, usar evento 'toggle'
        if (item.tagName.toLowerCase() === 'details') {
            item.addEventListener('toggle', function() {
                if (this.open) {
                    faqItems.forEach(other => { if (other !== this) other.open = false; });
                }
            });
        } else {
            // para elementos customizados, adicionar click no summary
            const summary = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            if (summary && answer) {
                summary.addEventListener('click', () => {
                    const isOpen = item.classList.toggle('open');
                    // fechar outros
                    faqItems.forEach(other => { if (other !== item) other.classList.remove('open'); });
                });
            }
        }
    });
});

// Funções utilitárias para validação
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
}

function showError(input, message) {
    if (!input) return;
    input.classList.add('error');
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    input.parentNode.appendChild(errorElement);
}
