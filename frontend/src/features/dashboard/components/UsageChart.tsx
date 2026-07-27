import { useMemo } from 'react'
import styles from '../styles/dashboard.module.css'

interface UsageChartProps {
  points: { date: string; value: number }[]
}

export function UsageChart({ points }: UsageChartProps) {
  const { polyline, polygon, yLabels, xLabels, maxValue } = useMemo(() => {
    if (points.length === 0) {
      return { polyline: '', polygon: '0,132 638,132', yLabels: [], xLabels: [], maxValue: 0 }
    }

    const max = Math.max(...points.map((p) => p.value))
    const chartWidth = 638
    const chartHeight = 132
    const step = chartWidth / (points.length - 1)

    const coords = points.map((p, i) => ({
      x: Math.round(i * step),
      y: Math.round(chartHeight - (p.value / max) * (chartHeight - 10)),
    }))

    const polyline = coords.map((c) => `${c.x},${c.y}`).join(' ')
    const polygon = `0,${chartHeight} ${polyline} ${chartWidth},${chartHeight}`

    const yLabels = [max, Math.round(max * 0.75), Math.round(max * 0.5), Math.round(max * 0.25), 0].map(
      (v) => v >= 1000 ? `${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}k` : String(v),
    )

    const xLabels = points.filter((_, i) => i % Math.max(1, Math.floor(points.length / 6)) === 0 || i === points.length - 1).map((p) => {
      const d = new Date(p.date)
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    })

    return { polyline, polygon, yLabels, xLabels, maxValue: max }
  }, [points])

  return (
    <div className={styles.usageChart}>
      <div className={styles.chartY}>
        {yLabels.map((label, i) => (
          <span key={i}>{label}</span>
        ))}
      </div>
      <div className={styles.chartCanvas}>
        <div className={styles.chartGrid} />
        <svg viewBox="0 0 638 132" preserveAspectRatio="none" aria-label="AI usage chart" role="img">
          <defs>
            <linearGradient id="dashboard-area-gradient" x1="0" x2="0" y1="0" y2="1">
              <stop stopColor="#7668ee" stopOpacity=".26" />
              <stop offset="1" stopColor="#7668ee" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={polygon} fill="url(#dashboard-area-gradient)" />
          <polyline points={polyline} fill="none" stroke="#6b5de7" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
          {points.map((p, i) => {
            const step = 638 / (points.length - 1)
            const x = i * step
            const y = 132 - (p.value / maxValue) * 122
            return (
              <circle key={i} cx={x} cy={y} r="4" fill="#6b5de7" stroke="#fff" strokeWidth="2">
                <title>{`${new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}: ${p.value.toLocaleString()} requests`}</title>
              </circle>
            )
          })}
        </svg>
        <div className={styles.chartX}>
          {xLabels.map((label, i) => (
            <span key={i}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
