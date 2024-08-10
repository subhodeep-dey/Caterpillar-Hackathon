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
        // Fetch initial data or set dummy data
        const dummyData = []; // Add your initial data here
        setPagination(calculateRange(dummyData, 5));
        setTireInspections(sliceData(dummyData, page, 5));
    }, []);

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
                            <th>ASSET</th>
                            <th>INSPECTION NAME</th>
                            <th>CONDITION</th>
                            <th>DATE</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>

                    {tireInspections.length !== 0 ?
                        <tbody>
                            {tireInspections.map((inspection, index) => (
                                <tr key={index}>
                                    <td><span>{inspection.id}</span></td>
                                    <td><span>{inspection.asset}</span></td>
                                    <td>
                                        <div>
                                            <span>{inspection.name}</span>
                                        </div>
                                    </td>
                                    <td><span>{inspection.condition}</span></td>
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
