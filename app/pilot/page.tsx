'use client';

import { useState } from 'react';
import { ChevronRight, User, Anchor, CheckCircle, Clock, Calendar, Ship, Plane } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

interface Pilot {
  id: string;
  name: string;
  role: 'pilot' | 'pandu';
  avatar: string;
  license: string;
  experience: string;
  status: 'available' | 'on-duty' | 'rest';
  completedTasks: Task[];
}

interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  status: 'completed' | 'pending';
  type: 'piloting' | 'guiding' | 'training';
  vessel?: string;
  route?: string;
}

const mockPilots: Pilot[] = [
  {
    id: '1',
    name: 'Capt. Ahmad Rahman',
    role: 'pilot',
    avatar: '/api/placeholder/64/64',
    license: 'PIL-2024-001',
    experience: '15 Tahun',
    status: 'available',
    completedTasks: [
      {
        id: 't1',
        title: 'Pemanduan MV Bahtera Nusantara',
        description: 'Pemanduan kapal kontainer dari dermaga ke pelabuhan luar',
        date: '2024-01-15',
        duration: '3 jam',
        status: 'completed',
        type: 'piloting',
        vessel: 'MV Bahtera Nusantara',
        route: 'Dermaga 3 - Pelabuhan Luar'
      },
      {
        id: 't2',
        title: 'Training Simulator',
        description: 'Pelatihan rutin di simulator pemanduan',
        date: '2024-01-10',
        duration: '2 jam',
        status: 'completed',
        type: 'training'
      }
    ]
  },
  {
    id: '2',
    name: 'Capt. Siti Nurhaliza',
    role: 'pilot',
    avatar: '/api/placeholder/64/64',
    license: 'PIL-2024-002',
    experience: '12 Tahun',
    status: 'on-duty',
    completedTasks: [
      {
        id: 't3',
        title: 'Pemanduan MV Ocean Star',
        description: 'Pemanduan kapal tanker masuk ke dermaga',
        date: '2024-01-14',
        duration: '2.5 jam',
        status: 'completed',
        type: 'piloting',
        vessel: 'MV Ocean Star',
        route: 'Pelabuhan Luar - Dermaga 1'
      }
    ]
  },
  {
    id: '3',
    name: 'Pandu Budi Santoso',
    role: 'pandu',
    avatar: '/api/placeholder/64/64',
    license: 'PAN-2024-001',
    experience: '8 Tahun',
    status: 'rest',
    completedTasks: [
      {
        id: 't4',
        title: 'Panduan Kapal Ferry',
        description: 'Panduan kapal ferry penumpang',
        date: '2024-01-13',
        duration: '1.5 jam',
        status: 'completed',
        type: 'guiding',
        vessel: 'KM Nusantara Sejahtera',
        route: 'Dermaga 2 - Dermaga 4'
      },
      {
        id: 't5',
        title: 'Panduan Kapal Kargo',
        description: 'Panduan kapal kargo masuk ke dermaga',
        date: '2024-01-12',
        duration: '2 jam',
        status: 'completed',
        type: 'guiding',
        vessel: 'MV Cargo Express',
        route: 'Pelabuhan Luar - Dermaga 5'
      }
    ]
  },
  {
    id: '4',
    name: 'Pandu Maya Dewi',
    role: 'pandu',
    avatar: '/api/placeholder/64/64',
    license: 'PAN-2024-002',
    experience: '6 Tahun',
    status: 'available',
    completedTasks: [
      {
        id: 't6',
        title: 'Panduan Kapal Perintis',
        description: 'Panduan kapal perintis ke daerah terpencil',
        date: '2024-01-11',
        duration: '4 jam',
        status: 'completed',
        type: 'guiding',
        vessel: 'KM Sabuk Nusantara',
        route: 'Pelabuhan Utama - Pulau Terdepan'
      }
    ]
  }
];

export default function NotificationPage() {
  const [selectedPilot, setSelectedPilot] = useState<Pilot | null>(null);
  const [filterRole, setFilterRole] = useState<'all' | 'pilot' | 'pandu'>('all');

  const filteredPilots = mockPilots.filter(pilot => 
    filterRole === 'all' || pilot.role === filterRole
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'on-duty': return 'bg-blue-100 text-blue-800';
      case 'rest': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Tersedia';
      case 'on-duty': return 'Sedang Bertugas';
      case 'rest': return 'Istirahat';
      default: return status;
    }
  };

  const getRoleIcon = (role: string) => {
    return role === 'pilot' ? <Plane className="w-4 h-4" /> : <Anchor className="w-4 h-4" />;
  };

  const getRoleText = (role: string) => {
    return role === 'pilot' ? 'Pilot' : 'Pandu';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Daftar Pilot & Pandu</h1>
              <p className="text-gray-600">Informasi lengkap para pilot dan pandu beserta tugas yang telah diselesaikan</p>
            </div>

            {/* Filter Tabs */}
            <div className="mb-6">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
                <button
                  onClick={() => setFilterRole('all')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    filterRole === 'all' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setFilterRole('pilot')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    filterRole === 'pilot' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Pilot
                </button>
                <button
                  onClick={() => setFilterRole('pandu')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    filterRole === 'pandu' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Pandu
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Pilot List */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {filterRole === 'all' ? 'Pilot & Pandu' : filterRole === 'pilot' ? 'Pilot' : 'Pandu'}
                    </h2>
                    <p className="text-sm text-gray-600">{filteredPilots.length} orang</p>
                  </div>
                  <div className="divide-y">
                    {filteredPilots.map((pilot) => (
                      <div
                        key={pilot.id}
                        onClick={() => setSelectedPilot(pilot)}
                        className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedPilot?.id === pilot.id ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            {getRoleIcon(pilot.role)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-gray-900">{pilot.name}</h3>
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            </div>
                            <p className="text-sm text-gray-600">{getRoleText(pilot.role)}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pilot.status)}`}>
                                {getStatusText(pilot.status)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pilot Details & Tasks */}
              <div className="lg:col-span-2">
                {selectedPilot ? (
                  <div className="space-y-6">
                    {/* Pilot Info Card */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                          {getRoleIcon(selectedPilot.role)}
                        </div>
                        <div className="flex-1">
                          <h2 className="text-xl font-bold text-gray-900">{selectedPilot.name}</h2>
                          <p className="text-gray-600">{getRoleText(selectedPilot.role)}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <span>Lisensi: {selectedPilot.license}</span>
                            <span>•</span>
                            <span>Pengalaman: {selectedPilot.experience}</span>
                          </div>
                          <div className="mt-2">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedPilot.status)}`}>
                              {getStatusText(selectedPilot.status)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Completed Tasks */}
                    <div className="bg-white rounded-lg shadow-sm">
                      <div className="p-4 border-b">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Tugas yang Telah Diselesaikan ({selectedPilot.completedTasks.length})
                        </h3>
                      </div>
                      <div className="divide-y">
                        {selectedPilot.completedTasks.map((task) => (
                          <div key={task.id} className="p-4">
                            <div className="flex items-start space-x-3">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{task.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                                
                                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>{new Date(task.date).toLocaleDateString('id-ID', {
                                      day: 'numeric',
                                      month: 'long',
                                      year: 'numeric'
                                    })}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{task.duration}</span>
                                  </div>
                                </div>

                                {task.vessel && (
                                  <div className="flex items-center space-x-1 mt-1 text-sm text-gray-500">
                                    <Ship className="w-4 h-4" />
                                    <span>{task.vessel}</span>
                                    {task.route && <span>• {task.route}</span>}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Pilih Pilot atau Pandu</h3>
                    <p className="text-gray-600">Klik pada salah satu pilot atau pandu di samping untuk melihat detail dan tugas yang telah diselesaikan</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
