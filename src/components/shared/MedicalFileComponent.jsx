/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react'
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Link } from 'react-router-dom';

export default function MedicalFileComponent({ onSubmit, formValues, setFormValues }) {
    const handleCheckboxChange = (e, index) => {
        let _formValues = [...formValues]
        _formValues[index].answer = e.target.value
        setFormValues(_formValues)
    };
    return (
        <div className="p-4">
            <h1 className="text-center text-2xl mb-6">پرونده پزشکی</h1>
            {formValues.map((element, index) => {
                return <RadioGroup
                    defaultValue="false"
                    row
                    key={index}
                    onChange={(e) => handleCheckboxChange(e, index)}
                    value={element.answer}
                >
                    <FormLabel css={css`display:block;width:100%;`} >{element.question}</FormLabel>
                    <FormControlLabel value={true} control={<Radio css={css`color:white !important;`} />} label="بله" />
                    <FormControlLabel value={false} control={<Radio css={css`color:white !important;`} />} label="خیر" />
                </RadioGroup>
            })}
            {/* Submit and Back Buttons */}
            <div className="flex justify-center space-x-4 mt-8">
                <Link to="/user">
                    <button className="hover:bg-pink-700 w-32 h-11 border border-x-4 rounded-full flex justify-center items-center text-xl">
                        بازگشت
                    </button>
                </Link>

                <button
                    onClick={onSubmit}
                    className="bg-pink-700 text-white rounded-full w-32 h-11 flex justify-center items-center text-xl"
                >
                    ذخیره
                </button>
            </div>
        </div>
    )
}
