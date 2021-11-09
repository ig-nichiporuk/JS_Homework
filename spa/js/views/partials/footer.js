import Component from '../../views/component.js';

class Footer extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
				<div class="container">
					<p class="footer__address">
						Юридический адрес компании: <span class="br"></span> 224023, г. Брест, ул. Московская, 275А
					</p>
					<p class="footer__info">
						СООО “Автосеть”, УНП 190513391 в торговом реестре с 30 июня 2014 г. Свидетельство о регистрации № 190513391 выдано 7.06.2012 г.
					</p>
				</div>
            `);
        });
    }
}

export default Footer;