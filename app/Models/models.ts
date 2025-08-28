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

export interface ContributionData {
    day: string,
    value: number
}