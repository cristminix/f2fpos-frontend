import React from 'react'

interface HeroBannerProps {
    onViewDetails?: () => void
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onViewDetails }) => {
    return (
        <div className="relative text-white overflow-hidden">
            {/* Background Image */}
            <img
                src="https://images.squarespace-cdn.com/content/v1/5ff5bda739288b472043ab64/1610907469835-VWOG9JEH2PY4VGNDBFX4/Pawon+-+Kemasan+Yang+Terjamin?format=2500w"
                alt="Pawon Products"
                className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="container mx-auto px-4 py-8 relative z-10">
                <div className="flex flex-col items-center justify-between gap-6">
                    {/* Left Content */}
                    <div className="flex-1 space-y-4">
                        {/* <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                            🎉 Promo Spesial Hari Ini
                        </div> */}

                        {/* <h2 className="text-3xl font-bold leading-tight">
                            Raih Voucher Diskon
                        </h2> */}

                        {/* <div className="flex items-baseline gap-2">
                            <span className="text-sm font-medium">TOTAL</span>
                            <span className="text-5xl font-bold text-[#F5E6D3]">
                                100<span className="text-3xl">rb</span>
                            </span>
                        </div> */}

                        <div className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg w-fit">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="font-semibold">GRATIS ONGKIR</span>
                        </div>

                        <button
                            onClick={onViewDetails}
                            className="bg-white text-[#4E342E] px-6 py-3 rounded-lg font-semibold hover:bg-[#F5E6D3] transition-colors shadow-lg"
                        >
                            Lihat Detail
                        </button>
                    </div>

                    {/* Right Content - Product Images */}
                    <div className="flex-1 flex items-center justify-center hidden">
                        <div className="relative w-full max-w-md">
                            <div className="grid grid-cols-2 gap-4">
                                {/* Placeholder product images */}
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 aspect-square flex items-center justify-center">
                                    <div className="text-6xl">🥤</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 aspect-square flex items-center justify-center">
                                    <div className="text-6xl">🍪</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 aspect-square flex items-center justify-center">
                                    <div className="text-6xl">🍔</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 aspect-square flex items-center justify-center">
                                    <div className="text-6xl">🧃</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
