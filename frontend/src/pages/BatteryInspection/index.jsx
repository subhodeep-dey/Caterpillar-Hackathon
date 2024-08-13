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
        fetchBatteryInspections();
    }, []);

    const fetchBatteryInspections = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/battery-inspections`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setBatteryInspections(data);
            setPagination(calculateRange(data, 5));
            setPage(1);
        } catch (error) {
            console.error('Error fetching battery inspections:', error);
        }
    };

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
                item.batteryMake.toLowerCase().includes(search.toLowerCase())
            );
            setBatteryInspections(search_results);
        } else {
            fetchBatteryInspections();
        }
    };

    const __handleChangePage = (new_page) => {
        setPage(new_page);
        setBatteryInspections(sliceData(batteryInspections, new_page, 5));
    };

    const handleView = (inspectionID) => {
        console.log(`View battery inspection ${inspectionID}`);
    };

    const handleDelete = (inspectionID) => {
        setBatteryInspections(batteryInspections.filter(inspection => inspection._id !== inspectionID));
        setPagination(calculateRange(batteryInspections.filter(inspection => inspection._id !== inspectionID), 5));
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
                            placeholder='Search by battery make...'
                            className='dashboard-content-input'
                            onChange={e => __handleSearch(e)} />
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Battery Make</th>
                            <th>Replacement Date</th>
                            <th>Voltage</th>
                            <th>Water Level</th>
                            <th>Condition</th>
                            <th>Leak/Rust</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    {batteryInspections.length !== 0 ?
                        <tbody>
                            {batteryInspections.map((inspection, index) => (
                                <tr key={inspection._id}>
                                    <td><span>{inspection.inspectionID}</span></td>
                                    <td><span>{inspection.batteryMake}</span></td>
                                    <td><span>{new Date(inspection.batteryReplacementDate).toLocaleDateString()}</span></td>
                                    <td><span>{inspection.batteryVoltage}</span></td>
                                    <td><span>{inspection.batteryWaterLevel}</span></td>
                                    <td><span>{inspection.batteryCondition ? 'Good' : 'Bad'}</span></td>
                                    <td><span>{inspection.batteryLeakOrRust ? 'Yes' : 'No'}</span></td>
                                    <td>
                                        <button onClick={() => handleView(inspection._id)}>View</button>
                                        <button onClick={() => handleDelete(inspection._id)}>Delete</button>
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