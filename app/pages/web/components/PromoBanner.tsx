import React, { useState } from 'react'

interface PromoBannerProps {
    message?: string
    ctaText?: string
    onCtaClick?: () => void
}

export const PromoBanner: React.FC<PromoBannerProps> = ({
    message = 'Dapatkan promo spesial Voucher s/d 100rb & Gratis Ongkir',
    ctaText = 'Dapatkan',
    onCtaClick
}) => {
    const [isVisible, setIsVisible] = useState(true)

    if (!isVisible) return null

    return (
        <div className="fixed bottom-16 left-0 right-0 z-30 bg-gradient-to-r from-[#8B6F47] to-[#6D4C41] text-white shadow-lg">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                    {/* Promo Image/Icon */}
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🎁</span>
                    </div>

                    {/* Message */}
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2">{message}</p>
                    </div>

                    {/* CTA Button */}
                    <button
                        onClick={onCtaClick}
                        className="flex-shrink-0 bg-white text-[#4E342E] px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#F5E6D3] transition-colors shadow-md"
                    >
                        {ctaText}
                    </button>

                    {/* Close Button */}
                    <button
                        onClick={() => setIsVisible(false)}
                        className="flex-shrink-0 p-1 hover:bg-white/20 rounded-full transition-colors"
                        aria-label="Close"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
