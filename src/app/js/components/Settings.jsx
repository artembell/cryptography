import React, {Fragment	} from "react";
import { Form, FormGroup, FormLabel, FormControl, Row, Col, Button, ButtonToolbar, InputGroup } from "react-bootstrap";
import { Ciphers, normalizeText } from '../ciphers/index';
import CipherNames from '../enums/CipherNames';
import { remote } from 'electron';

import Enigma from '../ciphers/Enigma'

const fs = require('fs')

export default class Settings extends React.Component {
	constructor(props) {
		super(props);

		this.availableCiphers = Object.values(CipherNames)

		this.state = {
			currentCipherIndex: 0,
			key: 'key3sh2кл1юitчик',
			plainText: '',
			cipherText: '',
			inputFilePath: '',
			outputFilePath: ''
		};
	}

	onCipherChange(e) {
		const index = this.availableCiphers.findIndex(cipher => {
			return cipher === e.target.value;
		});
		Enigma.cipher = index
		this.setState({ currentCipherIndex: index });
	}

	onEncipherClick() {
		const {plainText: text, key} = this.state

		const cipherText = Enigma.encipher({text, key}) 

		if (cipherText) {
			this.setState({cipherText});
		} else {
			console.log('CANT ENCIPHER WITHOUT KEY OR TEXT');
		}
	}

	onDecipherClick() {
		const {cipherText: text, key} = this.state

		const plainText = Enigma.decipher({text, key}) 
		console.log(plainText, '-');
		if (plainText) {
			this.setState({plainText});
		} else {
			console.log('CANT DECIPHER WITHOUT KEY OR TEXT');
		}
	}

	onPlainTextChange(e) {
		const plainText = e.target.value;
		this.setState({plainText});
	}

	onCipherTextChange(e) {
		const cipherText = e.target.value;
		// console.log(cipherText);
		this.setState({cipherText});
	}

	onKeyChange(e) {
		const key = e.target.value;
		this.setState({key});
	}

	onInputFileChoose() {
		// console.log(remote);
		let [ file = '' ] = remote.dialog.showOpenDialogSync({ properties: ['openFile'] })
		console.log(file);  
		this.setState({inputFilePath: file})

		fs.readFile(file, 'utf8', (err, data) => {
			if (err) throw err;
			console.log(normalizeText(data, Enigma.alphabet));
			this.setState({plainText: normalizeText(data, Ciphers[this.state.currentCipherIndex].alphabet)})
			// console.log(normalizeText(data, Ciphers[this.state.currentCipherIndex].alphabet));
		  });
	}

	onOutputFileChoose() {
		// console.log(remote);
		let result = remote.dialog.showOpenDialogSync({ properties: ['openFile'] })  
		console.log(result);
		let file = result ? result[0] : ''
		// let [ file = ''] = remote.dialog.showOpenDialogSync({ properties: ['openFile'] })  
		console.log(file);  
		this.setState({outputFilePath: file})

		try{
			fs.readFile(file, 'utf8', (err, data) => {
				if (err) throw err;
				this.setState({cipherText: Enigma.normalizeText(data, Enigma.alphabet)})
			});
		} catch(error) {
			console.log(error)
		}

		// fs.writeFile(file, this.state.cipherText, 'utf8', function(error){
		// 	if(error) throw error;
		// 	console.log('GOOD');
		// });
	}
	writeFile(path, data) {
		try {
			fs.writeFile(path, data, 'utf8', function(err){
				if(err) throw err
			});
		} catch(error) {
			console.log(error)
		}
	}

	onOutputSave() {
		const {outputFilePath, cipherText} = this.state
		this.writeFile(outputFilePath, cipherText)
	}

	onInputSave() {
		const {inputFilePath, plainText} = this.state
		this.writeFile(inputFilePath, plainText) 
	}

	render() {
		const {cipherText, outputFilePath} = this.state
		console.log(cipherText === '', outputFilePath === '');
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

					<Col>
						<Form.Label>Key</Form.Label>
						<Form.Control 
							onChange={(e) => this.onKeyChange(e)} 
							type="text" 
							placeholder="Enter key"
							value={this.state.key}
						/>
						<Form.Text className="text-muted">
							{Ciphers[this.state.currentCipherIndex].keyRequirements.map((requirement, index) => {
								return <Fragment key={index}>{requirement}<br/></Fragment>
							})}
						</Form.Text>
					</Col>			
				</Row>

				<Row>
					<Col>
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
								// readOnly
								onChange={(e) => this.onPlainTextChange(e)} 
								as="textarea"
								rows="3"
								placeholder="Plaintext"
								value={this.state.plainText}
							/>
						</Form.Group>
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
								// readOnly
								onChange={(e) => this.onCipherTextChange(e)}
								as="textarea" 
								rows="3" 
								placeholder="Ciphertext"
								value={this.state.cipherText}
							/>
						</Form.Group>
					</Col>
				</Row>		
			</Form>
		);
	}
}
