function wordTracker(input) {
 let wordsToFind = input.shift().split(' ');
 let keyWords = {};

 for (const word of wordsToFind) {
    keyWords[word] = 0;
 }

 for (const word of input) {
    if (keyWords.hasOwnProperty(word)) {
        keyWords[word]++;
    }
 }


 let sorted = Object.entries(keyWords).sort((a,b) => b[1] - a[1]);
 sorted.forEach((words) => console.log(`${words[0]} - ${words[1]}`));
}

wordTracker(
    [
        'is the', 
        'first', 'sentence', 'Here', 'is', 'another', 'the', 'And', 'finally', 'the', 'the', 'sentence']
        
)