const rightSection = document.getElementsByClassName("right-section")[0];
const leftSection = document.getElementsByClassName("left-section")[0];

//fetching from api
function fetchPruducts() {
  fetch(
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json"
  )
    .then((res) =>
      res.json().then((data) => {
        productInfo = data.product;
        productInfo.url1 = "./images/img1.jpeg";
        productInfo.url2 = "./images/img2.jpeg";
        productInfo.url3 = "./images/img3.jpeg";
        productInfo.url4 = "./images/img4.jpeg";
        productInfo.OffPercent = calculateOffPercent(productInfo);
        showProductOnUI();
        showLeftPartOfUI();
        localStorage.setItem("product", JSON.stringify(productInfo));
      })
    )
    .catch((error) => {
      console.log(error);
    });
}
fetchPruducts();

//function to calculate offer percentage
function calculateOffPercent({ ...productInfo }) {
  let priceOnPrinted = Number(productInfo.compare_at_price.slice(1));
  let price = Number(productInfo.price.slice(1));
  let diff = priceOnPrinted - price;
  let percent = Math.floor((diff * 100) / priceOnPrinted);
  return percent;
}

let countToshow;
let productInfo = {};
let noOfproducts = 1;
let CartsProducts = [];
let selectedProduct = {
  color: "Yellow",
  noOfproducts: noOfproducts,
  price: "$12999",
  productType: "Cloth",
  size: "Small",
  title: "Embrace Sideboard",
};

//function to choose color
function SelectColor(color) {
  let listOfColors = document.getElementsByClassName("material-icons");
  for (let i = 0; i < listOfColors.length; i++) {
    listOfColors[i].classList.remove("show");
  }
  let outlines = document.querySelectorAll(".outline");
  for (let i = 0; i < outlines.length; i++) {
    outlines[i].style.border = "none";
  }
  color.children[0].classList.add("show");
  const colorValue = color.style.backgroundColor;
  const outline = color.closest(".outline");
  outline.style.border = `3px solid ${colorValue}
    `;
  selectedProduct = {
    ...selectedProduct,
    color: color.id,
  };
}

//function to choose size
function SelectSize(size) {
  const sizes = document.getElementsByClassName("radio-boxes");
  const list = document.getElementsByClassName("radio");
  for (let i = 0; i < list.length; i++) {
    list[i].classList.remove("blue-color");
  }
  for (let i = 0; i < sizes.length; i++) {
    sizes[i].classList.remove("text-blue");
    sizes[i].children[0].classList.remove("border-radio");
  }
  size.classList.add("text-blue");
  size.children[0].children[0].classList.add("blue-color");
  size.children[0].classList.add("border-radio");
  selectedProduct = {
    ...selectedProduct,
    size: size.id,
  };
}

//function to add to cart
function AddToCart() {
  const messageEle = document.getElementsByClassName("Message-of-buy")[0];
  selectedProduct = {
    ...selectedProduct,
    price: productInfo.price,
    title: productInfo.title,
    productType: productInfo.product_type,
  };

  messageEle.textContent = `${selectedProduct.title}
     with color ${selectedProduct.color}
     and size ${selectedProduct.size}
     added to cart. `;
  CartsProducts.push(selectedProduct);
  localStorage.setItem("cartsProducts", JSON.stringify(CartsProducts));
  document.getElementsByClassName("Message-of-buy")[0].style.display = "block";
}

//function for the counter
function countNoOfproducts(btn) {
  countToshow = document.getElementById("countProducts");
  btn.value == "incre"
    ? noOfproducts++
    : noOfproducts == 1
    ? 1
    : noOfproducts--;
  selectedProduct = {
    ...selectedProduct,
    noOfproducts: noOfproducts,
  };
  countToshow.innerHTML = selectedProduct.noOfproducts;
}

//function ui
function showProductOnUI() {
  rightSection.innerHTML = ` <div> 
<div class="vendor">Marmeto</div>
<div class="title">Embrace Sideboard</div>
</div> 
<hr />
<div class="price-box">
   <div class="price-and-off">
      <div class="price" >${productInfo.price}
         .00
      </div>
      <div class="off">${productInfo.OffPercent}
         % Off
      </div>
   </div>
   <div>
      <div class="cut-price">
         <div class="underline">___________</div>
         <div>${productInfo.compare_at_price}
            .00
         </div>
      </div>
   </div>
</div>
<hr />
<div class="colors-box">
   <p>Choose a color</p>
   <div class="check-boxes">
      <div class="outline main-outline">
         <div class="checkbox" onclick="SelectColor(this)" id="Yellow" style="background-color:${productInfo?.options[0]?.values[0]?.Yellow}
            "> <span class="material-icons show">done</span> </div>
      </div>
      <div class="outline">
         <div class="checkbox" onclick="SelectColor(this)" id="Green" style="background-color:${productInfo.options[0].values[1].Green}
            "> <span class="material-icons">done</span> </div>
      </div>
      <div class="outline">
         <div class="checkbox" onclick="SelectColor(this)" id="Blue" style="background-color:${productInfo.options[0].values[2].Blue}
            "> <span class="material-icons">done</span> </div>
      </div>
      <div class="outline">
         <div class="checkbox" onclick="SelectColor(this)" id="Pink" style="background-color:${productInfo.options[0].values[3].Pink}
            "> <span class="material-icons">done</span> </div>
      </div>
   </div>
</div>
<hr />
<div class="sizes-box">
   <p>Choose a size</p>
   <div class ="all-radios">
      <div class="radio-boxes" onclick="SelectSize(this)" id=${productInfo.options[1].values[0]}
         >
         <div class="radio-box border-radio">
            <div class="radio blue-color"> </div>
         </div>
         <div>Small</div>
      </div>
      <div class="radio-boxes" onclick="SelectSize(this)" id=${productInfo.options[1].values[1]}
         >
         <div class="radio-box">
            <div class="radio"></div>
         </div>
         <div>Medium</div>
      </div>
      <div class="radio-boxes" onclick="SelectSize(this)" id=${productInfo.options[1].values[2]}
         >
         <div class="radio-box">
            <div class="radio"></div>
         </div>
         <div>Large</div>
      </div>
      <div class="radio-boxes" onclick="SelectSize(this)" id=${productInfo.options[1].values[3]}
         >
         <div class="radio-box">
            <div class="radio"></div>
         </div>
         <div>Extra Large</div>
      </div>
      <div class="radio-boxes" onclick="SelectSize(this)" id=${productInfo.options[1].values[4]}
         >
         <div class="radio-box">
            <div class="radio"></div>
         </div>
         <div>XXL</div>
      </div>
   </div>
</div>
<div class="counter-add-tocart">
   <div class="counter">
      <button onclick="countNoOfproducts(this)" value="decre">-</button> 
      <div id="countProducts">1</div>
      <button onclick="countNoOfproducts(this)" value="incre">+</button> 
   </div>
   <div class="add-to-cart">
      <div> </div>
      <button onclick="AddToCart()"> <span class="material-icons show-beg">shopping_bag</span> Add to Cart</button> 
   </div>
</div>
<div class="Message-of-buy"></div>
<hr />
<div class="Description"> ${productInfo.description}
</div>`;
  document.getElementsByClassName("Message-of-buy")[0].style.display = "none";
}

//function to load left part of ui
function showLeftPartOfUI() {
  leftSection.innerHTML = ` <div class="upper-part-img"> <img src=${productInfo.url1}
   alt="img" /> </div>
<div class="lower-part-imgs">
   <div class="box-thumbnail"> <img src=${productInfo.url1}
      alt="img" /> </div>
   <div class="box-thumbnail"> <img src=${productInfo.url2}
      alt="img" /> </div>
   <div class="box-thumbnail"> <img src=${productInfo.url3}
      alt="img" /> </div>
   <div class="box-thumbnail"> <img src=${productInfo.url4}
      alt="img" /> </div>
</div> `;
}
