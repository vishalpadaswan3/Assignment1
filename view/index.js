let delete_button=document.getElementById("delete_button");
let fetch_button=document.getElementById("fetch_button");
let users_details=document.getElementById("users_details");
let loading=false;
let url="https://cointab-bvef.onrender.com/user/"

fetch_button.addEventListener("click",async()=>{
try {
    loading=true
 let res =await fetch(url);
    console.log(loading,res);
    loading=false;
    alert("SUCCESS");
} catch (error) {
    console.log(error);
}
})
delete_button.addEventListener("click",async()=>{
    try {
        if(!loading && confirm("you want to delete the user?")){
        
let res= await fetch(url,{
        method:"DELETE"
       });
       let data=await res.json();
       if(data.msg=="no user"){
        alert("No user");
       }else {
        alert("Deleted SUCCESSFULLY");
       }
    }else {
        alert("ERROR");
    }
        
    } catch (error) {
        console.log("error");
    }
    })