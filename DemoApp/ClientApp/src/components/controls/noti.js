import React from 'react';
import {toast} from 'react-toastify';

export const notifyWarn = msg => toast.warn(msg, { autoClose: true });
export const notifySuccess = msg => toast.success(msg, { autoClose: true })
