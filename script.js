// Datas
import { allEmojis } from './allEmojis.js'
const languageFlags = { en: '🇬🇧', de: '🇩🇪', ar: '🇸🇦', zh: '🇨🇳', fr: '🇫🇷', hi: '🇮🇳', id: '🇮🇩', ga: '🇮🇪', it: '🇮🇹', ja: '🇯🇵', ko: '🇰🇷', pl: '🇵🇱', pt: '🇵🇹', ru: '🇷🇺', es: '🇪🇸', vi: '🇻🇳',}
const languages = [ 'en', 'de', 'fr', 'ar', 'zh', 'es', 'hi', 'id', 'ga', 'it', 'ja', 'ko', 'pl', 'pt', 'ru', 'vi']

// Grab dom elements.
const textInput = document.getElementById('input')
const preview = document.getElementById('preview')
const copyBtn = document.getElementById('copy-btn')
const translateBtn = document.getElementById('translate-btn')
const loadingBar = document.getElementById('loading-bar')

// flag
let loadingStep = 0

// Attach event listeners
textInput.addEventListener('change', (e) => {
  if (!e.target.value) {
    copyBtn.disabled = 'disabled'
  }
  copyBtn.disabled = false
})

translateBtn.addEventListener('click', async (e) => {
  e.preventDefault()
  loadingBar.classList.add('loading')
  loadingBar.innerText = 'Hazirlaniyor...'
  preview.innerText = ''
  preview.innerText = addRandomEmoji(textInput.value) + '🇹🇷' + '\n\n'
  await translateAll()
  loadingBar.classList.remove('loading')
  loadingBar.innerText = 'Kopyalamaya Hazir!!!!!'
})

copyBtn.addEventListener('click', (e) => {
  e.preventDefault()
  navigator.clipboard.writeText(preview.innerText)
})

// Helpers
async function translate(language, randomEmoji) {
  // Html encode.
 const encodedInput = encodeURI(input.value)
 // Fetch data.
  const response = await fetch(
    'https://translate.argosopentech.com/translate',
    {
      body: `q=${encodedInput}&source=tr&target=${language}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    }
  )
  // Process data.
  const data = await response.json()
  let translated = data.translatedText
  translated += ' ' + languageFlags[language] + '\n\n'

  if (randomEmoji) {
    translated = addRandomEmoji(translated)
  }

  loadingStep++
  loadingBar.style.width = (loadingStep / 16) * 100 + '%'
  return translated
}

async function translateAll() {
  for (const language of languages) {
    preview.innerText += await translate(language, input.value, true)
  }
}

function addRandomEmoji(text) {
  var spaceCount = text.split(' ').length - 1

  for (let i = 0; i < spaceCount; i++) {
    const randomNumber = Math.random()
    const emojiIndex = Math.floor(Math.random() * 909)
    if (randomNumber > 0.5) {
      text = text.replace(' ', allEmojis[emojiIndex])
    }
  }
  return text
}
