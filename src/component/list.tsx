import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import getList from "../utils/network/storage";
import Button from "@mui/material/Button";

import { DataGrid, GridColDef, GridApi, GridCellValue } from "@mui/x-data-grid";

const columns: GridColDef[] = [
    { field: "index", headerName: "ID", width: 70 },
    { field: "name", headerName: "Book name", width: 130 },
    { field: "author", headerName: "Author", width: 130 },
    {
        field: "id",
        headerName: "Action",
        width: 200,
        sortable: false,
        renderCell: (params) => {
            const id = params["id"];
            const link = "/book-details/" + id;
            return <Link to={link}>Book Details</Link>;
        },
    },
];

const ListBook = () => {
    const navigate = useNavigate();
    const [bookList, setBookList] = useState([]);
    useEffect(() => {
        const list = getList();
        for (let index in list) {
            list[index]["action"] = list[index]["id"];
            list[index]["index"] = Number(index) + 1;
        }
        setBookList(list);
    }, []);

    return (
        <>
            <div className="container">
                <div>
                    <h1>List of Books</h1>
                    <Link to="/add-book"> Add Book</Link>
                </div>
                <div>
                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                            rows={bookList}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
export default ListBook;
