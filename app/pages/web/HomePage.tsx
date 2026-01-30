import React from 'react'
import { CountdownBanner } from './components/CountdownBanner'
import { TopNavigation } from './components/TopNavigation'
import { HeroBanner } from './components/HeroBanner'
import { PromoGrid } from './components/PromoGrid'
import { CategoryGrid } from './components/CategoryGrid'
import { FAQAccordion } from './components/FAQAccordion'
import { FooterLinks } from './components/FooterLinks'
import { SocialMedia } from './components/SocialMedia'
import { AppDownload } from './components/AppDownload'
import { BottomNavigation } from './components/BottomNavigation'
import { PromoBanner } from './components/PromoBanner'

export default function HomePage() {
    const handleSearch = (query: string) => {
        console.log('Search query:', query)
        // TODO: Implement search functionality
    }

    const handleChatClick = () => {
        console.log('Chat CS clicked')
        // TODO: Open chat widget
    }

    const handleMenuClick = () => {
        console.log('Menu clicked')
        // TODO: Open side menu
    }

    const handleViewDetails = () => {
        console.log('View promo details')
        // TODO: Navigate to promo details page
    }

    const handleCategoryClick = (categoryId: number | string) => {
        console.log('Category clicked:', categoryId)
        // TODO: Navigate to category page
    }

    const handlePromoClick = () => {
        console.log('Promo banner clicked')
        // TODO: Navigate to promo page
    }

    const handleTabChange = (tab: string) => {
        console.log('Tab changed:', tab)
        // TODO: Handle navigation between tabs
    }

    return (
        <div className="min-h-screen bg-white pb-20 max-w-[428px] mx-auto">
            {/* Top Navigation */}
            <TopNavigation
                onSearch={handleSearch}
                onChatClick={handleChatClick}
                onMenuClick={handleMenuClick}
            />

            {/* Countdown Banner */}
            <CountdownBanner />

            {/* Hero Banner */}
            <HeroBanner onViewDetails={handleViewDetails} />

            {/* Promo Grid */}
            <PromoGrid onCategoryClick={handleCategoryClick} />

            {/* Category Grid */}
            <CategoryGrid onCategoryClick={handleCategoryClick} />

            {/* FAQ Section */}
            <FAQAccordion />

            {/* Social Media */}
            <SocialMedia />

            {/* App Download */}
            <AppDownload />

            {/* Footer Links */}
            <FooterLinks />

            {/* Sticky Promo Banner */}
            <PromoBanner onCtaClick={handlePromoClick} />

            {/* Bottom Navigation */}
            <BottomNavigation activeTab="beranda" onTabChange={handleTabChange} />
        </div>
    )
}