import React from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';

function Reports() {
    return (
        <div className="reports">
            <h2 className="mb-4">Reports</h2>
            <Card>
                <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                        <div>
                            <strong>Property Report</strong><br />
                            <small>View and generate reports on properties.</small>
                        </div>
                        <Button variant="outline-primary" size="sm">Generate Report</Button>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                        <div>
                            <strong>User Report</strong><br />
                            <small>View and generate reports on users.</small>
                        </div>
                        <Button variant="outline-primary" size="sm">Generate Report</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
}

export default Reports;