// Constants & Variables
const annoucementMsg = document.querySelector(".annoucement-msg")
const leftArrow = document.querySelector(".left-arrow-container")
const rightArrow = document.querySelector(".right-arrow-container")


// [ 1 ] Annoucement-bar
const annoucementMsgList = [
    "Exclusive T-Shirts, shipping starting 10 days post-order.",
    "Prepaid Orders dispatch within 48 hours"
]

let msgCounter = 0
let clicked = false

function checkNoClick() {
    if(!clicked) {
        // console.log("No Click Detected");
    }

    clicked = false
    setTimeout(checkNoClick, 1000)
}

checkNoClick()

setInterval(() => {
    if(!clicked) {
        if(msgCounter < annoucementMsgList.length) {
            annoucementMsg.innerText = annoucementMsgList[msgCounter ? msgCounter-1 : msgCounter+1]
            msgCounter++
        }
    
        if(msgCounter >= annoucementMsgList.length) {
            msgCounter = 0
        }
    }
}, 1000);

function arrowClick() {
    clicked = true
    if(clicked) {
        if(msgCounter == 0) {
            annoucementMsg.innerText = annoucementMsgList[1]
            msgCounter++
        }
        else if(msgCounter == 1) {
            annoucementMsg.innerText = annoucementMsgList[0]
            msgCounter--
        } 
    }
}

leftArrow.addEventListener("click", arrowClick)
rightArrow.addEventListener("click", arrowClick)


// [ 2 ] Slide-Bar
const hamburgerMenu = document.querySelector(".nav-left-side .menu")
const slideBar = document.querySelector("aside")
const slideBarCloseBtn = document.querySelector(".close-btn")
const heroSection = document.querySelector(".hero-section")

hamburgerMenu.addEventListener("click", () => {
    slideBar.classList.add("aside-active")
})

slideBarCloseBtn.addEventListener("click", (e) => {
    closeSlideBar()
})

function closeSlideBar() {
    slideBar.classList.remove("aside-active")
}

slideBar.addEventListener("click", (e) => {
    e.stopPropagation()
})

document.addEventListener("click", (e) => {
    if(!slideBar.contains(e.target) && !hamburgerMenu.contains(e.target)) {
        closeSlideBar()
    }
})


// [ 3 ] Product-Cards
const body = document.querySelector("body")
const cartEle = document.querySelector("#cart-number")

// Data Fetching
const getUsers = () => JSON.parse(localStorage.getItem("users")) || []
const getLoggedInUser = () => JSON.parse(sessionStorage.getItem("loggedInUser"))


// Data Showing
const loggedInUser = getLoggedInUser()
cartEle.innerText = loggedInUser?.cartNumber || "0"

// Section-Creation
const productCardSection = document.querySelector(".product-cards-section")
const productCards = document.querySelector(".product-cards")
const productCards2 = document.querySelector(".product-cards2")

fetch("products.json")
    .then((response) => response.json())
    .then((productsData) => {
        productsData.tShirts.forEach((item) => {

            productCards.innerHTML += `
                    <div class="card" id="${item.id}">
                    <div class="card-image-container"><img src="${item.productImage}" alt="Tshirts"></div>
                    <h2 class="product-name">${item.productName}</h2>
                    <div class="product-price-element">
                        <span class="product-price">${item.productPrice}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="product-actual-price">${item.productActualPrice}</span>
                    </div>
                    <div class="product-stock-element">
                        <span class="product-property">Total Stock Available :</span>&nbsp;&nbsp;
                        <span class="product-stock">${item.productAvailableQty}</span>
                    </div>
                    <div class="product-quantity-element">
                        <div class="product-property">Quantity(pieces)</div>&nbsp;&nbsp;&nbsp;
                        <div class="quantity-element">
                            <button class="cart-increment">+</button>
                            <p class="product-quantity">1</p>
                            <button class="cart-decrement">-</button>
                        </div>
                    </div>
                    <span class="add-to-cart-button">
                        <i class="fa-solid fa-cart-shopping"></i>&nbsp;&nbsp;
                        Add To Cart
                    </span>
                </div>`
        })

        productsData.jackets.forEach((item) => {

            productCards2.innerHTML += `<div class="card" id="${item.id}">
                    <div class="card-image-container"><img src="${item.productImage}" alt="Tshirts"></div>
                    <h2 class="product-name">${item.productName}</h2>
                    <div class="product-price-element">
                        <span class="product-price">${item.productPrice}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="product-actual-price">${item.productActualPrice}</span>
                    </div>
                    <div class="product-stock-element">
                        <span class="product-property">Total Stock Available :</span>&nbsp;&nbsp;
                        <span class="product-stock">${item.productAvailableQty}</span>
                    </div>
                    <div class="product-quantity-element">
                        <div class="product-property">Quantity(pieces)</div>&nbsp;&nbsp;&nbsp;
                        <div class="quantity-element">
                            <button class="cart-increment">+</button>
                            <p class="product-quantity">1</p>
                            <button class="cart-decrement">-</button>
                        </div>
                    </div>
                    <span class="add-to-cart-button">
                        <i class="fa-solid fa-cart-shopping"></i>&nbsp;&nbsp;
                        Add To Cart
                    </span>
                </div>`
        })
    })


productCardSection.addEventListener("click", (e) => {
    let target = e.target
    let productId = target.parentElement.id

    // qty-increment-feature
    if(target.classList.contains("cart-increment")) {
        let productQtyEle = target.parentElement.querySelector(".product-quantity")
        productQtyEle.innerText = parseInt(productQtyEle.innerText) + 1
    }

    // qty-decrement-feature
    if(target.classList.contains("cart-decrement")) {
        let productQtyEle = target.parentElement.querySelector(".product-quantity")
        if(productQtyEle.innerText > 1) {
            productQtyEle.innerText = parseInt(productQtyEle.innerText) - 1 
        }
    }


    // add-to-cart-feature
    if(target.classList.contains("add-to-cart-button")) {

        const users = getUsers()
        const loggedInUser = getLoggedInUser()

        if(!loggedInUser) {
            alert("Please login for add Products to your cart")
        }

        if(!users) {
           alert("No User Data Found please try again") 
           return
        }

        const userIndex = users.findIndex((user) => user.username == loggedInUser.username)


        if(loggedInUser.cart.some((item) => item.id == productId)) {
            target.classList.add("added")
        }

        if(!target.classList.contains("added")) {
            cartEle.innerText = parseInt(cartEle.innerText) + 1
            loggedInUser.cartNumber = cartEle.innerText
            sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser))

            users[userIndex].cartNumber = loggedInUser.cartNumber
            localStorage.setItem("users", JSON.stringify(users))

            

            let popupMsg = document.createElement("p")
            popupMsg.innerText = `Product with ID ${target.parentElement.id} has been added.`
            popupMsg.classList.add("popup-msg")
            body.append(popupMsg)
            setTimeout(() => {
                popupMsg.classList.add("active")
            }, 10)
            setTimeout(() => {
                popupMsg.classList.remove("active")
            }, 1500)

            let newProduct = {
                id: target.parentElement.id,
                productName: target.parentElement.querySelector(".product-name").innerText,
                productImage: target.parentElement.querySelector("img").src,
                productPrice: target.parentElement.querySelector(".product-price").innerText,
                productQuantity: target.parentElement.querySelector(".product-quantity").innerText,
                productTotal: `${target.parentElement.querySelector(".product-price").innerText.replace(/[₹,\s]/g, "") * target.parentElement.querySelector(".product-quantity").innerText}`
            }
    
            loggedInUser.cart.push(newProduct)
            sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser))

            users[userIndex].cart = loggedInUser.cart
            localStorage.setItem("users", JSON.stringify(users))
    
            target.classList.add("added")
        }
    }
})


// Slide Bar User-name
const slideBarHeading = document.querySelector(".slide-bar-heading span")
slideBarHeading.innerText = `${loggedInUser ? `Hello, ${loggedInUser.username}` : "User"}`

// Nav-Bar User-name
const navBarUsername = document.querySelector(".nav-right-side #user-name")
navBarUsername.innerText = `${loggedInUser ? `${loggedInUser.username}` : ""}`

// [ 4 ] Logout Feature
const logoutBtn = document.querySelector(".slide-logout a")

logoutBtn.addEventListener("click", (e) => {
    e.preventDefault()

    let logout = confirm("Are you sure you want to logout")
    if(logout) {
        sessionStorage.clear()
        window.location.href = "index.html"
    }
})