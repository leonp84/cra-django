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
				);
				const mon = response.data[0].mon;
				const tue = response.data[0].tue;
				const wed = response.data[0].wed;
				const thu = response.data[0].thu;
				const fri = response.data[0].fri;
				const sat = response.data[0].sat;
				const sun = response.data[0].sun;
				setVarDay([mon, tue, wed, thu, fri, sat, sun]);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchData();
	}, [setVarDay]);
}

function BalanceHeader() {
	return (
		<div className="balance-header">
			<div>
				<span className="fs-6">My balance</span>
				<br />
				<span className="fs-2 font-bold">$921.48</span>
			</div>
			<img src={image} alt="Spending Chart Logo" height="48" />
		</div>
	);
}

function SpendingFooter() {
	return (
		<>
			<hr className="mt-3" />
			<div className="spending-footer">
				<div>
					<span className="small text-muted">Total this month</span>
					<br />
					<span className="font-bold fs-1">$478.33</span>
				</div>
				<div className="d-flex flex-column align-items-end">
					<span className="font-bold">+2.4%</span>
					<br />
					<span className="small text-muted">from last month</span>
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

function handleInput(index, e, setVarDay) {
	setVarDay((varDay) =>
		varDay.map((item, i) => (i === index ? parseInt(e.target.value) : item))
	);
}

function SingleDayInput({ index, day, amount, setVarDay }) {
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
					onChange={(e) => handleInput(index, e, setVarDay)}
				/>
			</div>
		</div>
	);
}

function App() {
	let weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
	const [varDay, setVarDay] = useState([]);
	GetData(setVarDay);

	return (
		<>
			<main className="d-flex flex-column align-items-center justify-content-center vh-100">
				<BalanceHeader />
				<div className="spending-section">
					<div className="spending-graph">
						{varDay.map((varDay, index) => (
							<DayDisplay key={index} day={weekdays[index]} amount={varDay} />
						))}
					</div>
					<SpendingFooter />
				</div>
				<div className="day-spending">
					{varDay.map((varDay, index) => (
						<SingleDayInput
							key={index}
							index={index}
							day={weekdays[index]}
							amount={varDay}
							setVarDay={setVarDay}
						/>
					))}
				</div>
			</main>
		</>
	);
}

export default App;
