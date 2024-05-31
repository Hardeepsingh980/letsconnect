import React from 'react';
import Modal from '@mui/material/Modal';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { TextareaAutosize } from '@mui/material';

import { useAlert } from 'react-alert'

import axios from 'axios';
import { APIURL } from '../../const';






function BookSlotModal(props) {

	const alert = useAlert()

	const [name, setName] = React.useState();
	const [email, setEmail] = React.useState();
	const [notes, setNotes] = React.useState();

    const url = `${APIURL}/public/schedule/`;

	const handleClick = () => {

		const data = {
			full_name: name,
			email: email,
			notes: notes,
			slot: props.selectedEvent.id
		};

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		axios.post(url, data, config).then((response) => {
			props.handleCloseBookSlotModal();
			alert.success('Your slot has been booked successfully, You will receive an meeting link on your email shortly');
			props.setRefresh(!props.refresh);
		}).catch((error) => {
			console.log(error);
		});
	};



	return (
		<>
			<Modal
				className="popup_style1"
				open={props.isBookSlotModalOpen}
				onClose={props.handleCloseBookSlotModal}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<div className='popup_style1_body'>
					<div className='col-12'>
						<div className='row'>

							<div className='col-md-6 col-sm-6 col-xs-12 form_style2'>
								<TextField
									id="filled-number"
									label="Name"
									type="text"
									InputLabelProps={{
										shrink: true,
									}}
									variant="outlined"
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
									variant="outlined"
									value={email}
									onChange={(e) => {
										setEmail(e.target.value)
									}}
								/>
							</div>

							<div className='col-12 form_style2'>
								<TextareaAutosize
									aria-label="minimum height"
									minRows={3}
									placeholder="Notes"
									value={notes}
									onChange={(e) => {
										setNotes(e.target.value)
									}}
								/>
							</div>

							<div className='col-12 form_style2 text-center mb-0'>
								<button className='btn btn--lg btn-primary text-white h-70' onClick={ handleClick } >Book Slot</button>
							</div>
						</div>
					</div>
				</div>


			</Modal>
		</>
	);
}






export default BookSlotModal;