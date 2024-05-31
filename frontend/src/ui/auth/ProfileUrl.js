import { Container, Grid, TextField } from '@mui/material'
import React, {useContext} from 'react'
import { UserContext } from './../../context/User/context';



const ProfileUrl = () => {


  return (
    <>
      <section>
        <Container maxWidth="lg">
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={6}>


              <TextField id="user_url" label="Custom URL" variant="standard" />
              <button>Continue</button>


            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  );
}

export default ProfileUrl