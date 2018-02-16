/* global EXIF */

/* eslint-disable spaced-comment */
//=include exif-js/exif.js
/* eslint-enable spaced-comment */

window.addEventListener('load', getExif, false)

function getExif() {
    const image = document.querySelector('.hentry__teaser img')

    EXIF.getData(image, function () {
        // Get individual data
        const modelvalue = EXIF.getTag(this, 'Model')
        const shutterspeedvalue = EXIF.getTag(this, 'ExposureTime')
        const aperturevalue = EXIF.getTag(this, 'FNumber')
        const exposurevalue = EXIF.getTag(this, 'ExposureBias')
        const isovalue = EXIF.getTag(this, 'ISOSpeedRatings')
        const focallengthvalue = EXIF.getTag(this, 'FocalLength')

        // Inject data
        if (modelvalue) {
            const model = document.querySelector('.exif__model')
            model.innerHTML = modelvalue
        }

        if (shutterspeedvalue) {
            const shutterspeed = document.querySelector('.exif__shutterspeed')
            shutterspeed.innerHTML = `${shutterspeedvalue.numerator}/${shutterspeedvalue.denominator}s`
        }

        if (aperturevalue) {
            const aperture = document.querySelector('.exif__aperture')
            aperture.innerHTML = `ƒ ${aperturevalue}`
        }

        if (exposurevalue || exposurevalue === 0) {
            const exposure = document.querySelector('.exif__exposure')

            if (exposurevalue === 0) {
                exposure.innerHTML = `+/- ${exposurevalue}`
            } else if (exposurevalue > 0) {
                exposure.innerHTML = `+ ${exposurevalue}`
            } else {
                exposure.innerHTML = `- ${exposurevalue}`
            }
        }

        if (isovalue) {
            const iso = document.querySelector('.exif__iso')
            iso.innerHTML = `ISO ${isovalue}`
        }

        if (focallengthvalue) {
            const focallength = document.querySelector('.exif__focallength')
            focallength.innerHTML = `${focallengthvalue}mm`
        }
    })
}
