// 

const calculerPrixTTC = (prixHT, tauxTVA) => {
    const montantTVA = prixHT * tauxTVA;
    const prixTTC = prixHT + montantTVA;
    const phrase = `Prix HT: ${prixHT}€, TVA: ${montantTVA}€, Prix TTC: ${prixTTC}€`;
    return phrase;
}

const afficherProduit = (nom, prix, stock) => {
    if (stock > 0) {
        const phrase = `Produit: ${nom} - Prix: ${prix}€ - En stock: ${stock}`;
        return phrase;
    } else {
        const phrase = `Produit: ${nom} - Rupture de stock`;
        return phrase;
    }
}


console.log(calculerPrixTTC(100, 0.20));           // "Prix HT: 100€, TVA: 20€, Prix TTC: 120€"
console.log(afficherProduit("Laptop", 999, 5));    // "Produit: Laptop - Prix: 999€ - En stock: 5"
console.log(afficherProduit("Clavier", 49, 0));    // "Produit: Clavier - Rupture de stock"
