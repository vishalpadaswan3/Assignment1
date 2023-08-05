let delete_button=document.getElementById("delete_button");
let fetch_button=document.getElementById("fetch_button");
let users_details=document.getElementById("users_details");
let loading=false;
let url="http://localhost:3000/user/"

fetch_button.addEventListener("click",async()=>{
try {
    loading=true
 let res =await fetch(url);
    console.log(loading,res);
    loading=false;
} catch (error) {
    console.log(error);
}
})
delete_button.addEventListener("click",async()=>{
    try {
        if(!loading){
 await fetch(url,{
        method:"DELETE"
       });
    }else {
        alert("try again later");
    }
        
    } catch (error) {
        console.log("error");
    }
    })