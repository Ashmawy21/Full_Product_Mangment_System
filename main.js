let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let count = document.getElementById('count');
let mood = 'create';
let tmp ;
//get total
function getTotal() {
if(price.value !=''){
    let result = ( +price.value + +taxes.value+ +ads.value) - +discount.value;
    total.innerHTML =result;
    total.style.background='#040';
    
}
else{
    total.innerHTML = '';
    total.style.background='rgb(255,0,0)';
    }
}

// create product
let dataPro = [];
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
    showData();
}


submit.onclick = function() {
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        category:category.value.toLowerCase(),
        count:count.value,
    };
    //save product
    if(title.value !=''
    && price.value !=''
    && category.value!=''){
        if(mood === 'create'){
            if(newPro.count > 1){
                for( let i =0; i < newPro.count; i++){
                    dataPro.push(newPro);
                }
            }
            else{
                dataPro.push(newPro);
            }
            clearData();
        }
        else{
                dataPro[tmp]=newPro;
                mood= 'create';
                submit.innerHTML = 'Create';
                count.style.display= 'block';
        }
    }
    localStorage.setItem('product', JSON.stringify(dataPro));
    showData();
}
//clear inputs
function clearData(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
    title.value='';
}

//  read
function showData() {
    let table = '';
    for (let index = 0; index < dataPro.length; index++) {
        table += `
        <tr>
        <td>${index+1}</td>
        <td>${dataPro[index].title}</td>
        <td>${dataPro[index].price}</td>
        <td>${dataPro[index].taxes}</td>
        <td>${dataPro[index].ads}</td>
        <td>${dataPro[index].discount}</td>
        <td>${dataPro[index].total}</td>
        <td>${dataPro[index].category}</td>
        <td><button onclick=' updateData(${index})' id="update">update</button></td>
        <td><button onclick=' deleteData(${index})' id="delete">delete</button></td>
        </tr>
        `
        getTotal()
    }
    
            document.getElementById('tbody').innerHTML = table;
            let btnDelete = document.getElementById('deleteAll');
                if(dataPro.length > 0){
                    btnDelete.innerHTML=`
                    <button onclick="deleteAll()">delete all (${dataPro.length})</button>`
                    }
                    else{
                        btnDelete.innerHTML=``
                    }

}


// delete
function deleteData(index) {
        dataPro.splice(index,1)
        localStorage.product = JSON.stringify(dataPro);
        showData()
}

// deleteAll

function deleteAll() {
    localStorage.clear();
    dataPro=[];
    showData();
}

//update
function updateData(index) {
    title.value = dataPro[index].title;
    price.value = dataPro[index].price;
    taxes.value = dataPro[index].taxes;
    ads.value = dataPro[index].ads;
    discount.value = dataPro[index].discount;
    category.value = dataPro[index].category;
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[index].category;
    submit.innerHTML = 'update'
    mood = 'update'
    tmp=index;
    scroll({
        top:0,
        behavior: 'smooth',
    })
}


//search

let searchMood = 'title';

function getSearchMood(id) {
let search = document.getElementById('search')

if(id == 'searchTitle'){
    searchMood= 'title';
}
else{
    searchMood = 'category';
}
search.placeholder= 'Search By ' + searchMood;

    search.focus()
    search.value= ''
    showData()
}
function searchData(value) {
    let table = '';
    value = value.toLowerCase();
    for (let index = 0; index < dataPro.length;index++) {
if (searchMood == 'title') {

if (dataPro[index].title.includes(value)) {
    table += `
    <tr>
    <td>${index+1}</td>
    <td>${dataPro[index].title}</td>
    <td>${dataPro[index].price}</td>
    <td>${dataPro[index].taxes}</td>
    <td>${dataPro[index].ads}</td>
    <td>${dataPro[index].discount}</td>
    <td>${dataPro[index].total}</td>
    <td>${dataPro[index].category}</td>
    <td><button onclick=' updateData(${index})' id="update">update</button></td>
    <td><button onclick=' deleteData(${index})' id="delete">delete</button></td>
    </tr>
    `;
    
}    
}

if (searchMood == 'category') { 
        if (dataPro[index].category.includes(value)) {
            table += `
            <tr>
            <td>${index+1}</td>
            <td>${dataPro[index].title}</td>
            <td>${dataPro[index].price}</td>
            <td>${dataPro[index].taxes}</td>
            <td>${dataPro[index].ads}</td>
            <td>${dataPro[index].discount}</td>
            <td>${dataPro[index].total}</td>
            <td>${dataPro[index].category}</td>
            <td><button onclick=' updateData(${index})' id="update">update</button></td>
            <td><button onclick=' deleteData(${index})' id="delete">delete</button></td>
            </tr>
            `;
            
        }   
        }

document.getElementById('tbody').innerHTML = table;

}
}


//clean Data

