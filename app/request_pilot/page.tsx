'use client';

import { useState } from 'react';
import { FiAnchor, FiCalendar, FiClock, FiUser, FiNavigation, FiCheckCircle, FiX, FiAlertCircle, FiTruck, FiMapPin } from 'react-icons/fi';
import { FaShip } from 'react-icons/fa';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

interface Job {
  id: string;
  shipName: string;
  shipType: string;
  captain: string;
  arrivalTime: string;
  estimatedDuration: string;
  priority: 'high' | 'medium' | 'low';
  status: 'available' | 'pending' | 'approved' | 'ongoing' | 'completed';
  cargo: string;
  weight: string;
  origin: string;
  dock: string;
  description: string;
  pilotId?: string;
  pilotName?: string;
  submittedDate?: string;
  approvedDate?: string;
  startedDate?: string;
  completedDate?: string;
}

export default function PilotJobManagementPage() {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      shipName: 'MV Ocean Star',
      shipType: 'Cargo Ship',
      captain: 'Capt. John Smith',
      arrivalTime: '2024-01-15 08:30',
      estimatedDuration: '3 hours',
      priority: 'high',
      status: 'available',
      cargo: 'Container',
      weight: '45,000 tons',
      origin: 'Singapore',
      dock: 'Dermaga 1',
      description: 'Kapal kontainer besar memerlukan panduan masuk ke dermaga utama'
    },
    {
      id: '2',
      shipName: 'SS Wind Runner',
      shipType: 'Passenger Ferry',
      captain: 'Capt. Maria Garcia',
      arrivalTime: '2024-01-15 10:15',
      estimatedDuration: '2 hours',
      priority: 'medium',
      status: 'available',
      cargo: 'Passengers',
      weight: '2,500 tons',
      origin: 'Jakarta',
      dock: 'Dermaga 2',
      description: 'Ferry penumpang dengan 200 penumpang, docking rutin'
    },
    {
      id: '3',
      shipName: 'HT Neptune',
      shipType: 'Tanker',
      captain: 'Capt. Ahmed Hassan',
      arrivalTime: '2024-01-15 12:00',
      estimatedDuration: '5 hours',
      priority: 'high',
      status: 'pending',
      cargo: 'Crude Oil',
      weight: '120,000 tons',
      origin: 'Dubai',
      dock: 'Dermaga Minyak',
      description: 'Tanker minyak mentah, memerlukan persetujuan khusus',
      pilotName: 'Pilot Ahmad',
      submittedDate: '2024-01-14 15:30'
    },
    {
      id: '4',
      shipName: 'SY Sea Breeze',
      shipType: 'Yacht',
      captain: 'Capt. Emma Wilson',
      arrivalTime: '2024-01-15 14:20',
      estimatedDuration: '1 hour',
      priority: 'low',
      status: 'approved',
      cargo: 'Private',
      weight: '150 tons',
      origin: 'Bali',
      dock: 'Dermaga Yacht',
      description: 'Yacht pribadi, docking untuk perawatan',
      pilotName: 'Pilot Budi',
      approvedDate: '2024-01-14 16:45'
    },
    {
      id: '5',
      shipName: 'RV Deep Explorer',
      shipType: 'Research Vessel',
      captain: 'Capt. David Chen',
      arrivalTime: '2024-01-15 16:00',
      estimatedDuration: '4 hours',
      priority: 'medium',
      status: 'ongoing',
      cargo: 'Research Equipment',
      weight: '8,500 tons',
      origin: 'Manila',
      dock: 'Dermaga Khusus',
      description: 'Kapal penelitian ilmiah, memerlukan fasilitas khusus',
      pilotName: 'Pilot Charlie',
      startedDate: '2024-01-15 08:00'
    },
    {
      id: '6',
      shipName: 'MV Pacific Trader',
      shipType: 'Cargo Ship',
      captain: 'Capt. Robert Lee',
      arrivalTime: '2024-01-14 09:00',
      estimatedDuration: '6 hours',
      priority: 'high',
      status: 'completed',
      cargo: 'Electronics',
      weight: '65,000 tons',
      origin: 'Shanghai',
      dock: 'Dermaga 3',
      description: 'Kapal kontainer dengan barang elektronik',
      pilotName: 'Pilot David',
      completedDate: '2024-01-14 15:30'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'available' | 'pending' | 'ongoing' | 'completed'>('available');
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);

  const handleSelectJob = (jobId: string) => {
    setSelectedJobs(prev => {
      if (prev.includes(jobId)) {
        return prev.filter(id => id !== jobId);
      } else {
        return [...prev, jobId];
      }
    });
  };

  const handleSubmitToAdmin = () => {
    if (selectedJobs.length === 0) {
      alert('Pilih minimal satu pekerjaan terlebih dahulu');
      return;
    }

    // Update status from available to pending
    setJobs(prevJobs => 
      prevJobs.map(job => 
        selectedJobs.includes(job.id) 
          ? { ...job, status: 'pending', submittedDate: new Date().toLocaleString('id-ID'), pilotName: 'Current Pilot' }
          : job
      )
    );

    alert(`Berhasil mengirim ${selectedJobs.length} pekerjaan ke admin untuk persetujuan`);
    setSelectedJobs([]);
  };

  const handleFinishJob = (jobId: string) => {
    if (confirm('Apakah Anda yakin ingin menyelesaikan pekerjaan ini?')) {
      setJobs(prevJobs => 
        prevJobs.map(job => 
          job.id === jobId 
            ? { ...job, status: 'completed', completedDate: new Date().toLocaleString('id-ID') }
            : job
        )
      );
    }
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
      case 'available': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'approved': return 'text-purple-600 bg-purple-100';
      case 'ongoing': return 'text-orange-600 bg-orange-100';
      case 'completed': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Tersedia';
      case 'pending': return 'Menunggu Persetujuan';
      case 'approved': return 'Disetujui';
      case 'ongoing': return 'Sedang Berlangsung';
      case 'completed': return 'Selesai';
      default: return status;
    }
  };
                                                                                                  
  const filteredJobs = jobs.filter(job => job.status === activeTab);

  const getTabCount = (status: string) => {
    return jobs.filter(job => job.status === status).length;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Pekerjaan Pilot</h1>
              <p className="text-gray-600">Kelola pekerjaan pilot dari tersedia hingga selesai</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FaShip className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Tersedia</p>
                    <p className="text-2xl font-bold text-gray-900">{getTabCount('available')}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <FiAlertCircle className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Menunggu</p>
                    <p className="text-2xl font-bold text-gray-900">{getTabCount('pending')}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <FiClock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Berlangsung</p>
                    <p className="text-2xl font-bold text-gray-900">{getTabCount('ongoing')}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FiCheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Selesai</p>
                    <p className="text-2xl font-bold text-gray-900">{getTabCount('completed')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {(['available', 'pending', 'ongoing', 'completed'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                        activeTab === tab
                          ? 'border-primary text-primary'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {getStatusText(tab)} ({getTabCount(tab)})
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Available Jobs - Show selection UI */}
            {activeTab === 'available' && selectedJobs.length > 0 && (
              <div className="mb-4 flex justify-end">
                <button
                  onClick={handleSubmitToAdmin}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                >
                  <FiCheckCircle className="mr-2" />
                  Kirim {selectedJobs.length} Pekerjaan ke Admin
                </button>
              </div>
            )}

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg mr-4">
                      <FaShip className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{job.shipName}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(job.priority)}`}>
                        {job.priority === 'high' ? 'Tinggi' : job.priority === 'medium' ? 'Sedang' : 'Rendah'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <FiUser className="w-4 h-4 mr-2" />
                      <span>Kapten: {job.captain}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <FiTruck className="w-4 h-4 mr-2" />
                      <span>Muatan: {job.cargo} ({job.weight})</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <FiMapPin className="w-4 h-4 mr-2" />
                      <span>Dermaga: {job.dock}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <FiCalendar className="w-4 h-4 mr-2" />
                      <span>Kedatangan: {job.arrivalTime}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <FiClock className="w-4 h-4 mr-2" />
                      <span>Durasi: {job.estimatedDuration}</span>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-gray-700">{job.description}</p>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(job.status)}`}>
                        {getStatusText(job.status)}
                      </span>
                      
                      {job.status === 'ongoing' && (
                        <button
                          onClick={() => handleFinishJob(job.id)}
                          className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
                        >
                          Selesai
                        </button>
                      )}
                    </div>

                    {job.pilotName && (
                      <div className="text-xs text-gray-500">
                        Pilot: {job.pilotName}
                      </div>
                    )}

                    {job.submittedDate && (
                      <div className="text-xs text-gray-500">
                        Dikirim: {job.submittedDate}
                      </div>
                    )}

                    {job.completedDate && (
                      <div className="text-xs text-gray-500">
                        Selesai: {job.completedDate}
                      </div>
                    )}
                  </div>

                  {job.status === 'available' && (
                    <div className="mt-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedJobs.includes(job.id)}
                          onChange={() => handleSelectJob(job.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">Pilih pekerjaan ini</span>
                      </label>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <FaShip className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Tidak ada pekerjaan {getStatusText(activeTab)}
                </h3>
                <p className="text-gray-600">
                  {activeTab === 'available' && 'Belum ada pekerjaan yang tersedia saat ini.'}
                  {activeTab === 'pending' && 'Belum ada pekerjaan yang menunggu persetujuan.'}
                  {activeTab === 'ongoing' && 'Belum ada pekerjaan yang sedang berlangsung.'}
                  {activeTab === 'completed' && 'Belum ada pekerjaan yang telah selesai.'}
                </p>
              </div>
            )}

            {/* Instructions */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <FiAlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Petunjuk Penggunaan</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>• <strong>Tersedia:</strong> Pilih pekerjaan yang ingin Anda ambil dengan mencentang checkbox</p>
                    <p>• <strong>Menunggu:</strong> Pekerjaan yang sudah dikirim ke admin untuk persetujuan</p>
                    <p>• <strong>Berlangsung:</strong> Pekerjaan yang sudah disetujui dan sedang dikerjakan</p>
                    <p>• <strong>Selesai:</strong> Pekerjaan yang sudah diselesaikan</p>
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
