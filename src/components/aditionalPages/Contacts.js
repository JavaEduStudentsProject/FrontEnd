import React from "react";
import img from "../../images/img.png";
import "./aboutUs.css";
import GoogleMapReact from 'google-map-react';
import * as PropTypes from "prop-types";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function DirectionsRenderer(props) {
    return null;
}

function Contacts(){

    const defaultProps = {
                center: {
                        lat: 55.785569516554474,
                        lng:37.63575093262811
                },
                zoom: 11
        };

        return (
            <html>
            <body>
            <div id="wrapper">
                <div id="contant">
                    <div className="contant_1">
                            <h2>
                                Контакты
                                <span>Октябрь 22, 2022 | (0) Комментариев</span>
                            </h2>
                            <div className="contant_1_right">
                                {/*<h3>Как до нас добраться</h3>*/}
                            <img src={img} width="277" height="266" alt=""/>
            <h4>Адрес офиса:</h4><p>129110 г. Москва, проспект Мира, д. 62, стр. 1</p>
                            <br></br>
            <h4>Режим работы:</h4><p>Пн. - Пт. с 09.00 до 20.00</p>
                            <br></br>
            <h4>Работает горячая линия 24/7</h4>
                            <br></br>
            <h4>Контактная информация:</h4>
            <p>E-mail: magazin-info@gmail.com</p>
                            <br></br>
            <h4>Сотрудничество:</h4>
            <p>E-mail: magazin-hr@gmail.com</p>
                            <br></br>
                                <br className="clear bottomClear"/>
                        </div>
                    </div>
                </div>
            <div style={{ height: '30vh', width: '30%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "" }}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                        options={defaultProps.options}
                    >
                            <AnyReactComponent
                                lat={55.785569516554474}
                                lng={37.63575093262811}
                                text="This Place"
                            />
                    </GoogleMapReact>
                 </div>
                </div>
            </body>
            </html>
        );
}
export default Contacts