import React from 'react';
import Modal from '@mui/material/Modal';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { TextareaAutosize } from '@mui/material';





function MeetingDetailsModal(props) {



	return (
		<>
			<Modal
				className="popup_style1"
				open={props.isMeetingDetailsModalOpen}
				onClose={props.handleCloseIsMeetingDetailsModalOpen}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>

				<div className='popup_style1_body'>
					<div className='col-12' style={{ maxHeight: '400px', overflow: 'auto' }}>
						<h3 className='dv256885525'>Meeting scheduled for this slot </h3>
						<table className='meeting_table'>
							<thead>

								<tr>
									<th>Full Name</th>
									<th>Email</th>
									<th>Notes</th>
								</tr>
							</thead>
							<tbody>
								{
									props.selectedEvent && props.selectedEvent.meetings.map((meeting) => {
										return (
											<>
												<tr>
													<td>{meeting.full_name}</td>
													<td>{meeting.email}</td>
													<td>{meeting.notes}</td>
												</tr>
											</>
										)
									})
								}
							</tbody>
						</table>


					</div>
				</div>


			</Modal>
		</>
	);
}






export default MeetingDetailsModal;