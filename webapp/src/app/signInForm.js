import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"
import { auth } from "./firebase.js"
const signInForm = document.querySelector('#login-form')
import { showMessage } from "./showMessage.js"



signInForm.addEventListener('submit', async e => {
    e.preventDefault()

    const email = signInForm['login-email'].value
    const password = signInForm['login-password'].value

    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password)
        showMessage("Welcome " + credentials.user.email, 'success')
    } catch (error) {
        if (error.code === "auth/wrong-password") {
            showMessage("Wrong Password", 'error')
        } else if (error.code === "auth/user-not-found") {
            showMessage('User not found', 'error')
        } else {
            showMessage('Something went wrong', 'error')
        }
    }
})