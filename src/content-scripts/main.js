import settings from '@/services/settings.js'

const url = window.location.hostname

console.log('Site to Purify:', url)

if (settings.sites[url]?.enabled) {
  Object.entries(settings.sites[url].options).forEach(([key, value]) => {

    if (value.enabled) {
      console.log('Applying option:', key)

      try {
        value.code()
      } catch (error) {
        console.error('Error:', error)
      }
    }
  })
}
