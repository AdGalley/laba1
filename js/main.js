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

Vue.component('product-review', {
   template: `

   <form class="review-form" @submit.prevent="onSubmit">
 <p>
   <label for="name">Name:</label>
   <input id="name" v-model="name" placeholder="name">
 </p>

 <p>
   <label for="review">Review:</label>
   <textarea id="review" v-model="review"></textarea>
 </p>

 <p>
   <label for="rating">Rating:</label>
   <select id="rating" v-model.number="rating">
     <option>5</option>
     <option>4</option>
     <option>3</option>
     <option>2</option>
     <option>1</option>
   </select>
 </p>

 <p>
       <label style="display: block; margin-bottom: 8px;">Would you recommend this product?</label>
       <label style="display: inline-block; margin-right: 20px;">
         <input type="radio" v-model="recommended" value="yes" style="margin-left: -5px;">
         Yes
       </label>
       <label style="display: inline-block;">
         <input type="radio" v-model="recommended" value="no" style="margin-left: -5px;">
         No
       </label>
     </p>

 <p>
   <input type="submit" value="Submit"> 
 </p>
 <p v-if="errors.length">
 <b>Please correct the following error(s):</b>
 <ul>
   <li v-for="error in errors">{{ error }}</li>
 </ul>
</p>


</form>

 `,
   data() {
       return {
           name: null,
           review: null,
           rating: null,
           recommended: null,
           errors: []
       }
   },

   methods:{
   onSubmit() 
   { this.errors = [];

   if(this.name && this.review && this.rating) {
       let productReview = {
           name: this.name,
           review: this.review,
           rating: this.rating,
           recommended: this.recommended
       }
       this.$emit('review-submitted', productReview)
       this.name = null
       this.review = null
       this.rating = null
       this.recommended = null
   } else {
       if(!this.name) this.errors.push("Name required.")
       if(!this.review) this.errors.push("Review required.")
       if(!this.rating) this.errors.push("Rating required.")
       if(!this.recommended) this.errors.push("Please answer the recommendation question.")
   }
}


}

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

               <div>
                   <h2>Reviews</h2>
                   <p v-if="!reviews.length">There are no reviews yet.</p>
                  <ul>
                     <li v-for="review in reviews">
                     <p>{{ review.name }}</p>
                <p>Rating: {{ review.rating }}</p>
                <p>Would recommend: {{ review.recommended === 'yes' ? 'Yes' : 'No' }}</p>
                  <p>{{ review.review }}</p>
                   </li>
                  </ul>
               </div>
               

               <product-review @review-submitted="addReview"></product-review>

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
      reviews: []
      
           
       }
   },

   methods: {
       addToCart() {
         this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
      },

      addReview(productReview) {
         this.reviews.push(productReview)
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
       cart: [],
       
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




































