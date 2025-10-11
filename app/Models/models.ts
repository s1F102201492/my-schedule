import { Dayjs } from "dayjs";
import { Session } from "@supabase/supabase-js";

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

// ユーザーデータの基本の型
export interface UserType {
    id: string;
    username: string;
    email: string;
    avatar_url: string;
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

// ダイアログコンポーネントの型
export interface DialogProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// DatePickerコンポーネントの型
export interface DateComponentsProps {
    label: string;
    date: Dayjs;
    setDate: React.Dispatch<React.SetStateAction<Dayjs>>;
    minDate: Dayjs;
    maxDate: Dayjs;
}

// ログインユーザー情報を扱う共通の型
export interface WithLoginUser {
    loginUser?: UserType | null;
}

export interface SidebarProps extends WithLoginUser {
    drawer: boolean;
    setDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface TodoContextType {
    todos: TodoModel[];
    setTodos: React.Dispatch<React.SetStateAction<TodoModel[]>>;
    loading: boolean;
    fetchAllTodo: () => Promise<void>;
    toggleChecked: (id: number, date: string) => Promise<void>;
    toggleDelete: (id: number, date: string) => Promise<void>;
    addTodo: (todo: Omit<TodoModel, "id">) => Promise<any>;
    editTodo: (todo: TodoModel) => Promise<any>;
    deleteTodo: (todo: TodoModel) => Promise<any>;
    checkTodayTodo: (todo: TodoModel) => Promise<void>;
    deleteTodayTodo: (todo: TodoModel) => Promise<void>;
}

export interface TodoItemProps {
    todo: TodoModel;
    onClose: () => void;
    detailOpen: boolean;
    setDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UserCardProps extends WithLoginUser {}

export interface AddTaskPageSwitchProps {
    boolRecomPage: boolean;
    handleBoolRecomPage: () => void;
}

export interface TaskProps {
    title: string;
    description: string;
    startdate: string;
    enddate: string;
    interval: number;
    tag: string;
}

export interface CalendarViewProps {
    title: string;
    description: string;
    date: Dayjs;
    completed: boolean;
    tag: string;
}

export interface AuthContextType {
    loginUser: UserType | null;
    loginSession: () => Promise<void>;
    session: Session | null; // supabaseのSession型をanyに
}

export interface taskListProps {
    taskList: TaskProps[];
    purpose: string;
}

export interface FullScreenLoadingProps {
    open: boolean;
}

// FadeLoadingコンポーネントの型
export interface LoadingModel {
    loading: boolean;
}

export interface DeleteDialogProps {
    onetodo: TodoModel;
    deleteOpen: boolean;
    setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface EditDialogProps {
    id: number;
    todo: TodoModel;
    editOpen: boolean;
    setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// AnalyticsCardPageコンポーネントの型
export interface AnalyticsPageProps {
    setModelPage: React.Dispatch<React.SetStateAction<boolean>>;
    setViewCurrentPage: React.Dispatch<React.SetStateAction<boolean>>;
}

// Model, ViewCurrentDataコンポーネントの型
export interface SwitchAnalyticsPageProps {
    switchPage: () => void;
}