const FRUITS = ['apple', 'mango', 'banana', 'orange', 'kiwi', 'apricot', 'pineapple']

// const getSuggestions = (key) => {
//     return FRUITS.filter(fruit => fruit.toLowerCase().includes(key))
// }

// utils
const debounce = (fn, delay = 500) => {
    let timer;
    return function () {
        let self = this;
        let args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => fn.apply(self, args), delay)
    }
}

const getResults = async (key) => {
    return new Promise((res, rej) => {
        setTimeout(() => res(FRUITS.filter(fruit => fruit.toLowerCase().includes(key))), 1000)
    })
}



const resetState = () => {
    suggestions.classList.remove('suggestions-show');
}

const renderDropdown = (data) => {
    const fragment = document.createDocumentFragment();
    data.forEach(item => {
        const elem = document.createElement("div");
        elem.innerHTML = item;
        elem.classList.add('item');
        elem.setAttribute('data-item',item);
        fragment.appendChild(elem)
    });
    suggestions.innerHTML = '';
    suggestions.appendChild(fragment);

}

// query selectors
const ip = document.getElementById('search');
const suggestions = document.getElementById('suggestions-wrapper');
const btn = document.getElementById('submit');


// handlers


const handleSearch = async (val) => {
    console.log({ val });
    const data = await getResults(val);
    console.log(data);
    if (data.length) {
        suggestions.classList.add('suggestions-show');
        renderDropdown(data);
    } else {
        suggestions.innerHTML = '';
    }
}




const handleInput = (event) => {
    const value = event.target.value;
    if (value) {
        handleSearch(value)
    } else {
        console.log('in else');
        resetState();
    }
}


const handleSelect = (event) => {
    console.log(event.target.dataset);
    const {item} = event.target.dataset;
    if(item){
        ip.value = item;
        resetState();
    }
}

(() => {
    ip.addEventListener('input', debounce(handleInput, 500));
    suggestions.addEventListener('click',handleSelect);
})()




// (() => {
//     ip.addEventListener('input', handleSearch)
// })();