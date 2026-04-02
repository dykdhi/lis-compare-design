import { observer } from 'mobx-react-lite'
import {
  reportStore,
  REPORT_TYPES,
  PARAMETERS,
  TIME_PERIOD_TYPES,
  TIME_STATISTICS,
  MODEL_LAYER_OPTIONS,
  SPATIAL_AGGREGATIONS,
  TEMPORAL_AGGREGATIONS,
  SCENARIOS,
  COMPARISON_MODES,
} from './store'
import { SelectField } from './components/SelectField'
import { MultiCombobox } from './components/MultiCombobox'

const App = observer(() => {
  const store = reportStore
  const isAggEnabled = store.spatialAgg !== '' || store.temporalAgg !== ''
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Top App Bar */}
      <header className="flex items-center justify-between px-4 bg-indigo-700 text-white shrink-0" style={{ height: '60px' }}>
        <span className="text-lg font-semibold tracking-wide">Compare Report</span>
        <div className="flex items-center gap-3">
          {/* Placeholder for icons/user menu */}
          <div className="w-8 h-8 rounded-full bg-indigo-500" aria-label="User menu placeholder" />
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">

        {/* Left Controls Panel */}
        <aside className="w-full lg:w-[620px] shrink-0 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-200 bg-white overflow-y-auto">
          {/* Sticky header */}
          <div className="sticky top-0 bg-white z-10 px-4 pt-4 pb-2 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-gray-800">Report Parameters</h2>
          </div>

          <div className="flex flex-col gap-6 p-4 flex-1">
            <section className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <SelectField label="Report Type" value={store.reportType} options={REPORT_TYPES} onChange={(v) => store.set('reportType', v)} />
                <SelectField label="Parameter" value={store.parameter} options={PARAMETERS} onChange={(v) => store.set('parameter', v)} />
              </div>
            </section>

            <section className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <SelectField label="Time Period Type" value={store.timePeriod} options={TIME_PERIOD_TYPES} onChange={(v) => store.set('timePeriod', v)} />
                <SelectField label="Time Statistic" value={store.timeStatistic} options={TIME_STATISTICS} onChange={(v) => store.set('timeStatistic', v)} />
                <MultiCombobox
                  label="Model Layer"
                  selected={store.modelLayers}
                  options={MODEL_LAYER_OPTIONS}
                  onChange={(layers) => store.set('modelLayers', layers)}
                />
                <SelectField label="Model Layer Statistic" value={store.modelLayerStat} options={TIME_STATISTICS} onChange={(v) => store.set('modelLayerStat', v)} />
              </div>
            </section>

            <section className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <SelectField label="Spatial Aggregation" value={store.spatialAgg} options={SPATIAL_AGGREGATIONS} onChange={(v) => store.set('spatialAgg', v)} />
                <SelectField label="Temporal Aggregation" value={store.temporalAgg} options={TEMPORAL_AGGREGATIONS} onChange={(v) => store.set('temporalAgg', v)} />
              </div>
            </section>

            <section className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <SelectField label="Scenario / Model Run" value={store.scenario} options={SCENARIOS} onChange={(v) => store.set('scenario', v)} />
                <SelectField label="Baseline / Comparison Mode" value={store.comparisonMode} options={COMPARISON_MODES} onChange={(v) => store.set('comparisonMode', v)} />
              </div>
            </section>
          </div>

          {/* Reset / Apply */}
          <div className="px-4 pb-4 pt-2 border-t border-gray-200">
            <div className="flex gap-2">
              <button
                onClick={() => store.reset()}
                className="flex-1 h-9 rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-50"
              >
                Reset
              </button>
              <button className="flex-1 h-9 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700">
                Apply
              </button>
            </div>
          </div>
        </aside>

        {/* Right Data Panel */}
        <main className="flex-1 flex flex-col overflow-hidden bg-white">
          <div className="flex-1 p-4 flex flex-col overflow-hidden">
            {/* Map Placeholder */}
            <div className="flex-1 flex items-center justify-center rounded border border-gray-300 bg-gray-100 text-gray-400 text-base">
              Map Placeholder
            </div>
          </div>
        </main>

      </div>
    </div>
  )
})

export default App
