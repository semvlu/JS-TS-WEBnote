// useRef: store mutable value, will not re-render
// in casu: acc. DOM element 
import { FormEvent, useState, useRef, useEffect } from "react";

const Form = () => { 

    const [email, setEmail] = useState('');
    const emailInputRef = useRef<HTMLInputElement>(null); // <HTMLInputElement> for type safety

    useEffect(() => {
        if (emailInputRef.current) {
            emailInputRef.current.focus();
        }
    }, []);

    const handFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        alert(`Subscribed with email: ${emailInputRef.current.value}`);
        if (emailInputRef.current) {
            setEmail(emailInputRef.current.value);
        }
        console.log(email);
    }

    return (
        <div className="col-sm-4 form-floating">
            <form onSubmit={handFormSubmit}>
                <label className="form-label">Subscribe to our newsletters</label>
                <input className="form-control"
                    ref={emailInputRef}
                    type="email" 
                    placeholder="E-mail" 
                />
                <button className="btn btn-primary" type="submit">Subscribe</button>
            </form>
        </div>
    );
}
export default Form;