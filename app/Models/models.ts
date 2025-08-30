// タスクの基本の型
export interface TodoModel {
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
    // intervalには数字か配列（曜日を格納する）
}

// コントリビューショングラフに表示する用のデータ
export interface ContributionData {
    day: string,
    value: number
}

// ChatGPTがユーザの利用データを分析、出力したデータの型
export interface GPTAnalyticsModel {
    tag: string,
    past: string,
    next: string
}