var searchForm = document.querySelector("#searchForm");

function handleSearchSubmit(event) {
    event.preventDefault();
    var searchInputVal = document.querySelector ('#userInput').value;
    console.log("city name", searchInputVal);

    if (!searchInputVal) {
        console.error('You need a search input value!');
        console.log(console.error);
        return;
    }
    var queryString = './search-results.html?q=' + searchInputVal;
    location.assign(queryString);
}

searchForm.addEventListener('submit', handleSearchSubmit);