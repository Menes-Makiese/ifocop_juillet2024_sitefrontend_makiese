// Parcours les liens et ajoute la classe active selon la page actuel
document.addEventListener('DOMContentLoaded', function() {
  
  const currentUrl = window.location.pathname.split('/').pop();

  
  const navLinks = document.querySelectorAll('.nav-link');

  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href').split('/').pop();
    if (linkPath === currentUrl) {
      link.classList.add('active');
    }
  });
});

//Masqué les fiches
export function hideAllFiches() {
  const fichesElements = document.querySelectorAll(".fiches");
  fichesElements.forEach((fiche) => {
    fiche.style.display = "none";
  });
}

//Affiche les éléments
export function genererElements(typeElement, elements) {
  const container = document.querySelector(`.${typeElement}-fiches`);

  container.innerHTML = "";

  elements.forEach((article) => {
    const element = document.createElement("article");

    const imageElement = document.createElement("img");
    imageElement.setAttribute("alt", `photo ${article.maillot}`);
    imageElement.src = article.image;

    const maillotElement = document.createElement("h2");
    maillotElement.classList = "maillot-element";
    maillotElement.innerText = article.maillot;

    const paysElement = document.createElement("h3");
    paysElement.classList = "taille-element";
    paysElement.innerText = article.taille;

    const prixElement = document.createElement("p");
    prixElement.classList = "prix-element";
    prixElement.innerText = `${article.prix} €`;

    element.appendChild(imageElement);
    element.appendChild(maillotElement);
    element.appendChild(paysElement);
    element.appendChild(prixElement);

    container.appendChild(element);
  });

  const articles = document.querySelectorAll(".produit-fiches article")
articles.forEach(article => {
  article.addEventListener("mouseenter", () => {
    article.style.border = "1px solid gray"
  })
  article.addEventListener("mouseleave", ()=> {
    article.style.border = "none"
  })

})
}

// Trier les élements prix dans l'ordre croissant
export function trierElementsCroissant(type, elements) {
  const elementsTriés = Array.from(elements);
  elementsTriés.sort(function (a, b) {
    return a.prix - b.prix;
  });
  document.querySelector(`.${type}-fiches`).innerHTML = "";
  genererElements(type, elementsTriés);
}

// Trier les éléments prix dans l'ordre décroissant
export function trierElementsDecroissant(type, elements) {
  const elementsTriés = Array.from(elements);
  elementsTriés.sort(function (a, b) {
    return b.prix - a.prix;
  });
  document.querySelector(`.${type}-fiches`).innerHTML = "";
  genererElements(type, elementsTriés);
}

// Flitre les éléments selon leur categorie
export function gererChangementCategorie(typeElement, elements) {
  const checkboxes = document.querySelectorAll(
    `.categorie-form input[type="checkbox"]:checked`
  );
  const vintageCheckbox = document.querySelector(
    `.categorie-form input[name="vintage"]:checked`
  );

  if (checkboxes.length === 0 && !vintageCheckbox) {
    document.querySelector(`.${typeElement}-fiches`).innerHTML = "";
    genererElements(typeElement, elements);
  } else {
    const filteredElements = elements.filter((element) => {
      const isCategoryMatch = Array.from(checkboxes).some(
        (checkbox) => element.categorie === checkbox.name
      );
      const isVintageMatch = vintageCheckbox && element.vintage;

    
      if (vintageCheckbox && !checkboxes.length) {
        return element.vintage;
      }

      return isCategoryMatch || isVintageMatch;
    });

    document.querySelector(`.${typeElement}-fiches`).innerHTML = "";
    genererElements(typeElement, filteredElements);
  }
}

// Filtrer les éléments prix slon le budget
export function gererChangementBudgetMax(typeElement, elements) {
  const inputBudgetMax = document.getElementById("prix");
  inputBudgetMax.addEventListener("input", function () {
    const elementsFiltrees = elements.filter(function (element) {
      return element.prix <= inputBudgetMax.value;
    });
    document.querySelector(`.${typeElement}-fiches`).innerHTML = "";
    genererElements(typeElement, elementsFiltrees);
  });
}
// Scroll la page jusqu'au element
export function scrollToElementAndShowFiches(elementSelector, fichesSelector) {
  const element = document.querySelector(elementSelector);
  const fiches = document.querySelector(fichesSelector);
  const filtres = document.querySelector(".filtres");
  element.style.display = "flex";
  fiches.style.display = "flex";
  filtres.scrollIntoView({ behavior: "smooth" });
}
// redirection vers la page produit
document.querySelectorAll('.box-element').forEach(element => {
  element.addEventListener('click', function(event) {
    const productId = this.getAttribute('data-id');
    window.location.href = `./pages/produit.html?id=${productId}`;
  });
});

