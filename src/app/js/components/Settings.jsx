import React, {Fragment	} from "react";
import { Form, FormGroup, FormLabel, FormControl, Row, Col, Button, ButtonToolbar, InputGroup } from "react-bootstrap";
import { remote } from 'electron';


const fs = require('fs')

export default class Settings extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			key: 'ЛеС98347590127545asdfakjsdljf',
			plainText: '',
			cipherText: '',
			inputFilePath: '',
			outputFilePath: ''
		}
	}

	onCipherChange(e) {
		console.log('cipher change');
	}

	onEncipherClick() {
		console.log('encipher click');
	}

	onDecipherClick() {
		console.log('decipher click');
	}

	onPlainTextChange(e) {
		console.log('plaintext change');
	}

	onCipherTextChange(e) {
		console.log('ciphertext click');
	}

	onKeyChange(e) {
		console.log('key change');
	}

	onInputFileChoose() {
		console.log('input file open');
	}

	onOutputFileChoose() {
		console.log('output file open');
	}

	onOutputSave() {
		console.log('output save');
	}

	onInputSave() {
		console.log('input save');
	}

	render() {
		const {cipherText, outputFilePath} = this.state


		return (
			<Form>
				<Row>
					<Col md={6}>
						<InputGroup className="mb-3">
							<InputGroup.Prepend>
								<Button onClick={() => this.onInputFileChoose()}
									variant="outline-primary">Input file</Button>
								<Button onClick={() => this.onInputSave()}
									disabled={this.state.inputFilePath == ''} 
									variant="outline-success">Save</Button>
							</InputGroup.Prepend>
							<FormControl readOnly aria-describedby="basic-addon1" value={this.state.inputFilePath} />
						</InputGroup>

						<Form.Group controlId="exampleForm.ControlTextarea1">
							<Form.Control 
								readOnly
								onChange={(e) => this.onPlainTextChange(e)} 
								as="textarea"
								rows="10"
								placeholder="Plaintext"
								value={this.state.plainText}
							/>
						</Form.Group>
					</Col>	

					<Col md={6}>
						<InputGroup className="mb-3">
							<InputGroup.Prepend>
								<Button onClick={() => this.onOutputFileChoose()}
									variant="outline-primary">Output file</Button>
								<Button onClick={() => this.onOutputSave()}
									disabled={this.state.outputFilePath == ''} 
									variant="outline-success">Save</Button>
							</InputGroup.Prepend>
							<FormControl readOnly aria-describedby="basic-addon1" value={this.state.outputFilePath} />
						</InputGroup>

						<Form.Group controlId="exampleForm.ControlTextarea2">
							<Form.Control 
								readOnly
								onChange={(e) => this.onCipherTextChange(e)}
								as="textarea" 
								rows="10" 
								placeholder="Ciphertext"
								value={this.state.cipherText}
							/>
						</Form.Group>
					</Col>			
				</Row>

				<Row>
					<Col>
						
					</Col>
				</Row>

				<Row className="justify-content-md-center">
					<Col md={'auto'}>
						<ButtonToolbar>
							<Button onClick={() => this.onEncipherClick()} variant="success" size="lg">Encipher</Button>
						</ButtonToolbar>
					</Col>
					<Col md={'auto'}>
						<ButtonToolbar>
							<Button onClick={() => this.onDecipherClick()} variant="warning" size="lg">Decipher</Button>
						</ButtonToolbar>
					</Col>
				</Row>

				<Row>
					<Col>
						
					</Col>
				</Row>		
			</Form>
		);
	}
}
