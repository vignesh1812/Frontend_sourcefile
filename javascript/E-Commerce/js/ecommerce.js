const carticon=document.querySelector('.cart-icon');
const cart=document.querySelector('.cart');
const cartclose=document.querySelector('.cart-close');

carticon.addEventListener('click',()=>{
cart.classList.add('active');
});

cartclose.addEventListener('click',()=>{
cart.classList.remove("active");
});

//start when the document is ready

if(document.readyState=="loading"){
    document.addEventListener("DOMContentLoaded",start);
}else{
    start();
}

//Start function
function start(){
addEvents();
}

//add rerender
function update(){
addEvents();
updatetotal();
}



function addEvents(){
    let cartRemove_btn=document.querySelectorAll('.remove-product')
    console.log(cartRemove_btn);
    cartRemove_btn.forEach(btn=>{
        btn.addEventListener('click',handle_Removecartitem);
    })

    let cartQuantity_inputs=document.querySelectorAll(".cart-product-quantity");
    cartQuantity_inputs.forEach((input)=>{
        input.addEventListener("change",handle_changeItemQuantity);
    })

    //add item to cart
    let addCart_btns=document.querySelectorAll(".add-icon");
    addCart_btns.forEach(btn =>{
        btn.addEventListener("click",handle_addCartitem)
    })

    const buy_btn=document.querySelector('.btn-buy');
    buy_btn.addEventListener('click',handle_buyorder)
}

function handle_buyorder(){
    if(AddedItems.length<=0){
        alert("There is No item to Place Order! \n Please select an Item to cart");
    }
    const cartContent=cart.querySelector('.cart-content');
    cartContent.innerHTML="";
    alert("Your Oder is Placed Successfully!");
    AddedItems=[];
    update();
}


let AddedItems=[]

//handle_adCarditem
function handle_addCartitem(){
    let product=this.parentElement;
    let title=product.querySelector(".product-title").innerHTML;
    let price=product.querySelector(".product-price").innerHTML;
    let imgsrc=product.querySelector(".product-img").src;
    console.log(title,price,imgsrc);

    let newtoadd={
        title,
        price,
        imgsrc
    };
         
   if(AddedItems.find((el)=>el.title==newtoadd.title)){
    alert("This item is Already Exists!");
    return;
   }
   else{
    AddedItems.push(newtoadd);
   }

    let cartBoxElement=CartBoxElement(title,price,imgsrc);
    let newNode=document.createElement("div");
    newNode.innerHTML=cartBoxElement;
    const cartContent=cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);
    update();
}

//handle_Removecartitem
function handle_Removecartitem(){
      this.parentElement.remove();
      AddedItems=AddedItems.filter((el)=>el.title != this.parentElement.querySelector('.cart-product-title').innerHTML);
      update();
};

function handle_changeItemQuantity(){
 if (isNaN(this.value)|| this.value < 1){

    this.value=1;
 }
 this.value=Math.floor(this.value);
 update();
}

function updatetotal()
{
    let cartboxes=document.querySelectorAll(".cart-box");
    const totalElement=cart.querySelector(".total-price");
    let total = 0;
    cartboxes.forEach((cartbox) => {
        let priceElement=cartbox.querySelector('.cart-product-price');
        let price=parseFloat(priceElement.innerHTML.replace("₹",""));
        let quantity=cartbox.querySelector('.cart-product-quantity').value;
        total += price*quantity;
        
    });

    totalElement.innerHTML="₹"+total;

}

function CartBoxElement(title,price,imgsrc){
    return `
    <div class="cart-box">
       <img src=${imgsrc} class="cart-product-img" alt="shoe">
    
      <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <span class="cart-product-price">${price}</span>
        <input type="number" value="1" class="cart-product-quantity">
      </div>
    
       <i class='bx bxs-trash remove-product'></i>
    </div>`
}
