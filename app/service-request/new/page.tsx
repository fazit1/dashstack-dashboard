"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from '@/components/Header';


export default function NewServicePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    doc_number: "",
    id_jasa: "",
    ship_name: "",
    master: "",
    agency: "",
    loa: "",
    activity: "Berthing",
    from: "",
    to: "",
    last_port: "batu ampar",
    next_port: "batu ampar",
    pilot: "",
    pilot_on: "",
    pilot_off: "",
    tug_service_id: 2,
    note: "",
    status: "DRAFT",
    amount: "",
    submited_by: "",
    created_by: "",
  });

  const numberFields = ["doc_number", "id_jasa", "loa", "tug_service_id", "amount"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "number" || numberFields.includes(name)) {
      setForm({ ...form, [name]: value === "" ? "" : Number(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/service/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/service");
      } else {
        alert("Gagal menyimpan data");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat menyimpan data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/service");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Tambah Pilotage Service</h1>
            <p className="text-sm text-gray-600 mt-1">Isi informasi lengkap untuk layanan pilotage baru</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Ship Information Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Informasi Kapal</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="ship_name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Kapal
                  </label>
                  <input
                    type="text"
                    id="ship_name"
                    name="ship_name"
                    value={form.ship_name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="master" className="block text-sm font-medium text-gray-700 mb-1">
                    Master
                  </label>
                  <input
                    type="text"
                    id="master"
                    name="master"
                    value={form.master}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="agency" className="block text-sm font-medium text-gray-700 mb-1">
                    Agency
                  </label>
                  <input
                    type="text"
                    id="agency"
                    name="agency"
                    value={form.agency}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="loa" className="block text-sm font-medium text-gray-700 mb-1">
                    LOA (m)
                  </label>
                  <input
                    type="number"
                    id="loa"
                    name="loa"
                    value={form.loa}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Service Details Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Detail Layanan</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="doc_number" className="block text-sm font-medium text-gray-700 mb-1">
                    Doc Number
                  </label>
                  <input
                    type="number"
                    id="doc_number"
                    name="doc_number"
                    value={form.doc_number}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="id_jasa" className="block text-sm font-medium text-gray-700 mb-1">
                    ID Jasa
                  </label>
                  <input
                    type="number"
                    id="id_jasa"
                    name="id_jasa"
                    value={form.id_jasa}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="activity" className="block text-sm font-medium text-gray-700 mb-1">
                    Aktivitas
                  </label>
                  <select
                    id="activity"
                    name="activity"
                    value={form.activity}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Berthing">Berthing</option>
                    <option value="Unberthing">Unberthing</option>
                    <option value="Sea_Trial">Sea Trial</option>
                    <option value="Shifting">Shifting</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="tug_service_id" className="block text-sm font-medium text-gray-700 mb-1">
                    Tug Service ID
                  </label>
                  <input
                    type="number"
                    id="tug_service_id"
                    name="tug_service_id"
                    value={form.tug_service_id}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Location & Ports Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Lokasi & Pelabuhan</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">
                    From
                  </label>
                  <input
                    type="text"
                    id="from"
                    name="from"
                    value={form.from}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">
                    To
                  </label>
                  <input
                    type="text"
                    id="to"
                    name="to"
                    value={form.to}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="last_port" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Port
                  </label>
                  <input
                    type="text"
                    id="last_port"
                    name="last_port"
                    value={form.last_port}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="next_port" className="block text-sm font-medium text-gray-700 mb-1">
                    Next Port
                  </label>
                  <input
                    type="text"
                    id="next_port"
                    name="next_port"
                    value={form.next_port}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Pilot & Timing Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Pilot & Waktu</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pilot" className="block text-sm font-medium text-gray-700 mb-1">
                    Pilot
                  </label>
                  <input
                    type="text"
                    id="pilot"
                    name="pilot"
                    value={form.pilot}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label htmlFor="pilot_on" className="block text-sm font-medium text-gray-700 mb-1">
                    Pilot On
                  </label>
                  <input
                    type="datetime-local"
                    id="pilot_on"
                    name="pilot_on"
                    value={form.pilot_on}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="pilot_off" className="block text-sm font-medium text-gray-700 mb-1">
                    Pilot Off
                  </label>
                  <input
                    type="datetime-local"
                    id="pilot_off"
                    name="pilot_off"
                    value={form.pilot_off}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Informasi Tambahan</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="submited_by" className="block text-sm font-medium text-gray-700 mb-1">
                    Submitted By
                  </label>
                  <input
                    type="text"
                    id="submited_by"
                    name="submited_by"
                    value={form.submited_by}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="created_by" className="block text-sm font-medium text-gray-700 mb-1">
                    Created By
                  </label>
                  <input
                    type="text"
                    id="created_by"
                    name="created_by"
                    value={form.created_by}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                  Catatan
                </label>
                <textarea
                  id="note"
                  name="note"
                  rows={3}
                  value={form.note}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tambahkan catatan tambahan..."
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
