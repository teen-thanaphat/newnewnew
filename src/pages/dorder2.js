import Axios from 'axios'
import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Dshow() {

    const [orderd, setOrderd] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchCriteria, setSearchCriteria] = useState("durablearticles_name"); // Default search criteria is durablearticles_name
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        getOrderd();
    }, []);

    const getOrderd = async () => {
        const response = await Axios.get('http://localhost:3001/order_durablearticles3');
        setOrderd(response.data.reverse()); // Reverse
    };

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    }

    const handleSearchCriteria = event => {
        setSearchCriteria(event.target.value);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = orderd.filter(val =>
        val[searchCriteria].toLowerCase().includes(searchTerm.toLowerCase())
        || (val.order_durablearticles_date && new Date(val.order_durablearticles_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' }).includes(searchTerm))
    ).slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(orderd.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const displayname = sessionStorage.getItem('displayname');

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">

                <div className="field">
                    <div className="control">
                        <div className="select">
                            <select value={searchCriteria} onChange={handleSearchCriteria}>
                                <option value="durablearticles_name">ชื่อครุภัณฑ์</option>
                                <option value="durablearticles_Id">เลขครุภัณฑ์</option>
                                <option value="order_durablearticles_date">วันที่</option>
                            </select>
                        </div>
                        <input
                            className="input"
                            type="text"
                            placeholder={`ค้นหา`}
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>

                <table className="table" style={{ tableLayout: "fixed", width: "90%", margin: "0 auto" }}>
                    <thead>
                        <tr>
                            <th scope="col" className="col-2">เลขครุภัณฑ์</th>
                            <th scope="col" className="col-4">ชื่อครุภัณฑ์</th>
                            <th scope="col" className="col-1">ยืมไปใช้ที่ไหน</th>
                            <th scope="col" className="col-1">วันที่ยืม</th>
                            <th scope="col" className="col-1">ชื่อผู้ยืม</th>
                            <th scope="col" className="col-1">สถานะ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((val, index) => {
                            if (val.username === displayname) {
                                return (
                                    <tr key={val.order_durablearticles_Id}>
                                        <td>{val.durablearticles_Id}</td>
                                        <td>{val.durablearticles_name}</td>
                                        <td>{val.order_durablearticles_location}</td>
                                        <td>{(val.order_durablearticles_date == null) ? "" : new Date(val.order_durablearticles_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}</td>
                                        <td>{val.username}</td>
                                        <td>{val.order_durablearticles_status ? val.order_durablearticles_status : "รอดำเนินการ"}</td>
                                    </tr>
                                )
                            } else {
                                return null;
                            }
                        })}
                    </tbody>
                </table>

                <nav style={{ tableLayout: "fixed", width: "90%", margin: "0 auto" }}>
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button onClick={() => paginate(1)} className="page-link">หน้าแรก</button>
                        </li>
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button onClick={() => paginate(currentPage - 1)} className="page-link">ก่อนหน้า</button>
                        </li>
                        {[...Array(totalPages)].map((_, index) => {
                            if (index + 1 === currentPage) {
                                return (
                                    <li key={index} className="page-item active">
                                        <button className="page-link">{index + 1}</button>
                                    </li>
                                );
                            } else if (
                                index + 1 >= currentPage - 9 &&
                                index + 1 <= currentPage + 9 &&
                                index + 1 !== totalPages
                            ) {
                                return (
                                    <li key={index} className="page-item">
                                        <button onClick={() => paginate(index + 1)} className="page-link">{index + 1}</button>
                                    </li>
                                );
                            } else if (index + 1 === currentPage - 10 || index + 1 === currentPage + 10) {
                                return (
                                    <li key={index} className="page-item disabled">
                                        <button className="page-link">...</button>
                                    </li>
                                );
                            } else if (index + 1 === totalPages) {
                                return (
                                    <li key={index} className="page-item">
                                        <button onClick={() => paginate(totalPages)} className="page-link">{totalPages}</button>
                                    </li>
                                );
                            }
                            return null;
                        })}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button onClick={() => paginate(currentPage + 1)} className="page-link">ถัดไป</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div >
    );
};

export default Dshow