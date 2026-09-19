import { findSite, getGlobalSite } from '@/services/settings.js'

const url = window.location.hostname
const site = findSite(url)
const globalSite = getGlobalSite()

function ensurePurifyStyle() {
    let styleElement = document.getElementById('purify-css')
    if (!styleElement) {
        styleElement = document.createElement('style')
        styleElement.id = 'purify-css'
        document.head.appendChild(styleElement)
    }
    return styleElement
}

function applySiteOptions(target, modifications) {
    if (!target) return

    // Site master off: skip this site's options (CSS already cleared for the run).
    if (target.key in modifications && !modifications[target.key]) {
        return
    }

    for (let [key, option] of Object.entries(target.options || {})) {
        key = target.key + ':' + key

        if (!(key in modifications) || modifications[key]) {
            try {
                option.code()
            } catch (error) {
                console.error('Error applying option:', option.name, error)
            }
        }
    }
}

function appendCustomCss(target, cssMap) {
    if (!target) return
    const css = cssMap[target.key]
    if (typeof css !== 'string' || !css.trim()) return
    const styleElement = ensurePurifyStyle()
    styleElement.textContent += `\n/* purify custom: ${target.key} */\n${css}`
}

function applyEnabledOptions(modifications, cssMap) {
    const styleElement = ensurePurifyStyle()
    styleElement.textContent = ''

    const globalOn = !(globalSite.key in modifications) || !!modifications[globalSite.key]
    applySiteOptions(globalSite, modifications)
    if (globalOn) appendCustomCss(globalSite, cssMap)

    if (site) {
        const siteOn = !(site.key in modifications) || !!modifications[site.key]
        applySiteOptions(site, modifications)
        if (siteOn) appendCustomCss(site, cssMap)
    }
}

function cssKeys() {
    const keys = [`css:${globalSite.key}`]
    if (site) keys.push(`css:${site.key}`)
    return keys
}

function readCssMap(data) {
    const map = {}
    for (const key of cssKeys()) {
        const siteKey = key.slice(4)
        const value = data[key]
        if (typeof value === 'string') map[siteKey] = value
    }
    return map
}

async function loadAndApply() {
    const data = await chrome.storage.sync.get(['modifications', ...cssKeys()])
    applyEnabledOptions(data.modifications || {}, readCssMap(data))
}

ensurePurifyStyle()
loadAndApply()

chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== 'sync') return
    const touched =
        changes.modifications ||
        Object.keys(changes).some((k) => k === `css:${globalSite.key}` || (site && k === `css:${site.key}`))
    if (!touched) return
    loadAndApply()
})
