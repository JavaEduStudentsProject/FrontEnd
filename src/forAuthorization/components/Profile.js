import React, {useState} from "react";
import Modal from "./Modal";
import AuthService from "../services/auth.service";
import {EditUserForm} from "../../hooks/EditUserForm";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import 'react-tabs/style/react-tabs.css';

import UserOrder from "../../components/Cart/UserOrder";


const Profile = (props) => {
    const [user] = useState(AuthService.getCurrentUser())
    const allOrdersFromDB = JSON.parse(localStorage.getItem('allOrderFromDB'))
    const filteredOrders = allOrdersFromDB.filter(order => order.userId === user.id)
    const userOrders = Object.values(filteredOrders)
    const keys = Object.keys(userOrders)

    const [modalActive, setModalActive] = useState(false)

    return (
        <div>
            <div>
                <Tabs>
                    <TabList>
                        <Tab>My Profile</Tab>
                        <Tab>My Orders</Tab>
                        {/*<Tab>My Reviews</Tab>*/}
                    </TabList>

                    <TabPanel>
                        <div>
                            <header className="jumbotron">
                                <h2>
                                    Profile <strong>{user.username}</strong>
                                </h2>
                                <br></br>
                            </header>
                            <Stack className="avatarIcon">
                                <Avatar alt="Пользователь" src={user.image}/>
                            </Stack>
                            <br></br>

                            <h3>
                                <strong>Email:</strong> {user.email}
                            </h3>
                            <br></br>
                            <h3>
                                <strong>LastName:</strong> {user.lastname}
                            </h3>
                            <br></br>
                            <h3>
                                <strong>FirstName:</strong> {user.firstname}
                            </h3>
                            <br></br>
                            <h3>
                                <strong>Phone:</strong> {user.phone}
                            </h3>
                            <br></br>
                            <h3>
                                <strong>Country:</strong> {user.country}
                            </h3>
                            <br></br>
                            <h3>
                                <strong>Date of Birth:</strong> {user.dateOfBirth}
                            </h3>
                            <br></br>

                            <button className='open-btn' onClick={() => setModalActive(true)}
                            >Редактировать юзера
                            </button>
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div>
                            <h2>My orders</h2>
                            <div>
                                {userOrders.map(el => (
                                    <div><h2>Номер заказа {el.id}</h2>
                                        <UserOrder key={el.id} order={el.products}
                                        />
                                    </div>
                                ))}
                            </div>



                        </div>

                    </TabPanel>
                    <div>
                        <Modal active={modalActive}
                               setActive={setModalActive}>
                            <div>
                                <EditUserForm
                                    currentUser={user}
                                />
                            </div>
                        </Modal>
                    </div>

                    {/*<TabPanel>*/}
                    {/*    <h2>reviews</h2>*/}
                    {/*</TabPanel>*/}

                </Tabs>
            </div>

        </div>
    );
};

export default Profile;
