import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import  toast  from 'react-hot-toast'
import {otpverification } from '../../../redux/Action/action'
import { useParams } from 'react-router-dom';

function OtpVerification() {

    const [otp, setotp] = useState('')
    const {phoneNumber} = useParams()
   
    const dispatch = useDispatch();

    const { loading, message, error } = useSelector(state => state.users);
 
    const submithandler = (e) => {
       e.preventDefault();
    
        dispatch(otpverification(otp,phoneNumber));
    };

  

    useEffect(() => {

        if (error) {
            toast.error(error);
            dispatch({ type: "clearError" })
        }
        if (message) {
            toast.success(message);
            dispatch({ type: "clearmessage" })
        }


    }, [dispatch, error, message]);
    return (
        <Container h={"90vh"} py='16'>
            <form onSubmit={submithandler}>
                <Heading children='Login with Mobile'
                    textAlign={['center', 'center']}
                    textTransform='uppercase'
                    my={'16'}
                />
                <VStack spacing={'8'}>

                    <Input
                        required

                        value={otp}
                        onChange={(e) => setotp(e.target.value)}
                        placeholder='1234'
                        type={'number'}
                        focusBorderColor='yellow.500'
                    />

                    <Button isLoading={loading} type='submit' width={'full'} colorScheme='yellow'>submit</Button>

                </VStack>
            </form>


        </Container>
    )

    }

export default OtpVerification