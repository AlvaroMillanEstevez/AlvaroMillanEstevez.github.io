// Writes build/playable-ads/index.html: the same app shell with its own title and sharing tags.
// LinkedIn and other link previews do not run JavaScript, so these have to be in the HTML.
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://alvaromillanestevez.github.io';
const PAGE_URL = `${SITE_URL}/playable-ads/`;
const IMAGE_URL = `${SITE_URL}/assets/og-playable-ads.jpg`;
const TITLE = 'Phaser playable ads for mobile games | Álvaro Millán Estevez';
const DESCRIPTION =
  'Playable ads for mobile game studios and user acquisition agencies, built once with Phaser and exported for each ad network. Try two real builds on the page.';

const escapeAttribute = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

const replaceOnce = (html, pattern, replacement) => {
  if (!pattern.test(html)) {
    throw new Error(`Pattern not found in build/index.html: ${pattern}`);
  }
  return html.replace(pattern, replacement);
};

const buildDir = path.join(__dirname, '..', 'build');
let html = fs.readFileSync(path.join(buildDir, 'index.html'), 'utf8');

html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${TITLE}</title>`);
html = replaceOnce(
  html,
  /<meta name="description" content="[^"]*"\s*\/?>/,
  `<meta name="description" content="${escapeAttribute(DESCRIPTION)}"/>`
);

const sharingTags = [
  ['rel', 'canonical', PAGE_URL],
  ['property', 'og:type', 'website'],
  ['property', 'og:url', PAGE_URL],
  ['property', 'og:title', TITLE],
  ['property', 'og:description', DESCRIPTION],
  ['property', 'og:image', IMAGE_URL],
  ['property', 'og:image:width', '1200'],
  ['property', 'og:image:height', '630'],
  ['name', 'twitter:card', 'summary_large_image']
]
  .map(([attribute, name, value]) =>
    attribute === 'rel'
      ? `<link rel="${name}" href="${escapeAttribute(value)}"/>`
      : `<meta ${attribute}="${name}" content="${escapeAttribute(value)}"/>`
  )
  .join('');

html = replaceOnce(html, /<\/head>/, `${sharingTags}</head>`);

fs.mkdirSync(path.join(buildDir, 'playable-ads'), { recursive: true });
fs.writeFileSync(path.join(buildDir, 'playable-ads', 'index.html'), html);
console.log('Wrote build/playable-ads/index.html');
