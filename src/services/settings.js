const sites = {
    'binomo.com': {
        name: 'Binomo',
        key: 'binomo',
        hosts: ['binomo.com', 'www.binomo.com'],
        description:
            'Adds keyboard shortcuts for trading actions so you can place deals and adjust amounts without reaching for the mouse.',
        highlights: [
            'Arrow keys for up/down deals',
            'Adjust trade amount from the keyboard',
            'Works on binomo.com and www.binomo.com',
        ],
        options: {
            addKeyboardSupport: {
                name: 'Add keyboard support',
                hint: 'Map arrow keys to deal and amount controls',
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
        hosts: ['www.chess.com', 'chess.com'],
        description: 'Clears advertising and promotional overlays so you can focus on the board and your games.',
        highlights: ['Removes ad containers', 'Drops the checkmate promo overlay', 'Keeps gameplay UI intact'],
        screenshot: 'screenshots/chess.com.jpg',
        options: {
            hideAds: {
                name: 'Hide Ads',
                hint: 'Strip ad blocks and promo overlays from the page',
                code: () => {
                    document.querySelectorAll("[class*='-ad']").forEach((e) => e.remove())
                    document.getElementById('checkmate')?.remove()
                },
            },
        },
    },
    'www.youtube.com': {
        name: 'YouTube',
        key: 'youtube',
        hosts: ['www.youtube.com', 'youtube.com', 'm.youtube.com'],
        description: 'Hides clutter in the guide and feed chrome so watching and searching stay front and center.',
        highlights: [
            'Hides unused guide sections and promo blocks',
            'Simplifies header and chip bar chrome',
            'Works on desktop and m.youtube.com',
        ],
        screenshot: 'screenshots/youtube.com.jpg',
        options: {
            hideUseless: {
                name: 'Hide Useless',
                hint: 'Hide guide promo sections, chip bar, and extra header buttons',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML =
                        style.innerHTML +
                        `
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
                },
            },
        },
    },
    'x.com': {
        name: 'X - Twitter',
        key: 'x',
        hosts: ['x.com', 'www.x.com', 'twitter.com', 'www.twitter.com'],
        description: 'Trims navigation chrome, premium upsells, and Grok so the timeline stays readable.',
        highlights: [
            'Hide explore, jobs, and other nav clutter',
            'Remove Premium and Lists prompts',
            'Optional Grok and complementary panel hiding',
        ],
        screenshot: 'screenshots/x.com.jpg',
        options: {
            hideNavigation: {
                name: 'Hide Navigation Items',
                hint: 'Hide explore, jobs, communities, compose, and more menu',
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
                hint: 'Hide Premium, verified orgs, lists, and account switcher prompts',
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
                hint: 'Hide Grok entry points and complementary panels',
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
    'www.twitch.tv': {
        name: 'Twitch',
        key: 'twitch',
        hosts: ['www.twitch.tv', 'twitch.tv', 'm.twitch.tv'],
        description:
            'Cuts recommendation shelves and promo chrome so browsing and watching stay focused on the stream.',
        highlights: [
            'Hide sidebar / home recommendations + Viewers Also Watch',
            'Hide Prime (and the red count pill), Bits, and gift upsells',
            'Optional stream chrome: share, cheer, pinned notices, goals',
        ],
        screenshot: 'screenshots/twitch.tv.jpg',
        options: {
            hideRecommended: {
                name: 'Hide Recommended',
                hint: 'Sidebar recommendations, “Viewers Also Watch”, and home shelves',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML =
                        style.innerHTML +
                        `
                                [aria-label="Recommended Channels"],
                                [aria-label="Recommended Categories"],
                                [aria-label="Recommended Live Channels"],
                                [aria-label*="Recommended Channels"],
                                [aria-label*="Recommended Categories"] {
                                    display: none !important;
                                }
                            `

                    // Guest "Live Channels" + stream-page "Viewers Also Watch".
                    document
                        .querySelectorAll('nav[aria-label="Left Navigation"] h3, .side-nav-section h3')
                        .forEach((h) => {
                            const text = (h.textContent || '').trim()
                            if (/^(live channels|recommended)/i.test(text) || /viewers also watch/i.test(text)) {
                                const section = h.closest('.side-nav-section') || h.parentElement
                                section?.style.setProperty('display', 'none', 'important')
                            }
                        })

                    // Home shelves titled “…we think you’ll like”.
                    document.querySelectorAll('h2').forEach((h) => {
                        if (!/we think you/i.test(h.textContent || '')) return
                        let node = h.parentElement
                        for (let i = 0; i < 6 && node; i++) {
                            const categoryLinks = node.querySelectorAll("a[href*='/directory/category/']").length
                            if (categoryLinks >= 3) {
                                node.style.setProperty('display', 'none', 'important')
                                break
                            }
                            node = node.parentElement
                        }
                    })
                },
            },
            hidePromos: {
                name: 'Hide Promos',
                hint: 'Prime offers (and the red count pill), Bits, gift, sticky upsells',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML =
                        style.innerHTML +
                        `
                                .prime-offers,
                                .prime-offers__pill,
                                button[data-a-target="prime-offers-icon"],
                                button[aria-label="Prime offers"],
                                button[data-a-target="top-nav-get-bits-button"],
                                button[data-a-target="gift-button"],
                                button[aria-label="Gift a Sub"],
                                button[data-a-target="bits-button"],
                                [aria-label="Bits and Points Balances"],
                                footer#twilight-sticky-footer-root,
                                .tc-upsell,
                                .tc-upsell__title,
                                .tc-upsell__button,
                                div[aria-label="Gift sub discount promotion"],
                                div:has(> .subtember-gradient),
                                .subtember-gradient {
                                    display: none !important;
                                }
                            `
                },
            },
            hideExtraChrome: {
                name: 'Hide Extra Chrome',
                hint: 'Stream share/cheer, pinned notices, stories, upcoming, leaderboards',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML =
                        style.innerHTML +
                        `
                                [class*="storiesLeftNav"],
                                button[data-a-target="share-button"],
                                button[aria-label="Share"],
                                button[aria-label="Cheer"],
                                button[aria-label*="Leaderboard"],
                                [aria-label*="Gifters Leaderboard"],
                                .happening-now-notification,
                                .extensions-notifications,
                                header[aria-label="Upcoming Streams"],
                                h2[data-a-target="upcoming-streams-header"],
                                header:has(h2[data-a-target="upcoming-streams-header"]),
                                div[data-test-selector="channel-skins-shared-above-chat-v3"],
                                div:has(> button[aria-label="BONUS SUBS"]),
                                div:has(> div > div > button[aria-label="Previous leaderboard set"]),
                                div:has(> div > div > button[aria-label="Next leaderboard set"]) {
                                    display: none !important;
                                }
                            `

                    // Channel goal trackers under About (follow/sub counters).
                    document.querySelectorAll('h3').forEach((h) => {
                        if (!/goals?/i.test(h.textContent || '')) return
                        const panel = h.closest('[class*="about"], section, div')
                        panel?.style.setProperty('display', 'none', 'important')
                    })
                },
            },
        },
    },
}

export function findSite(hostname) {
    const host = String(hostname || '').toLowerCase()
    if (!host) return undefined

    if (sites[host]) return sites[host]

    return Object.values(sites).find((site) => site.hosts?.some((h) => h.toLowerCase() === host))
}

export function sitesList() {
    return Object.values(sites)
}

export default { sites }
