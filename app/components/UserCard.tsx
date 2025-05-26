"use client";

import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';

const UserCard = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error(
            'AuthContext is undefined. Make sure to use TodoProvider.',
        );
    }

    const { loginUser } = authContext;
  return (
    <div>

    </div>
  )
}

export default UserCard