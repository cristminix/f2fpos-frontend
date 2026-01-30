import React, { useState } from 'react'

interface TopNavigationProps {
    onSearch?: (query: string) => void
    onChatClick?: () => void
    onMenuClick?: () => void
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
    onSearch,
    onChatClick,
    onMenuClick
}) => {
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch?.(searchQuery)
    }

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center gap-3">
                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="flex-1">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Cari produk..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-[#8B6F47] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6D4C41] focus:border-transparent"
                            />
                            <svg
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6D4C41]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </form>

                    {/* Chat CS Button */}
                    <button
                        onClick={onChatClick}
                        className="flex items-center gap-1 px-3 py-2 text-sm text-[#4E342E] border border-[#8B6F47] rounded-lg hover:bg-[#E4D5B7] transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                        </svg>
                        <span>Chat CS</span>
                    </button>

                    {/* Menu Button */}
                    <button
                        onClick={onMenuClick}
                        className="p-2 text-[#4E342E] hover:bg-[#E4D5B7] rounded-lg transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    )
}
