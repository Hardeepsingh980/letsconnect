import React from 'react';
import Modal from '@mui/material/Modal';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { TextareaAutosize } from '@mui/material';


import axios from 'axios';
import { useAlert } from 'react-alert'
import { APIURL } from '../../const';





function NotifyMeModal(props) {

	const alert = useAlert()

	const [name, setName] = React.useState();
	const [email, setEmail] = React.useState();

    const url = `${APIURL}/public/notify/`;

	const handleClick = () => {

		const data = {
			full_name: name,
			email: email,
			slot: props.selectedEvent.id
		};

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		axios.post(url, data, config).then((response) => {
			props.handleCloseNotifyMeModal();
			alert.success('We will notify you, If this slot becomes available');
			props.setRefresh(!props.refresh);
		}).catch((error) => {
			console.log(error);
		});
	};



	return (
		<>
			<Modal
				className="popup_style1"
				open={props.isNotifyMeModalOpen}
				onClose={props.handleCloseNotifyMeModal}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>

				<div className='popup_style1_body'>
					<div className='col-12'>
						<div className='row'>

							<div className='col-12 form_style2'>
								Notify Me if meeting gets cancelled
							</div>

							<div className='col-md-6 col-sm-6 col-xs-12 form_style2'>
								<TextField
									id="filled-number"
									label="Name"
									type="text"
									InputLabelProps={{
										shrink: true,
									}}
									variant="filled"
									value={name}
									onChange={(e) => {
										setName(e.target.value)
									}}
								/>
							</div>

							<div className='col-md-6 col-sm-6 col-xs-12 form_style2'>
								<TextField
									id="filled-number"
									label="Email"
									type="email"
									InputLabelProps={{
										shrink: true,
									}}
									variant="filled"
									value={email}
									onChange={(e) => {
										setEmail(e.target.value)
									}}
								/>
							</div>


							<div className='col-12 text-center form_style2 mb-0'>
								<button className='btn btn--lg btn-primary text-white h-70' onClick={
									handleClick
								} >Notify Me</button>
							</div>

						</div>
					</div>
				</div>


			</Modal>
		</>
	);
}






export default NotifyMeModal;