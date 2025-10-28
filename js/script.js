// Validação do formulário de contato
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Limpar erros anteriores
            clearErrors();
            
            // Validar campos
            const nome = document.getElementById('nome');
            const email = document.getElementById('email');
            const mensagem = document.getElementById('mensagem');
            
            let isValid = true;
            
            // Validar nome
            if (!nome.value.trim()) {
                showError(nome, 'Por favor, informe seu nome completo.');
                isValid = false;
            }
            
            // Validar email
            if (!email.value.trim()) {
                showError(email, 'Por favor, informe seu e-mail.');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Por favor, informe um e-mail válido.');
                isValid = false;
            }
            
            // Validar mensagem
            if (!mensagem.value.trim()) {
                showError(mensagem, 'Por favor, escreva sua mensagem.');
                isValid = false;
            }
            
            if (isValid) {
                // Simular envio do formulário
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                contactForm.reset();
            }
        });
        
        function showError(input, message) {
            input.classList.add('error');
            
            const errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            
            input.parentNode.appendChild(errorElement);
        }
        
        function clearErrors() {
            const errors = document.querySelectorAll('.error-message');
            errors.forEach(error => error.remove());
            
            const errorInputs = document.querySelectorAll('.form-control.error');
            errorInputs.forEach(input => input.classList.remove('error'));
        }
        
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }
});
// Adicionar interação aos itens do FAQ
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    item.addEventListener('toggle', function() {
        if (this.open) {
            // Fechar outros itens abertos (comportamento de accordion)
            faqItems.forEach(otherItem => {
                if (otherItem !== this && otherItem.open) {
                    otherItem.open = false;
                }
            });
        }
    });
});