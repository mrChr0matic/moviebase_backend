function temp(){
    fetch("http://localhost:3000/adminLogin?adminID=R100&password=root")
    .then(res=>res.json(),{
        body:{
            adminID:
        }
    })
    .then(res=>{
        console.log(res);
    })
    .catch(err=>{
        console.log("Err");
    })
}
temp();