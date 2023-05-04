function odds(input){
 
    let words = input.toLowerCase().split(' ');
    let result = [];

    for (let w of words) {

        let occurences = words.filter(word => word === w).length;

        if (occurences % 2 !== 0 && !result.includes(w)) {
            result.push(w);
        }
    }

    console.log(result.join(' '));
}

odds('Cake IS SWEET is Soft CAKE sweet Food')