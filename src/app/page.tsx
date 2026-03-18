import SearchForm from '@/components/SearchForm';
import { Baby, ShieldCheck, Heart, Sparkles, MapPin } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center -mt-12 overflow-hidden bg-slate-50/30">
      {/* Subtle Background Decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-50/50 to-transparent -z-10"></div>
      <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-indigo-100/20 rounded-full blur-[80px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-blue-100/20 rounded-full blur-[100px] -z-10 animate-pulse delay-700"></div>

      <main className="w-full max-w-5xl px-6 text-center space-y-12">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-premium border border-slate-100 text-indigo-600 font-black text-xs uppercase tracking-widest animate-in fade-in slide-in-from-bottom-2 duration-700">
            <Sparkles className="w-3.5 h-3.5" />
            최고의 유치원·어린이집 선택 가이드
          </div>

          <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] animate-fade-up font-heading">
            우리 아이를 위한 <br className="hidden sm:block" />
            <span className="text-indigo-600">더 나은 환경</span>의 시작
          </h1>

          <p className="max-w-xl mx-auto text-sm md:text-lg text-slate-500 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            공신력 있는 데이터를 기반으로 주변 기관의<br className="hidden sm:block" />
            교사 역량과 시설 환경을 정밀하게 비교 분석합니다.
          </p>
        </div>

        <div className="animate-fade-up [animation-delay:400ms] relative z-10 md:scale-105 transition-transform">
          <SearchForm />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 animate-fade-up [animation-delay:600ms]">
          <div className="p-8 bg-white/60 backdrop-blur-sm border border-slate-100 rounded-[2rem] shadow-premium flex flex-col items-center text-center group hover:bg-white hover:shadow-glow transition-all duration-500">
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-7 h-7 text-indigo-600" />
            </div>
            <h3 className="text-base font-black text-slate-900 mb-2 font-heading">안정성 정밀 분석</h3>
            <p className="text-[13px] text-slate-400 leading-relaxed font-bold">인증 정보와 사고 이력 등<br />객관적 지표를 기반으로 분석</p>
          </div>

          <div className="p-8 bg-white/60 backdrop-blur-sm border border-slate-100 rounded-[2rem] shadow-premium flex flex-col items-center text-center group hover:bg-white hover:shadow-glow transition-all duration-500">
            <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Heart className="w-7 h-7 text-rose-500" />
            </div>
            <h3 className="text-base font-black text-slate-900 mb-2 font-heading">실시간 시각 비교</h3>
            <p className="text-[13px] text-slate-400 leading-relaxed font-bold">교사 1인당 원아 수 등<br />핵심 지표를 1:1로 즉시 대조</p>
          </div>

          <div className="p-8 bg-white/60 backdrop-blur-sm border border-slate-100 rounded-[2rem] shadow-premium flex flex-col items-center text-center group hover:bg-white hover:shadow-glow transition-all duration-500">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Baby className="w-7 h-7 text-blue-500" />
            </div>
            <h3 className="text-base font-black text-slate-900 mb-2 font-heading">맞춤형 스마트 필터</h3>
            <p className="text-[13px] text-slate-400 leading-relaxed font-bold">아이의 연령과 교육 성향에<br />최적화된 기관을 스마트하게 탐색</p>
          </div>
        </div>

        <div className="pt-12 flex flex-col md:flex-row items-center justify-center gap-6 opacity-30">
          <div className="text-xs font-black uppercase tracking-widest text-slate-400 border-b md:border-b-0 md:border-r border-slate-200 pb-2 md:pb-0 md:pr-6">Source</div>
          <div className="flex items-center gap-6">
            <span className="font-bold text-slate-500 text-xs tracking-tight">유치원 알리미</span>
            <span className="font-bold text-slate-500 text-xs tracking-tight">어린이집 정보공개 portal</span>
          </div>
        </div>
      </main>
    </div>
  );
}
