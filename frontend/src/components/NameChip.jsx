import React from 'react';
import ReactTooltip from 'react-tooltip';

const NameChip = ({name, isMe}) => {
	const nameSplit = name.toUpperCase().split(' ');
	const nameChar = nameSplit[0][0];
	const surnameChar = nameSplit[nameSplit.length-1][0];
	return (
		<li>
			<button data-tip={name} className={`flex justify-center items-center w-10 h-10 rounded-full focus:outline-none ${isMe ? 'bg-green-600' : 'bg-blue-200'}`}>
				<div className="">{nameChar+surnameChar}</div>
			</button>
			<ReactTooltip
				place="top"
				effect="solid"
				delayShow={0}
				delayHide={0}
			/>
		</li>
	);
}

export default NameChip;