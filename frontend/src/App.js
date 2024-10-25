import React, { useState, useEffect } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';
import image from './assets/images/logo.svg';

function GetData(setVarDay) {
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					'https://django-react-test-leonp84-f46babdc21bd.herokuapp.com/api/data/'
					// 'http://127.0.0.1:8000/api/data/'
				);
				let i = response.data.length - 1;
				const mon = response.data[i].mon;
				const tue = response.data[i].tue;
				const wed = response.data[i].wed;
				const thu = response.data[i].thu;
				const fri = response.data[i].fri;
				const sat = response.data[i].sat;
				const sun = response.data[i].sun;
				setVarDay([mon, tue, wed, thu, fri, sat, sun]);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchData();
	}, [setVarDay]);
}

function BalanceHeader(updateData) {
	const sum = updateData.updateData.reduce((accumulator, currentValue) => {
		return accumulator + currentValue;
	}, 0);
	return (
		<div className="balance-header">
			<div>
				<span className="fs-6">My balance (€ 1000 budget)</span>
				<br />
				<span className="fs-2 font-bold">€ {1000 - sum} </span>
				<br />
			</div>
			<img src={image} alt="Spending Chart Logo" height="48" />
		</div>
	);
}

function SpendingFooter(updateData) {
	const sum = updateData.updateData.reduce((accumulator, currentValue) => {
		return accumulator + currentValue;
	}, 0);
	const whatsLeft = parseInt((sum / 830) * 100);
	return (
		<>
			<hr className="mt-3" />
			<div className="spending-footer">
				<div>
					<span className="small text-muted">Total this month</span>
					<br />
					<span className="font-bold fs-1">€ {sum} </span>
				</div>
				<div className="d-flex flex-column align-items-end">
					<span className="font-bold">{whatsLeft}%</span>
					<br />
					<span className="small text-muted">of last month (€830)</span>
				</div>
			</div>
		</>
	);
}

function DayDisplay({ day, amount }) {
	return (
		<div className="day">
			<OverlayTrigger
				placement="top"
				overlay={<Tooltip id={`tooltip-top`}>${amount}</Tooltip>}>
				<div className="graph" style={{ height: amount }}></div>
			</OverlayTrigger>
			<span className="small text-muted">{day}</span>
		</div>
	);
}

function handleInput(index, e, setVarDay, varDay) {
	let updateNum = 0;
	if (e.target.value === '') {
		updateNum = 0;
	} else {
		updateNum = e.target.value;
	}

	setVarDay((varDay) =>
		varDay.map((item, i) => (i === index ? parseInt(updateNum) : item))
	);
}

function SingleDayInput({ index, day, amount, setVarDay, varDay }) {
	return (
		<div className="single-day">
			<div className="form-group d-flex flex-column align-items-center">
				<label htmlFor={`input-${day}`}>{day}</label>
				<input
					name={day}
					type="text"
					className="form-control"
					id={`input-${day}`}
					placeholder="0"
					value={amount}
					onChange={(e) => handleInput(index, e, setVarDay, varDay)}
				/>
			</div>
		</div>
	);
}

function HandleClick(varDay) {
	let newData = {
		mon: varDay[0],
		tue: varDay[1],
		wed: varDay[2],
		thu: varDay[3],
		fri: varDay[4],
		sat: varDay[5],
		sun: varDay[6],
	};
	axios.post('http://127.0.0.1:8000/api/data/', newData).then((res) => {
		console.log(res);
		console.log(res.data);
	});
}

function App() {
	let weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
	const [varDay, setVarDay] = useState([]);
	GetData(setVarDay);
	let updateData = varDay;

	return (
		<>
			<main className="d-flex flex-column align-items-center justify-content-center vh-100">
				<BalanceHeader updateData={updateData} />
				<div className="spending-section">
					<div className="spending-graph">
						{varDay.map((varDay, index) => (
							<DayDisplay key={index} day={weekdays[index]} amount={varDay} />
						))}
					</div>
					<SpendingFooter updateData={updateData} />
				</div>
				<div className="day-spending">
					{varDay.map((varDay, index) => (
						<SingleDayInput
							key={index}
							index={index}
							day={weekdays[index]}
							amount={varDay}
							setVarDay={setVarDay}
							varDay={updateData}
						/>
					))}
				</div>
				<button
					type="button"
					className=" mt-3 w-340 btn btn-secondary btn-lg"
					onClick={() => HandleClick(updateData)}>
					Save
				</button>
			</main>
		</>
	);
}

export default App;
