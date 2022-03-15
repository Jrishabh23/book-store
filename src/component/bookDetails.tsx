import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import getList from "../utils/network/storage";

const BookDetails = () => {
    const [bookDetails, setBookDetails] = useState({
        id: "",
        name: "",
        description: "",
        author: "",
        createdAt: "",
        coverImage: "",
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const id = params["id"];
        if (!id) navigate("/list");
        const list = getList();
        const book = list.filter((item: any) => item.id == id);
        if (book && book.length > 0) setBookDetails(book[0]);
    }, []);
    console.log({ bookDetails });
    return (
        <>
            <Link to="/list">Back to list</Link>
            <div
                className="bgimg w3-display-container w3-grayscale-min"
                id="home"
            >
                <img
                    src={bookDetails["coverImage"]}
                    alt=""
                    className="book-title"
                />
                <div className="w3-display-bottomleft w3-center w3-padding-large w3-hide-small"></div>
                <div
                    className="w3-display-middle w3-center"
                    style={{ fontSize: "30px" }}
                >
                    <span>Title:</span>
                    <span className="w3-text-white">
                        {bookDetails["name"]}
                        <br />
                        <div style={{ fontSize: "16px" }}>
                            {bookDetails["description"]}
                        </div>
                    </span>
                </div>
                <div className="w3-display-bottomright w3-center w3-padding-large">
                    <span>Author: </span>
                    <span className="w3-text-white">
                        {bookDetails["author"]}
                    </span>
                </div>
            </div>
        </>
    );
};
export default BookDetails;
