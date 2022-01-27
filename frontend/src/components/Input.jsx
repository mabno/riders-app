import React from 'react';

const Input = ({label, type, name, placeholder, error}) => {
	return (
		<div className="w-full">
			<label className="block mb-1">{label}</label>
			<input 
				className={"rounded-sm border border-gray-300 px-2 py-1 w-full transition-all focus:outline-input"+(error ? ' outline-error' : '')}
				type={type}
				name={name}
				placeholder={placeholder}
			/>
			{ error ? <div className="text-red-600 mt-1 text-sm">{error}</div> : null }
		</div>
		);
}

export default Input;