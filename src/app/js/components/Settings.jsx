import React, {Fragment	} from "react";
import { Form, FormGroup, FormLabel, FormControl, Row, Col, Button, ButtonToolbar, InputGroup } from "react-bootstrap";
import { Ciphers, normalizeText } from '../ciphers/index';
import CipherNames from '../enums/CipherNames';
import { remote } from 'electron';

const fs = require('fs')

export default class Settings extends React.Component {
	constructor(props) {
		super(props);

		this.availableCiphers = Object.values(CipherNames)

		this.state = {
			currentCipherIndex: 0,
			key: 'keyshit',
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
		this.setState({ currentCipherIndex: index });
	}

	onEncipherClick(e) {
		const {plainText: text, key} = this.state,
			chosenCipher = Ciphers[this.state.currentCipherIndex],
			formedKey = chosenCipher.formKey(key)
		
		console.log(formedKey);
		if(formedKey && text){
			const cipherText = chosenCipher.encipher({
				text: normalizeText(text, chosenCipher.alphabet),
				key: formedKey
			})

			this.setState({cipherText});
		}else{
			console.log('CANT ENCIPHER WITHOUT KEY OR TEXT');
		}
	}

	onDecipherClick(e) {
		const {cipherText: text, key} = this.state,
			chosenCipher = Ciphers[this.state.currentCipherIndex],
			plainText = chosenCipher.decipher({text: normalizeText(text, chosenCipher.alphabet), key})
			
		this.setState({plainText});
	}

	onPlainTextChange(e) {
		const plainText = e.target.value;
		this.setState({plainText});
	}

	onCipherTextChange(e) {
		const cipherText = e.target.value;
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
			this.setState({plainText: normalizeText(data, Ciphers[this.state.currentCipherIndex].alphabet)})
			console.log(normalizeText(data, Ciphers[this.state.currentCipherIndex].alphabet));
		  });
	}

	onOutputFileChoose() {
		// console.log(remote);
		let [ file = ''] = remote.dialog.showOpenDialogSync({ properties: ['openFile'] })  
		console.log(file);  
		this.setState({outputFilePath: file})

		fs.readFile(file, 'utf8', (err, data) => {
			if (err) throw err;
			this.setState({plainText: normalizeText(data, Ciphers[this.state.currentCipherIndex].alphabet)})
			console.log(normalizeText(data, Ciphers[this.state.currentCipherIndex].alphabet));
		  });

		fs.writeFile(file, this.state.cipherText, 'utf8', function(error){
			if(error) throw error;
			console.log('GOOD');
		});
	}

	render() {
		const {cipherText, outputFilePath} = this.state,
			isSaveDisabled = !cipherText || !outputFilePath
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
							<Button onClick={(e) => this.onEncipherClick(e)} variant="success" size="lg">Encipher</Button>
						</ButtonToolbar>
					</Col>
					<Col md={'auto'}>
						<ButtonToolbar>
							<Button onClick={(e) => this.onDecipherClick(e)} variant="warning" size="lg">Decipher</Button>
						</ButtonToolbar>
					</Col>
				</Row>

				<Row>
					<Col>
						<InputGroup className="mb-3">
							<InputGroup.Prepend>
								<Button onClick={() => this.onOutputFileChoose()}
									variant="outline-primary">Output file</Button>
								<Button disabled={isSaveDisabled} 
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
