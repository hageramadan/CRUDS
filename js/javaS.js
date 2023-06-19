var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var productBtn=document.getElementById("productBtn");
var searchBtn=document.getElementById("searchBtn");
var tBody=document.getElementById("tBody");
var productNameError='Producr Name should start with capital letter and length of 3 to 8';
var productPriceError='price at least 1K and not more than 10K';
var productCategoryError='in Category you only enter tv or mobile or laptop';
var productDescError='Description should be have only words';
var flag;
var temp;


//update

function updateProduct(element){
   productName.value=maniProduct[element].name;
   productPrice.value=maniProduct[element].price;
   productCategory.value=maniProduct[element].category;
   productDesc.value=maniProduct[element].desc;
   productBtn.innerHTML='update Product';
   temp=element;
}

function swapProduct(){
   maniProduct[temp].name=productName.value;
       maniProduct[temp].price=productPrice.value;
       maniProduct[temp].category=productCategory.value;
       maniProduct[temp].desc=productDesc.value;
       productBtn.innerHTML='add Product';
}
//click on button (main process)
var maniProduct;
if(localStorage.getItem('ourProducts')!=null){
   maniProduct=JSON.parse(localStorage.getItem('ourProducts'));
   display();
}
else{
   maniProduct=[];
}
function addProduct(){
   if(validateProduct()==true){
      var product={
         name: productName.value,
         price: productPrice.value ,
         category: productCategory.value ,
         desc: productDesc.value
        }
        if(productBtn.innerHTML==='add Product')
         {
         maniProduct.push(product);
          }
         else if(productBtn.innerHTML==='update Product')
         {
             swapProduct()
         }
         document.getElementById("errorP").innerHTML='';
      localStorage.setItem('ourProducts',JSON.stringify(maniProduct));
      display();
      clearForm()
      updateProduct(flag);
    ;
   }
   else{
      document.getElementById("errorP").innerHTML=flag;
   }
    
}

// clear the value
function clearForm(){

      productName.value='';
      productPrice.value='';
      productCategory.value='';
      productDesc.value='';
   
}


//add product in table and display it to user

function display(){
   var cartona=``;
   for(var i=0;i<maniProduct.length;i++)
   {
      cartona+=`   
      <tr>
      <td>${i}</td>
      <td>${maniProduct[i].name}</td>
      <td>${maniProduct[i].price}</td>
      <td>${maniProduct[i].category}</td>
      <td>${maniProduct[i].desc}</td>
      <td><button onclick="updateProduct(${i})" class="btn btn-outline-warning">update</button></td>
      <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">delete</button></td>
      </tr>
      `
   }

   tBody.innerHTML=cartona;
}


//delete

function deleteProduct(index){
         maniProduct.splice(index,1);
         localStorage.setItem('ourProducts',JSON.stringify(maniProduct));
         display();
}



//search

function searchProduct(term){
   var cartona = ``;
   for(var i=0;i<maniProduct.length;i++)
   {

      if(maniProduct[i].name.toLowerCase().includes(term.toLowerCase())){
         cartona=`   
         <tr>
         <td>${i}</td>
         <td>${maniProduct[i].name}</td>
         <td>${maniProduct[i].price}</td>
         <td>${maniProduct[i].category}</td>
         <td>${maniProduct[i].desc}</td>
         <td><button onclick="updateProduct(${i})" class="btn btn-outline-warning">update</button></td>
         <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">delete</button></td>
         </tr>
         `

      }
   }
   tBody.innerHTML=cartona;

}

//validation

function validateProduct(){
   var regexName=/^[A-Z][a-z]{2,5}$/;
   var regexPrice=/(^[1-9][0-9]{3}|10000)$/;
   var regexCategory =/(mobile|tv|laptop)$/;
   var regexDesc=/^[a-z]{4}$/;
  
   if(regexName.test(productName.value)==true && 
   regexPrice.test(productPrice.value) && 
   regexCategory.test(productCategory.value) &&
    regexDesc.test(productDesc.value)){
       
       return true;
   }
   else {
      
       if(regexName.test(productName.value)==false){
             flag=productNameError;
            
       }
       
       else if( regexPrice.test(productPrice.value) ==false){
           flag=productPriceError;
          
       }
       else if( regexCategory.test(productCategory.value) ==false){
           flag=productCategoryError;
          
       }
     
       else if( regexDesc.test(productDesc.value) ==false){
           flag=productDescError;
        
       }
       
       return false;
   }
   //price
   //category
   //desc
}
   
