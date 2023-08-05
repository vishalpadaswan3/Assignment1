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
    alert("50 users are fetched");
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
        alert("There is not user avilable");
       }else {
        alert("All users are deleted");
       }
    }else {
        alert("try again later");
    }
        
    } catch (error) {
        console.log("error");
    }
    })