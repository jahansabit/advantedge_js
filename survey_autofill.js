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

function changeValue(input, value) {
    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
    ).set;
    nativeInputValueSetter.call(input, value);

    var inputEvent = new Event("input", { bubbles: true });
    input.dispatchEvent(inputEvent);
}