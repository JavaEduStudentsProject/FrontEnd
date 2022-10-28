// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
// import {useParams} from "react-router-dom";
//
// const CompTabs = (props) =>{
//     console.log(props.product)
//     const keys = Object.keys(props.product["filter_features"]);
//     console.log("Keys: " + keys);
//     let descriptionList = keys.map((key, index) =>
//         <li key={index}>
//             {keys[index]}: {props.product["filter_features"][key]}
//         </li>
//     );
//     return (
//         <Tabs>
//             <TabList>
//                 <Tab>Description</Tab>
//                 <Tab>Characteristic</Tab>
//                 <Tab>Review</Tab>
//             </TabList>
//
//             <TabPanel>
//                 <h2>
//                     Рейтинг: {props.product["non_filter_features"]["rating"]}</h2>
//             </TabPanel>
//             <TabPanel>
//                 <h2>characteristic</h2>
//             </TabPanel>
//             <TabPanel>
//                 <h2>review</h2>
//             </TabPanel>
//         </Tabs>
//     )
// };
//
// export default CompTabs
