export function handleRecognition() {

const resultText = document.getElementById('speech-text');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const languageSelect = document.getElementById('lang');
const fontName = document.getElementById('fonts');
const fontSizeRef = document.getElementById('size');

let speechRecognition  = window.speechRecognition || window.webkitSpeechRecognition;
let recognition;

function handleTextTransformations(text) {
  const lowerCasePhrase = "on lowercase";
  const capitalPhrase = "on capital";
  const backspacePhrase = "delete";

  let lowerCaseIndex = text.toLowerCase().indexOf(lowerCasePhrase);
  let capitalIndex = text.toLowerCase().indexOf(capitalPhrase);
  let backspaceIndex = text.toLowerCase().indexOf(backspacePhrase);

  if (backspaceIndex !== -1) {
    // Handle backspace command
    text = deleteLastCharacter(text, backspaceIndex);
  }

  if (lowerCaseIndex !== -1 && capitalIndex !== -1) {
    if (lowerCaseIndex < capitalIndex) {
      text = text.slice(0, lowerCaseIndex) + text.slice(lowerCaseIndex + lowerCasePhrase.length).toLowerCase();
      text = text.slice(0, capitalIndex) + text.slice(capitalIndex + capitalPhrase.length).toUpperCase();
    } else {
      text = text.slice(0, capitalIndex) + text.slice(capitalIndex + capitalPhrase.length).toUpperCase();
      text = text.slice(0, lowerCaseIndex) + text.slice(lowerCaseIndex + lowerCasePhrase.length).toLowerCase();
    }
  } else if (lowerCaseIndex !== -1) {
    text = text.slice(0, lowerCaseIndex) + text.slice(lowerCaseIndex + lowerCasePhrase.length).toLowerCase();
  } else if (capitalIndex !== -1) {
    text = text.slice(0, capitalIndex) + text.slice(capitalIndex + capitalPhrase.length).toUpperCase();
  }

  text = wordConcat(text, recognition.lang);

  // Capitalize the first letter of the entire text
  text = text.charAt(0).toUpperCase() + text.slice(1);

  // Capitalize the first letter after sentence-ending punctuation
  text = text.replace(/([.!?]\s*)([a-z])/g, function(match, p1, p2) {
    return p1 + p2.toUpperCase();
  });

  return text;
}

function deleteLastCharacter(text, commandIndex) {
  // Find the last text input before the "backspace" command and delete the last character
  return text.slice(0, commandIndex - 1).trim();
}

function wordConcat(text, lang) {
  let replacedwords;

  if (lang === 'en') {
    replacedwords = text.replaceAll("add underscore", "_")
    .replaceAll("add under score", "_")
    .replaceAll("add copyright symbol", "©")
    .replaceAll("add copyright symbol", "©")
    .replaceAll("add vertical bar", "|")
    .replaceAll("add full stop", ". ")
    .replaceAll("add stop", ". ")
    .replaceAll("add colon", ":")
    .replaceAll("add semi colon", "")
    .replaceAll("add dash", "-")
    .replaceAll("add space", " ")
    .replaceAll("add apostrophe", "`")
    .replaceAll("add coma", ",")
    .replaceAll("add comma", ",")
    .replaceAll("add open quotation", '"')
    .replaceAll("add close quotation", '"')
    .replaceAll("add open parenthesis", "(")
    .replaceAll("add close parenthesis", ")")
    .replaceAll("add percent", "%")
    .replaceAll("add percentage", "%")
    .replaceAll("add percent", "%")
    .replaceAll("add percent age", "%")
    .replaceAll("add percentage", "%")
    .replaceAll("add at the rate", "@")
    .replaceAll("add exclamation mark", "!")
    .replaceAll("add question mark", "?")
    .replaceAll("add ampersand", "&")
    .replaceAll("add new line", "<br/>")
    .replaceAll("add new para", "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;")
    .replaceAll("add bold","<strong>")
    .replaceAll("no bold", "</strong>")
    .replaceAll("no bold", "</strong>")
    .replaceAll("add italic", "<em>")
    .replaceAll("no italic", "</em>")
    .replaceAll("add underline", "<u>")
    .replaceAll("no underline", "</u>")
    .replaceAll("add strike", "<s>")
    .replaceAll("no strike", "</s>")
    .replaceAll("add sub", "<sub>")
    .replaceAll("no sub", "</sub>")
    .replaceAll("add super", "<sup>")
    .replaceAll("no super", "</sup>")
  } else {
    replacedwords = text.replaceAll("अंडरस्कोर", "_")
    .replaceAll("ऍड अंडर स्कोर", "_")
    .replaceAll("ऍड कॉपीराइट सिंबोल", "©")
    .replaceAll("ऍड कॉपीराइट सिम्बॉल", "©")
    .replaceAll("ऍड कॉपीराइट सिंबॉल", "©")
    .replaceAll("ऍड कॉपीराइट सिंबल", "©")
    .replaceAll("ऍड कॉपीराइट", "©")
    .replaceAll("ऍड वर्टीकल बार", "|")
    .replaceAll("ऍड फुलस्टॉप", ". ")
    .replaceAll("ऍड स्टॉप", ". ")
    .replaceAll("ऍड कोलन", ":")
    .replaceAll("ऍड सेमी कोलन", "")
    .replaceAll("ऍड डॅश", "-")
    .replaceAll("ऍड स्पेस", " ")
    .replaceAll("ऍड अपोस्ट्रॉफी", "`")
    .replaceAll("ऍड अपो स्ट्रॉफी", "`")
    .replaceAll("ऍड कॉमा", ",")
    .replaceAll("ऍड कॉमा", ",")
    .replaceAll("ऍड ओपन सिंगल कोट", "'")
    .replaceAll("ऍड क्लोज सिंगल कोट", "'")
    .replaceAll("ऍड ओपन डबल कोट", '"')
    .replaceAll("ऍड क्लोज डबल कोट", '"')
    .replaceAll("ऍड ओपन ब्रॅकेट", "(")
    .replaceAll("ऍड क्लोज ब्रॅकेट", ")")
    .replaceAll("ऍड पर्सेंट", "%")
    .replaceAll("ऍड पर्सेंट", "%")
    .replaceAll("ऍड at the rate", "@")
    .replaceAll("ऍड एक्सलमेशन मार्क", "!")
    .replaceAll("ऍड क्वेश्चन मार्क", "?")
    .replaceAll("ऍड अँपरसँड", "&")
    // .replaceAll("हॅशटॅग", "#")
    // .replaceAll("हॅश टॅग", "#")
    .replaceAll("ऍड न्यू लाईन", "<br/>")
    .replaceAll("ऍड न्यू लाइन", "<br/>")
    .replaceAll("ऍड न्यू प्यारा", "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;")
    .replaceAll("ऍड न्यू पैरा", "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;")
    .replaceAll("ऍड न्यू लाईन", "<br/>")
    .replaceAll("ऍड न्यू प्यारा", "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;")
    .replaceAll("ऍड बोल्ड","<strong>")
    .replaceAll("एन्ड बोल्ड", "</strong>")
    .replaceAll("अँड बोल्ड", "</strong>")
    .replaceAll("एंड बोल्ड", "</strong>")
    .replaceAll("ऍड इटॅलिक ", "<em>")
    .replaceAll("अँड इटॅलिक ", "</em>")
    .replaceAll("एन्ड इटॅलिक ", "</em>")
    .replaceAll("ऍड अंडरलाईन ", "<u>")
    .replaceAll("अँड अंडरलाईन ", "</u>")
    .replaceAll("एन्ड अंडरलाईन ", "</u>")
    .replaceAll("ऍड स्ट्राईक ", "<s>")
    .replaceAll("अँड स्ट्राईक ", "</s>")
    .replaceAll("एन्ड स्ट्राईक ", "</s>")
    .replaceAll("ऍड सब ", "<sub>")
    .replaceAll("अँड सब ", "</sub>")
    .replaceAll("एन्ड सब ", "</sub>")
    .replaceAll("ऍड सुपर ", "<sup>")
    .replaceAll("अँड सुपर ", "</sup>")
    .replaceAll("एन्ड सुपर ", "</sup>")
    .replaceAll("ऍड सूपर ", "<sup>")
    .replaceAll("अँड सूपर ", "<sup>")
    .replaceAll("एन्ड सूपर ", "<sup>")
  }

  return replacedwords;
}

let p;

function speechtoText() {

  if (!speechRecognition) {
    console.error("Speech Recognition API is not supported in this browser.");
    return;
  }

  recognition = new speechRecognition();
  recognition.lang = languageSelect.value;
  recognition.interimResults = true;
  recognition.continuous = true;
    
  let p = document.createElement("span");
  resultText.appendChild(p);

  recognition.addEventListener('result', (e) => {
    const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join('');

      let processedTranscript = handleTextTransformations(transcript);
      processedTranscript = wordConcat(processedTranscript, recognition.lang);
      
      let selectedFont = fontName.value;
      let selectedSize = fontSizeRef.value;  

      // insertTextAtCaret(resultText, processedTranscript, selectedFont, selectedSize);
      p.style.fontFamily = selectedFont;
      p.style.fontSize = selectedSize;
      p.innerHTML = processedTranscript;
    
  }); 

  recognition.onerror = (event) => {
      console.error("Error:" , event.error);
  };
}

start.addEventListener('click', function () {
  speechtoText();
  recognition.start();
});

stop.addEventListener('click', function(){
  if(recognition) {
    recognition.stop();
  }
});

}
