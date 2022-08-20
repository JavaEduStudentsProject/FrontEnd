import React, {useContext, useState, useMemo} from 'react';
import ProductCard from "../AllProducts/ProductCard";
import Filter from "./Filter";
// import Scroll from "./Scroll";
import {Context} from "../Context.js";
import {useParams} from "react-router-dom";
import Title from "../UI/select/Title";
import Sort from "../UI/select/Sort";
import Hr from "../UI/select/Hr";
import Pagination from "react-bootstrap/Pagination";


const Products = (props) => {
    let product=[];
    const [products, setProducts] = useContext(Context);
    const {category} = useParams();
    const [currentPage, setCurrentPage]=useState(0);
    const [perPage, setPerPage]=useState(5);

  if (category) {
            product = products.filter(p => p.category === category).filter(item => {
                const fullFilter = item.title + item.description;
                return fullFilter.toLowerCase().includes(props.searchField.toLowerCase());
            })

  } else {
            product = products.filter(item => {
                const fullFilter = item.title + item.description + item.category;
                return fullFilter.toLowerCase().includes(props.searchField.toLowerCase());
  })
}

  const {pagItems,firstPageIndex, lastPageIndex} = useMemo(()=>{
      const pageLimit = Math.ceil(product.length/perPage)
      let pagItems =[]
      for(let i=0; i< pageLimit;i++){
          pagItems.push(
              <Pagination.Item
              key={i}
              active={i===currentPage}
              onClick={()=> setCurrentPage(i)}
              >
                  {i+1}
              </Pagination.Item>
          )
      }
      const firstPageIndex = currentPage * perPage;
      const lastPageIndex = firstPageIndex + perPage;
      return {
          pagItems,
          firstPageIndex,
          lastPageIndex
      }
      }, [currentPage, product.length, perPage]
  )

    const product1=()=> product.length? product.slice(firstPageIndex,lastPageIndex).map(item => {
        return <ProductCard
            key={item.id}
            item={item}
        />
    }): <h4>Продукты не найдены</h4>

    return (
        <div className="main-content-products">
            <Filter item={products} category={category}/>
            <div className="all-products">
                <Title category={category}/>
                <Hr item={category}/>
                <Sort category={category} setPerPage={setPerPage} />
                <Hr item={category}/>
                {/*<Scroll>*/}
                    <ul className="products">
                        {product1()}
                    </ul>

                {/*</Scroll>*/}

                    <Pagination className='justify-content-center'>
                        {/*<Pagination.Prev/>*/}
                        {pagItems}
                        {/*<Pagination.Next/>*/}
                    </Pagination>

            </div>

        </div>
    );
};

export default Products;