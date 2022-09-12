__DEPLOY LINK__: __https://bsale-vanilla.vercel.app/__

## Objective:
Create an E-commerce that is able to display products based in their category,
utilizing the provided database for its development.
You must also implement a search function where the results must arrive already filtered to the client



## Technologies and Tools

- JavaScript
- NodeJS
- ExpressJS
- Sequelize ORM
- CSS

## Documentation

All functions can be found inside the front/static/index.js path. 

    getCategories():
        * Makes a call to our API server to get all the product categories saved in the database.
        * It returns a list of Category type objects that will be used in the createCategoryList() function

    createCategoryList( categoryList):
        * This function creates the HTML objects to display the category selection list. 
        * It receives an array of Category type objects, which then uses to create each <option> object inside the 
          <select> object.
        * on change, it will call to the filterProducts() function

    showProducts(products):
        * This function receives an array of Product type objects, which it uses to then create all HTML objects
          that will display all the data of each product. 

    getProducts():
        * Makes a call to our API server to get all the products saved in the database.
        * It returns an array of Product type objects that will be passed to the showProducts() function to display
          them. 
    
    searchProducts():
        * It receives the input from our "search-input" object. 
        * Then it makes a call to our API server to get all the products saved in the database whose name match the input.
        * It returns an array of Product type objects that will be passed to the showProducts() function to display
          them. 
        
    searchProducts():
        * It receives the input from our "search-input" object. 
        * Then it makes a call to our API server to get all the products saved in the database whose name match the input.
        * It returns an array of Product type objects that will be passed to the showProducts() function to display
          them. 
        * If it doesn't find a match, it will call the showProducts() function

    filterProducts({category}):
        * It receives the input from our <select> object value. 
        * Then it makes a call to our API server to get all the products saved in the database whose category
          property match our input
        * It returns an array of Product type objects that will be passed to the showProducts() function to display
          them. 
        * If it doesn't find a match, it will call the showProducts() function

