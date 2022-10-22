import React from "react";
import img from "../../images/img.png";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function Contacts(){

    const defaultProps = {
                center: {
                        lat: 10.99835602,
                        lng: 77.01502627
                },
                zoom: 11
        };

        return (
            <html>
            <h2>Контакты</h2>
            <h4>Адрес офиса:</h4><p>129110 г. Москва, проспект Мира, д. 62, стр. 1</p>
            <h4>Режим работы:</h4><p>Пн. - Пт. с 09.00 до 20.00</p>
            <h4>Работает горячая линия 24/7</h4>
            <h4>Контактная информация:</h4>
            <p>E-mail: magazin-info@gmail.com</p>
            <h4>Сотрудничество:</h4>
            <p>E-mail: magazin-hr@gmail.com</p>
            <img src ={img} alt="Схема проезда"/>

            <div style={{ height: '30vh', width: '30%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "" }}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                    >
                            <AnyReactComponent
                                lat={59.955413}
                                lng={30.337844}
                                text="My Marker"
                            />
                    </GoogleMapReact>
            </div>
            </html>
        );
}
export default Contacts