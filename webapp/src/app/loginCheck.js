const loggedOutLinks = document.querySelectorAll('#login-div')
const loggedInLinks = document.querySelectorAll('#logout-div')


export const loginCheck = user => {
    if (user) {
        loggedOutLinks.forEach(link => link.style.display = 'none')
        loggedInLinks.forEach(link => link.style.display = 'block')
    } else {
        loggedOutLinks.forEach(link => link.style.display = 'block')
        loggedInLinks.forEach(link => link.style.display = 'none')
    }
}