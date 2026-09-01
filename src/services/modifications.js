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
