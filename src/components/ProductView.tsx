import React, {useContext,  useEffect} from 'react';
import styled from 'styled-components';
import {Formik, Form, ErrorMessage, useFormikContext} from 'formik';
import {TProduct, ProductsContext} from "../context.tsx";
import * as Yup from 'yup';

const images = [
  '/img_0.png',
  '/img_1.png',
  '/img_2.png',
  '/img_3.png',
];
const ProductSchema = Yup.object().shape({
  name: Yup.string().required(),
  price: Yup.number().positive().required(),
  createdAt: Yup.date().required(),
  description: Yup.string(),
  id: Yup.number(),
  image: Yup.string().oneOf(images),
})

const FieldsContainer = styled.fieldset`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    border-radius: 4px;
    label {
        display: flex;
        gap: 4px;
        flex-direction: column;
    }
    [type="submit"] {
        align-self: end;
    }
`
const ProductForm: React.FC = () => {
  const {setValues, values, handleChange, isSubmitting, isValid} = useFormikContext<TProduct>();
  const {selectedProduct} = useContext(ProductsContext);
  useEffect(() => {
    if (selectedProduct) {
      setValues(selectedProduct)
    } else {
      setValues({
        name: '',
        price: 0,
        createdAt: new Date(),
      })
    }
  }, [selectedProduct]);
  return (
    <Form>
      <input type={'hidden'} name={'createdAt'} value={values.createdAt.toString()} />
      <FieldsContainer>
        <legend>Product details</legend>
        <label>
          Product image
          <select name={'image'} value={values.image} onChange={handleChange}>
            <option value={''} disabled selected={!values.image}>Select image</option>
            {
              images.map(((img, i) => <option value={img} selected={values.image === img}>
              {`Image ${i}`}
            </option>))
            }
          </select>
        </label>
        <label>
          Product name
          <input name={'name'} value={values.name} onChange={handleChange} />
          <ErrorMessage name={'name'}/>
        </label>
        <label>
          Product description
          <textarea rows={5} name={'description'} value={values.description} onChange={handleChange} />
        </label>
        <label>
          Product price
          <input name={'price'} type={'number'} value={values.price} onChange={handleChange} />
          <ErrorMessage name={'price'} />
        </label>
        <input value={values.id ? 'Save' : 'Create'} type={'submit'} disabled={!isValid || isSubmitting} />
      </FieldsContainer>
    </Form>
  )
}
export const ProductView:React.FC = () => {
  const {updateProduct} = useContext(ProductsContext);
  return (
    <Formik<TProduct>
      initialValues={{
        price: 0,
        name: '',
        createdAt: new Date(),
      }}
      validationSchema={ProductSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          await updateProduct(values);
        } catch (e) {
          console.error(e);
        } finally {
          setSubmitting(false);
        }
    }}
    >
      <ProductForm />
    </Formik>
    )
}
