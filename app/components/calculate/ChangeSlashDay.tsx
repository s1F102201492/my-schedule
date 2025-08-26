//日付をハイフン型に変える関数 'YYYY/MM/DD'

export const ChangeSlashDay = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}/${month}/${day}`;
    return formattedDate;
};
