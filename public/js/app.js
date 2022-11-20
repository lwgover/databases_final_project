window.addEventListener("DOMContentLoaded", registerPostButtonListener);
//window.addEventListener("DOMContentLoaded", doSomeStuff);


// When the Post button is clicked, we send a POST request to the server
// using the route "/postButton". The POST request contains data that 
// we are sending along (whatever is typed in the input). The server
// responds by sending back a json object that contains a single 
// piece of text: "You did it!"
function registerPostButtonListener() {
    let button = document.querySelector("#post_button");
    button.addEventListener("click", async function () {
        let input = document.querySelector("input");
        let url = "/postButton"
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                typedText: input.value
            })
        });
        let result = await response.json();
        input.value = result.text;
    });
}

// This is manipulating the DOM
// function doSomeStuff() {
//     setTimeout(() => {
//         let image = document.querySelector("img");
//         image.src = "/img/eggs.jpg";
//     }, 3000);

//     setTimeout(() => {
//         let h1 = document.querySelector("h1");
//         h1.style.border = '1px solid cyan';
//     }, 3000)
//     setTimeout(() => {
//         let newP = document.createElement("p");
//         newP.innerText = "Hello world! I've been born!";
//         let body = document.querySelector("body");
//         body.appendChild(newP);

//     }, 3000);
// }

