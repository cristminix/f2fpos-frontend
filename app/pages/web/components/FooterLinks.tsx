import React from 'react'

interface FooterLink {
    label: string
    href: string
}

const footerLinks: FooterLink[] = [
    { label: 'Pawon Gocek', href: '#' },
    { label: 'Bantuan Toko', href: '#' },
    { label: 'Karir', href: '#' },
    { label: 'Refund', href: '#' },
    { label: 'Tentang Pawon', href: '#' },
    { label: 'Pawon Layanan', href: '#' },
    { label: 'Gabung Mitra Pawon', href: '#' },
    { label: 'Brand Partnership', href: '#' },
    { label: 'Kebijakan Privasi', href: '#' },
    { label: 'Syarat & Ketentuan', href: '#' }
]

export const FooterLinks: React.FC = () => {
    return (
        <footer className="bg-gradient-to-b from-[#E4D5B7] to-[#D4B896] py-8 border-t border-[#C4A57B]">
            <div className="container mx-auto px-4">
                <h3 className="text-lg font-bold text-[#3E2723] mb-4">
                    Cari semua di Pawon
                </h3>

                <div className="grid grid-cols-2 gap-3 mb-6">
                    {footerLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            className="text-sm text-[#4E342E] hover:text-[#3E2723] hover:underline transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="border-t border-[#C4A57B] pt-6 text-center text-sm text-[#4E342E]">
                    <p>&copy; {new Date().getFullYear()} Pawon. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
