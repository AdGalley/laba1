Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul class="details">
      <li v-for="(detail, index) in details" 
          :key="index">
        {{ detail }}
      </li>
    </ul>
  `
});

Vue.component('product', {
   props: {
       premium: {
           type: Boolean,
           required: true
       }
   },

   template: `
   <div class="product">
      <div class="product-image">
         <img v-bind:src="image" v-bind:alt="altText" />
      </div>

      <div class="product-info">
         <h1>{{ title }}</h1>
         <p class="sale-message">{{ sale }}</p>
         <a v-bind:href="link">More products like this</a>
         <p v-if="inStock">In stock</p>
         <p v-else :class="{ 'line-through': !inStock }">Out of stock</p>
         <p>Shipping: {{ shipping }}</p>
         
         <product-details :details="details"></product-details>

         <h3 class="Sizes">Sizes:</h3>
            <ul class="details">
            <li v-for="size in sizes" :key="size">{{ size }}</li>
            </ul>

            <div 
                class="color-box"
                 v-for="(variant, index) in variants"
                 :key="variant.variantId"
                :style="{ backgroundColor:variant.variantColor }"
                @mouseover="updateProduct(index)">
            </div>
            
         
         <button 
            v-on:click="addToCart"
            :disabled="!inStock"
            :class="{ disabledButton: !inStock }">"Add to cart</button>
         
         <button v-on:click="deleteToCart">"Delete to cart
            
         </button>
            
         </div>
      </div>
   </div>
</div>
`,
data() {
       return {
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
      
           
       }
   },

   methods: {
       addToCart() {
         this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
      },


      deleteToCart(){
         if (this.inStock) {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
         }
      },

      updateProduct(index) {
         this.selectedVariant = index;
         console.log(index);
      }
       
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
         },

         shipping() {
            if (this.premium) {
            return "Free";
            } else {
            return 2.99
          }
         }
       }
  
})

let app = new Vue({
   el: '#app',
   data: {
       premium: true,
       cart: []
   },

   methods: {
    updateCart(id) {
       this.cart.push(id);
   },

   removeFromCart(productId) {
           const index = this.cart.indexOf(productId);
           if (index > -1) {
               this.cart.splice(index, 1);
           }
       }

}

})




































