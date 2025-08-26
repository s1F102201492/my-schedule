"use client";

import React, {
    createContext,
    useState,
    ReactNode,
    useEffect,
    useCallback,
} from "react";
import { createClient } from "@/utils/supabase/client";
import { CalcAchieveDay } from "../components/calculate/CalcAchieveDay";
import { CalcAchieveCount } from "../components/calculate/CalcAchieveCount";
import { CalcMultiCount } from "../components/calculate/CalcMultiCount";

interface AchieveProps {
    achieve_day: Record<string, boolean>;
    achieve_taskCount: Record<string, boolean>;
    achieve_multi: Record<string, boolean>;
}

interface AchieveContextType {
    achievement: AchieveProps;
    setAchievement: React.Dispatch<React.SetStateAction<AchieveProps>>;
    loading: boolean;
    RewriteAchieve: (alltodos: TodoProps[]) => Promise<void>;
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

export const AchieveContext = createContext<AchieveContextType | undefined>(
    undefined,
);

export const AchieveProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [achievement, setAchievement] = useState<AchieveProps>({
        achieve_day: {
            achieve2: false,
            achieve3: false,
            achieve5: false,
            achieve10: false,
            achieve20: false,
            achieve30: false,
        },
        achieve_taskCount: {
            achieve5: false,
            achieve10: false,
            achieve20: false,
            achieve30: false,
            achieve50: false,
            achieve100: false,
            achieve500: false,
            achieve1000: false,
        },
        achieve_multi: {
            achieve2: false,
            achieve3: false,
            achieve4: false,
            achieve5: false,
            achieve10: false,
            achieve15: false,
        },
    });
    const [loading, setLoading] = useState(true);

    // 実績テーブルから情報を取得する関数
    const fetchAchievement = useCallback(async () => {
        try {
            setLoading(true);

            const supabase = createClient();
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (!session?.access_token) {
                console.error("アクセストークンが取得できませんでした");
                return;
            }

            const res = await fetch(`/api/achievements/${session.user.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.access_token}`,
                },
                cache: "no-store",
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            setAchievement(data.achievement);
        } catch {
            alert("実績の取得ができませんでした。");
        } finally {
            setLoading(false);
        }
    }, []);

    // achieve_dを書き換えるAPI
    const patch_Achieve = async (achieve: AchieveProps) => {
        try {
            const supabase = createClient();
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (!session?.user.id) {
                console.error("userIdが存在しません");
                return;
            }

            const res = await fetch(`/api/achievements/${session.user.id}`, {
                method: "PATCH",
                body: JSON.stringify(achieve),
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
        } catch {
            alert("実績の更新ができませんでした。");
        }
    };

    // 実績テーブルの情報を書き換える関数
    const RewriteAchieve = async (alltodos: TodoProps[]) => {
        try {
            const calcDay = CalcAchieveDay(alltodos); // タスクのデータから連続でタスクを達成した日数を計算
            const calcCount = CalcAchieveCount(alltodos); // タスクのデータから達成したタスクの数を計算
            const calcMulti = CalcMultiCount(alltodos); // タスクのデータから一日で達成した最大タスク数を計算
            console.log(
                "calcday: ",
                calcDay,
                "calcCount: ",
                calcCount,
                "calcMulti: ",
                calcMulti,
            );

            // 下のfor文で参照
            const list = {
                achieve_day: calcDay,
                achieve_taskCount: calcCount,
                achieve_multi: calcMulti,
            };

            // 実績テーブルより更新後のほうが多い場合更新
            const achievement_copy = structuredClone(achievement);
            console.log("prev: ", achievement_copy);

            for (const element in achievement_copy) {
                for (const key in achievement_copy[
                    element as keyof AchieveProps
                ]) {
                    if (
                        Number(key.split("achieve")[1]) <=
                            list[element as keyof AchieveProps] &&
                        achievement_copy[element as keyof AchieveProps][key] ==
                            false
                    ) {
                        achievement_copy[element as keyof AchieveProps][key] =
                            true;
                    } else if (
                        Number(key.split("achieve")[1]) <=
                            list[element as keyof AchieveProps] &&
                        achievement_copy[element as keyof AchieveProps][key] ==
                            true
                    ) {
                        continue;
                    } else {
                        break;
                    }
                }
            }

            console.log(achievement_copy);
            await patch_Achieve(achievement_copy);

            setAchievement(achievement_copy);
        } catch {
            alert("実績の更新ができませんでした。");
        }
    };

    useEffect(() => {
        fetchAchievement();
    }, []);

    return (
        <AchieveContext.Provider
            value={{
                achievement,
                setAchievement,
                loading,
                RewriteAchieve,
            }}>
            {children}
        </AchieveContext.Provider>
    );
};
