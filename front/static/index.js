

document.getElementById("search-btn").addEventListener('click', searchProducts);

async function getCategories(){
  const response = await fetch(`https://bsale-miniati.herokuapp.com/category/`)
  const categories = await response.json()
  createCategoryList(categories)
}

function showProducts(products) {
  document.getElementById("card-container").innerHTML =`
      <div class="cards" style="
      display: grid;
  grid-template-columns: repeat(auto-fit, minmax(2rem, 20rem));
  gap: 3.5rem;
  justify-content: center;
                          ">
        ${products.map(product =>{
    const discountedPrice = Math.floor(product.price*(100-product.discount)/100)
    return `
       <div class = "product-item" data-id = "${product.id}" style="
          width: 26vw;
          margin-top: 2rem;
          overflow: hidden;
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
          display: flex;
          border-radius: 5px;
          border: none;
          flex-direction: column;
          justify-content: space-between;
          cursor: pointer;
          transition: transform 200ms ease-in;
          ">
            <div class = "product-img" style="
                width: 25vw;
                height: 25vw;
            ">
              <img src = "${product.url_image}" alt="${product.name}" style="
              height: 100%;
              width: 100%;
              object-fit: cover;
              transition: transform 200ms ease-in;">
            </div>
            <div class = "product-name" style="
            text-align: center;
              padding: 0.7rem;
              font-size: 1.12rem;">
                ${product.name}
            </div>
            <div class="price" style="
                width: 70%;
                text-align: center;
                font-size: 1rem;
                margin: 1rem;
                ">$ ${discountedPrice}
            </div>
       </div>`}).join("")}
    </div>`
}

async function getProducts(){
  const response = await fetch(`https://bsale-miniati.herokuapp.com/product/`)
  const products = await response.json()
  console.log(products)
  showProducts(products);
}

async function searchProducts(){
  let searchInputTxt = document.getElementById('search-input').value.trim();
  fetch(`https://bsale-miniati.herokuapp.com/product/search?name=${searchInputTxt}`)
      .then(response => response.json())
      .then(data => {
        if(data.length === 0) {
          alert("No pudimos encontrar el producto")
          document.getElementById("search-input").value = ""
          getProducts()
        }
        else showProducts(data)}
      )
}

async function filterProducts(category){
  console.log("Category:", category)
  if(category === ""){
    await getProducts()
  }else{
    const response = await fetch(`https://bsale-miniati.herokuapp.com/product/filter?categories=${category}`)
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