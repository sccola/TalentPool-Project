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

          event.preventDefault()

          // var formInputs = JSON.stringify({
          var formInputs = {
              firstName: form.firstname.value,
              lastName: form.lastname.value,
              email: form.email.value,
              password: form.password.value,
              // "confirm_password": form.confirm_password.value,
              phoneNo: form.phone_no.value
          };

          var data = JSON.stringify(formInputs)


      //  const formInputs = new FormData(document.getElementById('employeeSignUpForm'));

      // const formInputs = JSON.stringify(Object.fromEntries(new FormData(event.target)));

      // console.log(FormData);  

      console.log(data); 
      // console.log(JSON.stringify(formInputs));  
      
      fetch("https://api.lancers.app/v1/auth/employee-signup", {
      // fetch("https://developers.lancers.app/v1/auth/employee-signup", {

          method: 'post',
          headers: {
            "Accept": "application/json, text/plain",
            "contentType": "application/json"
            // 'Content-Type': 'application/x-www-form-urlencoded'
          },
          // mode: "no-cors",
          body: data
      })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

      }, false)
    })
  }, false)
}())
