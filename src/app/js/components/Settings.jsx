import React from "react";
import { Form, FormGroup, FormLabel, FormControl } from "react-bootstrap";

export default class Settings extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentCipher: 0
		};
	}
	render() {
		return (
			<Form>
				<Form.Group controlId="exampleForm.ControlInput1">
					<Form.Label>Choose file1</Form.Label>
					<Form.Control type="file"/>
				</Form.Group>
                <Form.Group controlId="exampleForm.ControlInput2">
					<Form.Label>Choose file2</Form.Label>
					<Form.Control type="file"/>
				</Form.Group>
				<Form.Group controlId="exampleForm.ControlSelect1">
					<Form.Label>Example select</Form.Label>
					<Form.Control as="select">
						<option>1</option>
						<option>2</option>
						<option>3</option>
					</Form.Control>
				</Form.Group>
				<Form.Group controlId="exampleForm.ControlTextarea1">
					<Form.Label>Example textarea1</Form.Label>
					<Form.Control as="textarea" rows="3" />
				</Form.Group>
				<Form.Group controlId="exampleForm.ControlTextarea2">
					<Form.Label>Example textarea2</Form.Label>
					<Form.Control as="textarea" rows="3" />
				</Form.Group>
			</Form>
		);
	}
}
