const products = [
  {
    id: 1,
    name: "Dog food (10kg)",
    price: 39.99,
    image: "img/dog-food.png",
    description: "Premium dog food",
  },
  {
    id: 2,
    name: "Cat food (5kg)",
    price: 19.99,
    image: "img/cat-food.png",
    description: "Premium cat food",
  },
  {
    id: 3,
    name: "Dog toys",
    price: 29.99,
    image: "img/dog-toy.png",
    description: "Some dog toys",
  },
  {
    id: 4,
    name: "Cat toys",
    price: 11.99,
    image: "img/cat-toy.png",
    description: "Some cat toys",
  },
  {
    id: 5,
    name: "Pet care",
    price: 59.99,
    image: "img/pet-care.png",
    description: "Pet care",
  },
  {
    id: 6,
    name: "Dog vaccinations",
    price: 39.99,
    image: "img/dog-vaccinations.png",
    description: "Dog vaccinations",
  },
  {
    id: 7,
    name: "Cat vaccinations",
    price: 39.99,
    image: "img/cat-vaccinations.png",
    description: "Cat vaccinations",
  },
  {
    id: 8,
    name: "Collars",
    price: 4.99,
    image: "img/collars.png",
    description: "Collars for pets",
  },
  {
    id: 9,
    name: "Blankets",
    price: 3.99,
    image: "img/blankets.png",
    description: "Blankets to keep them warm",
  },
  {
    id: 10,
    name: "Voluenteers",
    price: 9.99,
    image: "img/voluenteers.png",
    description: "Employees who care with them",
  },
  {
    id: 11,
    name: "Cat scratchers",
    price: 69.99,
    image: "img/cat-scratchers.png",
    description: "Cat furniture",
  },
  {
    id: 12,
    name: "Adoption",
    price: 99.99,
    image: "img/adoption.png",
    description: "Adoption",
  },
];

let cart = [];
let ProductCounter = 0;

function scrollToGallery() {
  document.getElementById("gallery").scrollIntoView({ behavior: "smooth" }); // https://css-tricks.com/snippets/jquery/smooth-scrolling/
}

function renderProducts() {
  const gallery = document.getElementById("productGallery");

  products.forEach((product) => {
    const productCard = `
            <div class="col-md-4 col-lg-3 mb-2 mt-2 ml-2 p-3">
                <div class="card product-card">
                    <img src="${
                      product.image
                    }" class="card-img-top product-image" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="text-primary fw-bold">${product.price.toLocaleString()} $</p>
                        <button class="btn btn-primary w-100" onclick="addToCart(${
                          product.id
                        })">
                            <b>Add to cart</b>
                        </button>
                    </div>
                </div>
            </div>
        `;
    gallery.innerHTML += productCard;
  });
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    cart.push(product);
    ProductCounter++;
    updateCartCounter();
    console.log(`Added to cart: ${product.name} Cart: `, cart);
  }
}

function removeFromCart(productId) {
  const index = cart.findIndex((item) => item.id === productId);
  if (index !== -1) {
    cart.splice(index, 1);
    ProductCounter--;
    updateCartCounter();
    displayCart();
  }
}

function updateCartCounter() {
  const cartButton = document.getElementById("cartButton");
  if (ProductCounter > 0) {
    cartButton.style.visibility = "visible";
  } else {
    cartButton.style.visibility = "hidden";
  }
  const cartCounter = document.getElementById("cartCounter");
  cartCounter.textContent = cart.length;
}

function displayCart() {
  const cartContentsDiv = document.getElementById("cartContents");
  cartContentsDiv.innerHTML = "";

  if (cart.length === 0) {
    cartContentsDiv.innerHTML =
      '<div class="alert alert-info text-center">Your cart is empty.</div>';
  } else {
    const grouped = {};
    let total = 0;
    cart.forEach((item) => {
      if (!grouped[item.id]) {
        grouped[item.id] = { ...item, quantity: 1 };
      } else {
        grouped[item.id].quantity++;
      }
    });

    const panel = document.createElement("div");
    panel.className =
      "mx-auto my-4 p-4 rounded shadow-lg bg-white position-relative";
    panel.style.maxWidth = "800px";

    const backBtn = document.createElement("button");
    backBtn.className = "btn btn-danger top-0 start-0 m-2";
    backBtn.style.zIndex = "10";
    backBtn.innerHTML =
      '<img src="img/left-arrow.png" alt="Back" width="24" height="24" />';
    backBtn.onclick = () => {
      document.getElementById("cart").classList.add("d-none");
      document.getElementById("gallery").classList.remove("d-none");
    };
    panel.appendChild(backBtn);

    const listGroup = document.createElement("ul");
    listGroup.className = "list-group mb-4";

    Object.values(grouped).forEach((item) => {
      total += item.price * item.quantity;
      const listItem = document.createElement("li");
      listItem.className =
        "list-group-item d-flex align-items-center justify-content-between";

      listItem.innerHTML = `
        <div class="d-flex align-items-center">
            <img src="${item.image}" alt="${
        item.name
      }" style="width:48px;height:48px;object-fit:cover;border-radius:8px;margin-right:16px;">
            <div>
                <div class="fw-bold">${item.name}</div>
                <div class="text-muted">${item.description}</div>
                <div class="text-primary fw-bold">${item.price.toLocaleString()} $</div>
                <div>Quantity: <span class="fw-bold">${
                  item.quantity
                }</span></div>
            </div>
        </div>
        <button class="btn btn-danger btn-sm ms-3" onclick="removeFromCart(${
          item.id
        })"><b>Remove</b></button>
    `;
      listGroup.appendChild(listItem);
    });

    const totalDiv = document.createElement("div");
    totalDiv.className = "mt-4 text-end fw-bold fs-4 text-primary";
    totalDiv.innerHTML = `Total: ${total.toLocaleString()} $`;

    const checkoutDiv = document.createElement("div");
    checkoutDiv.className = "mt-4 text-center";
    checkoutDiv.innerHTML = `
        <button class="btn btn-success btn-lg fw-bold" onclick="showCheckoutForm()">Checkout</button>
    `;

    panel.appendChild(listGroup);
    panel.appendChild(totalDiv);
    panel.appendChild(checkoutDiv);
    cartContentsDiv.appendChild(panel);

    document.getElementById("checkoutForm").classList.add("d-none");
    document.getElementById("confirmationPanel").classList.add("d-none");
  }
}

function showCheckoutForm() {
  document.getElementById("cartContents").classList.add("d-none");
  document.getElementById("checkoutForm").classList.remove("d-none");
  document.getElementById("confirmationPanel").classList.add("d-none");
}

document
  .getElementById("checkoutForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("buyerName").value.trim();
    const address = document.getElementById("buyerAddress").value.trim();
    const email = document.getElementById("buyerEmail").value.trim();
    const phone = document.getElementById("buyerPhone").value.trim();
    const zip = document.getElementById("buyerZip").value.trim();
    const errorDiv = document.getElementById("formError");
    errorDiv.textContent = "";

    if (!name || !address || !email || !phone || !zip) {
      errorDiv.textContent = "Please fill in all fields!";
      return;
    }
    if (!/^\d+$/.test(phone)) {
      errorDiv.textContent = "Phone number should contain numbers only!";
      return;
    }
    if (zip.length > 6) {
      errorDiv.textContent = "ZIP code should be max. 6 characters!";
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      errorDiv.textContent = "Please enter a valid email address!";
      return;
    }

    let grouped = {};
    let total = 0;
    cart.forEach((item) => {
      if (!grouped[item.id]) grouped[item.id] = { ...item, quantity: 1 };
      else grouped[item.id].quantity++;
    });
    Object.values(grouped).forEach((item) => {
      total += item.price * item.quantity;
    });

    let discount = 0;
    let itemCount = cart.length;
    if (itemCount >= 3) discount = total * 0.1;

    let tax = (total - discount) * 0.27;
    let finalTotal = total - discount + tax;

    let summaryHtml = `
        <h3 class="mb-3 sucess-header bg-success">Thank you for your donation!</h3>
        <div class="mb-2"><b>Name:</b> ${name}</div>
        <div class="mb-2"><b>Address:</b> ${address}</div>
        <div class="mb-2"><b>Email:</b> ${email}</div>
        <div class="mb-2"><b>Phone:</b> ${phone}</div>
        <div class="mb-2"><b>ZIP code:</b> ${zip}</div>
        <hr>
        <h5 class="mb-3">Your purchases:</h5>
        <ul class="list-group mb-3">
    `;
    Object.values(grouped).forEach((item) => {
      summaryHtml += `<li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${item.name} (${item.quantity}x)</span>
            <span>${(item.price * item.quantity).toLocaleString()} $</span>
        </li>`;
    });
    summaryHtml += `</ul>
        <div class="mb-2"><b>Subtotal:</b> ${total.toLocaleString()} $</div>
        <div class="mb-2"><b>Discount:</b> -${discount.toLocaleString()} $</div>
        <div class="mb-2"><b>Tax (27%):</b> +${tax.toLocaleString()} $</div>
        <div class="mb-2 fs-4 text-primary"><b>Total:</b> ${finalTotal.toLocaleString()} $</div>
        <div class="mt-4 text-center">
        <button class="btn btn-secondary fw-bold" id="backToGalleryBtn">Back to the gallery</button>
        </div>
        `;

    document.getElementById("checkoutForm").classList.add("d-none");
    document.getElementById("confirmationPanel").classList.remove("d-none");
    document.getElementById("confirmationPanel").innerHTML = summaryHtml;

    document.getElementById("backToGalleryBtn").onclick = function () {
      location.reload();
    };
  });

function toggleCart() {
  const gallerySection = document.getElementById("gallery");
  const cartSection = document.getElementById("cart");
  const isCartVisible = !gallerySection.classList.contains("d-none");
  gallerySection.classList.toggle("d-none");
  cartSection.classList.toggle("d-none");
  if (isCartVisible) {
    displayCart();
  }
}

renderProducts();