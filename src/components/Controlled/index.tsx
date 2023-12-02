import { Controller, useForm } from 'react-hook-form';

import styles from './Controlled.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../utils/validationSchema';
import { controlledFormSlice } from '../../redux/reducers/ControlledSlice';
import {
  controlledCountrySearch,
  controlledFilteredCountries,
  controlledIsSuggestions,
} from '../../redux/state';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import { ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Controlled = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({ resolver: yupResolver(schema), mode: 'all' });

  const isInvalid = !!Object.entries(errors).length;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { setSearch, filterCountries, setSuggestions, setBase64, setData } =
    controlledFormSlice.actions;
  const searchValue = useAppSelector(controlledCountrySearch);
  const filteredCountries = useAppSelector(controlledFilteredCountries);
  const isSuggestionsVisible = useAppSelector(controlledIsSuggestions);

  const onSubmitHandler = (formData: object) => {
    dispatch(setData(formData));
    console.log(formData);
    navigate('/');
  };

  const handleCountryClick: MouseEventHandler<HTMLLIElement> = (e) => {
    const target = e.target as HTMLElement;
    const value = target.innerHTML;
    dispatch(setSearch(value));
    setValue('country', value);
  };

  const handleCountryFocus = () => {
    dispatch(setSuggestions(true));
  };

  const handleCountryBlur = () => {
    setTimeout(() => {
      dispatch(setSuggestions(false));
    }, 100);
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

  useEffect(() => {
    watch(({ country }) => {
      dispatch(setSearch(country));
      dispatch(filterCountries(country));
    });
  }, [watch]);

  // useEffect(() => {
  //   console.log(filterCountries);
  // }, []);

  return (
    <div className={styles.wrapper}>
      <h1>Forfeit your soul!</h1>
      <h6>not that you need it anyway</h6>
      <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
        <div className={styles.formWrapper}>
          <div className={styles.inputWrapper}>
            <input
              className={errors.name && styles.invalid}
              {...register('name')}
              name="name"
              type="text"
              placeholder="Your name here.."
              defaultValue="Pavel"
            />
            <div className={styles.errorText}>{errors.name?.message}</div>
          </div>
          <div className={styles.inputWrapper}>
            <input
              className={errors.email && styles.invalid}
              {...register('email')}
              name="email"
              type="text"
              placeholder="Email here.."
              defaultValue="pamixy@gmail.com"
            />
            <div className={styles.errorText}>{errors.email?.message}</div>
          </div>
          <div className={styles.inputWrapper}>
            <input
              className={errors.password && styles.invalid}
              {...register('password')}
              name="password"
              type="text"
              placeholder="Password, for some reason"
              defaultValue="asdA1@@@@"
            />
            <div className={styles.errorText}>{errors.password?.message}</div>
          </div>
          <div className={styles.inputWrapper}>
            <input
              className={errors.confirmPassword && styles.invalid}
              {...register('confirmPassword')}
              name="confirmPassword"
              type="text"
              placeholder="Repeat your password.."
              defaultValue="asdA1@@@@"
            />
            <div className={styles.errorText}>{errors.confirmPassword?.message}</div>
          </div>
          <div className={styles.inputWrapper}>
            <input
              className={errors.age && styles.invalid}
              {...register('age')}
              name="age"
              type="text"
              placeholder="Age, if you please"
              defaultValue="20"
            />
            <div className={styles.errorText}>{errors.age?.message}</div>
          </div>
          <div className={styles.inputWrapper}>
            <select
              {...register('gender')}
              name="gender"
              defaultValue="Male"
              placeholder="Your gender.."
            >
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
              {...register('file')}
              name="file"
              className={`${styles.file} ${errors.file && styles.invalid}`}
              type="file"
              placeholder="Your photo, please"
              onChange={handleFileChange}
            />
            <div className={styles.errorText}>{errors.file?.message}</div>
          </div>
          <div
            // onClick={handleCountryFocus}
            // onBlur={handleCountryBlur}
            className={`${styles.inputWrapper} ${styles.autocompleteInputWrapper}`}
          >
            <input
              {...register('country')}
              name="country"
              type="text"
              placeholder="Finally, your country"
              className={`${styles.countriesInput} ${errors.country && styles.invalid}`}
            />
            {searchValue && (
              <ul className={styles.countries}>
                {filteredCountries.map(
                  (item) =>
                    item === searchValue || (
                      <li onClick={handleCountryClick} className={styles.countriesItem} key={item}>
                        {item}
                      </li>
                    )
                )}
              </ul>
            )}
            <div className={styles.errorText}>{errors.country?.message}</div>
          </div>
        </div>
        <label className={styles.checkboxWrapper}>
          <input {...register('terms')} name="terms" className={styles.checkbox} type="checkbox" />
          <p>
            I acknowledge that my soul will be taken away in exchange for infinite wealth,
            knowledge, immortality, etc. whatever
          </p>
        </label>
        <div className={styles.errorText}>{errors.terms?.message}</div>
        <button disabled={isInvalid} className={styles.submitButton} type="submit">
          {isInvalid ? 'Fill out this form first, dear' : 'Become a senior developer'}
        </button>
      </form>
    </div>
  );
};
