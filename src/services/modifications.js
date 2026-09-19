export async function loadModifications() {
    const data = await chrome.storage.sync.get('modifications')
    return data.modifications || {}
}

export async function saveModifications(mods) {
    await chrome.storage.sync.set({ modifications: mods })
}

/** Missing keys default to enabled. */
export function isEnabled(mods, key) {
    return !(key in mods) || !!mods[key]
}

/** Mutates `mods`, persists, and returns the same object. */
export async function setModification(mods, key, value) {
    mods[key] = value
    await saveModifications(mods)
    return mods
}

/** Sync key for per-site custom CSS (own item → ~8 KB budget each). */
export function customCssStorageKey(siteKey) {
    return `css:${siteKey}`
}

export async function loadCustomCss(siteKey) {
    const key = customCssStorageKey(siteKey)
    const data = await chrome.storage.sync.get(key)
    const value = data[key]
    return typeof value === 'string' ? value : ''
}

/** Persist custom CSS. Empty string removes the key to free sync quota. */
export async function saveCustomCss(siteKey, css) {
    const key = customCssStorageKey(siteKey)
    const trimmed = typeof css === 'string' ? css : ''
    if (!trimmed.trim()) {
        await chrome.storage.sync.remove(key)
        return ''
    }
    await chrome.storage.sync.set({ [key]: trimmed })
    return trimmed
}

/** Soft warning threshold; chrome.storage.sync item cap is 8192 bytes. */
export const CUSTOM_CSS_SOFT_LIMIT = 7000
