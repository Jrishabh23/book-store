const getList = () => {
    const list: any = localStorage.getItem("list");
    if (!list) return [];
    return JSON.parse(list);
};

export const updateList = (data: any) => {
    const list: any = localStorage.getItem("list");
    if (!list) localStorage.setItem("list", JSON.stringify([data]));
    const bookList = JSON.parse(list);
    bookList.push(data);
    localStorage.setItem("list", JSON.stringify(bookList));
};
export default getList;
