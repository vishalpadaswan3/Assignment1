let tbody=document.querySelector("tbody");
let pagination=document.getElementById("pagination");
let search=document.getElementById("search");
let input=document.querySelector("input");

let page=1;
let page_max=5;
let url="https://cointab-bvef.onrender.com/user/read"
window.onload=async()=>{
    fetch_data(page);
}


async function fetch_data(pages){
    console.log(pages)
    if(pages<=0 || pages>5){
        alert("not possible")
    }else {
        page=pages;
    let res=await fetch(`${url}/?page=${pages}`);
    let data=await res.json();
    display(data.data,data.page_num)
    }
}


function display(data,pages){
    tbody.innerHTML="";
    console.log(pages)
    if(pages!=0) {
        display_button(pages);
    }else{
        pagination.innerHTML="";

    }
        for (let i =0 ; i < data.length; i++) {
            const rowData = data[i];
            const row = document.createElement('tr');
            const sn = document.createElement('td');
              sn.textContent = i+1;
              const first_name = document.createElement('td');
              first_name.textContent = rowData.first_name;

              const last_name = document.createElement('td');
              last_name.textContent = rowData.last_name;

              const user_name = document.createElement('td');
              user_name.textContent = rowData.user_name;

              const age = document.createElement('td');
              age.textContent = rowData.age;

              const email = document.createElement('td');
              email.textContent = rowData.email;

              const phone = document.createElement('td');
              phone.textContent = rowData.phone;

              const picture = document.createElement('td');
              const image =document.createElement('img');
              image.src=rowData.picture;
              picture.appendChild(image);
              row.append(sn,first_name,last_name,user_name,age,email,phone,picture);
              
            tbody.appendChild(row);
          }
    
    }



  function display_button(pages){
    pagination.innerHTML="";
    const pageButton = document.createElement('button');
        pageButton.textContent = "Prev";
        pageButton.addEventListener('click', () => fetch_data(page-1)); // Assuming 2 items per page
        pagination.appendChild(pageButton);
    for (let i = 1; i <= pages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => fetch_data(i)); // Assuming 2 items per page
        pagination.appendChild(pageButton);
      }
      const pageButton2 = document.createElement('button');
        pageButton2.textContent ="Next";
        pageButton2.addEventListener('click', () => fetch_data(page+1)); // Assuming 2 items per page
        pagination.appendChild(pageButton2);
  }  

search.addEventListener("click",async()=>{
let user_name=input.value;
try {
    let res=await fetch(`https://cointab-bvef.onrender.com/user/search/?username=${user_name}`);
    let data=await res.json();
    console.log(data)
    display(data.data,0);
} catch (error) {
    console.log("error");
}

})