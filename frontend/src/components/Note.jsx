import React, { useState } from "react";
import "../styles/Note.css";
import { Card, Button, CloseButton, Form } from 'react-bootstrap';

function Note({ note, onDelete, onEdit }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

    const [editMode, setEditMode] = useState(false);
    const [content, setContent] = useState(note.content);
    const [title, setTitle] = useState(note.title);

    const handleSave = (id, title, content) => {
        onEdit(id, title, content);
        setEditMode(false);
    };

    return (
        <Card className="note-card shadow-sm" style={{ position: 'relative', borderRadius: '12px' }}>
            { !editMode &&
                <CloseButton
                style={{ position: 'absolute', top: '10px', right: '10px' }}
                onClick={() => onDelete(note.id)}
            />
            }
            <Card.Body>
                {editMode ? (
                    <>
                        <Form.Group>
                            <Form.Control
                                className="mb-2"
                                style={{ fontWeight: 'bold' }}
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                placeholder="Enter Title"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                as="textarea"
                                style={{ height: '100px', resize: 'none' }}
                                onChange={(e) => setContent(e.target.value)}
                                value={content}
                                placeholder="Enter Content"
                            />
                        </Form.Group>
                    </>
                ) : (
                    <>
                        <Card.Title style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>{note.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '0.85rem' }}>
                            {formattedDate}
                        </Card.Subtitle>
                        <Card.Text style={{ whiteSpace: 'pre-wrap' }}>{note.content}</Card.Text>
                    </>
                )}

                <div className="d-flex justify-content-end mt-3">
                    {editMode ? (
                        <>
                            <Button
                                variant="outline-success"
                                className="me-2"
                                onClick={() => handleSave(note.id, title, content)}
                            >
                                Save
                            </Button>
                            <Button
                                variant="outline-danger"
                                onClick={() => setEditMode(false)}
                            >
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <Button variant="outline-primary" onClick={() => setEditMode(true)}>
                            Edit
                        </Button>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}

export default Note;
