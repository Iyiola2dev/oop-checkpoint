// JavaScript code (app.js)

// Product class
class Product {
  constructor(id, name, price) {
      this.id = id;
      this.name = name;
      this.price = price;
  }
}

// ShoppingCartItem class
class ShoppingCartItem {
  constructor(product, quantity) {
      this.product = product;
      this.quantity = quantity;
  }

  getTotalPrice() {
      return this.product.price * this.quantity;
  }
}

// ShoppingCart class
class ShoppingCart {
  constructor() {
      this.items = [];
  }

  addItem(product, quantity) {
      const existingItem = this.items.find(item => item.product.id === product.id);
      if (existingItem) {
          existingItem.quantity += quantity;
      } else {
          this.items.push(new ShoppingCartItem(product, quantity));
      }
      this.updateDisplay();
  }

  removeItem(productId) {
      this.items = this.items.filter(item => item.product.id !== productId);
      this.updateDisplay();
  }

  incrementItem(productId) {
      const item = this.items.find(item => item.product.id === productId);
      if (item) {
          item.quantity += 1;
          this.updateDisplay();
      }
  }

  decrementItem(productId) {
      const item = this.items.find(item => item.product.id === productId);
      if (item && item.quantity > 1) {
          item.quantity -= 1;
          this.updateDisplay();
      }
  }

  getTotal() {
      return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }

  displayItems() {
      const cartItemsList = document.getElementById('cart-items');
      cartItemsList.innerHTML = '';
      this.items.forEach(item => {
          const li = document.createElement('li');
          li.innerHTML = `
              ${item.product.name}: 
              <div class="increment-decrement-buttons">
                  <button onclick="cart.decrementItem(${item.product.id})">-</button>
                  <span class="quantity">${item.quantity}</span>
                  <button onclick="cart.incrementItem(${item.product.id})">+</button>
              </div>
              x $${item.product.price} = $${item.getTotalPrice().toFixed(2)}
              <button onclick="cart.removeItem(${item.product.id})">Remove</button>
          `;
          cartItemsList.appendChild(li);
      });
  }

  updateDisplay() {
      this.displayItems();
      document.getElementById('total-price').textContent = `Total: $${this.getTotal().toFixed(2)}`;
  }
}

// Sample products
const apple = new Product(1, 'Apple', 1.00);
const banana = new Product(2, 'Banana', 0.50);
const orange = new Product(3, 'Orange', 0.75);

// Create shopping cart
const cart = new ShoppingCart();

// Add sample products to the page
const productList = document.getElementById('product-list');
[apple, banana, orange].forEach(product => {
  const li = document.createElement('li');
  li.textContent = `${product.name} - $${product.price.toFixed(2)}`;
  const addButton = document.createElement('button');
  addButton.textContent = 'Add to Cart';
  addButton.onclick = () => cart.addItem(product, 1);
  li.appendChild(addButton);
  productList.appendChild(li);
});

// Clear cart button
document.getElementById('clear-cart').onclick = () => {
  cart.items = [];
  cart.updateDisplay();
};
