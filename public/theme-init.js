// Paint system theme before Vue mounts (avoid light flash).
document.documentElement.setAttribute(
    'data-theme',
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
)
