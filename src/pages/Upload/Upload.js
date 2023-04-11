import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TestimonialList from "../../components/testimonialsUpload-page/TestimonialList"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Upload.scss';

const Upload = () => {
    const initialValues = { name: '', date: new Date(), testimonial: '' };
    const [formData, setFormData] = useState(initialValues);
    const [success, setSuccess] = useState(false);
    const [testimonials, setTestimonials] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const postTestimonial = () => {
        const testimonialData = {
            name: formData.name,
            date: formData.date.toISOString().split('T')[0],
            testimonial: formData.testimonial,
        };
        return axios.post('http://localhost:8080/testimonial', testimonialData);
    };

    const getTestimonials = () => {
        return axios.get('http://localhost:8080/testimonial').then(response => {
            setTestimonials(response.data);
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        const errors = validateForm();
        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            postTestimonial(event)
                .then(() => {
                    setSuccess(true);
                    setFormData(initialValues);
                    setErrors({});
                    getTestimonials();
                    setTimeout(() => {
                        setSuccess(false);
                        navigate('/');
                    }, 3000); // 3 seconds
                })
                .catch(error => {
                    console.log('Error 404: Testimonial Upload Post ' + error);
                });
        }
    };

    const validateForm = () => {
        let errors = {};
        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }
        if (!formData.date) {
            errors.date = 'Date is required';
        }
        if (!formData.testimonial.trim()) {
            errors.testimonial = 'Testimonial is required';
        }
        return errors;
    };

    useEffect(() => {
        getTestimonials();
    }, []);

    return (
        <div className="upload-testimonial-page">
            <div className="upload-testimonial-page__title">
                <h1 className='title-sobriety'>Road To Sobriety</h1>
            </div>
            <div className="upload-cont">
                <form className="upload-cont__info" onSubmit={handleSubmit}>
                    <div className={`upload-cont__input-title ${errors.name ? 'invalid' : ''}`}>
                        <p className="upload-cont__label">Name</p>
                        <input
                            className={`upload-cont__field ${errors.name ? 'invalid' : ''}`}
                            type="text"
                            name="title"
                            placeholder="Add Name"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                        {errors.name && <p className="error-message">{errors.name}</p>}
                    </div>
                    <div className={`upload-cont__input-title ${errors.date ? 'invalid' : ''}`}>
                        <p className="upload-cont__label">Date</p>
                        <DatePicker
                            selected={formData.date}
                            onChange={date => setFormData({ ...formData, date })}
                            className={`upload-cont__input upload-datepicker ${errors.date ? 'invalid' : ''}`}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Select a date"
                        />
                                           {errors.date && <p className="error-message">{errors.date}</p>}
                </div>
                <div className={`upload-cont__input-des ${errors.testimonial ? 'invalid' : ''}`}>
                    <p className="upload-cont__label">Testimony</p>
                    <input
                        className={`upload-cont__field--des ${errors.testimonial ? 'invalid' : ''}`}
                        name="description"
                        placeholder="Add a Sobriety Testimonial"
                        value={formData.testimonial}
                        onChange={e => setFormData({ ...formData, testimonial: e.target.value })}
                    />
                    {errors.testimonial && <p className="error-message">{errors.testimonial}</p>}
                </div>
                <div className="btns">
                    <Link to="/centermap" className="btns-cancel">
                        Cancel
                    </Link>
                    <button icon="">
                        Publish
                    </button>
                </div>
            </form>
        </div>
        <div>
            {success && (
                <div className="success-cont">
                    <p className="success-cont__message">Testimonial Uploaded!</p>
                </div>
            )}
        </div>
        <TestimonialList testimonials={testimonials} />
    </div>
);
};

export default Upload;
