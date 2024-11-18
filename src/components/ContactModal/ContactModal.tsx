import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {toggleModal} from "../../containers/slices/sliceModal/sliceModal.tsx";
import {Box, Button, IconButton, Modal, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CloseIcon from '@mui/icons-material/Close';
import {deleteContact} from "../../containers/slices/sliceContact/sliceContact.tsx";
import {NavLink} from "react-router-dom";

const ContactModal = () => {
    const { isModalOpen, selectedContact } = useAppSelector((state) => state.modal);
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(toggleModal(false));
    };

    const deleteThisContact = (id: string) => {
        dispatch(deleteContact(id));
        dispatch(toggleModal(false));
    };


    return (
        <>
            <Modal
                open={isModalOpen}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        boxShadow: 24,
                        p: 4,
                        width: '90%',
                        maxWidth: '500px',
                    }}
                >
                    {selectedContact && (
                        <>
                            <IconButton
                                onClick={handleClose}
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    color: 'gray',
                                }}
                            >
                                <CloseIcon />
                            </IconButton>

                            <Grid container spacing={2}>
                                <Grid size={4}>
                                    {selectedContact.photo && (
                                        <img
                                            src={selectedContact.photo}
                                            alt={selectedContact.name}
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                borderRadius: "50%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    )}
                                </Grid>
                                <Grid size={8}>
                                    <Typography variant="h6" id="modal-title">
                                        {selectedContact.name}
                                    </Typography>
                                    <Typography>
                                        <strong>Phone: </strong>{selectedContact.phone}
                                    </Typography>
                                    <Typography>
                                        <strong>Email: </strong>{selectedContact.email}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Button
                                component={NavLink}
                                to={`/${selectedContact.id}/edit`}
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2, mr: 2}}
                                onClick={handleClose}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                sx={{ mt: 2 }}
                                onClick={() => deleteThisContact(selectedContact.id)}
                            >
                            </Button>
                        </>
                    )}
                </Box>
            </Modal>
        </>
    );
};

export default ContactModal;