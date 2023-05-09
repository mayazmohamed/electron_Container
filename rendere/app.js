let { ipcRenderer } = require('electron')
let showModal = document.getElementById('show-modal'),
    itemUrl = document.getElementById('url'),
    closeModal = document.getElementById('close-modal'),
    addItem = document.getElementById('add-item'),
    modal = document.getElementById('modal'),
    search = document.getElementById('search')
    deleteItem = document.getElementsByClassName('delete-item')

items = require('./items')

search.addEventListener('keyup', e => {
    Array.from(document.getElementsByClassName('read-item')).forEach(item => {
        let hasMatch = item.innerText.toLowerCase().includes(search.value)
        item.style.display = hasMatch ? 'flex' : 'none'
    })
})

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Enter'){
        items.changeSelection(e.key)
    }
})

let toggelButtons = () => {
    if (addItem.disabled) {
        addItem.disabled = false
        addItem.style.opacity = 1
        addItem.innerText = 'Add Item'
        closeModal.style.display = 'inline'
    }
    else {
        addItem.disabled = true
        addItem.style.opacity = 0.5
        addItem.innerText = 'Adding ...'
        closeModal.style.display = 'none'
    }

}

// deleteItem.addEventListener('click', e => {

    // if (e.target.classList.contains('delete-item')){
    //     let index = e.target.getAttribute('data-index')
    //     console.log("index")
    //     items.storage.splice(index, 1)
    //     items.save()
    //     e.target.parentNode.remove()
    // }
// })

showModal.addEventListener('click', e => {
    modal.style.display = 'flex';
    itemUrl.focus()
})


closeModal.addEventListener('click', e => {
    modal.style.display = 'none'
})

addItem.addEventListener('click', e => {
    if (itemUrl.value){
        ipcRenderer.send('new-item', itemUrl.value)
        toggelButtons()
    }
})

ipcRenderer.on('send-item', (e, data) =>{
    
    items.addItems(data, true)

    toggelButtons()
    modal.style.display = 'none'
    itemUrl.value = null 

})

itemUrl.addEventListener('keyup', e => {
    if (e.key === 'Enter')
        addItem.click();
})