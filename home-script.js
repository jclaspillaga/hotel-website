let currentActiveIndex = 1

function setActive() {
    let previousActiveIndex = currentActiveIndex
    if (currentActiveIndex >= 3) {
        currentActiveIndex = 1
    } else {
        currentActiveIndex++
    }
    let previousActiveImages = document.querySelectorAll('.active')
    let currentActiveImages = document.querySelectorAll(`.img${currentActiveIndex}`)
    previousActiveImages.forEach(image => image.className = `img${previousActiveIndex}`)
    currentActiveImages.forEach(image => image.className = `active img${currentActiveIndex}`)
}

setInterval(setActive, 3000)





