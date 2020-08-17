const input = document.getElementById('input');
const searchBtn = document.getElementById('searchBtn');
const searchResult = document.getElementById('searchResult');

const apiURL = 'https://api.lyrics.ovh';

//Songs search
function searchSongs(term) {
    fetch(`${apiURL}/suggest/${term}`)
        .then(res => res.json())
        .then(data => showData(data));
}





//show songs
function showData(data) {
    let output = '';
    data.data.forEach(song => {
        output += `
                <div id="singleLyrics" class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Album by <span>${song.artist.name}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button class="btn btn-success" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
                    </div>
                </div>
    `;
    });

    searchResult.innerHTML = `${output}`;
}


searchBtn.addEventListener('click', e => {
    const searchValue = input.value;
    if (!searchValue) {
        alert('Please type a SONG name first.')
    } else {
        searchSongs(searchValue);
    }
})


//get lyrics
searchResult.addEventListener('click', e => {
    const clickedElement = e.target;
    if (clickedElement.tagName == 'BUTTON') {
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');
        getLyrics(artist, songTitle);
    }
});


function getLyrics(artist, songTitle) {
    fetch(`${apiURL}/v1/${artist}/${songTitle}`)
        .then(res => res.json())
        .then(data => {
            const lyrics = data.lyrics.replace(/(\r\n\|\r|\n)/g, '<br>');
            document.getElementById('singleLyrics').innerHTML = `
            <div class="single-lyrics text-center">
                <button class="btn go-back">&lsaquo;</button>
                <h2 class="text-success mb-4">${artist} - ${songTitle}</h2>
                <pre class="lyric text-white">
                ${lyrics}
                </pre>
            </div>
            `;
        });
}












{/* <div class="individual-song">
    <p class="single-result"><strong>${song.title}</strong> Album by <strong>${song.artist.name}</strong> 
    <button id="GetLyricsBtn" class="btn btn-success GetLyrics" data-artist="${song.artist.name}" data-songTitle="${song.title}">Get Lyrics</button></p>
    </div> */}