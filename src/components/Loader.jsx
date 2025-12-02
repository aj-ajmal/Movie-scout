import React from 'react'

export default function Loader({ full = false, message = 'Loading...' }) {
	// full: if true, show full-screen overlay loader
	return (
		<div className={full ? 'fixed inset-0 z-50 flex items-center justify-center bg-black/60' : 'flex items-center justify-center py-8'}>
			<div className="flex flex-col items-center gap-4">
				<div className="relative">
					<div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-sky-500 p-1 shadow-xl">
						<div className="w-full h-full rounded-full bg-black/85 flex items-center justify-center">
							<svg className="w-10 h-10 text-white animate-spin" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="4" strokeOpacity="0.15" />
								<path d="M45 25a20 20 0 00-7.5-15" stroke="white" strokeWidth="4" strokeLinecap="round" />
							</svg>
						</div>
					</div>
					<div className="absolute -bottom-3 -right-3 bg-amber-400 text-black text-xs font-semibold px-2 py-1 rounded-full shadow">Movie</div>
				</div>

				<div className="text-center">
					<div className="text-sm text-gray-300">{message}</div>
					<div className="mt-2 flex items-center justify-center gap-2">
						<span style={{ animationDelay: '0s' }} className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce inline-block" />
						<span style={{ animationDelay: '0.08s' }} className="w-2 h-2 bg-sky-400 rounded-full animate-bounce inline-block" />
						<span style={{ animationDelay: '0.16s' }} className="w-2 h-2 bg-rose-400 rounded-full animate-bounce inline-block" />
					</div>
				</div>
			</div>
		</div>
	)
}

