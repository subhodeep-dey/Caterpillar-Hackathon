import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import CreateEngineInspectionModal from './CreateEngineInspectionModal';
import { calculateRange, sliceData } from '../../utils/table-pagination';
import '../styles.css';

function EngineInspection() {
    const [search, setSearch] = useState('');
    const [engineInspections, setEngineInspections] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Assume initial fetch or setting dummy data for engines
        const dummyData = []; // This would ideally be fetched from a server
        setPagination(calculateRange(dummyData, 5));
        setEngineInspections(sliceData(dummyData, page, 5));
    }, []);

    const handleNewInspection = (engineDetails) => {
        if (engineDetails) {
            const newInspection = {
                id: engineInspections.length + 1,
                ...engineDetails,
                status: 'Pending',
            };
            setEngineInspections([...engineInspections, newInspection]);
            setPage(1);
            setPagination(calculateRange([...engineInspections, newInspection], 5));
        }
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value !== '') {
            let searchResults = engineInspections.filter((item) =>
                item.model.toLowerCase().includes(search.toLowerCase())
            );
            setEngineInspections(searchResults);
        } else {
            handleChangePage(1);
        }
    };

    const handleChangePage = (newPage) => {
        setPage(newPage);
        setEngineInspections(sliceData(engineInspections, newPage, 5));
    };

    const handleView = (inspectionID) => {
        console.log(`View engine inspection ${inspectionID}`);
    };

    const handleDelete = (inspectionID) => {
        setEngineInspections(engineInspections.filter(inspection => inspection.id !== inspectionID));
        setPagination(calculateRange(engineInspections.filter(inspection => inspection.id !== inspectionID), 5));
    };

    return (
        <div className='dashboard-content'>
            <DashboardHeader
                onClick={() => setIsModalOpen(true)}
                btnText="New Engine Inspection" />

            <CreateEngineInspectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleNewInspection}
            />

            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Engine Inspection List</h2>
                    <div className='dashboard-content-search'>
                        <input
                            type='text'
                            value={search}
                            placeholder='Search by model...'
                            className='dashboard-content-input'
                            onChange={handleSearch} />
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

                    {engineInspections.length !== 0 ?
                        <tbody>
                            {engineInspections.map((inspection, index) => (
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

                {engineInspections.length !== 0 ?
                    <div className='dashboard-content-footer'>
                        {pagination.map((item, index) => (
                            <span
                                key={index}
                                className={item === page ? 'active-pagination' : 'pagination'}
                                onClick={() => handleChangePage(item)}>
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

export default EngineInspection;
