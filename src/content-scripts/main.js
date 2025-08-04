import settings from '@/services/settings.js'

const url = window.location.hostname
const site = settings.sites[url]

if (site) {
    console.log('Site to Purify:', url)

    const styleElement = document.createElement('style')
    styleElement.id = 'purify-css'
    document.head.appendChild(styleElement)

    chrome.storage.sync.get('modifications').then((data) => {
        const modifications = data.modifications || {}

        if (!(site.key in modifications) || modifications[site.key]) {
            for (let [key, option] of Object.entries(site.options)) {
                key = site.key + ':' + key

                if (!(key in modifications) || modifications[key]) {
                    console.log('Applying option:', option.name)

                    try {
                        option.code()
                    } catch (error) {
                        console.error('Error applying option:', option.name, error)
                    }
                }
            }
        }
    })
}
