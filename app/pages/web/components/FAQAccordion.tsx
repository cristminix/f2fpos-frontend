import React, { useState } from 'react'

interface FAQItem {
    question: string
    answer: string
}

const faqData: FAQItem[] = [
    {
        question: 'Apa itu Pawon?',
        answer: 'Pawon adalah platform e-commerce yang menyediakan berbagai produk kebutuhan sehari-hari dengan pengiriman cepat dan harga terjangkau.'
    },
    {
        question: 'Produk Apa Saja yang Tersedia di Pawon?',
        answer: 'Pawon menyediakan berbagai produk mulai dari makanan & minuman, kebutuhan rumah tangga, produk kesehatan & kecantikan, hingga perlengkapan bayi.'
    },
    {
        question: 'Pawon Sudah Tersedia di Kota Mana Saja?',
        answer: 'Pawon saat ini tersedia di Jakarta, Bandung, Surabaya, Medan, dan kota-kota besar lainnya di Indonesia. Kami terus memperluas jangkauan layanan.'
    },
    {
        question: 'Bagaimana Cara Belanja di Pawon?',
        answer: 'Cukup pilih produk yang Anda inginkan, masukkan ke keranjang, lakukan checkout, dan pilih metode pembayaran. Pesanan Anda akan segera diproses.'
    },
    {
        question: 'Kapan Waktu Operasional Pawon',
        answer: 'Pawon beroperasi 24/7 untuk pemesanan online. Pengiriman dilakukan setiap hari dari pukul 08.00 - 22.00.'
    },
    {
        question: 'Apa itu Mitra Pawon?',
        answer: 'Mitra Pawon adalah program kemitraan untuk toko dan UMKM yang ingin bergabung menjual produk mereka melalui platform Pawon.'
    }
]

export const FAQAccordion: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section className="bg-white py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto space-y-3">
                    {faqData.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-[#C4A57B] rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-[#F5E6D3] transition-colors"
                            >
                                <span className="font-medium text-[#3E2723] pr-4">
                                    {faq.question}
                                </span>
                                <svg
                                    className={`w-5 h-5 text-[#6D4C41] flex-shrink-0 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {openIndex === index && (
                                <div className="px-4 pb-4 pt-2 bg-[#F5E6D3]/50 text-[#4E342E] text-sm">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
