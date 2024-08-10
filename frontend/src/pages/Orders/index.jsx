import React, {useState, useEffect} from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import CreateReportModal from './createReportModal';
import all_orders from '../../constants/orders';
import {calculateRange, sliceData} from '../../utils/table-pagination';
import '../styles.css';
import DoneIcon from '../../assets/icons/done.svg';
import CancelIcon from '../../assets/icons/cancel.svg';
import RefundedIcon from '../../assets/icons/refunded.svg';

function Orders () {
    const [search, setSearch] = useState('');
    const [orders, setOrders] = useState(all_orders);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setPagination(calculateRange(all_orders, 5));
        setOrders(sliceData(all_orders, page, 5));
    }, []);

    const handleNewOrder = () => {
        const orderName = prompt("Please enter the new order name:");
        if (orderName) {
            const newOrder = {
                id: orders.length + 1, // simplistic approach for new ID
                asset: "XYZ",
                date: new Date().toLocaleDateString(),
                name: orderName,
                status: 'Pending',
                price: '0.00',
                avatar: 'path/to/default/avatar.jpg' // Default or placeholder image path
            };
            setOrders([...orders, newOrder]);
            setPage(1);
            setPagination(calculateRange([...orders, newOrder], 5));
        }
    };

    // Search
    const __handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value !== '') {
            let search_results = orders.filter((item) =>
                item.first_name.toLowerCase().includes(search.toLowerCase()) ||
                item.last_name.toLowerCase().includes(search.toLowerCase()) ||
                item.product.toLowerCase().includes(search.toLowerCase())
            );
            setOrders(search_results);
        }
        else {
            __handleChangePage(1);
        }
    };

    // Change Page 
    const __handleChangePage = (new_page) => {
        setPage(new_page);
        setOrders(sliceData(all_orders, new_page, 5));
    }

    return(
        <div className='dashboard-content'>
            <DashboardHeader
                onClick={() => setIsModalOpen(true)}
                btnText="New Report" />

            <CreateReportModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleNewOrder}
            />

            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Report List</h2>
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
                        <th>ID</th>
                        <th>ASSET</th>
                        <th>REPORT NAME</th>
                        <th>CONDITION</th>
                        <th>DATE</th>
                        <th>ACTION</th>
                    </thead>

                    {orders.length !== 0 ?
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td><span>{order.id}</span></td>
                                    <td><span>{order.asset}</span></td>
                                    <td>
                                        <div>
                                            {/* <img 
                                                src={order.name}
                                                className='dashboard-content-avatar'
                                                alt={order.first_name + ' ' +order.last_name} /> */}
                                            <span>{order.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            {order.status === 'Paid' ?
                                                <img
                                                    src={DoneIcon}
                                                    alt='paid-icon'
                                                    className='dashboard-content-icon' />
                                            : order.status === 'Canceled' ?
                                                <img
                                                    src={CancelIcon}
                                                    alt='canceled-icon'
                                                    className='dashboard-content-icon' />
                                            : order.status === 'Refunded' ?
                                                <img
                                                    src={RefundedIcon}
                                                    alt='refunded-icon'
                                                    className='dashboard-content-icon' />
                                            : null}
                                            <span>{order.status}</span>
                                        </div>
                                    </td>
                                    <td><span>{order.date}</span></td>
                                    <td><span>${order.action}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    : null}
                </table>

                {orders.length !== 0 ?
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
    )
}

export default Orders;