const productContainer = document.querySelector(".product-container");
let productData = null;

async function getProductData() {
    try {
        const response = await fetch("../data/products.json");
        productData = await response.json();
        return productData;
    } catch (error) {
        console.log('Une erreur est survenue :', error);
        return null;
    }
}

// Récupère l'ID du produit à partir de l'URL
function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

// Affiche le produit spécifique en fonction de son ID
function displayProduct(productId) {
    const product = productData.vr[productId];

    if (!product) {
        console.log("Produit introuvable.");
        return;
    }

    const productImgContainer = document.querySelector(".product-img-container");
    const productImg = productImgContainer.querySelector(".product-img");
    productImg.src = product.img;
    productImg.alt = product.name;

    const productTitle = document.querySelector(".product-title");
    productTitle.textContent = product.name;

    const productDescription = document.querySelector(".product-description");
    productDescription.textContent = product.description;

    const productPrice = document.querySelector(".product-price");
    productPrice.textContent = product.price + " €";

    const addToCartButton = document.getElementById("addToCartButton");
    addToCartButton.addEventListener("click", () => addToCart(product.id));
}

// Fonction pour ajouter un produit au panier en utilisant localStorage
function addToCart(productId) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const product = productData.vr.find(item => item.id === productId);
    if (product) {
        cartItems.push(product);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert('Produit ajouté au panier !');
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    const productId = getProductIdFromURL();

    if (!isNaN(productId)) {
        const productData = await getProductData();
        if (productData) {
            displayProduct(productId);
        }
    } else {
        console.log("Identifiant du produit non trouvé dans l'URL.");
    }
});
