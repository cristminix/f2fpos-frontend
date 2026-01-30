import React, { useState, useEffect } from 'react'

interface CountdownBannerProps {
    initialMinutes?: number
    promotionText?: string
}

export const CountdownBanner: React.FC<CountdownBannerProps> = ({
    initialMinutes = 15,
    promotionText = 'Belanja 24 Jam di kenceng 15.000 produk'
}) => {
    const [timeLeft, setTimeLeft] = useState(initialMinutes * 60) // in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : initialMinutes * 60))
        }, 1000)

        return () => clearInterval(timer)
    }, [initialMinutes])

    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60

    return (
        <div className="bg-[#D4B896] border-b border-[#8B6F47]">
            <div className="container mx-auto px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-[#3E2723] font-medium">Tiba dalam</span>
                        <div className="bg-[#3E2723] text-white px-3 py-1 rounded-md font-bold text-sm">
                            {minutes} Menit
                        </div>
                    </div>
                    <span className="text-xs text-[#4E342E]">
                        {promotionText}
                    </span>
                </div>
                <div className="text-[#6D4C41]">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}
