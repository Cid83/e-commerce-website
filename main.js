const categoryList = document.querySelector(".categories")
const productList = document.querySelector(".products")
const modal = document.querySelector(".modal-wrapper ")
const openBtn = document.querySelector("#open-btn")
const closeBtn = document.querySelector("#close-btn")
const modalList = document.querySelector(".modal-list")
const modalInfo = document.querySelector("#modal-info")



document.addEventListener("DOMContentLoaded",()=>{
    fetchCategories()
    fetchProduct()
})

function fetchCategories(){

    // veri çekme isteği atma

    fetch("https://api.escuelajs.co/api/v1/categories")

    // gelen veriyi işleme

    .then((res)=>res.json())

    // işlenen veriyi foreach ile kestiğimiz 4 obje için ekrana basma

    .then((data)=>data.slice(0,4).forEach((category) => {
        
        // console.log(category)
    
 // gelen herbir obje için div oluşturma

       const categoryDiv= document.createElement("div")
    //    dive class ekleme
        categoryDiv.classList.add("category")
    // divin içeriğini değiştirme
        categoryDiv.innerHTML =`
       
            <img src="${category.image}"/>
            <span>${category.name}</span>
    `
    // oluşan divi htmldeki listeye atama

    categoryList.appendChild(categoryDiv)

    })
    )
}

// ürünleri çekme

function fetchProduct(){
    fetch("https://api.escuelajs.co/api/v1/products")

    .then((res)=>res.json())

    .then((data)=>data.slice(0,25).forEach((item) => {
        const productDiv=document.createElement("div")

        productDiv.classList.add("product")

        productDiv.innerHTML=`
                 <img src="${item.images[1]}" >
                 <p>${item.title}</p>
                 <p>${item.category.name}</p>

                 <div class="product-action">
                    <p>${item.price} $</p>
                    <button onclick="addToBasket({id:${item.id},title:'${item.title}',price:${item.price},img:'${item.images[0]}', amount:1})">Add to Cart</button>
                 </div>
        
        `
        productList.appendChild(productDiv)
       
    })
    )
}

// sepet 

let basket= []
let total = 0

// sepete ekleme
function addToBasket(product) {
  // sepette parametere olarak gelen eremanı arar
  const foundItem = basket.find((basketItem) => basketItem.id === product.id);

  if (foundItem) {
    // eğer elemandan varsa bulunan elmanın miktarını arttır
    foundItem.amount++;
  } else {
    // eğer elemandan sepette bulunmadıysa sepete ekle
    basket.push(product);
  }
}

// açma ve kapatma

openBtn.addEventListener("click",()=>{
    modal.classList.add("active")

    // sepetin içine ürünleri listeleme
    addList()
    // toplam bilgisini güncelleme
    modalInfo.innerHTML =total

})

closeBtn.addEventListener("click",()=>{
    modal.classList.remove("active")
    addList()
// sepeti kapatınca içini temizleme
    modalList.innerHTML = " "
    // toplam değerini sıfırlama
    total = 0

})

// sepete listeleme

function addList(){
  basket.forEach((product)=>{

    // console.log(product)
    // sepetteki herbir ürünün yapısını oluşturma
   const listItem = document.createElement("div")

  //  class ekleme

   listItem.classList.add("list-item")

  //  içerğini değiştir
    listItem.innerHTML=`
           <img src="${product.img}" alt="">
           <h2>${product.title}</h2>
           <h2 class="price">${product.price}  $</h2>
           <p>Amount: ${product.amount}</p>
           <button id="del" onclick="deleteItem({id:${product.id},price:${product.price} ,amount:${product.amount}})">Delete</button>
  
   `

  //  elemanı listeye gönderme

  modalList.appendChild(listItem)

  // toplam değişkenini güncelleme
  total += product.price * product.amount
        
  })
}

// sepetten silme fonksiyonu
function deleteItem(deletingItem){
  basket = basket.filter((i)=> i.id !==deletingItem.id)
  // silinen elemanın fiyatını total çıkarma
  total -= deletingItem.price*deletingItem.amount

  modalInfo.innerText=total
}
// silinen elemanı html den kaldırma
modalList.addEventListener("click",(e)=>{
  if(e.target.id==="del"){
    e.target.parentElement.remove()
  }
})


// eğer dışarıya tıklanırsa kapatma
modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-wrapper')) {
      modal.classList.remove('active');
    }
  });



