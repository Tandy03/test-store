class CustomAddToCart extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.render();
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          .add-to-cart {
            padding: 10px 15px;
            background: #007bff;
            color: #fff;
            border: none;
            cursor: pointer;
            transition: 0.3s;
            display: block;
            width: 100%;
          }
          .add-to-cart:hover {
            background: #0056b3;
          }
        </style>
        <button class="add-to-cart">Add to cart</button>
      `;
  
      this.shadowRoot.querySelector('.add-to-cart').addEventListener('click', () => {
        this.addToCart();
      });
    }
  
    async addToCart() {
      const productId = this.getAttribute('data-product-id');
      try {
        await fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: productId, quantity: 1 })
        });
  
        // 1. Оновлюємо mini-cart
        await this.updateCartPopup();
  
        // 2. Оновлюємо список товарів
        await this.updateFeaturedProducts();
      } catch (error) {
        console.error('Error adding product:', error);
      }
    }
  
    async updateCartPopup() {
      const response = await fetch('/cart?view=popup');
      const html = await response.text();
      document.querySelector('.mini-cart').innerHTML = html;
    }
  
    async updateFeaturedProducts() {
      const sectionId = '{{ section.id }}';
      const response = await fetch(`/?section_id=${sectionId}`);
      const text = await response.text();
      const parser = new DOMParser();
      const newDoc = parser.parseFromString(text, 'text/html');
      const newSection = newDoc.querySelector('.featured-products.section');
      document.querySelector('.featured-products.section').innerHTML = newSection.innerHTML;
    }
  }
  
  customElements.define('custom-add-to-cart', CustomAddToCart);
  