const form = document.querySelector("form");
const resultDiv = document.querySelector(".result");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    getWordInfo(form.elements[0].value);
})

const getWordInfo = async (word) => {
    try {
        resultDiv.innerHTML = "Fetchig data....";
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        console.log(data);
        let definitions = data[0].meanings[0].definitions[0];
        resultDiv.innerHTML =
            `<h2><strong>word:</strong>${data[0].word}</h2>
<P><strong>pos:</strong>${data[0].meanings[0].partofSpeech}</P>
<P><strong>Meaning:</strong>${definitions.definition === undefined ? "not found" : definitions.definition}</p>
<P><strong>Example:</strong>${definitions.example === undefined ? "not found" : definitions.example}</p>
<P><strong>Antonym:</strong></P>

`
        // Fetching Antonym
        if (definitions.antonyms.length === 0)
            resultDiv.innerHTML += `<span> Not Found</span > `;
        else {
            for (let i = 0; i < definitions.antonyms.length; i++) {
                resultDiv.innerHTML += `< li > ${definitions.antonyms[i]}</li > `
            }
        }
        // Fetching synonym
        resultDiv.innerHTML += `<P> <strong>synonyms</strong></P > `;
        if (data[0].meanings[0].synonyms.length === 0)
            resultDiv.innerHTML += `<span> Not Found</span > `;
        else {
            for (i = 0; i < data[0].meanings[0].synonyms.length; i++)
                resultDiv.innerHTML += `<li> ${data[0].meanings[0].synonyms}</li > `;
        }


        // Addin Read More button
        resultDiv.innerHTML += `<p> <a href=${data[0].sourceUrls}><strong>Read More</strong></p>`;
    }


    catch (error) {
        resultDiv.innerHTML += '<P>sorry the word could not found</P>';
    }


};
