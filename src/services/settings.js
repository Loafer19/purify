const sites = {
    __global__: {
        name: 'Global',
        key: 'global',
        global: true,
        hosts: [],
        description:
            'Runs on every page: cookie banners, newsletter modals, chat widgets, app bars, and floating share buttons — alongside per-site rules.',
        highlights: [
            'Works on all sites alongside per-site rules',
            'Cookie / consent banners and newsletter dialogs',
            'Chat widgets, sticky app bars, floating share buttons',
        ],
        options: {
            hideCookieBanners: {
                name: 'Hide cookie banners',
                hint: 'Hide common GDPR / consent banners and overlays',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        #onetrust-banner-sdk,
                        #onetrust-consent-sdk,
                        #ot-sdk-btn-floating,
                        .ot-sdk-container,
                        #CybotCookiebotDialog,
                        #CybotCookiebotDialogBodyUnderlay,
                        .cc-window,
                        .cc-banner,
                        .cm-overlay,
                        .qc-cmp2-container,
                        .qc-cmp-ui-container,
                        #qc-cmp2-container,
                        .fc-consent-root,
                        .fc-dialog-overlay,
                        #sp_message_container,
                        .sp_veil,
                        [id*="cookie-banner" i],
                        [id*="cookie_banner" i],
                        [class*="cookie-banner" i],
                        [class*="cookie_banner" i],
                        [class*="CookieBanner"],
                        [aria-label*="cookie" i][role="dialog"],
                        [aria-label*="consent" i][role="dialog"],
                        div[class*="consent-banner" i],
                        div[class*="consent_banner" i] {
                            display: none !important;
                        }
                        body.ot-overlay,
                        html.cx-modal-open {
                            overflow: auto !important;
                        }
                    `
                },
            },
            hideNewsletterModals: {
                name: 'Hide newsletter modals',
                hint: 'Hide common subscribe / newsletter dialogs and dimmed backdrops',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        [class*="newsletter-modal" i],
                        [class*="newsletter_modal" i],
                        [class*="NewsletterModal"],
                        [class*="email-signup" i],
                        [class*="email_signup" i],
                        [id*="newsletter-modal" i],
                        [id*="newsletter_popup" i],
                        [class*="subscribe-modal" i],
                        [class*="signup-modal" i],
                        .modal-newsletter,
                        .newsletter-overlay,
                        [aria-label*="newsletter" i][role="dialog"],
                        [aria-label*="subscribe" i][role="dialog"],
                        [aria-modal="true"][class*="newsletter" i],
                        [aria-modal="true"][class*="subscribe" i] {
                            display: none !important;
                        }
                    `
                },
            },
            hideChatWidgets: {
                name: 'Hide chat widgets',
                hint: 'Intercom, Drift, Zendesk, HubSpot, and similar messenger bubbles',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        #intercom-container,
                        .intercom-lightweight-app,
                        .intercom-launcher-frame,
                        #hubspot-messages-iframe-container,
                        #hubspot-messages-iframe-container iframe,
                        iframe#hubspot-conversations-iframe,
                        #drift-frame-controller,
                        #drift-widget,
                        .drift-frame-controller,
                        #launcher,
                        iframe#launcher,
                        #zendesk-frame,
                        iframe#webWidget,
                        div[data-product="web_widget"],
                        .zEWidget-launcher,
                        #tidio-chat,
                        #tidio-chat-iframe,
                        #crisp-chatbox,
                        .crisp-client,
                        #chat-widget-container,
                        [class*="chat-widget" i],
                        [id*="chat-widget" i],
                        [aria-label*="Open messaging" i],
                        [aria-label*="Chat with us" i] {
                            display: none !important;
                        }
                    `
                },
            },
            hideAppBanners: {
                name: 'Hide app install bars',
                hint: 'Sticky “get the app” / smart-app banners and download strips',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .smartbanner,
                        .smartbanner-show,
                        .app-banner,
                        .appbanner,
                        [class*="app-banner" i],
                        [class*="app_banner" i],
                        [class*="smart-banner" i],
                        [class*="smartbanner" i],
                        [id*="app-banner" i],
                        [id*="smartbanner" i],
                        [class*="download-app" i],
                        [class*="get-the-app" i],
                        [aria-label*="Get the app" i],
                        [aria-label*="Download the app" i],
                        div[role="banner"]:has(a[href*="apps.apple.com"]),
                        div[role="banner"]:has(a[href*="play.google.com"]) {
                            display: none !important;
                        }
                    `
                },
            },
            hideShareButtons: {
                name: 'Hide floating share buttons',
                hint: 'Fixed/floating social share docks (AddThis, ShareThis, common patterns)',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .addthis_toolbox,
                        .addthis_floating_style,
                        .at-share-dock,
                        .sharethis-inline-share-buttons,
                        .st-sticky-share-buttons,
                        #st-1,
                        .heateor_sss_sharing_container,
                        [class*="floating-share" i],
                        [class*="share-float" i],
                        [class*="social-share-bar" i],
                        [class*="share-buttons-fixed" i],
                        [id*="floating-share" i],
                        aside[aria-label*="Share" i],
                        div[aria-label*="Share buttons" i] {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
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
        description: 'Removes ads and promo overlays around the board so games stay distraction-free.',
        highlights: [
            'Hide sidebar and layout ad slots',
            'Remove checkmate / promo overlays',
            'Gameplay controls stay intact',
        ],
        screenshot: 'screenshots/chess.com.jpg',
        options: {
            hideAds: {
                name: 'Hide ads',
                hint: 'Remove ad slots and promotional overlays near the board',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        [class*="-ad"],
                        [class*="board-layout-ad"],
                        #board-layout-ad,
                        .ad-component,
                        .promo-component,
                        #checkmate {
                            display: none !important;
                        }
                    `
                    document
                        .querySelectorAll("[class*='-ad'], #board-layout-ad, .ad-component")
                        .forEach((e) => e.remove())
                    document.getElementById('checkmate')?.remove()
                },
            },
        },
    },
    'www.youtube.com': {
        name: 'YouTube',
        key: 'youtube',
        hosts: ['www.youtube.com', 'youtube.com', 'm.youtube.com'],
        description: 'Simplifies the guide and home chrome so watching and searching stay front and center.',
        highlights: [
            'Hide guide promos, Shorts entry, and footer clutter',
            'Hide home feed chips and extra header buttons',
            'Works on desktop and m.youtube.com',
        ],
        screenshot: 'screenshots/youtube.com.jpg',
        options: {
            hideUseless: {
                name: 'Hide guide & feed clutter',
                hint: 'Guide promos, Shorts link, chip bar, and extra header buttons',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                            #buttons ytd-button-renderer,
                            ytd-feed-filter-chip-bar-renderer,
                            #guide-inner-content #section-items ytd-guide-entry-renderer:nth-child(3),
                            #guide-inner-content #section-items ytd-guide-entry-renderer:nth-child(7),
                            #guide-inner-content #sections ytd-guide-section-renderer:nth-child(n+3),
                            ytd-guide-signin-promo-renderer,
                            #guide-inner-content #footer,
                            a[title="Shorts"],
                            ytd-guide-entry-renderer:has(a[title="Shorts"]),
                            ytd-rich-section-renderer:has(a[href*="/shorts"]),
                            ytd-statement-banner-renderer,
                            ytd-banner-promo-renderer-legacy,
                            ytd-primer-promo-renderer {
                                display: none !important;
                            }
                        `
                },
            },
        },
    },
    'x.com': {
        name: 'X',
        key: 'x',
        hosts: ['x.com', 'www.x.com', 'twitter.com', 'www.twitter.com'],
        description: 'Trims side navigation, Premium upsells, and Grok so the timeline stays readable.',
        highlights: [
            'Hide logo, Explore, Jobs, Communities, Lists, Creators Studio, More, account switcher',
            'Hide Premium and Articles upsells',
            'Optional Grok and right-rail complementary panel',
        ],
        screenshot: 'screenshots/x.com.jpg',
        options: {
            hideNavigation: {
                name: 'Hide nav clutter',
                hint: 'Logo, Explore, Jobs, Communities, Lists, Creators Studio, compose, More, account switcher',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                                div:has(> h1[role="heading"]),
                                [href="/explore"],
                                [href="/jobs"],
                                [aria-label="Спільноти"],
                                [aria-label="Communities"],
                                [aria-label="Списки"],
                                [aria-label="Lists"],
                                [href="/i/jf/creators/studio"],
                                a[href*="/i/jf/creators/studio"],
                                [href="/compose/post"],
                                [data-testid="AppTabBar_More_Menu"],
                                [data-testid="SideNav_AccountSwitcher_Button"] {
                                    display: none !important;
                                }
                            `
                },
            },
            hidePremiumPrompts: {
                name: 'Hide Premium prompts',
                hint: 'Premium, Verified Orgs, and Articles upsells',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                                [href="/i/premium_sign_up"],
                                [href="/i/premium"],
                                [href="/i/verified-orgs-signup"],
                                [href="/compose/articles"] {
                                    display: none !important;
                                }
                            `
                },
            },
            hideGrok: {
                name: 'Hide Grok',
                hint: 'Grok nav entry, drawer, and right complementary rail',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                                div:has(> [role="complementary"]),
                                [aria-label="Нижній колонтитул"],
                                [aria-label="Footer"],
                                [href="/i/grok"],
                                [data-testid="GrokDrawer"],
                                [data-testid="GrokDrawerHeader"] {
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
            'Hide sidebar and home recommendation shelves',
            'Hide Prime, Bits, and gift upsells',
            'Optional share, cheer, pinned notices, and goals',
        ],
        screenshot: 'screenshots/twitch.tv.jpg',
        options: {
            hideRecommended: {
                name: 'Hide recommended',
                hint: 'Sidebar recommendations, Viewers Also Watch, and home shelves',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                                [aria-label="Recommended Channels"],
                                [aria-label="Recommended Categories"],
                                [aria-label="Recommended Live Channels"],
                                [aria-label*="Recommended Channels"],
                                [aria-label*="Recommended Categories"] {
                                    display: none !important;
                                }
                            `

                    document
                        .querySelectorAll('nav[aria-label="Left Navigation"] h3, .side-nav-section h3')
                        .forEach((h) => {
                            const text = (h.textContent || '').trim()
                            if (/^(live channels|recommended)/i.test(text) || /viewers also watch/i.test(text)) {
                                const section = h.closest('.side-nav-section') || h.parentElement
                                section?.style.setProperty('display', 'none', 'important')
                            }
                        })

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
                name: 'Hide promos',
                hint: 'Prime offers (and the count pill), Bits, gifts, and sticky upsells',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
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
                name: 'Hide extra chrome',
                hint: 'Share, cheer, pinned notices, stories, upcoming, and leaderboards',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
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

                    document.querySelectorAll('h3').forEach((h) => {
                        if (!/goals?/i.test(h.textContent || '')) return
                        const panel = h.closest('[class*="about"], section, div')
                        panel?.style.setProperty('display', 'none', 'important')
                    })
                },
            },
        },
    },
    'www.reddit.com': {
        name: 'Reddit',
        key: 'reddit',
        hosts: ['www.reddit.com', 'reddit.com', 'old.reddit.com', 'new.reddit.com'],
        description: 'Cuts Premium upsells and sidebar chrome so threads and feeds stay readable.',
        highlights: [
            'Hide Premium / coins prompts',
            'Trim popular communities promo rail',
            'Works on www and old.reddit',
        ],
        options: {
            hidePremium: {
                name: 'Hide Premium prompts',
                hint: 'Premium, coins, and related upsell entry points',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        a[href*="/premium"],
                        a[href*="/coins"],
                        shreddit-experience-tree,
                        aside a[href*="premium"],
                        [id*="premium"][class*="banner" i] {
                            display: none !important;
                        }
                    `
                },
            },
            hideSidebarPromos: {
                name: 'Hide sidebar promos',
                hint: 'Popular communities and promotional sidebar widgets',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        aside [aria-label*="Popular communities" i],
                        aside [aria-label*="communities" i],
                        faceplate-tracker[source_name*="popular"],
                        .premium-banner-outer,
                        .premium-banner {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.linkedin.com': {
        name: 'LinkedIn',
        key: 'linkedin',
        hosts: ['www.linkedin.com', 'linkedin.com'],
        description: 'Quiets feed ads and Premium nudges so the professional feed stays useful.',
        highlights: ['Hide promoted feed units', 'Trim Premium upsells', 'Reduce “people you may know” noise'],
        options: {
            hidePromoted: {
                name: 'Hide promoted',
                hint: 'Promoted / sponsored feed updates',
                code: () => {
                    document.querySelectorAll('.feed-shared-update-v2, .occludable-update').forEach((card) => {
                        const text = (card.textContent || '').toLowerCase()
                        if (text.includes('promoted') || text.includes('просувається') || text.includes('реклама')) {
                            card.style.setProperty('display', 'none', 'important')
                        }
                    })
                },
            },
            hidePremium: {
                name: 'Hide Premium prompts',
                hint: 'Premium upsell cards and banners',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        a[href*="/premium/"],
                        .premium-upsell-link,
                        .artdeco-card:has(a[href*="/premium/"]),
                        .feed-shared-upsell,
                        aside .premium-upsell-link {
                            display: none !important;
                        }
                    `
                },
            },
            hideSuggestions: {
                name: 'Hide suggestions',
                hint: 'People you may know / discovery modules',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        aside.scaffold-layout__aside section:has(button[aria-label*="Follow"]),
                        .discover-entity-list,
                        .pymk-list,
                        section:has(.discover-entity-type-card) {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.instagram.com': {
        name: 'Instagram',
        key: 'instagram',
        hosts: ['www.instagram.com', 'instagram.com'],
        description: 'Trims suggested accounts and explore chrome so following stays the focus.',
        highlights: ['Hide suggested for you modules', 'Optional stories tray hiding'],
        options: {
            hideSuggested: {
                name: 'Hide suggested',
                hint: 'Suggested for you and similar discovery cards',
                code: () => {
                    document.querySelectorAll('span, h2, h3').forEach((el) => {
                        const t = (el.textContent || '').trim()
                        if (!/suggested for you|рекомендації для вас|proposed for you/i.test(t)) return
                        const block = el.closest('section, article, div')
                        block?.style.setProperty('display', 'none', 'important')
                    })
                },
            },
            hideStories: {
                name: 'Hide stories tray',
                hint: 'Hide the stories carousel above the feed',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        div[role="menu"]:has(canvas),
                        section:has(ul li canvas),
                        div:has(> div > div > ul li[role="presentation"] canvas) {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'mail.google.com': {
        name: 'Gmail',
        key: 'gmail',
        hosts: ['mail.google.com'],
        description: 'Hides Meet/Chat promo chrome and optional right-side panels so mail stays primary.',
        highlights: ['Hide Meet / Chat promo in the sidebar', 'Optional add-ons / side panel hiding'],
        options: {
            hideMeetChat: {
                name: 'Hide Meet & Chat promo',
                hint: 'Left-rail Meet and Chat entry promo blocks',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        div[aria-label="Meet"],
                        div[aria-label="Chat"],
                        div[data-tooltip="Meet"],
                        div[data-tooltip="Chat"],
                        .bkL,
                        .aCl {
                            display: none !important;
                        }
                    `
                },
            },
            hideSidePanel: {
                name: 'Hide side panel',
                hint: 'Right-hand add-ons / Calendar / Keep panel chrome',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        div.bAw,
                        div.bq9,
                        div[aria-label*="Side panel" i],
                        .brC-brG-avC {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },

    'www.facebook.com': {
        name: 'Facebook',
        key: 'facebook',
        hosts: ['www.facebook.com', 'facebook.com', 'm.facebook.com', 'web.facebook.com'],
        description: 'Quiets sponsored posts and sidebar clutter so the feed stays about people you follow.',
        highlights: ['Hide sponsored feed units', 'Trim Stories / Reels tray chrome', 'Works on www and m.facebook'],
        options: {
            hideSponsored: {
                name: 'Hide sponsored',
                hint: 'Sponsored / promotional feed posts',
                code: () => {
                    document.querySelectorAll('[role="article"], div[data-pagelet*="FeedUnit"]').forEach((card) => {
                        const text = (card.textContent || '').toLowerCase()
                        if (
                            text.includes('sponsored') ||
                            text.includes('рекомендовано') ||
                            text.includes('пропоноване') ||
                            /\bsponsored\b/.test(text)
                        ) {
                            // Only hide when a short “Sponsored” label appears, not long posts that mention the word
                            const label = Array.from(card.querySelectorAll('span, a, div')).some((el) => {
                                const t = (el.textContent || '').trim().toLowerCase()
                                return t === 'sponsored' || t === 'рекомендовано' || t === 'пропоноване'
                            })
                            if (label) card.style.setProperty('display', 'none', 'important')
                        }
                    })
                },
            },
            hideStoriesReels: {
                name: 'Hide Stories & Reels tray',
                hint: 'Stories / Reels carousel above the main feed',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        div[aria-label="Stories"],
                        div[aria-label*="Stories" i],
                        div[aria-label*="Reels" i],
                        div[data-pagelet="Stories"],
                        div[data-pagelet*="Stories"] {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'medium.com': {
        name: 'Medium',
        key: 'medium',
        hosts: ['medium.com', 'www.medium.com'],
        hostSuffixes: ['medium.com'],
        description: 'Removes paywall nudges and clutter so reading stays uninterrupted.',
        highlights: ['Hide membership / paywall prompts', 'Trim bottom share and follow bars'],
        options: {
            hidePaywall: {
                name: 'Hide paywall prompts',
                hint: 'Membership meters and “become a member” overlays',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        [data-testid="paywall"],
                        [data-testid="paywall-upsell"],
                        div[aria-label*="meter" i],
                        .js-postMeterMeteringDialog,
                        button[data-testid="header-member-button"],
                        a[href*="/membership"],
                        a[href*="/plans"] {
                            display: none !important;
                        }
                    `
                },
            },
            hideChrome: {
                name: 'Hide extra chrome',
                hint: 'Sticky follow / share bars under articles',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        footer nav,
                        [data-testid="storyActions"],
                        [data-test-id="post-sidebar"] {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'news.ycombinator.com': {
        name: 'Hacker News',
        key: 'hackernews',
        hosts: ['news.ycombinator.com'],
        description: 'Softens visual noise on HN so stories and comments stay easy to scan.',
        highlights: ['Optional rank / score de-emphasis', 'Hide “jobs” and promo links in topbar'],
        options: {
            hideJobsPromo: {
                name: 'Hide jobs / promo links',
                hint: 'Topbar jobs and promotional nav links',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        a[href="jobs"],
                        span#pagespace + table .pagetop a[href*="jobs"],
                        .pagetop a[href="jobs"] {
                            display: none !important;
                        }
                    `
                },
            },
            compactChrome: {
                name: 'Hide rank numbers',
                hint: 'Hide left-side story rank numbers for a cleaner list',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        span.rank {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'github.com': {
        name: 'GitHub',
        key: 'github',
        hosts: ['github.com', 'www.github.com'],
        description: 'Trims dashboard feed noise and marketing banners so repos stay front and center.',
        highlights: ['Hide dashboard feed suggestions', 'Hide marketing / upsell banners'],
        options: {
            hideFeedNoise: {
                name: 'Hide feed suggestions',
                hint: 'Dashboard “explore” / recommendation cards in the feed',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        [data-testid="feed-item"] [data-hovercard-type="repository"]:has(+ *),
                        .js-feed-item-component:has([data-testid="recommendation"]),
                        [aria-label*="Explore repositories" i],
                        aside[aria-label="Explore"] {
                            display: none !important;
                        }
                    `
                    document.querySelectorAll('h2, h3, span').forEach((el) => {
                        const t = (el.textContent || '').trim()
                        if (!/^(explore repositories|based on your interests|trending repositories)/i.test(t)) return
                        const block = el.closest('[data-testid="feed-item"], .js-feed-item-component, article, div')
                        block?.style.setProperty('display', 'none', 'important')
                    })
                },
            },
            hideBanners: {
                name: 'Hide marketing banners',
                hint: 'Global marketing and Copilot upsell banners',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .js-notice,
                        .marketing-banner,
                        [data-testid="copilot-banner"],
                        .AppHeader-globalBar .Banner,
                        .flash-banner,
                        a[href*="/features/copilot"][data-analytics-event] {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.tiktok.com': {
        name: 'TikTok',
        key: 'tiktok',
        hosts: ['www.tiktok.com', 'tiktok.com'],
        description: 'Cuts live / shopping promos and suggested chrome so scrolling stays about the For You feed.',
        highlights: ['Hide LIVE / shopping entry points', 'Trim suggested user modules'],
        options: {
            hideLiveShopping: {
                name: 'Hide LIVE & shopping',
                hint: 'LIVE badges and shopping / mall promo entry points',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        a[href*="/live"],
                        a[href*="/shop"],
                        a[href*="/mall"],
                        [data-e2e="live-icon"],
                        [data-e2e="shop-icon"],
                        [data-e2e="nav-live"],
                        [data-e2e="nav-shop"] {
                            display: none !important;
                        }
                    `
                },
            },
            hideSuggested: {
                name: 'Hide suggested users',
                hint: 'Suggested accounts modules in the sidebar / feed',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        [data-e2e="suggest-accounts"],
                        [data-e2e="user-card"],
                        div:has(> [data-e2e="suggest-accounts"]) {
                            display: none !important;
                        }
                    `
                    document.querySelectorAll('h2, h3, span, p').forEach((el) => {
                        const t = (el.textContent || '').trim()
                        if (!/suggested accounts|suggested for you|рекомендовані/i.test(t)) return
                        const block = el.closest('section, aside, div')
                        block?.style.setProperty('display', 'none', 'important')
                    })
                },
            },
        },
    },

    'www.netflix.com': {
        name: 'Netflix',
        key: 'netflix',
        hosts: ['www.netflix.com', 'netflix.com'],
        description: 'Cuts billboard and secondary rows so browsing titles stays calmer.',
        highlights: ['Hide big billboard hero', 'Optional secondary promo rows'],
        options: {
            hideBillboard: {
                name: 'Hide billboard',
                hint: 'Large hero / billboard at the top of the home row',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .billboard-row,
                        .volatile-billboard-animations-container,
                        div[data-uia="billboard"],
                        .hero-billboard {
                            display: none !important;
                        }
                    `
                },
            },
            hidePreviews: {
                name: 'Hide preview noise',
                hint: 'Billboard trailer binder and interest promo pads',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .billboard .trailers-binder,
                        .interest-row {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'discord.com': {
        name: 'Discord',
        key: 'discord',
        hosts: ['discord.com', 'www.discord.com'],
        description: 'Trims Nitro upsells and gift chrome so servers and chat stay primary.',
        highlights: ['Hide Nitro / gift upsells', 'Trim shop entry points'],
        options: {
            hideNitro: {
                name: 'Hide Nitro prompts',
                hint: 'Nitro upsell buttons and banners',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        a[href*="/store/skus"],
                        a[href*="/nitro"],
                        button[aria-label*="Nitro" i],
                        div[class*="premiumTab"],
                        div[class*="giftButton"] {
                            display: none !important;
                        }
                    `
                },
            },
            hideShop: {
                name: 'Hide shop / gifts',
                hint: 'Shop and gift inventory entry points in the UI chrome',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        a[href="/shop"],
                        a[href*="/shop"],
                        div[class*="shop"] a[href*="shop"],
                        button[aria-label*="Gift Inventory" i],
                        button[aria-label*="Send a gift" i] {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.amazon.com': {
        name: 'Amazon',
        key: 'amazon',
        hosts: [
            'www.amazon.com',
            'amazon.com',
            'www.amazon.co.uk',
            'www.amazon.de',
            'www.amazon.co.jp',
            'www.amazon.ca',
            'www.amazon.fr',
            'www.amazon.it',
            'www.amazon.es',
            'www.amazon.com.au',
            'www.amazon.in',
            'www.amazon.com.br',
            'www.amazon.nl',
            'www.amazon.se',
            'www.amazon.pl',
            'www.amazon.com.mx',
            'www.amazon.com.be',
            'www.amazon.eg',
            'www.amazon.sa',
            'www.amazon.ae',
            'www.amazon.sg',
            'www.amazon.com.tr',
        ],
        hostSuffixes: [
            'amazon.com',
            'amazon.co.uk',
            'amazon.de',
            'amazon.co.jp',
            'amazon.ca',
            'amazon.fr',
            'amazon.it',
            'amazon.es',
            'amazon.com.au',
            'amazon.in',
            'amazon.com.br',
            'amazon.nl',
            'amazon.se',
            'amazon.pl',
            'amazon.com.mx',
            'amazon.com.be',
            'amazon.eg',
            'amazon.sa',
            'amazon.ae',
            'amazon.sg',
            'amazon.com.tr',
        ],
        description: 'Quiets sponsored results and localization nabars so product pages stay usable.',
        highlights: ['Hide sponsored carousel labels', 'Trim localization / soft-nav promo strips'],
        options: {
            hideSponsored: {
                name: 'Hide sponsored labels',
                hint: 'Sponsored / featured carousel chrome marked as ads',
                code: () => {
                    document
                        .querySelectorAll(
                            '[data-component-type="sp-sponsored-result"], .AdHolder, .s-result-item[data-asin]:has(.s-label-popover-default)',
                        )
                        .forEach((el) => {
                            const text = (el.textContent || '').toLowerCase()
                            if (
                                text.includes('sponsored') ||
                                text.includes('реклама') ||
                                el.classList.contains('AdHolder')
                            ) {
                                el.style.setProperty('display', 'none', 'important')
                            }
                        })
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .AdHolder,
                        [data-component-type="sp-sponsored-result"],
                        .s-widget-container:has(.s-sponsored-label-info-icon) {
                            display: none !important;
                        }
                    `
                },
            },
            hideNavPromos: {
                name: 'Hide nav promos',
                hint: 'Top soft-nav and localization promo strips',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        #nav-upnav,
                        #nav-swmslot,
                        .celwidget[cel_widget_id*="desktop-banner"],
                        #gw-card-layout .a-carousel-header-row {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.google.com': {
        name: 'Google Search',
        key: 'google',
        hosts: ['www.google.com', 'google.com'],
        hostSuffixes: [
            'google.com',
            'google.com.ua',
            'google.co.uk',
            'google.de',
            'google.pl',
            'google.fr',
            'google.it',
            'google.es',
            'google.ca',
            'google.com.br',
            'google.co.jp',
        ],
        description: 'Trims People Also Ask, related searches, and cleans the results footer / pagination.',
        highlights: [
            'Hide People Also Ask blocks',
            'Optional related searches hiding',
            'Clean footer and larger page-number buttons',
        ],
        options: {
            hidePeopleAlsoAsk: {
                name: 'Hide People Also Ask',
                hint: 'Expandable “People also ask” result blocks',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        div[jsname="Cpkphb"],
                        .related-question-pair,
                        div[aria-label*="People also ask" i],
                        div[aria-label*="Люди також запитують" i],
                        div[aria-label*="También preguntan" i],
                        div[data-initq],
                        .related-question-pair,
                        g-accordion-expander,
                        div:has(> div[jsname="yEVEwb"]) {
                            display: none !important;
                        }
                    `

                    // Text-match fallback for localized headings Google renames often
                    document.querySelectorAll('h2, h3, span, div[role="heading"]').forEach((el) => {
                        const text = (el.textContent || '').trim()
                        if (
                            !/^(people also ask|люди також запитують|другие спрашивают|autres questions|weitere fragen)$/i.test(
                                text,
                            )
                        ) {
                            return
                        }
                        const block =
                            el.closest('[jscontroller], .related-question-pair, div[data-initq]') ||
                            el.closest('div')?.parentElement
                        block?.style.setProperty('display', 'none', 'important')
                    })
                },
            },
            hideRelatedSearches: {
                name: 'Hide related searches',
                hint: 'Related searches chips at the bottom of results',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        #brs,
                        #bres,
                        .oIk2Cb,
                        #botstuff [data-abe] {
                            display: none !important;
                        }
                    `
                },
            },
            cleanFooterPagination: {
                name: 'Clean footer & pagination',
                hint: 'Hide #sfooter, strip nav_logo sprites, style page numbers as round buttons',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        #sfooter {
                            display: none !important;
                        }

                        /* Google “Gooooogle” letter sprites (nav_logo*.webp) */
                        div[role="navigation"] span.D2pCqd,
                        div[role="navigation"] span.CsrMc,
                        table.gUbm5e span.D2pCqd,
                        table.gUbm5e span[style*="nav_logo"] {
                            display: none !important;
                            background: none !important;
                            width: 0 !important;
                            height: 0 !important;
                            float: none !important;
                            margin: 0 !important;
                            padding: 0 !important;
                        }

                        /* Pager layout */
                        div[role="navigation"] table.gUbm5e,
                        table.gUbm5e {
                            width: 100% !important;
                            margin: 1.5rem 0 2rem !important;
                        }

                        table.gUbm5e tbody,
                        table.gUbm5e tr.U8leG {
                            display: flex !important;
                            flex-wrap: nowrap !important;
                            align-items: center !important;
                            justify-content: center !important;
                            gap: 0.4rem !important;
                            width: max-content !important;
                            max-width: 100% !important;
                            margin-inline: auto !important;
                        }

                        table.gUbm5e td {
                            display: block !important;
                            padding: 0 !important;
                            margin: 0 !important;
                            float: none !important;
                            vertical-align: middle !important;
                        }

                        /* Page number links */
                        table.gUbm5e a.fl {
                            display: inline-flex !important;
                            align-items: center !important;
                            justify-content: center !important;
                            flex: 0 0 auto !important;
                            min-width: 2.75rem !important;
                            height: 2.75rem !important;
                            padding: 0 0.75rem !important;
                            border-radius: 999px !important;
                            border: 1px solid #dadce0 !important;
                            background: #fff !important;
                            color: #1a0dab !important;
                            font-size: 16px !important;
                            font-weight: 500 !important;
                            line-height: 1 !important;
                            text-decoration: none !important;
                            box-sizing: border-box !important;
                        }

                        table.gUbm5e a.fl:hover {
                            background: #f1f3f4 !important;
                            border-color: #bdc1c6 !important;
                        }

                        /* Current page (td.dlnXYb — digit only, no link) */
                        table.gUbm5e td.dlnXYb {
                            display: inline-flex !important;
                            align-items: center !important;
                            justify-content: center !important;
                            flex: 0 0 auto !important;
                            min-width: 2.75rem !important;
                            height: 2.75rem !important;
                            padding: 0 0.75rem !important;
                            border-radius: 999px !important;
                            border: 1px solid #1a73e8 !important;
                            background: #e8f0fe !important;
                            color: #1a73e8 !important;
                            font-size: 16px !important;
                            font-weight: 700 !important;
                            line-height: 1 !important;
                            box-sizing: border-box !important;
                        }

                        /* Prev / Next — text only, round buttons */
                        table.gUbm5e a#pnprev,
                        table.gUbm5e a#pnnext,
                        table.gUbm5e a.zuSX,
                        table.gUbm5e a.KLlkp {
                            display: inline-flex !important;
                            align-items: center !important;
                            justify-content: center !important;
                            gap: 0.35rem !important;
                            flex: 0 0 auto !important;
                            min-width: 2.75rem !important;
                            height: 2.75rem !important;
                            padding: 0 0.9rem !important;
                            white-space: nowrap !important;
                            border-radius: 999px !important;
                            border: 1px solid #dadce0 !important;
                            background: #fff !important;
                            color: #1a0dab !important;
                            font-size: 15px !important;
                            font-weight: 500 !important;
                            text-decoration: none !important;
                            text-align: center !important;
                            box-sizing: border-box !important;
                        }

                        table.gUbm5e a#pnprev:hover,
                        table.gUbm5e a#pnnext:hover,
                        table.gUbm5e a.zuSX:hover,
                        table.gUbm5e a.KLlkp:hover {
                            background: #f1f3f4 !important;
                            border-color: #bdc1c6 !important;
                        }

                        /* Reset Google’s margin hacks for Назад / Уперед labels */
                        table.gUbm5e span.DHTy1e {
                            display: inline !important;
                            margin: 0 !important;
                            float: none !important;
                        }

                        table.gUbm5e td.QvrXab {
                            display: block !important;
                            flex: 0 0 auto !important;
                        }

                        table.gUbm5e td.bQkv1e {
                            flex: 0 0 auto !important;
                        }
                    `

                    // DOM: strip sprite spans so digits/labels stay clean
                    document
                        .querySelectorAll(
                            'div[role="navigation"] span.D2pCqd, table.gUbm5e span.D2pCqd, table.gUbm5e span[style*="nav_logo"]',
                        )
                        .forEach((el) => el.remove())
                },
            },
        },
    },
    'www.pinterest.com': {
        name: 'Pinterest',
        key: 'pinterest',
        hosts: ['www.pinterest.com', 'pinterest.com', 'www.pinterest.co.uk', 'www.pinterest.de'],
        hostSuffixes: [
            'pinterest.com',
            'pinterest.co.uk',
            'pinterest.de',
            'pinterest.fr',
            'pinterest.ca',
            'pinterest.jp',
        ],
        description: 'Cuts idea ads and shop promos so boards and pins stay visual.',
        highlights: ['Hide promoted pins where labeled', 'Trim shop / today tab chrome'],
        options: {
            hidePromoted: {
                name: 'Hide promoted pins',
                hint: 'Pins marked as promoted / ads',
                code: () => {
                    document.querySelectorAll('[data-test-id="pin"], div[role="listitem"]').forEach((pin) => {
                        const t = (pin.textContent || '').toLowerCase()
                        if (t.includes('promoted') || t.includes('реклама') || t.includes('просувається')) {
                            const label = Array.from(pin.querySelectorAll('div, span')).some((el) => {
                                const s = (el.textContent || '').trim().toLowerCase()
                                return s === 'promoted' || s === 'реклама' || s === 'просувається'
                            })
                            if (label) pin.style.setProperty('display', 'none', 'important')
                        }
                    })
                },
            },
            hideShopChrome: {
                name: 'Hide shop chrome',
                hint: 'Shop and Today tab entry noise in the header',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        a[href*="/shop"],
                        a[href*="/today"],
                        div[data-test-id="today-tab"],
                        div[data-test-id="shop-tab"] {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'open.spotify.com': {
        name: 'Spotify',
        key: 'spotify',
        hosts: ['open.spotify.com'],
        description: 'Hides Premium upsells and homepage promo shelves so playlists stay front and center.',
        highlights: ['Hide Premium upgrade prompts', 'Trim homepage promo shelves'],
        options: {
            hidePremium: {
                name: 'Hide Premium prompts',
                hint: 'Upgrade / Premium buttons and banners',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        a[href*="/premium"],
                        button[data-testid="upgrade-button"],
                        [data-testid="premium-button"],
                        button[aria-label*="Upgrade" i],
                        a[href="https://www.spotify.com/premium/"] {
                            display: none !important;
                        }
                    `
                },
            },
            hidePromoShelves: {
                name: 'Hide promo shelves',
                hint: 'Homepage marketing shelves when labeled as ads / promo',
                code: () => {
                    document.querySelectorAll('section, div[data-testid="component-shelf"]').forEach((shelf) => {
                        const t = (shelf.textContent || '').toLowerCase()
                        if (/premium|upgrade to|try .+ free/i.test(t) && t.length < 400) {
                            shelf.style.setProperty('display', 'none', 'important')
                        }
                    })
                },
            },
        },
    },
    'stackoverflow.com': {
        name: 'Stack Overflow',
        key: 'stackoverflow',
        hosts: ['stackoverflow.com', 'www.stackoverflow.com'],
        hostSuffixes: ['stackoverflow.com'],
        description: 'Removes sidebar promos and Teams upsells so questions and answers stay readable.',
        highlights: ['Hide sidebar ads / hot network noise', 'Hide Collectives / Teams prompts'],
        options: {
            hideSidebar: {
                name: 'Hide sidebar promos',
                hint: 'Right sidebar ads and promotional modules',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        #sidebar .s-sidebarwidget__yellow,
                        .js-sidebar-zone,
                        .everyonelovesstackoverflow,
                        #hireme,
                        .js-zoning,
                        aside[aria-label="Sidebar ads"] {
                            display: none !important;
                        }
                    `
                },
            },
            hideTeams: {
                name: 'Hide Teams / Collectives',
                hint: 'Teams and Collectives promotional banners',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .js-dismissable-hero,
                        a[href*="/teams"],
                        a[href*="/collectives"],
                        .s-hero[data-is-collectives],
                        .ps-relative.p32.bg-black-750 {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },

    'web.telegram.org': {
        name: 'Telegram Web',
        key: 'telegram',
        hosts: ['web.telegram.org', 'webk.telegram.org', 'webz.telegram.org'],
        description: 'Quiets promo and story chrome so chats stay the focus.',
        highlights: ['Hide Stories rail when present', 'Trim promotional banners'],
        options: {
            hideStories: {
                name: 'Hide Stories',
                hint: 'Stories rail above the chat list',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .stories-list,
                        .StoryToggler,
                        .stories-container,
                        [class*="stories"][class*="horizontal"] {
                            display: none !important;
                        }
                    `
                },
            },
            hidePromos: {
                name: 'Hide promos',
                hint: 'In-app promotional / Premium nudges in the chat list chrome',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .promo-button,
                        .ChatlistTopbar,
                        .topbar-promo,
                        a[href*="premium"] {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'web.whatsapp.com': {
        name: 'WhatsApp Web',
        key: 'whatsapp',
        hosts: ['web.whatsapp.com'],
        description: 'Hides status / channels promo chrome so chats stay primary.',
        highlights: ['Hide Status / Channels nav noise', 'Trim community promo panels'],
        options: {
            hideStatusChannels: {
                name: 'Hide Status & Channels',
                hint: 'Status and Channels entry points in the side nav',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        button[aria-label="Status"],
                        button[aria-label="Channels"],
                        div[aria-label="Status"],
                        div[aria-label="Channels"],
                        span[data-icon="status-outline"],
                        span[data-icon="newsletter-outline"] {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'duckduckgo.com': {
        name: 'DuckDuckGo',
        key: 'duckduckgo',
        hosts: ['duckduckgo.com', 'www.duckduckgo.com'],
        description: 'Trims module chrome around results so the answer list stays clean.',
        highlights: ['Hide sidebar modules', 'Optional related searches hiding'],
        options: {
            hideModules: {
                name: 'Hide side modules',
                hint: 'Right-rail modules and rich cards around organic results',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        #react-island-aside,
                        .module--about,
                        .module--translations,
                        .js-sidebar-modules,
                        aside.react-results--sidebar {
                            display: none !important;
                        }
                    `
                },
            },
            hideRelated: {
                name: 'Hide related searches',
                hint: 'Related searches chips under results',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .related-searches,
                        #related-searches,
                        .js-related-searches {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.quora.com': {
        name: 'Quora',
        key: 'quora',
        hosts: ['www.quora.com', 'quora.com'],
        description: 'Cuts related questions clutter and signup walls chrome so answers stay readable.',
        highlights: ['Hide related questions rail', 'Trim signup / app promos'],
        options: {
            hideRelated: {
                name: 'Hide related questions',
                hint: 'Related questions and “more answers” promo rails',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .q-sticky,
                        div:has(> div > .puppeteer_test_question_related),
                        .spacing_log_question_related_questions {
                            display: none !important;
                        }
                    `
                },
            },
            hidePromos: {
                name: 'Hide promos',
                hint: 'App download and signup promotional banners',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .q-box.qu-borderColor--red,
                        .puppeteer_test_modal,
                        div[class*="signup"][class*="banner" i] {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.ebay.com': {
        name: 'eBay',
        key: 'ebay',
        hosts: [
            'www.ebay.com',
            'ebay.com',
            'www.ebay.co.uk',
            'www.ebay.de',
            'www.ebay.fr',
            'www.ebay.it',
            'www.ebay.es',
            'www.ebay.ca',
            'www.ebay.com.au',
        ],
        hostSuffixes: ['ebay.com', 'ebay.co.uk', 'ebay.de', 'ebay.fr', 'ebay.it', 'ebay.es', 'ebay.ca', 'ebay.com.au'],
        description: 'Quiets sponsored listings and marketing banners on search and item pages.',
        highlights: ['Hide sponsored listing chrome', 'Trim marketing banners'],
        options: {
            hideSponsored: {
                name: 'Hide sponsored',
                hint: 'Sponsored / promoted listing units in search results',
                code: () => {
                    document.querySelectorAll('li, div.s-item, .su-card-container').forEach((card) => {
                        const t = (card.textContent || '').toLowerCase()
                        if (!(t.includes('sponsored') || t.includes('просувається') || t.includes('реклама'))) return
                        const label = Array.from(card.querySelectorAll('span, div')).some((el) => {
                            const s = (el.textContent || '').trim().toLowerCase()
                            return s === 'sponsored' || s === 'просувається' || s === 'реклама'
                        })
                        if (label) card.style.setProperty('display', 'none', 'important')
                    })
                },
            },
            hideBanners: {
                name: 'Hide banners',
                hint: 'Top marketing and seasonal banners',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .vl-banner,
                        .banner-container,
                        #rtm_html_924,
                        .ebayui-dne-banner-mainContainer {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.notion.so': {
        name: 'Notion',
        key: 'notion',
        hosts: ['www.notion.so', 'notion.so', 'www.notion.com', 'notion.com'],
        description: 'Hides template / AI upsell chrome so the page editor stays calm.',
        highlights: ['Hide AI / template upsells', 'Trim help / sales popovers'],
        options: {
            hideUpsells: {
                name: 'Hide AI & template upsells',
                hint: 'Notion AI and template gallery promotional entry points',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        div[role="button"][aria-label*="Notion AI" i],
                        a[href*="/templates"],
                        .notion-ai-button,
                        div.notion-topbar-ai-button {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'app.slack.com': {
        name: 'Slack',
        key: 'slack',
        hosts: ['app.slack.com', 'slack.com'],
        description: 'Trims sales / trial banners inside workspaces so channels stay readable.',
        highlights: ['Hide trial / upgrade banners', 'Trim promo toasts'],
        options: {
            hideBanners: {
                name: 'Hide upgrade banners',
                hint: 'Trial, sales, and upgrade banners in the workspace chrome',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .p-workspace_banner,
                        .p-classic_nav__banners,
                        [data-qa="banner"],
                        .c-banner,
                        .p-top_nav__notifications--sales {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },

    'www.booking.com': {
        name: 'Booking.com',
        key: 'booking',
        hosts: ['www.booking.com', 'booking.com'],
        description: 'Quiets Genius upsells and promotional banners so search and stays stay scannable.',
        highlights: ['Hide Genius / loyalty promo bars', 'Trim marketing banners on results'],
        options: {
            hidePromos: {
                name: 'Hide promo banners',
                hint: 'Genius bars and top marketing banners',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        [data-testid="genius-header"],
                        .bui-banner,
                        .promo-banner,
                        #b2indexPage .banner-wrapper,
                        div[class*="genius-badge"] {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.airbnb.com': {
        name: 'Airbnb',
        key: 'airbnb',
        hosts: ['www.airbnb.com', 'airbnb.com'],
        description: 'Trims category chips and promo chrome so listing search stays calm.',
        highlights: ['Hide top category chip carousel noise', 'Trim promotional banners'],
        options: {
            hideCategories: {
                name: 'Hide category chips',
                hint: 'Horizontal category filter chips under the header',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        [data-testid="category-bar"],
                        nav[aria-label*="Categories" i],
                        div[data-section-id="CATEGORIES_NAV"] {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'soundcloud.com': {
        name: 'SoundCloud',
        key: 'soundcloud',
        hosts: ['soundcloud.com', 'www.soundcloud.com', 'm.soundcloud.com'],
        description: 'Hides upgrade prompts and sidebar chrome so listening stays primary.',
        highlights: ['Hide Go / upgrade prompts', 'Trim sidebar promo modules'],
        options: {
            hideUpgrade: {
                name: 'Hide upgrade prompts',
                hint: 'SoundCloud Go and upgrade banners',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .header__upsellWrapper,
                        .upsellBanner,
                        a[href*="/go"],
                        .l-footer .upsellBanner,
                        .webstoreUpsell {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'vimeo.com': {
        name: 'Vimeo',
        key: 'vimeo',
        hosts: ['vimeo.com', 'www.vimeo.com'],
        description: 'Removes marketing and trial banners around the player and browse pages.',
        highlights: ['Hide trial / upgrade banners', 'Trim marketing strips'],
        options: {
            hideBanners: {
                name: 'Hide marketing banners',
                hint: 'Trial, upgrade, and marketing strips',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .top_nav_banner,
                        .js-top_nav_banner,
                        [data-testid="upsell-banner"],
                        .iris_banner {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.tumblr.com': {
        name: 'Tumblr',
        key: 'tumblr',
        hosts: ['www.tumblr.com', 'tumblr.com'],
        description: 'Cuts sidebar ads and Tumblr Live chrome so the dash stays readable.',
        highlights: ['Hide sidebar ad units', 'Optional Live / shop entry hiding'],
        options: {
            hideAds: {
                name: 'Hide sidebar ads',
                hint: 'Sponsored units in the right rail',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .yamPlus-ad-container,
                        .takeover-banner,
                        aside .video-ad,
                        div[data-cell_id*="timelineObject:ads"] {
                            display: none !important;
                        }
                    `
                },
            },
            hideLive: {
                name: 'Hide Live & shop',
                hint: 'Tumblr Live and shop entry points',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        a[href*="/live"],
                        a[href*="/shop"],
                        button[aria-label*="Live" i] {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.producthunt.com': {
        name: 'Product Hunt',
        key: 'producthunt',
        hosts: ['www.producthunt.com', 'producthunt.com'],
        description: 'Trims newsletter and side promo chrome so launches stay scannable.',
        highlights: ['Hide newsletter / subscribe prompts', 'Trim sidebar promo cards'],
        options: {
            hidePromos: {
                name: 'Hide promo chrome',
                hint: 'Subscribe prompts and sidebar promo cards',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        [data-test="subscribe-banner"],
                        aside [data-test="sidebar-ad"],
                        div:has(> form[action*="subscribe"]) {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'dribbble.com': {
        name: 'Dribbble',
        key: 'dribbble',
        hosts: ['dribbble.com', 'www.dribbble.com'],
        description: 'Hides job / Pro upsells so shot browsing stays visual.',
        highlights: ['Hide Pro / hiring banners', 'Trim job board promo strips'],
        options: {
            hideUpsells: {
                name: 'Hide Pro & hiring upsells',
                hint: 'Pro membership and hiring promotional banners',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .promo-banner,
                        .hiring-banner,
                        a[href*="/pro"],
                        a[href*="/hiring"],
                        .site-nav__hire {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },

    'www.threads.net': {
        name: 'Threads',
        key: 'threads',
        hosts: ['www.threads.net', 'threads.net'],
        description: 'Trims suggested follows and promo chrome so the feed stays about people you follow.',
        highlights: ['Hide suggested users modules', 'Trim promotional banners'],
        options: {
            hideSuggested: {
                name: 'Hide suggested',
                hint: 'Suggested follows and discovery cards',
                code: () => {
                    document.querySelectorAll('span, h2, h3').forEach((el) => {
                        const t = (el.textContent || '').trim()
                        if (!/suggested for you|suggested users|рекомендації/i.test(t)) return
                        el.closest('section, div, article')?.style.setProperty('display', 'none', 'important')
                    })
                },
            },
        },
    },
    'bsky.app': {
        name: 'Bluesky',
        key: 'bluesky',
        hosts: ['bsky.app', 'www.bsky.app'],
        description: 'Quiets starter-pack and discovery chrome so the timeline stays calm.',
        highlights: ['Hide discovery / starter pack promos', 'Trim right-rail suggestions'],
        options: {
            hideDiscovery: {
                name: 'Hide discovery chrome',
                hint: 'Starter packs and suggested follows modules',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        a[href*="/starter-pack"],
                        div:has(> a[href*="/starter-pack"]),
                        [data-testid="suggestedFollowsDesktop"] {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'kick.com': {
        name: 'Kick',
        key: 'kick',
        hosts: ['kick.com', 'www.kick.com'],
        description: 'Cuts recommendation shelves and promo chrome around live streams.',
        highlights: ['Hide recommended channel shelves', 'Trim promotional banners'],
        options: {
            hideRecommended: {
                name: 'Hide recommended',
                hint: 'Recommended / similar channel shelves',
                code: () => {
                    document.querySelectorAll('h2, h3').forEach((h) => {
                        if (!/recommended|suggested|you may also/i.test(h.textContent || '')) return
                        h.closest('section, div')?.style.setProperty('display', 'none', 'important')
                    })
                },
            },
        },
    },
    'substack.com': {
        name: 'Substack',
        key: 'substack',
        hosts: ['substack.com', 'www.substack.com'],
        hostSuffixes: ['substack.com'],
        description: 'Hides subscribe walls and discovery chrome so posts stay readable.',
        highlights: ['Hide subscribe / paywall prompts', 'Trim discovery side modules'],
        options: {
            hideSubscribe: {
                name: 'Hide subscribe prompts',
                hint: 'Subscribe modals and paywall-style banners',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .pencraft.subscription-widget,
                        [data-testid="subscribe-widget"],
                        .subscribe-widget,
                        .paywall,
                        .subscription-widget-wrap {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.figma.com': {
        name: 'Figma',
        key: 'figma',
        hosts: ['www.figma.com', 'figma.com'],
        description: 'Hides AI / upgrade upsells so files and the canvas stay primary.',
        highlights: ['Hide AI and upgrade banners', 'Trim promotional toasts'],
        options: {
            hideUpsells: {
                name: 'Hide upgrade upsells',
                hint: 'AI, Pro, and upgrade promotional banners',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        [data-testid="upgrade-banner"],
                        [data-testid="ai-upsell"],
                        a[href*="/pricing"],
                        button[aria-label*="Upgrade" i] {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.canva.com': {
        name: 'Canva',
        key: 'canva',
        hosts: ['www.canva.com', 'canva.com'],
        description: 'Trims Pro upsells and sidebar promo chrome in the editor and home.',
        highlights: ['Hide Pro / Premium badges and banners', 'Trim sidebar promo modules'],
        options: {
            hidePro: {
                name: 'Hide Pro upsells',
                hint: 'Pro crowns, upgrade buttons, and promo banners',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        button[aria-label*="Upgrade" i],
                        a[href*="/pro"],
                        [class*="UpgradeButton"],
                        [data-ref="upgradeButton"] {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.behance.net': {
        name: 'Behance',
        key: 'behance',
        hosts: ['www.behance.net', 'behance.net'],
        description: 'Hides job / Adobe promo chrome so project browsing stays visual.',
        highlights: ['Hide hiring and Adobe upsells', 'Trim marketing banners'],
        options: {
            hidePromos: {
                name: 'Hide promos',
                hint: 'Hiring, Adobe, and marketing banners',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .PrimaryNav-promo,
                        .qa-adobe-banner,
                        a[href*="/joblist"],
                        .HireBanner {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'imgur.com': {
        name: 'Imgur',
        key: 'imgur',
        hosts: ['imgur.com', 'www.imgur.com', 'm.imgur.com'],
        description: 'Cuts ad units and promo overlays around images and galleries.',
        highlights: ['Hide ad slots and sponsored units', 'Trim download-app bars'],
        options: {
            hideAds: {
                name: 'Hide ads',
                hint: 'Sponsored units and ad slots around posts',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .Ad-container,
                        .advertisement,
                        #advertisement-container,
                        .Sponsor-container,
                        .BannerAdContainer {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.bbc.com': {
        name: 'BBC',
        key: 'bbc',
        hosts: ['www.bbc.com', 'bbc.com', 'www.bbc.co.uk', 'bbc.co.uk'],
        description: 'Quiets registration prompts and promo modules around articles.',
        highlights: ['Hide register / sign-in promo walls', 'Trim promotional story modules'],
        options: {
            hidePromos: {
                name: 'Hide promo walls',
                hint: 'Registration prompts and promo modules',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        [data-testid="sign-in-banner"],
                        .tp-iframe-wrapper,
                        .tp-modal,
                        #piano-message,
                        .new-sitewide-navigation-promo {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.nytimes.com': {
        name: 'NYTimes',
        key: 'nytimes',
        hosts: ['www.nytimes.com', 'nytimes.com'],
        description: 'Softens meter / subscribe chrome so articles stay readable longer.',
        highlights: ['Hide subscribe banners', 'Trim app download bars'],
        options: {
            hideSubscribe: {
                name: 'Hide subscribe banners',
                hint: 'Subscription and meter promotional banners',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        #gateway-content,
                        .css-1eydlus,
                        [data-testid="standard-gateway"],
                        [data-testid="dock-gateway"],
                        .ad-banner,
                        #app-ad-top {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.olx.ua': {
        name: 'OLX',
        key: 'olx',
        hosts: ['www.olx.ua', 'olx.ua'],
        description: 'Hides promo / featured upsells so listings stay scannable.',
        highlights: ['Hide promoted listing badges chrome', 'Trim top marketing banners'],
        options: {
            hidePromos: {
                name: 'Hide promo banners',
                hint: 'Top marketing banners and featured upsell strips',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        [data-testid="top-banner"],
                        [data-testid="leasing-banner"],
                        .banner-container {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'rozetka.com.ua': {
        name: 'Rozetka',
        key: 'rozetka',
        hosts: ['rozetka.com.ua', 'www.rozetka.com.ua'],
        description: 'Quiets promo carousels and app bars so product browsing stays focused.',
        highlights: ['Hide app install bars', 'Trim homepage promo carousels'],
        options: {
            hidePromos: {
                name: 'Hide promo chrome',
                hint: 'App bars and loud homepage promo blocks',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .app-banner,
                        .rz-banner,
                        [class*="app-install"],
                        .main-goods__banner {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.udemy.com': {
        name: 'Udemy',
        key: 'udemy',
        hosts: ['www.udemy.com', 'udemy.com'],
        description: 'Hides sales banners and cart urgency chrome around courses.',
        highlights: ['Hide countdown / sale banners', 'Trim urgency cart prompts'],
        options: {
            hideSales: {
                name: 'Hide sale banners',
                hint: 'Sitewide sale and countdown promotional banners',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .ud-permanent-loader,
                        [data-purpose="safely-set-inner-html:rich-text-viewer:alert"],
                        .alert.alert-success,
                        .ud-component--smart-bar--smart-bar,
                        .udlite-smart-bar {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'store.steampowered.com': {
        name: 'Steam',
        key: 'steam',
        hosts: ['store.steampowered.com', 'steamcommunity.com'],
        description: 'Trims spotlight and marketing chrome on the storefront.',
        highlights: ['Hide spotlight marketing modules', 'Trim takeover banners'],
        options: {
            hideMarketing: {
                name: 'Hide marketing chrome',
                hint: 'Spotlight and takeover marketing modules',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .takeover_dialog,
                        #home_takeover {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },

    'www.coursera.org': {
        name: 'Coursera',
        key: 'coursera',
        hosts: ['www.coursera.org', 'coursera.org'],
        description: 'Hides upsell and degree promo chrome so course pages stay focused.',
        highlights: ['Hide degree / Plus upsells', 'Trim marketing banners'],
        options: {
            hideUpsells: {
                name: 'Hide upsells',
                hint: 'Coursera Plus and degree promotional banners',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        [data-track-component="upsell"],
                        [data-e2e="upsell-banner"],
                        a[href*="/courseraplus"],
                        .rc-TogglerBanner {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.dropbox.com': {
        name: 'Dropbox',
        key: 'dropbox',
        hosts: ['www.dropbox.com', 'dropbox.com'],
        description: 'Trims upgrade prompts so file browsing stays calm.',
        highlights: ['Hide upgrade / Plus banners', 'Trim trial prompts'],
        options: {
            hideUpgrade: {
                name: 'Hide upgrade prompts',
                hint: 'Plus / upgrade banners and trial prompts',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        [data-testid="dig-Banner"],
                        a[href*="/buy"],
                        a[href*="/upgrade"],
                        .dig-Banner {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.flickr.com': {
        name: 'Flickr',
        key: 'flickr',
        hosts: ['www.flickr.com', 'flickr.com'],
        description: 'Cuts ads and Pro upsells around photo browsing.',
        highlights: ['Hide ad units', 'Hide Pro upgrade chrome'],
        options: {
            hideAds: {
                name: 'Hide ads & Pro upsells',
                hint: 'Ad slots and Flickr Pro promotional banners',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .ads-container,
                        .ad-container,
                        .pro-upsell,
                        a[href*="/account/upgrade"],
                        .upsell-banner {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.theguardian.com': {
        name: 'The Guardian',
        key: 'guardian',
        hosts: ['www.theguardian.com', 'theguardian.com'],
        description: 'Softens contribution and newsletter prompts around articles.',
        highlights: ['Hide contribution banners', 'Trim newsletter modules'],
        options: {
            hidePrompts: {
                name: 'Hide contribution prompts',
                hint: 'Support / contribute and newsletter promotional modules',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        [data-component="contributions-banner"],
                        .site-message--contribution,
                        .site-message--engagement-banner,
                        .newsletter-promo,
                        aside[data-component="newsletter"] {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.imdb.com': {
        name: 'IMDb',
        key: 'imdb',
        hosts: ['www.imdb.com', 'imdb.com', 'm.imdb.com'],
        description: 'Quiets video and promo modules so title pages stay scannable.',
        highlights: ['Hide promo video autoplay chrome', 'Trim list / Pro upsells'],
        options: {
            hidePromos: {
                name: 'Hide promo chrome',
                hint: 'Promotional video modules and Pro upsells',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .ipc-promo,
                        [data-testid="hero-media__slate"],
                        a[href*="/pro"],
                        .imdb-pro-upsell,
                        .ipc-watchlist-ribbon--upsell {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.max.com': {
        name: 'Max',
        key: 'max',
        hosts: ['www.max.com', 'max.com', 'play.hbomax.com'],
        description: 'Trims billboard and marketing chrome so browsing titles stays calmer.',
        highlights: ['Hide large billboard heroes', 'Trim marketing banners'],
        options: {
            hideBillboard: {
                name: 'Hide billboard',
                hint: 'Large hero / billboard at the top of browse pages',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        [data-testid="hero"],
                        [data-testid="billboard"],
                        .hero-banner,
                        section[class*="Hero"] {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.crunchyroll.com': {
        name: 'Crunchyroll',
        key: 'crunchyroll',
        hosts: ['www.crunchyroll.com', 'crunchyroll.com'],
        description: 'Hides Premium upsells and promo banners around the catalog.',
        highlights: ['Hide Premium upgrade prompts', 'Trim marketing banners'],
        options: {
            hidePremium: {
                name: 'Hide Premium prompts',
                hint: 'Premium upgrade buttons and banners',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        a[href*="/premium"],
                        button[aria-label*="Premium" i],
                        .erc-premium-banner,
                        .premium-banner {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'zoom.us': {
        name: 'Zoom',
        key: 'zoom',
        hosts: ['zoom.us', 'www.zoom.us', 'app.zoom.us'],
        description: 'Hides marketing and AI upsell chrome on the web app and site.',
        highlights: ['Hide AI Companion / upgrade prompts', 'Trim marketing banners'],
        options: {
            hideUpsells: {
                name: 'Hide upsells',
                hint: 'AI Companion and upgrade promotional banners',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        [aria-label*="AI Companion" i],
                        a[href*="/pricing"],
                        .banner-ai,
                        .zm-modal-upsell {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'outlook.live.com': {
        name: 'Outlook',
        key: 'outlook',
        hosts: ['outlook.live.com', 'outlook.office.com', 'outlook.office365.com'],
        description: 'Hides Meet Now / OneDrive promo chrome so mail stays primary.',
        highlights: ['Hide Meet / Copilot promo entry points', 'Trim right-rail upsells'],
        options: {
            hidePromos: {
                name: 'Hide promo chrome',
                hint: 'Meet Now, Copilot, and right-rail promotional modules',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        button[aria-label*="Copilot" i],
                        button[aria-label*="Meet Now" i],
                        #owaPremiumUpsell,
                        [data-app-section="Upsell"] {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'mail.proton.me': {
        name: 'Proton Mail',
        key: 'protonmail',
        hosts: ['mail.proton.me', 'account.proton.me'],
        description: 'Hides Plus / Unlimited upsells so the inbox stays clean.',
        highlights: ['Hide upgrade banners', 'Trim storage upsell prompts'],
        options: {
            hideUpgrade: {
                name: 'Hide upgrade prompts',
                hint: 'Plus / Unlimited and storage upgrade banners',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        [data-testid="upsell-banner"],
                        .upsell-banner,
                        a[href*="/upgrade"],
                        button[data-testid="upgrade-dropdown"] {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'dou.ua': {
        name: 'DOU',
        key: 'dou',
        hosts: ['dou.ua', 'www.dou.ua'],
        description: 'Trims sidebar and job promo chrome so articles stay readable.',
        highlights: ['Hide sidebar promo blocks', 'Trim job board promo strips'],
        options: {
            hideSidebar: {
                name: 'Hide sidebar promos',
                hint: 'Sidebar ads and promotional job modules',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .b-sidebar-section.banners,
                        .banners,
                        .adv,
                        aside .banner {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },

    'maps.google.com': {
        name: 'Google Maps',
        key: 'googlemaps',
        hosts: ['maps.google.com'],
        description: 'Hides promo cards and app-install chrome around the map.',
        highlights: ['Hide promotional place cards', 'Trim app install bars'],
        options: {
            hidePromos: {
                name: 'Hide promo chrome',
                hint: 'Promotional cards and app-install bars on Maps',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .app-download-banner,
                        [aria-label*="Get the app" i],
                        .widget-pane-section-promo {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'news.google.com': {
        name: 'Google News',
        key: 'googlenews',
        hosts: ['news.google.com'],
        description: 'Trims For You promo chrome so the headline list stays scannable.',
        highlights: ['Hide promotional story modules', 'Trim follow suggestion cards'],
        options: {
            hidePromos: {
                name: 'Hide promo modules',
                hint: 'Promotional and suggestion cards in the feed',
                code: () => {
                    document.querySelectorAll('article, c-wiz').forEach((el) => {
                        const t = (el.textContent || '').toLowerCase()
                        if (t.includes('suggested for you') || t.includes('рекомендовано')) {
                            el.style.setProperty('display', 'none', 'important')
                        }
                    })
                },
            },
        },
    },
    'calendar.google.com': {
        name: 'Google Calendar',
        key: 'googlecalendar',
        hosts: ['calendar.google.com'],
        description: 'Hides Meet / Gemini promo chrome in the calendar UI.',
        highlights: ['Hide Gemini / AI prompts', 'Trim Get Meet chrome'],
        options: {
            hidePromos: {
                name: 'Hide promo chrome',
                hint: 'Gemini and Meet promotional entry points',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        [aria-label*="Gemini" i],
                        [data-tooltip*="Gemini" i],
                        a[href*="meet.google.com"][aria-label*="Get started" i] {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.aliexpress.com': {
        name: 'AliExpress',
        key: 'aliexpress',
        hosts: ['www.aliexpress.com', 'aliexpress.com', 'www.aliexpress.us'],
        hostSuffixes: ['aliexpress.com', 'aliexpress.us', 'aliexpress.ru'],
        description: 'Quiets flash-sale and coupon overlay chrome so browsing stays usable.',
        highlights: ['Hide coupon / lottery popups', 'Trim floating promo widgets'],
        options: {
            hidePopups: {
                name: 'Hide coupon popups',
                hint: 'Coupon, lottery, and welcome overlay popups',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .coupon-poplayer,
                        .next-overlay-wrapper,
                        .comet-modal-wrapper,
                        [class*="Coupon"],
                        [class*="poplayer"] {
                            display: none !important;
                        }
                        body {
                            overflow: auto !important;
                        }
                    `
                },
            },
        },
    },
    'www.apple.com': {
        name: 'Apple',
        key: 'apple',
        hosts: ['www.apple.com', 'apple.com'],
        description: 'Hides sticky store promo bars on product and marketing pages.',
        highlights: ['Hide sticky ac-promo banners', 'Trim trade-in promo strips'],
        options: {
            hideBanners: {
                name: 'Hide promo banners',
                hint: 'Sticky store and trade-in promotional banners',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .ac-promo,
                        .rf-bfe-tradein-banner,
                        aside.as-l-container.promo {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.microsoft.com': {
        name: 'Microsoft',
        key: 'microsoft',
        hosts: ['www.microsoft.com', 'microsoft.com'],
        description: 'Trims sticky promo and cookie-adjacent marketing bars on microsoft.com.',
        highlights: ['Hide sticky UHFP promos', 'Trim marketing ribbons'],
        options: {
            hidePromos: {
                name: 'Hide promo ribbons',
                hint: 'Sticky promotional ribbons on microsoft.com',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        #uhfCatError,
                        .c-uhfh-accentbanner,
                        .m-highlight-feature,
                        [data-bi-cn*="Promo"] {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },

    'www.patreon.com': {
        name: 'Patreon',
        key: 'patreon',
        hosts: ['www.patreon.com', 'patreon.com'],
        description: 'Hides membership upsell chrome so creator pages stay readable.',
        highlights: ['Hide become-a-member banners', 'Trim discovery promo modules'],
        options: {
            hideUpsells: {
                name: 'Hide membership upsells',
                hint: 'Become a member / pledge promotional banners',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        [data-tag="become-patron-button"] ~ *,
                        a[href*="/join"],
                        [data-tag="campaign-offer"],
                        aside [data-tag="pledge-cta"] {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.kickstarter.com': {
        name: 'Kickstarter',
        key: 'kickstarter',
        hosts: ['www.kickstarter.com', 'kickstarter.com'],
        description: 'Trims recommendation and email-capture chrome around projects.',
        highlights: ['Hide email capture modals', 'Trim recommended project shelves'],
        options: {
            hidePromos: {
                name: 'Hide promo chrome',
                hint: 'Email capture and recommended project shelves',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .modal-signup,
                        #email-capture,
                        .newsletter-signup,
                        [data-modal="newsletter"] {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.artstation.com': {
        name: 'ArtStation',
        key: 'artstation',
        hosts: ['www.artstation.com', 'artstation.com'],
        description: 'Hides marketplace and job promo chrome so portfolios stay visual.',
        highlights: ['Hide marketplace / job banners', 'Trim Pro upsells'],
        options: {
            hidePromos: {
                name: 'Hide promo chrome',
                hint: 'Marketplace, jobs, and Pro promotional banners',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .gallery-marketing-banner,
                        a[href*="/marketplace"],
                        a[href*="/job_postings"],
                        a[href*="/pro"],
                        .pro-badge-upsell {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.deviantart.com': {
        name: 'DeviantArt',
        key: 'deviantart',
        hosts: ['www.deviantart.com', 'deviantart.com'],
        description: 'Cuts Core upsells and ad chrome around deviations.',
        highlights: ['Hide Core / upgrade prompts', 'Trim ad slots'],
        options: {
            hideUpsells: {
                name: 'Hide Core & ads',
                hint: 'Core upgrade prompts and ad units',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        [data-testid="ad"],
                        .ad-container,
                        a[href*="/core"],
                        .upgrade-banner,
                        ._2vQZ_ {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.paypal.com': {
        name: 'PayPal',
        key: 'paypal',
        hosts: ['www.paypal.com', 'paypal.com'],
        description: 'Hides marketing banners in the logged-in wallet and marketing site.',
        highlights: ['Hide promo ribbons', 'Trim cross-sell cards'],
        options: {
            hidePromos: {
                name: 'Hide promo banners',
                hint: 'Marketing ribbons and cross-sell cards',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        [data-testid="promo-banner"],
                        .vx_globalNav-upsell,
                        .offer-card,
                        section[data-pa-id*="promo"] {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'web.archive.org': {
        name: 'Internet Archive',
        key: 'archive',
        hosts: ['web.archive.org', 'archive.org'],
        description: 'Trims donation and donate-banner chrome around captures.',
        highlights: ['Hide donation banners', 'Trim fundraising overlays'],
        options: {
            hideDonate: {
                name: 'Hide donation banners',
                hint: 'Donate / fundraising banners and overlays',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        #donate_banner,
                        .donation-banner,
                        .donate-banner,
                        #donation-banner,
                        .js--donate {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.weather.com': {
        name: 'Weather.com',
        key: 'weather',
        hosts: ['weather.com', 'www.weather.com'],
        description: 'Quiets ad and premium upsell chrome around the forecast.',
        highlights: ['Hide ad slots', 'Trim premium weather upsells'],
        options: {
            hideAds: {
                name: 'Hide ads & upsells',
                hint: 'Ad units and premium forecast upsells',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        [class*="AdWrapper"],
                        [id*="WxuAd"],
                        .adWrapper,
                        [data-testid="AdsCard"],
                        a[href*="/premium"] {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.accuweather.com': {
        name: 'AccuWeather',
        key: 'accuweather',
        hosts: ['www.accuweather.com', 'accuweather.com'],
        description: 'Hides ad units and premium prompts around forecasts.',
        highlights: ['Hide ad slots', 'Trim premium upgrade prompts'],
        options: {
            hideAds: {
                name: 'Hide ads & premium',
                hint: 'Ad units and AccuWeather premium prompts',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .ad-wrapper,
                        .ad-container,
                        .premium-cta,
                        a[href*="/premium"],
                        .header-ad {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'translate.google.com': {
        name: 'Google Translate',
        key: 'googletranslate',
        hosts: ['translate.google.com'],
        description: 'Hides history / contribute promo chrome so translation stays primary.',
        highlights: ['Hide contribute prompts', 'Trim side promo panels'],
        options: {
            hidePromos: {
                name: 'Hide promo chrome',
                hint: 'Contribute and side promotional panels',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        [aria-label*="Contribute" i],
                        .sSccNb,
                        c-wiz[jsrenderer] [data-promote] {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'drive.google.com': {
        name: 'Google Drive',
        key: 'googledrive',
        hosts: ['drive.google.com'],
        description: 'Hides Gemini / storage upsell chrome in Drive.',
        highlights: ['Hide Gemini prompts', 'Trim storage upgrade banners'],
        options: {
            hideUpsells: {
                name: 'Hide upsells',
                hint: 'Gemini and storage upgrade banners',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        [aria-label*="Gemini" i],
                        a[href*="one.google.com"],
                        [data-promo-id],
                        .a-s-tb-sc-Ja {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'docs.google.com': {
        name: 'Google Docs',
        key: 'googledocs',
        hosts: ['docs.google.com'],
        description: 'Hides Gemini and Workspace upsell chrome in Docs / Sheets / Slides.',
        highlights: ['Hide Gemini side panel prompts', 'Trim Workspace upgrade banners'],
        options: {
            hideUpsells: {
                name: 'Hide Gemini & upgrade prompts',
                hint: 'Gemini and Workspace upgrade promotional chrome',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        [aria-label*="Gemini" i],
                        [data-tooltip*="Gemini" i],
                        .docs-ml-header-ad,
                        .apps-upsell {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.duolingo.com': {
        name: 'Duolingo',
        key: 'duolingo',
        hosts: ['www.duolingo.com', 'duolingo.com'],
        description: 'Hides Super upsells so lessons stay the focus.',
        highlights: ['Hide Super / Plus banners', 'Trim shop energy prompts'],
        options: {
            hideSuper: {
                name: 'Hide Super upsells',
                hint: 'Super Duolingo upgrade banners and prompts',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        a[href*="/super"],
                        [data-test="super-banner"],
                        button[aria-label*="Super" i],
                        .super-banner {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'lichess.org': {
        name: 'Lichess',
        key: 'lichess',
        hosts: ['lichess.org', 'www.lichess.org'],
        description: 'Softens lobby noise so playing and studying stay front and center.',
        highlights: ['Hide lobby spotlight promos', 'Optional TV / blog chrome trimming'],
        options: {
            hideLobbyNoise: {
                name: 'Hide lobby promos',
                hint: 'Spotlight and promotional modules on the lobby',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .lobby__spotlights,
                        .lobby__blog,
                        .lobby__feed,
                        .lobby__about {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.bing.com': {
        name: 'Bing',
        key: 'bing',
        hosts: ['www.bing.com', 'bing.com'],
        description: 'Trims Copilot promo and side modules so results stay scannable.',
        highlights: ['Hide Copilot promo chrome', 'Optional related-search trimming'],
        options: {
            hideCopilot: {
                name: 'Hide Copilot promos',
                hint: 'Copilot / Bing Chat promotional entry points',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        #b_pilmcr,
                        .b_canvas,
                        #b_pole,
                        a[href*="copilot"],
                        #b_notificationContainer {
                            display: none !important;
                        }
                    `
                },
            },
            hideSidebar: {
                name: 'Hide side modules',
                hint: 'Right-rail knowledge / promo modules when present',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        #b_context,
                        aside#b_context {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'www.yahoo.com': {
        name: 'Yahoo',
        key: 'yahoo',
        hosts: ['www.yahoo.com', 'yahoo.com', 'news.yahoo.com', 'mail.yahoo.com', 'search.yahoo.com'],
        description: 'Quiets homepage and mail promo chrome around content.',
        highlights: ['Hide promo modules', 'Trim mail upsell banners'],
        options: {
            hidePromos: {
                name: 'Hide promo chrome',
                hint: 'Homepage and mail promotional modules',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        [data-test-locator="upsell"],
                        .Upsell,
                        .D(b).Bgc(#fff).Px(20px),
                        #login-body .promo,
                        .mail-upsell {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
    'wikipedia.org': {
        name: 'Wikipedia',
        key: 'wikipedia',
        hosts: ['wikipedia.org', 'www.wikipedia.org'],
        hostSuffixes: ['wikipedia.org'],
        description: 'Hides fundraising and donation banners so articles stay uninterrupted.',
        highlights: ['Hide CentralNotice / fundraising banners', 'Works across language subdomains'],
        options: {
            hideDonationBanners: {
                name: 'Hide donation banners',
                hint: 'CentralNotice and fundraising banners at the top of articles',
                code: () => {
                    const style = document.getElementById('purify-css')
                    style.innerHTML += `
                        .frb,
                        .frb-main,
                        .cn-fundraising,
                        #centralNotice,
                        .cnotice,
                        .cnotice-wrapper,
                        .mw-frb,
                        .banner-container,
                        .frbanner,
                        .wp-fundraising {
                            display: none !important;
                        }
                    `
                },
            },
        },
    },
}

export function getGlobalSite() {
    return sites.__global__
}

export function findSite(hostname) {
    const host = String(hostname || '').toLowerCase()
    if (!host) return undefined

    if (sites[host] && !sites[host].global) return sites[host]

    return Object.values(sites).find((site) => {
        if (site.global) return false
        if (site.hosts?.some((h) => h.toLowerCase() === host)) return true
        if (
            site.hostSuffixes?.some((suffix) => {
                const s = suffix.toLowerCase()
                return host === s || host.endsWith(`.${s}`)
            })
        ) {
            return true
        }
        return false
    })
}

export function sitesList() {
    const all = Object.values(sites)
    const global = all.filter((s) => s.global)
    const rest = all
        .filter((s) => !s.global)
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }))
    return [...global, ...rest]
}

export default { sites }
