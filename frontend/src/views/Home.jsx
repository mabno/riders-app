import React, {useState, useEffect, useRef} from 'react';
import ContextConsumer from '../containers/ContextConsumer';
import RiderItem from '../components/RiderItem';

import { connectSocket, onInitialSchema, onRiderRequested, onRiderCanceled, emitRequest, emitCancel } from '../socket';

const Home = ({context}) => {

	const [schema, setSchema] = useState([]);
	const [pressedIndex, setPressedIndex] = useState(null);

	useEffect(() => {
		connectSocket(context.token)
		onInitialSchema(({schema}) => {
			setSchema([...schema])
		})
	}, [])

	onRiderRequested(({schemaIndex, riderID, userID, userName}) => {
		let s = schema;
		s[schemaIndex].riders[riderID] = {id: userID, name: userName}
		setSchema([...s])
		setPressedIndex(null);
	})
	onRiderCanceled(({schemaIndex, riderID}) => {
		let s = schema;
		delete s[schemaIndex].riders[riderID]
		setSchema([...s])
		setPressedIndex(null);
	})


	const requestRider = (schemaIndex) => {
		emitRequest({schemaIndex, userID: context.id, userName: `${context.name} ${context.surname}`})
		setPressedIndex(schemaIndex);
	}

	const cancelRider = (schemaIndex, riderID) => {
		emitCancel({schemaIndex, riderID})
		setPressedIndex(schemaIndex);
	}

	return(
		<main className="flex-grow flex flex-col">
			<div className="container py-4 px-2 mx-auto">
				<header className="bg-white shadow mx-auto p-6 mb-4 w-full md:w-9/12">
					<svg className="inline-block mr-6" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M18.536 7.555c-1.188-.252-4.606-.904-5.536-1.088v-3.512c0-1.629-1.346-2.955-3-2.955s-3 1.326-3 2.955v7.457c-.554-.336-1.188-.621-1.838-.715-1.822-.262-3.162.94-3.162 2.498 0 .805.363 1.613 1.022 2.271 3.972 3.972 5.688 5.125 6.059 9.534h9.919v-1.748c0-5.154 3-6.031 3-10.029 0-2.448-1.061-4.157-3.464-4.668zm.357 8.022c-.821 1.483-1.838 3.319-1.891 6.423h-6.13c-.726-3.82-3.81-6.318-6.436-8.949-.688-.686-.393-1.37.442-1.373 1.263-.006 3.06 1.884 4.122 3.205v-11.928c0-.517.458-.955 1-.955s1 .438 1 .955v6.948c0 .315.256.571.572.571.314 0 .57-.256.57-.571v-.575c0-.534.49-.938 1.014-.833.398.079.686.428.686.833v1.273c0 .315.256.571.571.571s.571-.256.571-.571v-.83c0-.531.487-.932 1.008-.828.396.078.682.424.682.828v1.533c0 .315.256.571.571.571s.571-.256.571-.571v-.912c0-.523.545-.867 1.018-.646.645.305 1.166.932 1.166 2.477 0 1.355-.465 2.193-1.107 3.354z"/></svg>
					<h1 className="inline-block text-lg font-bold">Take a rider in real-time</h1>
				</header>
				<div className="mx-auto rounded-lg p-6 bg-white shadow flex flex-col gap-2 w-full md:w-9/12">
					{
						schema.length > 0 ?
						schema.map((e, i) => (
							<RiderItem
								key={e.time}
								schemaIndex={i}
								data={e}
								available={Object.keys(e.riders).length < 8}
								requestRider={requestRider}
								cancelRider={cancelRider}
								myID={context.id}
								isLoading={i == pressedIndex}
								/>
						))
						:
						<div className="h-52 flex justify-center items-center">
							<svg className="mx-auto animate-spin stroke-current text-gray-400" width="56px" height="56px" viewBox="0 0 100 100">
								<circle cx="50" cy="50" fill="none" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138"/>
							</svg>
						</div>
					}
				</div>
			</div>
		</main>
	)
}

export default ContextConsumer(Home);