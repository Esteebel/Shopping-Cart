const foodMenu = [
    {
        foodName: "Jollof rice with Chicken", price: 20, location: "Lagos"
    },

    {
        foodName: "Chinese rice with Turkey", price: 30, location: "Lagos"
        
    },
    {
        foodName: "Amala with Abula",price: 15, location: "Ibadan"
        
    },
    {
        foodName: "Chinese rice with Turkey", price: 40, location: "Abuja"
        
    },
    {
        foodName: "starch with Banga",price: 20, location: "Delta"
    },
    {
        foodName: "Akpu with ofensala",price: 15, location: "Owerri"
    }
];

let foodOption = document.getElementById("foodie");
let foodOption2 = document.getElementById("opt1");
let priceOption = document.getElementById("price");
let locationOption = document.getElementById("location");
let priceOption1 = document.getElementById("price1");
let locationOption1 = document.getElementById("location1");
let greetOption = document.getElementById("greet");
let tableOption = document.getElementById("myTable");
let myModal = document.getElementById('myModal');
let printItem =[];
let UpdateModal = "";
let Quantity = document.getElementById("quantity")
let myTotal = document.getElementById("total")


let usersData = JSON.parse(localStorage.getItem('authUser'));
greetOption.innerHTML = usersData.name;

for (let i = 0; i < foodMenu.length; i++){
    foodOption.innerHTML += `<option = "${foodMenu[i].foodName}">${foodMenu[i].foodName}</option>`
    foodOption2.innerHTML += `<option = "${foodMenu[i].foodName}">${foodMenu[i].foodName}</option>`
}
function getPrice(event){
    let price=''
    let location=''
    for (let i = 0; i < foodMenu.length; i++) {
        if(foodMenu[i].foodName === event.target.value){
           price = foodMenu[i].price
           location = foodMenu[i].location
        }
        
    }
    locationOption.value = location
    priceOption.value = price
}

function addButton(){
    let duplicateStatus = false
    if (foodOption.value ==""){
        return alert('please select an option')
    }

    for (let i = 0; i < printItem.length; i++) {
        if(foodOption.value == printItem[i].item){
            duplicateStatus = true;
        }
    }
    // console.log(printItem)

    if(duplicateStatus){
        alert('duplicate entry')
    }
    else{
        printItem.push({
            foodItem: foodOption.value,
            price: priceOption.value,
            location: locationOption.value,
            // myQuantity: Quantity.value
        })

        let storage = {
            id: Math.floor(Math.random() * 100000),
            foodItem: foodOption.value,
            price: priceOption.value,
            location: locationOption.value,
            myQuantity: Number(1)
        }

        if(localStorage.getItem('mykitcken')=== null){
            holder = []
        } else{
            holder = JSON.parse(localStorage.getItem('mykitcken'))
        }
        holder.push(storage)
        localStorage.setItem('mykitcken', JSON.stringify(holder))
    }
    tableOpt()
}
tableOpt()


function tableOpt() {
    let datas = JSON.parse(localStorage.getItem("mykitcken"));
     tableOption.innerHTML = "";
      let totalValue = 0;
      for (let index = 0; index < datas.length; index++) {
        tableOption.innerHTML += 
        `<tr>
        <td style="padding-left: 0;">${[index + 1]}</td>
        <td style="padding-left: 20px;">${datas[index].foodItem}</td>
        <td style="padding-left: 50px;">${datas[index].price}</td>
        <td style="padding-left: 50px;">${datas[index].location}</td>
        <td style="padding-left: 20px;">
        <button onclick="decrement(${datas[index].id})">-</button>
            <span> ${datas[index].myQuantity} </span>
        <button onclick="increment(${datas[index].id})">+</button>
           
        </td>

        <td>
            <span><i class="fas fa-trash" onclick="deleteItem(${index})"></i></span>
            <i class="fas fa-pen" arial-hidden="true"  onclick="toModal(${datas[index].id})"  data-toggle="modal" data-target="#exampleModal"></i>
        </td>
        </tr>`
        totalValue += parseInt(datas[index].price) * parseInt(datas[index].myQuantity);
    }
    myTotal.value = totalValue
    localStorage.setItem('total', JSON.stringify(totalValue))
}
tableOpt()


function deleteItem(ind){
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            let cartData = JSON.parse(localStorage.getItem('mykitcken'));
            if(cartData){
                cartData.splice(ind,1);
                localStorage.setItem('mykitcken', JSON.stringify(cartData))
            }
          tableOpt()

            swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
            tableOpt()
          swal("Your imaginary file is safe!");
        }
      });
}

function getPrice2(event){
    let price2=''
    let location2=''
    for (let i = 0; i < foodMenu.length; i++) {
        if(foodMenu[i].foodName === event.target.value){
           price2 = foodMenu[i].price
           location2 = foodMenu[i].location
        }
        
    }
    locationOption1.value = location2
    priceOption1.value = price2
}

function toModal(dataModal){
    UpdateModal = dataModal
    let cartData = JSON.parse(localStorage.getItem('mykitcken'));

    let obj = {}
    for (let index = 0; index < cartData.length; index++) {
        if(dataModal==cartData[index].id){
            obj = cartData[index]
        }
    }
    foodOption2.value = obj.foodItem;
    locationOption1.value = obj.location;
    priceOption1.value = obj.price

    localStorage.setItem('updateKitchen', JSON.stringify(cartData))

}

function update(){
    let cartData = JSON.parse(localStorage.getItem('mykitcken'))

    if(foodOption2.value ==""){
        return alert('please select an item')
    }
    else{
        for (let index = 0; index < cartData.length; index++) {
            if(cartData[index].id == UpdateModal){
                cartData[index].foodItem = foodOption2.value
                cartData[index].price = priceOption1.value
                cartData[index].location = locationOption1.value
            }
        }
    }

    localStorage.setItem('mykitcken', JSON.stringify(cartData))
    tableOpt()
}

function increment(ind){
    // return console.log(ind);
    let cart = JSON.parse(localStorage.getItem('mykitcken'));
    cart.forEach(element => {
        if (element.id == ind) {
            element.myQuantity++;
            element.myTotal = element.price * Element.Quantity
            // console.log(element.myQuantity);
            // let actualPrice = foodMenu.find(item=>element.foodName == element.foodName).price
            // element.price = Number(element.price) + Number(actualPrice)
        }
    });
     localStorage.setItem('mykitcken', JSON.stringify(cart))
    tableOpt()
}

function decrement(ind){
    // return console.log(ind);
    let cart = JSON.parse(localStorage.getItem('mykitcken'));
    cart.forEach(element => {
        if (element.id == ind && element.myQuantity > 1) {
            element.myQuantity--;
            element.myTotal = (element.price * Element.Quantity) - element.price
            // console.log(element.myQuantity);
            // let actualPrice = foodMenu.find(item=>element.foodName == element.foodName).price
            // element.price -= Number(actualPrice)
        }
    });
     localStorage.setItem('mykitcken', JSON.stringify(cart))
    tableOpt()
}

