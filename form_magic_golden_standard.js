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

    // Retrieve the 'email' value from localStorage
    var email = localStorage.getItem('gs-email');
    var emailInput = document.querySelector('[name="email"]');

    // Check if the value exists in localStorage
    if (email) {
        if (emailInput) {
            // Autofill input fields with the 'editors_name' attribute value
            // emailInput.value = email;
            setTimeout(function () {
                changeValue(emailInput, email);
                emailInput.readOnly = true;
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
            localStorage.setItem('gs-email', newValue);

            // Optionally, you can also display a confirmation message
            console.log('Data saved to localStorage:', newValue);
        });
    }


    // Get all label tags that have the attribute 'for' and its value starts with 'answer'
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

                if (survey_title.toLowerCase().includes("videos to be sifted")) {
                    inputField = document.querySelector('[name="sifting"]');
                    if (inputField) {
                        changeValue(inputField, text_to_input);
                        inputField.readOnly = true;
                    }
                }

                if (survey_title.toLowerCase().includes("style of title animation")) {
                    inputField = document.querySelector('[name="title_animations"]');
                    if (inputField) {
                        changeValue(inputField, text_to_input);
                        inputField.readOnly = true;
                    }
                }

                if (survey_title.toLowerCase().includes("where do you prefer your title animations to show")) {
                    inputField = document.querySelector('[name="title_animations_2"]');
                    if (inputField) {
                        changeValue(inputField, text_to_input);
                        inputField.readOnly = true;
                    }
                }

                if (survey_title.toLowerCase().includes("which transition")) {
                    inputField = document.querySelector('[name="transitions"]');
                    if (inputField) {
                        changeValue(inputField, text_to_input);
                        inputField.readOnly = true;
                    }
                }

                if (survey_title.toLowerCase().includes("and animations where concepts")) {
                    inputField = document.querySelector('[name="graphics_and_animations"]');
                    if (inputField) {
                        changeValue(inputField, text_to_input);
                        inputField.readOnly = true;
                    }
                }

                if (survey_title.toLowerCase().includes("which font")) {
                    inputField = document.querySelector('[name="fonts"]');
                    if (inputField) {
                        changeValue(inputField, text_to_input);
                        inputField.readOnly = true;
                    }
                }

                if (survey_title.toLowerCase().includes("short form captions")) {
                    inputField = document.querySelector('[name="short_form_captions"]');
                    if (inputField) {
                        changeValue(inputField, text_to_input);
                        inputField.readOnly = true;
                    }
                }

                if (survey_title.toLowerCase().includes("short form captions")) {
                    inputField = document.querySelector('[name="short_form_captions"]');
                    if (inputField) {
                        changeValue(inputField, text_to_input);
                        inputField.readOnly = true;
                    }
                }

                if (survey_title.toLowerCase().includes("b-roll do you prefer to be")) {
                    inputField = document.querySelector('[name="b_roll"]');
                    if (inputField) {
                        changeValue(inputField, text_to_input);
                        inputField.readOnly = true;
                    }
                }

                if (survey_title.toLowerCase().includes("preferred content upload")) {
                    inputField = document.querySelector('[name="content_drop"]');
                    if (inputField) {
                        changeValue(inputField, text_to_input);
                        inputField.readOnly = true;
                    }
                }

                if (email) {
                    if (emailInput) {
                        // Autofill input fields with the 'editors_name' attribute value
                        // emailInput.value = email;
                        setTimeout(function () {
                            changeValue(emailInput, email);
                            emailInput.readOnly = true;
                        }, 1000);
                    }
                } else {
                    // Handle the case where 'email' is not found in localStorage
                    console.log('Email not found in localStorage.');
                }

                counter++;
                if (counter == 3) {
                    clearInterval(intervalId);
                }

            }, 500);
            // Replace 'Some text' with the desired value

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
