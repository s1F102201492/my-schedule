import { TodoModel } from "@/app/Models/models"

/**
 * 特定のタグが付いたタスク全体の達成率（%）を計算する関数
 * * @param {TodoModel[]} alltodos - 全てのタスクの配列
 * @param {string} selectedTag - 計算対象のタグ名
 * @returns {number} 指定されたタグのタスクの達成率（0〜100の整数）。タスクが存在しない場合はNaNになる可能性がありますが、ロジック上completedCount/0の場合はInfinity等になる点に注意（現状の実装では0割りのハンドリングなし）
 * * @example
 * const todos = [
 * { tag: "学習", checkedDates: { "2023/01/01": true, "2023/01/02": false } }, // 1/2 完了
 * { tag: "学習", checkedDates: { "2023/01/01": true } }, // 1/1 完了
 * { tag: "運動", checkedDates: { "2023/01/01": false } } // 対象外
 * ];
 * // 学習タグの総日数: 3日, 完了: 2日 => 67%
 * const rate = AchieveRateByTag(todos, "学習"); // 67
 */
export const AchieveRateByTag = (alltodos: TodoModel[], selectedTag: string) => {
    let completedCount = 0;
    let allCount = 0;

    const todosByTag = alltodos.filter(todo => todo.tag == selectedTag);

    todosByTag.map((todo) => {
      const keyArray = Object.keys(todo.checkedDates);

      allCount += keyArray.length;

      keyArray.map((date) => {
        if (todo.checkedDates[date]) {
          completedCount += 1;
        }
      })
    })

  return Math.round(completedCount / allCount * 100)
}
