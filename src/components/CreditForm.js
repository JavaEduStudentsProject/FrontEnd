import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const CreditForm = ({create}) => {
    // const [name, setName] = useState("")
    // const [money, setMoney] = useState("")

    const [sinnerInput, setSinnerInput] = useState({name: '', money: ''});

    // для неуправляемого компонента:
    // const inputRef = useRef();

    function addNewSinner(e) {
        e.preventDefault();
        let sinner = {
            id: Date.now(),
            "name": sinnerInput.name,
            // для неуправляемого компонента:
            // "necessaryMoney": inputRef.current.value
            "necessaryMoney": sinnerInput.money
        }

        //todo почему не сохраняет в массиве все значения, а только последнее?
        // sinners.push(sinner);
        // sinners = [...sinners, sinner];

        console.log("Burn!")
        // console.log(sinners);
        // setName("");
        // setMoney("");
        create(sinner);
        setSinnerInput({name: '', money: ''});
    }

    return (
        <form>
            {/*Управляемый компонент*/}
            <MyInput value={sinnerInput.name} onChange={e => setSinnerInput({...sinnerInput, name: e.target.value})} type="text" placeholder="ФИО"/>
            <MyInput value={sinnerInput.money} onChange={e => setSinnerInput({...sinnerInput, money: e.target.value})} type="text" placeholder="Сколько надо?"/>

            {/*/!*Неуправляемый/неконтролируемый компонент*!/*/}
            {/*<MyInput ref={inputRef} type="number" placeholder="Сколько надо?"/>*/}

            <MyButton onClick={addNewSinner}>Путь в ад</MyButton>
        </form>
    );
};

export default CreditForm;