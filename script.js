
/* Acessibilidade: pular para conteúdo */
document.addEventListener('DOMContentLoaded', () => {
  const skip = document.getElementById('skip-to-content');
  if (skip) {
    skip.addEventListener('click', (e) => {
      const main = document.querySelector('main');
      if (main) { main.setAttribute('tabindex','-1'); main.focus(); }
    });
  }
});

/* Máscaras simples (sem dependências) */
function maskCPF(value){
  return value
    .replace(/\D/g,'')
    .replace(/(\d{3})(\d)/,'$1.$2')
    .replace(/(\d{3})(\d)/,'$1.$2')
    .replace(/(\d{3})(\d{1,2})$/,'$1-$2')
    .slice(0,14);
}
function maskPhone(value){
  return value
    .replace(/\D/g,'')
    .replace(/(\d{2})(\d)/,'($1) $2')
    .replace(/(\d{4,5})(\d{4})$/,'$1-$2')
    .slice(0, 15);
}
function maskCEP(value){
  return value
    .replace(/\D/g,'')
    .replace(/(\d{5})(\d{1,3}).*/,'$1-$2')
    .slice(0,9);
}
function applyMask(el, fn){
  el.addEventListener('input', () => el.value = fn(el.value));
}

/* Validação de formulário: reforça validação nativa e mensagens amigáveis */
function setupFormValidation(form){
  form.addEventListener('submit', (e) => {
    if(!form.checkValidity()){
      e.preventDefault();
      form.reportValidity();
    }
  }, false);
}

/* Inicialização da página de cadastro */
document.addEventListener('DOMContentLoaded', () => {
  const cpf = document.getElementById('cpf');
  const phone = document.getElementById('telefone');
  const cep = document.getElementById('cep');
  if(cpf) applyMask(cpf, maskCPF);
  if(phone) applyMask(phone, maskPhone);
  if(cep) applyMask(cep, maskCEP);
  const form = document.getElementById('form-cadastro');
  if(form) setupFormValidation(form);
});

// === Navegação Mobile (hambúrguer) ===
(function(){
  const navToggle = document.getElementById('navToggle');
  const mainMenu = document.getElementById('mainMenu');
  if (navToggle && mainMenu) {
    navToggle.addEventListener('click', () => {
      const opened = mainMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(opened));
    });
  }
})();

// === Toast helper ===
function showToast(msg) {
  const wrap = document.getElementById('toasts');
  if (!wrap) return;
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  wrap.appendChild(t);
  setTimeout(() => t.remove(), 4000);
}

// === Modal helpers ===
function openModal(){ document.getElementById('modal')?.classList.add('open'); }
function closeModal(){ document.getElementById('modal')?.classList.remove('open'); }
