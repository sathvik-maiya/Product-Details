const rightSection = document.getElementsByClassName("right")[0];
const leftSection = document.getElementsByClassName("left")[0];

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

