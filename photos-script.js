const filter = document.querySelector('.filter')
let filterVisible = false

function focus(e) {
    window.scrollTo(0, 0)
    filter.style.display = 'flex'
    let image = document.querySelector('.focused-image')
    image.src = e.target.src
    image.id = `p${100 + parseInt(e.target.id.substring(1))}`
    filterVisible = true
}

function changeFocus() {
    window.scrollTo(0, 0)
    focusedImage = document.querySelector('.focused-image')
    currentIndex = parseInt(focusedImage.id.substring(1))
    newIndex = currentIndex < 111 ? currentIndex - 99 : 0
    focusedImage.src = document.getElementById(`p${newIndex}`).src
    focusedImage.id = `p${100+newIndex}`
}

function hideFilter() {
    if (filterVisible) {
        if (window.scrollY >= document.querySelector('.focused-image').getClientRects()[0].bottom) {
                filter.style.display = 'none'
                filterVisible = false
        }
    }
}

const photos = document.querySelectorAll('.photo')

photos.forEach(photo => photo.addEventListener('click', focus))
photos.forEach((photo, i) => photo.id = `p${i}`)

filter.addEventListener('click', (e) => {
            if (e.target !== filter) {
                return
            } else {
                filter.style.display = 'none'
                filterVisible = false
            }
        }
    )
document.querySelector('.focused-image').addEventListener('click', changeFocus)

window.addEventListener('scroll', hideFilter)
