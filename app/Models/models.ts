import { Dayjs } from "dayjs";
import { Session } from "@supabase/supabase-js";

/**
 * アプリケーションで使用される主要なデータ型定義ファイル
 */

/**
 * タスク（Todo）のデータモデル
 * DBのテーブル構造と対応しています。
 */
export type TodoModel = {
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
};

/**
 * ユーザー情報のデータモデル
 * DBのusersテーブルと対応します。
 */
export type UserType = {
    id: string;
    username: string;
    email: string;
    avatar_url: string;
};

/**
 * GitHub Contributionsのデータモデル
 */
export type ContributionData = {
    day: string,
    value: number
};

/**
 * GPT Analytics用のモデル
 */
export type GPTAnalyticsModel = {
    tag: string,
    past: string,
    next: string
};

/**
 * Dialogコンポーネントの型
 */
export type DialogProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * DatePickerコンポーネントの型
 */
export type DateComponentsProps = {
    label: string;
    date: Dayjs;
    setDate: React.Dispatch<React.SetStateAction<Dayjs>>;
    minDate: Dayjs;
    maxDate: Dayjs;
};

/**
 * ログインユーザー情報を扱う共通の型
 */
export type WithLoginUser = {
    loginUser?: UserType | null;
};

/**
 * サイドバーコンポーネント用のProps
 */
export type SidebarProps = WithLoginUser & {
    drawer: boolean;
    setDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * TodoContextが提供する値と操作関数の型定義
 * タスクのCRUD操作や状態管理を行います。
 */
export type TodoContextType = {
    todos: TodoModel[];
    setTodos: React.Dispatch<React.SetStateAction<TodoModel[]>>;
    loading: boolean;
    fetchAllTodo: () => Promise<void>;
    toggleChecked: (id: number, date: string) => Promise<void>;
    toggleDelete: (id: number, date: string) => Promise<void>;
    addTodo: (todo: Omit<TodoModel, "id">) => Promise<void>;
    editTodo: (todo: TodoModel) => Promise<void>;
    deleteTodo: (todo: TodoModel) => Promise<void>;
    checkTodayTodo: (todo: TodoModel) => Promise<void>;
    deleteTodayTodo: (todo: TodoModel) => Promise<void>;
};

/**
 * コンポーネント: タスク詳細表示のProps
 */
export type TodoItemProps = {
    todo: TodoModel;
    onClose: () => void;
    detailOpen: boolean;
    setDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * ユーザーカードコンポーネント用のProps
 */
export type UserCardProps = WithLoginUser;

/**
 * タスク追加ページの表示切り替え用Props
 */
export type AddTaskPageSwitchProps = {
    boolRecomPage: boolean;
    handleBoolRecomPage: () => void;
};

// RecommendTaskListコンポーネントでAIが提案した時のタスクの型
export type TaskProps = {
    title: string;
    description: string;
    startdate: string;
    enddate: string;
    interval: number;
    tag: string;
};

// CalendarViewコンポーネントのタスクの型
export type CalendarTodoModel = {
    title: string;
    description: string;
    date: Dayjs;
    completed: boolean;
    tag: string;
};

/**
 * AuthContextが提供する認証関連の値と関数の型定義
 */
export type AuthContextType = {
    loginUser: UserType | null;
    loginSession: () => Promise<void>;
    session: Session | null; // supabaseのSession型をanyに
};

// RecomTaskListコンポーネントのPropsの型
export type taskListProps = {
    taskList: TaskProps[];
    purpose: string;
};

/**
 * 全画面ローディングコンポーネント用のProps
 */
export type FullScreenLoadingProps = {
    open: boolean;
};

/**
 * ローディングコンポーネント用のProps
 */
export type LoadingModel = {
    loading: boolean;
};

/**
 * 削除確認ダイアログ用のProps
 */
export type DeleteDialogProps = {
    onetodo: TodoModel;
    deleteOpen: boolean;
    setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * 編集ダイアログ用のProps
 */
export type EditDialogProps = {
    id: number;
    todo: TodoModel;
    editOpen: boolean;
    setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// AnalyticsCardPageコンポーネントの型
export type AnalyticsPageProps = {
    setModelPage: React.Dispatch<React.SetStateAction<boolean>>;
    setViewCurrentPage: React.Dispatch<React.SetStateAction<boolean>>;
};

// Model, ViewCurrentDataコンポーネントの型
export type SwitchAnalyticsPageProps = {
    switchPage: () => void;
};