import settings from '@/services/settings.js'

const url = window.location.hostname
const site = settings.sites[url]

console.log('Site to Purify:', url)

chrome.storage.sync.get('modifications').then((data) => {
  const modifications = data.modifications || {}

  if (!(site.key in modifications) || modifications[site.key]) {
    Object.entries(site.options).forEach(([key, option]) => {
      key = site.key +':'+ key

      if (!(key in modifications) || modifications[key]) {
        console.log('Applying option:', option.name)
  
        try {
          option.code()
        } catch (error) {
          console.error('Error:', error)
        }
      }
    })
  }
})
