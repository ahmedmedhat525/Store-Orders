// التعرف على العناصر
// عناصر اضافة الطلب



const pickupNumber = document.getElementById("pickup-number");
const productName = document.getElementById("product-name");
const clientName = document.getElementById("Client-name");
const address = document.getElementById("Address");
const status = document.getElementById("Status");
const storeName = document.getElementById("Store-name");
const quantity = document.getElementById("quantity");
const clientNumber = document.getElementById("Client-number");
const price = document.getElementById("Price");
const PriseForShipping = document.getElementById("PriseForShipping");
const PriceForProduct = document.getElementById("PriceForProduct");
const date = document.getElementById("date");
const submitButton = document.getElementById("submitButton");


// عناصر البحث
const SearchClientname = document.getElementById("SearchClientname");
const SearchClientnumber = document.getElementById("SearchClientnumber");
const SearchStoreName = document.getElementById("SearchStoreName");
const SearchPickupNumber = document.getElementById("SearchPickupNumber");
const SearchProductName = document.getElementById("SearchProductName");
const SearchStatus = document.getElementById("SearchStatus");
const SearchDate = document.getElementById("SearchDate");
const clearFilters = document.getElementById("clearFilters");
const Search = document.getElementById("Search");
const ClearAll = document.getElementById("ClearAll");
// جدول الطلبات
let ordersTableBody = document.getElementById("ordersTableBody");
let editingOrderindex = null;
const allcoast = document.getElementById("allcoast");
const profit = document.getElementById("profit");
const costproduct = document.getElementById("costproduct");
const shipping = document.getElementById("shipping");

// create
let orders;

if (localStorage.orders != null) {
    orders = JSON.parse(localStorage.orders);
}
else { orders = []; }
submitButton.addEventListener("click", function (e) {


    const order = {
        pickupNumber: pickupNumber.value,
        productName: productName.value,
        clientName: clientName.value,
        address: address.value,
        status: status.value,
        storeName: storeName.value,
        quantity: quantity.value,
        clientNumber: clientNumber.value,
        price: parseFloat(price.value),
        PriseForShipping: parseFloat(PriseForShipping.value),
        PriceForProduct: parseFloat(PriceForProduct.value),
        date: date.value



    }
    const input = [
        pickupNumber,
        productName,
        clientName,
        address,
        status,
        storeName,
        quantity,
        clientNumber,
        price,
        PriseForShipping,
        PriceForProduct,
        date,]





    if (pickupNumber.value === "" || productName.value === "" || clientName.value === "" || address.value === "" || storeName.value === "" || quantity.value === "" || clientNumber.value === "" || price.value === "" || PriseForShipping.value === "" || PriceForProduct.value === "" || date.value === "") {
        for (let i = 0; i < input.length; i++) {
            if (input[i].value === "") {
                input[i].style.border = " 2px solid red";

            }
        } return;
    }


    if (editingOrderindex != null) {
          orders[editingOrderindex] = order
        pickupNumber.value ="";
productName.value ="";
storeName.value="";
date.value="";
        clientName.value = "";
        address.value = "";
    quantity.value = 1;
    clientNumber.value = "";
    price.value="";
       PriseForShipping.value="";
       PriceForProduct.value="";
        submitButton.textContent = "Add Order";
        editingOrderindex = null;

    }
    else {

        orders.push(order);
        saveAndRender();
         clientName.value = "";
    address.value = "";
    quantity.value = 1;
    clientNumber.value = "";
     price.value="";
       PriseForShipping.value="";
       PriceForProduct.value="";
    }
   

    saveAndRender();
    renderOrders();
});

// reading
function renderOrders(data = orders) {
    let table = "";
    for (let i = data.length - 1; i >= 0; i--) {


        table += `<tr> <td>${data[i].pickupNumber}</td>
            <td> ${data[i].productName}</td>
      <td>${data[i].clientName}</td>
      <td>${data[i].address}</td>
        <td>
        <select onchange="updateStatus(${i}, this.value)">
          <option ${data[i].status === "Under-Review" ? "selected" : ""}>Under-Review</option>
          <option ${data[i].status === "In-Progress" ? "selected" : ""}>In-Progress</option>
          <option ${data[i].status === "Completed" ? "selected" : ""}>Completed</option>
          <option ${data[i].status === "Cancelled" ? "selected" : ""}>Cancelled</option>
        </select>
      </td>
  <td>${data[i].storeName}</td>
      <td>${data[i].quantity}</td>
      <td>${data[i].clientNumber}</td>
      <td>$${data[i].price}</td>
      <td>${data[i].date}</td>
      <td>
     <button onclick="editOrder(${i})">Edit</button>
         <button onclick="deleteOrder(${i})">Delete</button>
     </td>
      </tr>
`


    } ordersTableBody.innerHTML = table;

    calcuteall();
};
//    delete
function deleteOrder(index) {
    if (confirm("Are you sure?")) {
        orders.splice(index, 1);

        saveAndRender();
        renderOrders();
    }
}

// edit
function editOrder(index) {
    const order = orders[index];

    pickupNumber.value = order.pickupNumber;
    productName.value = order.productName;
    clientName.value = order.clientName;
    address.value = order.address;
    status.value = order.status;
    storeName.value = order.storeName;
    quantity.value = order.quantity;
    clientNumber.value = order.clientNumber;
    price.value = order.price;
    PriseForShipping.value = order.PriseForShipping;
    PriceForProduct.value = order.PriceForProduct;
    date.value = order.date;

    editingOrderindex = index;
    submitButton.textContent = "Update";
}
// localStorage
function saveAndRender() {
    localStorage.setItem('orders', JSON.stringify(orders));
    renderOrders();


}
//  updateStatus

function updateStatus(index, NewStatus) {
    orders[index].status = NewStatus;
    saveAndRender();
    renderOrders();
}

// filter
Search.addEventListener("click", function () {
    const filtered = [];
    for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        const Clientnamefilter = SearchClientname.value === "" || order.clientName.trim().toLowerCase().includes(SearchClientname.value.trim().toLowerCase());
        const Clientnumberfilter = SearchClientnumber.value === "" || order.clientNumber.trim().toLowerCase().includes(SearchClientnumber.value).trim().toLowerCase();
        const storenamefilter = SearchStoreName.value === "" || order.storeName.trim().toLowerCase().includes(SearchStoreName.value.trim().toLowerCase());
        const PickupNumberfilter = SearchPickupNumber.value === "" || order.pickupNumber.trim().toLowerCase().includes(SearchPickupNumber.value.trim().toLowerCase());
        const ProductNamefilter = SearchProductName.value === "" || order.productName.trim().toLowerCase().includes(SearchProductName.value.trim().toLowerCase());
        const Statusfilter = SearchStatus.value === "" || order.status.trim().toLowerCase().includes(SearchStatus.value.trim().toLowerCase());
        const Datefilter = SearchDate.value === "" || order.date === SearchDate.value;
        if (Clientnamefilter && Clientnumberfilter && storenamefilter && PickupNumberfilter && ProductNamefilter && Statusfilter && Datefilter) {
            filtered.push(order);
        } renderOrders(filtered);
        calcuteall(filtered);


    }
});


// DeletAll
ClearAll.addEventListener("click", function () {
    orders = [];

    saveAndRender();
});

// clearFilters
clearFilters.addEventListener("click", function () {
    SearchClientname.value = "";
    SearchClientnumber.value = "";
    SearchStoreName.value = "";
    SearchPickupNumber.value = "";
    SearchProductName.value = "";
    SearchStatus.value = "";
    SearchDate.value = "";
    saveAndRender();
});

// calcuteall
function calcuteall(data = orders) {

    let Profit = 0;
    let Costproduct = 0;
    let Shipping = 0;
    let Allcoast = 0;
    for (let i = 0; i < data.length; i++) {
        const order = data[i];

        const pricE = parseFloat(order.price) || 0;
        const CostproducT = parseFloat(order.PriceForProduct) || 0;
        const ShippinG = parseFloat(order.PriseForShipping) || 0;

        Profit += (pricE - (CostproducT + ShippinG));
        Costproduct += CostproducT;
        Shipping += ShippinG;
        Allcoast += pricE;

    }
    profit.textContent = Profit;
    costproduct.textContent = Costproduct;
    shipping.textContent = Shipping;
    allcoast.textContent = Allcoast


}
renderOrders();
