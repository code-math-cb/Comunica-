// ======= ELEMENTOS PRINCIPAIS =======
const container = document.getElementById("boardContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const themeToggle = document.getElementById("themeToggle");

// ======= FUNÇÃO PARA CARREGAR PLACAS =======
function carregarPlacas(lista) {
  container.innerHTML = "";
  lista.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("board-card");

    card.innerHTML = `
      <img src="${item.img}" alt="${item.nome}">
      <p>${item.nome}</p>
    `;

    // ✅ Ao clicar, falar o nome com voz sintetizada
    card.addEventListener("click", () => falar(item.nome));

    container.appendChild(card);
  });
}

// ======= VOZ SINTETIZADA =======
function falar(texto) {
  const fala = new SpeechSynthesisUtterance(texto);
  fala.lang = "pt-BR";
  fala.rate = 1;
  fala.pitch = 1;
  speechSynthesis.speak(fala);
}

// ======= FILTRO DE BUSCA E CATEGORIA =======
function filtrarPlacas() {
  const texto = searchInput.value.toLowerCase();
  const categoria = categoryFilter.value;

  const filtradas = boards.filter((b) => {
    const correspondeCategoria = categoria === "todas" || b.categoria === categoria;
    const correspondeTexto = b.nome.toLowerCase().includes(texto);
    return correspondeCategoria && correspondeTexto;
  });

  carregarPlacas(filtradas);
}

searchInput.addEventListener("input", filtrarPlacas);
categoryFilter.addEventListener("change", filtrarPlacas);

// ======= MODO ESCURO =======
function aplicarTema(temaEscuroAtivo) {
  if (temaEscuroAtivo) {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️ Modo Claro";
  } else {
    document.body.classList.remove("dark-mode");
    themeToggle.textContent = "🌙 Modo Escuro";
  }
  localStorage.setItem("temaEscuro", temaEscuroAtivo);
}

const temaSalvo = JSON.parse(localStorage.getItem("temaEscuro")) || false;
aplicarTema(temaSalvo);

themeToggle.addEventListener("click", () => {
  const novoTema = !document.body.classList.contains("dark-mode");
  aplicarTema(novoTema);
});

// ======= INICIALIZAÇÃO =======
carregarPlacas(boards);
