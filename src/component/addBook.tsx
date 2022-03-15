import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { EncodeImage } from "../utils/image-encoder/encode";
import { updateList } from "../utils/network/storage";
import { Link, useNavigate } from "react-router-dom";

const Input = styled("input")({
    display: "none",
});

const AddBook = () => {
    const navigate = useNavigate();
    const [details, setDetails] = useState<any>({
        id: new Date().getTime(),
        name: "",
        description: "",
        author: "",
        createdAt: "",
        coverImage: "",
    });
    const [error, setError] = useState<any>({
        name: "",
        description: "",
        author: "",
        createdAt: "",
        coverImage: "",
    });

    /**
     * @desc update value in object
     */
    const addDetails = (e: any) => {
        if (e?.target) {
            const { name, value } = e.target;
            setDetails({ ...details, [name]: value });
        } else {
            setDetails({ ...details, createdAt: e });
        }
    };
    /**
     * @desc addImage
     */
    const addImage = (e: any) => {
        const validImage = /(.jpg|.jpeg|.png|.gif)$/i;
        const fileMaxSize = 150000;
        /**
         * @desc handle error if file size not exceed 150 kb
         */
        const files = e.target.files[0];
        if (files.size >= Number(fileMaxSize)) {
            setError({ ...error, coverImage: "File size not exceed 150KB" });
            return;
        }
        /**
         * @desc Convert Image into Base64
         */
        EncodeImage(files).then(
            (res) => {
                setDetails({ ...details, coverImage: res });
            },
            (err) => console.log(err)
        );
    };
    /**
     * @desc submit data
     */
    const submitData = () => {
        updateList(details);
        navigate("/list");
    };
    return (
        <div className="container">
            {" "}
            <h1>Add Book Details </h1>
            <Link to="/list">Book List</Link>
            <Box
                component="form"
                sx={{
                    "& .MuiTextField-root": { m: 1, width: "50ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="Book Name"
                        name="name"
                        defaultValue={details["name"]}
                        onChange={(e: any) => addDetails(e)}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="Description"
                        name="description"
                        defaultValue={details["description"]}
                        onChange={(e: any) => addDetails(e)}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="Book Author"
                        name="author"
                        defaultValue={details["author"]}
                        onChange={(e: any) => addDetails(e)}
                    />
                </div>
                <div>
                    <TextField
                        required
                        type="date"
                        id="outlined-required"
                        label="Created At"
                        name="createdAt"
                        onChange={(e: any) => addDetails(e)}
                    />
                </div>
                <div>
                    <label htmlFor="contained-button-file">
                        <Input
                            accept="image/*"
                            id="contained-button-file"
                            multiple
                            type="file"
                            name="coverImage"
                            onChange={(e) => addImage(e)}
                        />
                        <Button variant="contained" component="span">
                            Upload Cover Image
                        </Button>
                    </label>
                </div>
                <div className="m-tb-50">
                    <Button variant="contained" onClick={() => submitData()}>
                        Submit
                    </Button>
                </div>
            </Box>
        </div>
    );
};
export default AddBook;
