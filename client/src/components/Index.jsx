import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Swal from "sweetalert2";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";


let lowCase = "abcdefghijklmnopqrstuvwxyz";
let upCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let numbers = "0123456789";
let symbols = "@#&%!$£?^*$&#%!";
let chrs = lowCase + upCase + numbers + symbols;

export default function Index() {

    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [pass_name, setName] = useState("");

    const generatePw = (e) => {
        e.preventDefault();
        let pw_generated = [];
        for (var i = 0; i < 20; i++) {
            pw_generated[i] = chrs[Math.floor(Math.random() * chrs.length)];
        }
        setPassword(pw_generated.join(""));
    }

    const saveForm = () => {
        setShowModal(true);
    }

    const save = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/save", {
                gen_pass: password,
                pass_name: pass_name
            });
            if (response.data === "Saved") {
                Swal.fire({
                    title: "Saved",
                    icon: 'success',
                    showConfirmButton: false
                })
                setShowModal(false);
                setPassword("");
                setName("");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const paste = () => {
        if (password !== "") {
            navigator.clipboard.writeText(password).then(() => {
                Swal.fire({
                    title: 'COPIED',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            });
        } else {
            Swal.fire({
                title: 'Nothing to Copy',
                icon: 'warning',
                confirmButtonText: 'Close'
            })
        }
    }

    return (
        <div className="container">
            <div className="bg-light shadow p-3 w-auto rounded">
                <form className="w-auto" onSubmit={generatePw}>
                    <div className="input-group mb-3 d-flex">
                        <input
                            type="text"
                            name="gen_pass"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="form-control"
                            placeholder="Password"
                            readOnly
                        />
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={paste}
                        >
                            <FontAwesomeIcon icon={faClipboard} />
                        </button>
                    </div>
                    <div className="d-flex gap-2">
                        < button
                            type="submit"
                            className="btn btn-dark text-white w-100 text-uppercase"
                        >generate
                        </button>
                        {password !== "" ?
                            <Button
                                variant="primary"
                                onClick={saveForm}
                                className="w-100 text-uppercase"
                            >
                                save
                            </Button> : ""
                        }
                    </div>
                </form>
            </div >
            {showModal &&
                <>
                    <Modal
                        show={showModal}
                        onHide={() => { setShowModal(false); setName("") }}
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Give it a Name</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Control
                                        type="text"
                                        name="pass_name"
                                        value={pass_name}
                                        placeholder="Password Name"
                                        onChange={(e) => setName(e.target.value)}
                                        autoFocus
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" onClick={save}>
                                Confirm
                            </Button>
                        </Modal.Footer >
                    </Modal>
                </>
            }
        </div >
    )
}
