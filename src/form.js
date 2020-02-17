import React, {useState} from "react";
import Input from "./form/input";
import {required} from "./form/validators";

function Form({ onSubmit }) {
    const initialform = {
        title: '',
        body: '',
        tags: ''
    };

    const [form, setForm] = useState(initialform);
    const [errors, setErrors] = useState({});
    const validation = {
        title: {required},
        body: {required},
        tags: {required}
    };

    const messages = {
        title: {
            required: 'Укажите заголовок'
        },
        body: {
            required: 'Укажите запись'
        },
        tags: {
            required: 'Укажите тэги'
        }
    };

    const validateForm = (fields) => {
        return Object.entries(fields).reduce((acc, [name, value]) => {
            const validators = validation[name] || {};

            const fieldErrors = Object.entries(validators).reduce((acc, [validatorName, validatorFunction]) => {
                const isInvalid = validatorFunction(value);

                if (isInvalid) {
                    return { ...acc, [validatorName]: validatorFunction(value) }
                } else {
                    return acc;
                }
            }, {});

            return { ...acc, [name]: fieldErrors}
        }, {});
    };

    const onChange = (event) => {
        const { value, name } = event.target;

        setErrors({ ...errors, ...validateForm({[name]: value}) });

        setForm({...form, [name]: value})
    };

    const onSubmitForm = (event) => {
        event.preventDefault();

        const err = validateForm(form);

        const firstErroredField = Object.values(err).find(item => {
            return Object.values(item).length
        });

        setErrors({ ...errors, ...err });

        if (!firstErroredField) {

            onSubmit(form);

            setForm(initialform);
        }

    };

    return (
        <form id="post-add" className="col-lg-4" onSubmit={onSubmitForm}>
            <div className="form-group">
                <Input name={'title'} value={form.title} type={'text'} placeholder={'заголовок'}
                       handleChange={onChange}/>
                {Object.entries(errors['title'] || {}).map(([name, isInvalid], i) => {
                    if (isInvalid) {
                        const errorMsg = messages['title'];
                        return (
                            <span key={`error-msg-${i}`} className="text-danger text-small">{errorMsg[name]}</span>
                        )
                    }

                    return null;
                })}
            </div>
            <div className="form-group">
                <Input name={'body'} value={form.body} type={'text'} placeholder={'запись'}
                       handleChange={onChange}/>
                {Object.entries(errors['body'] || {}).map(([name, isInvalid], i) => {
                    if (isInvalid) {
                        const errorMsg = messages['body'];
                        return (
                            <span key={`error-msg-${i}`} className="text-danger text-small">{errorMsg[name]}</span>
                        )
                    }

                    return null;
                })}
            </div>
            <div className="form-group">
                <Input name={'tags'} value={form.tags} type={'text'} placeholder={'тег, еще тег'}
                       handleChange={onChange}/>
                {Object.entries(errors['tags'] || {}).map(([name, isInvalid], i) => {
                    if (isInvalid) {
                        const errorMsg = messages['tags'];
                        return (
                            <span key={`error-msg-${i}`} className="text-danger text-small">{errorMsg[name]}</span>
                        )
                    }

                    return null;
                })}
            </div>
            <button type="submit" className="btn btn-primary">Добавить</button>
        </form>
    )
}

export default Form;