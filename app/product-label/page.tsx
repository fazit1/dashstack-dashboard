'use client'

import { Ship, Anchor, Truck, Users } from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

export default function ProductLabelPage() {
  const services = [
    {
      icon: Truck,
      title: 'Bongkar Muatan',
      description: 'Layanan profesional untuk membongkar muatan kapal dengan cepat dan aman di pelabuhan',
      features: ['Tim ahli bongkar muat', 'Peralatan modern', 'Proses cepat & efisien', 'Asuransi terjamin']
    },
    {
      icon: Anchor,
      title: 'Sewa Pandu',
      description: 'Layanan pandu kapal profesional untuk navigasi aman di perairan pelabuhan',
      features: ['Pandu berpengalaman', 'Lisensi resmi', '24/7 service', 'Pengetahuan lokal mendalam']
    },
    {
      icon: Ship,
      title: 'Dongking di Pelabuhan',
      description: 'Layanan docking kapal untuk perawatan dan perbaikan di fasilitas pelabuhan',
      features: ['Docking area luas', 'Fasilitas lengkap', 'Tim maintenance profesional', 'Perawatan rutin & emergency']
    }
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />
        
        {/* Product Label Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Label Produk - Layanan Pelabuhan</h1>
              <p className="text-gray-600">Solusi lengkap untuk kebutuhan logistik dan navigasi di pelabuhan</p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg mr-4">
                      <service.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-700">Fitur Utama:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-sm text-gray-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Pelajari Lebih Lanjut
                  </button>
                </div>
              ))}
            </div>

            {/* Additional Info Section */}
            <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Mengapa Memilih Layanan Kami?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Keunggulan</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Tim profesional dengan pengalaman bertahun-tahun</li>
                    <li>• Peralatan modern dan terstandar</li>
                    <li>• Layanan 24 jam non-stop</li>
                    <li>• Harga kompetitif dan transparan</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Area Layanan</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Seluruh pelabuhan utama di Indonesia</li>
                    <li>• Dukungan untuk berbagai jenis kapal</li>
                    <li>• Koordinasi dengan otoritas pelabuhan</li>
                    <li>• Dokumen lengkap dan legal</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
