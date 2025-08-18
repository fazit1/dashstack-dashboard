"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Ship, MapPin, User, Calendar, Clock, Package } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

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
    last_port: "",
    next_port: "",
    pilot: "",
    pilot_on: "",
    pilot_off: "",
    tug_service_id: "",
    note: "",
    status: "",
    amount: "",
    submited_by: "",
    created_by: "",
    grt:"",
    bup:"",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // For number fields, allow direct input without incrementing
    if (name === "doc_number" || name === "id_jasa" || name === "loa" || 
        name === "tug_service_id" || name === "amount") {
      setForm({ ...form, [name]: value });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleNumberBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value !== "") {
      setForm({ ...form, [name]: Number(value) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const submitData = {
      ...form,
      doc_number: form.doc_number ? Number(form.doc_number) : 0,
      id_jasa: form.id_jasa ? Number(form.id_jasa) : 0,
      loa: form.loa ? Number(form.loa) : 0,
      tug_service_id: form.tug_service_id ? Number(form.tug_service_id) : 0,
      amount: form.amount ? Number(form.amount) : 0,
    };

    try {
      const res = await fetch("/api/service/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (res.ok) {
        router.push("/service-request");
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
    router.push("/service-request");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">

            <div className="bg-white rounded-lg shadow">
              <form onSubmit={handleSubmit} className="p-6 space-y-8">
                {/* Ship Information Section */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Ship className="w-5 h-5 mr-2 text-blue-600" />
                    Informasi Kegiatan
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                      <label htmlFor="id_jasa" className="block text-sm font-medium text-gray-700 mb-2">
                        ID Jasa *
                      </label>
                      <input
                        id="id_jasa"
                        name="id_jasa"
                        value={form.id_jasa}
                        onChange={handleChange}
                        onBlur={handleNumberBlur}
                        className="px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        step="any"
                      />
                    </div>

                    <br></br><div>
                      <label htmlFor="agency" className="block text-sm font-medium text-gray-700 mb-2">
                        Agency
                      </label>
                      <input
                        type="text"
                        id="agency"
                        name="agency"
                        value={form.agency}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="bup" className="block text-sm font-medium text-gray-700 mb-2">
                        BUP
                      </label>
                      <input
                        type="text"
                        id="bup"
                        name="bup"
                        value={form.bup}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Details Section */}
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                      <label htmlFor="activity" className="block text-sm font-medium text-gray-700 mb-2">
                        kegiatan
                      </label>
                      <select
                        id="activity"
                        name="activity"
                        value={form.activity}
                        onChange={handleChange}
                        className=" px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Berthing">Berthing</option>
                        <option value="Unberthing">Unberthing</option>
                        <option value="Sea_Trial">Sea Trial</option>
                        <option value="Shifting">Shifting</option>
                      </select>
                    </div>
                  </div>
                </div>
                

                {/* Location & Ports Section */}
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-2">
                        From
                      </label>
                      <input
                        type="text"
                        id="from"
                        name="from"
                        value={form.from}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-2">
                        To
                      </label>
                      <input
                        type="text"
                        id="to"
                        name="to"
                        value={form.to}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="last_port" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Port
                      </label>
                      <input
                        type="text"
                        id="last_port"
                        name="last_port"
                        value={form.last_port}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="next_port" className="block text-sm font-medium text-gray-700 mb-2">
                        Next Port
                      </label>
                      <input
                        type="text"
                        id="next_port"
                        name="next_port"
                        value={form.next_port}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Pilot & Timing Section */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-600" />
                    Pilot & Waktu
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="ship_name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Kapal *
                      </label>
                      <input
                        type="text"
                        id="ship_name"
                        name="ship_name"
                        value={form.ship_name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="master" className="block text-sm font-medium text-gray-700 mb-2">
                        Master
                      </label>
                      <input
                        type="text"
                        id="master"
                        name="master"
                        value={form.master}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="grt" className="block text-sm font-medium text-gray-700 mb-2">
                        GRT
                      </label>
                      <input
                        type="text"
                        id="grt"
                        name="grt"
                        value={form.grt}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="loa" className="block text-sm font-medium text-gray-700 mb-2">
                        LOA (m)
                      </label>
                      <input
                        type="number"
                        id="loa"
                        name="loa"
                        value={form.loa}
                        onChange={handleChange}
                        onBlur={handleNumberBlur}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                        step="any"
                      />
                    </div>

                    <div>
                      <label htmlFor="pilot" className="block text-sm font-medium text-gray-700 mb-2">
                        Pilot
                      </label>
                      <input
                        type="text"
                        id="pilot"
                        name="pilot"
                        value={form.pilot}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                        Amount
                      </label>
                      <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        onBlur={handleNumberBlur}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                        step="any"
                      />
                    </div>

                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {isLoading ? 'Menyimpan...' : 'Simpan Service'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
