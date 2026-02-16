let app = new Vue({
   el: '#app',
   data: {
      product: "Socks",
      brand: 'Vue Mastery',
      selectedVariant: 0,
      altText: "A pair of socks",
      link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
      inventory: 120,
      onSale: true,
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
      inStock(){
        return this.variants[this.selectedVariant].variantQuantity
        },

      title() {
       return this.brand + ' ' + this.product;
         },
   
     image() {
        return this.variants[this.selectedVariant].variantImage;
         },

         sale() {
           if (this.onSale) {
            return `${this.brand} ${this.product} are on sale!`;
           } else {
            return `${this.brand} ${this.product} are not on sale.`;
           }
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