// Function to get URL parameters
function getUrlParameters() {
    var params = {};
    var url = window.location.href;
    var paramArray = url.slice(url.indexOf('?') + 1).split('&');

    for (var i = 0; i < paramArray.length; i++) {
        var param = paramArray[i].split('=');
        var key = decodeURIComponent(param[0]);
        var value = decodeURIComponent(param[1]);
        params[key] = value;
    }

    return params;
}

function changeValue(input, value) {
    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
    ).set;
    nativeInputValueSetter.call(input, value);

    var inputEvent = new Event("input", { bubbles: true });
    input.dispatchEvent(inputEvent);
}

// Function to populate input fields
function populateInputFields() {
    var params = getUrlParameters();

    console.log(params);
    // Get all input elements with placeholders
    var inputs = document.querySelectorAll('[name]');

    // Loop through each input element
    var sleep_time = 0;
    inputs.forEach(function (input) {
        var placeholder = input.getAttribute('name');
        var value = params[placeholder];

        // If a value is found in the URL parameters, set it as the input's value
        if (value) {
            sleep_time += 100;
            setTimeout(function () {
                changeValue(input, value.replaceAll("+", " "));
            }, sleep_time);
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // Call the function to populate input fields on page load
    setTimeout(populateInputFields, 1000);
    // populateInputFields();

    // ----------------------- Retrieve the 'editors_name' value from localStorage
    var editorsName = localStorage.getItem('editors_name');
    var editorsNameInput = document.querySelector('[name="editors_name"]');

    // Check if the value exists in localStorage
    if (editorsName) {
        if (editorsNameInput) {
            // Autofill input fields with the 'editors_name' attribute value
            // editorsNameInput.value = editorsName;
            setTimeout(function () {
                changeValue(editorsNameInput, editorsName);
            }, 1000);

            // Add an input event listener to the input field
            editorsNameInput.addEventListener('input', function () {
                // Get the updated value from the input field
                const newValue = editorsNameInput.value;

                // Save the updated value to localStorage
                localStorage.setItem('editors_name', newValue);

                // Optionally, you can also display a confirmation message
                console.log('Data saved to localStorage:', newValue);
            });
        }
    } else {
        // Handle the case where 'editors_name' is not found in localStorage
        console.log('Editor\'s Name not found in localStorage.');
    }


    // ---------------------- Retrieve the 'email' value from localStorage
    var email = localStorage.getItem('email');
    var emailInput = document.querySelector('[name="email"]');

    // Check if the value exists in localStorage
    if (email) {
        if (emailInput) {
            // Autofill input fields with the 'editors_name' attribute value
            // emailInput.value = email;
            setTimeout(function () {
                changeValue(emailInput, email);
            }, 1000);
        }
    } else {
        // Handle the case where 'email' is not found in localStorage
        console.log('Email not found in localStorage.');
    }

    if (emailInput) {
        // Add an input event listener to the input field
        emailInput.addEventListener('input', function () {
            // Get the updated value from the input field
            const newValue = emailInput.value;

            // Save the updated value to localStorage
            localStorage.setItem('email', newValue);

            // Optionally, you can also display a confirmation message
            console.log('Data saved to localStorage:', newValue);
        });
    }


    // Retrieve the 'name' value from localStorage
    var name = localStorage.getItem('name');
    var nameInput = document.querySelector('[name="first_name"]');

    // Check if the value exists in localStorage
    if (name) {
        if (nameInput) {
            // Autofill input fields with the 'editors_name' attribute value
            // nameInput.value = name;
            setTimeout(function () {
                changeValue(nameInput, name);
            }, 1000);
        }
    } else {
        // Handle the case where 'name' is not found in localStorage
        console.log('name not found in localStorage.');
    }

    if (nameInput) {
        // Add an input event listener to the input field
        nameInput.addEventListener('input', function () {
            // Get the updated value from the input field
            const newValue = nameInput.value;

            // Save the updated value to localStorage
            localStorage.setItem('name', newValue);

            // Optionally, you can also display a confirmation message
            console.log('Data saved to localStorage:', newValue);
        });
    }


    // -------------- Retrieve the 'phone_number' value from localStorage
    // need to add some waiting as the phone_number field is shown later
    setTimeout(function () {
        var phone_number = localStorage.getItem('phone_number');
        var phone_numberInput = document.querySelector('[placeholder="Phone"]');

        // Check if the value exists in localStorage
        if (phone_number) {
            if (phone_numberInput) {
                // Autofill input fields with the 'editors_name' attribute value
                // phone_numberInput.value = phone_number;
                setTimeout(function () {
                    changeValue(phone_numberInput, phone_number);
                }, 1000);
            }
        } else {
            // Handle the case where 'phone_number' is not found in localStorage
            console.log('phone_number not found in localStorage.');
        }

        if (phone_numberInput) {
            // Add an input event listener to the input field
            phone_numberInput.addEventListener('input', function () {
                // Get the updated value from the input field
                const newValue = phone_numberInput.value;

                // Save the updated value to localStorage
                localStorage.setItem('phone_number', newValue);

                // Optionally, you can also display a confirmation message
                console.log('Data saved to localStorage:', newValue);
            });
        }
    }, 1500);


    // Get all label tags that have the attribute 'for' and its value starts with 'answer'
    var initial_number_of_input_fields = document.querySelectorAll('input[type="text"]').length;
    var initial_input_fields = [...document.querySelectorAll('input[type="text"]')];

    const labels = document.querySelectorAll('label[for^="answer"]');

    // Add click event listener to each label
    labels.forEach(function (label) {
        // Get the label's text content
        const text_to_input = label.textContent;
        const survey_title = label.parentElement.parentElement.childNodes[0].textContent;

        label.addEventListener('click', function () {
            // Check if the input field exists and fill it up with a delay of 0.3 seconds
            var counter = 0;
            var intervalId = setInterval(function () {
                var current_number_of_input_fields = document.querySelectorAll('input[type="text"]').length;
                var current_input_fields = [...document.querySelectorAll('input[type="text"]')];

                // console.log(text_to_input, ini);

                if (current_number_of_input_fields - initial_number_of_input_fields === 1) {
                    for (var i = 0; i < current_input_fields.length; i++) {
                        // if current_input_fields[i] not in initial_input_fields
                        if (!initial_input_fields.includes(current_input_fields[i])) {
                            changeValue(current_input_fields[i], text_to_input);
                            initial_input_fields.push(current_input_fields[i]);
                            initial_number_of_input_fields++;

                            // check if input's value is changed
                            if (current_input_fields[i].value === text_to_input) {
                                console.log(survey_title, ': filled');
                                clearInterval(intervalId);
                            }
                            else {
                                console.log(survey_title, ': not filled');
                            }
                        }
                    }
                }
            }, 100);
        });
    });

    // If there is a date field, it should be autofilled
    function getCurrentFormattedDate(format) {
        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear().toString();

        return `${month}/${day}/${year}`;

    }


    const dateInput = document.querySelector('input[name="date"]');
    if (dateInput) {
        const placeholderFormat = dateInput.getAttribute('placeholder');
        const formattedDate = getCurrentFormattedDate(placeholderFormat);
        // dateInput.value = formattedDate;
        setTimeout(function () {
            changeValue(dateInput, formattedDate);
        }, 1000);
        // changeValue(dateInput, formattedDate);
    }
});
