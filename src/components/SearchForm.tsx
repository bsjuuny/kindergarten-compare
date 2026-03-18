'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Target, ChevronDown } from 'lucide-react';
import { InstitutionType } from '@/types/institution';
import { useCompareStore } from '@/store/useCompareStore';

interface RegionItem {
    sggCode: string;
    sggName: string;
}

interface RegionMeta {
    sidoCode: string;
    sidoName: string;
    sggList: RegionItem[];
}

export default function SearchForm() {
    const router = useRouter();
    const clearCompareIds = useCompareStore((state) => state.clearCompareIds);
    const [regions, setRegions] = useState<RegionMeta[]>([]);
    const [sidoCode, setSidoCode] = useState('11'); // Default 서울
    const [sggCode, setSggCode] = useState('11620'); // Default 관악구
    const [type, setType] = useState<InstitutionType | '전체'>('전체'); // Type filter can be added back if needed
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
        fetch(`${basePath}/data/regions.json`)
            .then(res => res.json())
            .then(data => {
                setRegions(data);
                if (data.length > 0) {
                    // Update to match first available if current is invalid
                    const currentSido = data.find((r: RegionMeta) => r.sidoCode === sidoCode);
                    if (!currentSido) {
                        setSidoCode(data[0].sidoCode);
                        setSggCode(data[0].sggList[0]?.sggCode || '');
                    }
                }
            })
            .catch(err => console.error('Failed to load regions', err));
    }, [sidoCode]);

    const currentSido = regions.find(r => r.sidoCode === sidoCode);
    const sggList = currentSido ? currentSido.sggList : [];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 검색 조건이 바뀔 때 기존 비교함 데이터를 초기화합니다
        clearCompareIds();

        const params = new URLSearchParams();
        if (sidoCode) params.append('sido', sidoCode);
        if (sggCode) params.append('sgg', sggCode);

        // Find names for UI display string
        const sidoName = currentSido?.sidoName || '';
        const sggName = sggList.find(s => s.sggCode === sggCode)?.sggName || '';
        if (sidoName || sggName) {
            params.append('query', `${sidoName} ${sggName}`.trim());
        }

        router.push(`/list?${params.toString()}`);
    };

    return (
        <form
            onSubmit={handleSubmit}
            aria-label="지역별 유치원 및 어린이집 검색"
            className={`relative max-w-4xl mx-auto w-full transition-all duration-500 bg-white/70 backdrop-blur-xl rounded-[3rem] p-3 md:p-4 shadow-premium border border-white/50 ${isFocused ? 'ring-8 ring-indigo-100/50 shadow-glow' : ''}`}
        >
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-2">
                {/* SIDO Select */}
                <div className="relative w-full md:w-1/3 group">
                    <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none group-focus-within:text-indigo-600 transition-colors" aria-hidden="true">
                        <MapPin className="h-5 w-5 opacity-30 group-focus-within:opacity-100" aria-hidden="true" />
                    </div>
                    <label htmlFor="select-sido" className="absolute top-2 left-14 text-xs font-black text-slate-400 uppercase tracking-widest pointer-events-none group-focus-within:text-indigo-500 transition-all font-heading">시·도</label>
                    <select
                        id="select-sido"
                        value={sidoCode}
                        onChange={(e) => {
                            setSidoCode(e.target.value);
                            const newSido = regions.find(r => r.sidoCode === e.target.value);
                            if (newSido && newSido.sggList.length > 0) {
                                setSggCode(newSido.sggList[0].sggCode);
                            } else {
                                setSggCode('');
                            }
                        }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="block w-full pl-14 pr-10 pt-6 pb-3 bg-transparent text-slate-900 font-bold focus:outline-none text-base md:text-lg cursor-pointer appearance-none"
                    >
                        {regions.map(r => (
                            <option key={r.sidoCode} value={r.sidoCode}>{r.sidoName}</option>
                        ))}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 group-focus-within:text-indigo-600" aria-hidden="true">
                        <ChevronDown className="w-5 h-5" aria-hidden="true" />
                    </div>
                </div>

                {/* Vertical Divider (Desktop) */}
                <div className="hidden md:block w-px h-10 bg-slate-100 mx-2" aria-hidden="true"></div>

                {/* SGG Select */}
                <div className="relative w-full md:w-1/3 group">
                    <label htmlFor="select-sgg" className="absolute top-2 left-6 text-xs font-black text-slate-400 uppercase tracking-widest pointer-events-none group-focus-within:text-indigo-500 transition-all font-heading">시·군·구</label>
                    <select
                        id="select-sgg"
                        value={sggCode}
                        onChange={(e) => setSggCode(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="block w-full pl-6 pr-10 pt-6 pb-3 bg-transparent text-slate-900 font-bold focus:outline-none text-base md:text-lg cursor-pointer appearance-none"
                        disabled={sggList.length === 0}
                    >
                        {sggList.map(s => (
                            <option key={s.sggCode} value={s.sggCode}>{s.sggName}</option>
                        ))}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 group-focus-within:text-indigo-600" aria-hidden="true">
                        <ChevronDown className="w-5 h-5" aria-hidden="true" />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={!sidoCode || !sggCode}
                    className="w-full md:w-auto px-10 py-5 bg-slate-900 hover:bg-indigo-600 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-black rounded-full shadow-premium hover:shadow-glow flex items-center justify-center gap-2 transform active:scale-95 transition-all duration-500 group ml-auto font-heading"
                >
                    <Search className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                    <span>검색하기</span>
                </button>
            </div>

        </form>
    );
}
