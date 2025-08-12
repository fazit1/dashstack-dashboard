'use client';

import { useState } from 'react';
import { FiEdit, FiTrash2, FiEye, FiPlus, FiSave, FiX } from 'react-icons/fi';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

interface ServiceRequest {
  id: number;
  id_jasa: number;
  ship_name: string;
  pilot: string;
  status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';
  pilot_on: string;
  pilot_off: string;
  next_port: string;
}

export default function ServiceRequestPage() {
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [viewingId, setViewingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState<ServiceRequest>({
    id: 0,
    id_jasa: 0,
    ship_name: '',
    pilot: '',
    status: 'DRAFT',
    pilot_on: '',
    pilot_off: '',
    next_port: ''
  });

  const statuses = ['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED'] as const;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'id_jasa') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      setServiceRequests(prev => 
        prev.map(item => 
          item.id === editingId 
            ? { ...formData, id: editingId }
            : item
        )
      );
    } else {
      const newRequest = {
        ...formData,
        id: Date.now()
      };
      setServiceRequests(prev => [...prev, newRequest]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      id_jasa: 0,
      ship_name: '',
      pilot: '',
      status: 'DRAFT',
      pilot_on: '',
      pilot_off: '',
      next_port: ''
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (request: ServiceRequest) => {
    setFormData(request);
    setEditingId(request.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      setServiceRequests(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleView = (request: ServiceRequest) => {
    setViewingId(request.id);
  };

  const closeModal = () => {
    setViewingId(null);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Request Service</h1>
              <p className="text-gray-600">Kelola permintaan layanan kapal</p>
            </div>

            {/* Action Buttons */}
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Daftar Permintaan Layanan</h2>
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
              >
                <FiPlus className="mr-2" />
                Tambah Baru
              </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID Jasa
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama Kapal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pilot
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pilot On
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pilot Off
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Next Port
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {serviceRequests.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                        Tidak ada data permintaan layanan
                      </td>
                    </tr>
                  ) : (
                    serviceRequests.map((request) => (
                      <tr key={request.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.id_jasa}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.ship_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.pilot}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            request.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                            request.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                            request.status === 'SUBMITTED' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.pilot_on ? new Date(request.pilot_on).toLocaleString('id-ID') : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.pilot_off ? new Date(request.pilot_off).toLocaleString('id-ID') : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.next_port}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleView(request)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Lihat Detail"
                            >
                              <FiEye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleEdit(request)}
                              className="text-yellow-600 hover:text-yellow-900"
                              title="Edit"
                            >
                              <FiEdit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(request.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Hapus"
                            >
                              <FiTrash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Form Modal */}
            {showForm && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                  <div className="mt-3">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                      {editingId ? 'Edit Permintaan Layanan' : 'Tambah Permintaan Layanan'}
                    </h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">ID Jasa</label>
                        <input
                          type="number"
                          name="id_jasa"
                          value={formData.id_jasa}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Nama Kapal</label>
                        <input
                          type="text"
                          name="ship_name"
                          value={formData.ship_name}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Pilot</label>
                        <input
                          type="text"
                          name="pilot"
                          value={formData.pilot}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          {statuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Pilot On</label>
                        <input
                          type="datetime-local"
                          name="pilot_on"
                          value={formData.pilot_on}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Pilot Off</label>
                        <input
                          type="datetime-local"
                          name="pilot_off"
                          value={formData.pilot_off}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Next Port</label>
                        <input
                          type="text"
                          name="next_port"
                          value={formData.next_port}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div className="flex justify-end space-x-2 pt-4">
                        <button
                          type="button"
                          onClick={resetForm}
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                          <FiX className="inline mr-1" />
                          Batal
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                          <FiSave className="inline mr-1" />
                          {editingId ? 'Update' : 'Simpan'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* Detail Modal */}
            {viewingId && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                  <div className="mt-3">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                      Detail Permintaan Layanan
                    </h3>
                    
                    {(() => {
                      const request = serviceRequests.find(r => r.id === viewingId);
                      if (!request) return null;
                      
                      return (
                        <div className="space-y-3">
                          <div>
                            <span className="font-medium">ID Jasa:</span> {request.id_jasa}
                          </div>
                          <div>
                            <span className="font-medium">Nama Kapal:</span> {request.ship_name}
                          </div>
                          <div>
                            <span className="font-medium">Pilot:</span> {request.pilot}
                          </div>
                          <div>
                            <span className="font-medium">Status:</span> {request.status}
                          </div>
                          <div>
                            <span className="font-medium">Pilot On:</span> {request.pilot_on ? new Date(request.pilot_on).toLocaleString('id-ID') : '-'}
                          </div>
                          <div>
                            <span className="font-medium">Pilot Off:</span> {request.pilot_off ? new Date(request.pilot_off).toLocaleString('id-ID') : '-'}
                          </div>
                          <div>
                            <span className="font-medium">Next Port:</span> {request.next_port}
                          </div>
                          
                          <div className="flex justify-end pt-4">
                            <button
                              onClick={closeModal}
                              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                            >
                              Tutup
                            </button>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
