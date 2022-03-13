const inputForm = document.querySelector('form')
const inputField = document.querySelector('input')
const errorField = document.querySelector('#error')
const locationField = document.querySelector("#location")
const forecastField = document.querySelector('#forecast')

inputForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = inputField.value
    
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                errorField.innerHTML = data.error
            } else {
                locationField.innerHTML = data.location
                forecastField.innerHTML = data.forecast
            }
        })
    }) // fetch API can only be used in client side JS

})

