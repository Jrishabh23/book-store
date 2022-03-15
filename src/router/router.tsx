import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddBook from "../component/addBook";
import BookDetails from "../component/bookDetails";
import ListBook from "../component/list";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ListBook />} />
                <Route path="/list" element={<ListBook />} />
                <Route path="/add-book" element={<AddBook />} />
                <Route path="/book-details/:id" element={<BookDetails />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
