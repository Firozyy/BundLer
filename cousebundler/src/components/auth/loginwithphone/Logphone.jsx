import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { loginWithOtp } from '../../../redux/Action/action'

import { useNavigate } from "react-router-dom";

function Logphone() {
    const { loading, message, error, phone: newPhone } = useSelector(state => state.users);

    const [phone, setPhone] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const submithandler = (e) => {
        e.preventDefault();

        dispatch(loginWithOtp(phone));



    };

    const [checkphone, setChekphone] = useState("")

    useEffect(() => {
        setChekphone(newPhone)
        if (checkphone) {
         
            navigate(`/verification/${checkphone}`)
        }

    },[setChekphone,navigate,checkphone,newPhone] )



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

                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder='987654321'
                        type={'number'}
                        focusBorderColor='yellow.500'
                    />



                    <Button isLoading={loading} type='submit' width={'full'} colorScheme='yellow'>Sent Otp</Button>

                </VStack>
            </form>


        </Container>

    )
}


export default Logphone