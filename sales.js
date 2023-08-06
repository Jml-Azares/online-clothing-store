var isLoggedIn = false;
var userID = null;
var cart = [];

var shop = {
    shopName: "Breaking Bad Botique",
    shopAdd: "Albuquerque, New Mexico",
    code: "BB012008",
    users: [
      {
        firstName: "Walter",
        lastName: "White",
        age: "64",
        bDay: "09.07.1958",
        userName: "Heisenberg",
        passWord: "WW123"
      },
      {
        firstName: "Jesse",
        lastName: "Pinkman",
        age: "35",
        bDay: "09.24.1987",
        userName: "Capt. Cook",
        passWord: "JP123"
      },
      {
        firstName: "Saul",
        lastName: "Goodman",
        age: "62",
        bDay: "11.12.1960",
        userName: "SoGood",
        passWord: "SG123"
      }
    ],
    clothingItem: [
      {
        Name: "Bad Jeans",
        Category: "Trousers",
        Price: 100,
        Quantity: 10
      },
      {
        Name: "Bad Brief",
        Category: "Underwear",
        Price: 20,
        Quantity: 30
      },
      {
        Name: "Bad Shirt",
        Category: "T-Shirt",
        Price: 50,
        Quantity: 20
      }
    ],
    storeName: function(){
      console.log(this.shopName);
    },
    storeItems: function(){
      console.log(this.clothingItem);
    }
}

console.log("--------------------------------------------------------");
shop.storeName();
console.log("********************************************************");
console.log("Clearance Sale!");
console.log("--------------------------------------------------------");
shop.storeItems();
console.log("--------------------------------------------------------");

function shopUser(callback, data){
  callback(data)
}

function addUser(info) {
  shop.users.push(info);
  console.log(info.firstName + " " + info.lastName + " has been added");
}

function addItem(info) {
    shop.clothingItem.push(info);
    console.log(info.Name + " has been added to Clearance Sale!");
  }

shopUser(addUser,{
  firstName: "Gus",
  lastName: "Fring",
  age: "64",
  bDay: "11.01.1958",
  userName: "Chicken Man",
  passWord: "GF123"
});

console.log("--------------------------------------------------------");

shopUser(addItem,{
  Name: "Bad Boots",
  Category: "Shoes",
  Price: 200,
  Quantity: 50,
});

console.log("********************************************************");
console.log("Updated List of Clearance Sale!");
console.log("********************************************************");

shop.storeItems();

function addStock(itemName, amountToAdd) {
  const item = shop.clothingItem.find(item => item.Name === itemName);
  if (item) {
    item.Quantity += amountToAdd;
    console.log(`Added ${amountToAdd} stock to ${itemName}.`);
  } else {
    console.log(`${itemName} not found in inventory.`);
  }
}

function shopControl(){
  function loginUser(username, password){
      shop.users.forEach((element, index) => {
          if(element.userName == username && element.passWord == password){
              isLoggedIn = true;
              userID = index;
              console.log("Hello " + element.firstName + " " + element.lastName + "!");
          }
      });

      if(!isLoggedIn){
          userID = null;
          console.log("Shopper not found!");
      }
  }

  function addToCart(itemName, itemQty) {
    if (userID === null) {
      console.log("Please login to add items to your cart.");
      return;
    }
    const itemIndex = shop.clothingItem.findIndex((item) => item.Name === itemName);
    if (itemIndex === -1) {
      console.log("Item not found or out of stock.");
      return;
    }
    const item = shop.clothingItem[itemIndex];
    if (item.Quantity < itemQty) {
      console.log("Insufficient stock!");
      return;
    }
    if(itemQty <= 0){
      console.log("Please input a valid quantity.");
      return;
    }    
    const cartItemIndex = cart.findIndex((item) => item.Name === itemName);
    if (cartItemIndex === -1) {
      cart.push({
        Name: item.Name,
        Price: item.Price,
        Quantity: itemQty,
      });
    } else {
      cart[cartItemIndex].Quantity += itemQty;
    }
    const itemTotal = item.Price * itemQty;
    console.log(
      itemQty +
        " " +
        item.Name +
        "(s) added to cart. Item total: $" +
        itemTotal.toFixed(2)
    );
  
    let overallTotal = 0;
    for (const item of cart) {
      overallTotal += item.Price * item.Quantity;
    }
    console.log("Overall total: $" + overallTotal.toFixed(2));
  }
  
  function confirmOrder(paymentAmount) {
    const totalPrice = cart.reduce((acc, item) => acc + item.Price * item.Quantity, 0);
    const change = paymentAmount - totalPrice;
    if (change < 0) {
      console.log("Insufficient payment! Please provide additional payment.");
      return;
    }
    cart.forEach((item) => {
      const itemIndex = shop.clothingItem.findIndex((i) => i.Name === item.Name);
      shop.clothingItem[itemIndex].Quantity -= item.Quantity;
    });
      console.log("Order Confrim!")
      console.log("----- Receipt -----");
      cart.forEach((item) => {
      console.log(`${item.Name} x ${item.Quantity} - $ ${(item.Price * item.Quantity).toFixed(2)}`);
      return;
    });
      console.log("-------------------");
      console.log(`Total price: $ ${totalPrice.toFixed(2)}`);
      console.log(`Payment: $ ${paymentAmount.toFixed(2)}`);
      console.log(`Change: $ ${change.toFixed(2)}`);
      cart = [];
      return;
  }
  
  function showError(msg){
    console.error(msg);
  }

  return{
    showError,
    loginUser,
    addToCart,
    confirmOrder
  }
}

console.log("--------------------------------------------------------");
var walter = shopControl();
walter.loginUser("Chicken Man", "GF123");
console.log("--------------------------------------------------------");
walter.addToCart("Bad Jeans", 5);
walter.addToCart("Bad Brief", 10);
walter.addToCart("Bad Shirt", 10);
walter.addToCart("Bad Boots", 10);
walter.confirmOrder(5000);

console.log("********************************************************");
console.log("Current Stock of Clearance Sale!");
console.log("********************************************************");
shop.storeItems();

console.log("--------------------------------------------------------");
addStock("Bad Jeans", 9);
addStock("Bad Brief", 8);
addStock("Bad Shirt", 90);
addStock("Bad Boots", 60);
console.log("********************************************************");
console.log("Updated Stock of Clearance Sale!");
console.log("********************************************************");
shop.storeItems();

console.log("--------------------------------------------------------");
var jessie = shopControl();
jessie.loginUser("Capt. Cook", "JP123");
console.log("--------------------------------------------------------");
jessie.addToCart("Bad Jeans", 50);
jessie.addToCart("Bad Brief", 20);
jessie.addToCart("Bad Shirt", 30);
jessie.addToCart("Bad Boots", 15);
jessie.confirmOrder(5000);

console.log("********************************************************");
console.log("Current Stock of Clearance Sale!");
console.log("********************************************************");
shop.storeItems();