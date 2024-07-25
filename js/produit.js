import {
  genererElements,
  trierElementsCroissant,
  trierElementsDecroissant,
  gererChangementCategorie,
  gererChangementBudgetMax,
  hideAllFiches,
  scrollToElementAndShowFiches,
} from "./script.js";

// Récupération des éléments depuis le fichier JSON
const reponseProduit = await fetch("../json/produits.json");
const elementsProduit = await reponseProduit.json();

document.getElementById("tout_voir").addEventListener("click", function () {
  hideAllFiches();
  scrollToElementAndShowFiches(".fiches-section", ".produit-fiches");
  genererElements("produit", elementsProduit);

});

document.getElementById("enfant").addEventListener("click", function () {
  hideAllFiches();
  const filteredElements = elementsProduit.filter(
    (element) => element.sexe === "enfant"
  );
  scrollToElementAndShowFiches(".fiches-section", ".produit-fiches");
  genererElements("produit", filteredElements);
});

document.getElementById("homme").addEventListener("click", function () {
  hideAllFiches();
  const filteredElements = elementsProduit.filter(
    (element) => element.sexe === "homme"
  );
  scrollToElementAndShowFiches(".fiches-section", ".produit-fiches");
  genererElements("produit", filteredElements);
});

document.getElementById("femme").addEventListener("click", function () {
  hideAllFiches();
  const filteredElements = elementsProduit.filter(
    (element) => element.sexe === "femme"
  );
  scrollToElementAndShowFiches(".fiches-section", ".produit-fiches");
  genererElements("produit", filteredElements);
});

const boutonTrierCroissant = document.querySelector(".btn-trierC");
boutonTrierCroissant.addEventListener("click", function () {
  trierElementsCroissant("produit", elementsProduit);
});

const boutonTrierDecroissant = document.querySelector(".btn-trierD");
boutonTrierDecroissant.addEventListener("click", function () {
  trierElementsDecroissant("produit", elementsProduit);
});

document
  .querySelector(".categorie-form")
  .addEventListener("change", function () {
    gererChangementCategorie("produit", elementsProduit);
  });

gererChangementBudgetMax("produit", elementsProduit);

const categories = document.querySelectorAll(".cat");

categories.forEach(categorie => {
categorie.style.cursor = "pointer"
categorie.style.color = "white"
  categorie.addEventListener("mouseenter", ()=> {
    categorie.style.backgroundColor = "black";
    
  })
  categorie.addEventListener("mouseleave", () => {
     categorie.style.backgroundColor = "transparent"
  })
})





