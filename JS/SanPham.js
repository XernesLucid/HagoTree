const products = {
  1: {
    name: "Sản phẩm 1",
    price: "100.000₫",
    img: "../IMG/SanPham01.jpg",
    description:
      "Đây là mô tả chi tiết về sản phẩm 1. Sản phẩm chất lượng cao, phù hợp với nhu cầu của bạn.",
  },
  2: {
    name: "Sản phẩm 2",
    price: "150.000₫",
    img: "../IMG/SanPham02.jpg",
    description: "Mô tả chi tiết về sản phẩm 2. Thiết kế đẹp, chất liệu bền.",
  },
  3: {
    name: "Sản phẩm 3",
    price: "200.000₫",
    img: "../IMG/SanPham03.jpg",
    description: "Sản phẩm 3 với nhiều tính năng ưu việt, giá trị vượt trội.",
  },
  4: {
    name: "Sản phẩm 4",
    price: "180.000₫",
    img: "../IMG/SanPham04.jpg",
    description: "Sản phẩm 4 với thiết kế hiện đại, tiện lợi và dễ sử dụng.",
  },
  5: {
    name: "Sản phẩm 5",
    price: "250.000₫",
    img: "../IMG/SanPham05.jpg",
    description: "Sản phẩm 5 cao cấp với nhiều tính năng độc đáo và hấp dẫn.",
  },
  6: {
    name: "Sản phẩm 6",
    price: "120.000₫",
    img: "../IMG/SanPham06.jpg",
    description: "Sản phẩm 6 phù hợp với mọi nhu cầu, giá cả phải chăng.",
  },
  7: {
    name: "Sản phẩm 7",
    price: "120.000₫",
    img: "../IMG/SanPham07.jpg",
    description: "Sản phẩm 7 phù hợp với mọi nhu cầu, giá cả phải chăng.",
  },
  8: {
    name: "Sản phẩm 8",
    price: "120.000₫",
    img: "../IMG/SanPham08.jpg",
    description: "Sản phẩm 8 phù hợp với mọi nhu cầu, giá cả phải chăng.",
  },
};

const productsArray = Object.entries(products).map(([id, product]) => ({
  id,
  ...product,
}));

// Hàm lấy tham số từ URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Hiển thị chi tiết một sản phẩm theo id
function displayProduct(id) {
  const container = document.getElementById("product-detail");
  const product = products[id];
  if (product) {
    container.innerHTML = `
        <div class="single-product">
          <img src="${product.img}" alt="${product.name}" />
          <div class="product-info">
            <h2>${product.name}</h2>
            <div class="product-price">${product.price}</div>
            <p class="product-description">${product.description}</p>
            <button onclick="addToCart(${id})">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      `;
  } else {
    container.innerHTML = '<p class="not-found">Không tìm thấy sản phẩm.</p>';
  }
}

// Hiển thị danh sách tất cả sản phẩm
function displayProducts(items) {
  const container = document.getElementById("product-detail");

  if (items.length === 0) {
    container.innerHTML = "<p class='not-found'>Không có sản phẩm phù hợp.</p>";
    return;
  }

  // Create a title for the products page
  const title = document.createElement("h1");
  title.textContent = "Sản phẩm của chúng tôi";
  title.style.marginBottom = "20px";
  title.style.color = "#333";

  // Create grid container
  const grid = document.createElement("div");
  grid.className = "products-grid";

  items.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    const img = document.createElement("img");
    img.className = "product-image";
    img.src = product.img;
    img.alt = product.name;

    const info = document.createElement("div");
    info.className = "product-info";

    const name = document.createElement("h3");
    name.className = "product-name";
    name.textContent = product.name;

    const desc = document.createElement("p");
    desc.className = "product-description";
    desc.textContent = product.description;

    const price = document.createElement("div");
    price.className = "product-price";
    price.textContent = product.price;

    info.appendChild(name);
    info.appendChild(desc);
    info.appendChild(price);

    card.appendChild(img);
    card.appendChild(info);

    // Clicking product to go to detail page
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      window.location.href = window.location.pathname + "?id=" + product.id;
    });

    grid.appendChild(card);
  });

  // Clear container and add new elements
  container.innerHTML = "";
  container.appendChild(title);
  container.appendChild(grid);
}

// Thêm sản phẩm vào giỏ hàng
function addToCart(id) {
  // Get existing cart or initialize empty array
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Add product to cart
  const product = products[id];
  cart.push({
    id: id,
    name: product.name,
    price: product.price,
    img: product.img,
    quantity: 1,
  });

  // Save to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  alert(`Đã thêm ${product.name} vào giỏ hàng`);
}

// Hàm cho nút quay lại
function goBack() {
  const id = getQueryParam("id");
  if (id) {
    // If we're on a product detail page, go back to product listing
    window.location.href = window.location.pathname;
  } else {
    // Otherwise use browser back
    window.history.back();
  }
}

// Khi trang tải xong
window.onload = () => {
  const id = getQueryParam("id");
  if (id && products[id]) {
    displayProduct(id);
  } else {
    displayProducts(productsArray);
  }

  // Thiết lập chức năng tìm kiếm
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      const filtered = productsArray.filter((p) =>
        p.name.toLowerCase().includes(query)
      );
      displayProducts(filtered);
    });
  }
};
