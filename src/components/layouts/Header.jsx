import React from 'react';
import { Link } from 'react-router-dom';
import '../layouts/header.css';

export default function Header() {
    return (
        <div className="header">
            <div className="logo">
                <Link to="/" className="adorable">adorable</Link>
            </div>
            <nav className="navigation">
                <ul className="nav-menu">
                    <li><Link to="/">유기견보호센터 소개</Link></li>
                    <li><Link to="/adopt">반려견 입양</Link></li>
                    <li><Link to="/">입양후기</Link></li>
                    <li><Link to="/contact">로그인</Link></li>
                </ul>
                <h1>Adopt a Friend for Life<br /> Find Love in a Shelter Dog<br /> Remember: Every Paw Matter!</h1>
            </nav>
        </div>
    );
}
