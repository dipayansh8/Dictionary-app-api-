const form = document.querySelector("form");
const resultDiv = document.querySelector(".result");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    getWordInfo(form.elements[0].value);
})

const getWordInfo = async (word) => {
    try {
        resultDiv.innerHTML = "Fetching Data....."
        // alert("word" + word);
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        console.log(data);
        let definitions = data[0].meanings[0].definitions[0];
        resultDiv.innerHTML = `
    <h2><strong> Word:</strong>${data[0].word}</h2>
    <p>${data[0].meanings[0].partofSpeech}</P>
    <P><strong> Meaning:</strong>${definitions.definition === undefined ? "Not Found" : definitions.definition}</p>
    <P><strong> Example:</strong>${definitions.example === undefined ? "Not Found" : definitions.example}</p>
    <p><strong>Antonyms</strong></p>
    
    `;
        // Fetching Antonym
        if (definitions.antonyms.length === 0)
            resultDiv.innerHTML += `<span>Not Found</span>`;
        else {
            for (let i = 0; i < definitions.antonyms.length; i++) {
                resultDiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`
            }
        }
        resultDiv.innerHTML += `<p><strong>synonyms</strong></p>`;
        if (data[0].meanings[0].synonyms.length === 0)
            resultDiv.innerHTML += `<span>Not Found</span>`;
        else {
            for (let i = 0; i < data[0].meanings[0].synonyms.length; i++) {
                resultDiv.innerHTML += `<li>${data[0].meanings[0].synonyms[i]}</li>`
            }
        }


        // Addin Read More button
        resultDiv.innerHTML += `<div><a href =${data[0].sourceUrls}"target=_blank">Read More</a></div>`
    }

    catch (error) {
        resultDiv.innerHTML = `<p> Sorry , the word could not be found</P>`;

    }


};
// Task To Do -Fetch synonyms as we have done for antonym
