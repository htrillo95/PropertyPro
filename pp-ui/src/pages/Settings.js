import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';

function Settings() {
    return (
        <div className="settings">
            <h2 className="mb-4">Settings</h2>
            <Card>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="formApplicationName" className="mb-3">
                            <Form.Label>Application Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter application name" />
                        </Form.Group>
                        <Form.Group controlId="formDefaultEmailNotifications" className="mb-3">
                            <Form.Check type="checkbox" label="Enable Email Notifications" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Settings;