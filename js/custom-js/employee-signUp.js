//starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    window.addEventListener('load', function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation')
  
      // Loop over them and prevent submission
      Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
          if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
          }
          form.classList.add('was-validated')
        }, false)
      })
    }, false)
  }())
  
const submitButton = document.getElementById('signup-btn')


let logIn = document.getElementById('login-btn')
logIn.addEventListener('click', goToLogIn = () => {
  window.location.replace('../../src/employee-sign-in.html')
})
let logInV2 = document.getElementById('login-btnV2')
logInV2.addEventListener('click', goToLogIn = () => {
  window.location.replace('../../src/employee-sign-in.html')
})

submitButton.addEventListener('click', addUser = (e) => {
  e.preventDefault()

  submitButton.innerHTML = '<span class="spinner-border spinner-border" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>';
  
  checkInputs()
  // old loader
  // spin = () => {
  //   document.querySelector('.loader').style.display = 'block'
  // }
  status()
  
  function status(){
    let firstName = document.getElementById('fname').value
    let lastName = document.getElementById('lname').value
    let email = document.getElementById('email').value
    let phone = document.getElementById('phone').value
    let password = document.getElementById('password').value
    
    // spin()
    
    if (document.getElementById('terms-policy').checked) {
      
      fetch('https://api.lancers.app/v1/auth/employee-signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          //firstName: firstName,
          //lastName: lastName,
          email: email,
          //phoneNo: phone,
          password: password,
        })
      })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data),
        if(data.status) {
          submitButton.innerText = 'Sign Up';
          if (data.status === 'success') {
            localStorage.setItem('talentPool', JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              phoneNo: phone
            }))
            $('#exampleModal').modal()
          } else {
            showAlert(data.error)
          }
          // document.querySelector('.loader').style.display = 'none'
        } 
      })
      .catch((err) => showAlert(err));
      } else {
      showAlert('Please accept the Terms and Conditions to proceed')
      submitButton.innerText = 'Sign Up';
    }}
})

checkInputs = () => {
  let firstName = document.getElementById('fname').value.trim()
  let lastName = document.getElementById('lname').value.trim()
  let email = document.getElementById('email').value.trim()
  let phone = document.getElementById('phone').value.trim()
  let password = document.getElementById('password').value.trim()
  let passwordTwo = document.getElementById('confirmPassword').value.trim()
  let validCheck = document.getElementById('terms-policy').checked

  document.querySelector('.needs-validation').classList.add('was-validated')

  if(!validCheck) {
    document.getElementById('invalidCheck').innerHTML = '* Please check the terms & policy conditions'
  } else {
    document.getElementById('invalidCheck').style.display = 'none'
  }
  if(firstName === '' ) {
    setError(firstName, '* First name cannot be blank')
  } else {
    setRight(firstName)
  }
  if(lastName === '' ) {
    setErrorL(lastName, '* Last name cannot be blank')
  } else {
    setRightL(lastName)
  }
  const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;
  if(email === '' ) {
    setErrorE(email, '* Email cannot be blank')
  } else if(!email.match(validEmail)) {
    setRightE(email, '* Please input a valid email')
  } else {
    const small = document.querySelector('#invalidE')
    small.style.display = 'none'    
  }
  const minPhoneLen = 11
  if(phone === '' ) {
    setErrorP(phone, '* Phone cannot be blank and must be 11 digits')
  } else if(phone >= 11 ) {
    const small = document.querySelector('#invalidP')
    small.style.display = 'none'
    //setRightP(phone, '* Phone must be 11 digits')
  } else {
  }
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+-=`~{}[\]|'"<>,./?])(?=.{8,})/;
  if(password === '') {
    setErrorPass(password, '* Password cannot be blank')
  } else if(!password.match(regex)) {
    checkPass(password, '* Password must contain a minimum of 8 characters, a capital letter, a number and special character')
  } else {
    const small = document.querySelector('#invalidPass')
    small.style.display = 'none'
  }
  if(passwordTwo === '') {
    setErrorPass2(passwordTwo, '* Please confirm password')
  } else if(passwordTwo !== password) {
    checkPass2(passwordTwo, '* Passwords do not match')
  } else {
    const small = document.querySelector('#invalidPass2')
    small.style.display = 'none'
    //$('#exampleModal').modal()
  }
  
}

//First Name Error Functions
setError = (input, message) => {
  const small = document.querySelector('#invalid')
  small.innerHTML = message
  small.style.display = 'block'
}

setRight = (input) => {
  const small = document.querySelector('#invalid')
  small.style.display = 'none'
}

//Last Name Error Functions
setErrorL = (input, message) => {
  const small = document.querySelector('#invalidL')
  small.innerHTML = message
  small.style.display = 'block'
}

setRightL = (input) => {
  const small = document.querySelector('#invalidL')
  small.style.display = 'none'
}

//Email Error Functions
setErrorE = (input, message) => {
  const small = document.querySelector('#invalidE')
  small.innerHTML = message
  small.style.display = 'block'
}

setRightE = (input, message) => {
  const small = document.querySelector('#invalidE')
  small.innerHTML = message
  small.style.display = 'block'
}

//Phone Error Functions
setErrorP = (input, message) => {
  const small = document.querySelector('#invalidP')
  small.innerHTML = message
  small.style.display = 'block'
}

setRightP = (input, message) => {
  const small = document.querySelector('#invalidP')
  small.innerHTML = message
  small.style.display = 'block'
}

//Password Error Functions
setErrorPass = (input, message) => {
  const small = document.querySelector('#invalidPass')
  small.innerHTML = message
  small.style.display = 'block'
}

checkPass = (input, message) => {
  const small = document.querySelector('#invalidPass')
  small.innerHTML = message
  small.style.display = 'block'
}

setErrorPass2 = (input, message) => {
  const small = document.querySelector('#invalidPass2')
  small.innerHTML = message
  small.style.display = 'block'
}

checkPass2 = (input, message) => {
  const small = document.querySelector('#invalidPass2')
  small.innerHTML = message
  small.style.display = 'block'
}

const submitButtonV2 = document.getElementById('signup-btnV2');

submitButtonV2.addEventListener('click', addUserV2 = (e) => {
  e.preventDefault()
  submitButtonV2.innerHTML = '<span class="spinner-border spinner-border" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span>';

  checkInputsV2()
  statusV2()
  // spinV2 = () => {
  //   document.querySelector('.loaderV2').style.display = 'block'
  // }
  
  function statusV2(){
    let firstName = document.getElementById('fnameV2').value
    let lastName = document.getElementById('lnameV2').value
    let email = document.getElementById('emailV2').value
    let phone = document.getElementById('phoneV2').value
    let password = document.getElementById('passwordV2').value
    
    // spinV2()
  if(document.getElementById('terms-policyV2').checked) {
    fetch('https://api.lancers.app/v1/auth/employee-signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        //firstName: firstName,
        //lastName: lastName,
        email: email,
        //phoneNo: phone,
        password: password,
      })
    })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data),
      submitButtonV2.innerText = 'Sign Up';
      let i = 'success'
      if(data.status === i ) {
        $('#exampleModal2').modal();
        localStorage.setItem('talentPool', JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              phoneNo: phone
            }))
        // document.querySelector('.loaderV2').style.display = 'none'
      } else {
        showAlert(data.error)
      }
    })
    .catch((err) => showAlert(err));
    } else {
    showAlert('Please accept the Terms and Conditions to proceed')
    submitButtonV2.innerText = 'Sign Up';
  }}
})

checkInputsV2 = () => {
  let firstName = document.getElementById('fnameV2').value.trim()
  let lastName = document.getElementById('lnameV2').value.trim()
  let email = document.getElementById('emailV2').value.trim()
  let phone = document.getElementById('phoneV2').value.trim()
  let password = document.getElementById('passwordV2').value.trim()
  let passwordTwo = document.getElementById('confirmPasswordV2').value.trim()
  let validCheck = document.getElementById('terms-policyV2').checked

  document.querySelector('.needs-validation').classList.add('was-validated')

  if(!validCheck) {
    document.getElementById('invalidCheckV2').innerHTML = '* Please check the terms & policy conditions'
  } else {
    document.getElementById('invalidCheckV2').style.display = 'none'
  }
  if(firstName === '' ) {
    setErrorV2(firstName, '* First name cannot be blank')
  } else {
    setRightV2(firstName)
  }
  if(lastName === '' ) {
    setErrorLV2(lastName, '* Last name cannot be blank')
  } else {
    setRightLV2(lastName)
  }
  const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;
  if(email === '' ) {
    setErrorEV2(email, '* Email cannot be blank')
  } else if(!email.match(validEmail)) {
    setRightEV2(email, '* Please input a valid email')
  } else {
    const small = document.querySelector('#invalidEV2')
    small.style.display = 'none'    
  }
  const minPhoneLen = 11
  if(phone === '' ) {
    setErrorPV2(phone, '* Phone cannot be blank')
  } else if(!phone.match(minPhoneLen)) {
    const small = document.querySelector('#invalidPV2')
    small.innerHTML = '* Phone must be 11 digits'
    //setRightPV2(phone, '* Phone must be 11 digits')
  } else if(phone >= minPhoneLen) {
    const small = document.querySelector('#invalidPV2')
    small.style.display = 'none'
  }
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+-=`~{}[\]|'"<>,./?])(?=.{8,})/;
  if(password === '') {
    setErrorPassV2(password, '* Password cannot be blank')
  } else if(!password.match(regex)) {
    checkPassV2(password, '* Password must contain a minimum of 8 characters, a capital letter, a number and special character')
  } else {
    const small = document.querySelector('#invalidPassV2')
    small.style.display = 'none'
  }
  if(passwordTwo === '') {
    setErrorPass2V2(passwordTwo, '* Please confirm password')
  } else if(passwordTwo !== password) {
    checkPass2V2(passwordTwo, '* Passwords do not match')
  } else {
    const small = document.querySelector('#invalidPass2V2')
    small.style.display = 'none'
    //$('#exampleModal').modal()
  }
  
}

//First Name Error Functions
setErrorV2 = (input, message) => {
  const small = document.querySelector('#invalidV2')
  small.innerHTML = message
  small.style.display = 'block'
}

setRightV2 = (input) => {
  const small = document.querySelector('#invalidV2')
  small.style.display = 'none'
}

//Last Name Error Functions
setErrorLV2 = (input, message) => {
  const small = document.querySelector('#invalidLV2')
  small.innerHTML = message
  small.style.display = 'block'
}

setRightLV2 = (input) => {
  const small = document.querySelector('#invalidLV2')
  small.style.display = 'none'
}

//Email Error Functions
setErrorEV2 = (input, message) => {
  const small = document.querySelector('#invalidEV2')
  small.innerHTML = message
  small.style.display = 'block'
}

setRightEV2 = (input, message) => {
  const small = document.querySelector('#invalidEV2')
  small.innerHTML = message
  small.style.display = 'block'
}

//Phone Error Functions
setErrorPV2 = (input, message) => {
  const small = document.querySelector('#invalidPV2')
  small.innerHTML = message
  small.style.display = 'block'
}

// setRightPV2 = (input, message) => {
//   const small = document.querySelector('#invalidPV2')
//   small.innerHTML = message
//   small.style.display = 'block'
// }

//Password Error Functions
setErrorPassV2 = (input, message) => {
  const small = document.querySelector('#invalidPassV2')
  small.innerHTML = message
  small.style.display = 'block'
}

checkPassV2 = (input, message) => {
  const small = document.querySelector('#invalidPassV2')
  small.innerHTML = message
  small.style.display = 'block'
}

setErrorPass2V2 = (input, message) => {
  const small = document.querySelector('#invalidPass2V2')
  small.innerHTML = message
  small.style.display = 'block'
}

checkPass2V2 = (input, message) => {
  const small = document.querySelector('#invalidPass2V2')
  small.innerHTML = message
  small.style.display = 'block'
}

// show alert message on page
function showAlert(message) {
  const alert = document.getElementById('alert');
  const alertMessage = document.getElementById('alertMessage');

  alert.classList.remove('d-none');
  alertMessage.innerText = message;

  setTimeout(() => {
    hideAlert()
  }, 6000);
}

function hideAlert() {
  document.getElementById('alert').classList.add('d-none');
}
