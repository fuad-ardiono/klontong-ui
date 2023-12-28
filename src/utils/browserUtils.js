export function getCookie(name) {
  const cookieValue = `; ${document.cookie}`
  const parts = cookieValue.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop()?.split(';')?.shift()?.toString() ?? null
  }

  return null
}
