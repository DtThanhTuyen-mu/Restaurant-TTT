import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { faList } from "@fortawesome/free-solid-svg-icons";
import Toolbar from '../products/Toolbar';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import ProductImage from '../products/ProductImage';
import '../products/this.css'
import axios from 'axios'
function CategoryForm() {
    const [name, setName] = useState("");
    const [image, setImage] = useState("https://static.vecteezy.com/system/resources/previews/005/988/954/original/hidden-icon-free-vector.jpg");
    const [url, setUrl] = useState({
        "add": "/manage/product/new",
        "hide": "product/hide"
      })

    const navigate = useNavigate();
    const createCategory = async () => {
        const createURL = 'http://localhost:4000/api/category/new'
        axios.post(createURL, {
            category_name: name,
            category_img: image,
        })
        .then((res) => {
            const insertedId = res?.data.category._id;
            navigate(`/manage/category/${insertedId}`);
        })
    }
    return (
        <div className='detail-container'>
            <div className='fixed-header'>
                <div className="title">
                    <Link to="/manage/category" className="fLink">
                        <h2>QUẢN LÝ DANH MỤC SẢN PHẨM</h2>
                    </Link>
                </div>
                <Toolbar url={url} />
            </div>
            {/* <Outlet /> */}
            <div className="content">
                <div className="header-product n_right_content" style={{width: "100%"}}>
                    <Link to="/manage/category" className="fLink">
                        <FontAwesomeIcon icon={faList} />
                        <span> Danh mục</span>
                    </Link>
                    <span>/Thêm danh mục mới</span>
                </div>
                <div className="product-content">
                    <div className="n_left">
                        <div>
                            <ProductImage img={image} />
                        </div>
                    </div>
                    <div className="n_right">
                        <div className='n_right_content'>
                            <div>
                                <label>Tên danh mục:</label>
                                <input
                                    defaultValue={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label>Đường dẫn hình ảnh:</label>
                                <input 
                                    defaultValue={image}
                                    onChange={(e) => setImage(e.target.value)}
                                ></input>
                            </div>
                            <div>
                                <button 
                                    className='updateButton'
                                    onClick={createCategory}
                                >Thêm danh mục</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryForm;