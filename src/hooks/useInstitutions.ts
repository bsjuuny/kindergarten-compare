import { useQuery } from '@tanstack/react-query';
import { Institution, InstitutionSource } from '@/types/institution';
import { sanitizeInstitution } from '@/utils/institutionSanitizer';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const useInstitutions = (sidoCode?: string, sggCode?: string, sourceFilter?: InstitutionSource | '전체') => {
    return useQuery<Institution[]>({
        queryKey: ['institutions', sidoCode, sggCode, sourceFilter],
        queryFn: async () => {
            if (!sidoCode || !sggCode) return [];

            const filter = sourceFilter || '전체';
            const fetches: Promise<Institution[]>[] = [];

            // 유치원 데이터
            if (filter === '전체' || filter === '유치원') {
                fetches.push(
                    fetch(`${BASE_PATH}/data/${sidoCode}_${sggCode}.json`)
                        .then(res => res.ok ? res.json() : [])
                        .then((data: Institution[]) => data.map(d => sanitizeInstitution({ ...d, source: d.source || '유치원' as const })))
                        .catch(() => [])
                );
            }

            // 어린이집 데이터
            if (filter === '전체' || filter === '어린이집') {
                fetches.push(
                    fetch(`${BASE_PATH}/data/${sidoCode}_${sggCode}_childcare.json`)
                        .then(res => res.ok ? res.json() : [])
                        .then((data: Institution[]) => data.map(d => sanitizeInstitution({ ...d, source: d.source || '어린이집' as const })))
                        .catch(() => [])
                );
            }

            const results = await Promise.all(fetches);
            return results.flat();
        },
        // 자주 바뀌지 않는 정적 데이터이므로 캐시/stale 시간 길게 설정
        staleTime: 1000 * 60 * 60,
        enabled: !!sidoCode && !!sggCode,
    });
};
