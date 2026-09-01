import { findSite } from '@/services/settings.js'

const url = window.location.hostname
const site = findSite(url)

function ensurePurifyStyle() {
    let styleElement = document.getElementById('purify-css')
    if (!styleElement) {
        styleElement = document.createElement('style')
        styleElement.id = 'purify-css'
        document.head.appendChild(styleElement)
    }
    return styleElement
}

function applyEnabledOptions(modifications) {
    const styleElement = ensurePurifyStyle()
    styleElement.textContent = ''

    // Site master off: clear CSS only; removed DOM nodes need a reload to return.
    if (site.key in modifications && !modifications[site.key]) {
        return
    }

    for (let [key, option] of Object.entries(site.options)) {
        key = site.key + ':' + key

        if (!(key in modifications) || modifications[key]) {
            try {
                option.code()
            } catch (error) {
                console.error('Error applying option:', option.name, error)
            }
        }
    }
}

if (site) {
    ensurePurifyStyle()

    chrome.storage.sync.get('modifications').then((data) => {
        applyEnabledOptions(data.modifications || {})
    })

    chrome.storage.onChanged.addListener((changes, areaName) => {
        if (areaName !== 'sync' || !changes.modifications) return
        applyEnabledOptions(changes.modifications.newValue || {})
    })
}
