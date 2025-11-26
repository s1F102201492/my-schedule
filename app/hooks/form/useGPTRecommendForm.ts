import { useState } from "react";

// バリデーションエラーの型定義
export type GPTRecommendValidationErrors = {
    text: string;
    tag: string;
    level: string;
};

/**
 * AI提案フォーム（GPTRecommend）の状態管理とバリデーションを行うカスタムフック
 * * 主な機能:
 * - 入力テキスト、画像（Base64）、タグ、難易度のState管理
 * - 画像ファイルの読み込みとBase64変換
 * - バリデーションロジック（必須チェック、文字数制限、特殊文字チェック）
 * * @returns {object} フォームの状態、ハンドラー、エラー情報、バリデーション関数など
 */
export const useGPTRecommendForm = () => {
    const [text, setText] = useState<string>("");
    const [img, setImg] = useState<string>("");
    const [tag, setTag] = useState<string>("");
    const [level, setLevel] = useState<string>("");

    // バリデーションエラーの状態管理
    const [errors, setErrors] = useState<GPTRecommendValidationErrors>({
        text: "",
        tag: "",
        level: "",
    });

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const handleSetImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setImg(reader.result as string);
        };
        reader.readAsDataURL(file);

        e.target.value = ""; // inputのリセット
    };

    const resetImg = () => {
        setImg("");
    };

    const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTag(e.target.value);
    };

    const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLevel(e.target.value);
    };

    // バリデーション関数
    const validateForm = (): boolean => {
        const newErrors: GPTRecommendValidationErrors = {
            text: "",
            tag: "",
            level: "",
        };
        let isValid = true;

        // テキストのバリデーション
        if (text.trim().length === 0) {
            newErrors.text = "憧れている姿やなりたいものを入力してください";
            isValid = false;
        } else if (text.length > 500) {
            newErrors.text = "500文字以内で入力してください";
            isValid = false;
        } else {
            // 特殊文字のチェック
            const invalidChars = /[<>]/;
            if (invalidChars.test(text)) {
                newErrors.text = "使用できない文字が含まれています（<、>は使用できません）";
                isValid = false;
            }
        }

        // タグの必須チェック
        if (!tag || tag === "") {
            newErrors.tag = "タグを選択してください";
            isValid = false;
        }

        // 難易度の必須チェック
        if (!level || level === "") {
            newErrors.level = "難易度を選択してください";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const resetForm = () => {
        setText("");
        setImg("");
        setTag("");
        setLevel("");
        setErrors({
            text: "",
            tag: "",
            level: "",
        });
    };

    return {
        formState: {
            text,
            img,
            tag,
            level,
        },
        handlers: {
            handleTextChange,
            handleSetImg,
            resetImg,
            handleTagChange,
            handleLevelChange,
        },
        errors,
        validateForm,
        resetForm,
    };
};

