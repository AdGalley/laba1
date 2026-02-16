let app = new Vue({
   el: '#app',
   data: {
      product: "Socks",
      brand: 'Vue Mastery',
      selectedVariant: 0,
      altText: "A pair of socks",
      link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
      inventory: 100,
      onSale: false,
      details: ['80% cotton', '20% polyester', 'Gender-neutral'],
      variants: [
         { 
            variantId: 2234, 
            variantColor: 'green',
            variantImage: "./assets/vmSocks-green-onWhite.jpg",
            variantQuantity: 0
         },
         { 
            variantId: 2235, 
            variantColor: 'blue',
            variantImage: "./assets/vmSocks-blue-onWhite.jpg",
            variantQuantity: 10
         }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      cart: 0
   },
    
   computed: {
      currentVariant() {
      return this.variants[this.selectedVariant];
   },
   currentQuantity() {
      return this.currentVariant.variantQuantity;
   },
   inStock() {
      return this.currentQuantity > 0;
   },
   altText() {
      return `A pair of ${this.currentVariant.variantColor} socks`;
   },
   image() {
      return this.currentVariant.variantImage;
   },
   title() {
      return this.brand + ' ' + this.product;
   },
         
         sale() {
      return this.onSale 
         ? `${this.brand} ${this.product} are on sale!` 
         : `${this.brand} ${this.product} are not on sale.`;
        }

   },


   methods: {
      addToCart() {
         if (this.inventory > 0) {
            this.cart += 1;
         }
      },

      deleteToCart(){
        if (this.cart > 0) {
            this.cart -= 1;
        }
      },

      updateProduct(index) {
         this.selectedVariant = index;
         console.log(index);
      }
   }
});