import React, { useState } from 'react'

type NavItem = 'beranda' | 'kategori' | 'transaksi' | 'akun'

interface BottomNavigationProps {
    activeTab?: NavItem
    onTabChange?: (tab: NavItem) => void
}

interface NavItemConfig {
    id: NavItem
    label: string
    icon: string
}

const navItems: NavItemConfig[] = [
    {
        id: 'beranda',
        label: 'Beranda',
        icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
    },
    {
        id: 'kategori',
        label: 'Kategori',
        icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
    },
    {
        id: 'transaksi',
        label: 'Transaksi',
        icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    },
    {
        id: 'akun',
        label: 'Akun',
        icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
    }
]

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
    activeTab = 'beranda',
    onTabChange
}) => {
    const [active, setActive] = useState<NavItem>(activeTab)

    const handleTabClick = (tab: NavItem) => {
        setActive(tab)
        onTabChange?.(tab)
    }

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#C4A57B] shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-around">
                    {navItems.map((item) => {
                        const isActive = active === item.id
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleTabClick(item.id)}
                                className={`flex flex-col items-center justify-center py-3 px-4 flex-1 transition-colors ${isActive
                                    ? 'text-[#6D4C41]'
                                    : 'text-gray-500 hover:text-[#8B6F47]'
                                    }`}
                            >
                                <svg
                                    className={`w-6 h-6 mb-1 ${isActive ? 'fill-current' : ''}`}
                                    fill={isActive ? 'currentColor' : 'none'}
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth={isActive ? 0 : 2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d={item.icon}
                                    />
                                </svg>
                                <span className={`text-xs ${isActive ? 'font-semibold' : 'font-medium'}`}>
                                    {item.label}
                                </span>
                                {isActive && (
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#6D4C41] rounded-t-full" />
                                )}
                            </button>
                        )
                    })}
                </div>
            </div>
        </nav>
    )
}
