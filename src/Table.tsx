import axios from "axios";
import { useEffect, useState } from "react";
import { IPost } from "./assets/Post";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ErrorMsg from "./assets/ErrorMsg";
import { useNavigate } from "react-router-dom";
import CheckboxInput from "./Checkbox";

const Table = () => {
    const [posts, setposts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        try {
            const fetchData = async () => {
                setLoading(true);
                const posts = await axios.get<IPost[]>(
                    "https://jsonplaceholder.typicode.com/posts"
                );
                setposts(posts.data);
                setLoading(false);
            };
            if (localStorage.getItem("user")) {
                fetchData();
            } else {
                setError(true);
                setTimeout(() => {
                    setError(false);
                    navigate("/");
                }, 2000);
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }, []);

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 60, editable: false },
        {
            field: "userId",
            headerName: "User Id",
            width: 60,
            editable: false,
        },
        {
            field: "title",
            headerName: "Title",
            width: 300,
            editable: false,
        },
        {
            field: "body",
            headerName: "Body",
            type: "string",
            width: 600,
            editable: false,
        },
    ];

    return (
        <>
            {error && <ErrorMsg />}
            {loading ? (
                <></>
            ) : (
                <>
                    <DataGrid
                        rows={posts}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 15,
                                },
                            },
                        }}
                        pageSizeOptions={[5, 10, 15]}
                        checkboxSelection
                        disableRowSelectionOnClick
                    />
                    <CheckboxInput />
                </>
            )}
        </>
    );
};

export default Table;
