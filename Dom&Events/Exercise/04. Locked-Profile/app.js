function lockedProfile() {
    let radioButtons = Array.from(document.querySelectorAll('input[type="radio"]'));
    let showMoreButtons = Array.from(document.querySelectorAll('button'));
    console.log(showMoreButtons[0].textContent);


    showMoreButtons[0].addEventListener('click', showHiddenData)
    showMoreButtons[1].addEventListener('click', showHiddenData)
    showMoreButtons[2].addEventListener('click', showHiddenData)

    function showHiddenData() {
        let hiddenUser1Fields = document.getElementById('user1HiddenFields');
        let hiddenUser2Fields = document.getElementById('user2HiddenFields');
        let hiddenUser3Fields = document.getElementById('user3HiddenFields');

        if (radioButtons[1].checked)
            switchDisplay(showMoreButtons[0], hiddenUser1Fields);
        if (radioButtons[3].checked)
            switchDisplay(showMoreButtons[1], hiddenUser2Fields);
        if (radioButtons[5].checked)
            switchDisplay(showMoreButtons[2], hiddenUser3Fields);
    }

    function switchDisplay(button, hiddenData) {
        hiddenData.style.display === 'block'
            ? hiddenData.style.display = 'none'
            : hiddenData.style.display = 'block';

        button.textContent === 'Hide it'
            ? button.textContent = 'Show more'
            : button.textContent = 'Hide it';
    }
}