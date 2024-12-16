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


// [ 3 ] Cart-Value
const users = JSON.parse(localStorage.getItem("users"))
const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"))

const cartEle = document.querySelector("#cart-number")
cartEle.innerText = loggedInUser.cartNumber



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

// Slide Bar Username 
const slideBarHeading = document.querySelector(".slide-bar-heading span")
slideBarHeading.innerText = `${loggedInUser ? `Hello, ${loggedInUser.username}` : "User"}`

// Nav-Bar User-name
const navBarUsername = document.querySelector(".nav-right-side #user-name")
navBarUsername.innerText = `${loggedInUser ? `${loggedInUser.username}` : ""}`