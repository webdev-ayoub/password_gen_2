import axios from "axios";
import { useEffect, useState } from "react"
import Swal from "sweetalert2";


export default function FetchPassword() {

    const [passwords, setPasswords] = useState("");
    const [selectPass, setList] = useState("");

    useEffect(() => {
        const fetchPass = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/fetch");
                setPasswords(response.data.passwords);
            } catch (error) { console.log(error); }
        }
        setInterval(fetchPass, 1200)
    }, []);

    const displayPass = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/fetch",
                { "passwd_name": selectPass }
            );
            if (response.data.message === "Done") {
                Swal.fire({
                    html: "<b class='fs-4'>" + response.data.password_title + "</b>",
                    showCancelButton: true,
                    showConfirmButton: true,
                    confirmButtonText: "COPY",
                    cancelButtonText: "CLOSE",
                    cancelButtonColor: "RED"
                }).then((result) => {
                    if (result.isConfirmed) {
                        paste(response.data.password_title)
                    }
                })
            }
        } catch (error) { console.log(error); }
    }

    const paste = (pw) => {
        navigator.clipboard.writeText(pw).then(() => {
            Swal.fire({
                title: 'COPIED',
                icon: 'success',
                confirmButtonText: 'OK'
            })
        });
    }

    return (
        <div className="container mt-3">
            <div className="p-2 bg-dark rounded">
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                            >
                                <h2 className="text-center">Your Passwords</h2>
                            </button>
                        </h2>
                        <div
                            id="collapseOne"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionExample"
                        >
                            <div className="accordion-body">
                                <select
                                    value={selectPass}
                                    className="form-select"
                                    name="passwd_name"
                                    onChange={e => setList(e.target.value)}
                                >
                                    <option value="0">Select Password</option>
                                    {passwords && passwords.map((passwd, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={passwd}
                                            >
                                                {passwd}
                                            </option>
                                        )
                                    })}
                                </select>
                                <button
                                    className="btn btn-info w-100 mt-3 text-uppercase fw-bold"
                                    onClick={displayPass}
                                >Get</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
