"use client";
import React, { useState } from 'react';
import { Video, MoreHorizontal, FileText, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const MOCK_INTERVIEWS = [
    { id: '1001', type: 'Mock Interview', title: 'F1 Visa — Computer Science at UT Austin', date: 'Oct 24, 2026', score: '88/100', status: 'Completed' },
    { id: '1002', type: 'Question Bank', title: 'F1 Visa — 15 questions generated', date: 'Oct 23, 2026', score: '—', status: 'Generated' },
    { id: '1003', type: 'Mock Interview', title: 'F1 Visa — MBA at NYU Stern', date: 'Oct 20, 2026', score: 'Review pending', status: 'Processing' },
    { id: '1004', type: 'Mock Interview', title: 'F1 Visa — Engineering at Purdue', date: 'Oct 15, 2026', score: '72/100', status: 'Completed' },
];

const STATUS_STYLES = {
    Completed: 'bg-[#fafafa] border-gray-200 text-gray-700',
    Generated: 'bg-[#fafafa] border-gray-200 text-gray-700',
    Processing: 'bg-[#fafafa] border-gray-200 text-gray-400',
};

const LatestInterviewList = () => {
    const [interviews] = useState(MOCK_INTERVIEWS);
    const router = useRouter();

    return (
        <div className="bg-white border border-gray-100 hover:border-gray-300 transition-all duration-150 rounded-xl overflow-hidden mt-12">

            {/* Header */}
            <div className="px-8 py-6 border-b border-gray-100 flex items-start justify-between">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-1">
                        History
                    </p>
                    <h2 className="font-semibold text-base text-[#0a0a0a]">Recent Sessions</h2>
                </div>
                <button
                    onClick={() => router.push('/dashboard/create-mock')}
                    className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white text-sm font-medium px-5 py-2 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-px active:translate-y-0 transition-all duration-150"
                >
                    <Plus size={14} />
                    New session
                </button>
            </div>

            {/* Empty state */}
            {interviews.length === 0 ? (
                <div className="py-20 flex flex-col items-center justify-center bg-[#fafafa]">
                    <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center mb-5 text-gray-400">
                        <Video size={18} />
                    </div>
                    <h3 className="font-semibold text-base text-[#0a0a0a] mb-2">No sessions yet</h3>
                    <p className="text-sm text-gray-500 mb-8 max-w-xs text-center leading-relaxed">
                        You haven't created any practice sessions yet. Start your first one now.
                    </p>
                    <button
                        onClick={() => router.push('/dashboard/create-mock')}
                        className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white text-sm font-medium px-7 py-3 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-px active:translate-y-0 transition-all duration-150"
                    >
                        Get started
                    </button>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-[#fafafa] border-b border-gray-100">
                            <tr>
                                {['Session', 'Type', 'Date', 'Score', 'Status', ''].map((col) => (
                                    <th
                                        key={col}
                                        scope="col"
                                        className="px-8 py-4 text-[11px] font-semibold tracking-widest text-gray-400 uppercase whitespace-nowrap"
                                    >
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {interviews.map((item) => (
                                <tr key={item.id} className="bg-white hover:bg-[#fafafa] transition-colors duration-150 group">

                                    {/* Title + icon */}
                                    <td className="px-8 py-5 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-[#fafafa] border border-gray-100 text-gray-500 flex items-center justify-center shrink-0">
                                                {item.type === 'Mock Interview'
                                                    ? <Video size={14} />
                                                    : <FileText size={14} />
                                                }
                                            </div>
                                            <span className="font-semibold text-[#0a0a0a]">{item.title}</span>
                                        </div>
                                    </td>

                                    <td className="px-8 py-5 whitespace-nowrap text-gray-500">{item.type}</td>
                                    <td className="px-8 py-5 whitespace-nowrap text-gray-500">{item.date}</td>

                                    <td className="px-8 py-5 whitespace-nowrap font-semibold text-[#0a0a0a]">
                                        {item.score}
                                    </td>

                                    {/* Status badge */}
                                    <td className="px-8 py-5 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest rounded-md border ${STATUS_STYLES[item.status] ?? STATUS_STYLES.Completed}`}>
                                            {item.status}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-8 py-5 whitespace-nowrap text-right">
                                        <button className="text-gray-300 hover:text-[#0a0a0a] p-1.5 rounded-md hover:bg-gray-100 transition-all duration-150">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default LatestInterviewList;
