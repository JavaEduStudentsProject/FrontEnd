class ProductList {
    constructor(productArray) {
        this.productArray = productArray;
    }

    // Рекурсивный проход по всем уровням вложенности объекта (продукта)
    static flatProduct(product) {
        let newObj = {};

        for (let prop in product) {
            if (typeof (product[prop]) == 'object') {
                newObj = Object.assign(newObj, this.flatProduct(product[prop]));
            } else {
                newObj[prop] = product[prop];
            }
        }

        // Object.keys(product).forEach(key => {
        //     if (typeof product[key] === 'object') {
        //         this.flatProduct(product[key]);
        //     } else {
        //         newObj[key] = product[key];
        //     }
        // })
        return newObj;
    }
}

export default ProductList;