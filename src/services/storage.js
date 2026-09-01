const local = globalThis.chrome?.storage?.local

const memory = new Map()

function readFallback(keys) {
    const list = Array.isArray(keys) ? keys : Object.keys(keys)
    const result = {}

    for (const key of list) {
        if (memory.has(key)) {
            result[key] = memory.get(key)
            continue
        }

        try {
            const raw = localStorage.getItem(`ext:${key}`)
            result[key] = raw == null ? undefined : JSON.parse(raw)
        } catch {
            result[key] = undefined
        }
    }

    return result
}

function writeFallback(items) {
    for (const [key, value] of Object.entries(items)) {
        memory.set(key, value)

        try {
            localStorage.setItem(`ext:${key}`, JSON.stringify(value))
        } catch {
            // ignore quota / private mode
        }
    }
}

function removeFallback(keys) {
    const list = Array.isArray(keys) ? keys : [keys]

    for (const key of list) {
        memory.delete(key)

        try {
            localStorage.removeItem(`ext:${key}`)
        } catch {
            // ignore
        }
    }
}

export function storageGet(keys) {
    return new Promise((resolve) => {
        if (!local) {
            resolve(readFallback(keys))
            return
        }

        local.get(keys, (result) => resolve(result ?? {}))
    })
}

export function storageSet(items) {
    return new Promise((resolve) => {
        if (!local) {
            writeFallback(items)
            resolve()
            return
        }

        local.set(items, () => resolve())
    })
}

export function storageRemove(keys) {
    return new Promise((resolve) => {
        if (!local) {
            removeFallback(keys)
            resolve()
            return
        }

        local.remove(keys, () => resolve())
    })
}
