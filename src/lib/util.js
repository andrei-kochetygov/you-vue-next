export function createUrl (base, query) {
  const url = new URL(base)

  for (const key in query) {
    url.searchParams.set(key, query[key])
  }

  return url
}