import React, { Component } from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import { View, Panel, PanelHeader, FormLayout, Button, Input, CardGrid, Card} from '@vkontakte/vkui';//пакеты из вк
import Icon24DismissSubstract from '@vkontakte/icons/dist/24/dismiss_substract';
import Icon28WriteOutline from '@vkontakte/icons/dist/28/write_outline';
import './App.css'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			yes: '',
			no: '',
			yesRes: [],
			noRes: [],			
		}
	}

	componentDidMount() {
		//вызываем предыдущее состояние из локалсториджа
		const lastState = localStorage.argument
		if (lastState) {
			// console.log(lastState)
			this.setState(JSON.parse(lastState))
		}
	}

	//обязательно используем стрелочные фунции чтоб не прописывать методы в конструкторе
	yesChange = (event) => {
		this.setState({ yes: event.target.value });
	}
	noChange = (event) => {
		this.setState({ no: event.target.value });
	}
	onClickHandler = () => {
		if (this.state.yes) {
			let newArray = this.state.yesRes.slice();    
			newArray.push(`${newArray.length+1+') '+this.state.yes}. `);   	
			this.setState({
				yes:'',
				yesRes:newArray				
			})
			localStorage.argument = JSON.stringify(this.state);//сохраняем стейт в локалсторадже
		}
		if (this.state.no) {
			let newArray = this.state.noRes.slice();    
			newArray.push(`${newArray.length+1+') '+this.state.no}. `);   	
			this.setState({
				no:'',
				noRes:newArray				
			})
			localStorage.argument = JSON.stringify(this.state);//сохраняем стейт в локалсторадже
		}
	}
	delYesClickHandler = () => {
		if (this.state.yesRes) {
			let newArray = this.state.yesRes.slice();    
			newArray.pop()   	
			this.setState({
				yesRes:newArray				
			})
			localStorage.argument = JSON.stringify(this.state);//сохраняем стейт в локалсторадже
		}
	}
	delNoClickHandler = () => {
		if (this.state.noRes) {
			let newArray = this.state.noRes.slice();    
			newArray.pop()   	
			this.setState({
				noRes:newArray				
			})
			localStorage.argument = JSON.stringify(this.state);//сохраняем стейт в локалсторадже
		}
	}
	render() {
		return (
			<View id="view" activePanel="panel">
				<Panel id="panel">
					<PanelHeader>за или против</PanelHeader>
						<FormLayout align="center" >
							
							<Input placeholder='введите аргументы За' top="аргументы За"  align="center" value={this.state.yes} onChange={this.yesChange} />
							<Input placeholder='введите аргументы Против' top="аргументы Против"  align="center" value={this.state.no} onChange={this.noChange} />
								<Button onClick={this.onClickHandler} before={<Icon28WriteOutline />} size="l">добавить</Button>
								
							{this.state.yesRes.length ?
								<CardGrid id='yes'>
									<Card size="l" mode="outline">
									{this.state.yesRes }
									</Card>
									<p>всего {this.state.yesRes.length}</p>
									<Button onClick={this.delYesClickHandler} before={<Icon24DismissSubstract />} size="s">удалить</Button>
								</CardGrid> : null}
								{this.state.noRes.length ?
								<CardGrid id='no'>
									<Card size="l" mode="outline">
									{this.state.noRes }
									</Card>
									<p>всего {this.state.noRes.length}</p>
									<Button onClick={this.delNoClickHandler} before={<Icon24DismissSubstract />} size="s">удалить</Button>
								</CardGrid> : null}
					
						</FormLayout>
				
				</Panel>
			</View>
		);
	}
}

export default App;

