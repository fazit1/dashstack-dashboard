'use client'

import { useState } from 'react'
import { Clock, Ship, User, MapPin, Calendar, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

interface ShipRequest {
  id: string
  shipName: string
  pilotName: string
  missionType: string
  location: string
  requestedDate: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'approved' | 'rejected'
  description: string
  estimatedDuration: string
}

const mockRequests: ShipRequest[] = [
  {
    id: '1',
    shipName: 'MV Ocean Explorer',
    pilotName: 'Capt. Ahmad Rahman',
    missionType: 'Cargo Transport',
    location: 'Jakarta - Surabaya',
    requestedDate: '2024-01-15',
    priority: 'high',
    status: 'pending',
    description: 'Urgent cargo delivery for medical supplies',
    estimatedDuration: '3 days'
  },
  {
    id: '2',
    shipName: 'SS Marine Voyager',
    pilotName: 'Capt. Sarah Johnson',
    missionType: 'Passenger Ferry',
    location: 'Bali - Lombok',
    requestedDate: '2024-01-14',
    priority: 'medium',
    status: 'pending',
    description: 'Regular passenger service route',
    estimatedDuration: '2 hours'
  },
  {
    id: '3',
    shipName: 'HTS Navigator',
    pilotName: 'Capt. Michael Chen',
    missionType: 'Oil Transport',
    location: 'Balikpapan - Singapore',
    requestedDate: '2024-01-13',
    priority: 'high',
    status: 'approved',
    description: 'Crude oil shipment for refinery',
    estimatedDuration: '5 days'
  },
  {
    id: '4',
    shipName: 'MV Island Hopper',
    pilotName: 'Capt. Lisa Martinez',
    missionType: 'Supply Run',
    location: 'Jakarta - Thousand Islands',
    requestedDate: '2024-01-16',
    priority: 'low',
    status: 'pending',
    description: 'Weekly supply delivery to island communities',
    estimatedDuration: '1 day'
  }
]

export default function InboxPage() {
  const [requests, setRequests] = useState<ShipRequest[]>(mockRequests)
  const [filter, setFilter] = useState<'pending' | 'approved' | 'rejected'>('pending')

  const handleStatusUpdate = (id: string, newStatus: 'approved' | 'rejected') => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    ))
  }

  const filteredRequests = requests.filter(req => 
    req.status === filter
  )

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'rejected': return <XCircle className="w-5 h-5 text-red-600" />
      default: return <AlertCircle className="w-5 h-5 text-yellow-600" />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />
        
        {/* Inbox Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Ship Requests Inbox</h1>
              <p className="text-gray-600">Manage and review requests from ship guides and pilots</p>
            </div>

            {/* Filter Tabs */}
            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {(['pending', 'approved', 'rejected'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setFilter(tab)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                        filter === tab
                          ? 'border-primary text-primary'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab} ({requests.filter(r => r.status === tab).length})
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Requests Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRequests.map((request) => (
                <div key={request.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg mr-4">
                      <Ship className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{request.shipName}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(request.priority)}`}>
                        {request.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="w-4 h-4 mr-2" />
                      <span>Pilot: {request.pilotName}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>Route: {request.location}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Requested: {new Date(request.requestedDate).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Duration: {request.estimatedDuration}</span>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-gray-700">{request.description}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(request.status)}
                      <span className="text-sm font-medium text-gray-900 capitalize">{request.status}</span>
                    </div>
                    
                    {request.status === 'pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleStatusUpdate(request.id, 'approved')}
                          className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(request.id, 'rejected')}
                          className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredRequests.length === 0 && (
              <div className="text-center py-12">
                <Ship className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
                <p className="text-gray-600">There are no requests matching your current filter.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
