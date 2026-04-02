import { makeAutoObservable } from 'mobx'

export const REPORT_TYPES = [
  { value: 'compare', label: 'Compare' },
]

export const PARAMETERS = [
  { value: 'salinity', label: 'Salinity' },
  { value: 'temperature', label: 'Temperature' },
  { value: 'oxygen', label: 'Dissolved Oxygen' },
  { value: 'all-others', label: '...all others' },
]

export const TIME_PERIOD_TYPES = [
  { value: 'full', label: 'Full' },
  { value: 'monthly', label: 'Monthly' },
]

export const TIME_STATISTICS = [
  { value: 'none', label: 'None' },
  { value: 'mean', label: 'Mean' },
  { value: 'min', label: 'Min' },
  { value: 'max', label: 'Max' },
]

export const MODEL_LAYER_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export const ANALYSIS_OPTIONS = [
  { value: 'side-by-side', label: 'Side By Side' },
  { value: 'differences', label: 'Differences' },
]

export const SCENARIOS = [
  { value: 'dyk-scenario', label: 'Dylan Scenario', baseline: 'baseline' },
  { value: 'baseline', label: 'Baseline' },
  { value: 'post-development-bioextractions', label: 'Post-Development Bioextractions' },
  { value: 'andy-scenario', label: 'Andy Scenario', baseline: 'post-development-bioextractions' },
]

export const POINTS = [
  'Point A',
  'Point B',
  'Hudson River',
  'Central Sound',
]

export interface ChartSeries {
  name: string
  values: number[]
  secondary?: boolean
}

export interface ChartData {
  dates: string[]
  series: ChartSeries[]
}

function generateMockValues(length: number): number[] {
  return Array.from({ length }, (_, i) => Math.sin(i / 50) * 10 + Math.random() * 5 + 50)
}

function generateMockChartData(seriesNames: string[]): ChartData {
  const dates: string[] = []
  const startDate = new Date(2024, 0, 1)

  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    dates.push(date.toISOString().split('T')[0])
  }

  return {
    dates,
    series: seriesNames.map((name) => ({ name, values: generateMockValues(365) })),
  }
}


class ReportStore {
  reportType = REPORT_TYPES[0].value
  parameter = PARAMETERS[0].value
  timePeriod = TIME_PERIOD_TYPES[0].value
  timeStatistic = TIME_STATISTICS[0].value
  modelLayers: number[] = [MODEL_LAYER_OPTIONS[0]]
  modelLayerStat = TIME_STATISTICS[0].value
  analysis = ANALYSIS_OPTIONS[0].value
  scenario = SCENARIOS[0].value
  comparisonMode = SCENARIOS[1].value
  points: string[] = [POINTS[0]]

  constructor() {
    makeAutoObservable(this)
  }

  get isTimePeriodFull() {
    return this.timePeriod === TIME_PERIOD_TYPES[0].value
  }

  get isModelLayerSingle() {
    return this.modelLayers.length === 1
  }

  get timeStatisticOptions() {
    if (this.timePeriod === TIME_PERIOD_TYPES[1].value) {
      return TIME_STATISTICS.filter((s) => s.value !== TIME_STATISTICS[0].value)
    }
    return TIME_STATISTICS
  }

  get modelLayerStatOptions() {
    if (this.modelLayers.length > 1) {
      return TIME_STATISTICS.filter((s) => s.value !== TIME_STATISTICS[0].value)
    }
    return TIME_STATISTICS
  }

  set<K extends keyof this>(key: K, value: this[K]) {
    this[key] = value
    if (key === 'timePeriod') {
      if ((value as string) === TIME_PERIOD_TYPES[0].value) {
        this.timeStatistic = TIME_STATISTICS[0].value
      } else if ((value as string) === TIME_PERIOD_TYPES[1].value) {
        this.timeStatistic = TIME_STATISTICS[1].value
      }
    }
    if (key === 'modelLayers') {
      const layers = value as number[]
      this.modelLayerStat = layers.length === 1 ? TIME_STATISTICS[0].value : TIME_STATISTICS[1].value
    }
  }

  get scenarioOptions() {
    return SCENARIOS
      .filter((s) => s.value !== this.comparisonMode)
  }

  get comparisonModeOptions() {
    return SCENARIOS
      .filter((s) => s.value !== this.scenario)
  }

  get scenarioNote() {
    const scenario = SCENARIOS.find((s) => s.value === this.scenario)
    if (scenario?.baseline) {
      return 'This is a user scenario'
    }
    const comparisonMode = SCENARIOS.find((s) => s.value === this.comparisonMode)
    if (comparisonMode?.baseline === this.scenario) {
      return 'This is the matching baseline'
    }
    return 'This is a baseline'
  }

  get comparisonModeNote() {
    const comparisonMode = SCENARIOS.find((s) => s.value === this.comparisonMode)
    if (comparisonMode?.baseline) {
      return 'This is a user scenario'
    }
    const scenario = SCENARIOS.find((s) => s.value === this.scenario)
    if (scenario?.baseline === this.comparisonMode) {
      return 'This is the matching baseline'
    }
    return 'This is a baseline'
  }

  get canMatchBaseline() {
    const left = SCENARIOS.find((s) => s.value === this.scenario)
    const right = SCENARIOS.find((s) => s.value === this.comparisonMode)
    return !!(left?.baseline || right?.baseline)
  }

  matchBaseline() {
    const left = SCENARIOS.find((s) => s.value === this.scenario)
    if (left?.baseline) {
      this.comparisonMode = left.baseline
      return
    }
    const right = SCENARIOS.find((s) => s.value === this.comparisonMode)
    if (right?.baseline) {
      this.scenario = right.baseline
    }
  }

  toggleModelLayer(n: number) {
    if (this.modelLayers.includes(n)) {
      if (this.modelLayers.length === 1) return
      this.set('modelLayers', this.modelLayers.filter((x) => x !== n))
    } else {
      this.set('modelLayers', [...this.modelLayers, n].sort((a, b) => a - b))
    }
  }

  get isSideBySide() {
    return this.analysis === 'side-by-side'
  }

  get isDifferences() {
    return this.analysis === 'differences'
  }

  get scenarioLabel() {
    return SCENARIOS.find((s) => s.value === this.scenario)?.label ?? this.scenario
  }

  get comparisonModeLabel() {
    return SCENARIOS.find((s) => s.value === this.comparisonMode)?.label ?? this.comparisonMode
  }

  getChartDataForPoint(): Map<string, ChartData> {
    const chartDataMap = new Map<string, ChartData>()
    const seriesNames = (this.isSideBySide || this.isDifferences)
      ? [this.scenarioLabel, this.comparisonModeLabel]
      : [this.scenarioLabel]
    for (const point of this.points) {
      const base = generateMockChartData(seriesNames)
      if (this.isDifferences) {
        const aVals = base.series[0].values
        const bVals = base.series[1].values
        base.series.push({
          name: 'Difference',
          values: aVals.map((v, i) => v - bVals[i]),
          secondary: true,
        })
      }
      chartDataMap.set(point, base)
    }
    return chartDataMap
  }

  reset() {
    this.reportType = REPORT_TYPES[0].value
    this.parameter = PARAMETERS[0].value
    this.timePeriod = TIME_PERIOD_TYPES[0].value
    this.timeStatistic = TIME_STATISTICS[0].value
    this.modelLayers = [MODEL_LAYER_OPTIONS[0]]
    this.modelLayerStat = TIME_STATISTICS[0].value
    this.analysis = ANALYSIS_OPTIONS[0].value
    this.scenario = SCENARIOS[0].value
    this.comparisonMode = SCENARIOS[1].value
    this.points = [POINTS[0]]
  }
}

export const reportStore = new ReportStore()
