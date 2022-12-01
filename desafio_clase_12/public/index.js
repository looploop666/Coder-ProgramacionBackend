const socket = io();

function addProduct() {
    const product = {
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value,
    };
    socket.emit("newProduct", product);
}

function addMessage() {
    const message = {
        email: document.getElementById("email").value,
        ddhh: new Date().toLocaleString(),
        message: document.getElementById("message").value
    };
    socket.emit("newMessage", message);
}

function renderProducts(table, products) {
    document.getElementById("products-table_body").innerHTML = "";
    products.forEach(element => {
        let row = table.insertRow();
        row.insertCell().innerHTML = element.title;
        row.insertCell().innerHTML = element.price;
        row.insertCell().innerHTML = `<img class="img-fluid img-thumbnail" alt="${element.title}" src="${element.thumbnail}" width="50px">`;
    });
}

function renderMessages(messages) {
    const messagesDiv = messages.map(message => {
        return `
        <span style="color: blue">${message.email}</span>
        <span style="color: brown">[${message.ddhh}] : </span>
        <span style="color: green">${message.message}</span><br>`
    }).join(" ")
    document.getElementById("all-messages").innerHTML = messagesDiv;
}


socket.on("products", (data) => {
    if (data) {
        const products = document.getElementById("products-table_body");
        renderProducts(products, data);
    } else {
        document.getElementById("products-table_div").innerHTML = `<h3 class="alert alert-danger">No se encontraron productos!</h3>`
    }
});

socket.on("messages", data => {
    renderMessages(data);
});







