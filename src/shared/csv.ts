export function toCsv<T extends Record<string, any>>(rows: T[], columns: { key: keyof T | string; header: string }[]): string {
  const escape = (value: any): string => {
    if (value === null || value === undefined) return ''
    let s = String(value)
    const needsQuotes = /[",\n\r;]/.test(s)
    s = s.replace(/"/g, '""')
    return needsQuotes ? `"${s}"` : s
  }

  const header = columns.map(c => escape(c.header)).join(',')
  const lines = rows.map(row => columns.map(c => escape((row as any)[c.key as string])).join(','))
  return [header, ...lines].join('\n')
}
