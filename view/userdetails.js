let tbody=document.querySelector("tbody");
let page=1;
let url="http://localhost:3000/user/read/?page=5"
window.onload=async()=>{
    fetch_data(page);
}


async function fetch_data(page){
    let res=await fetch(url);
    let data=await res.json();
    console.log(data)
    display(data.data,data.page_num)
}


function display(data,pages){
        display_button(pages);

    }



  function display_button(pages){
    
  }  