import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import CreateVehicleInspectionModal from './createVehicleReportModal';
import { calculateRange, sliceData } from '../../utils/table-pagination';
import '../styles.css';

function VehicleInspection() {
    const [search, setSearch] = useState('');
    const [vehicleInspections, setVehicleInspections] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Fetch initial data or set dummy data
        const dummyData = [];
        setPagination(calculateRange(dummyData, 5));
        setVehicleInspections(sliceData(dummyData, page, 5));
    }, []);

    const handleNewInspection = (vehicleDetails) => {
        if (vehicleDetails) {
            const newInspection = {
                id: vehicleInspections.length + 1,
                ...vehicleDetails,
                status: 'Pending',
            };
            setVehicleInspections([...vehicleInspections, newInspection]);
            setPage(1);
            setPagination(calculateRange([...vehicleInspections, newInspection], 5));
        }
    };

    const __handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value !== '') {
            let search_results = vehicleInspections.filter((item) =>
                item.model.toLowerCase().includes(search.toLowerCase())
            );
            setVehicleInspections(search_results);
        } else {
            __handleChangePage(1);
        }
    };

    const __handleChangePage = (new_page) => {
        setPage(new_page);
        setVehicleInspections(sliceData(vehicleInspections, new_page, 5));
    };

    const handleView = (inspectionId) => {
        console.log(`View vehicle inspection ${inspectionId}`);
    };

    const handleDelete = (inspectionId) => {
        setVehicleInspections(vehicleInspections.filter(inspection => inspection.id !== inspectionId));
        setPagination(calculateRange(vehicleInspections.filter(inspection => inspection.id !== inspectionId), 5));
    };

    return (
        <div className='dashboard-content'>
            <DashboardHeader
                onClick={() => setIsModalOpen(true)}
                btnText="New Vehicle Inspection" />

            <CreateVehicleInspectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleNewInspection}
            />

            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Vehicle Inspection List</h2>
                    <div className='dashboard-content-search'>
                        <input
                            type='text'
                            value={search}
                            placeholder='Search by model...'
                            className='dashboard-content-input'
                            onChange={e => __handleSearch(e)} />
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Vehicle Model</th>
                            <th>Inspection Report</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    {vehicleInspections.length !== 0 ?
                        <tbody>
                            {vehicleInspections.map((inspection, index) => (
                                <tr key={index}>
                                    <td><span>{inspection.id}</span></td>
                                    <td><span>{inspection.model}</span></td>
                                    <td>
                                        <div>
                                            <span>{inspection.reportName}</span>
                                        </div>
                                    </td>
                                    <td><span>{inspection.status}</span></td>
                                    <td><span>{inspection.date}</span></td>
                                    <td>
                                        <button onClick={() => handleView(inspection.id)}>View</button>
                                        <button onClick={() => handleDelete(inspection.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        : null}
                </table>

                {vehicleInspections.length !== 0 ?
                    <div className='dashboard-content-footer'>
                        {pagination.map((item, index) => (
                            <span
                                key={index}
                                className={item === page ? 'active-pagination' : 'pagination'}
                                onClick={() => __handleChangePage(item)}>
                                {item}
                            </span>
                        ))}
                    </div>
                    :
                    <div className='dashboard-content-footer'>
                        <span className='empty-table'>No data</span>
                    </div>
                }
            </div>
        </div>
    );
}

export default VehicleInspection;
