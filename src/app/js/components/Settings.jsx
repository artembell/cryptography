import React from "react";
import { Form, FormGroup, FormLabel, FormControl, Row, Col, Button, ButtonToolbar } from "react-bootstrap";
import {Ciphers} from '../ciphers/index';
import CipherNames from '../enums/CipherNames';

export default class Settings extends React.Component {
	constructor(props) {
		super(props);

		this.availableCiphers = Object.values(CipherNames)

		this.state = {
			currentCipherIndex: 0,
			plainText: '123',
			cipherText: 'asd'
		};
	}

	onCipherChange(e) {
		
		const index = this.availableCiphers.findIndex(cipher => {
			return cipher === e.target.value;
		});
		this.setState({ currentCipherIndex: index });
	}

	onEncipherClick(e){
		const cipherText = Ciphers[this.state.currentCipherIndex].encipher(this.state.plainText);
		this.setState({cipherText});
	}

	onDecipherClick(e){
		const plainText = Ciphers[this.state.currentCipherIndex].decipher(this.state.cipherText);
		this.setState({plainText});
	}

	render() {
		return (
			<Form>
				<Row>
					<Col md={4}>
						<Form.Label>Choose ciphers</Form.Label>
						<Form.Control
							onChange={e => this.onCipherChange(e)}
							value={this.availableCiphers[this.state.currentCipherIndex]}
							as="select"
						>
							{this.availableCiphers.map((cipher, index) => {
								return (
									<option key={index} value={cipher}>
										{cipher}
									</option>
								);
							})}
						</Form.Control>
					</Col>
					<Col md={4}>
						<Form.Label>Choose input file</Form.Label>
						<Form.Control type="file" />
					</Col>
					<Col md={4}>
						<Form.Label>Choose output file</Form.Label>
						<Form.Control type="file" />
					</Col>					
				</Row>

				<Row>
					<Col>
						<Form.Label>Key</Form.Label>
						<Form.Control type="text" placeholder="Enter key" />
						<Form.Text className="text-muted">
							This key must contain letters only! (or not)
						</Form.Text>
					</Col>
					<Col>
						<ButtonToolbar>
							<Button onClick={(e) => this.onEncipherClick(e)} variant="success" size="lg">Encipher</Button>
							<Button onClick={(e) => this.onDecipherClick(e)} variant="warning" size="lg">Decipher</Button>
						</ButtonToolbar>
					</Col>
				</Row>

				<Form.Group controlId="exampleForm.ControlTextarea1">
					<Form.Label>Example textarea1</Form.Label>
					<Form.Control as="textarea" rows="3" value={this.state.plainText}/>
				</Form.Group>
				<Form.Group controlId="exampleForm.ControlTextarea2">
					<Form.Label>Example textarea2</Form.Label>
					<Form.Control as="textarea" rows="3" value={this.state.cipherText}/>
				</Form.Group>
			</Form>
		);
	}
}
