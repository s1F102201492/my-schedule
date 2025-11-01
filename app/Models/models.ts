import { Dayjs } from "dayjs";
import { Session } from "@supabase/supabase-js";

// タスクの基本の型
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

// ユーザーデータの基本の型
export type UserType = {
    id: string;
    username: string;
    email: string;
    avatar_url: string;
};

// コントリビューショングラフに表示する用のデータ
export type ContributionData = {
    day: string,
    value: number
};

// ChatGPTがユーザの利用データを分析、出力したデータの型
export type GPTAnalyticsModel = {
    tag: string,
    past: string,
    next: string
};

// ダイアログコンポーネントの型
export type DialogProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// DatePickerコンポーネントの型
export type DateComponentsProps = {
    label: string;
    date: Dayjs;
    setDate: React.Dispatch<React.SetStateAction<Dayjs>>;
    minDate: Dayjs;
    maxDate: Dayjs;
};

// ログインユーザー情報を扱う共通の型
export type WithLoginUser = {
    loginUser?: UserType | null;
};

// Sidebarコンポーネントの型
export type SidebarProps = WithLoginUser & {
    drawer: boolean;
    setDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};

// TodoContextTypeコンポーネントの型
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

// TodoItemコンポーネントの型
export type TodoItemProps = {
    todo: TodoModel;
    onClose: () => void;
    detailOpen: boolean;
    setDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// UserCardコンポーネントの型
export type UserCardProps = WithLoginUser;

// AddTaskPageSwitchコンポーネントの型
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

// AuthContextTypeコンポーネントの型
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

// FullScreenLoadingコンポーネントの型
export type FullScreenLoadingProps = {
    open: boolean;
};

// Loadingコンポーネントの型
export type LoadingModel = {
    loading: boolean;
};

// DeleteDialogコンポーネントのPropsの型
export type DeleteDialogProps = {
    onetodo: TodoModel;
    deleteOpen: boolean;
    setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// EditDialogコンポーネントのPropsの型
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