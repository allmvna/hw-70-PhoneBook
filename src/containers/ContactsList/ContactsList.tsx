import {Card, CardContent, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {fetchContact} from "../slices/sliceContact/sliceContact.tsx";
import {Contact, setSelectedContact, toggleModal} from "../slices/sliceModal/sliceModal.tsx";


const ContactsList = () => {
    const { contacts } = useAppSelector((state) => state.phonebook);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchContact());
    }, [dispatch]);

    const handleCardClick = (contact: Contact) => {
        dispatch(setSelectedContact(contact));
        dispatch(toggleModal(true));
    };

    return (
        <>
            <Typography
                variant="h4"
                sx={{mb: 2, textAlign: "center", color: "#000"}}
            >
                Contacts
            </Typography>
            <Grid container spacing={2}>
                {contacts.map((contact) => (
                    <Grid size={12} key={contact.name}>
                        <Card
                            sx={{
                                minWidth: 275,
                                backgroundColor: "inherit",
                                border: "3px solid",
                                borderRadius: "10px",
                                p: 1,
                            }}
                            onClick={() => handleCardClick(contact)}
                        >
                            <CardContent
                                sx={{
                                    backgroundColor: "white",
                                    mb: 1,
                                    textAlign: "center",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Grid size={3}
                                      sx={{
                                          display: "flex",
                                          alignItems: "center"
                                      }}>
                                    {contact.photo && (
                                        <img
                                            src={contact.photo}
                                            alt={contact.name}
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                borderRadius: "50%",
                                                objectFit: "cover",
                                                marginRight: "10px",
                                            }}
                                        />
                                    )}
                                    <Typography sx={{fontSize: 20, fontWeight: 600, ml: 1}}>
                                        {contact.name}
                                    </Typography>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default ContactsList;