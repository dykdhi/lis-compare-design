import { observer } from 'mobx-react-lite'
import {
  reportStore,
  REPORT_TYPES,
  PARAMETERS,
  TIME_PERIOD_TYPES,
  MODEL_LAYER_OPTIONS,
  ANALYSIS_OPTIONS,
} from './store'
import { SelectField } from './components/SelectField'
import { MultiCombobox } from './components/MultiCombobox'

const App = observer(() => {
  const store = reportStore
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Top App Bar */}
      <header className="flex items-center justify-between px-4 bg-indigo-700 text-white shrink-0" style={{ height: '60px' }}>
        <span className="text-lg font-semibold tracking-wide">LISHWQMS - Compare Report</span>
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
                <SelectField label="Time Statistic" value={store.timeStatistic} options={store.timeStatisticOptions} onChange={(v) => store.set('timeStatistic', v)} disabled={store.isTimePeriodFull} />
                <MultiCombobox
                  label="Model Layer"
                  selected={store.modelLayers}
                  options={MODEL_LAYER_OPTIONS}
                  onChange={(layers) => store.set('modelLayers', layers)}
                  minSelected={1}
                />
                <SelectField label="Model Layer Statistic" value={store.modelLayerStat} options={store.modelLayerStatOptions} onChange={(v) => store.set('modelLayerStat', v)} disabled={store.isModelLayerSingle} />
              </div>
            </section>

            <section className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div />
                <SelectField label="Analysis" value={store.analysis} options={ANALYSIS_OPTIONS} onChange={(v) => store.set('analysis', v)} />
              </div>
            </section>

            <section className="space-y-3">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <SelectField label="Left Side (A)" value={store.scenario} options={store.scenarioOptions} onChange={(v) => store.set('scenario', v)} baselineMatch={store.scenarioIsBaseline} />
                </div>
                <button
                  onClick={() => store.matchBaseline()}
                  disabled={!store.canMatchBaseline}
                  title="Match baseline"
                  className="h-9 px-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  aria-label="Match baseline"
                >
                  ⇄
                </button>
                <div className="flex-1">
                  <SelectField label="Right Side (B)" value={store.comparisonMode} options={store.comparisonModeOptions} onChange={(v) => store.set('comparisonMode', v)} baselineMatch={store.comparisonModeIsBaseline} />
                </div>
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
