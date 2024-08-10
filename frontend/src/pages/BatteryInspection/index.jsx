import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import CreateBatteryInspectionModal from './createBatteryInspectionModal';
import { calculateRange, sliceData } from '../../utils/table-pagination';
import '../styles.css';

function BatteryInspection() {
    const [search, setSearch] = useState('');
    const [batteryInspections, setBatteryInspections] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Assume initial fetch or setting dummy data for batteries
        const dummyData = []; // This would ideally be fetched from a server
        setPagination(calculateRange(dummyData, 5));
        setBatteryInspections(sliceData(dummyData, page, 5));
    }, []);

    const handleNewInspection = (batteryDetails) => {
        if (batteryDetails) {
            const newInspection = {
                id: batteryInspections.length + 1,
                ...batteryDetails,
                status: 'Pending',
            };
            setBatteryInspections([...batteryInspections, newInspection]);
            setPage(1);
            setPagination(calculateRange([...batteryInspections, newInspection], 5));
        }
    };

    const __handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value !== '') {
            let search_results = batteryInspections.filter((item) =>
                item.model.toLowerCase().includes(search.toLowerCase())
            );
            setBatteryInspections(search_results);
        } else {
            __handleChangePage(1);
        }
    };

    const __handleChangePage = (new_page) => {
        setPage(new_page);
        setBatteryInspections(sliceData(batteryInspections, new_page, 5));
    };

    const handleView = (inspectionId) => {
        console.log(`View battery inspection ${inspectionId}`);
    };

    const handleDelete = (inspectionId) => {
        setBatteryInspections(batteryInspections.filter(inspection => inspection.id !== inspectionId));
        setPagination(calculateRange(batteryInspections.filter(inspection => inspection.id !== inspectionId), 5));
    };

    return (
        <div className='dashboard-content'>
            <DashboardHeader
                onClick={() => setIsModalOpen(true)}
                btnText="New Battery Inspection" />

            <CreateBatteryInspectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleNewInspection}
            />

            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Battery Inspection List</h2>
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
                            <th>Battery Model</th>
                            <th>Inspection Report</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    {batteryInspections.length !== 0 ?
                        <tbody>
                            {batteryInspections.map((inspection, index) => (
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

                {batteryInspections.length !== 0 ?
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

export default BatteryInspection;
