//FORM
const contactForm = document.getElementById('contactForm')

//FORM INPUTS
const fullName = document.getElementById('name')
const email = document.getElementById('email')
const phoneNumber = document.getElementById('phoneNumber')
const message = document.getElementById('message')

//ERROR MESSAGES
const errorElement = document.getElementById('error')


//FORM SUBMIT LISTENER
contactForm.addEventListener('submit', (e) => {
    let errorMessages = []
    
    if (fullName.value === '' || fullName.value == null){
        errorMessages.push('Name is required')
    }

    if (email.value === '' || email.value == null){
        errorMessages.push('Email address is required')
    }
    else if (email.value.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/) === null){
        errorMessages.push('Please enter a valid email address')
    }

    if (phoneNumber.value === '' || phoneNumber.value == null){
        errorMessages.push('Phone number is required')
    }
    else if (phoneNumber.value < 10){
        errorMessages.push('Please enter a valid phone number')
    }

    if (message.value === '' || message.value == null){
        errorMessages.push('Message is required')
    }

    if(errorMessages.length > 0){
        errorElement.innerText = errorMessages.join('\n')
        return
    }
})