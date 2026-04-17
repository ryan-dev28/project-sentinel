import { useEffect, useState } from "react";
import { supabase } from "../lib/upabaseClient";

interface Lead {
    id: number;
    entity_name: string;
    financial_metric: number;
    status: 'Verified' | 'Hallucinated';
    summary: string;
}

export default function MarketMonitor() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [investment, setInvestment] = useState<number>(1000000);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getLeads();
    }, []);

    const getLeads = async () => {
        setLoading(true);
        const { data, error } = await supabase.functions.invoke('get-market-insights');

        if (error) console.error('Function error:', error);
        else setLeads(data || []);
        setLoading(false);
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            {/* Header & Allocator Input */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 rounded-xl text-white shadow-lg">
                <div>
                    <h1 className="text-2xl font-bold">Sentinel Market Monitor</h1>
                    <p className="text-slate-400 text-sm">Real-time Private Credit Insights</p>
                </div>

                <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                        Studio Allocator ($)
                    </label>
                    <input
                        type="number"
                        value={investment}
                        onChange={(e) => setInvestment(Number(e.target.value))}
                        className="bg-transparent text-xl font-mono focus:outline-none text-green-400 w-full"
                    />
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-600">Entity Name</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-600">Metric (Yield)</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-600">Est. Annual Return</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr><td colSpan={4} className="p-10 text-center text-slate-400 italic">Scanning market data...</td></tr>
                        ) : leads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-900">{lead.entity_name}</td>
                                <td className="px-6 py-4 text-slate-600 font-mono">{lead.financial_metric}%</td>
                                <td className="px-6 py-4 text-green-600 font-bold">
                                    ${((investment * lead.financial_metric) / 100).toLocaleString()}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${lead.status === 'Verified'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                                        }`}>
                                        {lead.status === 'Hallucinated' ? '⚠️ Potential Hallucination' : '✅ Verified'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}