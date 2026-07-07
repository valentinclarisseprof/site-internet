console.log("Site chargé !");

/* MENU RESPONSIVE */

const menuToggle = document.getElementById("menu-toggle");
const mainMenu = document.getElementById("main-menu");

if (menuToggle && mainMenu) {
  menuToggle.addEventListener("click", () => {
    mainMenu.classList.toggle("open");
  });
}

/* COPIE DES LIENS PDF */

function activateCopyButtons() {
  const copyButtons = document.querySelectorAll(".copy-link");

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const filePath = button.getAttribute("data-file");
      const fullUrl = new URL(filePath, window.location.href).href;

      try {
        await navigator.clipboard.writeText(fullUrl);

        const oldText = button.textContent;
        button.textContent = "Lien copié";

        setTimeout(() => {
          button.textContent = oldText;
        }, 1600);
      } catch (error) {
        alert("Impossible de copier automatiquement le lien. Lien : " + fullUrl);
      }
    });
  });
}

activateCopyButtons();

/* BASE DE DONNÉES DES RESSOURCES POUR LA PAGE À PROPOS / RECHERCHE */

const resources = [
  {
    title: "Analyse I",
    category: "Mathématiques",
    description: "Limites, continuité, dérivation, intégration et méthodes fondamentales.",
    url: "documents/mathematiques/analyse-1.pdf"
  },
  {
    title: "Algèbre linéaire I",
    category: "Mathématiques",
    description: "Espaces vectoriels, matrices, applications linéaires et systèmes.",
    url: "documents/mathematiques/algebre-lineaire-1.pdf"
  },
  {
    title: "Analyse II",
    category: "Mathématiques",
    description: "Suites et séries de fonctions, intégrales impropres et séries entières.",
    url: "documents/mathematiques/analyse-2.pdf"
  },
  {
    title: "Probabilités",
    category: "Mathématiques",
    description: "Variables aléatoires, lois usuelles, espérance, variance et convergence.",
    url: "documents/mathematiques/probabilites.pdf"
  },
  {
    title: "Géométrie différentielle",
    category: "Mathématiques",
    description: "Variétés, formes différentielles, connexions, courbure et applications.",
    url: "documents/mathematiques/geometrie-differentielle.pdf"
  },
  {
    title: "Groupes et algèbres de Lie",
    category: "Mathématiques",
    description: "Groupes de Lie, algèbres de Lie, représentations et symétries.",
    url: "documents/mathematiques/groupes-de-lie.pdf"
  },
  {
    title: "Mécanique classique",
    category: "Physique",
    description: "Cinématique, dynamique newtonienne, énergie, moment cinétique et oscillateurs.",
    url: "documents/physique/mecanique-classique.pdf"
  },
  {
    title: "Thermodynamique",
    category: "Physique",
    description: "Systèmes thermodynamiques, premier principe, second principe, entropie et machines thermiques.",
    url: "documents/physique/thermodynamique.pdf"
  },
  {
    title: "Électromagnétisme",
    category: "Physique",
    description: "Champs électriques et magnétiques, équations de Maxwell, potentiels et ondes électromagnétiques.",
    url: "documents/physique/electromagnetisme.pdf"
  },
  {
    title: "Mécanique analytique",
    category: "Physique",
    description: "Formalismes lagrangien et hamiltonien, principes variationnels, coordonnées généralisées et symétries.",
    url: "documents/physique/mecanique-analytique.pdf"
  },
  {
    title: "Mécanique quantique",
    category: "Physique",
    description: "Espaces de Hilbert, opérateurs, spin, oscillateur harmonique et formalisme de Dirac.",
    url: "documents/physique/mecanique-quantique.pdf"
  },
  {
    title: "Théorie quantique des champs",
    category: "Physique",
    description: "Champs libres, symétries, interactions, quantification canonique et introduction à la renormalisation.",
    url: "documents/physique/theorie-quantique-des-champs.pdf"
  },
  {
    title: "X-ENS — Mathématiques",
    category: "Corrigés",
    description: "Corrigé détaillé d’un sujet de mathématiques pour concours X-ENS.",
    url: "documents/corriges/x-ens-mathematiques.pdf"
  },
  {
    title: "Mines-Ponts — Mathématiques",
    category: "Corrigés",
    description: "Corrigé de sujet de mathématiques pour le concours Mines-Ponts.",
    url: "documents/corriges/mines-ponts-mathematiques.pdf"
  },
  {
    title: "CentraleSupélec — Mathématiques",
    category: "Corrigés",
    description: "Corrigé de sujet de mathématiques pour le concours CentraleSupélec.",
    url: "documents/corriges/centrale-supelec-mathematiques.pdf"
  },
  {
    title: "CCINP — Mathématiques",
    category: "Corrigés",
    description: "Corrigé de sujet de mathématiques pour le concours CCINP.",
    url: "documents/corriges/ccinp-mathematiques.pdf"
  },
  {
    title: "Agrégation — Analyse",
    category: "Corrigés",
    description: "Corrigés et notes de préparation pour les épreuves d’analyse.",
    url: "documents/corriges/agregation-analyse.pdf"
  },
  {
    title: "Agrégation — Algèbre",
    category: "Corrigés",
    description: "Corrigés et notes de préparation pour les épreuves d’algèbre.",
    url: "documents/corriges/agregation-algebre.pdf"
  },
  {
    title: "Banque d’exercices — Mathématiques",
    category: "Corrigés",
    description: "Exercices corrigés pour renforcer les méthodes de résolution en analyse, algèbre, géométrie et probabilités.",
    url: "documents/corriges/banque-exercices-mathematiques.pdf"
  },
  {
    title: "Banque d’exercices — Physique",
    category: "Corrigés",
    description: "Exercices corrigés en mécanique, électromagnétisme, physique quantique et physique statistique.",
    url: "documents/corriges/banque-exercices-physique.pdf"
  }
];

/* MOTEUR DE RECHERCHE */

const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

if (searchInput && searchResults) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

    if (query.length === 0) {
      searchResults.innerHTML = '<p class="empty-state">Les résultats apparaîtront ici.</p>';
      return;
    }

    const filteredResources = resources.filter((resource) => {
      const searchableText = `
        ${resource.title}
        ${resource.category}
        ${resource.description}
      `.toLowerCase();

      return searchableText.includes(query);
    });

    if (filteredResources.length === 0) {
      searchResults.innerHTML = '<p class="empty-state">Aucun résultat trouvé.</p>';
      return;
    }

    searchResults.innerHTML = filteredResources.map((resource) => {
      return `
        <article class="search-result-card">
          <p class="resource-meta">${resource.category}</p>
          <h3>${resource.title}</h3>
          <p>${resource.description}</p>

          <div class="resource-actions">
            <a href="${resource.url}" download class="btn btn-dark">Télécharger</a>
            <button class="btn btn-light copy-link" data-file="${resource.url}">
              Copier le lien
            </button>
          </div>
        </article>
      `;
    }).join("");

    activateCopyButtons();
  });
}