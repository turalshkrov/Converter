let leftBtn = document.querySelector('#left-btn');
let rightBtn = document.querySelector('#right-btn');
let leftInput = document.querySelector('#l-input');
let rightInput = document.querySelector('#r-input');
let leftInputText = document.querySelector('#l-input-text');
let rightInputText = document.querySelector('#r-input-text');
let url = 'https://api.exchangerate.host/latest';
let cur1 = 'RUB';
let cur2 = 'USD';
let rate;

getRates('RUB', 'USD');

leftBtn.addEventListener('click', async e => {
    btnColorChange(e);
    cur1 = e.target.innerText;
    await getRates(cur1, cur2);
    rightInput.value = leftInput.value * rate;
    leftInputText.innerText = `1 ${cur1} = ${rate} ${cur2}`;
    rightInputText.innerText = `1 ${cur2} = ${Math.round(1 / rate * 10000) / 10000} ${cur1}`;
})
rightBtn.addEventListener('click', async e => {
    btnColorChange(e);
    cur2 = e.target.innerText;
    await getRates(cur1, cur2);
    rightInput.value = leftInput.value * rate;
    leftInputText.innerText = `1 ${cur1} = ${rate} ${cur2}`;
    rightInputText.innerText = `1 ${cur2} = ${Math.round(1 / rate * 10000) / 10000} ${cur1}`;
})
leftInput.addEventListener('keyup', e => {
    convert(e);
})
rightInput.addEventListener('keyup', e => {
    convert(e);
})

function convert(e) {
    if (e.target.id == 'l-input') {
        rightInput.value = e.target.value * rate;
    }
    else {
        leftInput.value = e.target.value * Math.round(1 / rate * 10000) / 10000;
    }
}

function btnColorChange(e) {
    for (let i = 0; i < 4; i++) {
        e.target.parentElement.children[i].className = 'cur-btn';
    }
    e.target.className = 'cur-btn cur-btn-active';
}

async function getRates(cur1, cur2) {
    const data = await fetch(`${url}?base=${cur1}&symbols=${cur2}`);
    const res = await data.json();
    rate = Math.round(res.rates[cur2] * 10000) / 10000;
}
