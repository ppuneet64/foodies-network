'use client';
import { useRef, useState } from 'react';
import classes from './picker.module.css';

const ImagePicker = ({ name }) => {
    const [image, setImage] = useState(null);
    const filePickerRef = useRef();

    const handlePickImage = () => {
        filePickerRef.current.click();
    };
    const handleInputChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader()
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(reader.result);
        };
    }

    const handleClearImage = () => {
        filePickerRef.current.files = null;
        filePickerRef.current.value = null;
        setImage(null);
    }

    return (
        <div className={classes.picker}>
            <div className={classes.controls}>
                <input
                    className={classes.input}
                    style={{ display: "none" }}
                    type="file"
                    id={name}
                    accept="image/*"
                    name={name}
                    ref={filePickerRef}
                    onChange={handleInputChange}
                    required
                />
                <button
                    type="button"
                    onClick={handlePickImage}
                >
                    Pick an Image
                </button>
            </div>
            <div className={classes.preview}>
                {!image && <p>No image picked yet.</p>}
                {image && <img src={image} alt="Preview" />}
                {image && <button
                    className={classes.clear}
                    type='button'
                    onClick={handleClearImage}
                >
                    &#10006;
                </button>}
            </div>
        </div>
    );
};

export default ImagePicker;