let inventory = [];
let bill = [];

// Add product to inventory
function addProduct() {
  const name = document.getElementById("productName").value.trim();
  const price = parseFloat(document.getElementById("productPrice").value);
  if (!name || price <= 0 || isNaN(price)) {
    alert("Enter a valid name and positive price.");
    return;
  }
  inventory.push({ name, price });
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  displayInventory();
}

// Display inventory
function displayInventory(filtered = null) {
  const tableBody = document.querySelector("#inventoryTable tbody");
  tableBody.innerHTML = "";
  (filtered || inventory).forEach((item, index) => {
    tableBody.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td><button onclick="deleteProduct(${index})">Delete</button></td>
      </tr>`;
  });
}

// Filter inventory live search
function filterInventory() {
  const query = document.getElementById("inventorySearch").value.toLowerCase();
  const filtered = inventory.filter(item => item.name.toLowerCase().includes(query));
  displayInventory(filtered);
}

// Delete product
function deleteProduct(index) {
  inventory.splice(index, 1);
  displayInventory();
}

// Clear inventory
function clearInventory() {
  if (confirm("Are you sure you want to clear all products?")) {
    inventory = [];
    displayInventory();
  }
}

// Add to bill with quantity and discount
function addToBill() {
  const searchItem = document.getElementById("searchItem").value.trim();
  const quantity = parseInt(document.getElementById("quantity").value) || 1;
  const discount = parseFloat(document.getElementById("discount").value) || 0;

  const product = inventory.find(p => p.name.toLowerCase() === searchItem.toLowerCase());
  if (!product) {
    alert("Product not found!");
    return;
  }

  const discountedPrice = product.price - (product.price * (discount / 100));
  bill.push({ name: product.name, qty: quantity, price: discountedPrice * quantity });

  displayBill();
}

// Display bill
function displayBill() {
  const billBody = document.querySelector("#billTable tbody");
  billBody.innerHTML = "";
  let total = 0;

  bill.forEach(item => {
    billBody.innerHTML += `<tr>
      <td>${item.name}</td>
      <td>${item.qty}</td>
      <td>${item.price.toFixed(2)}</td>
    </tr>`;
    total += item.price;
  });

  document.getElementById("totalAmount").textContent = total.toFixed(2);

  // Show current date/time
  const now = new Date();
  document.getElementById("billDate").textContent = `Bill Date: ${now.toLocaleString()}`;
}

// Clear bill
function clearBill() {
  if (confirm("Clear the current bill?")) {
    bill = [];
    displayBill();
  }
}
