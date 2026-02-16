let app = new Vue({
   el: '#app',
   data: {
      product: "Socks",
      image: "./assets/vmSocks-green-onWhite.jpg",
      altText: "A pair of socks",
      link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
      inventory: 10,
      onSale: true,
      details: ['80% cotton', '20% polyester', 'Gender-neutral'],
      variants: [
         { 
            variantId: 2234, 
            variantColor: 'green',
            variantImage: "./assets/vmSocks-green-onWhite.jpg"
         },
         { 
            variantId: 2235, 
            variantColor: 'blue',
            variantImage: "./assets/vmSocks-blue-onWhite.jpg"
         }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      cart: 0
   },
    
   computed: {
      inStock() {
         return this.inventory > 0;
      },
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

      updateProduct(variantImage) {
         this.image = variantImage;
      }
   }
});