const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = []

fetch(endpoint).then(blob => blob.json()).then(data => cities.push(...data))

function numsCommas(x){
    console.log(x.toString().length)
    let str = x.toString().split('').reverse()
    let count= 0
   for(let i = 0; i < str.length;i++){
     count += 1
     if(count > 3){
       str.splice(i,0,',')
       count = 0
     }
   }
    return str.reverse().join('')
  }
  

function findMatch(wordToMatch, cities){
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi')
        return place.city.match(regex) || place.state.match(regex)
    })
}

function displayMatches(){
    const matchArr = findMatch(this.value,cities)
    const html = matchArr.map(place => {
        const regex = new RegExp(this.value, 'gi')
        const cityName = place.city.replace(regex, `<span class='hl'>${this.value}</span>`)
        const stateName = place.state.replace(regex, `<span class='hl'>${this.value}</span>`)
        return `
        <li>
            <span class='name'>${cityName}, ${stateName}</span>
            <span class='population'>${numsCommas(place.population)}</span>
        </li>
        `
    }).join('')
    suggestionsInput.innerHTML = html
}

const searchInput = document.querySelector('.search')
const suggestionsInput = document.querySelector('.suggestions')

searchInput.addEventListener('change',displayMatches)
searchInput.addEventListener('keyup',displayMatches)