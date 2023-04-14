const main = document.querySelector(".main");
const btnFirst = document.querySelector(".first");
const btnSecond = document.querySelector(".second");
const btnThird = document.querySelector(".third");
const input = document.querySelector(".input input");
const circles = document.querySelector(".circles");

let data = [];
let x=0;
let y=10;

 function appendNewProduct(img,title,description,rating,brand,price,category) {  
    
    const im = document.createElement("img");
    im.classList.add("img");
    const tit = document.createElement("h1");
    tit.classList.add("h1");
    const des = document.createElement("p");
    des.classList.add("p");
    const pri = document.createElement("p");
    pri.classList.add("price");

    const rating1 = document.createElement("div");
    rating1.classList.add("rating");
    const rat = document.createElement("p");
    rat.classList.add("rat");
    const icon = document.createElement("img");
    icon.classList.add("icon");
    icon.src = "images.jfif";
    
    rating1.appendChild(rat);
    rating1.appendChild(icon);

    im.src = img;
    tit.innerText = `${title}  (${category})  (${brand})`;
    des.innerText =description ;
    rat.innerText = rating;
    pri.innerText = `${price}$`;
  
    let div = document.createElement("div");
    div.classList.add("card");

    const btnAdd = document.createElement("button");
    btnAdd.innerText= "Add to cart";
    btnAdd.classList.add("buy");

    const btnBuy = document.createElement("button");
    btnBuy.innerText= "Buy now";
    btnBuy.classList.add("buy");

    const buyDiv = document.createElement("div")
    buyDiv.classList.add("buydiv");

    buyDiv.appendChild(pri);
    buyDiv.appendChild(btnAdd);
    buyDiv.appendChild(btnBuy);
    

    div.appendChild(rating1);
    div.appendChild(im);
    div.appendChild(tit);
    div.appendChild(des);
    div.appendChild(buyDiv);
    main.appendChild(div);
    
  };
  

async function fetchProuduct() {
    await fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((res) => (data=res.products));
}

async function add1(x,y) {
  for (let i = x; i < y; i++) {  
    const item = data[i];
    await fetchProuduct();
    appendNewProduct(item.images[0] , item.title , item.description , item.rating , item.brand , item.price , item.category); 
}
}

async function ten(x,y) {
  await fetchProuduct(); 
  add1(x,y);
}

ten(x=0,y=10);


btnFirst.addEventListener('click' , () => {
  main.innerHTML = "";
  x = 0;
  y = 10;
  ten(x , y);
});

btnSecond.addEventListener('click' , () => {
    main.innerHTML = "";
    if( x == 0 & y == 10 )
    {
      x =x +10;
      y =y +10;
      ten(x , y);
      console.log("if1");
    } 
    if( x == 20 & y == 30 ){
      x =x -10;
      y =y -10;
      ten( x , y );
      console.log("if2");
    }
});



btnThird.addEventListener('click' , () => {
  main.innerHTML = "";
  if( x == 10 & y == 20 )
  {
    x =x + 10;
    y =y + 10;
    ten(x , y);
  } 
  if(x==0 & y==10){
    x = x + 20;
    y = y + 20;
    console.log("if32");
    ten( x , y );
  }
  
});


async function search() {
  main.innerHTML = "";
  circles.style.visibility = "hidden";
  const back = document.createElement("button");
  back.innerText="Back"
  back.classList.add("back");
  main.appendChild(back);
  back.addEventListener('click' ,  () =>{
    main.innerHTML ="";
    circles.style.visibility = "visible";
    ten(x = 0 , y = 10);
  });
  await fetchProuduct()
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const searchValue = input.value.toUpperCase();
    if(item.title.toUpperCase().indexOf(searchValue) > -1 || item.brand.toUpperCase().indexOf(searchValue) > -1 || item.category.toUpperCase().indexOf(searchValue) > -1){
      appendNewProduct(item.images[0] , item.title , item.description , item.rating , item.brand , item.price , item.category); 
    }
    
  }
  
}