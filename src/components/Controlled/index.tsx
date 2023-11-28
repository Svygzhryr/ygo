import { useForm } from 'react-hook-form';

import styles from './Controlled.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './validationSchema';
export const Controlled = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'all' });

  const onSubmitHandler = (formData) => {
    console.log(formData);
  };

  return (
    <div className={styles.wrapper}>
      <h1>Forfeit your soul!</h1>
      <h6>not that you need it anyway</h6>
      <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
        <div className={styles.formWrapper}>
          <input {...register('name')} name="name" type="text" placeholder="Your name here.." />
          <input {...register('email')} name="email" type="text" placeholder="Email here.." />
          <input
            {...register('password')}
            name="password"
            type="text"
            placeholder="Password, for some reason"
          />
          <input
            {...register('confirmPassword')}
            name="confirmPassword"
            type="text"
            placeholder="Repeat your password.."
          />
          <input {...register('age')} name="age" type="text" placeholder="Age, if you please" />
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
          <input
            {...register('file')}
            name="file"
            className={styles.file}
            type="file"
            placeholder="Your photo, please"
          />
          <input
            {...register('country')}
            name="country"
            type="text"
            placeholder="Finally, your country"
          />
        </div>
        <label className={styles.checkboxWrapper}>
          <input {...register('terms')} name="terms" className={styles.checkbox} type="checkbox" />
          <p>
            I agree that my soul will be taken away in exchange for infinite wealth, knowledge,
            immortality, etc. whatever
          </p>
        </label>
        <button className={styles.submitButton} type="submit">
          Become a senior developer
        </button>
      </form>
    </div>
  );
};
