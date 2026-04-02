import PlotModule from 'react-plotly.js'
import type { ChartData } from '../store'

const Plot = (PlotModule as any).default || PlotModule

const SERIES_COLORS = ['rgb(31, 119, 180)', 'rgb(255, 127, 14)', 'rgb(44, 160, 44)']

export function Chart({ title, data }: { title: string; data: ChartData }) {
  const hasSecondary = data.series.some((s) => s.secondary)

  const traces = data.series.map((s, i) => ({
    x: data.dates,
    y: s.values,
    type: 'scatter' as const,
    mode: 'lines' as const,
    name: s.name,
    yaxis: s.secondary ? 'y2' : 'y',
    line: { color: SERIES_COLORS[i % SERIES_COLORS.length] },
  }))

  return (
    <div className="flex flex-col gap-2 bg-white border border-gray-300 rounded p-4">
      <h3 className="text-sm font-medium text-gray-700">{title}</h3>
      <Plot
        data={traces as any}
        layout={{
          xaxis: { title: 'Date' },
          yaxis: { title: 'Value' },
          ...(hasSecondary && {
            yaxis2: {
              title: 'Difference',
              overlaying: 'y',
              side: 'right',
              showgrid: false,
            },
          }),
          margin: { l: 50, r: hasSecondary ? 60 : 50, t: 10, b: 50 },
          height: 300,
          showlegend: data.series.length > 1,
          legend: { orientation: 'h', y: -0.3 },
        } as any}
        config={{ responsive: true }}
      />
    </div>
  )
}
