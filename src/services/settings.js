import { reactive } from 'vue'

export default reactive({
    sites: {
        'binomo.com': {
            name: 'Binomo',
            key: 'binomo',
            options: {
                addKeyboardSupport: {
                    name: 'Add keyboard support',
                    code: () => {
                        const controls = {
                            ArrowUp: () => document.getElementById('qa_trading_dealUpButton').click(),
                            ArrowDown: () => document.getElementById('qa_trading_dealDownButton').click(),
                            ArrowLeft: () => document.querySelectorAll('.input-counters vui-button')[0].click(),
                            ArrowRight: () => document.querySelectorAll('.input-counters vui-button')[1].click(),
                        }

                        document.addEventListener('keydown', (e) => controls[e.key]())
                    },
                },
            },
        },
        'www.chess.com': {
            name: 'Chess.com',
            key: 'chess',
            options: {
                hideAds: {
                    name: 'Hide Ads',
                    code: () => {
                        document.querySelectorAll("[class*='-ad'").forEach((e) => e.remove())
                        document.getElementById('checkmate').remove()
                    },
                },
            },
        },
        'www.youtube.com': {
            name: 'YouTube',
            key: 'youtube',
            options: {
                hideUseless: {
                    name: 'Hide Useless',
                    code: () => {
                        const style = document.createElement('style')
                        style.innerHTML = `
                            #buttons ytd-button-renderer,
                            ytd-feed-filter-chip-bar-renderer,
                            #guide-inner-content #section-items ytd-guide-entry-renderer:nth-child(3),
                            #guide-inner-content #section-items ytd-guide-entry-renderer:nth-child(7),
                            #guide-inner-content #sections ytd-guide-section-renderer:nth-child(n+3),
                            ytd-guide-signin-promo-renderer,
                            #guide-inner-content #footer {
                                display: none !important;
                            }
                        `
                        document.head.appendChild(style)
                    },
                },
            },
        },
        'x.com': {
            name: 'X - Twitter',
            key: 'x',
            options: {
                hideNavigation: {
                    name: 'Hide Navigation Items',
                    code: () => {
                        const style = document.getElementById('purify-css')
                        style.innerHTML =
                            style.innerHTML +
                            `
                                div:has(> h1[role="heading"]),
                                [href="/explore"],
                                [href="/jobs"],
                                [aria-label="Спільноти"],
                                [aria-label="Communities"],
                                [href="/compose/post"],
                                [data-testid="AppTabBar_More_Menu"] {
                                    display: none !important;
                                }
                            `
                    },
                },
                hidePremiumPrompts: {
                    name: 'Hide Premium Prompts',
                    code: () => {
                        const style = document.getElementById('purify-css')
                        style.innerHTML =
                            style.innerHTML +
                            `
                                [href="/i/premium_sign_up"],
                                [href="/i/premium"],
                                [href="/i/verified-orgs-signup"],
                                [aria-label="Списки"],
                                [aria-label="Lists"],
                                [href="/compose/articles"],
                                [data-testid="SideNav_AccountSwitcher_Button"] {
                                    display: none !important;
                                }
                            `
                    },
                },
                hideGrok: {
                    name: 'Hide Grok',
                    code: () => {
                        const style = document.getElementById('purify-css')
                        style.innerHTML =
                            style.innerHTML +
                            `
                                div:has(> [role="complementary"]),
                                [aria-label="Нижній колонтитул"],
                                [href="/i/grok"],
                                [data-testid="GrokDrawer"] {
                                    display: none !important;
                                }
                            `
                    },
                },
            },
        },
    },
})
