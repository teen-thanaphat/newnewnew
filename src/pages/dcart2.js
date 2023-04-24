import Axios from 'axios'
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import './add.css';

const Dcart = () => {

    const [order_durablearticles_Id, setOrder_durablearticles_Id] = useState("");
    const [order_durablearticles_location, setOrder_durablearticles_location] = useState("");
    const [order_durablearticles_date, setOrder_durablearticles_date] = useState(new Date().toISOString().slice(0, 10));
    const [username, setUsername] = useState("");

    const [durablearticles_name, setDurablearticles_name] = useState("");
    const [durablearticles_brand, setDurablearticles_brand] = useState("");
    const [durablearticles_unit, setDurablearticles_unit] = useState("");
    const [durablearticles_price, setDurablearticles_price] = useState("");
    const [durablearticles_order_date, setDurablearticles_order_date] = useState("");
    const [durablearticles_delivery_date, setDurablearticles_delivery_date] = useState("");
    const [type_durablearticles_Id, setType_durablearticles_Id] = useState("");
    const [company_Id, setCompany_Id] = useState("");
    const [room_Id, setRoom_Id] = useState("");
    const [durablearticles_status, setDurablearticles_status] = useState("");

    const navigate = useNavigate();
    const { durablearticles_Id } = useParams();

    const newstatus = "ยืมไม่ได้";

    const getDurablearticlesById = async () => {
        const response = await Axios.get(`http://localhost:3001/getdurablearticles/${durablearticles_Id}`);
        console.log(response);
        setDurablearticles_name(response.data[0].durablearticles_name);
        setDurablearticles_brand(response.data[0].durablearticles_brand);
        setDurablearticles_unit(response.data[0].durablearticles_unit);
        setDurablearticles_price(response.data[0].durablearticles_price);
        setDurablearticles_order_date(response.data[0].durablearticles_order_date);
        setDurablearticles_delivery_date(response.data[0].durablearticles_delivery_date);
        setType_durablearticles_Id(response.data[0].type_durablearticles_Id);
        setCompany_Id(response.data[0].company_Id);
        setRoom_Id(response.data[0].room_Id);
        setDurablearticles_status(response.data[0].durablearticles_status);
    };

    useEffect(() => {
        getDurablearticlesById();
    }, []);

    const addorder = async (e) => {
        e.preventDefault();
        try {
            await Axios.post(`http://localhost:3001/order_durablearticles`, {
                order_durablearticles_Id,
                order_durablearticles_location,
                order_durablearticles_date,
                username,
                durablearticles_Id,
                durablearticles_name,
            });
            await Axios.put(`http://localhost:3001/statusdurablearticles/${durablearticles_Id}`, {
                durablearticles_Id,
                durablearticles_status: newstatus,
            });
            navigate("/dlist");
        } catch (error) {
            console.log(error);
        }
    };

    new Date(order_durablearticles_date).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    const Dates = new Date(order_durablearticles_date);
    const DateStr = `${Dates.getDate()}/${Dates.getMonth()+1}/${Dates.getFullYear()}`;

    return (
        <div className="Appcontainer">
            <div className="add2">
                <form onSubmit={addorder}>
                    <br />

                    <div className="field1">
                        <label className="label">เลขครุภัณฑ์ : {durablearticles_Id}</label>
                    </div>
                    <div className="field1">
                        <label className="label">ชื่อครุภัณฑ์ : {durablearticles_name}</label>
                    </div>

                    <div className="field1">
                        <label className="label">ยืมไปใช้ที่ไหน :</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={order_durablearticles_location}
                                onChange={(e) => setOrder_durablearticles_location(e.target.value)}
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className="field1">
                        <label className="label">วันที่ยืม :</label>
                        <div className="control">
                            <input
                                className="input"
                                value={DateStr}
                                onChange={(e) => setOrder_durablearticles_date(e.target.value)}
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className="field1">
            <label className="label">ชื่อผู้ยืม :</label>
            <div className="control">
              <select
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              >
                <option value="">-- เลือกชื่อผู้เบิก --</option>
                <option value="ฐิตินันท์ ขันทอง">ฐิตินันท์ ขันทอง</option>
                <option value="อาลิษา หุ่นไทย">อาลิษา หุ่นไทย</option>
                <option value="จันทิมา อรรฆรุจิรัตน์">จันทิมา อรรฆรุจิรัตน์</option>
                <option value="เกรียงไกร เอี่ยมวงค์">เกรียงไกร เอี่ยมวงค์</option>
                <option value="นที ปัญญาประสิทธิ์">นที ปัญญาประสิทธิ์</option>
                <option value="อุษณีย์ บัลลังน้อย">อุษณีย์ บัลลังน้อย</option>
                <option value="อัครา ประโยชน์">อัครา ประโยชน์</option>
                <option value="ลือพล พิพานเมฆาภรณ์">ลือพล พิพานเมฆาภรณ์</option>
                <option value="ธนภัทร์ อนุศาสน์อมรกุล">ธนภัทร์ อนุศาสน์อมรกุล</option>
                <option value="ปรัชญาพร เลี้ยงสุทธิสกนธ์">ปรัชญาพร เลี้ยงสุทธิสกนธ์</option>
                <option value="สุวัจชัย กมลสันติโรจน์">สุวัจชัย กมลสันติโรจน์</option>
                <option value="คันธารัตน์ อเนกบุณย์">คันธารัตน์ อเนกบุณย์</option>
                <option value="นิกร สุทธิเสงี่ยม">นิกร สุทธิเสงี่ยม</option>
                <option value="นนทกร สถิตานนท์">นนทกร สถิตานนท์</option>
                <option value="กฤดาภัทร สีหารี">กฤดาภัทร สีหารี</option>
                <option value="กอบเกียรติ สระอุบล">กอบเกียรติ สระอุบล</option>
                <option value="ปรวัฒน์ วิสูตรศักดิ์">ปรวัฒน์ วิสูตรศักดิ์</option>
                <option value="เบญจพร ลิ้มธรรมาภรณ์">เบญจพร ลิ้มธรรมาภรณ์</option>
                <option value="เฉียบวุฒิ รัตนวิไลสกุล">เฉียบวุฒิ รัตนวิไลสกุล</option>
                <option value="สถิตย์ ประสมพันธ์">สถิตย์ ประสมพันธ์</option>
                <option value="เอิญ สุริยะฉาย">เอิญ สุริยะฉาย</option>
                <option value="ณัฐวุฒิ สร้อยดอกสน">ณัฐวุฒิ สร้อยดอกสน</option>
                <option value="อนุสรณ์ วงษ์สนิท">อนุสรณ์ วงษ์สนิท</option>
                <option value="ยนต์ชนก เขาแก้ว">ยนต์ชนก เขาแก้ว</option>
                <option value="สรร รัตนสัญญา">สรร รัตนสัญญา</option>
                <option value="ธรรศฏภณ สุระศักดิ์">ธรรศฏภณ สุระศักดิ์</option>
                <option value="ณัฐกิตติ์ จิตรเอื้อตระกูล">ณัฐกิตติ์ จิตรเอื้อตระกูล</option>
                <option value="อภิสิทธิ์ รัตนาตรานุรักษ์">อภิสิทธิ์ รัตนาตรานุรักษ์</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>

                    <br />
                    <div className="field">
                        <button type="submit" class="btn btn-success">
                            ยืม
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Dcart;