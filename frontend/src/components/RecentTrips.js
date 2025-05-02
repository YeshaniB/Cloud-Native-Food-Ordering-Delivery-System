import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const RecentTrips = ({ trips }) => {
    return (
        <div className="recent-trips">
            <h3>Recent Trips</h3>
            <DataTable value={trips} stripedRows responsiveLayout="scroll">
                <Column field="tripId" header="Trip ID" />
                <Column field="date" header="Date" />
                <Column field="destination" header="Destination" />
                <Column field="earnings" header="Earnings" />
            </DataTable>
        </div>
    );
};

export default RecentTrips;
