// lib/supabase-auth/auth.ts

import { cache } from 'react';
import { redirect } from 'next/navigation';
import { createClient } from './server';


// ---------------------------------------------
// 管理者として許可するメールアドレスのリスト
// ---------------------------------------------
export const adminUsers = [
    process.env.ADMIN_USER!, //本番環境は環境変数を使用する
];

// ---------------------------------------------
// 認証チェック
// ---------------------------------------------
const validateAuthWithRedirect = async () => {
    /* 未認証であればredirect、 認証できればユーザー情報を返す */
    // ユーザーを取得
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    // 認証失敗: ユーザーが存在しない場合 / 権限がない場合
    if (!user || !user.email || !adminUsers.includes(user.email)) {
        redirect("/userauth");
    };
    return user;
};

// 認証チェックをキャッシュ
export const cachedValidateAuthWithRedirect = cache(validateAuthWithRedirect);