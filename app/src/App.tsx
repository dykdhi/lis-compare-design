import { observer } from 'mobx-react-lite'
import {
  reportStore,
  REPORT_TYPES,
  PARAMETERS,
  TIME_PERIOD_TYPES,
  MODEL_LAYER_OPTIONS,
  ANALYSIS_OPTIONS,
  POINTS,
} from './store'
import { SelectField } from './components/SelectField'
import { MultiCombobox } from './components/MultiCombobox'
import { Chart } from './components/Chart'

const App = observer(() => {
  const store = reportStore
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Top App Bar */}
      <header className="flex items-center justify-between px-4 bg-gray-500 text-white shrink-0" style={{ height: '60px' }}>
        <span className="text-lg font-semibold tracking-wide">LISHWQMS - Compare Report Design Draft</span>
        <div className="flex items-center gap-3">
          {/* Placeholder for icons/user menu */}
          <div className="w-8 h-8 rounded-full bg-gray-400" aria-label="User menu placeholder" />
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">

        {/* Left Controls Panel */}
        <aside className="w-full lg:w-[620px] shrink-0 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-200 bg-white overflow-hidden">
          {/* Non-scrollable controls section */}
          <div className="flex flex-col gap-6 p-4 shrink-0">
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
              <div className="flex gap-2">
                <div className="flex-1">
                  <SelectField label="Left Side (A)" value={store.scenario} options={store.scenarioOptions} onChange={(v) => store.set('scenario', v)} helperText={store.scenarioNote} />
                </div>
                <div className="pt-5">
                  <button
                    onClick={() => store.matchBaseline()}
                    disabled={!store.canMatchBaseline}
                    title="Match baseline"
                    className="h-9 px-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                    aria-label="Match baseline"
                  >
                    ⇄
                  </button>
                </div>
                <div className="flex-1">
                  <SelectField label="Right Side (B)" value={store.comparisonMode} options={store.comparisonModeOptions} onChange={(v) => store.set('comparisonMode', v)} helperText={store.comparisonModeNote} />
                </div>
              </div>
            </section>

            <div className="border-t border-gray-200" />

            <section className="space-y-3">
              <MultiCombobox
                label="Points"
                selected={store.points}
                options={POINTS}
                onChange={(points) => store.set('points', points)}
                minSelected={1}
              />
            </section>
          </div>

          {/* Scrollable charts panel */}
          <div className="flex-1 overflow-y-auto border-t border-gray-200">
            <div className="p-4 flex flex-col gap-4">
              {store.points.length === 0 ? (
                <div className="flex items-center justify-center rounded border border-gray-300 bg-gray-100 text-gray-400 text-base py-8">
                  Select points to view charts
                </div>
              ) : (
                Array.from(store.getChartDataForPoint()).map(([point, data]) => (
                  <Chart key={point} title={point} data={data} />
                ))
              )}
            </div>
          </div>
        </aside>

        {/* Right Data Panel */}
        <main className="flex-1 flex flex-col overflow-hidden bg-white">
          <div className="flex-1 overflow-auto p-4">
              <img
                src={store.isSideBySide ? `${import.meta.env.BASE_URL}compare.png` : `${import.meta.env.BASE_URL}differences.png`}
                alt={store.isSideBySide ? 'Side by side comparison' : 'Differences'}
                className="max-w-full h-auto"
              />
            </div>
        </main>

      </div>
    </div>
  )
})

export default App
