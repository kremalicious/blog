//=include exif-js/exif.js

window.onload = getExif;

function getExif() {
    const image = document.querySelector('.hentry__teaser img')
    const imageFileName = image.getAttribute('src').split('/').slice(-1)[0]

    const img = new Image()   // Create new img element
    img.src = `/media/${imageFileName}`
    img.addEventListener('load', function () {
        EXIF.getData(img, function () {
            var make = EXIF.getTag(this, 'Make')
            var model = EXIF.getTag(this, 'Model')
            var makeAndModel = document.querySelector('.exif__make')
            makeAndModel.innerHTML = `${make} ${model}`

            console.log(make)
            console.log(model)
        })
    }, false)
}
