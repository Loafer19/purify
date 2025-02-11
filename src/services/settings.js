import { reactive } from 'vue'

export default reactive({
  sites: {
    'www.chess.com': {
      name: 'Chess.com',
      enabled: true,
      options: {
        hideAds: {
          name: 'Hide Ads',
          enabled: true,
          type: 'toogle',
          default: true,
          code: () => {
            document.querySelectorAll('[class*=\'-ad\'').forEach(e => e.remove())
            document.getElementById('checkmate').remove()
          } 
        }
      }
    },
    'x.com': {
      name: 'X - Twitter',
      enabled: true,
      options: {
        hideAds: {
          name: 'Hide Ads',
          enabled: true,
          type: 'toogle',
          default: true,
          code: () => {
            document.querySelector('[href="/i/verified-orgs-signup"]').remove()
            document.querySelector('[href="/compose/post"]').parentElement.remove()
          }
        }
      }
    }
  }
})
