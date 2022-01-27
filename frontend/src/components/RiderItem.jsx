import React from 'react';
import NameChip from './NameChip';

const RiderItem = ({schemaIndex, data, available, requestRider, cancelRider, myID, isLoading}) => {
	const date = new Date(data.time);
	const hours = date.getUTCHours() < 10 ? '0'+date.getUTCHours() : date.getUTCHours();
	const minutes = date.getUTCMinutes() < 10 ? '0'+date.getUTCMinutes() : date.getUTCMinutes();
	const riderKeys = Object.keys(data.riders);

	let takedForMeID = null;
	riderKeys.forEach(riderID => {
		if (data.riders[riderID].id === myID) takedForMeID = riderID
	})

	const onClickHandler = () => {
		if(takedForMeID){
			cancelRider(schemaIndex, takedForMeID);
		} else {
			if(available) requestRider(schemaIndex);
		}
	}

	return (
		<div
			className={
				"flex flex-col " +
				(takedForMeID ? 'bg-green-600' :
					available ? 'bg-blue-200'
					: 'bg-red-600')

			}
		>
			<button className="px-2 py-4 focus:outline-none" onClick={() => onClickHandler()}>
				<div className="text-xl">
					<span className="text-2xl">{hours}</span>
					<span className="mx-0.5">:</span>
					<span>{minutes}</span>
				</div>
				<div className="text-xs uppercase">
					<b>{8 - riderKeys.length}</b> motorcycles availables
				</div>
				{
					isLoading ?
					<svg className="mx-auto animate-spin stroke-current text-black" width="30px" height="30px" viewBox="0 0 100 100">
						<circle cx="50" cy="50" fill="none" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138"/>
					</svg>
					: ''
				}
			</button>
			<ul className="p-2 flex gap-2 bg-white w-full">
				{
					riderKeys.map(key => <NameChip key={data.riders[key].id} name={data.riders[key].name} isMe={data.riders[key].id == myID}/>)
				}
			</ul>
		</div>
	);
}

export default RiderItem;