import {
  MouseEventHandler,
  ChangeEventHandler,
  useState,
  useRef,
  FormEventHandler,
  FormEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import { uncontrolledFormSlice } from '../../redux/reducers/UncontrolledSlice';
import {
  uncontrolledCountrySearch,
  uncontrolledFilteredCountries,
  uncontrolledIsSuggestions,
} from '../../redux/state';
import { schema } from '../../utils/validationSchema';
import styles from './Uncontrolled.module.scss';
import { IFormProps } from '../../utils/types';

export const Uncontrolled = () => {
  const formRef = useRef([]);

  const setRef = (item) => {
    if (item && !formRef.current.includes(item)) {
      formRef.current.push(item);
    }
  };

  const [errorsState, setErrorsState] = useState(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { setSearch, filterCountries, setSuggestions, setBase64, setData } =
    uncontrolledFormSlice.actions;
  const searchValue = useAppSelector(uncontrolledCountrySearch);
  const filteredCountries = useAppSelector(uncontrolledFilteredCountries);
  const isSuggestionsVisible = useAppSelector(uncontrolledIsSuggestions);

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = (e: FormEvent) => {
    e.preventDefault();
    const formData: IFormProps = {
      name: formRef.current[0].value,
      email: formRef.current[1].value,
      password: formRef.current[2].value,
      confirmPassword: formRef.current[3].value,
      age: formRef.current[4].value,
      gender: formRef.current[5].value,
      file: formRef.current[6]?.files,
      country: formRef.current[7].value,
      terms: formRef.current[8].checked,
    };

    const errors = {};

    schema
      .validate(formData, { abortEarly: false })
      .then(() => {
        dispatch(setData(formData));
        navigate('/');
      })
      .catch((err) => {
        err.inner.forEach((e: Error) => {
          errors[e.path] = e.message;
        });
        setErrorsState(errors);
      });
  };

  const handleCountryClick: MouseEventHandler<HTMLLIElement> = (e) => {
    const target = e.target as HTMLElement;
    const value = target.innerHTML;
    dispatch(setSearch(value));
  };

  const handleCountryFocus = () => {
    dispatch(setSuggestions(true));
  };

  const handleCountryBlur = () => {
    setTimeout(() => {
      dispatch(setSuggestions(false));
    }, 100);
  };

  const handleCountryChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    dispatch(filterCountries(value));
    dispatch(setSearch(value));
  };

  const convertBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const target = e.target as HTMLInputElement;
    let value;
    if (target.files) {
      value = target.files[0];
    } else {
      console.error('Cant upload an image...');
      return;
    }
    const convertedImage = (await convertBase64(value)) as string;
    dispatch(setBase64(convertedImage));
  };

  return (
    <div className={styles.wrapper}>
      <h1>Bring your soul back!</h1>
      <h6>is this even possible?</h6>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <div className={styles.formWrapper}>
          <div className={styles.inputWrapper}>
            <input
              className={errorsState?.name && styles.invalid}
              ref={setRef}
              name="name"
              type="text"
              placeholder="Your name here.."
              defaultValue="Pavel"
            />
            <div className={styles.errorText}>{errorsState?.name}</div>
          </div>
          <div className={styles.inputWrapper}>
            <input
              className={errorsState?.email && styles.invalid}
              ref={setRef}
              name="email"
              type="text"
              placeholder="Email here.."
              defaultValue="pamixy@gmail.com"
            />
            <div className={styles.errorText}>{errorsState?.email}</div>
          </div>
          <div className={styles.inputWrapper}>
            <input
              ref={setRef}
              className={errorsState?.password && styles.invalid}
              name="password"
              type="text"
              placeholder="Password, for some reason"
              defaultValue="asdA1@@@@"
            />
            <div className={styles.errorText}>{errorsState?.password}</div>
          </div>
          <div className={styles.inputWrapper}>
            <input
              ref={setRef}
              className={errorsState?.confirmPassword && styles.invalid}
              name="confirmPassword"
              type="text"
              placeholder="Repeat your password.."
              defaultValue="asdA1@@@@"
            />
            <div className={styles.errorText}>{errorsState?.confirmPassword}</div>
          </div>
          <div className={styles.inputWrapper}>
            <input
              ref={setRef}
              className={errorsState?.age && styles.invalid}
              name="age"
              type="text"
              placeholder="Age, if you please"
              defaultValue="20"
            />
            <div className={styles.errorText}>{errorsState?.age}</div>
          </div>
          <div className={styles.inputWrapper}>
            <select ref={setRef} name="gender" defaultValue="Male" placeholder="Your gender..">
              <option value="default" disabled>
                Select your gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="dwarf">Dwarf</option>
              <option value="undead">Undead</option>
              <option value="attackHelicopter">Attack helicopter</option>
            </select>
          </div>
          <div className={styles.inputWrapper}>
            <input
              id="file-upload"
              name="file"
              ref={setRef}
              className={`${styles.file} ${errorsState?.file && styles.invalid}`}
              type="file"
              placeholder="Your photo, please"
              onChange={handleFileChange}
            />
            <div className={styles.errorText}>{errorsState?.file}</div>
          </div>
          <div className={`${styles.inputWrapper} ${styles.autocompleteInputWrapper}`}>
            <input
              ref={setRef}
              value={searchValue}
              name="country"
              type="text"
              placeholder="Finally, your country"
              className={`${styles.countriesInput} ${errorsState?.country && styles.invalid}`}
              onChange={handleCountryChange}
              onFocus={handleCountryFocus}
              onBlur={handleCountryBlur}
            />
            {isSuggestionsVisible && (
              <ul className={styles.countries}>
                {filteredCountries.map((item) => (
                  <li onClick={handleCountryClick} className={styles.countriesItem} key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
            <div className={styles.errorText}>{errorsState?.country}</div>
          </div>
        </div>
        <label className={styles.checkboxWrapper}>
          <input ref={setRef} name="terms" className={styles.checkbox} type="checkbox" />
          <p>
            I understand that there is no way I can get my soul back and an oath I&apos;ve made
            cannot be broken
          </p>
        </label>
        <div className={styles.errorText}>{errorsState?.terms}</div>
        <button className={styles.submitButton} type="submit">
          Become &quot;free&quot; of your bond
        </button>
      </form>
    </div>
  );
};
