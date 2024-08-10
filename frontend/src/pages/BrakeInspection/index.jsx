import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import CreateBrakeInspectionModal from './CreateBrakeInspectionModal';
import { calculateRange, sliceData } from '../../utils/table-pagination';
import '../styles.css';

function BrakeInspection() {
    const [search, setSearch] = useState('');
    const [brakeInspections, setBrakeInspections] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Assume initial fetch or setting dummy data for brakes
        const dummyData = []; // This would ideally be fetched from a server
        setPagination(calculateRange(dummyData, 5));
        setBrakeInspections(sliceData(dummyData, page, 5));
    }, []);

    const handleNewInspection = (brakeDetails) => {
        if (brakeDetails) {
            const newInspection = {
                id: brakeInspections.length + 1,
                ...brakeDetails,
                status: 'Pending',
            };
            setBrakeInspections([...brakeInspections, newInspection]);
            setPage(1);
            setPagination(calculateRange([...brakeInspections, newInspection], 5));
        }
    };

    const __handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value !== '') {
            let search_results = brakeInspections.filter((item) =>
                item.model.toLowerCase().includes(search.toLowerCase())
            );
            setBrakeInspections(search_results);
        } else {
            __handleChangePage(1);
        }
    };

    const __handleChangePage = (new_page) => {
        setPage(new_page);
        setBrakeInspections(sliceData(brakeInspections, new_page, 5));
    };

    const handleView = (inspectionID) => {
        console.log(`View brake inspection ${inspectionID}`);
    };

    const handleDelete = (inspectionID) => {
        setBrakeInspections(brakeInspections.filter(inspection => inspection.id !== inspectionID));
        setPagination(calculateRange(brakeInspections.filter(inspection => inspection.id !== inspectionID), 5));
    };

    return (
        <div className='dashboard-content'>
            <DashboardHeader
                onClick={() => setIsModalOpen(true)}
                btnText="New Brake Inspection" />

            <CreateBrakeInspectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleNewInspection}
            />

            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Brake Inspection List</h2>
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

                    {brakeInspections.length !== 0 ?
                        <tbody>
                            {brakeInspections.map((inspection, index) => (
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
                        : <tr><td colSpan="6">No data available</td></tr>}
                </table>

                {brakeInspections.length !== 0 ?
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

export default BrakeInspection;
