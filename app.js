const callapi = async () => {
    const response = await fetch("http://127.0.0.1:3000/movies/", {
        method : 'POST',
        body : JSON.stringify({
            title : "new movie",
            poster : "new movie poster",
            trailer : "no trailver",
            release_date : new Date(),
            description : "al;sfdl;askjdfl;askjfl;askdjfla;skjfd",
            userRating  : 0,
            adminRating : 0,
            lang : "ar",
        }),
        headers : {
            'Content-Type': 'application/json',
            Authorization : 'ADMIN R100'
        }
    })
    return response
}

callapi()