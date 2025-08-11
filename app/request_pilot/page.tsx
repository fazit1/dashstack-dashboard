'use client';

import { useState } from 'react';
import { FiAnchor, FiCalendar, FiClock, FiUser, FiNavigation, FiCheckCircle, FiX, FiAlertCircle } from 'react-icons/fi';
import { FaShip } from 'react-icons/fa';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

interface Ship {
  id: string;
  name: string;
  type: string;
  captain: string;
  arrivalTime: string;
  estimatedDocking: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'selected' | 'approved' | 'rejected';
  cargo: string;
  weight: string;
  origin: string;
  dock: string;
  description: string;
}

export default function RequestPilotPage() {
  const [ships, setShips] = useState<Ship[]>([
    {
      id: '1',
      name: 'MV Ocean Star',
      type: 'Cargo Ship',
      captain: 'Capt. John Smith',
      arrivalTime: '2024-01-15 08:30',
      estimatedDocking: '2024-01-15 09:00',
      priority: 'high',
      status: 'pending',
      cargo: 'Container',
      weight: '45,000 tons',
      origin: 'Singapore',
      dock: 'Dermaga 1',
      description: 'Kapal kontainer besar memerlukan panduan masuk ke dermaga utama'
    },
    {
      id: '2',
      name: 'SS Wind Runner',
      type: 'Passenger Ferry',
      captain: 'Capt. Maria Garcia',
      arrivalTime: '2024-01-15 10:15',
      estimatedDocking: '2024-01-15 10:45',
      priority: 'medium',
      status: 'pending',
      cargo: 'Passengers',
      weight: '2,500 tons',
      origin: 'Jakarta',
      dock: 'Dermaga 2',
      description: 'Ferry penumpang dengan 200 penumpang, docking rutin'
    },
    {
      id: '3',
      name: 'HT Neptune',
      type: 'Tanker',
      captain: 'Capt. Ahmed Hassan',
      arrivalTime: '2024-01-15 12:00',
      estimatedDocking: '2024-01-15 12:30',
      priority: 'high',
      status: 'pending',
      cargo: 'Crude Oil',
      weight: '120,000 tons',
      origin: 'Dubai',
      dock: 'Dermaga Minyak',
      description: 'Tanker minyak mentah, memerlukan persetujuan khusus'
    },
    {
      id: '4',
      name: 'SY Sea Breeze',
      type: 'Yacht',
      captain: 'Capt. Emma Wilson',
      arrivalTime: '2024-01-15 14:20',
      estimatedDocking: '2024-01-15 14:45',
      priority: 'low',
      status: 'pending',
      cargo: 'Private',
      weight: '150 tons',
      origin: 'Bali',
      dock: 'Dermaga Yacht',
      description: 'Yacht pribadi, docking untuk perawatan'
    },
    {
      id: '5',
      name: 'RV Deep Explorer',
      type: 'Research Vessel',
      captain: 'Capt. David Chen',
      arrivalTime: '2024-01-15 16:00',
      estimatedDocking: '2024-01-15 16:30',
      priority: 'medium',
      status: 'pending',
      cargo: 'Research Equipment',
      weight: '8,500 tons',
      origin: 'Manila',
      dock: 'Dermaga Khusus',
      description: 'Kapal penelitian ilmiah, memerlukan fasilitas khusus'
    }
  ]);

  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSelectJob = (shipId: string) => {
    setSelectedJobs(prev => {
      if (prev.includes(shipId)) {
        return prev.filter(id => id !== shipId);
      } else {
        return [...prev, shipId];
      }
    });
  };

  const handleSubmitToAdmin = () => {
    if (selectedJobs.length === 0) {
      alert('Pilih minimal satu pekerjaan terlebih dahulu');
      return;
    }
    
    // Update status for selected ships
    setShips(prevShips => 
      prevShips.map(ship => 
        selectedJobs.includes(ship.id) 
          ? { ...ship, status: 'selected' }
          : ship
      )
    );
    
    setShowConfirmation(true);
    
    // Simulate sending to admin
    setTimeout(() => {
      alert(`Berhasil mengirim ${selectedJobs.length} permintaan ke admin untuk persetujuan`);
      setSelectedJobs([]);
      setShowConfirmation(false);
    }, 2000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'selected': return 'text-purple-600 bg-purple-100 border-purple-200';
      case 'approved': return 'text-green-600 bg-green-100 border-green-200';
      case 'rejected': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Menunggu';
      case 'selected': return 'Terpilih';
      case 'approved': return 'Disetujui';
      case 'rejected': return 'Ditolak';
      default: return status;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Permintaan Berlabuh Kapal</h1>
              <p className="text-gray-600">Pilih pekerjaan yang akan diambil untuk dikirim ke admin</p>
            </div>

            {/* Summary Card */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FaShip className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Kapal</p>
                    <p className="text-2xl font-bold text-gray-900">{ships.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <FiAlertCircle className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Prioritas Tinggi</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {ships.filter(s => s.priority === 'high').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FiCheckCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Terpilih</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedJobs.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FiClock className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Menunggu</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {ships.filter(s => s.status === 'pending').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <FiAnchor className="mr-3 text-blue-600" />
                    Daftar Kapal yang Ingin Berlabuh
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">Pilih kapal untuk ditugaskan pilot</p>
                </div>
                {selectedJobs.length > 0 && (
                  <button
                    onClick={handleSubmitToAdmin}
                    disabled={showConfirmation}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition duration-150 ease-in-out flex items-center"
                  >
                    <FiCheckCircle className="mr-2" />
                    {showConfirmation ? 'Mengirim...' : `Kirim ${selectedJobs.length} ke Admin`}
                  </button>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pilih
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Detail Kapal
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kapten
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Jadwal & Lokasi
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Muatan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prioritas
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {ships.map((ship) => (
                      <tr key={ship.id} className={`hover:bg-gray-50 ${selectedJobs.includes(ship.id) ? 'bg-blue-50' : ''}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedJobs.includes(ship.id)}
                            onChange={() => handleSelectJob(ship.id)}
                            disabled={ship.status !== 'pending'}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <FiNavigation className="h-5 w-5 text-blue-600" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{ship.name}</div>
                              <div className="text-sm text-gray-500">{ship.type}</div>
                              <div className="text-xs text-gray-400">{ship.weight}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FiUser className="mr-2 text-gray-400" />
                            <span className="text-sm text-gray-900">{ship.captain}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            <div className="flex items-center">
                              <FiCalendar className="mr-1 text-gray-400" />
                              {ship.arrivalTime}
                            </div>
                            <div className="flex items-center text-gray-500">
                              <FiClock className="mr-1 text-gray-400" />
                              Dock: {ship.estimatedDocking}
                            </div>
                            <div className="text-xs text-gray-400">Dermaga: {ship.dock}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{ship.cargo}</div>
                          <div className="text-xs text-gray-500">Asal: {ship.origin}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(ship.priority)}`}>
                            {ship.priority === 'high' ? 'Tinggi' : ship.priority === 'medium' ? 'Sedang' : 'Rendah'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(ship.status)}`}>
                            {getStatusText(ship.status)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {ships.length === 0 && (
                <div className="text-center py-12">
                  <FiAnchor className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada kapal menunggu</h3>
                  <p className="mt-1 text-sm text-gray-500">Semua permintaan berlabuh telah diproses.</p>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <FiAlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Petunjuk Penggunaan</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>1. Pilih kapal yang ingin ditugaskan dengan mencentang checkbox</p>
                    <p>2. Klik tombol "Kirim ke Admin" untuk mengirim permintaan</p>
                    <p>3. Admin akan menerima notifikasi untuk menyetujui atau menolak permintaan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
