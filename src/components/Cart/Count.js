const Count = (props) => {

    return (
        <div className="count">
            <div className="count_box">
                <input type="number" className="count_input" min='1' max='100' defaultValue={1}
                       onChange={(event) => {
                           props.setQuantity(event.target.value);
                           console.log(event.target.value)
                       }}
                />
            </div>
        </div>
    )

}
export default Count;