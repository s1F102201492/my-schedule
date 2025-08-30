import { TodoModel } from "@/app/Models/models"

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

    console.log("a:",completedCount, "b:", allCount)
  return Math.round(completedCount / allCount * 100)
}
