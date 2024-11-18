import {Button, TextField, Typography,} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {addContact, IContact, updateContact} from "../../containers/slices/sliceContact/sliceContact.tsx";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

const initialContact = {
    name: '',
    phone: '',
    email: '',
    photo: '',
};

const Form = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState(initialContact);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const contacts = useAppSelector(state => state.phonebook.contacts);
    const contact = contacts.find(c => c.id === id);


    useEffect(() => {
        if (id && contact) {
            setFormData(contact);
        }
    }, [id, contact]);


    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const contactData: IContact = { ...formData, id: id || '' };

        if (id) {
            await dispatch(updateContact(contactData));
        } else {
            await dispatch(addContact(contactData));
        }
        navigate('/');
        setFormData(initialContact);
    };

    return (
        <>
            <Typography sx={{ mb: 2, textAlign: "center", color: "#112735" }} variant="h4">
                {id ? 'Edit Contact' : 'Add New Contact'}
            </Typography>
            <form onSubmit={onSubmit}>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        mx: "auto",
                        width: "60%",
                        border: "3px solid  #052f46",
                        borderRadius: "10px",
                        p: 4,
                    }}
                >
                    <Grid size={12}>
                        <TextField
                            sx={{
                                width: "100%",
                                backgroundColor: "white",
                                borderRadius: "10px",
                            }}
                            id="name"
                            label="Name"
                            type="text"
                            variant="outlined"
                            name="name"
                            value={formData.name}
                            onChange={onChange}
                            required
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            sx={{
                                width: "100%",
                                backgroundColor: "white",
                                borderRadius: "10px",
                            }}
                            id="phone"
                            label="Phone"
                            type="tel"
                            variant="outlined"
                            name="phone"
                            value={formData.phone}
                            onChange={onChange}
                            required
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            sx={{
                                width: "100%",
                                backgroundColor: "white",
                                borderRadius: "10px",
                            }}
                            id="email"
                            label="Email"
                            type="email"
                            variant="outlined"
                            name="email"
                            value={formData.email}
                            onChange={onChange}
                            required
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            sx={{
                                width: "100%",
                                backgroundColor: "white",
                                borderRadius: "10px",
                            }}
                            id="photo"
                            label="Photo - URL"
                            type="url"
                            variant="outlined"
                            name="photo"
                            value={formData.photo}
                            onChange={onChange}
                            required
                        />
                    </Grid>
                    {formData.photo && (
                        <Grid size={12} sx={{ textAlign: "center"}}>
                            <img
                                src={formData.photo}
                                alt="Contact Photo"
                                style={{
                                    maxWidth: "200px",
                                    maxHeight: "200px",
                                    borderRadius: "5px",
                                    border: "1px solid #052f46",
                                }}
                            />
                        </Grid>
                    )}
                    <Grid size={12} sx={{ textAlign: "center" }}>
                        <Button
                            size="large"
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundImage: "linear-gradient(90deg, #052f46, #0a4666)",
                                "&:hover": {
                                    backgroundImage: "linear-gradient(90deg, #0a4666, #052f46)",
                                },
                            }}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </form>

        </>
    );
};

export default Form;