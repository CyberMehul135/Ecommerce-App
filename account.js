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



// [ 3 ] Signup & Signin Feature
// Data Fetching :
const users = JSON.parse(localStorage.getItem("users")) || []
const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"))

// Data Showing :
const cartNumberEle = document.querySelector("#cart-number")
cartNumberEle.innerText = loggedInUser?.cartNumber || 0

// (1) Form Creation
const myAccount = document.querySelector(".my-account")
const signupSigninEle = document.querySelector(".signup-signin")
const signupForm = document.querySelector(".sign-up-form")
const signinForm = document.querySelector(".sign-in-form")
const signInBtn = document.querySelector(".sign-up-form .signin")
const signUpBtn = document.querySelector(".sign-in-form .signup")


signupSigninEle.addEventListener("click", (e) => {
    let target = e.target
    if(target.classList.contains("signin")) {
        signupForm.classList.add("inactive-signup")
        signinForm.classList.add("active-signin")
    }

    if(target.classList.contains("signup")) {
        signupForm.classList.remove("inactive-signup")
        signinForm.classList.remove("active-signin")
    }
})


// (2) Data Save

// SignUp Data Save :
signupForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const userName = document.querySelector(".sign-up-form #user-name").value
    const userEmail = document.querySelector(".sign-up-form #email").value
    const password = document.querySelector(".sign-up-form #user-password").value

    const existingUserName = users.some((user) => user.username == userName)
    const existingUserEmail = users.some((user) => user.userEmail == userEmail)

    if(existingUserName || existingUserEmail) {
        if(existingUserName) {
            alert("Username already exists! Please choose a diffrent username.")
        }
        else if(existingUserEmail) {
            alert("UserEmail already exists! Please choose a diffrent UserEmail.")
        }
    }
    else {
        let newUser = {
            username: document.querySelector(".sign-up-form #user-name").value,
            userEmail: document.querySelector(".sign-up-form #email").value,
            password: document.querySelector(".sign-up-form #user-password").value,
            cart: [],
            cartNumber: 0
        }
        
        users.push(newUser)
        localStorage.setItem("users", JSON.stringify(users))
    
        alert("Signup Sucessfull! Please Signin Now")
        signupForm.reset()
    }

})

// SignIn Data Save :
signinForm.addEventListener("submit", (e) => {
    e.preventDefault()
    
    const userName = document.querySelector(".sign-in-form .enter-name").value
    const password = document.querySelector(".sign-in-form .enter-password").value

    const user = users.find((user) => user.username == userName && user.password == password)

    if(user) {
        sessionStorage.setItem("loggedInUser", JSON.stringify(user))
        alert(`Login Sucessfull! Welcome ${userName}`)
        signinForm.reset()
        window.location.href = "index.html"
    }
    else {
        alert("Invalid Username or Password")
    }
})

// Slide Bar User-name
const slideBarHeading = document.querySelector(".slide-bar-heading span")
slideBarHeading.innerText = `${loggedInUser ? `Hello, ${loggedInUser.username}` : "User"}`

// [ 4 ] Logout Feature
const logoutBtn = document.querySelector(".slide-logout")

logoutBtn.addEventListener("click", (e) => {
    e.preventDefault()

    let logout = confirm("Are you sure you want to logout")
    if(logout) {
        sessionStorage.clear()
        window.location.href = "index.html"
    }
})

const logout2Btn = document.querySelector(".nav-right-side .logout")

logout2Btn.addEventListener("click", (e) => {
    e.preventDefault()

    let logout = confirm("Are you sure you want to logout")
    if(logout) {
        sessionStorage.clear()
        window.location.href = "index.html"
    }
})