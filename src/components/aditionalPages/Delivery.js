import React from "react";
import img from "../../images/sideBarListBoxTop.png";
import img1 from "../../images/car.jpeg";
import img2 from "../../images/sideBarListBoxBottom.png";
import img3 from "../../images/samovivoz.jpeg";
import img4 from "../../images/c2_i2.png";
import img5 from "../../images/c2_i3.png";
import img6 from "../../images/c2_i4.png";
import img7 from "../../images/c2_i5.png";
import img8 from "../../images/c2_i6.png";

const Delivery = (props)=>{
    return(
        <html>
    <body>
    <div id="wrapper">
        <div id="contant">
            <div class="contant_1">
                <div class="contant_1_left">
                    <br></br>
                    <h2>
                        Delivery
                        <span>October 22, 2022 | (0) Comments</span>
                    </h2>
                    <img src={img1} width="327" height="266" alt="" />
                    <h3>Доставка курьером</h3>
                    <br className="clear bottomClear"/>
                    <p>
                        <h4>Экспресс-доставка за 2 часа </h4><p>*При заказе до 20:00</p>
                        <h4>Получи заказ максимально быстро:</h4><p>
                        - Добавь товары в корзину,
                        а при оформлении заказа выбери «Экспресс-доставку за 2 часа» на такси.
                    </p>
                        <br></br>
                       <p>
                        - Укажи адрес доставки и оплати заказ онлайн или электронными деньгами.
                    </p>
                        <br></br>
                        <p>
                            - Ожидай доставку в течение 2 часов!
                        </p>

                        <h4>Стандартная доставка</h4>
                        <h4>Всё просто:</h4><p>
                        - Оформи заказ на сайте или в приложении, выбрав доставку.
                    </p>
                        <br></br>
                        <p>
                            - Стоимость доставки будет зависеть от суммы заказа и выбора дополнительных опций.
                        </p>
                        <br></br>
                        <p>
                            - Оплати заказ на сайте или при получении. Наслаждайся новой техникой!
                        </p>
                 </p>
                </div>
                <div class="sideBar">
                    <div class="sideBarListBox">
                        <img src={img} alt="" width="240" height="10" />
                        <ul>
                            <li><a href="#" >Доставка мелкогабаритной техники общей стоимостью более 4 990 ₽ (с учётом всех скидок)  10:00 - 22:00
                            </a></li>
                            <li><a href="#">Доставка мелкогабаритной техники общей стоимостью менее 4 990 ₽  10:00 - 22:00</a></li>
                            <li><a href="#">Доставка крупногабаритной техники   10:00 - 22:00</a></li>
                            <li><a href="#">Другое общей стоимостью более 4 990 ₽   10:00 - 22:00</a></li>
                            <li><a href="#">Другое общей стоимостью менее 4 990 ₽   10:00 - 22:00</a></li>
                        </ul>
                        <img src={img2} alt="" width="240" height="10" />
                    </div>
                </div>
                <br class="clear" />
            </div>
        </div>
            <span><img src={img3} width="253" height="320" alt="" /></span>
            <div class="midBox1Top">
                <h3>Самовывоз</h3>
                <br className="clear bottomClear"/>
                <br></br>
                <p>
                    <h4>Всё просто:</h4><p>
                        - Выбери товар на сайте или в приложении, оформи заказ с самовывозом из магазина.
                    </p>
                    <br></br>
                    <p>
                        - Приходи за своим заказом после получения SMS.
                    </p>
                </p>
                <a href="#"><img src={img4} width="133" height="40" alt="" /></a>
                <a href="#"><img src={img5} width="84" height="40" alt=""  /></a>
                <a href="#"><img src={img6} width="93" height="40" alt=""  /></a>
                <a href="#"><img src={img7} width="101" height="38" alt=""  /></a>		 </div>
    </div>
    </body>
</html>
    )
}
export default Delivery