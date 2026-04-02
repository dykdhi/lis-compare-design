import { makeAutoObservable } from 'mobx'

export const REPORT_TYPES = [
  { value: 'hypoxia', label: 'Hypoxia' },
  { value: 'compare', label: 'Compare' },
]

export const PARAMETERS = [
  { value: 'salinity', label: 'Salinity' },
  { value: 'temperature', label: 'Temperature' },
  { value: 'oxygen', label: 'Oxygen' },
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

export const SPATIAL_AGGREGATIONS = [
  { value: '', label: 'Select…' },
  { value: 'county', label: 'County' },
  { value: 'state', label: 'State' },
  { value: 'region', label: 'Region' },
]

export const TEMPORAL_AGGREGATIONS = [
  { value: '', label: 'Select…' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'yearly', label: 'Yearly' },
]

export const SCENARIOS = [
  { value: '', label: 'Select…' },
  { value: 'baseline', label: 'Baseline' },
  { value: 'rcp45', label: 'RCP 4.5' },
  { value: 'rcp85', label: 'RCP 8.5' },
]

export const COMPARISON_MODES = [
  { value: '', label: 'Select…' },
  { value: 'none', label: 'None' },
  { value: 'absolute', label: 'Absolute Difference' },
  { value: 'percent', label: 'Percent Change' },
]

class ReportStore {
  reportType = 'compare'
  parameter = 'salinity'
  timePeriod = 'full'
  timeStatistic = 'none'
  modelLayers: number[] = []
  modelLayerStat = 'none'
  spatialAgg = ''
  temporalAgg = ''
  scenario = ''
  comparisonMode = ''

  constructor() {
    makeAutoObservable(this)
  }

  set<K extends keyof this>(key: K, value: this[K]) {
    this[key] = value
  }

  toggleModelLayer(n: number) {
    if (this.modelLayers.includes(n)) {
      this.modelLayers = this.modelLayers.filter((x) => x !== n)
    } else {
      this.modelLayers = [...this.modelLayers, n].sort((a, b) => a - b)
    }
  }

  reset() {
    this.reportType = 'compare'
    this.parameter = 'salinity'
    this.timePeriod = 'full'
    this.timeStatistic = 'none'
    this.modelLayers = []
    this.modelLayerStat = 'none'
    this.spatialAgg = ''
    this.temporalAgg = ''
    this.scenario = ''
    this.comparisonMode = ''
  }
}

export const reportStore = new ReportStore()
