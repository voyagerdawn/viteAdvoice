export function handleFormatting() {

let languages = [
    {
        name: "English",
        native: "English",
        code: "en",
    },
    {
        name: "Hindi",
        native: "हिन्दी",
        code: "hi",
    },
    {
        name: "Marathi",
        native: "मराठी",
        code: "mr",
    },
    {
        name: "Gujarati",
        native: "ગુજરાતી",
        code: "gu",
    },
];

let fontList = [
    "Times New Roman",
    "Arial",
    "Courier New",
];
let fontName = document.getElementById("fonts");
let fontSizeRef = document.getElementById("size");
let languageRef = document.getElementById("lang");
let translateLang = document.getElementById("translate-lang");
let textArea = document.getElementById("speech-text");

fontList.map((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
});

for (let i = 1; i <= 12; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
}
fontSizeRef.value = 3;

$(document).ready(function () {
    const $speechText = $('#speech-text');

    function formatText(command, value = null) {
        document.execCommand(command, false, value);
        $speechText.focus(); // Ensure the text editor retains focus after formatting
    }

    $('.unre .color-btn').each(function (index) {
        $(this).on('click', function () {
            switch (index) {
                case 0:
                    formatText('undo');
                    break;
                case 1:
                    formatText('redo');
                    break;
            }
        });
    });

    $('.format-opts .color-btn2').each(function (index) {
        $(this).on('click', function () {
            switch (index) {
                case 0:
                    formatText('bold');
                    break;
                case 1:
                    formatText('italic');
                    break;
                case 2:
                    formatText('underline');
                    break;
                case 3:
                    formatText('strikeThrough');
                    break;
                case 4:
                    formatText('subscript');
                    break;
                case 5:
                    formatText('superscript');
                    break;
            }
        });
    });

    $('.alignment .color-btn3').each(function (index) {
        $(this).on('click', function () {
            switch(index) {
                case 0:
                    formatText('justifyLeft');
                    break;
                case 1:
                    formatText('justifyCenter');
                    break;
                case 2:
                    formatText('justifyRight');
                    break;
                case 3:
                    formatText('justifyFull');
                    break;
            }
                
        });  
    });

    $('.indent .color-btn4').each(function (index) {
        $(this).on('click', function () {
            switch(index) {
                case 0:
                    formatText('indent');
                    break;
                case 1:
                    formatText('outdent');
                    break;
            }
                
        });  
    });

    $('.bullet .color-btn5').each(function (index) {
        $(this).on('click', function () {
            switch(index) {
                case 0:
                    formatText('insertUnorderedList');
                    break;
                case 1:
                    formatText('insertOrderedList');
                    break;
            }
                
        });  
    });

    $('#fonts').on('change', function () {
        const selectedFont = $(this).val();
        document.execCommand('fontName', false, selectedFont);
        $speechText.focus(); // Ensure focus remains on the editor
    });

    $('#size').on('change', function () {
        const selectedSize = $(this).val();
        document.execCommand('fontSize', false, selectedSize);
        $speechText.focus(); // Ensure focus remains on the editor
    });

    // $('#lang').on('change', function () {
    //     const selectedLang = $(this).val();
    //     $speechText.attr('lang', selectedLang);
    //     $speechText.focus(); // Ensure focus remains on the editor
    // });
});

// $(document).ready(function() {
//     $('#speech-text').on('input', function() {
//         autoCapitalize();
//     });

//     function autoCapitalize() {
//         // Get the contenteditable div
//         var $contentDiv = $('#speech-text');
//         var content = $contentDiv.html();

//         // Capitalize the first letter of the content
//         content = capitalizeFirstLetter(content);

//         // Capitalize the first letter after full stops
//         content = capitalizeAfterDelimiters(content);

//         // Update the contenteditable div with the modified content
//         $contentDiv.html(content);

//         // Set the cursor to the end of the content
//         setCaretToEnd($contentDiv);
//     }

//     function capitalizeFirstLetter(content) {
//         return content.replace(/(?:^|\.\s*)([a-z])/g, function(match, p1) {
//             return match.toUpperCase();
//         });
//     }

//     function capitalizeAfterDelimiters(content) {
//         return content
//         .replace(/(?:^|\.\s*|\n\s*|<\/p>\s*)([a-z])/g, function(match, p1) {
//             return match.toUpperCase();
//         })
//         .replace(/(?:<br\s*\/?>\s*)([a-z])/g, function(match, p1) {
//             return match.toUpperCase();
//         });
//     }

//     function setCaretToEnd($element) {
//         var range = document.createRange();
//         var sel = window.getSelection();
//         range.selectNodeContents($element[0]);
//         range.collapse(false);
//         sel.removeAllRanges();
//         sel.addRange(range);
//     }
// });

// google.load("elements", "1", {
//     packages: "transliteration"
// });

// google.setOnLoadCallback(onLoad);

// let control;

// function onLoad() {
//     var options = {
//         sourceLanguage: 'en-IN',
//         destinationLanguage: ['hi-IN', 'mr-IN'],  // Devanagari for Hindi and Marathi
//         transliterationEnabled: true
//     };

//     control = new google.elements.transliteration.TransliterationControl(options);
// }

// Listen for changes in the transcription language and set typing mode accordingly
document.getElementById('lang').addEventListener('change', function() {
    const selectedLanguage = this.value;

    if (selectedLanguage === 'hi-IN' || selectedLanguage === 'mr-IN') {
        // Enable Devanagari typing for Hindi or Marathi
        control.makeTransliteratable(['speech-text']);
    } else {
        // Disable transliteration and return to normal typing (Latin) for English or Gujarati
        control.disableTransliteration();
    }
});

$(document).ready(function() {
    // Cache DOM elements
    let translateLangButton = $('#translate-lang');
    let langSelect = $('#langSelect');
    let sourceofLang = $('#lang');
    let textArea = $('#speech-text');  // Cached text area
    
    // Define a variable to hold the new textarea
    let newTextarea = null;

    // Event handler for adding the new textarea and translating
    translateLangButton.on('click', async function() {
        // Fetch the latest source language value
        let sourceLang = sourceofLang.val();
        
        // Check if the textarea already exists to avoid duplicating
        if ($('.new-textarea').length === 0) {
            // Create the new textarea
            newTextarea = $('<div class="new-textarea" id="translate-text" contenteditable="true"></div>');
            
            // Append the new textarea to a container, not body directly
            $('body').append(newTextarea);

            // Optionally, scroll the page to the newly added textarea
            $('html, body').animate({
                scrollTop: $(newTextarea).offset().top
            }, 500);
        }

        // Get the original text to be translated
        let text = textArea.text();  // Fetch text from the contenteditable div
        
        // Get the selected target language
        let targetLanguage = langSelect.val();
        
        // Validate the input
        if (text.trim() === '') {
            alert('Please enter some text to translate.');
            return;
        }

        // Try translating the text and updating the new textarea
        try {
            const translatedText = await translateText(text, sourceLang, targetLanguage);
            newTextarea.text(translatedText);  // Insert translated text into the new textarea
        } catch (error) {
            alert('Translation failed, please try again later.');
            console.error('Error while translating:', error);
        }
    });
    
    // Async function to call the MyMemory API for translation
    async function translateText(text, sourceLang, targetLanguage) {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLanguage}`);
        const data = await response.json();
        return data.responseData.translatedText;
    }
});

$(document).ready(function() {
    $('#translate-download').on('click', function() {
        // Get the content from the contenteditable div
        var content = $('#translate-text').html();
        var textContent = $('<div>').html(content).text();
        Export2Word(textContent);
    });
    function Export2Word(textContent) {
        var preHtml = '<html><head><meta charset="utf-8"></head><body>';
        var postHtml = '</body></html>';
        var fullHtml = preHtml + textContent + postHtml;

        var convt = htmlDocx.asBlob(fullHtml);
        // var blob = new Blob([textContent], {type: "text/plain;charset=utf-8"});
        saveAs(convt, "translated_draft.docx");
    }
});
}
