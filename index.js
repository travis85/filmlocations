import fetch from 'node-fetch' //MUST DOWNLOAD FOR NODE TO USE HTTP REQUEST FECTH FUNCTION

//TITLE
fetch('https://data.sfgov.org/resource/yitu-d5am.json?title=A Jitney Elopement') //API CALL
    .then((response) => response.json()) //TURNING RESPONSE TO A JSON() FILE
    .then((posts) => { // USING POST TO DESCRIBE DATA
        posts.forEach( post => { //LOOPING THRU DATA TO SET EACH AS ITS OWN FILE IN FIRESTORE
        console.log(post)
    });
})

//LOCATIONS
fetch('https://data.sfgov.org/resource/yitu-d5am.json?release_year=1915') //API CALL
    .then((response) => response.json()) //TURNING RESPONSE TO A JSON() FILE
    .then((posts) => { // USING POST TO DESCRIBE DATA
        posts.forEach( post => { //LOOPING THRU DATA TO SET EACH AS ITS OWN FILE IN FIRESTORE
        console.log(post)
    });
})
