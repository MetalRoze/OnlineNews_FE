import React from 'react';

const Footer = ({ className }) => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <footer className={`${className} py-2 mt-auto`}>
                <div className="container p-4">
                    <div className="text-center">
                        © 2024 Online News by metalroze. All rights reserved.
                    </div>
                </div>
            </footer>
        </div >
    );
};

export default Footer;
