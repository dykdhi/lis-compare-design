function App() {
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
        <aside className="w-full lg:w-[380px] shrink-0 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-200 bg-gray-50 overflow-y-auto">
          <div className="px-4 py-3 border-b border-gray-200">
            <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Controls</span>
          </div>
          <div className="flex-1 p-4">
            {/* Controls content goes here */}
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
}

export default App
