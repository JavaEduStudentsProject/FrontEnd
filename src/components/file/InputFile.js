import React, {useRef} from "react";
import ProductService from "../../services/ProductService";

export const InputFile = () =>{
    const fileComponent = useRef();
    // const handlerSubmit = (e) =>{
    //     e.preventDefault();
    //     console.log(fileComponent.current.files[0]);
    // };

    const handlerChange = (e) =>{
        e.preventDefault();
        // let files = [...e.target.files]
        console.log('change', fileComponent.current.files[0]);
        const formData = new FormData();
        formData.append('file',  fileComponent.current.files[0])
        ProductService.sendFile(formData).then((response)=>{
            console.log(response.data)
        }).catch(error =>{
            console.log(error)
        })
    }

    return(
        <form >
            <input
            id='file-loader'
            type='file'
            ref={fileComponent}
            onChange={handlerChange}
            />
            {/*<input type='submit'/>*/}

        </form>
    )
}