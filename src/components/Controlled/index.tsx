import { useForm } from 'react-hook-form';

import styles from './Controlled.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './validationSchema';
import { countryList } from '../../utils/validation';
export const Controlled = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'all' });

  const onSubmitHandler = (formData: object) => {
    console.log(formData);
  };

  const isInvalid = !!Object.entries(errors).length;

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
            />
            <div className={styles.errorText}>{errors.age?.message}</div>
          </div>
          <div className={styles.inputWrapper}>
            <select
              {...register('gender')}
              name="gender"
              defaultValue="default"
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
              {...register('file')}
              name="file"
              className={`${styles.file} ${errors.file && styles.invalid}`}
              type="file"
              placeholder="Your photo, please"
            />
            <div className={styles.errorText}>{errors.file?.message}</div>
          </div>
          <div className={`${styles.inputWrapper} ${styles.autocompleteInputWrapper}`}>
            <input
              {...register('country')}
              name="country"
              type="text"
              placeholder="Finally, your country"
              className={styles.countriesInput}
            />
            <div className={styles.countries}>
              {countryList.map((item) => (
                <div className={styles.countriesItem} key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        <label className={styles.checkboxWrapper}>
          <input {...register('terms')} name="terms" className={styles.checkbox} type="checkbox" />
          <p>
            I acknowledge that my soul will be taken away in exchange for infinite wealth,
            knowledge, immortality, etc. whatever
          </p>
        </label>
        <button disabled={isInvalid} className={styles.submitButton} type="submit">
          {isInvalid ? 'Fill out this form first, dear' : 'Become a senior developer'}
        </button>
      </form>
    </div>
  );
};
