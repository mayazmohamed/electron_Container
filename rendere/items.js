const fs = require('fs')

let items = document.getElementById('items')
let readerJS

fs.readFile(`${__dirname}/readerJS.js`, (err, data) => {
    readerJS = data.toString()
})

exports.storage = JSON.parse(localStorage.getItem('readit-items')) || []

exports.save = () => {
    localStorage.setItem('readit-items', JSON.stringify(this.storage))
}

exports.select = e => {
    document.getElementsByClassName('read-item selected')[0].classList.remove('selected')
    e.currentTarget.classList.add('selected')
}

exports.open = () => {
    if (!this.storage.length) return

    let selectedItem = document.getElementsByClassName('read-item selected')[0]
    let contentUrl = selectedItem.dataset.url
    
    let readerWin = window.open(contentUrl, '', `
        maxWidth=2000,
        maxHeight=2000,
        width=1200,
        height=800,
        backgroundColor=#DEDEDE,
        nodeIntegration=0,
        contextIsolation=1
    `)

    readerWin.eval(readerJS)
}


exports.changeSelection = direction => {
    let currentItem = document.getElementsByClassName('read-item selected')[0]
    if (direction === 'ArrowUp' && currentItem.previousElementSibling){
        currentItem.classList.remove('selected')
        currentItem.previousElementSibling.classList.add('selected')
    }
    else if (direction === 'ArrowDown' && currentItem.nextElementSibling){
        currentItem.classList.remove('selected')
        currentItem.nextElementSibling.classList.add('selected')
    }
    else if (direction === 'Enter'){
        this.open()
    }
}

exports.addItems = (item, isnew = false) => {
    let itemnode = document.createElement('div')

    itemnode.setAttribute('class', 'read-item')

    itemnode.innerHTML = `<img src="${item.screenshot}"><h2>${item.title}</h2> <button class="delete-item">X</button>`
    items.appendChild(itemnode)

    itemnode.setAttribute('data-url', item.url)

    itemnode.addEventListener('dblclick', this.open)
    // itemnode.addEventListener('keyup', e => {
    //     if (e.key === 'Enter') this.open()
    // })

    itemnode.addEventListener('click', this.select)

    if (document.getElementsByClassName('read-item').length === 1){
        itemnode.classList.add('selected')
    }

    if (isnew){
        this.storage.push(item)
        this.save()
    }
}

this.storage.forEach(item => {
    this.addItems(item, false)
})