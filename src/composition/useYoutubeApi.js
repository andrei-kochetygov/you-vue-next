import { createUrl } from '../lib/util'

const part = 'snippet'
const type = [
  'video',
  'channel',
  'playlist',
]

export default function useYoutubeApi (key) {
  async function call (endpoint, options) {
    const query = Object.assign({
      key,
      part,
      type,
    }, options)

    const url = createUrl(`https://www.googleapis.com/youtube/v3/${endpoint}`, query)

    return await fetch(url)
      .then(response => response.json())
      .catch(error => {
        throw new Error(error)
      })
  }

  async function fetchSearchResults (options) {
    return await call('search', options)
  }

  async function fetchVideo (options) {
    return await call('videos', options)
  }

  return {
    call,
    fetchSearchResults,
    fetchVideo,
  }
}