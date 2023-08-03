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
        populateInputFields();

        // Retrieve the 'editors_name' value from localStorage
        var editorsName = localStorage.getItem('editors_name');
        var editorsNameInput = document.querySelector('[name="editors_name"]');

        // Check if the value exists in localStorage
        if (editorsName) {
            if (editorsNameInput) {
                // Autofill input fields with the 'editors_name' attribute value
                // editorsNameInput.value = editorsName;
                changeValue(editorsNameInput, editorsName);


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


        // Get all label tags that have the attribute 'for' and its value starts with 'answer'
        const labels = document.querySelectorAll('label[for^="answer"]');

        // Add click event listener to each label
        labels.forEach(function (label) {
            label.addEventListener('click', function () {
                // Get the label's text content
                const text_to_input = label.textContent;

                // Check if the input field exists and fill it up with a delay of 0.3 seconds
                setTimeout(function () {
                    var inputField = document.querySelector('[name="accept_or_deny"]');
                    if (inputField) {
                        // inputField.value = text_to_input;
                        changeValue(inputField, text_to_input);
                    }

                    var inputField = document.querySelector('[name="revision_or_approval"]');
                    if (inputField) {
                        // inputField.value = text_to_input;
                        changeValue(inputField, text_to_input);
                    }

                }, 500); // Replace 'Some text' with the desired value

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
            changeValue(dateInput, formattedDate);
        }
    });
