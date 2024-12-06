
const cart = JSON.parse(localStorage.getItem("cart")) || [];


function addToCart(product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} сагсанд нэмэгдлээ!`);
}


function renderCartPage() {
    const cartPage = document.querySelector(".Products");
    cartPage.innerHTML = "<h2>Сагс</h2>";

    if (cart.length === 0) {
        cartPage.innerHTML += "<p>Сагс хоосон байна.</p>";
        return;
    }

   
    cart.forEach((item) => {
        const productCard = document.createElement("div");
        productCard.className = "card";
        productCard.innerHTML = `
            <img src="${item.image}" />
            <h3>${item.name}</h3>
            <p>${item.delivery}</p>
            <p class="price">${item.price}</p>
        `;
        cartPage.appendChild(productCard);
    });
}


document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = e.target.getAttribute("data-page");

        if (page === "cart") {
            renderCartPage();
        } else {
            alert(`${page} хуудсыг үзүүлнэ.`); 
        }
    });
});

document.querySelectorAll(".add-cart").forEach((button, index) => {
    button.addEventListener("click", () => {
        const productCard = button.closest(".card");
        const product = {
            name: productCard.querySelector("h3").textContent,
            image: productCard.querySelector("img").src,
            delivery: productCard.querySelector(".Хүргэлт").textContent,
            price: productCard.querySelector(".price").textContent,
        };

        addToCart(product);
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link");
    const productsPage = document.querySelector(".Products");
    const productSection = document.querySelector(".product");
    const addProductPage = document.createElement("div");

    addProductPage.innerHTML = `
        <div class="page2">
            <div class="form-card">
                <form>
                    <h2>Хэрэглэгчийн мэдээлэл</h2>
                    <label for="name">Нэр:</label>
                    <input type="text" id="name" placeholder="Нэрээ оруулна уу" required>
                    
                    <label for="email">Имэйл хаяг:</label>
                    <input type="email" id="email" placeholder="Имэйл хаягаа оруулна уу" required>
                    
                    <label for="phone">Утас:</label>
                    <input type="tel" id="phone" placeholder="Утасны дугаараа оруулна уу" required>
                    
                    <button type="submit">Нэвтрэх</button>
                </form>
            </div>        
        </div>
    `;
    addProductPage.style.display = "none"; 
    document.body.appendChild(addProductPage); 

   
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const page = link.getAttribute("data-page");

  
            productsPage.style.display = "none";
            productSection.style.display = "none";
            addProductPage.style.display = "none";

            if (page === "home") {
                productsPage.style.display = "block";
                productSection.style.display = "block";
            } else if (page === "add-product") {
                addProductPage.style.display = "block";
            } else if (page === "cart") {
                alert("Сагсны хуудас одоогоор идэвхгүй байна.");
            }
        });
    });
});
