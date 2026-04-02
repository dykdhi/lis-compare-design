import PlotModule from 'react-plotly.js'

const Plot = (PlotModule as any).default || PlotModule

export interface ChartData {
  dates: string[]
  values: number[]
}

export function Chart({ title, data }: { title: string; data: ChartData }) {
  return (
    <div className="flex flex-col gap-2 bg-white border border-gray-300 rounded p-4">
      <h3 className="text-sm font-medium text-gray-700">{title}</h3>
      <Plot
        data={[
          {
            x: data.dates,
            y: data.values,
            type: 'scatter' as const,
            mode: 'lines' as const,
            name: title,
            line: { color: 'rgb(31, 119, 180)' },
          } as any,
        ]}
        layout={{
          xaxis: {
            title: 'Date',
          },
          yaxis: {
            title: 'Value',
          },
          margin: { l: 50, r: 50, t: 10, b: 50 },
          height: 300,
        } as any}
        config={{ responsive: true }}
      />
    </div>
  )
}
