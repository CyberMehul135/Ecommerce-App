// [ 1 ] Annoucement-bar
const annoucementMsg = document.querySelector(".annoucement-msg")
const leftArrow = document.querySelector(".left-arrow-container")
const rightArrow = document.querySelector(".right-arrow-container")

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

// [ 2 ] Nav-Bar
const navBar = document.querySelector("nav")
const navLeftSide = document.querySelectorAll(".nav-left-side a, .menu")
const navrightSide = document.querySelectorAll(".nav-right-side a")


window.addEventListener("scroll", () => {
    if(window.scrollY > 50) {
        navBar.classList.add("nav-active")
        navLeftSide.forEach((element) => {
            element.style.color = "black"
        })
        navrightSide.forEach((element) => {
            element.style.color = "black"
        })
    }
    else {
        navBar.classList.remove("nav-active")
        navLeftSide.forEach((element) => {
            element.style.color = "white"
        })
        navrightSide.forEach((element) => {
            element.style.color = "white"
        })
    }
})


// [ 3 ] Slide-Bar
const hamburgerMenu = document.querySelector(".nav-left-side .menu")
const slideBar = document.querySelector("aside")
const slideBarCloseBtn = document.querySelector(".close-btn")
const heroSection = document.querySelector(".hero-section")

hamburgerMenu.addEventListener("click", () => {
    slideBar.classList.add("aside-active")
    heroSection.style.opacity = 0.5
})

slideBarCloseBtn.addEventListener("click", (e) => {
    closeSlideBar()
})

function closeSlideBar() {
    slideBar.classList.remove("aside-active")
    heroSection.style.opacity = 1
}

slideBar.addEventListener("click", (e) => {
    e.stopPropagation()
})

document.addEventListener("click", (e) => {
    if(!slideBar.contains(e.target) && !hamburgerMenu.contains(e.target)) {
        closeSlideBar()
    }
}) 


// [ 4 ] Main-Content

// (1) Hero-section 
function updateImage() {
    const heroImage = document.querySelector(".hero-section-img")
    if(heroImage.width <= 1071) {
        heroImage.src = "./images/hero-section-2-2.png"
    }
    else {
        heroImage.src = "./images/hero-section-2.png"
    }
}

window.addEventListener("load", updateImage)
window.addEventListener("resize", updateImage)


// (2) Colection-section
const gallary = document.querySelector(".gallery")
const backbtn = document.querySelector("#back-btn")
const nextbtn = document.querySelector("#next-btn")

gallary.addEventListener("wheel", (e) => {
    e.preventDefault()
    gallary.style.scrollBehavior = "auto"
    gallary.scrollLeft = gallary.scrollLeft + e.deltaY  
})

backbtn.addEventListener("click", (e) => {
    gallary.style.scrollBehavior = "smooth"
    gallary.scrollLeft += 990
})

nextbtn.addEventListener("click", (e) => {
    gallary.style.scrollBehavior = "smooth"
    gallary.scrollLeft -= 990
})


// (3) Product-Card-Section

// (I) Creating Cards-section with "products.json"
const cardsContainer = document.querySelector(".product-cards")

fetch("products.json")
    .then((response) => response.json())
    .then((products) => {
        products.jackets.forEach((item) => {
            cardsContainer.innerHTML += `<div class="card" id="${item.id}">
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

    
// (II) Quantity-element & Add-to-cart-element

// Data Fetching
const getUsers = () => JSON.parse(localStorage.getItem("users")) || []
const getLoggedInUser = () => JSON.parse(sessionStorage.getItem("loggedInUser"))


let cartNumberEle = document.querySelector("#cart-number")
const body = document.querySelector("body")


// Data-showing
const loggedInUser = getLoggedInUser()
cartNumberEle.innerText = loggedInUser?.cartNumber || "0"


cardsContainer.addEventListener("click", (e) => {
    const target = e.target
    // Quantity-element
    if(target.classList.contains("cart-increment")) {
        let quantity = target.parentElement.querySelector(".product-quantity")
        quantity.innerText = parseInt(quantity.innerText) + 1
    }

    if(target.classList.contains("cart-decrement")) {
        let quantity = target.parentElement.querySelector(".product-quantity")
        if(parseInt(quantity.innerText) > 1) {
            quantity.innerText = parseInt(quantity.innerText) - 1
        }
    }

    // Add-to-cart
    if(target.classList.contains("add-to-cart-button")) {
        let productId = target.parentElement.id

        const users = getUsers()
        const loggedInUser = getLoggedInUser()

        if(!loggedInUser) {
            alert("Please login to add items to the cart.")
        }

        const userIndex = users.findIndex((user) => user.username == loggedInUser.username)

        if(loggedInUser.cart.some((item) => item.id == productId)) {
            target.classList.add("added")
        }


        if(!target.classList.contains("added")) {
            cartNumberEle.innerText = parseInt(cartNumberEle.innerText) + 1
            loggedInUser.cartNumber = cartNumberEle.innerText
            sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser))

            if(users[userIndex]) {
                users[userIndex].cartNumber = loggedInUser.cartNumber
            }
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

            const newProduct = {
                id: target.parentElement.id,
                productName: target.parentElement.querySelector(".product-name").innerText,
                productImage: target.parentElement.querySelector("img").src,
                productPrice: target.parentElement.querySelector(".product-price").innerText,
                productQuantity: target.parentElement.querySelector(".product-quantity").innerText,
                productTotal: `${target.parentElement.querySelector(".product-price").innerText.replace(/[₹,\s]/g, "") * target.parentElement.querySelector(".product-quantity").innerText}` 
            }

        
            loggedInUser.cart.push(newProduct)
            sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser))

            if(users[userIndex]) {
                users[userIndex].cart = loggedInUser.cart
            }
            localStorage.setItem("users", JSON.stringify(users))

            target.classList.add("added")
        }
    }
})

// Slide-Bar User-name
const slideBarHeading = document.querySelector(".slide-bar-heading span")
slideBarHeading.innerText = `${loggedInUser ? `Hello, ${loggedInUser.username}` : "User"}`

// Nav-Bar User-name
const navBarUsername = document.querySelector(".nav-right-side #user-name")
navBarUsername.innerText = `${loggedInUser ? `hello ${loggedInUser.username}` : ""}`

// [ 5 ] Logout Feature
const logoutBtn = document.querySelector(".slide-logout a")

logoutBtn.addEventListener("click", (e) => {
    e.preventDefault()

    let logout = confirm("Are you sure you want to logout")
    if(logout) {
        sessionStorage.clear()
        window.location.href = "index.html"
    }
})