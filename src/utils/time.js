export function timeAgo(isoStr, lang = 'en') {
  if (!isoStr) return ''
  const diffMs = Date.now() - new Date(isoStr).getTime()
  const diffMins = Math.floor(diffMs / 60_000)
  const diffHours = Math.floor(diffMs / 3_600_000)
  const diffDays = Math.floor(diffMs / 86_400_000)

  if (lang === 'es') {
    if (diffMins < 1) return 'ahora'
    if (diffMins < 60) return `${diffMins}m`
    if (diffHours < 24) return `${diffHours}h ${diffMins % 60}m`
    return `${diffDays}d`
  }
  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ${diffMins % 60}m ago`
  return `${diffDays}d ago`
}

export function isOverLimit(isoStr, limitHours = 24) {
  if (!isoStr) return false
  return Date.now() - new Date(isoStr).getTime() > limitHours * 3_600_000
}

export function formatShortDate(isoStr, lang = 'en') {
  if (!isoStr) return ''
  try {
    return new Intl.DateTimeFormat(lang === 'es' ? 'es-MX' : 'en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(isoStr))
  } catch {
    return isoStr.slice(0, 16)
  }
}
