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



// [ 4 ] Cart-data

// Data-fetching
const users = JSON.parse(localStorage.getItem("users")) || []
const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser")) 

// Data-showing
const cartNumber = document.querySelector("#cart-number")
cartNumber.innerText = loggedInUser.cartNumber



const mainContainer = document.querySelector(".main-container")
const addTocartDetails = document.querySelector(".add-to-cart-details")

loggedInUser.cart.forEach((oneProduct) => {
    mainContainer.append(addTocartDetails)
    
    addTocartDetails.innerHTML += `
            <div class="single-product" id="${oneProduct.id}">
                <div class="left-side">
                    <div class="product-image-container">
                        <img src="${oneProduct.productImage}" alt="tshirt">
                    </div>
                    <p class="product-name">${oneProduct.productName}</p>
                </div>
                <div class="right-side">
                    <div class="total-price">${Number(oneProduct.productTotal).toFixed(2)}</div>
                    <div class="plus-minus-btn">
                        <button class="plus-btn">+</button>
                        <div class="product-qty">${oneProduct.productQuantity}</div>
                        <button class="minus-btn">-</button>
                    </div>
                    <button class="remove-btn">Remove</button>
                </div>
            </div>`
    addTocartDetails.classList.add("add-to-cart-details-active")
})

const userIndex = users.findIndex((user) => user.username == loggedInUser.username)

addTocartDetails.addEventListener("click", (e) => {
    let target = e.target

    if(target.classList.contains("plus-btn")) {
        let productQtyEle = target.parentElement.querySelector(".product-qty")
        productQtyEle.innerText = parseInt(productQtyEle.innerText) + 1
        let productId = target.parentElement.parentElement.parentElement.id

        loggedInUser.cart = loggedInUser.cart.map((item) => {
            if(item.id == productId) {
                item.productQuantity = productQtyEle.innerText
                item.productTotal = `${productQtyEle.innerText * item.productPrice.replace(/[₹,\s]/g, "")}`

                target.parentElement.parentElement.querySelector(".total-price").innerText = Number(item.productTotal).toFixed(2)
            }
            return item
        })
        sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser))

        users[userIndex].cart = loggedInUser.cart
        localStorage.setItem("users", JSON.stringify(users))

        

        let subTotalEle = target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".sub-total")
        let taxEle = target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".tax")
        let finalTotalEle = target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".final-total")
        loggedInUser.cart.forEach((e) => {
            if(e.id == productId) {
                subTotalEle.innerText = (parseInt(subTotalEle.innerText) + parseInt(e.productPrice.replace(/[₹,\s]/g, ""))).toFixed(2)
                taxEle.innerText = (parseInt(subTotalEle.innerText) * 12 / 100).toFixed(2)
                finalTotalEle.innerText = (Number(subTotalEle.innerText) + Number(taxEle.innerText)).toFixed(2)
            }
        })
        
    }

    if(target.classList.contains("minus-btn")) {
        if(target.parentElement.querySelector(".product-qty").innerText > 1) {
            let productQtyEle = target.parentElement.querySelector(".product-qty")
            productQtyEle.innerText = parseInt(productQtyEle.innerText) - 1
            let productId = target.parentElement.parentElement.parentElement.id

            loggedInUser.cart = loggedInUser.cart.map((item) => {
                if(item.id == productId) {
                    item.productQuantity = productQtyEle.innerText
                    item.productTotal = `${productQtyEle.innerText * item.productPrice.replace(/[₹,\s]/g, "")}`

                    target.parentElement.parentElement.querySelector(".total-price").innerText = Number(item.productTotal).toFixed(2)
                }
                return item
            })
            sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser))

            users[userIndex].cart = loggedInUser.cart
            localStorage.setItem("users", JSON.stringify(users))


            let subTotalEle = target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".sub-total")
            let taxEle = target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".tax")
            let finalTotalEle = target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".final-total")
            loggedInUser.cart.forEach((e) => {
                if(e.id == productId) {
                    subTotalEle.innerText = (parseInt(subTotalEle.innerText) - parseInt(e.productPrice.replace(/[₹,\s]/g, ""))).toFixed(2)
                    taxEle.innerText = (parseInt(subTotalEle.innerText) * 12 / 100).toFixed(2)
                    finalTotalEle.innerText = (Number(subTotalEle.innerText) + Number(taxEle.innerText)).toFixed(2)
                }
            })
        } 
    }


    if(target.classList.contains("remove-btn")) {
        cartNumber.innerText = cartNumber.innerText - 1
        loggedInUser.cartNumber = parseInt(cartNumber.innerText)
        sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser))

        users[userIndex].cartNumber = loggedInUser.cartNumber
        localStorage.setItem("users", JSON.stringify(users))

        if(cartNumber.innerText == 0) {
            addTocartDetails.classList.remove("add-to-cart-details-active")
        }

        let productId = target.parentElement.parentElement.id

        let subTotalEle = target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".sub-total")
        let taxEle = target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".tax")
        let finalTotalEle = target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".final-total")
        loggedInUser.cart.forEach((e) => {
            if(e.id == productId) {
                subTotalEle.innerText = (parseInt(subTotalEle.innerText) - parseInt(e.productTotal.replace(/[₹,\s]/g, ""))).toFixed(2)
                taxEle.innerText = (parseInt(subTotalEle.innerText) * 12 / 100).toFixed(2)
                finalTotalEle.innerText = (Number(subTotalEle.innerText) + Number(taxEle.innerText)).toFixed(2)
            }
        })

        // update Local-storage
        loggedInUser.cart = loggedInUser.cart.filter((item) => item.id !=  productId)
        // update UI
        target.parentElement.parentElement.remove()
    
        sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser))
        users[userIndex].cart = loggedInUser.cart
        localStorage.setItem("users", JSON.stringify(users))
   
    }

})


// Billing Data 
const subTotalEle = document.querySelector(".sub-total")
const taxElement = document.querySelector(".tax")
const finalTotal = document.querySelector(".final-total")
let subTotalValue = 0
let taxValue = 0

loggedInUser.cart.forEach((e) => {
    subTotalValue += parseInt(e.productTotal)
    subTotalEle.innerText = subTotalValue.toFixed(2)

    taxValue = subTotalValue * 12 / 100
    taxElement.innerText = taxValue.toFixed(2)

    finalTotal.innerText = (subTotalValue + taxValue).toFixed(2)
})

// Slide Bar User-name
const slideBarHeading = document.querySelector(".slide-bar-heading span")
slideBarHeading.innerText = `${loggedInUser ? `Hello, ${loggedInUser.username}` : "User"}`

// Nav-Bar User-name
const navBarUsername = document.querySelector(".nav-right-side #user-name")
navBarUsername.innerText = `${loggedInUser ? `${loggedInUser.username}` : ""}`

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