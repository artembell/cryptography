import React, {Fragment	} from "react";
import { Form, FormGroup, FormLabel, FormControl, Row, Col, Button, ButtonToolbar } from "react-bootstrap";
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
			cipherText: ''
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
					

					<Row>
						<Col md={4}>
							<Form.Label>Choose input file</Form.Label>
							<Form.Control type="file"/>
						</Col>
						<Col md={4}>
							<Form.Label>Choose output file</Form.Label>
							<Form.Control type="file" />
						</Col>
						<h1>{this.state.text}</h1>
					</Row>					
				</Row>

				<Row>
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
					<Col>
						<ButtonToolbar>
							<Button onClick={(e) => this.onEncipherClick(e)} variant="success" size="lg">Encipher</Button>
							<Button onClick={(e) => this.onDecipherClick(e)} variant="warning" size="lg">Decipher</Button>
							<Button onClick={() => this.onInputFileChoose()} variant="primary" size="lg">Input File</Button>
							<Button onClick={() => this.onOutputFileChoose()} variant="primary" size="lg">Output File</Button>
						</ButtonToolbar>
					</Col>
				</Row>

				<Form.Group controlId="exampleForm.ControlTextarea1">
					<Form.Label>Plaintext</Form.Label>
					<Form.Control 
						onChange={(e) => this.onPlainTextChange(e)} 
						as="textarea"
						rows="3"
						placeholder="Plaintext "
						value={this.state.plainText}
					/>
				</Form.Group>
				<Form.Group controlId="exampleForm.ControlTextarea2">
					<Form.Label>Ciphertext</Form.Label>
					<Form.Control 
						onChange={(e) => this.onCipherTextChange(e)}
						as="textarea" 
						rows="3" 
						value={this.state.cipherText}
					/>
				</Form.Group>
			</Form>
		);
	}
}
