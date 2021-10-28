import Component from "../../views/component.js";

class Help extends Component {
	render() {
		return new Promise(resolve => {
			resolve(`
				Странице помощи её в разработке!
			`)
		})
	}
}

export default Help
