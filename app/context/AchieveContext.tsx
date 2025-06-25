'use client';

import React, { createContext, useState, ReactNode, useEffect, useContext, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { CalcAchieveDay } from '../components/calculate/CalcAchieveDay';
import { CalcAchieveCount } from '../components/calculate/CalcAchieveCount';
import { CalcMultiCount } from '../components/calculate/CalcMultiCount';

interface AchieveProps {
    achieve_d: number;
    achieve_t: number;
    achieve_m: number;
    userId: string;
}

interface AchieveContextType {
    achievement: AchieveProps;
    setAchievement: React.Dispatch<React.SetStateAction<AchieveProps>>;
    loading: boolean;
}

interface TodoProps {
    id: number;
    title: string;
    description: string;
    continuedays: number;
    checkedDates: Record<string, boolean>;
    startdate: string;
    enddate: string;
    interval: number | string[];
    purpose: string;
    tag: string;
}

export const AchieveContext = createContext<AchieveContextType | undefined>(undefined);

export const AchieveProvider: React.FC<{ children: ReactNode }> = ({
    children
}) => {
    const [achievement, setAchievement] = useState<AchieveProps>({
        achieve_d: 0,
        achieve_t: 0,
        achieve_m: 0,
        userId: '',
    });
    const [loading, setLoading] = useState(true);
    const [userIdState, setUserIdState] = useState<string>("")

    // 実績テーブルから情報を取得する関数
    const fetchAchievement = useCallback(async () => {
        try {
            setLoading(true);

            const supabase = createClient();
            const { data: { session }, error } = await supabase.auth.getSession();

            if (!session?.access_token) {
                console.error("アクセストークンが取得できませんでした");
                return;
            }

            const userId = session.user.id;
            setUserIdState(userId)

            const res = await fetch(`/api/achievements/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`,
                },
                cache: 'no-store',
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            setAchievement(data.achievement);
        } catch (error) {
            console.error('実績データの取得に失敗しました:', error);
        } finally {
            setLoading(false);
        }
    }, [])

    // achieve_dを書き換えるAPI
    const put_achieve_d = async (userId: string, day: number, taskCount: number, multiCount: number) => {
        try {
            if (!userId) {
                console.error("userIdが存在しません")
                return ;
            }
    
            const res = await fetch(`/api/achievements/${userId}`, {
                method: 'PUT',
                body: JSON.stringify({}),
                headers: { 'Content-Type': 'application/json'},
    
            });
        } catch {
            console.error("Achievementテーブルの書き換えに失敗しました")
        }
        
    }

    // achieve_tを書き換えるAPI
    const put_achieve_t = async (userId: string, day: number, taskCount: number, multiCount: number) => {
        
    }

    // achieve_mを書き換えるAPI
    const put_achieve_m = async (userId: string, day: number, taskCount: number, multiCount: number) => {
        
    }

    // 実績テーブルの情報を書き換える関数
    const RewriteAchieve = async (alltodos: TodoProps[]) => {
        const calcDay = CalcAchieveDay(alltodos);
        const calcCount = CalcAchieveCount(alltodos);
        const calcMulti = CalcMultiCount(alltodos);


    }

    useEffect(() => {
        fetchAchievement();
    }, []);

    return (
        <AchieveContext.Provider
            value={{
                achievement,
                setAchievement,
                loading
            }}>
            {children}
        </AchieveContext.Provider>
    );
};
