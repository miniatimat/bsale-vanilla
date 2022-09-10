document.getElementById("search-btn").addEventListener('click', searchProducts);

async function getCategories(){
  const response = await fetch(`http://localhost:3001/category/`)
  const categories = await response.json()
  createCategoryList(categories)
}

function showProducts(products) {
  document.getElementById("card-container").innerHTML =`
      <div>
        ${products.map(product =>{
    return `
          <div class = "product-item" data-id = "${product.id}">
            <div class = "product-img">
              <img src = "${product.url_image}" alt="${product.name}">
            </div>
            <div class = "product-name">
              <h3>${product.name}</h3>
            </div>
            <div> ${product.price}
            </div>
        `
  })}
      </div>`
}

async function getProducts(){
  const response = await fetch(`http://localhost:3001/product/`)
  const products = await response.json()
  console.log(products)
  showProducts(products);
}

async function searchProducts(){
  let searchInputTxt = document.getElementById('search-input').value.trim();
  fetch(`http://localhost:3001/product/search?name=${searchInputTxt}`)
      .then(response => response.json())
      .then(data => showProducts(data)
      )
}

async function filterProducts(category){
  console.log("Category:", category)
  if(category === ""){
    await getProducts()
  }else{
    const response = await fetch(`http://localhost:3001/product/filter?categories=${category}`)
    const filtered = await response.json()
    showProducts(filtered);
  }
}

function createCategoryList(categoryList){
  document.getElementById("categories").innerHTML = `
  <select onchange="filterProducts(this.value)">
    <option value="">All Categories</option>
    ${categoryList.map(c=>{
    return `
      <option value=${c.id}>${c.name}</option>
      `
  }).join("")}
  </select>`
}

getCategories()
filterProducts("")