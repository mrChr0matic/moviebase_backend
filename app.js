async function temp(){
    const res = await fetch("http://localhost:3000/movies/", 
    { 
        body : {
            "searchType" : "title",
            "searchItem" : "GOT",
        },
        headers : {
            "Authorization" : "USER 1231231231"
        }

    }
   )
   console.log(res);

}
temp();