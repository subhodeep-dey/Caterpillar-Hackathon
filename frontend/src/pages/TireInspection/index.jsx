import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import CreateTireInspectionModal from './createTireInspectionModal';
import { calculateRange, sliceData } from '../../utils/table-pagination';
import '../styles.css';

function TireInspection() {
    const [search, setSearch] = useState('');
    const [tireInspections, setTireInspections] = useState([]); // Initialize empty state
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Fetch initial data from API
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/tire-inspections');
                const data = await response.json();
                setPagination(calculateRange(data, 5));
                setTireInspections(sliceData(data, page, 5));
            } catch (error) {
                console.error('Error fetching tire inspections:', error);
            }
        };

        fetchData();
    }, [page]);

    const handleNewInspection = (inspectionName) => {
        if (inspectionName) {
            const newInspection = {
                id: tireInspections.length + 1,
                asset: "XYZ",
                date: new Date().toLocaleDateString(),
                name: inspectionName,
                condition: 'Pending',
            };
            setTireInspections([...tireInspections, newInspection]);
            setPage(1);
            setPagination(calculateRange([...tireInspections, newInspection], 5));
        }
    };

    const __handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value !== '') {
            let search_results = tireInspections.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
            setTireInspections(search_results);
        } else {
            __handleChangePage(1);
        }
    };

    const __handleChangePage = (new_page) => {
        setPage(new_page);
        setTireInspections(sliceData(tireInspections, new_page, 5));
    };

    const handleView = (inspectionID) => {
        // Implement view logic here
        console.log(`View inspection ${inspectionID}`);
    };

    const handleDelete = (inspectionID) => {
        setTireInspections(tireInspections.filter(inspection => inspection.id !== inspectionID));
        setPagination(calculateRange(tireInspections.filter(inspection => inspection.id !== inspectionID), 5));
    };

    return (
        <div className='dashboard-content'>
            <DashboardHeader
                onClick={() => setIsModalOpen(true)}
                btnText="New Tire Inspection" />

            <CreateTireInspectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleNewInspection}
            />

            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Tire Inspection List</h2>
                    <div className='dashboard-content-search'>
                        <input
                            type='text'
                            value={search}
                            placeholder='Search..'
                            className='dashboard-content-input'
                            onChange={e => __handleSearch(e)} />
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Left</th>
                            <th>Right</th>
                            <th>Condition</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    {tireInspections.length !== 0 ?
                        <tbody>
                            {tireInspections.map((inspection, index) => (
                                <tr key={index}>
                                    <td><span>{inspection.inspectionId}</span></td>
                                    <td><span>{inspection.tirePressureLeftFront}</span></td>
                                    <td><span>{inspection.tirePressureRightFront}</span></td>
                                    <td><span>{inspection.tireConditionLeftFront}</span></td>
                                    <td><span>{inspection.createdAt}</span></td>
                                    <td>
                                        <button onClick={() => handleView(inspection.inspectionId)}>View</button>
                                        <button onClick={() => handleDelete(inspection.inspectionId)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        : null}
                </table>

                {tireInspections.length !== 0 ?
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

export default TireInspection;